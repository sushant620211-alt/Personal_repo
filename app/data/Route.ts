import { NextRequest, NextResponse } from 'next/server'
import { biodata } from '@/lib/biodata'

// This route only ever runs on the server (Node.js runtime), so the
// BREVO_API_KEY below is NEVER sent to the browser and never appears in any
// client-side JS bundle. Keep it in `.env.local` (gitignored) for local dev,
// and in your hosting provider's "Environment Variables" dashboard for
// production (e.g. Vercel → Project → Settings → Environment Variables).
const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

// The address that *receives* connection requests (the family's inbox).
// Falls back to the email configured in lib/biodata.ts if not set.
const TO_EMAIL = process.env.BREVO_TO_EMAIL || biodata.contact.email
const TO_NAME = process.env.BREVO_TO_NAME || `${biodata.name} Family`

// The "From" address — must be an email/domain you've verified inside your
// Brevo account (Senders, Domains & Dedicated IPs → Senders).
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || ''
const SENDER_NAME = process.env.BREVO_SENDER_NAME || `${biodata.name} Biodata Site`

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendBrevoEmail(payload: Record<string, unknown>) {
  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      'api-key': BREVO_API_KEY as string,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Brevo API error (${res.status}): ${text}`)
  }
  return res.json()
}

export async function POST(req: NextRequest) {
  try {
    if (!BREVO_API_KEY || !SENDER_EMAIL) {
      console.error(
        'Missing BREVO_API_KEY or BREVO_SENDER_EMAIL environment variable. ' +
        'Add them in .env.local (dev) or your hosting dashboard (production).'
      )
      return NextResponse.json(
        { success: false, error: 'Email service not configured.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { name, phone, email, message, company } = body as {
      name?: string
      phone?: string
      email?: string
      message?: string
      company?: string // honeypot field
    }

    // Honeypot: real visitors never fill this hidden field. If it's filled,
    // silently pretend success so the bot moves on, but send nothing.
    if (company && company.trim() !== '') {
      return NextResponse.json({ success: true })
    }

    // Basic server-side validation (never trust the client)
    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      )
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name)
    const safePhone = escapeHtml(phone)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

    // 1) Notify the family — reply-to is set to the requester so the family
    //    can just hit "Reply" in their inbox to respond directly.
    await sendBrevoEmail({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: TO_EMAIL, name: TO_NAME }],
      replyTo: { email, name },
      subject: `💌 New Connection Request — ${biodata.name}'s Biodata`,
      htmlContent: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#fff9f5;border-radius:12px;">
          <h2 style="color:#8b2233;">New Connection Request</h2>
          <p style="color:#444;">Someone filled the "Request to Connect" form on ${biodata.name}'s biodata website.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            <tr><td style="padding:6px 0;color:#888;width:110px;">Name</td><td style="padding:6px 0;font-weight:bold;">${safeName}</td></tr>
            <tr><td style="padding:6px 0;color:#888;">Phone</td><td style="padding:6px 0;font-weight:bold;">${safePhone}</td></tr>
            <tr><td style="padding:6px 0;color:#888;">Email</td><td style="padding:6px 0;font-weight:bold;">${safeEmail}</td></tr>
          </table>
          <p style="color:#888;margin-bottom:4px;">Message:</p>
          <p style="background:#fff;border:1px solid #f0ddd4;border-radius:8px;padding:12px;color:#333;">${safeMessage}</p>
        </div>
      `,
    })

    // 2) Auto-acknowledgement back to the requester (best-effort — if this
    //    second email fails, the request to the family above already went
    //    through, so we don't fail the whole submission for it).
    try {
      await sendBrevoEmail({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email, name }],
        subject: `Your connection request was received — ${biodata.name}`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#fff9f5;border-radius:12px;">
            <h2 style="color:#8b2233;">Thank you, ${safeName} 🌸</h2>
            <p style="color:#444;">Your connection request regarding <strong>${biodata.name}</strong>'s marriage biodata has been received. The family will get back to you soon.</p>
            <p style="color:#888;font-size:13px;">This is an automated acknowledgement — please do not expect an immediate reply on this thread.</p>
          </div>
        `,
      })
    } catch (ackErr) {
      console.error('Acknowledgement email failed (non-fatal):', ackErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error sending connect request email:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to send email.' },
      { status: 500 }
    )
  }
}
'use client'

import { useState } from 'react'
import SectionHeader from './SectionHeader'
import { useReveal } from '@/lib/useReveal'
import { biodata } from '@/lib/biodata'

type FormState = 'idle' | 'open' | 'sending' | 'sent' | 'error'

export default function ConnectSection() {
  const introRef = useReveal<HTMLDivElement>()
  const formRef = useReveal<HTMLDivElement>()
  const contactRef = useReveal<HTMLDivElement>()

  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', company: '' })
  const [errorMsg, setErrorMsg] = useState('')

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!form.phone.trim()) return 'Please enter your phone number.'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Please enter a valid email.'
    if (!form.message.trim()) return 'Please write a message.'
    return null
  }

  const handleSubmit = async () => {
    const err = validate()
    if (err) {
      setErrorMsg(err)
      return
    }
    setErrorMsg('')
    setFormState('sending')

    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setFormState('sent')
      } else {
        // Server couldn't send the email (e.g. Brevo key missing/invalid) — fall back to mailto
        openMailto()
        setFormState('sent')
      }
    } catch {
      // Network error — fall back to mailto
      openMailto()
      setFormState('sent')
    }
  }

  const openMailto = () => {
    const subject = encodeURIComponent(`Marriage Biodata Connection Request — ${biodata.name}`)
    const body = encodeURIComponent(
      `Dear Family of ${biodata.name},\n\nI am sending a connection request after viewing the marriage biodata of ${biodata.name}.\n\n--- Sender Details ---\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n--- Message ---\n${form.message}\n\nRegards,\n${form.name}`
    )
    window.location.href = `mailto:${biodata.contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="connect" className="py-20 px-5 bg-[#fdf6ef] dark:bg-[#1a0e12]">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Request to Connect"
          subtitle="Interested in connecting? Send a message — we'll respond soon"
          dividerIcon="💌"
        />

        {/* Intro card */}
        <div ref={introRef} className="reveal mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4
            bg-white dark:bg-[#2d1820] border border-[#f0ddd4] dark:border-[#4a2832]
            rounded-2xl px-6 py-5 shadow-sm dark:shadow-rose-900/10">
            <span className="text-5xl flex-shrink-0">🤝</span>
            <p className="text-[#6b5744] dark:text-[#c8a898] leading-relaxed">
              <strong className="text-neutral-800 dark:text-neutral-200">Families interested in matrimonial alliance</strong>{' '}
              may fill the form below. Your message will be sent directly to the family.
              Please include your basic details and purpose of contact. We respect your privacy.
            </p>
          </div>
        </div>

        {/* CTA Button OR Form */}
        <div ref={formRef} className="reveal">
          {formState === 'idle' && (
            <div className="text-center">
              <button
                onClick={() => setFormState('open')}
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base tracking-wide
                  bg-gradient-to-r from-[#c0404e] to-[#8b2233] text-white
                  shadow-lg shadow-rose-200 dark:shadow-rose-900/30
                  hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                💌 Click to Send Connection Request
              </button>
            </div>
          )}

          {(formState === 'open' || formState === 'sending') && (
            <div className="bg-white dark:bg-[#2d1820] border border-[#f0ddd4] dark:border-[#4a2832]
              rounded-3xl p-8 shadow-lg dark:shadow-rose-900/10">
              <h3 className="font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Connection Request Form
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#c9932a] dark:text-[#f0c96e]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Full name"
                    className="form-input bg-[#fdf6ef] dark:bg-[#221318] border border-[#f0ddd4] dark:border-[#4a2832]
                      rounded-xl px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200
                      placeholder:text-[#c8a898] transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#c9932a] dark:text-[#f0c96e]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91 XXXXXXXXXX"
                    className="form-input bg-[#fdf6ef] dark:bg-[#221318] border border-[#f0ddd4] dark:border-[#4a2832]
                      rounded-xl px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200
                      placeholder:text-[#c8a898] transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#c9932a] dark:text-[#f0c96e]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="your@email.com"
                    className="form-input bg-[#fdf6ef] dark:bg-[#221318] border border-[#f0ddd4] dark:border-[#4a2832]
                      rounded-xl px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200
                      placeholder:text-[#c8a898] transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#c9932a] dark:text-[#f0c96e]">
                    Your Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Please introduce yourself, your family background, and purpose of contact..."
                    rows={4}
                    className="form-textarea bg-[#fdf6ef] dark:bg-[#221318] border border-[#f0ddd4] dark:border-[#4a2832]
                      rounded-xl px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200
                      placeholder:text-[#c8a898] resize-y transition-all duration-200"
                  />
                </div>
              </div>

              {/* Honeypot field — invisible to humans, catches simple spam bots.
                  Real visitors never see or fill this; if it has a value we silently drop the submission server-side. */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              />

              {errorMsg && (
                <p className="text-[#c0404e] dark:text-[#e8798a] text-sm font-semibold mb-3">⚠️ {errorMsg}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={formState === 'sending'}
                className="w-full py-4 rounded-xl font-bold text-base text-white
                  bg-gradient-to-r from-[#c0404e] to-[#8b2233]
                  hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Sending...
                  </span>
                ) : (
                  '📨 Send Connection Request'
                )}
              </button>

              <p className="text-center text-xs text-[#6b5744] dark:text-[#c8a898] mt-4">
                Your details are kept confidential and shared only with the family.
              </p>
            </div>
          )}

          {formState === 'sent' && (
            <div className="text-center bg-white dark:bg-[#2d1820] border border-[#f0ddd4] dark:border-[#4a2832]
              rounded-3xl p-12 shadow-lg dark:shadow-rose-900/10">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-display text-2xl font-bold text-[#c0404e] dark:text-[#e8798a] mb-2">
                Request Sent!
              </h3>
              <p className="text-[#6b5744] dark:text-[#c8a898] leading-relaxed max-w-sm mx-auto">
                Your connection request has been sent. The family will get back to you soon.
              </p>
              <button
                onClick={() => { setFormState('open'); setForm({ name: '', phone: '', email: '', message: '', company: '' }) }}
                className="mt-6 text-sm text-[#c0404e] dark:text-[#e8798a] font-bold underline underline-offset-2"
              >
                Send another request
              </button>
            </div>
          )}
        </div>

        {/* Contact info cards */}
        <div ref={contactRef} className="reveal grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {[
            { icon: '📞', label: `${biodata.name.split(' ')[0]}'s Contact`, value: biodata.contact.primary },
            { icon: '👨', label: "Father's Contact", value: biodata.contact.father },
            { icon: '📍', label: 'Location', value: `${biodata.address.post}, ${biodata.address.district}, ${biodata.address.state}` },
          ].map((c) => (
            <div
              key={c.label}
              className="card-lift flex items-center gap-4 bg-white dark:bg-[#2d1820]
                border border-[#f0ddd4] dark:border-[#4a2832] rounded-2xl px-5 py-4
                shadow-sm dark:shadow-rose-900/10"
            >
              <span className="text-3xl flex-shrink-0">{c.icon}</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9932a] dark:text-[#f0c96e]">{c.label}</p>
                <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mt-0.5">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
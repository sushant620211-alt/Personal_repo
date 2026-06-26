# 🌸 Nitu Kumari — Marriage Biodata Portfolio

A complete **Next.js 14** marriage biodata website with dark/light mode, photo protection, PDF download, and automatic email on contact form submission.

---

## 📁 Project Structure

```
nitu-biodata/
├── app/
│   ├── layout.tsx          ← Root layout + theme flash-prevention
│   ├── page.tsx            ← Main page (assembles all sections)
│   ├── globals.css         ← Global styles + animations
│   └── api/
│       └── contact/
│           └── route.ts    ← Email API route (nodemailer)
├── components/
│   ├── Navbar.tsx          ← Sticky nav + dark/light toggle + mobile menu
│   ├── HeroSection.tsx     ← Full-screen hero with animated photo ring
│   ├── AboutSection.tsx    ← Personal details grid
│   ├── FamilySection.tsx   ← Family members + address
│   ├── GallerySection.tsx  ← Protected photo with watermark
│   ├── BiodataSection.tsx  ← PDF download section
│   ├── ConnectSection.tsx  ← Contact form with email sending
│   ├── Footer.tsx
│   ├── ScrollToTop.tsx
│   ├── PhotoProtection.tsx ← Global right-click / drag / print block
│   └── ThemeScript.tsx     ← Zero-flash theme initializer
├── lib/
│   ├── biodata.ts          ← All biodata data (edit here)
│   ├── useTheme.ts         ← Theme hook (system default + toggle)
│   └── useReveal.ts        ← Scroll animation hook
├── public/
│   ├── nitu.png            ← Main photo
│   └── biodata.pdf         ← Downloadable biodata PDF
├── .env.example            ← Copy to .env.local and fill in
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Set up email (for contact form)
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx   # Google App Password
EMAIL_TO=family@gmail.com         # Where connection requests go
```

**How to get Gmail App Password:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and your device
3. Copy the 16-char password into `EMAIL_PASS`

### 3. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Build for production
```bash
npm run build
npm start
```

### 5. Static export (no server needed)
```bash
npm run build
# The `out/` folder is a complete static site — upload anywhere
```

---

## 🌐 Deploy Options

| Platform | Steps |
|----------|-------|
| **Vercel** | Push to GitHub → import at vercel.com → add env vars in dashboard |
| **Netlify** | Push to GitHub → import at netlify.com → add env vars in Site Settings |
| **Static (no server)** | `npm run build` → upload `out/` folder to any host |

> ⚠️ **Note:** The email API route (`/api/contact`) requires a server (Vercel/Netlify functions). For pure static hosting, the form falls back to `mailto:` which opens the user's email app.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🌙☀️ Dark / Light Mode | System default + manual toggle, persisted in localStorage |
| 📸 Photo Protection | Right-click disabled, drag blocked, Ctrl+S/P blocked, CSS print hide, watermark overlay |
| 📄 Biodata PDF Download | Direct download from `/public/biodata.pdf` |
| 💌 Contact Form | Sends real email via nodemailer; falls back to mailto on static |
| ✉️ Auto-reply | Acknowledgement email sent to requester |
| 🎨 Scroll Animations | IntersectionObserver-driven fade-up reveals |
| 📱 Fully Responsive | Mobile, tablet, desktop |
| ⚡ Next.js 14 App Router | Server components, API routes, static export support |

---

## ✏️ Customization

### Update biodata
Edit `lib/biodata.ts` — all personal details live there.

### Update family email
In `lib/biodata.ts`:
```ts
contact: {
  email: 'family@gmail.com', // ← change this
```
Also update `EMAIL_TO` in `.env.local`.

### Replace photo
Replace `public/nitu.png` with the new photo.

### Replace biodata PDF
Replace `public/biodata.pdf` with the updated PDF.

---

## 🔒 Photo Protection Notes

Protection methods used:
- `pointer-events: none` on `<img>` tags
- Transparent overlay div blocks clicks
- `onContextMenu={e => e.preventDefault()}` on image + container
- `draggable={false}` + `onDragStart` block
- `Ctrl+S`, `Ctrl+P`, `Ctrl+U` keyboard shortcuts blocked
- CSS `@media print { display: none }` hides everything on print
- Subtle watermark overlay on gallery photo

> **Note:** No client-side protection is 100% foolproof. These measures stop casual attempts effectively.
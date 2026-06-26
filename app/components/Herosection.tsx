'use client'

import Image from 'next/image'
import { biodata } from '@/lib/biodata'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden
        bg-gradient-to-br from-[#fdf6ef] to-[#fff9f5]
        dark:from-[#1a0e12] dark:to-[#221318]"
    >
      {/* Mandala orbiting rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div
          className="w-[540px] h-[540px] rounded-full border border-rose-200/40 dark:border-rose-900/30 animate-orbit"
          style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-270px', marginLeft: '-270px' }}
        />
        <div
          className="w-[400px] h-[400px] rounded-full border border-amber-300/20 dark:border-amber-800/20"
          style={{
            position: 'absolute', top: '50%', left: '50%', marginTop: '-200px', marginLeft: '-200px',
            animation: 'spin-orbit 80s linear infinite reverse',
          }}
        />
        <div
          className="w-[280px] h-[280px] rounded-full border border-dashed border-[#c9932a]/20 dark:border-[#f0c96e]/10"
          style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-140px', marginLeft: '-140px' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 px-5 py-12 max-w-2xl mx-auto">

        {/* Badge */}
        <div className="fade-up text-xs font-bold uppercase tracking-[0.2em] text-[#c9932a] dark:text-[#f0c96e]
          bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40
          px-4 py-1.5 rounded-full">
          ✨ Marriage Biodata ✨
        </div>

        {/* Photo with animated ring */}
        <div className="fade-up fade-up-delay-1 relative" style={{ width: 220, height: 220 }}>
          {/* Spinning gradient ring */}
          <div
            className="absolute inset-[-8px] rounded-full animate-ring"
            style={{
              background: 'conic-gradient(#c0404e, #c9932a, #e8798a, #c9932a, #c0404e)',
            }}
          />
          {/* White gap ring */}
          <div className="absolute inset-[-5px] rounded-full bg-[#fdf6ef] dark:bg-[#221318]" />

          {/* Photo */}
          <div className="relative w-full h-full rounded-full overflow-hidden z-10 select-none">
            <Image
              src="/nitu.png"
              alt={biodata.name}
              fill
              className="object-cover object-top photo-protected"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              priority
            />
            {/* Protection shield overlay */}
            <div
              className="photo-shield rounded-full"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        {/* Name */}
        <div className="fade-up fade-up-delay-2">
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
            <span className="gradient-text">{biodata.name}</span>
          </h1>
          <p className="mt-1 text-base font-display italic text-[#6b5744] dark:text-[#c8a898]">
            {biodata.nameHindi} — {biodata.caste}, Bihar
          </p>
        </div>

        {/* Pills */}
        <div className="fade-up fade-up-delay-3 flex flex-wrap gap-2 justify-center">
          {[
            `🎓 ${biodata.education.split('—')[0].trim()}`,
            `📍 Saran, Bihar`,
            `🙏 ${biodata.religion}`,
            `🎂 ${biodata.age} Years`,
          ].map((pill) => (
            <span
              key={pill}
              className="text-sm font-semibold px-4 py-1.5 rounded-full
                bg-white dark:bg-[#2d1820] border border-[#f0ddd4] dark:border-[#4a2832]
                text-[#6b5744] dark:text-[#c8a898] card-lift"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="fade-up fade-up-delay-4 flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="#connect"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide
              bg-gradient-to-r from-[#c0404e] to-[#8b2233] text-white
              shadow-lg shadow-rose-200 dark:shadow-rose-900/30
              hover:shadow-xl hover:shadow-rose-300/40 hover:-translate-y-0.5
              transition-all duration-200"
          >
            💌 Request to Connect
          </a>
          <a
            href="#biodata"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide
              border-2 border-[#c0404e] dark:border-[#e8798a]
              text-[#c0404e] dark:text-[#e8798a]
              hover:bg-[#c0404e] hover:text-white dark:hover:bg-[#e8798a] dark:hover:text-white
              hover:-translate-y-0.5 transition-all duration-200"
          >
            📄 View Biodata
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <span className="text-xs text-[#6b5744] dark:text-[#c8a898] font-semibold tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#c0404e] to-transparent" />
      </div>
    </section>
  )
}
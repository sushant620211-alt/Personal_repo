'use client'

import SectionHeader from './SectionHeader'
import { useReveal } from '@/lib/useReveal'
import { useState } from 'react'

export default function BiodataSection() {
  const cardRef = useReveal()
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    // PDF is served from /public/biodata.pdf
    const link = document.createElement('a')
    link.href = '/biodata.pdf'
    link.download = 'Nitu_Kumari_Marriage_Biodata.pdf'
    link.click()
    setTimeout(() => setDownloading(false), 2000)
  }

  return (
    <section id="biodata" className="py-20 px-5 bg-[#fff9f5] dark:bg-[#221318]">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Official Document"
          title="Download Biodata"
          subtitle="Full marriage biodata PDF — available for download"
          dividerIcon="📄"
        />

        <div ref={cardRef} className="reveal">
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-14 text-center text-white
              shadow-2xl shadow-rose-300/30 dark:shadow-rose-900/40"
            style={{
              background: 'linear-gradient(135deg, #8b2233 0%, #c0404e 50%, #8b2233 100%)',
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-white/4" />

            <div className="relative z-10">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="font-display text-3xl font-bold mb-3">
                Nitu Kumari — Marriage Biodata
              </h3>
              <p className="text-white/80 text-base mb-8 max-w-sm mx-auto leading-relaxed">
                Complete biodata with personal details, family background, and contact information.
              </p>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base
                  bg-white text-[#8b2233] shadow-lg
                  hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {downloading ? (
                  <>
                    <span className="animate-spin">⏳</span> Preparing...
                  </>
                ) : (
                  <>⬇️ Download Biodata PDF</>
                )}
              </button>

              <p className="text-white/50 text-xs mt-5">
                File: Nitu_Kumari_Marriage_Biodata.pdf
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
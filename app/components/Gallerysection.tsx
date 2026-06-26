'use client'

import Image from 'next/image'
import SectionHeader from './SectionHeader'
import { useReveal } from '@/lib/useReveal'
import { biodata } from '@/lib/biodata'

export default function GallerySection() {
  const photoRef = useReveal<HTMLDivElement>()

  return (
    <section id="gallery" className="py-20 px-5 bg-[#fdf6ef] dark:bg-[#1a0e12]">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Photo Gallery"
          title={`${biodata.name.split(' ')[0]}'s Photo`}
          subtitle="Shared exclusively for matrimonial purpose"
          dividerIcon="📸"
        />

        <div ref={photoRef} className="reveal flex flex-col items-center gap-5">
          {/* Photo card */}
          <div className="relative max-w-[480px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/40 dark:shadow-rose-900/30">

            {/* Photo */}
            <div
              className="relative w-full select-none"
              style={{ aspectRatio: '3/4' }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src="/nitu.png"
                alt={biodata.name}
                fill
                className="object-cover object-top photo-protected"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                priority={false}
                sizes="(max-width: 768px) 100vw, 480px"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55 z-10" />

              {/* Watermark */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
                <p
                  className="text-white/[0.06] font-display font-bold text-2xl tracking-widest text-center leading-loose"
                  style={{ transform: 'rotate(-30deg)', whiteSpace: 'nowrap' }}
                >
                  {biodata.name} · Matrimonial · Private
                </p>
              </div>

              {/* Shield overlay — blocks right-click / drag on the whole photo area */}
              <div
                className="absolute inset-0 z-30 cursor-default"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 z-40 p-6">
                <h3 className="font-display text-white text-2xl font-bold">{biodata.name}</h3>
                <p className="text-white/80 text-sm mt-0.5">🌸 {biodata.caste} · {biodata.address.district}, {biodata.address.state}</p>
              </div>
            </div>
          </div>

          {/* Protection notice */}
          <div className="flex items-center gap-2 text-sm text-[#6b5744] dark:text-[#c8a898] bg-white dark:bg-[#2d1820]
            border border-[#f0ddd4] dark:border-[#4a2832] rounded-full px-5 py-2.5 shadow-sm">
            <span>🔒</span>
            <span>
              Photo is protected — cannot be saved or downloaded.{' '}
              <a href="#connect" className="font-bold text-[#c0404e] dark:text-[#e8798a] hover:underline">
                Request more photos →
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
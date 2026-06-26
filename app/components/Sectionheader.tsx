'use client'

import { useReveal } from '@/lib/useReveal'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  dividerIcon?: string
}

export default function SectionHeader({ eyebrow, title, subtitle, dividerIcon = '🌸' }: SectionHeaderProps) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="reveal text-center mb-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9932a] dark:text-[#f0c96e] mb-1">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[#6b5744] dark:text-[#c8a898] text-base max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {/* Divider */}
      <div className="flex items-center gap-4 mt-6 max-w-xs mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#f0ddd4] dark:via-[#4a2832] to-transparent" />
        <span className="text-xl">{dividerIcon}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#f0ddd4] dark:via-[#4a2832] to-transparent" />
      </div>
    </div>
  )
}
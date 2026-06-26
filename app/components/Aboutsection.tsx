'use client'

import { biodata } from '@/lib/biodata'
import SectionHeader from './SectionHeader'
import { useReveal } from '@/lib/useReveal'

export default function AboutSection() {
  const statsRef = useReveal<HTMLDivElement>()
  const detailRef = useReveal<HTMLDivElement>()

  const stats = [
    { icon: '🎂', value: biodata.dob, label: 'Date of Birth' },
    { icon: '📏', value: biodata.height, label: 'Height' },
    { icon: '⚖️', value: biodata.weight, label: 'Weight' },
    { icon: '🎓', value: biodata.education.split('—')[0].trim(), label: 'Education' },
    { icon: '🕖', value: biodata.birthTime, label: 'Birth Time' },
    { icon: '📍', value: biodata.birthPlace, label: 'Birth Place' },
  ]

  const details = [
    { label: 'Religion', value: `🙏 ${biodata.religion}` },
    { label: 'Caste', value: biodata.caste },
    { label: 'Complexion', value: `✨ ${biodata.complexion}` },
    { label: 'Mother Tongue', value: `🗣️ ${biodata.motherTongue}` },
    { label: 'Languages', value: biodata.languages.join(', ') },
    { label: 'Education', value: biodata.education },
    { label: 'Occupation', value: `📚 ${biodata.occupation}` },
    { label: 'Hobbies', value: `📖 ${biodata.hobbies.join(', ')}` },
  ]

  return (
    <section id="about" className="py-20 px-5 bg-[#fdf6ef] dark:bg-[#1a0e12]">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Personal Information"
          title={`About ${biodata.name.split(' ')[0]}`}
          dividerIcon="🌸"
        />

        {/* Stats grid */}
        <div ref={statsRef} className="reveal grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card-lift bg-white dark:bg-[#2d1820] border border-[#f0ddd4] dark:border-[#4a2832]
                rounded-2xl p-5 text-center shadow-sm shadow-rose-100/60 dark:shadow-rose-900/20"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-display font-bold text-[#c0404e] dark:text-[#e8798a] text-base">{s.value}</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#6b5744] dark:text-[#c8a898] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Detail cards */}
        <div ref={detailRef} className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3">
          {details.map((d) => (
            <div
              key={d.label}
              className="card-lift bg-white dark:bg-[#2d1820] border border-[#f0ddd4] dark:border-[#4a2832]
                rounded-xl px-5 py-4 shadow-sm dark:shadow-rose-900/10"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#c9932a] dark:text-[#f0c96e] mb-1">
                {d.label}
              </p>
              <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200">{d.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
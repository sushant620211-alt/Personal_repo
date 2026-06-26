'use client'

import { biodata } from '@/lib/biodata'
import SectionHeader from './SectionHeader'
import { useReveal } from '@/lib/useReveal'

export default function FamilySection() {
  const gridRef = useReveal<HTMLDivElement>()
  const addressRef = useReveal<HTMLDivElement>()

  const { address } = biodata

  const familyMembers = [
    {
      icon: '👨',
      name: biodata.family.father.name,
      role: 'Father',
      sub: `Occupation: ${biodata.family.father.occupation}`,
    },
    {
      icon: '👩',
      name: biodata.family.mother.name,
      role: 'Mother',
      sub: biodata.family.mother.occupation,
    },
    {
      icon: '👨‍💼',
      name: biodata.family.brothers[0]?.name,
      role: 'Brother (Elder)',
      sub: biodata.family.brothers[0]?.note,
    },
    {
      icon: '👦',
      name: biodata.family.brothers[1]?.name,
      role: 'Brother',
      sub: biodata.family.brothers[1]?.note,
    },
    {
      icon: '👴',
      name: biodata.family.grandfather,
      role: 'Grandfather (Paternal)',
      sub: 'Respected Elder',
    },
    {
      icon: '👵',
      name: biodata.family.grandmother,
      role: 'Grandmother (Paternal)',
      sub: 'Respected Elder',
    },
  ]

  return (
    <section id="family" className="py-20 px-5 bg-[#fff9f5] dark:bg-[#221318]">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Family Background"
          title="Family Details"
          subtitle={`A respected family from ${address.district}, ${address.state}`}
          dividerIcon="🌺"
        />

        <div ref={gridRef} className="reveal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          {familyMembers.map((m) => (
            <div
              key={m.name}
              className="card-lift relative overflow-hidden text-center
                bg-white dark:bg-[#2d1820] border border-[#f0ddd4] dark:border-[#4a2832]
                rounded-2xl px-5 py-6 shadow-sm dark:shadow-rose-900/10"
            >
              {/* top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c0404e] to-[#c9932a]" />
              <div className="text-4xl mb-3">{m.icon}</div>
              <p className="font-bold text-sm text-neutral-800 dark:text-neutral-200">{m.name}</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#c9932a] dark:text-[#f0c96e] mt-1">{m.role}</p>
              <p className="text-xs text-[#6b5744] dark:text-[#c8a898] mt-1">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Address card */}
        <div
          ref={addressRef}
          className="reveal card-lift bg-white dark:bg-[#2d1820] border border-[#f0ddd4] dark:border-[#4a2832]
            rounded-2xl px-6 py-5 shadow-sm dark:shadow-rose-900/10"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#c9932a] dark:text-[#f0c96e] mb-2">
            📍 Residential Address
          </p>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            Vill: {address.village}, Post: {address.post}, Dist: {address.district},{' '}
            {address.state} — {address.pin}
          </p>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-8 left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center
        bg-[#c0404e] dark:bg-[#e8798a] text-white text-lg font-bold
        shadow-lg shadow-rose-300/40 dark:shadow-rose-900/30
        hover:scale-110 active:scale-95 transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      ↑
    </button>
  )
}
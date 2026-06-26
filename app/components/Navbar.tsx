'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/lib/useTheme'

function SunIcon({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon({ size = 11, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" />
    </svg>
  )
}

function MenuIcon({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function XIcon({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const links = [
  { href: '#about', label: 'About' },
  { href: '#family', label: 'Family' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#biodata', label: 'Biodata' },
  { href: '#connect', label: 'Connect' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-3.5 transition-all duration-300
          ${scrolled
            ? 'bg-white/90 dark:bg-[#221318]/90 shadow-lg backdrop-blur-md border-b border-rose-100 dark:border-[#4a2832]'
            : 'bg-white/70 dark:bg-[#221318]/70 backdrop-blur-sm border-b border-transparent'
          }`}
      >
        {/* Logo */}
        <div className="font-display text-xl font-bold text-[#c0404e] dark:text-[#e8798a] tracking-wide select-none">
          🌸 Nitu Kumari
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold text-[#6b5744] dark:text-[#c8a898] hover:text-[#c0404e] dark:hover:text-[#e8798a] transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: theme toggle + hamburger */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative rounded-full flex items-center px-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#c0404e]/40"
            style={{
              background: theme === 'dark' ? '#4a2832' : '#f0ddd4',
              width: '52px',
              height: '28px',
            }}
          >
            <span
              className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#c0404e] dark:bg-[#e8798a] transition-transform duration-300 flex items-center justify-center"
              style={{ transform: theme === 'dark' ? 'translateX(24px)' : 'translateX(0)' }}
            />
            <SunIcon size={12} className="absolute left-1.5 text-amber-500 opacity-70" />
            <MoonIcon size={11} className="absolute right-1.5 text-[#e8798a] opacity-70" />
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-[#3a1f28] transition-colors"
          >
            {menuOpen
              ? <XIcon size={22} className="text-[#c0404e]" />
              : <MenuIcon size={22} className="text-neutral-700 dark:text-neutral-300" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-[57px] left-0 right-0 z-40 bg-white dark:bg-[#2d1820] border-b border-rose-100 dark:border-[#4a2832] transition-all duration-300 overflow-hidden md:hidden
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base font-semibold text-neutral-800 dark:text-neutral-200 border-b border-rose-50 dark:border-[#3a1f28] last:border-0 hover:text-[#c0404e] dark:hover:text-[#e8798a] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
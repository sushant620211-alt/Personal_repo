'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Read from localStorage or system preference
    const stored = localStorage.getItem('theme') as Theme | null
    const sys: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    const initial = stored || sys
    setTheme(initial)
    apply(initial)

    // Listen for system changes (only if no stored preference)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const t: Theme = e.matches ? 'dark' : 'light'
        setTheme(t)
        apply(t)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function apply(t: Theme) {
    if (t === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    apply(next)
    localStorage.setItem('theme', next)
  }

  return { theme, toggle }
}
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#c0404e',
          light: '#e8798a',
          dark: '#8b2233',
        },
        gold: {
          DEFAULT: '#c9932a',
          light: '#f0c96e',
        },
        cream: {
          DEFAULT: '#fdf6ef',
          dark: '#1a0e12',
        },
        surface: {
          DEFAULT: '#fff9f5',
          dark: '#221318',
        },
        card: {
          DEFAULT: '#ffffff',
          dark: '#2d1820',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 60s linear infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
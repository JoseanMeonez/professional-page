import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        'on-accent': 'var(--on-accent)',
        nb: {
          yellow: 'var(--yellow)',
          pink: 'var(--pink)',
          blue: 'var(--blue)',
          lime: 'var(--lime)',
          orange: 'var(--orange)',
          violet: 'var(--violet)',
          cyan: 'var(--cyan)',
          red: 'var(--red)'
        }
      },
      boxShadow: {
        'nb-sm': '3px 3px 0 0 var(--line)',
        nb: '6px 6px 0 0 var(--line)',
        'nb-lg': '10px 10px 0 0 var(--line)',
        'nb-xl': '14px 14px 0 0 var(--line)'
      },
      borderWidth: {
        3: '3px'
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'var(--rubik)', 'sans-serif'],
        display: ['var(--font-archivo-black)', 'var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace']
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config

'use client'
import { Link } from '@/src/navigation'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { PiCode } from 'react-icons/pi'
import GithubIcon from '../../icons/github'
import LangSwitcher from './LangSwitcher'

interface Props {
  locale: string
}

const NAV_LINKS = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
]

export const Header: FC<Props> = ({ locale }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()

  useEffect(() => setMounted(true), [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 20)
  })

  const isDark = theme === 'terminal-dark'

  function toggleDark() {
    setTheme(isDark ? 'terminal' : 'terminal-dark')
  }

  return (
    <motion.header
      className='sticky top-0 z-40 transition-colors duration-300'
      style={{
        backgroundColor: scrolled ? 'var(--background)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className='mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5'>
        <Link lang={locale} href='/'>
          <div className='flex flex-row items-center gap-2'>
            <PiCode className='size-7' />
            <strong className='select-none font-display text-xl'>Andrés Meoñez</strong>
          </div>
        </Link>

        <div className='flex flex-row items-center gap-4'>
          <nav className='hidden items-center gap-6 md:flex'>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className='group relative font-mono text-sm text-text-secondary transition-colors hover:text-primary'
              >
                {link.label}
                <span className='absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full' />
              </a>
            ))}
            <Link
              lang={locale}
              href='/about'
              className='group relative font-mono text-sm text-text-secondary transition-colors hover:text-primary'
            >
              About
              <span className='absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full' />
            </Link>
          </nav>

          <div className='flex items-center gap-3'>
            <LangSwitcher />

            {mounted && (
              <motion.button
                onClick={toggleDark}
                whileTap={{ scale: 0.88 }}
                className='flex size-8 items-center justify-center rounded-full border border-border-theme bg-surface text-text-secondary transition-colors hover:border-accent hover:text-accent'
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <HiSun className='size-4' /> : <HiMoon className='size-4' />}
              </motion.button>
            )}

            <a
              href='https://github.com/JoseanMeonez'
              target='_blank'
              rel='noopener noreferrer'
              className='text-text-secondary transition-colors hover:text-primary'
            >
              <div className='size-7'>
                <GithubIcon />
              </div>
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

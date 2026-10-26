'use client'
import { gsap, ScrollTrigger, useGSAP } from '@/src/lib/gsap'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useSelectedLayoutSegments } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { RiCloseLine, RiMenu4Line } from 'react-icons/ri'
import LangSwitcher from './LangSwitcher'

interface Props {
  locale: string
}

const NAV_LINKS = [
  { hash: '#services', label: 'services' },
  { hash: '#skills', label: 'stack' },
  { hash: '#experience', label: 'experience' },
  { hash: '#projects', label: 'projects' },
  { hash: '#contact', label: 'contact' }
]

export const Header: FC<Props> = ({ locale }) => {
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const segments = useSelectedLayoutSegments()
  const header = useRef<HTMLElement>(null)
  const t = useTranslations('Nav')

  useEffect(() => setMounted(true), [])

  // Anchors only resolve on the home page; elsewhere link back to it.
  const isHome = segments.length === 0
  const hrefFor = (hash: string) => (isHome ? hash : `/${locale}${hash}`)
  const isDark = resolvedTheme === 'dark'

  // Slide away while scrolling down, come back on scroll up.
  useGSAP(() => {
    const hide = gsap.to(header.current, {
      yPercent: -120,
      duration: 0.35,
      ease: 'power2.out',
      paused: true
    })
    ScrollTrigger.create({
      start: 120,
      end: 'max',
      onUpdate: self => (self.direction === 1 ? hide.play() : hide.reverse()),
      onLeaveBack: () => hide.reverse()
    })
  })

  return (
    <header
      ref={header}
      className='fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5'
    >
      <div className='nb-card mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-3 bg-paper px-3 sm:px-4'>
        <Link
          lang={locale}
          href='/'
          className='group flex items-center gap-2.5'
          aria-label={t('home')}
        >
          <span className='nb-border grid size-10 -rotate-6 place-items-center rounded-md bg-nb-yellow font-display text-sm text-on-accent shadow-nb-sm transition-transform group-hover:rotate-6'>
            AM
          </span>
          <strong className='hidden select-none font-display text-lg uppercase tracking-tight sm:block'>
            Andrés Meoñez
          </strong>
        </Link>

        <nav
          className='hidden items-center gap-1 lg:flex'
          aria-label={t('main')}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.hash}
              href={hrefFor(link.hash)}
              className='rounded-md border-2 border-transparent px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:border-line hover:bg-nb-yellow hover:text-on-accent'
            >
              {t(link.label)}
            </a>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <LangSwitcher />

          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className='nb-btn size-10 bg-nb-violet !p-0'
            aria-label={isDark ? t('lightMode') : t('darkMode')}
          >
            {mounted &&
              (isDark ? (
                <HiSun className='size-5' />
              ) : (
                <HiMoon className='size-5' />
              ))}
          </button>

          <a
            href='https://github.com/JoseanMeonez'
            target='_blank'
            rel='noopener noreferrer'
            className='nb-btn hidden size-10 bg-nb-lime !p-0 sm:inline-flex'
            aria-label='GitHub'
          >
            <FaGithub className='size-5' />
          </a>

          <button
            onClick={() => setMenuOpen(o => !o)}
            className='nb-btn size-10 bg-nb-pink !p-0 lg:hidden'
            aria-label={t('toggleMenu')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <RiCloseLine className='size-6' />
            ) : (
              <RiMenu4Line className='size-6' />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className='nb-card mx-auto mt-3 grid max-w-screen-2xl gap-2 bg-nb-yellow p-3 lg:hidden'
          aria-label={t('mobile')}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.hash}
              href={hrefFor(link.hash)}
              onClick={() => setMenuOpen(false)}
              className='nb-border flex items-center justify-between rounded-md bg-paper px-4 py-3 font-display text-lg uppercase text-ink'
            >
              {t(link.label)}
              <span className='font-mono text-xs'>0{i + 1}</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

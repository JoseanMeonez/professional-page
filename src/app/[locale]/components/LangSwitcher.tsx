'use client'
import Link from 'next/link'
import { useParams, useSelectedLayoutSegments } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import { useOnClickOutside } from 'usehooks-ts'

const OPTIONS = [
  { country: 'English', code: 'en' },
  { country: 'Deutsch', code: 'de' },
  { country: 'Français', code: 'fr' },
  { country: 'Español', code: 'es' },
  { country: 'Русский', code: 'ru' },
  { country: '日本語', code: 'ja' },
  { country: 'العربية', code: 'ar' },
  { country: 'فارسی', code: 'fa' }
]

const LangSwitcher: React.FC = () => {
  const urlSegments = useSelectedLayoutSegments()
  const { locale } = useParams<{ locale: string }>()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div ref={ref} className='relative'>
      <button
        className='nb-btn h-10 bg-nb-cyan px-3'
        onClick={() => setOpen(o => !o)}
        aria-haspopup='menu'
        aria-expanded={open}
        aria-label='Change language'
      >
        <FiGlobe className='size-4' />
        <span>{locale}</span>
      </button>
      {open && (
        <div
          className='nb-card absolute right-0 mt-3 w-44 overflow-hidden bg-paper py-1'
          role='menu'
        >
          {OPTIONS.map(lang => (
            <Link
              key={lang.code}
              lang={lang.code}
              role='menuitem'
              href={`/${lang.code}/${urlSegments.join('/')}`}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 font-mono text-sm font-bold transition-colors hover:bg-nb-yellow hover:text-on-accent ${
                locale === lang.code ? 'bg-nb-lime text-on-accent' : 'text-ink'
              }`}
            >
              {lang.country}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default LangSwitcher

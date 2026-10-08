'use client'
import { Link } from '@/src/navigation'
import { useParams, useSelectedLayoutSegments } from 'next/navigation'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { HiArrowUp } from 'react-icons/hi2'
import { MdEmail } from 'react-icons/md'

const NAV = [
  { hash: '#services', label: 'Services' },
  { hash: '#skills', label: 'Stack' },
  { hash: '#experience', label: 'Experience' },
  { hash: '#projects', label: 'Projects' },
  { hash: '#contact', label: 'Contact' }
]

const SOCIAL = [
  { href: 'https://github.com/JoseanMeonez', label: 'GitHub', icon: FaGithub },
  {
    href: 'https://linkedin.com/in/andrés-meoñez',
    label: 'LinkedIn',
    icon: FaLinkedin
  },
  { href: 'mailto:joseanmeonez@gmail.com', label: 'Email', icon: MdEmail },
  { href: 'https://wa.me/50488664380', label: 'WhatsApp', icon: FaWhatsapp }
]

export default function Footer() {
  const { locale } = useParams<{ locale: string }>()
  const isHome = useSelectedLayoutSegments().length === 0
  const hrefFor = (hash: string) => (isHome ? hash : `/${locale}${hash}`)

  return (
    <footer className='border-t-3 border-line bg-[#0a0a0a] text-[#f5f0e1] [--line:#f5f0e1]'>
      <div className='container py-14'>
        <div className='grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]'>
          <div>
            <div className='flex items-center gap-3'>
              <span className='grid size-11 -rotate-6 place-items-center rounded-md border-3 border-[#f5f0e1] bg-nb-yellow font-display text-[#0a0a0a]'>
                AM
              </span>
              <strong className='font-display text-2xl uppercase'>
                Andrés Meoñez
              </strong>
            </div>
            <p className='mt-4 max-w-sm text-sm text-[#c4bcab]'>
              Full Stack Developer building enterprise-grade web applications
              with modern technologies.
            </p>
          </div>

          <nav aria-label='Footer'>
            <h4 className='mb-4 font-mono text-xs font-bold uppercase tracking-widest text-nb-lime'>
              Navigate
            </h4>
            <ul className='grid gap-2 text-sm'>
              {NAV.map(item => (
                <li key={item.hash}>
                  <a
                    href={hrefFor(item.hash)}
                    className='hover:text-nb-yellow hover:underline'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href='/about'
                  className='hover:text-nb-yellow hover:underline'
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className='mb-4 font-mono text-xs font-bold uppercase tracking-widest text-nb-pink'>
              Connect
            </h4>
            <div className='flex flex-wrap gap-3'>
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                  aria-label={label}
                  className='nb-btn size-11 bg-[#f5f0e1] !p-0'
                >
                  <Icon className='size-5' />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className='mt-14 select-none overflow-hidden font-display text-[clamp(2.6rem,11vw,10rem)] uppercase leading-none text-transparent [-webkit-text-stroke:2px_#f5f0e1]'
          aria-hidden
        >
          Meoñez
        </div>

        <div className='mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-dashed border-[#f5f0e1]/40 pt-6 sm:flex-row'>
          <span className='font-mono text-xs'>
            © {new Date().getFullYear()} Andrés Meoñez. All rights reserved.
          </span>
          <span className='font-mono text-xs'>
            Next.js · GSAP · Three.js · Tailwind CSS
          </span>
          <a href={hrefFor('#top')} className='nb-btn bg-nb-yellow px-3 py-2'>
            Top <HiArrowUp className='size-4' />
          </a>
        </div>
      </div>
    </footer>
  )
}

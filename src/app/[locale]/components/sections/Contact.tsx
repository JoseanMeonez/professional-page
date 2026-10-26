'use client'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { HiArrowUpRight } from 'react-icons/hi2'
import { MdEmail } from 'react-icons/md'

// Per-line styling; the words come from messages (Contact.lines).
const LINE_STYLES = [
  '',
  'nb-outline-text [-webkit-text-stroke-color:#0a0a0a]',
  '',
  'inline-block -rotate-2 rounded-lg bg-[#0a0a0a] px-4 text-nb-yellow'
]

const CHANNELS = [
  {
    label: 'Email',
    value: 'joseanmeonez@gmail.com',
    href: 'mailto:joseanmeonez@gmail.com',
    icon: MdEmail,
    color: 'bg-nb-pink'
  },
  {
    label: 'WhatsApp',
    value: '+504 8866-4380',
    href: 'https://wa.me/50488664380',
    icon: FaWhatsapp,
    color: 'bg-nb-lime'
  },
  {
    label: 'LinkedIn',
    value: 'in/andrés-meoñez',
    href: 'https://linkedin.com/in/andrés-meoñez',
    icon: FaLinkedin,
    color: 'bg-nb-cyan'
  },
  {
    label: 'GitHub',
    value: '@JoseanMeonez',
    href: 'https://github.com/JoseanMeonez',
    icon: FaGithub,
    color: 'bg-white'
  }
]

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  const t = useTranslations('Contact')
  const lines = t.raw('lines') as string[]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('.contact-line').forEach((line, i) => {
          gsap.fromTo(
            line,
            { xPercent: i % 2 ? 70 : -70, rotate: i % 2 ? 6 : -6 },
            {
              xPercent: 0,
              rotate: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: line,
                start: 'top bottom',
                end: 'top 55%',
                scrub: 0.6
              }
            }
          )
        })

        gsap.from('.contact-tile', {
          y: -120,
          rotate: i => [-10, 8, -6, 12][i % 4],
          opacity: 0,
          duration: 0.9,
          ease: 'bounce.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.contact-grid', start: 'top 85%' },
          clearProps: 'transform,opacity'
        })
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id='contact'
      className='relative overflow-hidden border-t-3 border-line bg-nb-yellow py-24 text-on-accent [--line:#0a0a0a]'
    >
      <div className='bg-dots pointer-events-none absolute inset-0' />
      <div className='container relative'>
        <span className='nb-chip mb-8 !bg-white !text-[#0a0a0a]'>
          {t('chip')}
        </span>
        <h2 className='font-display text-[clamp(2rem,7.5vw,8.5rem)] uppercase leading-[0.9]'>
          {lines.map((line, i) => (
            <span
              key={line}
              className={`contact-line block ${i % 2 ? 'text-right' : ''}`}
            >
              <span className={LINE_STYLES[i]}>{line}</span>
            </span>
          ))}
        </h2>

        <p className='mx-auto mt-10 max-w-xl text-center text-lg font-medium'>
          {t('intro')}
        </p>

        <div className='contact-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {CHANNELS.map(({ label, value, href, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`contact-tile nb-card nb-lift group flex flex-col gap-6 ${color} p-5 text-[#0a0a0a]`}
            >
              <div className='flex items-center justify-between'>
                <span className='nb-border grid size-12 place-items-center rounded-lg bg-white'>
                  <Icon className='size-6' />
                </span>
                <HiArrowUpRight className='size-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
              </div>
              <div>
                <div className='font-display text-2xl uppercase'>{label}</div>
                <div className='truncate font-mono text-xs font-bold'>
                  {value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

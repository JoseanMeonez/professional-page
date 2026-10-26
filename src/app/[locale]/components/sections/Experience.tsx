'use client'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { HiArrowLongRight } from 'react-icons/hi2'

// Roles, descriptions and (for UTH) the organization and tags live in messages under Experience.entries.<id>.
const ENTRIES: {
  id: string
  from: number
  to?: number
  organization?: string
  tags?: string[]
  type: 'work' | 'education'
  color: string
}[] = [
  {
    id: 'altiatek',
    from: 2025,
    organization: 'Altiatek',
    tags: [
      'ServiceNow',
      'Glide Scripting',
      'Flow Designer',
      'Node.js',
      'TypeScript',
      'Jest'
    ],
    type: 'work',
    color: 'bg-nb-lime'
  },
  {
    id: 'platino',
    from: 2023,
    to: 2025,
    organization: 'Grupo Platino',
    tags: [
      'C# .NET',
      'Angular',
      'SAP B1',
      'Clean Architecture',
      'CI/CD',
      'Jira'
    ],
    type: 'work',
    color: 'bg-nb-cyan'
  },
  {
    id: 'bytes',
    from: 2021,
    organization: 'Bytes',
    tags: [
      'Node.js',
      'Go',
      '.NET',
      'Java',
      'Python',
      'PHP/Laravel',
      'Tailwind CSS'
    ],
    type: 'work',
    color: 'bg-nb-yellow'
  },
  {
    id: 'uth',
    from: 2019,
    type: 'education',
    color: 'bg-nb-violet'
  }
]

export default function Experience() {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const t = useTranslations('Experience')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.set(viewport.current, { overflowX: 'hidden' })
        const distance = () => track.current!.scrollWidth - window.innerWidth

        // Vertical scroll → horizontal travel.
        const travel = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        })

        gsap.to('.exp-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true
          }
        })

        // Each card flips up in 3D as it slides into view.
        gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              rotateY: -35,
              rotateZ: i % 2 ? 5 : -5,
              y: i % 2 ? 80 : -80,
              scale: 0.85
            },
            {
              rotateY: 0,
              rotateZ: i % 2 ? 1.5 : -1.5,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: travel,
                start: 'left 95%',
                end: 'left 45%',
                scrub: true
              }
            }
          )
        })
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id='experience'
      className='relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-y-3 border-line bg-nb-blue pb-[3svh] pt-[clamp(4.25rem,10svh,6rem)] text-on-accent'
    >
      <div className='bg-dots pointer-events-none absolute inset-0 opacity-60 [--line:#0a0a0a]' />

      <div ref={viewport} className='relative overflow-x-auto'>
        <div
          ref={track}
          className='flex w-max items-center gap-6 px-5 pb-[2svh] [perspective:1200px] sm:gap-10 sm:px-10'
        >
          <div className='w-[min(80vw,520px)] shrink-0'>
            <span className='nb-chip mb-[2svh] !border-[#0a0a0a] !bg-white !text-[#0a0a0a]'>
              {t('chip')}
            </span>
            <h2 className='font-display text-[clamp(2.4rem,min(9vw,12svh),7.5rem)] uppercase leading-[0.85] text-white [-webkit-text-stroke:3px_#0a0a0a] [paint-order:stroke_fill]'>
              {t('title1')}
              <br />
              {t('title2')}
            </h2>
            <p className='mt-[2svh] flex items-center gap-3 font-mono text-sm font-bold uppercase'>
              {t('hint')} <HiArrowLongRight className='size-6' />
            </p>
          </div>

          {ENTRIES.map(entry => (
            <article
              key={entry.id}
              className={`exp-card nb-card w-[min(82vw,440px)] shrink-0 ${entry.color} p-[clamp(1rem,3svh,2rem)] shadow-nb-lg will-change-transform [--line:#0a0a0a]`}
            >
              <div className='mb-[2svh] flex items-center justify-between gap-3'>
                <span className='nb-border rounded-md bg-white px-2.5 py-1 font-mono text-xs font-bold'>
                  {entry.from} – {entry.to ?? t('present')}
                </span>
                <span className='font-mono text-xs font-bold uppercase'>
                  {t(entry.type)}
                </span>
              </div>
              <h3 className='font-display text-[clamp(1.25rem,min(6vw,3.8svh),1.875rem)] uppercase leading-tight'>
                {t(`entries.${entry.id}.role`)}
              </h3>
              <p className='mt-1 font-mono text-sm font-bold'>
                @ {entry.organization ?? t(`entries.${entry.id}.organization`)}
              </p>
              <p className='mt-[1.5svh] text-[clamp(0.78rem,2svh,0.95rem)] font-medium leading-relaxed tiny:leading-snug'>
                {t(`entries.${entry.id}.description`)}
              </p>
              <div className='mt-[2svh] flex flex-wrap gap-1.5'>
                {(
                  entry.tags ?? (t.raw(`entries.${entry.id}.tags`) as string[])
                ).map(tag => (
                  <span
                    key={tag}
                    className='nb-chip !border-[#0a0a0a] !bg-white !px-2 !py-0.5 !text-[10px] !text-[#0a0a0a]'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}

          <div className='grid w-[min(70vw,360px)] shrink-0 place-items-center'>
            <div className='nb-card rotate-3 bg-nb-yellow p-8 text-center shadow-nb-lg [--line:#0a0a0a]'>
              <div className='font-display text-5xl uppercase leading-none'>
                {t('next')}
              </div>
              <a href='#contact' className='nb-btn mt-6 bg-white px-5 py-3'>
                {t('talk')} <HiArrowLongRight className='size-5' />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='container relative mt-[2svh] motion-reduce:hidden'>
        <div className='nb-border h-4 overflow-hidden rounded-full bg-white [--line:#0a0a0a]'>
          <div className='exp-progress h-full origin-left scale-x-0 bg-nb-pink' />
        </div>
      </div>
    </section>
  )
}

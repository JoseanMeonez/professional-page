'use client'
import { TECH_ICONS } from '@/src/data/techIcons'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import SceneBoundary from '../three/SceneBoundary'
import { useInViewport } from '../three/useInViewport'

const TechScene = dynamic(() => import('../three/TechScene'), { ssr: false })

const CATEGORIES = [
  {
    label: 'frontend',
    color: 'bg-nb-yellow',
    skills: [
      'React',
      'React Native',
      'Next.js',
      'Angular',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS'
    ]
  },
  {
    label: 'backend',
    color: 'bg-nb-cyan',
    skills: ['C#', '.NET', 'Node.js', 'Go', 'Java', 'PHP', 'Laravel', 'Python']
  },
  {
    label: 'data',
    color: 'bg-nb-pink',
    skills: ['SQL Server', 'PostgreSQL', 'MySQL', 'Entity Framework', 'Prisma']
  },
  {
    label: 'platform',
    color: 'bg-nb-lime',
    skills: ['ServiceNow', 'Azure', 'Docker', 'Git', 'Vercel', 'Jira', 'SAP']
  }
]

const tileColor: Record<string, string> = {
  ...Object.fromEntries(TECH_ICONS.map(i => [i.name, i.tile])),
  // No logo tile of their own: borrow their platform's color.
  'React Native': TECH_ICONS.find(i => i.name === 'React')!.tile,
  'Entity Framework': TECH_ICONS.find(i => i.name === '.NET')!.tile
}

export default function TechStack() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const t = useTranslations('Tech')
  const active = useInViewport(stage)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Pin the 3D wall; scroll drives its rows sideways and the whole wall up.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: stage.current,
              start: 'top top',
              end: '+=220%',
              pin: true,
              scrub: 0.5,
              onUpdate: self => (progress.current = self.progress)
            }
          })
          .fromTo(
            '.tech-heading-a',
            { xPercent: 30 },
            { xPercent: -40, ease: 'none' },
            0
          )
          .fromTo(
            '.tech-heading-b',
            { xPercent: -30 },
            { xPercent: 40, ease: 'none' },
            0
          )

        // Category cards rise in from below as the stage arrives, chips slide in from alternating sides.
        gsap
          .timeline({
            scrollTrigger: { trigger: stage.current, start: 'top 55%' }
          })
          .from('.tech-col', {
            y: 120,
            rotate: i => (i % 2 ? 4 : -4),
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'back.out(1.6)'
          })
          .from(
            '.tech-chip',
            {
              x: j => (j % 2 ? 30 : -30),
              opacity: 0,
              stagger: 0.015,
              duration: 0.4,
              ease: 'power3.out'
            },
            0.3
          )
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} id='skills' className='relative bg-bg'>
      {/* One screen: heading on top, the 3D wall behind, the category list along the bottom. */}
      <div
        ref={stage}
        className='tech-stage relative flex h-[100svh] flex-col overflow-hidden'
      >
        <div className='bg-grid pointer-events-none absolute inset-0' />
        <div className='absolute inset-0'>
          <SceneBoundary>
            <TechScene progress={progress} active={active} />
          </SceneBoundary>
        </div>

        <div className='pointer-events-none relative z-10 flex flex-col items-center pt-[clamp(5rem,11svh,6.5rem)] font-display uppercase leading-[0.85]'>
          <h2 className='sr-only'>{t('heading')}</h2>
          <span
            className='tech-heading-a whitespace-nowrap text-[clamp(2.4rem,min(11vw,12svh),9rem)] [-webkit-text-stroke:0.12em_var(--bg)] [paint-order:stroke_fill]'
            aria-hidden
          >
            {t('heading')}
          </span>
          <span
            className='tech-heading-b whitespace-nowrap text-[clamp(2.4rem,min(11vw,12svh),9rem)] text-bg [-webkit-text-stroke:3px_var(--ink)]'
            aria-hidden
          >
            {t('heading')}
          </span>
        </div>

        <div className='relative z-10 mt-auto pb-[3svh]'>
          <div className='container flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pr-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 lg:pr-5'>
            {CATEGORIES.map(cat => (
              <div
                key={cat.label}
                className='tech-col nb-card w-[min(78vw,20rem)] shrink-0 snap-start bg-paper p-3 lg:w-auto'
              >
                <h3
                  className={`nb-border -mx-3 -mt-3 mb-3 rounded-t-[7px] border-x-0 border-t-0 ${cat.color} px-3 py-[clamp(0.3rem,1svh,0.6rem)] font-display text-[clamp(0.9rem,2.2svh,1.125rem)] uppercase text-on-accent`}
                >
                  {t(`categories.${cat.label}`)}
                </h3>
                <ul className='flex flex-wrap gap-1.5'>
                  {cat.skills.map(skill => (
                    <li
                      key={skill}
                      className='tech-chip nb-chip !px-2 !py-0.5 !text-[10px]'
                    >
                      <span
                        className='size-2 rounded-sm border border-line'
                        style={{
                          background: tileColor[skill] ?? 'var(--yellow)'
                        }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

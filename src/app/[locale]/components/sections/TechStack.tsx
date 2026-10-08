'use client'
import { TECH_ICONS } from '@/src/data/techIcons'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import SceneBoundary from '../three/SceneBoundary'
import { useInViewport } from '../three/useInViewport'

const TechScene = dynamic(() => import('../three/TechScene'), { ssr: false })

const CATEGORIES = [
  {
    label: 'Frontend',
    color: 'bg-nb-yellow',
    skills: [
      'React',
      'Next.js',
      'Angular',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS'
    ]
  },
  {
    label: 'Backend',
    color: 'bg-nb-cyan',
    skills: ['C#', '.NET', 'Node.js', 'Go', 'Java', 'PHP', 'Laravel', 'Python']
  },
  {
    label: 'Data',
    color: 'bg-nb-pink',
    skills: ['SQL Server', 'PostgreSQL', 'MySQL', 'Prisma']
  },
  {
    label: 'Platform & Tools',
    color: 'bg-nb-lime',
    skills: ['ServiceNow', 'Azure', 'Docker', 'Git', 'Vercel', 'Jira', 'SAP']
  }
]

const tileColor = Object.fromEntries(TECH_ICONS.map(i => [i.name, i.tile]))

export default function TechStack() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
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
          .fromTo(
            '.tech-count',
            { rotate: -12, scale: 0.8 },
            { rotate: 8, scale: 1.1, ease: 'none' },
            0
          )

        // Category columns drop in from above, chips slide in from alternating sides.
        gsap.utils.toArray<HTMLElement>('.tech-col').forEach((col, i) => {
          gsap.from(col, {
            y: -80,
            rotate: i % 2 ? 4 : -4,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.6)',
            scrollTrigger: { trigger: col, start: 'top 90%' }
          })
          gsap.from(col.querySelectorAll('.tech-chip'), {
            x: j => (j % 2 ? 40 : -40),
            opacity: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: col, start: 'top 85%' }
          })
        })
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} id='skills' className='relative bg-bg'>
      <div ref={stage} className='relative h-[100svh] overflow-hidden'>
        <div className='bg-grid pointer-events-none absolute inset-0' />
        <div className='absolute inset-0'>
          <SceneBoundary>
            <TechScene progress={progress} active={active} />
          </SceneBoundary>
        </div>

        <div className='pointer-events-none absolute inset-x-0 top-24 z-10 flex flex-col items-center font-display uppercase leading-[0.85]'>
          <span className='tech-heading-a whitespace-nowrap text-[clamp(3rem,11vw,9rem)]'>
            Tech stack
          </span>
          <span className='tech-heading-b nb-outline-text whitespace-nowrap text-[clamp(3rem,11vw,9rem)]'>
            Tech stack
          </span>
        </div>

        <div className='tech-count nb-card absolute bottom-8 left-5 z-10 bg-nb-orange px-5 py-3 text-on-accent sm:left-10'>
          <div className='font-display text-4xl leading-none'>
            {TECH_ICONS.length}
          </div>
          <div className='font-mono text-xs font-bold uppercase'>
            Technologies in 3D
          </div>
        </div>
        <span className='nb-chip absolute bottom-10 right-5 z-10 sm:right-10'>
          02 — Keep scrolling
        </span>
      </div>

      <div className='container relative z-10 grid gap-6 pb-24 pt-16 sm:grid-cols-2 lg:grid-cols-4'>
        {CATEGORIES.map(cat => (
          <div key={cat.label} className='tech-col nb-card bg-paper p-5'>
            <h3
              className={`nb-border -mx-5 -mt-5 mb-5 rounded-t-[7px] border-x-0 border-t-0 ${cat.color} px-5 py-3 font-display text-xl uppercase text-on-accent`}
            >
              {cat.label}
            </h3>
            <ul className='flex flex-wrap gap-2'>
              {cat.skills.map(skill => (
                <li key={skill} className='tech-chip nb-chip'>
                  <span
                    className='size-2.5 rounded-sm border border-line'
                    style={{ background: tileColor[skill] ?? 'var(--yellow)' }}
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

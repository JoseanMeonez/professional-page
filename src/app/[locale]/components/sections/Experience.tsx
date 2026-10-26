'use client'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import { useRef } from 'react'
import { HiArrowLongRight } from 'react-icons/hi2'

const ENTRIES = [
  {
    period: '2025 – Present',
    role: 'ServiceNow Technical Consultant',
    organization: 'Altiatek',
    description:
      'Engineering custom ServiceNow solutions with Glide Scripting (Business Rules, Script Includes) and Flow Designer / Integration Hub to automate complex workflows. Configuring Custom Scoped Applications and Platform Analytics dashboards. Node/TypeScript + Jest for API integrations.',
    tags: [
      'ServiceNow',
      'Glide Scripting',
      'Flow Designer',
      'Node.js',
      'TypeScript',
      'Jest'
    ],
    type: 'Work',
    color: 'bg-nb-lime'
  },
  {
    period: '2023 – 2025',
    role: 'Backend Developer Team Lead',
    organization: 'Grupo Platino',
    description:
      'Led an Agile team building enterprise CRM platforms with C# .NET (Clean Architecture) and Angular, integrating via SAP B1 Service Layer. Optimized CI/CD pipelines and managed project sprints in Jira.',
    tags: [
      'C# .NET',
      'Angular',
      'SAP B1',
      'Clean Architecture',
      'CI/CD',
      'Jira'
    ],
    type: 'Work',
    color: 'bg-nb-cyan'
  },
  {
    period: '2021 – Present',
    role: 'Freelance Full Stack Software Engineer',
    organization: 'Bytes',
    description:
      'Developed custom business applications and client websites using a broad full-stack toolset: Node, Go, .NET, Java, Python, PHP/Laravel, Bootstrap, and Tailwind CSS.',
    tags: [
      'Node.js',
      'Go',
      '.NET',
      'Java',
      'Python',
      'PHP/Laravel',
      'Tailwind CSS'
    ],
    type: 'Work',
    color: 'bg-nb-yellow'
  },
  {
    period: '2019 – Present',
    role: 'Software Engineering',
    organization: 'Universidad Tecnológica de Honduras (UTH)',
    description:
      "Bachelor's degree in Software Engineering, in progress. Parallel to professional experience in enterprise software development.",
    tags: ['Software Engineering', 'In Progress'],
    type: 'Education',
    color: 'bg-nb-violet'
  }
]

export default function Experience() {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

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
      className='relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-y-3 border-line bg-nb-blue py-24 text-on-accent'
    >
      <div className='bg-dots pointer-events-none absolute inset-0 opacity-60 [--line:#0a0a0a]' />

      <div ref={viewport} className='relative overflow-x-auto'>
        <div
          ref={track}
          className='flex w-max items-center gap-8 px-5 pb-6 [perspective:1200px] sm:gap-12 sm:px-10'
        >
          <div className='w-[min(80vw,520px)] shrink-0'>
            <span className='nb-chip mb-6 !border-[#0a0a0a] !bg-white !text-[#0a0a0a]'>
              03 — Experience
            </span>
            <h2 className='font-display text-[clamp(3rem,9vw,7.5rem)] uppercase leading-[0.85] text-white [-webkit-text-stroke:3px_#0a0a0a] [paint-order:stroke_fill]'>
              Where
              <br />
              I&apos;ve been
            </h2>
            <p className='mt-6 flex items-center gap-3 font-mono text-sm font-bold uppercase'>
              Scroll to travel <HiArrowLongRight className='size-6' />
            </p>
          </div>

          {ENTRIES.map(entry => (
            <article
              key={entry.role}
              className={`exp-card nb-card w-[min(82vw,440px)] shrink-0 ${entry.color} p-6 shadow-nb-lg will-change-transform [--line:#0a0a0a] sm:p-8`}
            >
              <div className='mb-5 flex items-center justify-between gap-3'>
                <span className='nb-border rounded-md bg-white px-2.5 py-1 font-mono text-xs font-bold'>
                  {entry.period}
                </span>
                <span className='font-mono text-xs font-bold uppercase'>
                  {entry.type}
                </span>
              </div>
              <h3 className='font-display text-2xl uppercase leading-tight sm:text-3xl'>
                {entry.role}
              </h3>
              <p className='mt-1 font-mono text-sm font-bold'>
                @ {entry.organization}
              </p>
              <p className='mt-4 text-[15px] font-medium leading-relaxed'>
                {entry.description}
              </p>
              <div className='mt-5 flex flex-wrap gap-1.5'>
                {entry.tags.map(tag => (
                  <span
                    key={tag}
                    className='nb-chip !border-[#0a0a0a] !bg-white !text-[#0a0a0a]'
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
                Next?
              </div>
              <a href='#contact' className='nb-btn mt-6 bg-white px-5 py-3'>
                Let&apos;s talk <HiArrowLongRight className='size-5' />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='container relative mt-6 motion-reduce:hidden'>
        <div className='nb-border h-4 overflow-hidden rounded-full bg-white [--line:#0a0a0a]'>
          <div className='exp-progress h-full origin-left scale-x-0 bg-nb-pink' />
        </div>
      </div>
    </section>
  )
}

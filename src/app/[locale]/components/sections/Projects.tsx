'use client'
import { Flip, gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { HiArrowUpRight } from 'react-icons/hi2'
import FeaturedCripco from './FeaturedCripco'

type Category = 'frontend' | 'backend' | 'fullstack'
type Filter = 'all' | Category

const FILTERS: Filter[] = ['all', 'fullstack', 'backend', 'frontend']

// Titles and descriptions live in messages under Projects.items.<id>.
const PROJECTS: {
  id: string
  technologies: string[]
  demo?: string
  github?: string
  categories: Category[]
  color: string
}[] = [
  {
    id: 'cripco',
    technologies: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL'],
    demo: 'https://cripco-hn.org',
    categories: ['fullstack', 'frontend'],
    color: 'bg-nb-lime'
  },
  {
    id: 'bytes',
    technologies: [],
    demo: 'https://byteshn.com',
    categories: ['frontend'],
    color: 'bg-nb-blue'
  },
  {
    id: 'pcs',
    technologies: ['Next.js', 'C#', '.NET', 'SQL Server', 'TypeScript'],
    demo: 'https://costos.wym.hn',
    categories: ['fullstack'],
    color: 'bg-nb-yellow'
  },
  {
    id: 'platino',
    technologies: [
      'Angular',
      'C#',
      '.NET',
      'SQL Server',
      'SAP B1',
      'SAP Service Layer'
    ],
    demo: 'https://crmrepuestos.platino.hn/',
    categories: ['fullstack'],
    color: 'bg-nb-cyan'
  },
  {
    id: 'pixel',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap 5'],
    demo: 'https://pixel-todo.laravel.cloud/',
    github: 'https://github.com/JoseanMeonez/Todo-list',
    categories: ['fullstack'],
    color: 'bg-nb-pink'
  },
  {
    id: 'clean',
    technologies: ['C#', '.NET', 'Clean Architecture', 'CQRS'],
    github: 'https://github.com/JoseanMeonez/Clean-Architecture',
    categories: ['backend'],
    color: 'bg-nb-violet'
  },
  {
    id: 'articles',
    technologies: ['C#', '.NET', 'Entity Framework', 'Clean Architecture'],
    github: 'https://github.com/JoseanMeonez/ArticlesAPI',
    categories: ['backend'],
    color: 'bg-nb-orange'
  },
  {
    id: 'aiskills',
    technologies: ['Python', 'AI/ML'],
    github: 'https://github.com/JoseanMeonez/AI-Skills',
    categories: ['backend'],
    color: 'bg-nb-red'
  }
]

export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const t = useTranslations('Projects')
  const flipState = useRef<Flip.FlipState | null>(null)

  const applyFilter = (value: Filter) => {
    if (value === filter) return
    flipState.current = Flip.getState('.project-card')
    setFilter(value)
  }

  // Entrance: heading slides in sideways, cards fall forward in 3D.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('.projects-word', {
          xPercent: i => (i % 2 ? 60 : -60),
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.projects-heading', start: 'top 85%' }
        })
        gsap.from('.project-card', {
          rotateX: -80,
          y: 80,
          opacity: 0,
          transformOrigin: '50% 0%',
          duration: 0.9,
          ease: 'back.out(1.3)',
          stagger: { each: 0.08, grid: 'auto', from: 'start' },
          // Hand transforms back to CSS so the hover lift works.
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' }
        })
      })
    },
    { scope: root }
  )

  // Filtering: Flip from the captured layout to the new one.
  useGSAP(
    () => {
      if (!flipState.current) return
      Flip.from(flipState.current, {
        duration: 0.6,
        ease: 'power3.inOut',
        absolute: true,
        scale: true,
        onEnter: els =>
          gsap.fromTo(
            els,
            { opacity: 0, scale: 0.6, rotate: -6 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.5 }
          ),
        onLeave: els =>
          gsap.to(els, { opacity: 0, scale: 0.6, rotate: 6, duration: 0.35 }),
        onComplete: () => {
          gsap.set('.project-card', { clearProps: 'transform,opacity' })
          ScrollTrigger.refresh()
        }
      })
      flipState.current = null
    },
    { scope: root, dependencies: [filter] }
  )

  return (
    <section
      ref={root}
      id='projects'
      className='relative overflow-hidden bg-bg py-24'
    >
      <div className='bg-grid pointer-events-none absolute inset-0' />
      <div className='container relative'>
        <div className='projects-heading mb-14 flex flex-wrap items-end justify-between gap-6'>
          <div>
            <span className='nb-chip mb-6 !bg-nb-pink !text-on-accent'>
              {t('chip')}
            </span>
            <h2 className='font-display text-[clamp(3rem,9vw,7.5rem)] uppercase leading-[0.85]'>
              <span className='projects-word block'>{t('title1')}</span>
              <span className='projects-word nb-outline-text block'>
                {t('title2')}
              </span>
            </h2>
          </div>
          <p className='max-w-sm text-lg text-muted'>{t('intro')}</p>
        </div>

        <FeaturedCripco />

        <div
          className='mb-10 mt-20 flex flex-wrap items-center gap-3'
          role='group'
          aria-label={t('filterGroup')}
        >
          <span className='mr-2 font-mono text-xs font-bold uppercase text-muted'>
            {t('filterLabel')}
          </span>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => applyFilter(f)}
              aria-pressed={filter === f}
              className={`nb-btn px-4 py-2 ${filter === f ? 'bg-nb-yellow' : 'bg-paper !text-ink'}`}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        <div className='projects-grid grid grid-cols-1 gap-8 [perspective:1400px] md:grid-cols-2 lg:grid-cols-3'>
          {PROJECTS.map((project, i) => {
            const visible =
              filter === 'all' || project.categories.includes(filter)
            return (
              <article
                key={project.id}
                className={`project-card nb-card nb-lift flex flex-col overflow-hidden bg-paper ${visible ? '' : 'hidden'}`}
              >
                <div
                  className={`flex items-center justify-between border-b-3 border-line ${project.color} px-5 py-3 text-on-accent`}
                >
                  <span className='font-mono text-xs font-bold uppercase'>
                    {project.categories.map(c => t(`filters.${c}`)).join(' · ')}
                  </span>
                  <span className='font-display text-2xl'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className='flex flex-1 flex-col p-5'>
                  <h3 className='font-display text-2xl uppercase leading-tight'>
                    {t(`items.${project.id}.title`)}
                  </h3>
                  <p className='mt-3 flex-1 text-[15px] leading-relaxed text-muted'>
                    {t(`items.${project.id}.description`)}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className='mt-5 flex flex-wrap gap-1.5'>
                      {project.technologies.map(tech => (
                        <span key={tech} className='nb-chip'>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className='mt-6 flex gap-3'>
                    {project.github && (
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='nb-btn bg-paper px-3 py-2 !text-ink'
                      >
                        <FaGithub className='size-4' /> {t('code')}
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='nb-btn bg-nb-lime px-3 py-2'
                      >
                        {t('live')} <HiArrowUpRight className='size-4' />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

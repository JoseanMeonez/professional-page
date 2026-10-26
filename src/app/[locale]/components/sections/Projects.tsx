'use client'
import { Flip, gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { HiArrowLeft, HiArrowRight, HiArrowUpRight } from 'react-icons/hi2'
import FeaturedCripco from './FeaturedCripco'
import FeaturedMcp from './FeaturedMcp'

type Category = 'ai' | 'frontend' | 'backend' | 'fullstack'
type Filter = 'all' | Category

// Tech chips shown per card before collapsing the rest into "+N".
const MAX_TECH = 4

const FILTERS: Filter[] = ['all', 'ai', 'fullstack', 'backend', 'frontend']

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
    id: 'mcp',
    technologies: ['TypeScript', 'Node.js', 'MCP SDK', 'Zod', 'Vitest'],
    github: 'https://github.com/JoseanMeonez/servicenow-mcp',
    categories: ['ai', 'backend'],
    color: 'bg-nb-violet'
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
    color: 'bg-nb-cyan'
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
    categories: ['ai', 'backend'],
    color: 'bg-nb-red'
  }
]

export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const rail = useRef<HTMLDivElement>(null)

  // Move the carousel by one card (card width + gap).
  const slide = (dir: 1 | -1) => {
    const el = rail.current
    const card = el?.querySelector<HTMLElement>('.project-card:not(.hidden)')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
  }
  const t = useTranslations('Projects')
  const flipState = useRef<Flip.FlipState | null>(null)

  const applyFilter = (value: Filter) => {
    if (value === filter) return
    flipState.current = Flip.getState('.project-card')
    // Same as the entrance: keep the CSS hover transition out of Flip's way.
    gsap.set('.project-card', { transition: 'none' })
    setFilter(value)
  }

  // Entrance: heading slides in sideways; the rail's cards fade up in sequence.
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
        // The cards' CSS hover transition on `transform` would chase every GSAP
        // frame and stutter, so it's switched off until the entrance is done.
        gsap
          .timeline({
            scrollTrigger: { trigger: '.projects-list', start: 'top 80%' }
          })
          .from('.projects-filters', {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
          })
          .fromTo(
            '.project-card',
            { y: 24, opacity: 0, transition: 'none' },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.08,
              // Hand transforms (and the hover transition) back to CSS.
              clearProps: 'transform,opacity,transition'
            },
            0.1
          )
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
            { opacity: 0, scale: 0.85, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          ),
        onLeave: els =>
          gsap.to(els, {
            opacity: 0,
            scale: 0.85,
            duration: 0.3,
            ease: 'power2.in'
          }),
        onComplete: () => {
          gsap.set('.project-card', {
            clearProps: 'transform,opacity,transition'
          })
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
      className='relative overflow-hidden bg-bg py-[10svh]'
    >
      <div className='bg-grid pointer-events-none absolute inset-0' />
      <div className='container relative'>
        <div className='projects-heading mb-[6svh] flex flex-wrap items-end justify-between gap-6'>
          <div>
            <span className='nb-chip mb-[2svh] !bg-nb-pink !text-on-accent'>
              {t('chip')}
            </span>
            <h2 className='font-display text-[clamp(2.4rem,min(9vw,11svh),7.5rem)] uppercase leading-[0.85]'>
              <span className='projects-word block'>{t('title1')}</span>
              <span className='projects-word nb-outline-text block'>
                {t('title2')}
              </span>
            </h2>
          </div>
          <p className='max-w-sm text-lg text-muted'>{t('intro')}</p>
        </div>

        <FeaturedCripco />
        <FeaturedMcp />

        {/* Filters + a swipeable rail of cards: the whole list fits one screen. */}
        <div className='projects-list mt-[10svh]'>
          <div className='projects-filters mb-[3svh] flex flex-wrap items-center gap-3'>
            <div
              className='flex flex-wrap items-center gap-3'
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
            <div className='ml-auto flex gap-3'>
              <button
                onClick={() => slide(-1)}
                className='nb-btn size-11 bg-paper !p-0 !text-ink'
                aria-label={t('previous')}
              >
                <HiArrowLeft className='size-5' />
              </button>
              <button
                onClick={() => slide(1)}
                className='nb-btn size-11 bg-nb-yellow !p-0'
                aria-label={t('next')}
              >
                <HiArrowRight className='size-5' />
              </button>
            </div>
          </div>

          <div
            ref={rail}
            className='projects-grid -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          >
            {PROJECTS.map((project, i) => {
              const visible =
                filter === 'all' || project.categories.includes(filter)
              return (
                <article
                  key={project.id}
                  className={`project-card nb-card nb-lift flex w-full shrink-0 snap-start flex-col overflow-hidden bg-paper sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] ${visible ? '' : 'hidden'}`}
                >
                  <div
                    className={`flex items-center justify-between gap-3 border-b-3 border-line ${project.color} px-4 py-[clamp(0.4rem,1.3svh,0.7rem)] text-on-accent`}
                  >
                    <span className='truncate font-mono text-[11px] font-bold uppercase'>
                      {project.categories
                        .map(c => t(`filters.${c}`))
                        .join(' · ')}
                    </span>
                    <span className='font-display text-2xl leading-none'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className='flex flex-1 flex-col p-[clamp(0.9rem,2.5svh,1.25rem)]'>
                    {/* Fixed line counts keep every card in the rail the same height. */}
                    <h3 className='line-clamp-3 min-h-[2.5em] font-display text-[clamp(1.1rem,2.8svh,1.4rem)] uppercase leading-[1.25] sm:line-clamp-2'>
                      {t(`items.${project.id}.title`)}
                    </h3>
                    <p className='mt-[1.2svh] line-clamp-3 text-[clamp(0.8rem,2svh,0.92rem)] leading-relaxed text-muted'>
                      {t(`items.${project.id}.description`)}
                    </p>
                    <div className='mt-auto flex flex-wrap gap-1.5 pt-[2svh]'>
                      {project.technologies.slice(0, MAX_TECH).map(tech => (
                        <span key={tech} className='nb-chip !text-[10px]'>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > MAX_TECH && (
                        <span className='nb-chip !bg-bg-alt !text-[10px]'>
                          +{project.technologies.length - MAX_TECH}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='flex gap-3 border-t-2 border-dashed border-[color-mix(in_srgb,var(--line)_35%,transparent)] px-[clamp(0.9rem,2.5svh,1.25rem)] py-[clamp(0.6rem,1.8svh,0.9rem)]'>
                    {project.github && (
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='nb-btn bg-paper px-3 py-1.5 text-xs !text-ink'
                      >
                        <FaGithub className='size-4' /> {t('code')}
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='nb-btn bg-nb-lime px-3 py-1.5 text-xs'
                      >
                        {t('live')} <HiArrowUpRight className='size-4' />
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

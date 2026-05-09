'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import Button from './components/Button'
import ContactButton from './components/ContactButton'
import ProjectCard from './components/ProjectCard'
import SkillsSection from './components/SkillsSection'
import Timeline from './components/Timeline'

type FilterCategory = 'all' | 'frontend' | 'backend' | 'fullstack'

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Backend', value: 'backend' },
  { label: 'Frontend', value: 'frontend' },
]

const ALL_PROJECTS = [
  {
    title: 'PCS - Construction Software',
    description:
      'Cost and project management platform for construction companies, covering budget tracking, resource allocation, and progress reporting in real time',
    technologies: ['Next.js', 'C#', '.NET', 'SQL Server', 'TypeScript'],
    demo: 'https://costos.wym.hn',
    category: 'fullstack' as const,
  },
  {
    title: 'Platino CRM',
    description:
      'CRM for the distribution of trucks, heavy machinery, and spare parts, integrated with SAP Business One for sales tracking, inventory, and customer management',
    technologies: ['Angular', 'C#', '.NET', 'SQL Server', 'SAP B1', 'SAP Service Layer'],
    demo: 'https://crmrepuestos.platino.hn/',
    category: 'fullstack' as const,
  },
  {
    title: 'Pixel Todo',
    description:
      'To-do list app built as a coding challenge using Laravel as the backend framework and Bootstrap 5 as the frontend interface',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap 5'],
    demo: 'https://pixel-todo.laravel.cloud/',
    github: 'https://github.com/JoseanMeonez/Todo-list',
    category: 'fullstack' as const,
  },
  {
    title: 'Clean Architecture Template',
    description:
      'C# .NET solution template structured across four layers — Api, Application, Domain, and Infrastructure — following Clean Architecture and CQRS patterns',
    technologies: ['C#', '.NET', 'Clean Architecture', 'CQRS'],
    github: 'https://github.com/JoseanMeonez/Clean-Architecture',
    category: 'backend' as const,
  },
  {
    title: 'ArticlesAPI',
    description:
      'REST API built with .NET that automatically creates the database via migrations on first run, with endpoints structured around Clean Architecture principles',
    technologies: ['C#', '.NET', 'Entity Framework', 'Clean Architecture'],
    github: 'https://github.com/JoseanMeonez/ArticlesAPI',
    category: 'backend' as const,
  },
  {
    title: 'AI-Skills',
    description:
      'A collection of Python scripts and experiments exploring AI tooling and automation workflows',
    technologies: ['Python', 'AI/ML'],
    github: 'https://github.com/JoseanMeonez/AI-Skills',
    category: 'backend' as const,
  },
]

const ROLES = [
  'Software Engineer',
  'ServiceNow Consultant',
  'Full Stack Developer',
  'Backend Architect',
]

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function DashboardPage() {
  const t = useTranslations('')
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const filteredProjects =
    activeFilter === 'all'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <div>
      {/* Hero */}
      <section className='relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-8 py-24'>
        {/* subtle grid background */}
        <div className='hero-grid pointer-events-none absolute inset-0 opacity-40' />
        {/* radial fade over the grid */}
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,var(--background)_100%)]' />

        <motion.div
          className='relative flex flex-col items-center text-center'
          variants={heroVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.p
            variants={heroItemVariants}
            className='mb-5 font-mono text-sm uppercase tracking-[0.25em] text-accent'
          >
            Hi, I&apos;m Andrés
          </motion.p>

          <motion.h1
            variants={heroItemVariants}
            className='font-display text-6xl font-extrabold leading-tight lg:text-7xl'
          >
            <span className='animate-gradient bg-span-bg bg-clip-text text-transparent'>
              Andrés Meoñez
            </span>
          </motion.h1>

          {/* Cycling role */}
          <div className='mt-3 h-10 overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='font-display text-2xl font-semibold text-text-secondary lg:text-3xl'
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            variants={heroItemVariants}
            className='my-8 max-w-2xl text-center text-lg text-text-secondary'
          >
            4+ years delivering enterprise platform architecture. Skilled in ServiceNow,
            .NET, Node, Go, Angular/React, and AI-assisted development.
          </motion.p>

          <motion.div
            variants={heroItemVariants}
            className='flex flex-row gap-4'
          >
            <a href='#projects'>
              <Button rounded size='large'>
                {t('View Projects')}
              </Button>
            </a>
            <ContactButton />
          </motion.div>
        </motion.div>
      </section>

      {/* What I Do */}
      <section className='bg-background-secondary px-8 py-20 max-lg:py-10'>
        <h2 className='mb-12 text-center font-display text-4xl font-bold'>
          {t('What I Do')}
        </h2>
        <div className='mx-auto grid max-w-screen-lg grid-cols-3 gap-7 py-5 max-lg:max-w-fit max-lg:grid-cols-1 max-lg:gap-10'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            className='rounded border border-border-theme bg-surface p-6 text-center shadow-sm'
          >
            <div className='mb-3 text-2xl text-accent'>{'</>'}</div>
            <h3 className='mb-3 font-display text-xl font-semibold'>
              {t('Frontend Development')}
            </h3>
            <p className='text-sm text-text-secondary max-lg:max-w-[500px]'>
              {t(
                'Building modern web applications with Angular, React, and Next.js, focusing on performance and user experience'
              )}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className='rounded border border-border-theme bg-surface p-6 text-center shadow-sm'
          >
            <div className='mb-3 text-2xl text-accent'>{'{ }'}</div>
            <h3 className='mb-3 font-display text-xl font-semibold'>
              {t('Backend Development')}
            </h3>
            <p className='text-sm text-text-secondary max-lg:max-w-[500px]'>
              {t(
                'Developing robust server-side solutions using .NET and Laravel, ensuring scalable and maintainable architectures'
              )}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='rounded border border-border-theme bg-surface p-6 text-center shadow-sm'
          >
            <div className='mb-3 text-2xl text-accent'>{'⇌'}</div>
            <h3 className='mb-3 font-display text-xl font-semibold'>
              {t('Full Stack Integration')}
            </h3>
            <p className='text-sm text-text-secondary max-lg:max-w-[500px]'>
              {t(
                'Seamlessly connecting frontend and backend systems to create cohesive, efficient, and powerful web solutions'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <SkillsSection />

      {/* Experience / Timeline */}
      <Timeline />

      {/* Projects */}
      <section id='projects' className='px-8 py-20'>
        <h2 className='mb-4 text-center font-display text-4xl font-bold'>
          {t('My Projects')}
        </h2>
        <p className='mb-10 text-center text-sm text-text-secondary'>
          Filter by category
        </p>

        {/* Filter bar */}
        <div className='mb-10 flex justify-center gap-2'>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className='relative rounded px-5 py-2 font-mono text-sm transition-colors'
            >
              {activeFilter === f.value && (
                <motion.span
                  layoutId='filter-pill'
                  className='absolute inset-0 rounded bg-button'
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={
                  activeFilter === f.value
                    ? 'text-button-text'
                    : 'text-text-secondary hover:text-primary'
                }
              >
                {f.label}
              </span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div
          layout
          className='mx-auto grid max-w-screen-lg grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard {...project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  )
}

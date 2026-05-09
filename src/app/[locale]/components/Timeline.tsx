'use client'
import { motion } from 'framer-motion'

type EntryType = 'work' | 'education'

const ENTRIES: {
  period: string
  role: string
  organization: string
  description: string
  tags: string[]
  type: EntryType
}[] = [
  {
    period: '2025 – Present',
    role: 'ServiceNow Technical Consultant',
    organization: 'Altiatek',
    description:
      'Engineering custom ServiceNow solutions with Glide Scripting (Business Rules, Script Includes) and Flow Designer / Integration Hub to automate complex workflows. Configuring Custom Scoped Applications and Platform Analytics dashboards. Node/TypeScript + Jest for API integrations.',
    tags: ['ServiceNow', 'Glide Scripting', 'Flow Designer', 'Node.js', 'TypeScript', 'Jest'],
    type: 'work',
  },
  {
    period: '2023 – 2025',
    role: 'Backend Developer Team Lead',
    organization: 'Grupo Platino',
    description:
      'Led an Agile team building enterprise CRM platforms with C# .NET (Clean Architecture) and Angular, integrating via SAP B1 Service Layer. Optimized CI/CD pipelines and managed project sprints in Jira.',
    tags: ['C# .NET', 'Angular', 'SAP B1', 'Clean Architecture', 'CI/CD', 'Jira'],
    type: 'work',
  },
  {
    period: '2021 – 2024',
    role: 'Freelance Full Stack Software Engineer',
    organization: 'Bytes',
    description:
      'Developed custom business applications and client websites using a broad full-stack toolset: Node, Go, .NET, Java, PHP/Laravel, Bootstrap, and Tailwind CSS.',
    tags: ['Node.js', 'Go', '.NET', 'Java', 'PHP/Laravel', 'Tailwind CSS'],
    type: 'work',
  },
  {
    period: '2019 – Present',
    role: 'Software Engineering',
    organization: 'Universidad Tecnológica de Honduras (UTH)',
    description:
      'Bachelor\'s degree in Software Engineering, in progress. Parallel to professional experience in enterprise software development.',
    tags: ['Software Engineering', 'In Progress'],
    type: 'education',
  },
]

const dotColor: Record<EntryType, string> = {
  work: 'bg-accent',
  education: 'bg-secondary',
}

export default function Timeline() {
  return (
    <section id='experience' className='px-8 py-20'>
      <h2 className='mb-16 text-center font-display text-4xl font-bold'>
        Experience
      </h2>

      {/* Desktop: centered line with alternating sides */}
      <div className='relative mx-auto hidden max-w-screen-lg md:block'>
        <div className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-theme' />

        {ENTRIES.map((entry, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className={`relative mb-12 w-[46%] ${isLeft ? 'mr-auto pr-8 text-right' : 'ml-auto pl-8 text-left'}`}
            >
              <span
                className={`absolute top-5 size-3 rounded-full ${dotColor[entry.type]} ${isLeft ? '-right-[6px]' : '-left-[6px]'}`}
              />

              <div className='rounded border border-border-theme bg-surface p-5 shadow-sm'>
                <div className={`flex items-center gap-2 mb-1 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                  {entry.type === 'education' && (
                    <span className='font-mono text-xs px-2 py-0.5 rounded bg-background-secondary text-text-secondary'>
                      Education
                    </span>
                  )}
                  <span className='font-mono text-xs text-accent'>
                    {entry.period}
                  </span>
                </div>
                <h3 className='font-display text-lg font-semibold'>
                  {entry.role}
                </h3>
                <p className='text-sm font-medium text-text-secondary'>
                  {entry.organization}
                </p>
                <p className='mt-2 text-sm text-text-secondary'>
                  {entry.description}
                </p>
                <div
                  className={`mt-3 flex flex-wrap gap-1.5 ${isLeft ? 'justify-end' : 'justify-start'}`}
                >
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded bg-background-secondary px-2 py-0.5 font-mono text-xs text-text-secondary'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile: left-aligned single column */}
      <div className='relative mx-auto max-w-lg md:hidden'>
        <div className='absolute left-3 top-0 h-full w-px bg-border-theme' />

        {ENTRIES.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className='relative mb-8 pl-10'
          >
            <span className={`absolute left-1 top-5 size-3 rounded-full ${dotColor[entry.type]}`} />

            <div className='rounded border border-border-theme bg-surface p-5 shadow-sm'>
              <div className='flex items-center gap-2 mb-1'>
                {entry.type === 'education' && (
                  <span className='font-mono text-xs px-2 py-0.5 rounded bg-background-secondary text-text-secondary'>
                    Education
                  </span>
                )}
                <span className='font-mono text-xs text-accent'>
                  {entry.period}
                </span>
              </div>
              <h3 className='font-display text-base font-semibold'>
                {entry.role}
              </h3>
              <p className='text-sm font-medium text-text-secondary'>
                {entry.organization}
              </p>
              <p className='mt-2 text-sm text-text-secondary'>
                {entry.description}
              </p>
              <div className='mt-3 flex flex-wrap gap-1.5'>
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded bg-background-secondary px-2 py-0.5 font-mono text-xs text-text-secondary'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

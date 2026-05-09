'use client'
import { motion } from 'framer-motion'
import { FaJava } from 'react-icons/fa'
import { MdSettingsApplications } from 'react-icons/md'
import {
  SiAngular,
  SiBootstrap,
  SiCsharp,
  SiDocker,
  SiDotnet,
  SiGit,
  SiGo,
  SiJira,
  SiLaravel,
  SiMicrosoftazure,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { DiMsqlServer } from 'react-icons/di'

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Angular', icon: <SiAngular /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Bootstrap', icon: <SiBootstrap /> },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'C# / .NET', icon: <SiCsharp /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Go', icon: <SiGo /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'PHP', icon: <SiPhp /> },
      { name: 'Laravel', icon: <SiLaravel /> },
      { name: 'Python', icon: <SiPython /> },
    ],
  },
  {
    label: 'Database',
    skills: [
      { name: 'SQL Server', icon: <DiMsqlServer /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MySQL', icon: <SiMysql /> },
    ],
  },
  {
    label: 'Platform & Cloud',
    skills: [
      { name: 'ServiceNow', icon: <MdSettingsApplications /> },
      { name: 'Azure', icon: <SiMicrosoftazure /> },
      { name: 'Docker', icon: <SiDocker /> },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'Jira', icon: <SiJira /> },
      { name: 'Vercel', icon: <SiVercel /> },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function SkillsSection() {
  return (
    <section id='skills' className='px-8 py-20 bg-background-secondary'>
      <h2 className='mb-12 text-center font-display text-4xl font-bold'>
        Tech Stack
      </h2>
      <div className='mx-auto max-w-screen-lg space-y-10'>
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.label}>
            <h3 className='mb-4 font-mono text-xs uppercase tracking-widest text-accent'>
              {category.label}
            </h3>
            <motion.div
              className='flex flex-wrap gap-3'
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-60px' }}
            >
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={chipVariants}
                  className='group flex cursor-default items-center gap-2 rounded border border-border-theme bg-surface px-3 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-l-2 hover:border-l-accent hover:text-primary'
                >
                  <span className='text-base text-accent'>{skill.icon}</span>
                  {skill.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

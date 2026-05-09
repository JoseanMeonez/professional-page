'use client'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

type Category = 'frontend' | 'backend' | 'fullstack'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  index: number
  image?: string
  category?: Category
}

const categoryAccent: Record<Category, string> = {
  frontend: 'border-t-secondary',
  backend: 'border-t-accent',
  fullstack: 'border-t-primary',
}

const SPRING = { stiffness: 300, damping: 30 }

export default function ProjectCard({
  title,
  description,
  technologies,
  github,
  demo,
  index,
  image,
  category,
}: ProjectCardProps) {
  const accentClass = category ? categoryAccent[category] : 'border-t-accent'
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), SPRING)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), SPRING)
  const glowX = useMotionTemplate`${useTransform(mouseX, [0, 1], [0, 100])}%`
  const glowY = useMotionTemplate`${useTransform(mouseY, [0, 1], [0, 100])}%`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`group relative overflow-hidden rounded border-t-2 border border-border-theme bg-surface shadow-sm transition-shadow hover:shadow-lg ${accentClass}`}
      >
        {/* Spotlight glow */}
        <motion.div
          className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          style={{
            background: useMotionTemplate`radial-gradient(200px circle at ${glowX} ${glowY}, var(--accent)18, transparent 70%)`,
          }}
        />

        {image && (
          <div className='-mx-0 -mt-0'>
            <img src={image} alt={title} className='w-full h-48 object-cover' />
          </div>
        )}

        <div className='p-6'>
          <h3 className='mb-3 font-display text-xl font-semibold'>{title}</h3>
          <p className='mb-4 text-sm text-text-secondary'>{description}</p>
          <div className='mb-4 flex flex-wrap gap-2'>
            {technologies.map((tech) => (
              <span
                key={tech}
                className='rounded px-2 py-0.5 font-mono text-xs bg-background-secondary text-text-secondary'
              >
                {tech}
              </span>
            ))}
          </div>
          <div className='flex gap-4'>
            {github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent'
              >
                <FaGithub /> Code
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent'
              >
                <FiExternalLink /> Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

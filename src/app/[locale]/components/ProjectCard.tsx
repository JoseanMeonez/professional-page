'use client'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  index: number
  image?: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  github,
  demo,
  index,
  image,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-6 bg-background-secondary rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
    >
      {image && (
        <div className="mb-4 -mx-6 -mt-6">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-button text-button-text text-sm rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {github && (
          <a
            href={github}
            target="_blank"
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
          >
            <FaGithub /> Code
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
          >
            <FiExternalLink /> Demo
          </a>
        )}
      </div>
    </motion.div>
  )
}

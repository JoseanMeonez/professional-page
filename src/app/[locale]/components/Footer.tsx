'use client'
import { Link } from '@/src/navigation'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { PiCodeBold } from 'react-icons/pi'

export default function Footer() {
  return (
    <footer className='border-t border-border-theme mt-20'>
      <div className='mx-auto max-w-screen-2xl px-8 py-12'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
          <div>
            <div className='mb-3 flex items-center gap-2'>
              <PiCodeBold className='size-5' />
              <strong className='font-display text-lg font-semibold'>
                Andrés Meoñez
              </strong>
            </div>
            <p className='max-w-xs text-sm text-text-secondary'>
              Full Stack Developer building enterprise-grade web applications
              with modern technologies.
            </p>
          </div>

          <div>
            <h4 className='mb-4 font-mono text-xs uppercase tracking-widest text-accent'>
              Navigation
            </h4>
            <nav className='flex flex-col gap-2 text-sm text-text-secondary'>
              <a
                href='#projects'
                className='transition-colors hover:text-primary'
              >
                Projects
              </a>
              <a
                href='#skills'
                className='transition-colors hover:text-primary'
              >
                Skills
              </a>
              <a
                href='#experience'
                className='transition-colors hover:text-primary'
              >
                Experience
              </a>
              <Link href='/about' className='transition-colors hover:text-primary'>
                About
              </Link>
            </nav>
          </div>

          <div>
            <h4 className='mb-4 font-mono text-xs uppercase tracking-widest text-accent'>
              Connect
            </h4>
            <div className='flex flex-col gap-3 text-sm text-text-secondary'>
              <a
                href='https://github.com/JoseanMeonez'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 transition-colors hover:text-primary'
              >
                <FaGithub className='size-4' />
                GitHub
              </a>
              <a
                href='https://linkedin.com/in/andrés-meoñez'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 transition-colors hover:text-primary'
              >
                <FaLinkedin className='size-4' />
                LinkedIn
              </a>
              <a
                href='mailto:joseanmeonez@gmail.com'
                className='flex items-center gap-2 transition-colors hover:text-primary'
              >
                <MdEmail className='size-4' />
                joseanmeonez@gmail.com
              </a>
              <a
                href='https://wa.me/50488664380'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 transition-colors hover:text-primary'
              >
                <FaWhatsapp className='size-4' />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className='mt-10 flex flex-col items-center justify-between gap-2 border-t border-border-theme pt-6 sm:flex-row'>
          <span className='font-mono text-xs text-text-secondary'>
            © {new Date().getFullYear()} Andrés Meoñez. All rights reserved.
          </span>
          <span className='font-mono text-xs text-text-secondary'>
            Built with Next.js + Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  )
}

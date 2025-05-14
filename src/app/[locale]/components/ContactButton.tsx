'use client'
import { useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useOnClickOutside } from 'usehooks-ts'
import Button from './Button'

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setIsOpen(false))

  return (
    <div ref={ref} className='relative inline-block'>
      <Button 
        rounded 
        size='large' 
        variant='secondary'
        onClick={() => setIsOpen(!isOpen)}
      >
        Contact Me
      </Button>
      
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 rounded-md bg-dropdown shadow-lg'>
          <a
            href='mailto:joseanmeonez@gmail.com'
            className='flex items-center gap-2 px-4 py-2 text-secondary hover:bg-dropdownHover'
          >
            <MdEmail className='text-xl' />
            Email
          </a>
          <a
            href='https://wa.me/50488664380'
            target='_blank'
            className='flex items-center gap-2 px-4 py-2 text-secondary hover:bg-dropdownHover'
          >
            <FaWhatsapp className='text-xl' />
            WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}

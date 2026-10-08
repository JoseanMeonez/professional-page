'use client'
import { gsap, ScrollTrigger, useGSAP } from '@/src/lib/gsap'
import { useRef } from 'react'

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const setScale = gsap.quickSetter(bar.current, 'scaleX')
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => setScale(self.progress)
    })
  })

  return (
    <div className='pointer-events-none fixed inset-x-0 top-0 z-[60] h-1.5'>
      <div ref={bar} className='h-full origin-left scale-x-0 bg-nb-pink' />
    </div>
  )
}

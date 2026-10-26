'use client'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { PiAsteriskBold } from 'react-icons/pi'

const BANDS = [
  { key: 'tech', className: 'bg-nb-yellow -rotate-2', direction: -1 },
  { key: 'motto', className: 'bg-ink text-bg rotate-1 -mt-4', direction: 1 }
] as const

/** Two crossing tickers. Scroll direction flips them; scroll velocity speeds them up and skews them. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null)
  const t = useTranslations('Marquee')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tracks = gsap.utils.toArray<HTMLElement>('.marquee-track')
        const loops = tracks.map((track, i) =>
          gsap.fromTo(
            track,
            { xPercent: BANDS[i].direction === -1 ? 0 : -50 },
            {
              xPercent: BANDS[i].direction === -1 ? -50 : 0,
              duration: 22,
              ease: 'none',
              repeat: -1
            }
          )
        )
        // Start deep into the infinite loop so a negative timeScale never hits time 0.
        loops.forEach(loop => loop.totalTime(loop.duration() * 500))
        const skew = gsap.quickTo(tracks, 'skewX', {
          duration: 0.4,
          ease: 'power3'
        })
        let direction = 1
        const settle = gsap
          .delayedCall(0.15, () => {
            loops.forEach(loop =>
              gsap.to(loop, {
                timeScale: direction,
                duration: 0.8,
                overwrite: true
              })
            )
            skew(0)
          })
          .pause()

        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: self => {
            const v = self.getVelocity()
            const boost = 1 + Math.min(Math.abs(v) / 250, 6)
            direction = self.direction
            loops.forEach(loop =>
              gsap.to(loop, {
                timeScale: direction * boost,
                duration: 0.2,
                overwrite: true
              })
            )
            skew(gsap.utils.clamp(-12, 12, v / -120))
            settle.restart(true)
          }
        })
      })
    },
    { scope: root }
  )

  return (
    <div
      ref={root}
      className='relative z-10 -my-2 overflow-hidden py-10'
      aria-hidden
    >
      {BANDS.map((band, i) => (
        <div key={i} className={`nb-border -mx-4 shadow-nb ${band.className}`}>
          <div className='marquee-track flex w-max'>
            {[0, 1].map(copy => (
              <div key={copy} className='flex shrink-0 items-center'>
                {(t.raw(band.key) as string[]).map(word => (
                  <span
                    key={word}
                    className={`flex items-center gap-6 px-6 py-3 font-display text-2xl uppercase sm:text-4xl ${
                      i === 0 ? 'text-on-accent' : ''
                    }`}
                  >
                    {word}
                    <PiAsteriskBold
                      className={i === 0 ? 'text-nb-pink' : 'text-nb-lime'}
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

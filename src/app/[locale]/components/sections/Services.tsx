'use client'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import {
  PiBracketsCurlyBold,
  PiCodeBold,
  PiGearSixBold,
  PiPlugsConnectedBold
} from 'react-icons/pi'

const SERVICES = [
  {
    id: 'frontend',
    tags: ['React', 'Next.js', 'Angular', 'Tailwind'],
    icon: PiCodeBold,
    color: 'bg-nb-yellow'
  },
  {
    id: 'backend',
    tags: ['C# .NET', 'Node.js', 'Go', 'CQRS'],
    icon: PiBracketsCurlyBold,
    color: 'bg-nb-cyan'
  },
  {
    id: 'servicenow',
    tags: ['Glide', 'Flow Designer', 'Integration Hub'],
    icon: PiGearSixBold,
    color: 'bg-nb-lime'
  },
  {
    id: 'integration',
    tags: ['REST', 'SAP B1', 'CI/CD', 'WhatsApp API'],
    icon: PiPlugsConnectedBold,
    color: 'bg-nb-pink'
  }
]

export default function Services() {
  const root = useRef<HTMLElement>(null)
  const t = useTranslations('Services')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.service-card')

        gsap.from('.services-title > *', {
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' }
        })

        // Pin the section and deal cards onto a stack, one per scroll step,
        // so the whole section always fits a single screen.
        const stack =
          root.current!.querySelector<HTMLElement>('.services-stack')!
        const height = Math.max(...cards.map(c => c.offsetHeight))
        gsap.set(stack, { height })
        gsap.set(cards, { position: 'absolute', inset: 0 })
        gsap.set(cards.slice(1), {
          yPercent: 140,
          rotate: i => (i % 2 ? -14 : 14),
          opacity: 1
        })

        const counter =
          root.current!.querySelector<HTMLElement>('.services-counter')!
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * (cards.length - 1)}`,
            pin: true,
            scrub: 0.8,
            snap: {
              snapTo: 1 / (cards.length - 1),
              duration: 0.4,
              ease: 'power1.inOut'
            },
            invalidateOnRefresh: true,
            onUpdate: self => {
              const idx = Math.round(self.progress * (cards.length - 1)) + 1
              counter.textContent = `0${idx}`
            }
          }
        })

        cards.slice(1).forEach((card, i) => {
          const below = cards.slice(0, i + 1)
          tl.to(card, { yPercent: 0, rotate: i % 2 ? -2 : 2, duration: 1 }, i)
            .to(
              below,
              {
                scale: j => 1 - (i + 1 - j) * 0.05,
                y: j => -(i + 1 - j) * 28,
                duration: 1
              },
              i
            )
            .to(
              // Dim buried cards with an overlay; animating CSS `filter` here
              // rendered the cards as black boxes on some GPUs.
              below.map(c => c.querySelector('.service-shade')),
              { opacity: 0.22, duration: 1 },
              i
            )
        })
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id='services'
      className='relative flex min-h-[100svh] items-center overflow-hidden border-y-3 border-line bg-bg-alt pb-[4svh] pt-[clamp(4.5rem,12svh,6.5rem)]'
    >
      <div className='bg-dots pointer-events-none absolute inset-0' />
      <div className='container relative grid items-center gap-[3svh] lg:grid-cols-[1fr_1.15fr] lg:gap-20'>
        <div>
          <span className='nb-chip mb-[2svh] !bg-nb-orange !text-on-accent'>
            {t('chip')}
          </span>
          <h2 className='services-title overflow-hidden font-display text-[clamp(2.4rem,min(11vw,9svh),7rem)] uppercase leading-[0.88]'>
            <span className='block'>{t('title1')}</span>
            <span className='block'>
              {t('title2')}{' '}
              <span className='nb-outline-text'>{t('title3')}</span>
            </span>
          </h2>
          <p className='mt-[2svh] max-w-md text-[clamp(0.9rem,2.2svh,1.125rem)] text-muted [@media(max-width:639px)_and_(max-height:700px)]:hidden'>
            {t('intro')}
          </p>
          <div
            className='mt-[4svh] hidden items-end gap-3 font-display lg:flex'
            aria-hidden
          >
            <span className='services-counter text-7xl leading-none'>01</span>
            <span className='pb-2 font-mono text-sm font-bold text-muted'>
              / 0{SERVICES.length}
            </span>
          </div>
        </div>

        <div className='services-stack relative grid gap-6'>
          {SERVICES.map(({ id, tags, icon: Icon, color }, i) => (
            <article
              key={id}
              className={`service-card nb-card relative flex flex-col justify-between gap-[2.5svh] ${color} p-[clamp(1rem,3.5svh,2.25rem)] text-on-accent`}
              style={{ zIndex: i + 1 }}
            >
              <span
                className='service-shade pointer-events-none absolute inset-0 rounded-[7px] bg-[#0a0a0a] opacity-0'
                aria-hidden
              />
              <div className='flex items-start justify-between gap-4'>
                <span className='nb-border grid size-[clamp(2.75rem,7svh,4rem)] place-items-center rounded-lg bg-white shadow-nb-sm [--line:#0a0a0a]'>
                  <Icon className='size-1/2' />
                </span>
                <span className='font-display text-[clamp(2rem,6.5svh,3.75rem)] leading-none opacity-90'>
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className='font-display text-[clamp(1.35rem,min(6.5vw,4.5svh),2.25rem)] uppercase leading-none'>
                  {t(`items.${id}.title`)}
                </h3>
                <p className='mt-[1.5svh] max-w-lg text-[clamp(0.85rem,2.2svh,1.125rem)] font-medium leading-relaxed'>
                  {t(`items.${id}.body`)}
                </p>
                <div className='mt-[2svh] flex flex-wrap gap-2'>
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className='nb-chip !border-[#0a0a0a] !bg-white !text-[#0a0a0a]'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

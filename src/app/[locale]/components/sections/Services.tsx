'use client'
import { gsap, useGSAP } from '@/src/lib/gsap'
import { useRef } from 'react'
import {
  PiBracketsCurlyBold,
  PiCodeBold,
  PiGearSixBold,
  PiPlugsConnectedBold
} from 'react-icons/pi'

const SERVICES = [
  {
    title: 'Frontend Development',
    body: 'Building modern web applications with Angular, React and Next.js, focusing on performance and user experience.',
    tags: ['React', 'Next.js', 'Angular', 'Tailwind'],
    icon: PiCodeBold,
    color: 'bg-nb-yellow'
  },
  {
    title: 'Backend Development',
    body: 'Robust server-side solutions with .NET, Node, Go and Laravel — scalable, maintainable, Clean Architecture first.',
    tags: ['C# .NET', 'Node.js', 'Go', 'CQRS'],
    icon: PiBracketsCurlyBold,
    color: 'bg-nb-cyan'
  },
  {
    title: 'ServiceNow & Automation',
    body: 'Custom scoped apps, Glide scripting and Flow Designer / Integration Hub flows that automate complex enterprise workflows.',
    tags: ['Glide', 'Flow Designer', 'Integration Hub'],
    icon: PiGearSixBold,
    color: 'bg-nb-lime'
  },
  {
    title: 'Full Stack Integration',
    body: 'Connecting frontends, APIs and ERPs like SAP Business One into cohesive, efficient products with solid CI/CD.',
    tags: ['REST', 'SAP B1', 'CI/CD', 'WhatsApp API'],
    icon: PiPlugsConnectedBold,
    color: 'bg-nb-pink'
  }
]

export default function Services() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop:
            '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          mobile:
            '(max-width: 1023px) and (prefers-reduced-motion: no-preference)'
        },
        ctx => {
          const { desktop } = ctx.conditions as {
            desktop: boolean
            mobile: boolean
          }
          const cards = gsap.utils.toArray<HTMLElement>('.service-card')

          gsap.from('.services-title > *', {
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: { trigger: root.current, start: 'top 70%' }
          })

          if (!desktop) {
            // Mobile: each card swings in from alternating sides.
            cards.forEach((card, i) => {
              gsap.from(card, {
                xPercent: i % 2 ? 60 : -60,
                rotate: i % 2 ? 10 : -10,
                opacity: 0,
                duration: 0.9,
                ease: 'back.out(1.4)',
                scrollTrigger: { trigger: card, start: 'top 85%' }
              })
            })
            return
          }

          // Desktop: pin the section and deal cards onto a stack, one per scroll step.
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
            tl.to(
              card,
              { yPercent: 0, rotate: i % 2 ? -2 : 2, duration: 1 },
              i
            ).to(
              below,
              {
                scale: j => 1 - (i + 1 - j) * 0.05,
                y: j => -(i + 1 - j) * 28,
                filter: 'saturate(0.6) brightness(0.92)',
                duration: 1
              },
              i
            )
          })
        }
      )
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id='services'
      className='relative overflow-hidden border-y-3 border-line bg-bg-alt py-24 lg:flex lg:min-h-screen lg:items-center lg:py-0'
    >
      <div className='bg-dots pointer-events-none absolute inset-0' />
      <div className='container relative grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20'>
        <div>
          <span className='nb-chip mb-6 !bg-nb-orange !text-on-accent'>
            01 — Services
          </span>
          <h2 className='services-title overflow-hidden font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.88]'>
            <span className='block'>What</span>
            <span className='block'>
              I <span className='nb-outline-text'>do</span>
            </span>
          </h2>
          <p className='mt-6 max-w-md text-lg text-muted'>
            From pixel-perfect interfaces to enterprise integrations — I design,
            build and ship the full stack.
          </p>
          <div
            className='mt-10 hidden items-end gap-3 font-display lg:flex'
            aria-hidden
          >
            <span className='services-counter text-7xl leading-none'>01</span>
            <span className='pb-2 font-mono text-sm font-bold text-muted'>
              / 0{SERVICES.length}
            </span>
          </div>
        </div>

        <div className='services-stack relative grid gap-8'>
          {SERVICES.map(({ title, body, tags, icon: Icon, color }, i) => (
            <article
              key={title}
              className={`service-card nb-card flex flex-col justify-between gap-8 ${color} p-7 text-on-accent will-change-transform sm:p-9`}
              style={{ zIndex: i + 1 }}
            >
              <div className='flex items-start justify-between gap-4'>
                <span className='nb-border grid size-16 place-items-center rounded-lg bg-white shadow-nb-sm [--line:#0a0a0a]'>
                  <Icon className='size-8' />
                </span>
                <span className='font-display text-6xl opacity-90'>
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className='font-display text-3xl uppercase leading-none sm:text-4xl'>
                  {title}
                </h3>
                <p className='mt-4 max-w-lg text-base font-medium leading-relaxed sm:text-lg'>
                  {body}
                </p>
                <div className='mt-6 flex flex-wrap gap-2'>
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

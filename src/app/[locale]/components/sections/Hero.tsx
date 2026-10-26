'use client'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { HiArrowDown, HiArrowUpRight } from 'react-icons/hi2'
import SceneBoundary from '../three/SceneBoundary'
import { useInViewport } from '../three/useInViewport'

const HeroScene = dynamic(() => import('../three/HeroScene'), { ssr: false })

const ROLES = [
  'Software Engineer',
  'ServiceNow Consultant',
  'Full Stack Developer',
  'Backend Architect'
]

const STATS = [
  { value: '4+', label: 'Years shipping', color: 'bg-nb-yellow' },
  { value: '7', label: 'Featured projects', color: 'bg-nb-pink' },
  { value: '27', label: 'Technologies', color: 'bg-nb-cyan' }
]

function SplitWord({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={`-mt-[0.22em] inline-block overflow-hidden pb-[0.08em] pt-[0.22em] align-bottom ${className ?? ''}`}
      aria-hidden
    >
      {Array.from(text).map((ch, i) => (
        <span key={i} className='hero-char inline-block will-change-transform'>
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const active = useInViewport(root)

  useGSAP(
    () => {
      // Role ticker runs regardless of motion preference (it's content, not decoration).
      const roleEl = root.current!.querySelector<HTMLElement>('.hero-role')!
      let roleIndex = 0
      const swap = () => {
        roleIndex = (roleIndex + 1) % ROLES.length
        gsap
          .timeline()
          .to(roleEl, {
            yPercent: -100,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in'
          })
          .call(() => {
            roleEl.textContent = ROLES[roleIndex]
          })
          .fromTo(
            roleEl,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' }
          )
      }
      const ticker = gsap.delayedCall(2.6, function repeat() {
        swap()
        ticker.restart(true)
      })

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
        intro
          .from('.hero-char', {
            yPercent: 115,
            rotate: 12,
            duration: 0.9,
            stagger: 0.035
          })
          .from(
            '.hero-sticker',
            { scale: 0, rotate: -40, duration: 0.6, ease: 'back.out(2.5)' },
            0.3
          )
          .from(
            '.hero-reveal',
            { y: 40, opacity: 0, duration: 0.7, stagger: 0.08 },
            0.5
          )
          .from(
            '.hero-stat',
            {
              y: 60,
              rotate: i => (i % 2 ? 8 : -8),
              opacity: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'back.out(1.8)'
            },
            0.8
          )

        // Scroll out: the two name lines split horizontally, content sinks, 3D swarm scatters.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
              onUpdate: self => (progress.current = self.progress)
            }
          })
          .to('.hero-line-1', { xPercent: -35, ease: 'none' }, 0)
          .to('.hero-line-2', { xPercent: 35, ease: 'none' }, 0)
          .to('.hero-body', { y: 120, opacity: 0, ease: 'none' }, 0)
          .to('.hero-stats', { y: -60, rotate: -3, ease: 'none' }, 0)
      })

      return () => ticker.kill()
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id='top'
      className='relative flex min-h-[100svh] items-center overflow-hidden bg-bg pb-16 pt-28'
    >
      <div className='bg-grid pointer-events-none absolute inset-0' />

      <div className='pointer-events-none absolute inset-0'>
        <SceneBoundary>
          <HeroScene progress={progress} active={active} />
        </SceneBoundary>
      </div>

      <div className='container relative'>
        <div className='max-w-4xl'>
          <div className='hero-reveal mb-6 flex flex-wrap items-center gap-3'>
            <span className='nb-chip !bg-nb-lime !text-on-accent'>
              <span className='size-2 animate-pulse rounded-full bg-[#0a0a0a]' />
              Available for work
            </span>
            <span className='nb-chip'>Honduras · Remote</span>
          </div>

          <h1 className='font-display uppercase leading-[0.86] tracking-tight'>
            <span className='sr-only'>Andrés Meoñez — {ROLES[0]}</span>
            <span className='hero-line-1 block text-[clamp(3.6rem,13vw,10.5rem)]'>
              <SplitWord text='Andrés' />
            </span>
            <span className='hero-line-2 relative block text-[clamp(3.6rem,13vw,10.5rem)]'>
              <span className='relative isolate inline-block'>
                <span className='nb-border absolute inset-x-[-0.08em] bottom-[0.1em] top-[0.18em] -z-10 -rotate-1 rounded-md bg-nb-yellow' />
                <SplitWord text='Meoñez' className='px-1 text-on-accent' />
              </span>
              <span className='hero-sticker nb-border absolute -top-6 right-0 hidden size-28 rotate-12 place-items-center rounded-full bg-nb-pink text-center font-mono text-[11px] font-bold uppercase leading-tight text-on-accent shadow-nb sm:grid md:-right-10'>
                <span className='animate-nb-spin absolute inset-1 rounded-full border-2 border-dashed border-[#0a0a0a]' />
                Full
                <br />
                Stack
                <br />
                Dev
              </span>
            </span>
          </h1>

          <div className='hero-body'>
            <div className='hero-reveal mt-8 flex items-center gap-3 font-mono text-lg font-bold sm:text-2xl'>
              <span className='nb-border rounded-md bg-ink px-2 text-bg'>
                &gt;_
              </span>
              <span className='relative inline-block h-[1.4em] overflow-hidden'>
                <span className='hero-role inline-block' aria-live='polite'>
                  {ROLES[0]}
                </span>
              </span>
            </div>

            <p className='hero-reveal nb-card mt-6 max-w-xl bg-paper p-5 text-base leading-relaxed sm:text-lg'>
              4+ years delivering enterprise platform architecture. Skilled in{' '}
              <mark className='rounded bg-nb-cyan px-1 text-on-accent'>
                ServiceNow
              </mark>
              ,{' '}
              <mark className='rounded bg-nb-violet px-1 text-on-accent'>
                .NET
              </mark>
              , Node, Go, Angular/React and AI-assisted development.
            </p>

            <div className='hero-reveal mt-8 flex flex-wrap gap-4'>
              <a
                href='#projects'
                className='nb-btn bg-nb-yellow px-6 py-4 text-base'
              >
                View projects <HiArrowDown className='size-5' />
              </a>
              <a
                href='#contact'
                className='nb-btn bg-paper px-6 py-4 text-base !text-ink'
              >
                Contact me <HiArrowUpRight className='size-5' />
              </a>
            </div>
          </div>

          <div className='hero-stats mt-12 grid max-w-xl grid-cols-3 gap-3 sm:gap-4'>
            {STATS.map(s => (
              <div
                key={s.label}
                className={`hero-stat nb-card ${s.color} p-3 text-on-accent sm:p-4`}
              >
                <div className='font-display text-3xl sm:text-4xl'>
                  {s.value}
                </div>
                <div className='font-mono text-[10px] font-bold uppercase sm:text-xs'>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href='#services'
        className='animate-nb-bob absolute bottom-6 right-6 hidden items-center gap-2 font-mono text-xs font-bold uppercase md:flex'
      >
        Scroll <HiArrowDown className='size-4' />
      </a>
    </section>
  )
}

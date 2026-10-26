'use client'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { HiArrowDown, HiArrowUpRight } from 'react-icons/hi2'
import SceneBoundary from '../three/SceneBoundary'
import { useInViewport } from '../three/useInViewport'

const HeroScene = dynamic(() => import('../three/HeroScene'), { ssr: false })

const STATS = [
  { value: '4+', label: 'years', color: 'bg-nb-yellow' },
  { value: '9', label: 'featured', color: 'bg-nb-pink' },
  { value: '27', label: 'technologies', color: 'bg-nb-cyan' }
] as const

function SplitWord({
  text,
  className = '-mt-[0.22em] pb-[0.08em] pt-[0.22em]'
}: {
  text: string
  className?: string
}) {
  return (
    <span
      className={`inline-block overflow-hidden align-bottom ${className}`}
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
  const t = useTranslations('Hero')
  const roles: string[] = t.raw('roles')

  useGSAP(
    () => {
      // Role ticker runs regardless of motion preference (it's content, not decoration).
      const roleEl = root.current!.querySelector<HTMLElement>('.hero-role')!
      let roleIndex = 0
      const swap = () => {
        roleIndex = (roleIndex + 1) % roles.length
        gsap
          .timeline()
          .to(roleEl, {
            yPercent: -100,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in'
          })
          .call(() => {
            roleEl.textContent = roles[roleIndex]
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
      className='relative flex min-h-[100svh] items-center overflow-hidden bg-bg pb-[clamp(1rem,4svh,3rem)] pt-[clamp(5rem,12svh,7rem)]'
    >
      <div className='bg-grid pointer-events-none absolute inset-0' />

      <div className='pointer-events-none absolute inset-0'>
        <SceneBoundary>
          <HeroScene progress={progress} active={active} />
        </SceneBoundary>
      </div>

      <div className='container relative'>
        {/* Everything is sized off the viewport height too, so the whole hero fits one screen. */}
        <div className='max-w-4xl lg:max-w-5xl'>
          <div className='hero-reveal mb-[2.5svh] flex flex-wrap items-center gap-3'>
            <span className='nb-chip !bg-nb-lime !text-on-accent'>
              <span className='size-2 animate-pulse rounded-full bg-[#0a0a0a]' />
              {t('available')}
            </span>
            <span className='nb-chip'>{t('location')}</span>
          </div>

          <h1 className='font-display uppercase leading-[0.86] tracking-tight'>
            <span className='sr-only'>Andrés Meoñez — {roles[0]}</span>
            <span className='hero-line-1 block text-[clamp(2.6rem,min(13vw,14svh),10.5rem)]'>
              <SplitWord text='Andrés' />
            </span>
            <span className='hero-line-2 relative block text-[clamp(2.6rem,min(13vw,14svh),10.5rem)]'>
              {/* The sticker is pinned to the yellow box's top-right corner and sized
                  off the viewport height like the title, so it sits on that corner at every size. */}
              <span className='relative inline-block'>
                {/* The yellow box is the word's own clip container, so it always sits right under the letters. */}
                <SplitWord
                  text='Meoñez'
                  className='nb-border mt-[0.06em] -rotate-1 rounded-lg bg-nb-yellow px-[0.1em] pb-[0.04em] pt-[0.16em] text-[#0a0a0a] shadow-nb'
                />
                <span className='hero-sticker nb-border absolute -right-[clamp(2.25rem,6svh,3.5rem)] -top-[clamp(2rem,5svh,3rem)] hidden size-[clamp(4.5rem,12svh,6.5rem)] rotate-12 place-items-center rounded-full bg-nb-pink text-center font-mono text-[clamp(9px,1.4svh,12px)] font-bold uppercase leading-tight text-on-accent shadow-nb sm:grid'>
                  <span className='animate-nb-spin absolute inset-1 rounded-full border-2 border-dashed border-[#0a0a0a]' />
                  <span className='relative'>
                    {t.rich('sticker', { br: () => <br /> })}
                  </span>
                </span>
              </span>
            </span>
          </h1>

          <div className='hero-body'>
            <div className='hero-reveal mt-[3svh] flex items-center gap-3 font-mono text-[clamp(1rem,min(4.5vw,3svh),1.5rem)] font-bold'>
              <span className='nb-border rounded-md bg-ink px-2 text-bg'>
                &gt;_
              </span>
              <span className='relative inline-block h-[1.4em] overflow-hidden'>
                <span className='hero-role inline-block' aria-live='polite'>
                  {roles[0]}
                </span>
              </span>
            </div>

            <p className='hero-reveal nb-card mt-[2.5svh] max-w-xl bg-paper p-[clamp(0.75rem,2svh,1.25rem)] text-[clamp(0.9rem,min(4vw,2.3svh),1.125rem)] leading-relaxed'>
              {t.rich('bio', {
                sn: chunks => (
                  <mark className='rounded bg-nb-cyan px-1 text-on-accent'>
                    {chunks}
                  </mark>
                ),
                net: chunks => (
                  <mark className='rounded bg-nb-violet px-1 text-on-accent'>
                    {chunks}
                  </mark>
                )
              })}
            </p>
          </div>

          <div className='mt-[4svh] flex flex-col gap-[3svh] lg:flex-row lg:items-end lg:gap-8'>
            <div className='hero-reveal flex flex-wrap gap-2.5 sm:gap-4'>
              <a
                href='#projects'
                className='nb-btn bg-nb-yellow px-3 py-[clamp(0.6rem,1.6svh,1rem)] text-xs sm:px-6 sm:text-base'
              >
                {t('viewProjects')} <HiArrowDown className='size-4 sm:size-5' />
              </a>
              <a
                href='#contact'
                className='nb-btn bg-paper px-3 py-[clamp(0.6rem,1.6svh,1rem)] text-xs !text-ink sm:px-6 sm:text-base'
              >
                {t('contactMe')} <HiArrowUpRight className='size-4 sm:size-5' />
              </a>
            </div>
            <div className='hero-stats grid max-w-xl grid-cols-3 gap-3 sm:gap-4 lg:w-[30rem] lg:shrink-0 [@media(max-width:639px)_and_(max-height:660px)]:hidden'>
              {STATS.map(s => (
                <div
                  key={s.label}
                  className={`hero-stat nb-card ${s.color} p-[clamp(0.5rem,1.6svh,1rem)] text-on-accent`}
                >
                  <div className='font-display text-[clamp(1.5rem,min(7vw,4.5svh),2.25rem)] leading-none'>
                    {s.value}
                  </div>
                  <div className='mt-1 font-mono text-[10px] font-bold uppercase sm:text-xs'>
                    {t(s.label)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href='#services'
        className='animate-nb-bob absolute bottom-6 right-6 hidden items-center gap-2 font-mono text-xs font-bold uppercase md:flex short:hidden'
      >
        {t('scroll')} <HiArrowDown className='size-4' />
      </a>
    </section>
  )
}

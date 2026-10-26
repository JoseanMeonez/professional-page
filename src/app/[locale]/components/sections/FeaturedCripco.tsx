'use client'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { HiArrowUpRight } from 'react-icons/hi2'
import {
  PiCalendarCheckBold,
  PiChartBarBold,
  PiFolderOpenBold,
  PiStethoscopeBold,
  PiUsersThreeBold
} from 'react-icons/pi'

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Prisma',
  'PostgreSQL',
  'Auth.js',
  'Tailwind CSS',
  'WhatsApp Cloud API',
  'PWA'
]

const NAV = [
  { icon: PiUsersThreeBold, label: 'Pacientes' },
  { icon: PiCalendarCheckBold, label: 'Citas', active: true },
  { icon: PiStethoscopeBold, label: 'Terapeutas' },
  { icon: PiFolderOpenBold, label: 'Tratamientos' },
  { icon: PiChartBarBold, label: 'Reportes' }
]

// [column (0-4), start row, span, color]
const APPOINTMENTS: [number, number, number, string][] = [
  [0, 0, 2, 'bg-nb-yellow'],
  [1, 1, 1, 'bg-nb-pink'],
  [2, 0, 1, 'bg-nb-cyan'],
  [2, 2, 2, 'bg-nb-lime'],
  [3, 1, 2, 'bg-nb-violet'],
  [4, 0, 1, 'bg-nb-orange'],
  [0, 3, 1, 'bg-nb-cyan'],
  [4, 2, 2, 'bg-nb-yellow']
]

/** Featured project: CRIPCO, with a hand-drawn mock of its dashboard that assembles itself on scroll. */
export default function FeaturedCripco() {
  const root = useRef<HTMLDivElement>(null)
  const t = useTranslations('Cripco')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // The whole card tilts back in 3D and flattens as it reaches the center.
        gsap.fromTo(
          '.cripco-card',
          { rotateX: 28, rotateZ: -3, scale: 0.86, y: 80 },
          {
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'center 60%',
              scrub: 0.6
            }
          }
        )

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top 60%' }
        })
        tl.from('.cripco-nav', {
          x: -30,
          opacity: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: 'power3.out'
        })
          .from(
            '.cripco-slot',
            {
              scale: 0,
              opacity: 0,
              transformOrigin: '50% 0%',
              stagger: 0.06,
              duration: 0.45,
              ease: 'back.out(2)'
            },
            '<0.1'
          )
          .from(
            '.cripco-bubble',
            {
              x: 120,
              rotate: 12,
              opacity: 0,
              duration: 0.7,
              ease: 'back.out(1.8)'
            },
            '-=0.2'
          )
          .from(
            '.cripco-sticker',
            { scale: 0, rotate: -90, duration: 0.6, ease: 'back.out(2.5)' },
            '<'
          )
          .from(
            '.cripco-feature',
            { x: -20, opacity: 0, stagger: 0.05, duration: 0.4 },
            0.2
          )
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className='[perspective:1600px]'>
      <article className='cripco-card nb-card relative grid overflow-visible bg-nb-lime text-on-accent shadow-nb-xl will-change-transform [--line:#0a0a0a] lg:grid-cols-[1fr_1.15fr]'>
        <span className='cripco-sticker nb-border absolute -right-4 -top-6 z-20 grid size-24 rotate-12 place-items-center rounded-full bg-nb-pink text-center font-display text-lg uppercase leading-none shadow-nb sm:-right-6 sm:size-28'>
          {t('sticker')}
          <br />
          2026
        </span>

        <div className='p-6 sm:p-10'>
          <div className='mb-4 flex flex-wrap gap-2'>
            <span className='nb-chip !border-[#0a0a0a] !bg-[#0a0a0a] !text-nb-lime'>
              {t('featured')}
            </span>
            <span className='nb-chip !border-[#0a0a0a] !bg-white !text-[#0a0a0a]'>
              {t('tag')}
            </span>
          </div>
          <h3 className='font-display text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.85]'>
            Cripco
          </h3>
          <p className='mt-2 font-mono text-sm font-bold uppercase'>
            {t('subtitle')}
          </p>
          <p className='mt-5 max-w-xl text-base font-medium leading-relaxed sm:text-lg'>
            {t('description')}
          </p>

          <ul className='mt-6 grid gap-2 sm:grid-cols-2'>
            {(t.raw('features') as string[]).map(f => (
              <li
                key={f}
                className='cripco-feature flex items-start gap-2 text-sm font-bold'
              >
                <span className='mt-1 size-3 shrink-0 rotate-45 border-2 border-[#0a0a0a] bg-white' />
                {f}
              </li>
            ))}
          </ul>

          <div className='mt-6 flex flex-wrap gap-1.5'>
            {STACK.map(tech => (
              <span
                key={tech}
                className='nb-chip !border-[#0a0a0a] !bg-white !text-[#0a0a0a]'
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href='https://cripco-hn.org'
            target='_blank'
            rel='noopener noreferrer'
            className='nb-btn mt-8 bg-[#0a0a0a] px-5 py-3 !text-nb-lime'
          >
            {t('visit')} <HiArrowUpRight className='size-4' />
          </a>
        </div>

        {/* Dashboard mock */}
        <div
          className='flex items-center border-t-3 border-[#0a0a0a] p-4 pb-12 sm:p-8 sm:pb-14 lg:border-l-3 lg:border-t-0'
          aria-hidden
        >
          <div className='relative w-full'>
            <div className='nb-border overflow-hidden rounded-lg bg-white shadow-nb-lg'>
              <div className='flex items-center gap-2 border-b-3 border-[#0a0a0a] bg-nb-yellow px-3 py-2'>
                <span className='size-3 rounded-full border-2 border-[#0a0a0a] bg-nb-red' />
                <span className='size-3 rounded-full border-2 border-[#0a0a0a] bg-nb-orange' />
                <span className='size-3 rounded-full border-2 border-[#0a0a0a] bg-nb-lime' />
                <span className='ml-2 flex-1 truncate rounded border-2 border-[#0a0a0a] bg-white px-2 font-mono text-[10px] font-bold'>
                  cripco-hn.org / dashboard / citas
                </span>
              </div>
              <div className='grid grid-cols-[auto_1fr]'>
                <nav className='flex flex-col gap-1.5 border-r-3 border-[#0a0a0a] bg-[#0a0a0a] p-2 sm:p-3'>
                  {NAV.map(({ icon: Icon, label, active }) => (
                    <span
                      key={label}
                      className={`cripco-nav flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[10px] font-bold ${
                        active ? 'bg-nb-lime text-[#0a0a0a]' : 'text-white'
                      }`}
                    >
                      <Icon className='size-4 shrink-0' />
                      <span className='hidden sm:inline'>{label}</span>
                    </span>
                  ))}
                </nav>
                <div className='p-3 sm:p-4'>
                  <div className='mb-3 flex items-center justify-between'>
                    <span className='font-display text-sm uppercase'>
                      Citas · Semana
                    </span>
                    <span className='rounded border-2 border-[#0a0a0a] bg-nb-pink px-1.5 font-mono text-[9px] font-bold'>
                      + Extra cupo
                    </span>
                  </div>
                  <div className='grid grid-cols-5 gap-1 font-mono text-[9px] font-bold'>
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map(d => (
                      <span key={d} className='text-center'>
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className='relative mt-1 h-40 sm:h-48'>
                    <div className='absolute inset-0 grid grid-cols-5 grid-rows-4 gap-1'>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <span
                          key={i}
                          className='rounded border border-dashed border-[#0a0a0a]/30'
                        />
                      ))}
                    </div>
                    <div className='absolute inset-0 grid grid-cols-5 grid-rows-4 gap-1'>
                      {APPOINTMENTS.map(([col, row, span, color], i) => (
                        <span
                          key={i}
                          className={`cripco-slot ${color} rounded border-2 border-[#0a0a0a] p-1 shadow-[2px_2px_0_0_#0a0a0a]`}
                          style={{
                            gridColumn: col + 1,
                            gridRow: `${row + 1} / span ${span}`
                          }}
                        >
                          <span className='block h-1.5 w-3/4 rounded-full bg-[#0a0a0a]/70' />
                          <span className='mt-1 block h-1 w-1/2 rounded-full bg-[#0a0a0a]/40' />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='cripco-bubble nb-border absolute -bottom-10 -right-1 max-w-[240px] rounded-xl rounded-br-none bg-[#25D366] p-3 shadow-nb sm:-right-4'>
              <div className='mb-1 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase'>
                <FaWhatsapp className='size-4' /> Cripco
              </div>
              <p className='text-xs font-bold leading-snug'>
                Recordatorio: su cita de terapia es mañana a las 9:00 AM ✓✓
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

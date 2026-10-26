'use client'
import { gsap, MOTION_OK, useGSAP } from '@/src/lib/gsap'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { FaGithub } from 'react-icons/fa'

const STACK = ['TypeScript', 'Node.js', 'MCP SDK', 'Zod', 'Vitest']

const REPO = 'https://github.com/JoseanMeonez/servicenow-mcp'

type Line =
  | { kind: 'prompt' | 'info' | 'error' | 'ok'; message: string }
  | { kind: 'tool'; tool: string; args: string }

// A session where the agent hits the update-set write gate and recovers.
// Tool names and arguments are real; the narration comes from messages (Mcp.terminal).
const SESSION: Line[] = [
  { kind: 'prompt', message: 'prompt' },
  {
    kind: 'tool',
    tool: 'servicenow_docs_precheck',
    args: 'sys_dictionary · create'
  },
  { kind: 'info', message: 'risk' },
  { kind: 'tool', tool: 'servicenow_create_record', args: 'sys_dictionary' },
  { kind: 'error', message: 'refused' },
  {
    kind: 'tool',
    tool: 'servicenow_set_current_update_set',
    args: '"CHG risk score"'
  },
  { kind: 'tool', tool: 'servicenow_create_record', args: 'sys_dictionary' },
  { kind: 'ok', message: 'created' }
]

const LINE_STYLE = {
  prompt: 'text-nb-yellow',
  info: 'text-nb-cyan',
  error: 'text-nb-red',
  ok: 'text-nb-lime'
} as const

const LINE_MARK = { prompt: '>', info: 'i', error: '✗', ok: '✓' } as const

/** Featured project: the ServiceNow MCP server, with a terminal replaying an agent session on scroll. */
export default function FeaturedMcp() {
  const root = useRef<HTMLDivElement>(null)
  const t = useTranslations('Mcp')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Mirror of the Cripco card: tilts in from the other side.
        gsap.fromTo(
          '.mcp-card',
          { rotateX: 28, rotateZ: 3, scale: 0.86, y: 80 },
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

        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: 'top 55%' }
          })
          .from('.mcp-line', {
            opacity: 0,
            x: -12,
            stagger: 0.35,
            duration: 0.25,
            ease: 'power2.out'
          })
          .from(
            '.mcp-sticker',
            { scale: 0, rotate: 90, duration: 0.6, ease: 'back.out(2.5)' },
            0.2
          )
          .from(
            '.mcp-feature',
            { x: 20, opacity: 0, stagger: 0.05, duration: 0.4 },
            0.2
          )
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className='mt-20 [perspective:1600px]'>
      <article className='mcp-card nb-card relative grid overflow-visible bg-nb-violet text-on-accent shadow-nb-xl will-change-transform [--line:#0a0a0a] lg:grid-cols-[1.15fr_1fr]'>
        <span className='mcp-sticker nb-border absolute -left-4 -top-6 z-20 grid size-24 -rotate-12 place-items-center rounded-full bg-nb-yellow text-center font-display text-sm uppercase leading-tight shadow-nb sm:-left-6 sm:size-28'>
          {t('sticker')}
          <br />
          MIT
        </span>

        {/* Terminal replay */}
        <div
          className='order-last flex items-center border-t-3 border-[#0a0a0a] p-4 sm:p-8 lg:order-first lg:border-r-3 lg:border-t-0'
          aria-hidden
        >
          <div className='nb-border w-full overflow-hidden rounded-lg bg-[#0a0a0a] shadow-nb-lg'>
            <div className='flex items-center gap-2 border-b-3 border-[#0a0a0a] bg-nb-cyan px-3 py-2'>
              <span className='size-3 rounded-full border-2 border-[#0a0a0a] bg-nb-red' />
              <span className='size-3 rounded-full border-2 border-[#0a0a0a] bg-nb-orange' />
              <span className='size-3 rounded-full border-2 border-[#0a0a0a] bg-nb-lime' />
              <span className='ml-2 truncate font-mono text-[10px] font-bold'>
                claude — servicenow-mcp (stdio)
              </span>
            </div>
            <div className='space-y-2 p-4 font-mono text-[11px] leading-relaxed text-[#f5f0e1] sm:text-xs'>
              {SESSION.map((line, i) =>
                line.kind === 'tool' ? (
                  <div key={i} className='mcp-line flex gap-2 pl-4'>
                    <span className='text-nb-violet'>⚙</span>
                    <span className='min-w-0 break-words'>
                      <span className='font-bold text-nb-violet'>
                        {line.tool}
                      </span>{' '}
                      <span className='text-[#c4bcab]'>{line.args}</span>
                    </span>
                  </div>
                ) : (
                  <div
                    key={i}
                    className={`mcp-line flex gap-2 ${line.kind === 'prompt' ? '' : 'pl-4'} ${LINE_STYLE[line.kind]}`}
                  >
                    <span className='font-bold'>{LINE_MARK[line.kind]}</span>
                    <span className='min-w-0 break-words'>
                      {t(`terminal.${line.message}`)}
                    </span>
                  </div>
                )
              )}
              <div className='mcp-line flex gap-2 text-nb-yellow'>
                <span className='font-bold'>&gt;</span>
                <span className='h-4 w-2 animate-pulse bg-nb-yellow' />
              </div>
            </div>
          </div>
        </div>

        <div className='p-6 pt-12 sm:p-10'>
          <div className='mb-4 flex flex-wrap gap-2'>
            <span className='nb-chip !border-[#0a0a0a] !bg-[#0a0a0a] !text-nb-violet'>
              {t('featured')}
            </span>
            <span className='nb-chip !border-[#0a0a0a] !bg-white !text-[#0a0a0a]'>
              {t('tag')}
            </span>
          </div>
          <h3 className='font-display text-[clamp(2.4rem,5.5vw,4.5rem)] uppercase leading-[0.85]'>
            ServiceNow
            <br />
            MCP
          </h3>
          <p className='mt-2 font-mono text-sm font-bold uppercase'>
            {t('subtitle')}
          </p>
          <p className='mt-5 max-w-xl text-base font-medium leading-relaxed sm:text-lg'>
            {t('description')}
          </p>

          <ul className='mt-6 grid gap-2'>
            {(t.raw('features') as string[]).map(f => (
              <li
                key={f}
                className='mcp-feature flex items-start gap-2 text-sm font-bold'
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
            href={REPO}
            target='_blank'
            rel='noopener noreferrer'
            className='nb-btn mt-8 bg-[#0a0a0a] px-5 py-3 !text-nb-violet'
          >
            <FaGithub className='size-4' /> {t('github')}
          </a>
        </div>
      </article>
    </div>
  )
}

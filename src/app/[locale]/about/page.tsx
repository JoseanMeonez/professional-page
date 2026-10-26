import { useTranslations } from 'next-intl'
import Link from 'next/link'

// `value` is literal unless `translated`, in which case it's a message key too.
const FACTS = [
  { label: 'basedIn', value: 'Honduras', color: 'bg-nb-yellow' },
  {
    label: 'experience',
    value: 'experienceValue',
    translated: true,
    color: 'bg-nb-pink'
  },
  { label: 'focus', value: 'ServiceNow · .NET · Web', color: 'bg-nb-cyan' }
]

export default function About({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = useTranslations('About')
  return (
    <section className='bg-grid min-h-[80vh] pb-24 pt-32'>
      <div className='container max-w-4xl'>
        <span className='nb-chip mb-6 !bg-nb-lime !text-on-accent'>
          {t('chip')}
        </span>
        <h1 className='font-display text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.85]'>
          {t('hi')} <span className='nb-outline-text'>Andrés</span>
        </h1>
        <p className='nb-card mt-10 bg-paper p-6 text-lg leading-relaxed'>
          {t('body')}
        </p>
        <div className='mt-8 grid gap-5 sm:grid-cols-3'>
          {FACTS.map(f => (
            <div
              key={f.label}
              className={`nb-card ${f.color} p-5 text-on-accent`}
            >
              <div className='font-mono text-xs font-bold uppercase'>
                {t(f.label)}
              </div>
              <div className='mt-1 font-display text-xl uppercase'>
                {f.translated ? t(f.value) : f.value}
              </div>
            </div>
          ))}
        </div>
        <Link
          href={`/${locale}`}
          className='nb-btn mt-10 bg-nb-yellow px-6 py-4'
        >
          {t('back')}
        </Link>
      </div>
    </section>
  )
}

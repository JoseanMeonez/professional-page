import Link from 'next/link'

const FACTS = [
  { label: 'Based in', value: 'Honduras', color: 'bg-nb-yellow' },
  { label: 'Experience', value: '4+ years', color: 'bg-nb-pink' },
  { label: 'Focus', value: 'ServiceNow · .NET · Web', color: 'bg-nb-cyan' }
]

export default function About({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <section className='bg-grid min-h-[80vh] pb-24 pt-32'>
      <div className='container max-w-4xl'>
        <span className='nb-chip mb-6 !bg-nb-lime !text-on-accent'>About</span>
        <h1 className='font-display text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.85]'>
          Hi, I&apos;m <span className='nb-outline-text'>Andrés</span>
        </h1>
        <p className='nb-card mt-10 bg-paper p-6 text-lg leading-relaxed'>
          Software engineer with 4+ years delivering enterprise platform
          architecture. I work across ServiceNow, C# .NET, Node, Go and
          Angular/React — from Clean Architecture backends and ERP integrations
          to interfaces people actually enjoy using. Currently a ServiceNow
          Technical Consultant at Altiatek and finishing my Software Engineering
          degree at UTH.
        </p>
        <div className='mt-8 grid gap-5 sm:grid-cols-3'>
          {FACTS.map(f => (
            <div
              key={f.label}
              className={`nb-card ${f.color} p-5 text-on-accent`}
            >
              <div className='font-mono text-xs font-bold uppercase'>
                {f.label}
              </div>
              <div className='mt-1 font-display text-xl uppercase'>
                {f.value}
              </div>
            </div>
          ))}
        </div>
        <Link
          href={`/${locale}`}
          className='nb-btn mt-10 bg-nb-yellow px-6 py-4'
        >
          ← Back home
        </Link>
      </div>
    </section>
  )
}

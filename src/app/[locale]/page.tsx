import { useTranslations } from 'next-intl'
import Button from './components/Button'
import ContactButton from './components/ContactButton'

export default function DashboardPage() {
  const t = useTranslations('')
  return (
    <div>
      <section className='flex min-h-[80vh] flex-col items-center justify-center py-24'>
        <h1 className='text-center text-7xl font-extrabold leading-tight'>
          {t('Hi')},{' '}
          <span className='bg-span-bg bg-clip-text text-transparent'>
            {t("I'm Andrés")}
          </span>
          <br />
          {t('Full Stack Developer')}
        </h1>
        <div className='my-6 max-w-3xl px-20 text-center text-xl text-text-secondary'>
          {t('Passionate about creating elegant solutions and building performant web applications with modern technologies')}
        </div>
        <div className='mt-4 flex flex-row gap-4'>
          <a href='#projects'>
            <Button rounded size='large'>
              {t('View Projects')}
            </Button>
          </a>
          <ContactButton />
        </div>
      </section>
      
      <section className='bg-background-secondary py-20 max-lg:py-10'>
        <h2 className='mb-12 text-center text-4xl font-bold'>{t('What I Do')}</h2>
        <div className='mx-auto grid max-w-screen-lg grid-cols-3 gap-7 px-8 py-5 max-lg:max-w-fit max-lg:grid-cols-1 max-lg:gap-10'>
          <div className='text-center'>
            <h3 className='mb-3 text-xl font-semibold'>{t('Frontend Development')}</h3>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('Building modern web applications with Angular, React, and Next.js, focusing on performance and user experience')}
            </p>
          </div>
          <div className='text-center'>
            <h3 className='mb-3 text-xl font-semibold'>{t('Backend Development')}</h3>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('Developing robust server-side solutions using .NET and Laravel, ensuring scalable and maintainable architectures')}
            </p>
          </div>
          <div className='text-center'>
            <h3 className='mb-3 text-xl font-semibold'>{t('Full Stack Integration')}</h3>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('Seamlessly connecting frontend and backend systems to create cohesive, efficient, and powerful web solutions')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

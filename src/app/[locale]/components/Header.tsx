'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import GithubIcon from '../../icons/github'
import LangSwitcher from './LangSwitcher'
import { PiCode } from 'react-icons/pi';
interface Props {
  locale: string
}
export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')
  return (
    <div className='mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5'>
      <Link lang={locale} href='/'>
        <div className='flex flex-row items-center'>
          <div className='mr-2 h-8 w-8'>
            <PiCode className='h-full w-full' />
          </div>
          <strong className='select-none text-xl'>Andrés Meoñez</strong>
        </div>
      </Link>
      <div className='flex flex-row items-center gap-3'>
        <nav className='mr-10 inline-flex gap-5'>
          <Link lang={locale} href='/about'>
            {t('About')}
          </Link>
          {/* <Link lang={locale} href='#projects'>{t('Projects')}</Link>
          <Link lang={locale} href='#contact'>{t('Contact')}</Link> */}
        </nav>
        <LangSwitcher />
        <a href='https://github.com/JoseanMeonez' target='_blank'>
          <div className='size-8'>
            <GithubIcon />
          </div>
        </a>
      </div>
    </div>
  )
}

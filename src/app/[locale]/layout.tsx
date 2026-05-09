import { ThemeProvider } from '@/src/app/[locale]/components/ThemeProvider'
import type { Metadata } from 'next'
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages
} from 'next-intl'
import { JetBrains_Mono, Rubik, Syne } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Header } from './components/Header'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-syne'
})
const rubik = Rubik({
  subsets: ['arabic'],
  variable: '--rubik'
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono'
})
export const metadata: Metadata = {
  title: 'Andrés Meoñez | Full Stack Developer',
  description: 'Professional portfolio of Andrés Meoñez, Full Stack Developer specializing in modern web technologies'
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()
  return (
    <html
      lang={locale}
      dir={locale === 'ar' || locale == 'fa' ? 'rtl' : 'ltr'}
      className={`${syne.variable} ${rubik.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!localStorage.getItem('theme')){localStorage.setItem('theme',window.matchMedia('(prefers-color-scheme: dark)').matches?'terminal-dark':'terminal')}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='terminal'
          themes={['terminal', 'terminal-dark', 'facebook', 'facebook-dark', 'discord', 'discord-dark', 'netflix', 'netflix-dark', 'reddit', 'reddit-dark', 'sunset', 'sunset-dark', 'instagram', 'instagram-dark', 'twilight', 'twilight-dark', 'dark']}
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              easing='ease'
              speed={200}
              shadow='0 0 10px #2299DD,0 0 5px #2299DD'
              color='var(--primary)'
              showSpinner={false}
            />
            <ScrollProgress />
            <Header locale={locale} />
            <main className='mx-auto max-w-screen-2xl'>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

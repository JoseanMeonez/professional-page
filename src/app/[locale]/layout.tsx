import { ThemeProvider } from '@/src/app/[locale]/components/ThemeProvider'
import { locales } from '@/src/i18n'
import type { Viewport } from 'next'
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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://andres-meonez.vercel.app'

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
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = 'Andrés Meoñez | Full Stack Developer'
  const description =
    '4+ years delivering enterprise software. Specialized in ServiceNow, .NET, Node.js, Go, Angular, React, and AI-assisted development.'

  return {
    metadataBase: new URL(baseUrl),
    title: { default: title, template: '%s | Andrés Meoñez' },
    description,
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      title,
      description,
      siteName: 'Andrés Meoñez Portfolio',
      locale,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        'x-default': '/en',
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
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
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Andrés Meoñez',
              url: baseUrl,
              email: 'joseanmeonez@gmail.com',
              jobTitle: 'Full Stack Developer',
              knowsAbout: [
                'ServiceNow', '.NET', 'Node.js', 'Go', 'Angular', 'React',
                'Next.js', 'SQL Server', 'PostgreSQL', 'TypeScript',
              ],
              sameAs: [
                'https://github.com/JoseanMeonez',
                'https://linkedin.com/in/andrés-meoñez',
              ],
            }),
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

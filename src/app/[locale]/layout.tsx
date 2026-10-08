import { ThemeProvider } from '@/src/app/[locale]/components/ThemeProvider'
import { locales } from '@/src/i18n'
import type { Viewport } from 'next'
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages
} from 'next-intl'
import {
  Archivo_Black,
  JetBrains_Mono,
  Rubik,
  Space_Grotesk
} from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Header } from './components/Header'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SmoothScroll from './components/SmoothScroll'
import './globals.css'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://andres-meonez.vercel.app'

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black'
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk'
})
const rubik = Rubik({
  subsets: ['arabic'],
  variable: '--rubik'
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono'
})
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff4e0' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
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
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png']
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map(l => [l, `/${l}`])),
        'x-default': '/en'
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    }
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
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${rubik.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
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
                'ServiceNow',
                '.NET',
                'Node.js',
                'Go',
                'Angular',
                'React',
                'Next.js',
                'SQL Server',
                'PostgreSQL',
                'TypeScript'
              ],
              sameAs: [
                'https://github.com/JoseanMeonez',
                'https://linkedin.com/in/andrés-meoñez'
              ]
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          storageKey='nb-theme'
          defaultTheme='system'
          themes={['light', 'dark']}
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={4}
              crawl={true}
              easing='ease'
              speed={200}
              shadow={false}
              color='var(--pink)'
              showSpinner={false}
            />
            <SmoothScroll />
            <ScrollProgress />
            <Header locale={locale} />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

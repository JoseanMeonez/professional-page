import { MetadataRoute } from 'next'
import { locales } from '@/src/i18n'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://andres-meonez.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map(locale => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }))
}

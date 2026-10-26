import { AbstractIntlMessages } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['en', 'fr', 'ja', 'de', 'ru', 'es', 'fa', 'ar']

// Arrays (read with t.raw) are fine at runtime but outside AbstractIntlMessages' type.
type Messages = { [key: string]: unknown }

// Locales without a full translation fall back to English key by key.
function withFallback(base: Messages, overrides: Messages): Messages {
  const merged: Messages = { ...base }
  for (const [key, value] of Object.entries(overrides)) {
    const fallback = base[key]
    merged[key] =
      isObject(value) && isObject(fallback)
        ? withFallback(fallback, value)
        : value
  }
  return merged
}

const isObject = (v: unknown): v is Messages =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  const english: Messages = (await import('../messages/en.json')).default
  const messages =
    locale === 'en'
      ? english
      : withFallback(
          english,
          (await import(`../messages/${locale}.json`)).default
        )

  return { messages: messages as AbstractIntlMessages }
})

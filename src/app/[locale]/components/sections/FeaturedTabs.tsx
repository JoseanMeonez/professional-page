'use client'
import { useTranslations } from 'next-intl'

export type FeaturedTab = 'overview' | 'preview'

/**
 * Phones only: a featured card shows its overview or its preview, one at a time,
 * so the card fits one screen without a half-visible panel poking in from the edge.
 */
export default function FeaturedTabs({
  tab,
  onChange,
  activeClassName
}: {
  tab: FeaturedTab
  onChange: (tab: FeaturedTab) => void
  activeClassName: string
}) {
  const t = useTranslations('Featured')

  return (
    <div role='tablist' className='flex gap-2 px-4 pr-24 pt-4 sm:hidden'>
      {(['overview', 'preview'] as const).map(key => (
        <button
          key={key}
          role='tab'
          aria-selected={tab === key}
          onClick={() => onChange(key)}
          className={`nb-btn flex-1 px-2 py-2 text-[11px] ${
            tab === key ? `bg-[#0a0a0a] ${activeClassName}` : 'bg-white'
          }`}
        >
          {t(key)}
        </button>
      ))}
    </div>
  )
}

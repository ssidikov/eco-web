'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, type Locale } from '@/i18n/config'

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  ru: 'RU',
  uz: 'UZ',
}

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()

  const getLocalePath = (locale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <nav aria-label='Language switcher' className='flex items-center gap-1 text-sm'>
      {locales.map((locale, i) => (
        <span key={locale} className='flex items-center'>
          {i > 0 && <span className='mx-1 text-neutral-300 select-none'>|</span>}
          {locale === currentLocale ? (
            <span className='font-medium text-[#3e6f58]'>{localeLabels[locale]}</span>
          ) : (
            <Link
              href={getLocalePath(locale)}
              className='text-neutral-400 transition-colors duration-200 hover:text-neutral-800'
              hrefLang={locale}>
              {localeLabels[locale]}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}

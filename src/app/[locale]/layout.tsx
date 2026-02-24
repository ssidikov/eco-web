import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { locales, type Locale, isValidLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import GrainOverlay from '@/components/GrainOverlay'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const dict = await getDictionary(safeLocale)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: safeLocale,
      type: 'website',
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const dict = await getDictionary(safeLocale)

  return (
    <html lang={safeLocale} className={inter.variable}>
      <head>
        {locales.map((l) => (
          <link key={l} rel='alternate' hrefLang={l} href={`/${l}`} />
        ))}
        <link rel='alternate' hrefLang='x-default' href='/en' />
      </head>
      <body className='bg-background text-foreground antialiased'>
        {/* Header */}
        <header className='fixed top-0 right-0 left-0 z-50 border-b border-neutral-900/4 bg-white/70 backdrop-blur-xl'>
          <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
            <Link
              href={`/${safeLocale}`}
              className='text-sm font-bold tracking-wider text-neutral-900'>
              ECO<span className='text-eco'>WEB</span>
            </Link>
            <div className='flex items-center gap-6'>
              <Link
                href={`/${safeLocale}/programme`}
                className='text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-eco'>
                {dict.hero.ctaSecondary}
              </Link>
              <LanguageSwitcher currentLocale={safeLocale} />
            </div>
          </div>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer className='border-t border-neutral-100 bg-white py-12'>
          <div className='mx-auto max-w-7xl px-6 text-center'>
            <p className='text-sm text-neutral-400'>
              © {new Date().getFullYear()} EcoWeb. {dict.hero.badge}
            </p>
          </div>
        </footer>

        <GrainOverlay />
      </body>
    </html>
  )
}

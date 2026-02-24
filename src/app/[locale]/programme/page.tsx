import type { Metadata } from 'next'
import { isValidLocale, locales, type Locale } from '@/i18n/config'
import { getCourseDictionary } from '@/i18n/getCourseDictionary'
import CoursePageContent from './CoursePageContent'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const dict = await getCourseDictionary(safeLocale)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: `/${safeLocale}/programme`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/programme`])),
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: safeLocale,
      type: 'website',
    },
  }
}

export default async function ProgrammePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const dict = await getCourseDictionary(safeLocale)

  return <CoursePageContent dict={dict} />
}

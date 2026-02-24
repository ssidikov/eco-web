import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import HeroSection from '@/components/sections/HeroSection'
import ShiftSection from '@/components/sections/ShiftSection'
import AISection from '@/components/sections/AISection'
import BentoGrid from '@/components/sections/BentoGrid'
import PerformanceSection from '@/components/sections/PerformanceSection'
import MetricsSection from '@/components/sections/MetricsSection'
import ComplianceSection from '@/components/sections/ComplianceSection'
import CTASection from '@/components/sections/CTASection'

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const dict = await getDictionary(safeLocale)

  return (
    <>
      <HeroSection dict={dict} />
      <ShiftSection dict={dict} />
      <AISection dict={dict} />
      <BentoGrid dict={dict} />
      <PerformanceSection dict={dict} />
      <MetricsSection dict={dict} />
      <ComplianceSection dict={dict} />
      <CTASection dict={dict} />
    </>
  )
}

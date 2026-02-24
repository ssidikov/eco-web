'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { Dictionary } from '@/i18n/getDictionary'

export default function CTASection({ dict }: { dict: Dictionary }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section className='relative overflow-hidden bg-white py-32 sm:py-40' ref={ref}>
      {/* Background glow */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-eco/[0.04] blur-3xl' />
      </div>

      <div className='relative z-10 mx-auto max-w-4xl px-6 text-center'>
        {/* Section label */}
        <div className={`reveal-up ${isVisible ? 'visible' : ''} mb-4`}>
          <span className='text-xs font-medium tracking-widest text-eco uppercase'>
            {dict.cta.sectionLabel}
          </span>
        </div>

        <h2
          className={`reveal-up reveal-delay-1 ${isVisible ? 'visible' : ''} text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl`}>
          {dict.cta.title}
        </h2>

        <p
          className={`reveal-up reveal-delay-2 ${isVisible ? 'visible' : ''} mx-auto mt-6 max-w-xl text-lg text-neutral-400`}>
          {dict.cta.subtitle}
        </p>

        <div className={`reveal-up reveal-delay-3 ${isVisible ? 'visible' : ''} mt-12`}>
          <a
            href='#apply'
            className='inline-block rounded-full bg-eco px-10 py-4 text-base font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-eco/20 sm:text-lg'>
            {dict.cta.button}
          </a>
        </div>
      </div>
    </section>
  )
}

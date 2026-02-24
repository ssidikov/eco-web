'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { Dictionary } from '@/i18n/getDictionary'

function ComplianceColumn({
  title,
  items,
  delay,
}: {
  title: string
  items: string[]
  delay: number
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div ref={ref} className={`reveal-up reveal-delay-${delay} ${isVisible ? 'visible' : ''}`}>
      <h3 className='mb-6 text-lg font-semibold text-neutral-900 sm:text-xl'>{title}</h3>
      <ul className='space-y-4'>
        {items.map((item, j) => (
          <li key={j} className='flex items-start gap-3 text-neutral-500'>
            <svg
              className='mt-0.5 h-5 w-5 shrink-0 text-eco'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
            <span className='text-sm leading-relaxed sm:text-base'>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ComplianceSection({ dict }: { dict: Dictionary }) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  return (
    <section className='bg-white py-32 sm:py-40'>
      <div className='mx-auto max-w-5xl px-6'>
        <h2
          ref={titleRef}
          className={`reveal-up ${titleVisible ? 'visible' : ''} mb-16 text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl`}>
          {dict.compliance.sectionTitle}
        </h2>

        <div className='grid gap-12 sm:grid-cols-2 sm:gap-16'>
          {dict.compliance.columns.map((col, i) => (
            <ComplianceColumn key={i} title={col.title} items={col.items} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

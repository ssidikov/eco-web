'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { CourseDictionary } from '@/i18n/getCourseDictionary'

function ModuleCard({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: string[]
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`reveal-up ${isVisible ? 'visible' : ''} bento-card rounded-2xl bg-white p-8 shadow-sm`}>
      <h3 className='text-xl font-bold text-neutral-900'>{title}</h3>
      <p className='mt-2 text-sm text-neutral-400'>{description}</p>
      <ul className='mt-6 space-y-2.5'>
        {items.map((item, i) => (
          <li key={i} className='flex items-start gap-3 text-neutral-500'>
            <svg
              className='mt-0.5 h-4 w-4 shrink-0 text-eco/60'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
            <span className='text-sm leading-relaxed'>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CurriculumGrid({ dict }: { dict: CourseDictionary }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-6xl px-6'>
        <p
          className={`reveal-up ${isVisible ? 'visible' : ''} mb-3 text-xs font-medium tracking-widest text-eco uppercase`}>
          {dict.curriculum.label}
        </p>
        <h2
          ref={ref}
          className={`reveal-up reveal-delay-1 ${isVisible ? 'visible' : ''} mb-16 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl`}>
          {dict.curriculum.title}
        </h2>

        <div className='grid gap-6 sm:grid-cols-2'>
          {dict.curriculum.modules.map((mod, i) => (
            <ModuleCard key={i} title={mod.title} description={mod.description} items={mod.items} />
          ))}
        </div>
      </div>
    </section>
  )
}

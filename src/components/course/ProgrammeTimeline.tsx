'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { CourseDictionary } from '@/i18n/getCourseDictionary'

function DayCard({ day, title, topics }: { day: string; title: string; topics: string[] }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div ref={ref} className={`reveal-up ${isVisible ? 'visible' : ''}`}>
      <div className='group relative flex gap-6 sm:gap-8'>
        {/* Timeline dot and line */}
        <div className='flex flex-col items-center'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-eco/[0.08] text-sm font-bold text-eco'>
            {day}
          </div>
          <div className='mt-3 h-full w-px bg-neutral-100' />
        </div>

        {/* Content card */}
        <div className='bento-card mb-8 flex-1 rounded-2xl bg-white p-6 shadow-sm sm:p-8'>
          <h3 className='text-lg font-bold text-neutral-900 sm:text-xl'>{title}</h3>
          <ul className='mt-4 space-y-3'>
            {topics.map((topic, i) => (
              <li key={i} className='flex items-start gap-3 text-neutral-500'>
                <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-eco/50' />
                <span className='text-sm leading-relaxed'>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function ProgrammeTimeline({ dict }: { dict: CourseDictionary }) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  return (
    <section className='bg-surface py-24 sm:py-32'>
      <div className='mx-auto max-w-4xl px-6'>
        <p
          className={`reveal-up ${titleVisible ? 'visible' : ''} mb-3 text-xs font-medium tracking-widest text-eco uppercase`}>
          {dict.programme.label}
        </p>
        <h2
          ref={titleRef}
          className={`reveal-up reveal-delay-1 ${titleVisible ? 'visible' : ''} mb-16 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl`}>
          {dict.programme.title}
        </h2>

        <div className='relative'>
          {dict.programme.days.map((day, i) => (
            <DayCard key={i} day={day.day} title={day.title} topics={day.topics} />
          ))}
        </div>
      </div>
    </section>
  )
}

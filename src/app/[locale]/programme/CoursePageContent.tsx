'use client'

import Section from '@/components/Section'
import ProgrammeTimeline from '@/components/course/ProgrammeTimeline'
import CurriculumGrid from '@/components/course/CurriculumGrid'
import type { CourseDictionary } from '@/i18n/getCourseDictionary'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function CoursePageContent({ dict }: { dict: CourseDictionary }) {
  return (
    <>
      {/* ─── 1. Hero ─── */}
      <CourseHero dict={dict} />

      {/* ─── 2. Vision & Impact ─── */}
      <Section label={dict.vision.label} title={dict.vision.title} alt>
        <div className='max-w-3xl space-y-6'>
          {dict.vision.paragraphs.map((p, i) => (
            <p key={i} className='text-base leading-relaxed text-neutral-500 sm:text-lg'>
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* ─── 3. Strategic Objectives ─── */}
      <Section label={dict.objectives.label} title={dict.objectives.title}>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {dict.objectives.items.map((item, i) => (
            <ObjectiveCard key={i} title={item.title} description={item.description} index={i} />
          ))}
        </div>
      </Section>

      {/* ─── 4. Pedagogical Approach ─── */}
      <Section label={dict.pedagogy.label} title={dict.pedagogy.title} alt>
        <p className='mb-10 max-w-3xl text-base leading-relaxed text-neutral-500 sm:text-lg'>
          {dict.pedagogy.intro}
        </p>
        <div className='grid gap-6 sm:grid-cols-2'>
          {dict.pedagogy.principles.map((p, i) => (
            <PrincipleCard key={i} title={p.title} description={p.description} index={i} />
          ))}
        </div>
      </Section>

      {/* ─── 5. Programme jour par jour ─── */}
      <ProgrammeTimeline dict={dict} />

      {/* ─── 6. Curriculum Breakdown ─── */}
      <CurriculumGrid dict={dict} />

      {/* ─── 7. Impact for Uzbekistan ─── */}
      <Section label={dict.uzbekistan.label} title={dict.uzbekistan.title} alt>
        <p className='mb-10 max-w-3xl text-base leading-relaxed text-neutral-500 sm:text-lg'>
          {dict.uzbekistan.intro}
        </p>
        <div className='grid gap-6 sm:grid-cols-2'>
          {dict.uzbekistan.points.map((point, i) => (
            <ImpactCard key={i} title={point.title} description={point.description} index={i} />
          ))}
        </div>
      </Section>

      {/* ─── 8. Concrete Outcomes ─── */}
      <Section label={dict.outcomes.label} title={dict.outcomes.title}>
        <div className='max-w-3xl'>
          <ul className='space-y-4'>
            {dict.outcomes.items.map((item, i) => (
              <li key={i} className='flex items-start gap-4 text-neutral-600'>
                <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-eco/[0.08] text-xs font-bold text-eco'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className='pt-0.5 text-sm leading-relaxed sm:text-base'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ─── 9. Institutional Closing ─── */}
      <ClosingSection dict={dict} />
    </>
  )
}

/* ─── Sub-components ─── */

function CourseHero({ dict }: { dict: CourseDictionary }) {
  return (
    <section className='relative overflow-hidden bg-white pt-32 pb-20 sm:pt-40 sm:pb-28'>
      {/* Subtle grid */}
      <div className='hero-grid pointer-events-none absolute inset-0' />
      <div className='ambient-glow pointer-events-none absolute inset-0' />

      <div className='relative z-10 mx-auto max-w-5xl px-6'>
        <p className='mb-4 text-xs font-medium tracking-widest text-eco uppercase'>
          {dict.hero.label}
        </p>
        <h1 className='text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl'>
          {dict.hero.title}
        </h1>
        <p className='mt-6 max-w-3xl text-lg leading-relaxed text-neutral-500 sm:text-xl'>
          {dict.hero.subtitle}
        </p>
        <div className='mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-neutral-400'>
          <span>{dict.hero.detail1}</span>
          <span className='hidden sm:inline'>·</span>
          <span>{dict.hero.detail2}</span>
        </div>
      </div>
    </section>
  )
}

function ObjectiveCard({
  title,
  description,
  index,
}: {
  title: string
  description: string
  index: number
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`reveal-up reveal-delay-${Math.min(index + 1, 5)} ${isVisible ? 'visible' : ''} bento-card rounded-2xl bg-surface p-7`}>
      <div className='mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-eco/[0.08] text-sm font-bold text-eco'>
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className='text-base font-bold text-neutral-900 sm:text-lg'>{title}</h3>
      <p className='mt-2 text-sm leading-relaxed text-neutral-500'>{description}</p>
    </div>
  )
}

function PrincipleCard({
  title,
  description,
  index,
}: {
  title: string
  description: string
  index: number
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`reveal-up reveal-delay-${Math.min(index + 1, 5)} ${isVisible ? 'visible' : ''} rounded-2xl bg-white p-7 shadow-sm`}>
      <h3 className='text-base font-bold text-neutral-900 sm:text-lg'>{title}</h3>
      <p className='mt-2 text-sm leading-relaxed text-neutral-500'>{description}</p>
    </div>
  )
}

function ImpactCard({
  title,
  description,
  index,
}: {
  title: string
  description: string
  index: number
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`reveal-up reveal-delay-${Math.min(index + 1, 5)} ${isVisible ? 'visible' : ''} rounded-2xl bg-white p-7 shadow-sm`}>
      <h3 className='text-base font-bold text-neutral-900 sm:text-lg'>{title}</h3>
      <p className='mt-2 text-sm leading-relaxed text-neutral-500'>{description}</p>
    </div>
  )
}

function ClosingSection({ dict }: { dict: CourseDictionary }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section ref={ref} className='relative overflow-hidden bg-surface py-28 sm:py-36'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-eco/[0.03] blur-3xl' />
      </div>
      <div className='relative z-10 mx-auto max-w-3xl px-6 text-center'>
        <p
          className={`reveal-up ${isVisible ? 'visible' : ''} mb-3 text-xs font-medium tracking-widest text-eco uppercase`}>
          {dict.closing.label}
        </p>
        <h2
          className={`reveal-up reveal-delay-1 ${isVisible ? 'visible' : ''} text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl`}>
          {dict.closing.title}
        </h2>
        <p
          className={`reveal-up reveal-delay-2 ${isVisible ? 'visible' : ''} mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg`}>
          {dict.closing.description}
        </p>
        <div className={`reveal-up reveal-delay-3 ${isVisible ? 'visible' : ''} mt-10`}>
          <a
            href='#apply'
            className='inline-block rounded-full bg-eco px-10 py-4 text-base font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-eco/20'>
            {dict.closing.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

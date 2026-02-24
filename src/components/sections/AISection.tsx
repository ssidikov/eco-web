'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { Dictionary } from '@/i18n/getDictionary'

export default function AISection({ dict }: { dict: Dictionary }) {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section className='relative overflow-hidden bg-white py-32 sm:py-40' ref={sectionRef}>
      {/* Subtle glow */}
      <div className='pointer-events-none absolute right-0 top-1/2 -translate-y-1/2'>
        <div className='h-[500px] w-[500px] rounded-full bg-eco/[0.03] blur-3xl' />
      </div>

      <div className='relative z-10 mx-auto max-w-6xl px-6'>
        {/* Section label */}
        <div className={`reveal-up ${isVisible ? 'visible' : ''} mb-4`}>
          <span className='text-xs font-medium tracking-widest text-eco uppercase'>
            {dict.ai.sectionLabel}
          </span>
        </div>

        <div className='grid items-center gap-16 lg:grid-cols-2'>
          {/* Left: Text */}
          <div>
            <h2
              className={`reveal-up ${isVisible ? 'visible' : ''} text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl`}>
              {dict.ai.title}
            </h2>
            <p
              className={`reveal-up reveal-delay-1 ${isVisible ? 'visible' : ''} mt-6 text-lg leading-relaxed text-neutral-500`}>
              {dict.ai.description}
            </p>
            <ul className='mt-8 space-y-4'>
              {dict.ai.features.map((feature, i) => (
                <li
                  key={i}
                  className={`reveal-up reveal-delay-${Math.min(i + 2, 5)} ${isVisible ? 'visible' : ''} flex items-center gap-3`}>
                  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-eco/10'>
                    <svg
                      className='h-3.5 w-3.5 text-eco'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2.5}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                    </svg>
                  </span>
                  <span className='text-sm font-medium text-neutral-700 sm:text-base'>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Glass UI Panel */}
          <div className={`reveal-up reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
            <div className='glass-panel animate-float-slower rounded-2xl p-6 shadow-lg shadow-black/[0.03] sm:p-8'>
              {/* Code header */}
              <div className='mb-5 flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full bg-red-400/60' />
                <div className='h-3 w-3 rounded-full bg-yellow-400/60' />
                <div className='h-3 w-3 rounded-full bg-green-400/60' />
                <span className='ml-3 text-xs text-neutral-400'>analytics.tsx</span>
              </div>

              {/* Code line */}
              <div className='mb-6 rounded-lg bg-neutral-900/[0.03] p-4'>
                <code className='text-xs text-neutral-500'>{dict.ai.panel.codeComment}</code>
              </div>

              {/* Metrics grid */}
              <div className='grid grid-cols-2 gap-3'>
                <MetricCard label={dict.ai.panel.lighthouse} value='97' color='text-eco' />
                <MetricCard label={dict.ai.panel.seo} value='100' color='text-eco' />
                <MetricCard label={dict.ai.panel.accessibility} value='98' color='text-eco' />
                <MetricCard label={dict.ai.panel.performance} value='96' color='text-eco' />
              </div>

              {/* AI Suggestion */}
              <div className='mt-4 rounded-xl border border-eco/10 bg-eco/[0.03] p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <svg
                    className='h-4 w-4 text-eco'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={1.5}>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z'
                    />
                  </svg>
                  <span className='text-xs font-semibold text-eco'>
                    {dict.ai.panel.aiSuggestion}
                  </span>
                </div>
                <p className='text-xs leading-relaxed text-neutral-500'>
                  {dict.ai.panel.aiSuggestionText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className='rounded-xl bg-white/80 p-3 shadow-sm shadow-black/[0.02]'>
      <p className='text-xs text-neutral-400'>{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

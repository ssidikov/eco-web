'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'
import type { Dictionary } from '@/i18n/getDictionary'

export default function MetricsSection({ dict }: { dict: Dictionary }) {
  const { containerRef, progress } = useScrollProgress()

  return (
    <section className='pin-spacer bg-white' style={{ height: '280vh' }} ref={containerRef}>
      <div className='pin-content relative'>
        <div className='ambient-glow pointer-events-none absolute inset-0' />

        <div className='relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-12 px-6 sm:gap-16 lg:grid-cols-4'>
          {dict.metrics.items.map((item, i) => {
            const start = i * 0.2
            const itemProgress = Math.min(Math.max((progress - start) / 0.25, 0), 1)

            return (
              <div
                key={i}
                className='text-center'
                style={{
                  opacity: itemProgress,
                  transform: `translateY(${40 - itemProgress * 40}px)`,
                  transition: 'opacity 0.05s linear, transform 0.05s linear',
                }}>
                <span className='block text-6xl font-bold tracking-tight text-eco sm:text-7xl lg:text-8xl'>
                  {item.value}
                </span>
                <span className='mt-3 block text-base font-medium text-neutral-400 sm:text-lg'>
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

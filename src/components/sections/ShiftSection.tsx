'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'
import type { Dictionary } from '@/i18n/getDictionary'

export default function ShiftSection({ dict }: { dict: Dictionary }) {
  const { containerRef, progress } = useScrollProgress()

  const lines = [dict.shift.line1, dict.shift.line2, dict.shift.line3]

  return (
    <section className='pin-spacer bg-surface' style={{ height: '350vh' }} ref={containerRef}>
      <div className='pin-content relative'>
        {/* Subtle ambient */}
        <div className='ambient-glow pointer-events-none absolute inset-0' />

        <div className='relative z-10 mx-auto max-w-4xl px-6 text-center'>
          {lines.map((line, i) => {
            const start = i * 0.28
            const lineProgress = Math.min(Math.max((progress - start) / 0.22, 0), 1)

            return (
              <p
                key={i}
                className='my-6 text-3xl font-bold tracking-tight text-neutral-900 sm:my-8 sm:text-5xl lg:text-6xl'
                style={{
                  opacity: lineProgress,
                  transform: `translateY(${30 - lineProgress * 30}px)`,
                  transition: 'opacity 0.05s linear, transform 0.05s linear',
                }}>
                {line}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}

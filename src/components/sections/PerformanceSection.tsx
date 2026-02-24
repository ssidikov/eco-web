'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { Dictionary } from '@/i18n/getDictionary'

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
}: {
  target: number
  suffix: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [hasStarted, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function PerformanceSection({ dict }: { dict: Dictionary }) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  return (
    <section className='relative overflow-hidden bg-surface py-32 sm:py-40'>
      {/* Ambient glow */}
      <div className='ambient-glow pointer-events-none absolute inset-0' />

      <div className='relative z-10 mx-auto max-w-6xl px-6'>
        {/* Section label */}
        <div className={`reveal-up ${titleVisible ? 'visible' : ''} mb-4 text-center`}>
          <span className='text-xs font-medium tracking-widest text-eco uppercase'>
            {dict.performance.sectionLabel}
          </span>
        </div>

        <h2
          ref={titleRef}
          className={`reveal-up ${titleVisible ? 'visible' : ''} mb-20 text-center text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl`}>
          {dict.performance.title}
        </h2>

        <div className='grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4'>
          {dict.performance.items.map((item, i) => (
            <PerformanceCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PerformanceCard({
  item,
  index,
}: {
  item: { value: number; suffix: string; label: string }
  index: number
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`reveal-up reveal-delay-${index + 1} ${isVisible ? 'visible' : ''} rounded-3xl bg-white p-8 text-center shadow-sm`}>
      <span className='block text-3xl font-bold tracking-tight text-eco sm:text-4xl'>
        <AnimatedCounter target={item.value} suffix={item.suffix} />
      </span>
      <span className='mt-3 block text-sm font-medium text-neutral-400 sm:text-base'>
        {item.label}
      </span>
    </div>
  )
}

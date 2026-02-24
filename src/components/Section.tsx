'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

interface SectionProps {
  children: React.ReactNode
  label?: string
  title?: string
  alt?: boolean
  className?: string
  id?: string
}

export default function Section({
  children,
  label,
  title,
  alt = false,
  className = '',
  id,
}: SectionProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section
      id={id}
      ref={ref}
      className={`py-24 sm:py-32 ${alt ? 'bg-surface' : 'bg-white'} ${className}`}>
      <div className='mx-auto max-w-6xl px-6'>
        {label && (
          <p
            className={`reveal-up ${isVisible ? 'visible' : ''} mb-3 text-xs font-medium tracking-widest text-eco uppercase`}>
            {label}
          </p>
        )}
        {title && (
          <h2
            className={`reveal-up reveal-delay-1 ${isVisible ? 'visible' : ''} mb-16 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl`}>
            {title}
          </h2>
        )}
        <div className={`reveal-up reveal-delay-2 ${isVisible ? 'visible' : ''}`}>{children}</div>
      </div>
    </section>
  )
}

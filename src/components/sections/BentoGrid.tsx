'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { Dictionary } from '@/i18n/getDictionary'

function BentoCard({
  title,
  description,
  points,
  delay,
  className = '',
  isToolsCard = false,
}: {
  title: string
  description: string
  points: string[]
  delay: number
  className?: string
  isToolsCard?: boolean
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Break comma-separated tool lists into individual pills
  const renderPoints = isToolsCard
    ? points.flatMap((p) =>
        p
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      )
    : points

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`reveal-up reveal-delay-${delay} ${isVisible ? 'visible' : ''} group relative overflow-hidden rounded-4xl border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-neutral-900/5 sm:p-10 ${className}`}>
      {/* Top edge subtle highlight */}
      <div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neutral-300 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

      {/* Vercel/Linear style mouse-tracking glow */}
      <div
        className='pointer-events-none absolute -inset-px rounded-4xl opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(62, 111, 88, 0.06), transparent 40%)`,
        }}
      />

      <div className='relative z-10 flex h-full flex-col'>
        <div>
          <h3 className='text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl'>{title}</h3>
          <p className='mt-3 text-sm leading-relaxed text-neutral-500'>{description}</p>
        </div>

        <div className='mt-8 grow'>
          {isToolsCard ? (
            <div className='flex flex-wrap gap-2.5'>
              {renderPoints.map((point, i) => (
                <span
                  key={i}
                  className='inline-flex items-center rounded-full border border-neutral-200/60 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold text-neutral-600 transition-colors duration-300 group-hover:border-eco/20 group-hover:bg-eco/5 group-hover:text-eco'>
                  {point}
                </span>
              ))}
            </div>
          ) : (
            <ul className='space-y-4'>
              {renderPoints.map((point, i) => (
                <li key={i} className='flex items-start gap-3.5 text-neutral-600'>
                  <span className='mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-eco/10 text-eco'>
                    <svg
                      className='h-2.5 w-2.5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={3}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                    </svg>
                  </span>
                  <span className='text-sm font-medium leading-relaxed'>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BentoGrid({ dict }: { dict: Dictionary }) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  // Layout logic for 6 cards in a 3-column md grid:
  // Row 1: 2 cols, 1 col
  // Row 2: 1 col, 2 cols
  // Row 3: 1 col, 2 cols (tools card)
  const getCardStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'md:col-span-2'
      case 1:
        return 'md:col-span-1'
      case 2:
        return 'md:col-span-1'
      case 3:
        return 'md:col-span-2'
      case 4:
        return 'md:col-span-2'
      case 5:
        return 'md:col-span-1'
      default:
        return 'md:col-span-1'
    }
  }

  return (
    <section className='relative overflow-hidden bg-surface py-32 sm:py-40'>
      {/* Background ambient glow */}
      <div className='pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2'>
        <div className='h-[400px] w-[800px] rounded-full bg-eco/5 blur-[100px]' />
      </div>

      <div className='relative z-10 mx-auto max-w-6xl px-6'>
        {/* Section label */}
        <div className={`reveal-up ${titleVisible ? 'visible' : ''} mb-4 text-center`}>
          <span className='inline-flex items-center rounded-full border border-eco/20 bg-eco/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-eco uppercase'>
            {dict.bento.sectionLabel}
          </span>
        </div>

        <h2
          ref={titleRef}
          className={`reveal-up ${titleVisible ? 'visible' : ''} mb-16 text-center text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl`}>
          {dict.bento.sectionTitle}
        </h2>

        {/* True Bento Grid Layout */}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8'>
          {dict.bento.cards.map((card, i) => (
            <BentoCard
              key={i}
              title={card.title}
              description={card.description}
              points={card.points}
              delay={Math.min(i + 1, 6)}
              className={getCardStyle(i)}
              isToolsCard={i === 5} // Assuming 6th card is always the tools stack
            />
          ))}
        </div>
      </div>
    </section>
  )
}

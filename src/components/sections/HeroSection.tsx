'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { Dictionary } from '@/i18n/getDictionary'

const subscribe = () => () => {}

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  const params = useParams()
  const locale = params?.locale || 'en'

  return (
    <section className='relative min-h-screen overflow-hidden bg-white'>
      {/* Faint grid overlay */}
      <div className='hero-grid pointer-events-none absolute inset-0' />

      {/* Ambient glow behind title */}
      <div className='ambient-glow pointer-events-none absolute inset-0' />

      {/* Abstract mesh shape */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
        <div className='animate-mesh-drift relative' style={{ width: 700, height: 700 }}>
          <svg
            viewBox='0 0 700 700'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-full w-full opacity-[0.06]'>
            <circle cx='350' cy='350' r='280' stroke='#3e6f58' strokeWidth='0.5' />
            <circle cx='350' cy='350' r='200' stroke='#3e6f58' strokeWidth='0.5' />
            <circle cx='350' cy='350' r='120' stroke='#3e6f58' strokeWidth='0.5' />
            <ellipse
              cx='350'
              cy='350'
              rx='340'
              ry='180'
              stroke='#3e6f58'
              strokeWidth='0.5'
              style={{ transform: 'rotate(30deg)', transformOrigin: 'center' }}
            />
            <ellipse
              cx='350'
              cy='350'
              rx='340'
              ry='180'
              stroke='#3e6f58'
              strokeWidth='0.5'
              style={{ transform: 'rotate(-30deg)', transformOrigin: 'center' }}
            />
            <ellipse
              cx='350'
              cy='350'
              rx='340'
              ry='180'
              stroke='#3e6f58'
              strokeWidth='0.5'
              style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
            />
            {/* Neural connection dots */}
            {[
              [180, 200],
              [520, 200],
              [350, 120],
              [200, 400],
              [500, 400],
              [280, 300],
              [420, 300],
              [350, 500],
              [150, 350],
              [550, 350],
              [300, 180],
              [400, 180],
              [250, 480],
              [450, 480],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r='3' fill='#3e6f58' opacity='0.4' />
            ))}
            {/* Connection lines */}
            <line
              x1='180'
              y1='200'
              x2='280'
              y2='300'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
            <line
              x1='520'
              y1='200'
              x2='420'
              y2='300'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
            <line
              x1='280'
              y1='300'
              x2='420'
              y2='300'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
            <line
              x1='280'
              y1='300'
              x2='200'
              y2='400'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
            <line
              x1='420'
              y1='300'
              x2='500'
              y2='400'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
            <line
              x1='200'
              y1='400'
              x2='350'
              y2='500'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
            <line
              x1='500'
              y1='400'
              x2='350'
              y2='500'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
            <line
              x1='350'
              y1='120'
              x2='300'
              y2='180'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
            <line
              x1='350'
              y1='120'
              x2='400'
              y2='180'
              stroke='#3e6f58'
              strokeWidth='0.3'
              opacity='0.3'
            />
          </svg>
        </div>
      </div>

      {/* Floating micro-elements */}
      <div className='pointer-events-none absolute inset-0'>
        {/* Thin horizontal line */}
        <div className='animate-float-slower absolute top-1/4 left-[10%] h-px w-24 bg-eco opacity-[0.12]' />
        {/* Small dot */}
        <div className='animate-float-slow absolute top-[30%] right-[15%] h-1.5 w-1.5 rounded-full bg-eco opacity-[0.2]' />
        {/* Thin vertical line */}
        <div
          className='animate-float-slower absolute right-[20%] bottom-1/3 h-16 w-px bg-eco opacity-[0.1]'
          style={{ animationDelay: '2s' }}
        />
        {/* Corner bracket */}
        <div
          className='animate-float-slow absolute bottom-[25%] left-[8%] h-8 w-8 border-l border-b border-eco opacity-[0.08]'
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Content */}
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20'>
        <div className='mx-auto max-w-5xl text-center'>
          {/* Badge */}
          <div
            className={`stagger-in mb-8 ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}>
            <span className='inline-block rounded-full border border-eco/15 bg-eco/[0.04] px-5 py-2 text-xs font-medium tracking-widest text-eco uppercase'>
              {dict.hero.badge}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`stagger-in text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '0.25s' }}>
            {dict.hero.title}
            {/* Animated underline */}
            <span className='relative mt-2 block'>
              <span
                className='absolute -bottom-2 left-1/2 h-[3px] w-40 -translate-x-1/2 rounded-full bg-eco/30 sm:w-56'
                style={{
                  animation: mounted
                    ? 'underline-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards'
                    : 'none',
                  transform: 'translateX(-50%) scaleX(0)',
                  transformOrigin: 'center',
                }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`stagger-in mx-auto mt-8 max-w-2xl text-lg font-medium tracking-wide text-neutral-400 sm:text-xl ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '0.45s' }}>
            {dict.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className={`stagger-in mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}>
            <a
              href='#apply'
              className='group relative rounded-full bg-eco px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-eco/20'>
              {dict.hero.cta}
            </a>
            <Link
              href={`/${locale}/programme`}
              className='rounded-full border border-neutral-200 px-8 py-3.5 text-sm font-medium text-neutral-600 transition-all duration-300 hover:border-eco/30 hover:text-eco'>
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`stagger-in absolute bottom-8 ${mounted ? '' : 'opacity-0'}`}
          style={{ animationDelay: '1s' }}>
          <div className='flex flex-col items-center gap-2'>
            <div className='h-8 w-px bg-neutral-200' />
            <div className='h-2 w-2 animate-bounce rounded-full border border-neutral-300' />
          </div>
        </div>
      </div>
    </section>
  )
}

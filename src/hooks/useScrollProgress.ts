'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const containerHeight = container.offsetHeight

    // Progress from 0 (container top at viewport bottom) to 1 (container bottom at viewport top)
    const scrollableDistance = containerHeight - windowHeight
    if (scrollableDistance <= 0) {
      setProgress(rect.top <= 0 ? 1 : 0)
      return
    }

    const scrolled = -rect.top
    const p = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)
    setProgress(p)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Defer the initial scroll check to avoid synchronous state update in effect
    const timeoutId = setTimeout(handleScroll, 0)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [handleScroll])

  return { containerRef, progress }
}

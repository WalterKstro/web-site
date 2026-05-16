'use client'

import { useEffect, useRef } from 'react'

export const CursorGlow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    }

    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={ref} className="cursor-glow-container min-h-screen bg-pf-bg text-pf-text">
      {children}
    </div>
  )
}

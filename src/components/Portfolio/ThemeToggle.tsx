'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/Theme'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group inline-flex items-center justify-center p-2 rounded-lg text-pf-text-muted hover:text-pf-accent hover:bg-pf-hover transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}

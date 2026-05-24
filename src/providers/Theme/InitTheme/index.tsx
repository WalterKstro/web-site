'use client'

import { useEffect } from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  useEffect(() => {
    function getImplicitPreference() {
      const mediaQuery = '(prefers-color-scheme: dark)'
      const mql = window.matchMedia(mediaQuery)
      const hasImplicitPreference = typeof mql.matches === 'boolean'

      if (hasImplicitPreference) {
        return mql.matches ? 'dark' : 'light'
      }

      return null
    }

    function themeIsValid(theme: string | null): theme is 'light' | 'dark' {
      return theme === 'light' || theme === 'dark'
    }

    let themeToSet = defaultTheme
    const preference = window.localStorage.getItem(themeLocalStorageKey)

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else {
      const implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
  }, [])

  return null
}

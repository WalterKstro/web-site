'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  logoSrc?: string | null
  logoAlt?: string
  logoWidth?: number
  logoHeight?: number
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logoSrc, logoAlt, logoWidth, logoHeight }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  return (
    <header className="container relative z-20 bg-pf-bg" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        {data?.showLogo !== false && logoSrc && (
          <Link href="/">
            <Logo
              src={logoSrc}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
              loading="eager"
              priority="high"
              className="invert dark:invert-0"
            />
          </Link>
        )}
        {data?.showNavItems !== false && <HeaderNav data={data} />}
      </div>
    </header>
  )
}
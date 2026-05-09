import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-pf-bg text-pf-text">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        {footerData?.showLogo !== false && (
          <Link className="flex items-center" href="/">
            <Logo media={typeof footerData?.logo === 'object' && footerData?.logo !== null ? footerData.logo : null} />
          </Link>
        )}

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-pf-text" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
      {footerData?.copyrightText && (
        <div className="container pb-4 text-sm text-pf-text-muted text-center">
          {footerData.copyrightText}
        </div>
      )}
    </footer>
  )
}

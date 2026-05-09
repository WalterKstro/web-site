import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  let logoMedia: Media | null = null
  if (typeof footerData.logo === 'number') {
    const payload = await getPayload({ config: configPromise })
    logoMedia = (await payload.findByID({
      collection: 'media',
      id: footerData.logo,
    })) as Media
  } else if (typeof footerData.logo === 'object' && footerData.logo !== null) {
    logoMedia = footerData.logo
  }

  const logoSrc = getMediaUrl(logoMedia)
  const logoAlt = logoMedia?.alt || 'Logo'
  const logoWidth = logoMedia?.width || 193
  const logoHeight = logoMedia?.height || 34

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-pf-bg text-pf-text">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        {footerData?.showLogo !== false && logoSrc && (
          <Link className="flex items-center" href="/">
            <Logo src={logoSrc} alt={logoAlt} width={logoWidth} height={logoHeight} />
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
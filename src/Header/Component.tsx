import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()

  let logoMedia: Partial<Media> | null = null
  if (typeof headerData.logo === 'number') {
    const payload = await getPayload({ config: configPromise })
    logoMedia = (await payload.findByID({
      collection: 'media',
      id: headerData.logo,
      overrideAccess: false,
      select: {
        url: true,
        alt: true,
        width: true,
        height: true,
      },
    })) as Partial<Media>
  } else if (typeof headerData.logo === 'object' && headerData.logo !== null) {
    logoMedia = headerData.logo
  }

  const logoSrc = getMediaUrl(logoMedia)
  const logoAlt = logoMedia?.alt || 'Logo'
  const logoWidth = logoMedia?.width || 193
  const logoHeight = logoMedia?.height || 34

  return <HeaderClient data={headerData} logoSrc={logoSrc} logoAlt={logoAlt} logoWidth={logoWidth} logoHeight={logoHeight} />
}
import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media } from '@/payload-types'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()

  let logoMedia: Media | null = null
  if (typeof headerData.logo === 'number') {
    const payload = await getPayload({ config: configPromise })
    logoMedia = (await payload.findByID({
      collection: 'media',
      id: headerData.logo,
    })) as Media
  } else if (typeof headerData.logo === 'object' && headerData.logo !== null) {
    logoMedia = headerData.logo
  }

  return <HeaderClient data={headerData} logoMedia={logoMedia} />
}

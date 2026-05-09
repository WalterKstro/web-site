import clsx from 'clsx'
import React from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  media?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
    cloudinary?: {
      secure_url?: string | null
      [key: string]: unknown
    } | null
  } | null
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, media } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  const src = getMediaUrl(media)
  const alt = media?.alt || 'Logo'
  const width = media?.width || 193
  const height = media?.height || 34

  if (!src) {
    return null
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px] object-contain', className)}
      src={src}
    />
  )
}
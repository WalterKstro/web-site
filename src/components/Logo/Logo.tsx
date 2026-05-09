import clsx from 'clsx'
import React from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  src?: string | null
  alt?: string
  width?: number | null
  height?: number | null
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
  const { loading: loadingFromProps, priority: priorityFromProps, className, src: srcFromProps, alt, width, height, media } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  const src = srcFromProps || getMediaUrl(media)

  if (!src) {
    return null
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={alt || media?.alt || 'Logo'}
      width={width || media?.width || 193}
      height={height || media?.height || 34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px] object-contain', className)}
      src={src}
    />
  )
}
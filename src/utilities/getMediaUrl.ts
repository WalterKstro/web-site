/**
 * Resolves the correct URL for a media resource.
 *
 * When using the payload-cloudinary plugin, the Cloudinary URL is stored
 * in `resource.cloudinary.secure_url` while `resource.url` may still
 * contain a local path like `/api/media/file/...`. This function prefers
 * the Cloudinary URL when available.
 */
export const getMediaUrl = (
  resource?: {
    url?: string | null
    cloudinary?: {
      secure_url?: string | null
      [key: string]: unknown
    } | null
  } | null,
  cacheTag?: string | null,
): string => {
  if (!resource) return ''

  const url = resource.cloudinary?.secure_url || resource.url

  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${url}?${cacheTag}` : url
}
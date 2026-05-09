const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || ''
const CLOUDINARY_FOLDER = 'payload'

/**
 * Resolves the correct URL for a media resource.
 *
 * Priority:
 * 1. resource.cloudinary.secure_url (set by the adapter on upload)
 * 2. resource.url if it's already an absolute URL (Cloudinary)
 * 3. resource.url as-is (local path like /api/media/file/...)
 *
 * Local paths are handled by the staticHandler which redirects to Cloudinary.
 */
export const getMediaUrl = (
  resource?: {
    url?: string | null
    cloudinary?: unknown
  } | null,
  cacheTag?: string | null,
): string => {
  if (!resource) return ''

  const cloudinary = resource.cloudinary
  const secureUrl =
    cloudinary && typeof cloudinary === 'object' && !Array.isArray(cloudinary)
      ? (cloudinary as { secure_url?: string | null }).secure_url
      : null

  const url = secureUrl || resource.url

  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${url}?${cacheTag}` : url
}
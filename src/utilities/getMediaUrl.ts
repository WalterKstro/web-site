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
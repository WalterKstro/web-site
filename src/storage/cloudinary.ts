import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })
}

export function isCloudinaryEnabled(): boolean {
  return Boolean(cloudName && apiKey && apiSecret)
}

export async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary credentials not configured')
  }

  const publicId = filename.replace(/\.[^.]+$/, '')

  const result = await new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: 'auto',
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      },
    )
    uploadStream.end(buffer)
  })

  return result.secure_url
}

export async function deleteFromCloudinary(filename: string): Promise<void> {
  if (!cloudName) return
  try {
    await cloudinary.uploader.destroy(filename.replace(/\.[^.]+$/, ''))
  } catch {
    // Ignore
  }
}

export function getCloudinaryUrl(filename: string): string {
  if (!cloudName) return ''
  return `https://res.cloudinary.com/${cloudName}/image/upload/${filename}`
}

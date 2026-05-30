import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import type { Config } from '@/payload-types'
import type {
  CollectionConfig,
  FileData,
  PayloadRequest,
  TypeWithID,
} from 'payload'

interface CloudinaryAdapterArgs {
  cloudName: string
  apiKey: string
  apiSecret: string
  folder?: string
}

interface CloudinaryFile {
  buffer: Buffer
  filename: string
  mimeType: string
}

function getResourceType(filename: string, mimeType?: string): 'image' | 'video' | 'raw' | 'auto' {
  if (mimeType?.startsWith('video/')) return 'video'
  if (mimeType?.startsWith('image/')) return 'image'
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  if (['svg', 'webp', 'png', 'jpg', 'jpeg', 'gif', 'avif'].includes(ext)) return 'image'
  if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', 'txt', 'csv'].includes(ext)) return 'raw'
  return 'auto'
}

export const cloudinaryAdapter = ({
  cloudName,
  apiKey,
  apiSecret,
  folder = 'payload',
}: CloudinaryAdapterArgs) => {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })

  return ({ collection }: { collection: CollectionConfig }) => {
    return {
      name: 'cloudinary',

      async handleUpload({
        file,
        data,
      }: {
        file: CloudinaryFile
        data: Record<string, unknown>
      }): Promise<Partial<FileData & TypeWithID>> {
        const ext = file.filename.split('.').pop()?.toLowerCase() || ''
        const resourceType = getResourceType(file.filename, file.mimeType)
        const publicId = `${folder}/${collection.slug}/${file.filename.replace(/\.[^.]+$/, '')}`

        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              public_id: publicId,
              resource_type: resourceType,
              overwrite: true,
            },
            (error, result) => {
              if (error) reject(error)
              else if (result) resolve(result)
              else reject(new Error('Cloudinary upload returned no result'))
            },
          )
          uploadStream.end(file.buffer)
        })

        return {
          url: result.secure_url,
          width: result.width,
          height: result.height,
          filesize: result.bytes,
          mimeType: result.resource_type === 'image' ? `image/${result.format}` : file.mimeType,
          filename: file.filename,
          ...(data || {}),
          cloudinary: {
            public_id: result.public_id,
            resource_type: result.resource_type,
            format: result.format,
            secure_url: result.secure_url,
            bytes: result.bytes,
            created_at: result.created_at,
            version: result.version ? String(result.version) : undefined,
          },
        } as Partial<FileData & TypeWithID>
      },

      async handleDelete({
        doc,
      }: {
        doc: FileData & TypeWithID & { prefix?: string }
      }): Promise<void> {
        const cloudinaryMeta = (doc as Record<string, unknown>)?.cloudinary as Record<string, string> | undefined
        const resourceType = cloudinaryMeta?.resource_type || getResourceType(doc.filename || '')
        const publicId =
          cloudinaryMeta?.public_id ||
          (doc.filename ? `${folder}/${collection.slug}/${doc.filename.replace(/\.[^.]+$/, '')}` : '')
        if (!publicId) return
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
        } catch {
          // Ignore deletion errors
        }
      },

      generateURL({
        filename,
        data,
      }: {
        filename: string
        data: Record<string, unknown>
      }): string {
        const cloudinaryMeta = (data as Record<string, unknown>)?.cloudinary as Record<string, string> | undefined
        if (cloudinaryMeta?.secure_url) {
          return cloudinaryMeta.secure_url
        }

        const publicId = `${folder}/${collection.slug}/${filename.replace(/\.[^.]+$/, '')}`
        const ext = filename.split('.').pop()?.toLowerCase() || ''
        const resourceType = cloudinaryMeta?.resource_type || getResourceType(filename)

        if (resourceType === 'raw') {
          return `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}.${ext}`
        }
        if (resourceType === 'video') {
          return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}`
        }
        return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
      },

      async staticHandler(
        req: PayloadRequest,
        {
          params,
        }: {
          params: {
            collection: string
            filename: string
          }
        },
      ): Promise<Response> {
        const filename = params.filename
        const ext = filename.split('.').pop()?.toLowerCase() || ''
        const publicId = `${folder}/${collection.slug}/${filename.replace(/\.[^.]+$/, '')}`
        const resourceType = getResourceType(filename)

        try {
          const docs = await req.payload.find({
            collection: collection.slug as keyof Config['collections'],
            where: { filename: { equals: filename } },
            depth: 0,
            limit: 1,
            overrideAccess: false,
            pagination: false,
            req,
          })

          const doc = (docs.docs?.[0] as unknown) as
            | (Record<string, unknown> & { cloudinary?: Record<string, string> })
            | undefined
          const secureUrl = doc?.cloudinary?.secure_url
          if (secureUrl) {
            return new Response(null, {
              status: 302,
              headers: { Location: secureUrl },
            })
          }
        } catch {
          // fall through to URL construction
        }

        let url: string
        if (resourceType === 'raw') {
          url = `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}.${ext}`
        } else if (resourceType === 'video') {
          url = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}`
        } else {
          url = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
        }

        return new Response(null, {
          status: 302,
          headers: { Location: url },
        })
      },
    }
  }
}
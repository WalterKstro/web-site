import { v2 as cloudinary } from 'cloudinary'
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
        const publicId = `${folder}/${collection.slug}/${file.filename.replace(/\.[^.]+$/, '')}`

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
        const publicId =
          (doc as any).cloudinary?.public_id ||
          (doc.filename ? `${folder}/${collection.slug}/${doc.filename.replace(/\.[^.]+$/, '')}` : '')
        if (!publicId) return
        try {
          await cloudinary.uploader.destroy(publicId)
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
        const cloudinaryMeta = (data as any)?.cloudinary
        if (cloudinaryMeta?.secure_url) {
          return cloudinaryMeta.secure_url
        }

        const publicId = cloudinaryMeta?.public_id || `${folder}/${collection.slug}/${filename.replace(/\.[^.]+$/, '')}`
        const resourceType = cloudinaryMeta?.resource_type || 'image'
        const version = cloudinaryMeta?.version ? `/v${cloudinaryMeta.version}` : ''

        if (resourceType === 'video') {
          return `https://res.cloudinary.com/${cloudName}/video/upload${version}/${publicId}`
        }
        if (resourceType === 'raw') {
          return `https://res.cloudinary.com/${cloudName}/raw/upload${version}/${publicId}`
        }
        return `https://res.cloudinary.com/${cloudName}/image/upload${version}/${publicId}`
      },

      staticHandler(
        _req: PayloadRequest,
        {
          params,
        }: {
          params: {
            collection: string
            filename: string
          }
        },
      ): Response {
        const url = `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${params.collection}/${params.filename}`
        return new Response(null, {
          status: 302,
          headers: {
            Location: url,
          },
        })
      },
    }
  }
}
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
      }: {
        file: CloudinaryFile
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
        }
      },

      async handleDelete({
        doc,
      }: {
        doc: FileData & TypeWithID & { prefix?: string }
      }): Promise<void> {
        if (!doc.filename) return
        const publicId = `${folder}/${collection.slug}/${doc.filename.replace(/\.[^.]+$/, '')}`
        try {
          await cloudinary.uploader.destroy(publicId)
        } catch {
          // Ignore deletion errors
        }
      },

      generateURL({
        filename,
      }: {
        filename: string
      }): string {
        return `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${collection.slug}/${filename}`
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

import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  isCloudinaryEnabled,
  uploadToCloudinary,
  deleteFromCloudinary,
} from '../storage/cloudinary'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    staticDir: isCloudinaryEnabled() ? undefined : path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (!isCloudinaryEnabled() || operation !== 'create') {
          return data
        }

        // In Payload 3.x, uploaded file is accessible via req.file
        const file = (req as any).file
        if (!file || !file.data) {
          return data
        }

        try {
          const url = await uploadToCloudinary(
            Buffer.isBuffer(file.data) ? file.data : Buffer.from(file.data),
            file.name || data.filename || 'upload',
          )

          return {
            ...data,
            url,
            cloudinaryUrl: url,
          }
        } catch (err) {
          console.error('Cloudinary upload error:', err)
          return data
        }
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        if (!isCloudinaryEnabled()) return

        try {
          const doc = await req.payload.findByID({
            collection: 'media',
            id: id as string,
          })
          if (doc?.filename) {
            await deleteFromCloudinary(doc.filename)
          }
        } catch (err) {
          console.error('Cloudinary delete error:', err)
        }
      },
    ],
  },
}

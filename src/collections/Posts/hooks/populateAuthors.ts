import type { CollectionAfterReadHook } from 'payload'
import type { User } from '@/payload-types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req }) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const authorIds = doc.authors.map((author: string | number | User) =>
      typeof author === 'object' ? author?.id : author,
    )

    try {
      const { docs: authorDocs } = await req.payload.find({
        collection: 'users',
        where: {
          id: {
            in: authorIds,
          },
        },
        depth: 0,
        select: {
          id: true,
          name: true,
        },
        req,
      })

      if (authorDocs.length > 0) {
        doc.populatedAuthors = authorDocs.map((authorDoc) => ({
          id: authorDoc.id,
          name: authorDoc.name,
        }))
      }
    } catch {
      // swallow error
    }
  }

  return doc
}

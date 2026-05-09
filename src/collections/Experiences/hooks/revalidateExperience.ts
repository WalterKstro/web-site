import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Experience } from '../../../payload-types'

export const revalidateExperience: CollectionAfterChangeHook<Experience> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating pages after experience change: ${doc.company}`)
    revalidatePath('/', 'layout')
  }

  return doc
}

export const revalidateExperienceDelete: CollectionAfterDeleteHook<Experience> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating pages after experience delete: ${doc?.company}`)
    revalidatePath('/', 'layout')
  }

  return doc
}

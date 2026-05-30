import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { revalidateExperience, revalidateExperienceDelete } from './hooks/revalidateExperience'

export const Experiences: CollectionConfig<'experiences'> = {
  slug: 'experiences',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['company', 'title', 'startDate', 'endDate', 'order'],
    useAsTitle: 'company',
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'companyUrl',
      type: 'text',
      label: 'Company URL',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      index: true,
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
      },
    },
    {
      name: 'current',
      type: 'checkbox',
      defaultValue: false,
      label: 'Current Position',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 0,
      index: true,
    },
  ],
  hooks: {
    afterChange: [revalidateExperience],
    afterDelete: [revalidateExperienceDelete],
  },
  timestamps: true,
}

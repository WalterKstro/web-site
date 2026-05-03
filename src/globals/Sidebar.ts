import type { GlobalConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Sidebar: GlobalConfig = {
  slug: 'sidebar',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              defaultValue: 'Brittany Chiang',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Frontend Engineer',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'I build accessible, pixel-perfect experiences for the web.',
            },
            {
              name: 'profileImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'GitHub', value: 'github' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Dribbble', value: 'dribbble' },
                    { label: 'CodePen', value: 'codepen' },
                    { label: 'Website', value: 'website' },
                    { label: 'Email', value: 'email' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                initCollapsed: true,
              },
            },

            {
              name: 'showResumeLink',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show Resume Link',
            },
            {
              name: 'resumeUrl',
              type: 'text',
              label: 'Resume URL',
              admin: {
                condition: (data) => Boolean(data?.showResumeLink),
              },
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'about',
              type: 'richText',
              label: 'About Content',
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
}

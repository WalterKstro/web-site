import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              name: 'showLogo',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show Logo',
              admin: {
                description: 'Toggle the logo visibility in the footer',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              admin: {
                description: 'Upload a custom logo image',
                condition: (data) => Boolean(data?.showLogo),
              },
            },
            {
              name: 'showThemeSelector',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show Theme Selector',
              admin: {
                description: 'Toggle the dark/light mode switcher',
              },
            },
            {
              name: 'copyrightText',
              type: 'text',
              label: 'Copyright Text',
              admin: {
                description: 'Copyright notice displayed at the bottom of the footer',
              },
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                }),
              ],
              maxRows: 6,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

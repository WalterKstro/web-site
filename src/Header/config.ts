import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
                description: 'Toggle the logo visibility in the header',
              },
            },
            {
              name: 'showNavItems',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show Navigation Items',
              admin: {
                description: 'Toggle the navigation links visibility',
              },
            },
            {
              name: 'showSearch',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show Search Icon',
              admin: {
                description: 'Toggle the search icon visibility in the header',
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
                  RowLabel: '@/Header/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

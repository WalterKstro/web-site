import type { Block } from 'payload'

export const PortfolioAbout: Block = {
  slug: 'portfolioAbout',
  interfaceName: 'PortfolioAboutBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'About',
    },
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'about',
      label: 'Section ID',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'About Content',
    },
  ],
}

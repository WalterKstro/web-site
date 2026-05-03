import type { Block } from 'payload'

export const PortfolioWriting: Block = {
  slug: 'portfolioWriting',
  interfaceName: 'PortfolioWritingBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Writing',
    },
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'writing',
      label: 'Section ID',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
    },
  ],
}

import type { Block } from 'payload'

export const PortfolioFooter: Block = {
  slug: 'portfolioFooter',
  interfaceName: 'PortfolioFooterBlock',
  fields: [
    {
      name: 'customText',
      type: 'textarea',
      label: 'Custom Footer Text',
    },
  ],
}

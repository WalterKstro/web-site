import type { Block } from 'payload'

export const PortfolioExperience: Block = {
  slug: 'portfolioExperience',
  interfaceName: 'PortfolioExperienceBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Experience',
    },
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'experience',
      label: 'Section ID',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 100,
    },
  ],
}

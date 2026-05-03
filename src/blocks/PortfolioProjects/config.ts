import type { Block } from 'payload'

export const PortfolioProjects: Block = {
  slug: 'portfolioProjects',
  interfaceName: 'PortfolioProjectsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Projects',
    },
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'projects',
      label: 'Section ID',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
    },
    {
      name: 'featuredOnly',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show featured only',
    },
  ],
}

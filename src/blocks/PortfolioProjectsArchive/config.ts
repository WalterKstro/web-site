import type { Block } from 'payload'

export const PortfolioProjectsArchive: Block = {
  slug: 'portfolioProjectsArchive',
  interfaceName: 'PortfolioProjectsArchiveBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Proyectos',
    },
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'proyectos',
      label: 'Section ID',
    },
  ],
}

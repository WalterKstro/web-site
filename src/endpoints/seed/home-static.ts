import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  meta: {
    description: 'Portfolio built with Payload and Next.js.',
    title: 'Portfolio',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'portfolioAbout',
      heading: 'About',
      sectionId: 'about',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Welcome to my portfolio. Visit the admin dashboard to customize your content.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      blockType: 'portfolioExperience',
      heading: 'Experience',
      sectionId: 'experience',
      limit: 100,
    },
    {
      blockType: 'portfolioProjects',
      heading: 'Projects',
      sectionId: 'projects',
      limit: 6,
      featuredOnly: true,
    },
    {
      blockType: 'portfolioWriting',
      heading: 'Writing',
      sectionId: 'writing',
      limit: 4,
    },
    {
      blockType: 'portfolioFooter',
    },
  ],
}

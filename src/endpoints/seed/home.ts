import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    meta: {
      description: 'An open-source website built with Payload and Next.js.',
      image: metaImage.id,
      title: 'Payload Website Template',
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
                    text: 'Welcome to my portfolio.',
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
}

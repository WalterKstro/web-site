import type { Sidebar } from '@/payload-types'

export const sidebarData: Omit<Sidebar, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Brittany Chiang',
  title: 'Frontend Engineer',
  tagline: 'I build accessible, pixel-perfect experiences for the web.',
  showResumeLink: true,
  resumeUrl: '/resume.pdf',
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/bchiang7',
      label: 'GitHub',
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/bchiang7',
      label: 'LinkedIn',
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/bchiang7',
      label: 'Twitter',
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com/bchiang7',
      label: 'Instagram',
    },
  ],
  about: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: "I'm a frontend engineer with an expertise in building accessible, pixel-perfect user interfaces. I take pride in crafting thoughtful, inclusive products and have a sharp eye for the little details that elevate user experience. I do my best work at the intersection of design and engineering, where great UX meets clean, scalable code.",
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: "Currently, I'm on the component library team at ",
              version: 1,
            },
            {
              type: 'link',
              children: [
                {
                  type: 'text',
                  text: 'Klaviyo',
                  version: 1,
                },
              ],
              direction: 'ltr',
              fields: {
                linkType: 'custom',
                newTab: true,
                url: 'https://www.klaviyo.com',
              },
              format: '',
              indent: 0,
              version: 2,
            },
            {
              type: 'text',
              text: ', where I maintain and evolve the company\'s design system. I lead engineering efforts across components, tooling, and patterns, partnering closely with designers and engineers to ensure accessibility is built into the foundation of our products.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: "Previously, I've worked across a wide range of environments — from product studios to startups and large tech companies — including ",
              version: 1,
            },
            {
              type: 'text',
              text: 'Apple, Starry Internet, and Upstatement',
              version: 1,
            },
            {
              type: 'text',
              text: '. Outside of my day-to-day work, I also created an ',
              version: 1,
            },
            {
              type: 'link',
              children: [
                {
                  type: 'text',
                  text: 'online video course',
                  version: 1,
                },
              ],
              direction: 'ltr',
              fields: {
                linkType: 'custom',
                newTab: true,
                url: 'https://www.newline.co/courses/build-a-spotify-connected-app',
              },
              format: '',
              indent: 0,
              version: 2,
            },
            {
              type: 'text',
              text: ' a few years ago which walks through building a real-world, API-driven application from scratch. These experiences have shaped how I think about building products that are both well-crafted and widely usable.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'In my spare time, you can usually find me climbing, playing tennis, hanging out with my wife and two cats, or running around Hyrule searching for ',
              version: 1,
            },
            {
              type: 'text',
              text: 'Korok seeds',
              version: 1,
            },
            {
              type: 'text',
              text: '.',
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
  meta: {
    title: 'Brittany Chiang',
    description: 'Frontend Engineer specializing in accessible, pixel-perfect user interfaces.',
  },
}

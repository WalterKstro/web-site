import type { RequiredDataFromCollectionSlug } from 'payload'

export const experience1: RequiredDataFromCollectionSlug<'experiences'> = {
  company: 'Klaviyo',
  title: 'Senior Frontend Engineer, Accessibility',
  location: 'Boston, MA',
  companyUrl: 'https://www.klaviyo.com',
  startDate: '2024-07-01T00:00:00.000Z',
  current: true,
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Build and maintain critical components used to construct Klaviyo\'s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.',
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
  technologies: [
    { technology: 'JavaScript' },
    { technology: 'TypeScript' },
    { technology: 'React' },
    { technology: 'Storybook' },
  ],
  order: 0,
}

export const experience2: RequiredDataFromCollectionSlug<'experiences'> = {
  company: 'Upstatement',
  title: 'Lead Engineer',
  location: 'Boston, MA',
  companyUrl: 'https://www.upstatement.com',
  startDate: '2018-05-01T00:00:00.000Z',
  endDate: '2024-06-01T00:00:00.000Z',
  current: false,
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.',
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
  technologies: [
    { technology: 'JavaScript' },
    { technology: 'TypeScript' },
    { technology: 'HTML & SCSS' },
    { technology: 'React' },
    { technology: 'Next.js' },
    { technology: 'React Native' },
    { technology: 'WordPress' },
    { technology: 'Contentful' },
    { technology: 'Node.js' },
    { technology: 'PHP' },
  ],
  order: 1,
}

export const experience3: RequiredDataFromCollectionSlug<'experiences'> = {
  company: 'Apple',
  title: 'UI Engineer Co-op',
  location: 'Cupertino, CA',
  companyUrl: 'https://www.apple.com',
  startDate: '2017-07-01T00:00:00.000Z',
  endDate: '2017-12-01T00:00:00.000Z',
  current: false,
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Developed and styled interactive web apps for Apple Music, including the user interface of Apple Music\'s embeddable web player widget for in-browser user authorization and full song playback.',
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
  technologies: [
    { technology: 'Ember' },
    { technology: 'SCSS' },
    { technology: 'JavaScript' },
    { technology: 'MusicKit.js' },
  ],
  order: 2,
}

export const experience4: RequiredDataFromCollectionSlug<'experiences'> = {
  company: 'Scout Studio',
  title: 'Developer',
  location: 'Northeastern University',
  companyUrl: 'https://web.northeastern.edu/scout',
  startDate: '2016-01-01T00:00:00.000Z',
  endDate: '2017-06-01T00:00:00.000Z',
  current: false,
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Collaborated with other student designers and engineers on pro-bono projects to create new brands, design systems, and websites for organizations in the community.',
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
  technologies: [
    { technology: 'Jekyll' },
    { technology: 'SCSS' },
    { technology: 'JavaScript' },
    { technology: 'WordPress' },
  ],
  order: 3,
}

export const experience5: RequiredDataFromCollectionSlug<'experiences'> = {
  company: 'Starry',
  title: 'Software Engineer Co-op',
  location: 'Boston, MA',
  companyUrl: 'https://starry.com',
  startDate: '2016-07-01T00:00:00.000Z',
  endDate: '2016-12-01T00:00:00.000Z',
  current: false,
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Worked with the UI team to engineer and improve major features of Starry\'s customer-facing Android app.',
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
  technologies: [
    { technology: 'Cordova' },
    { technology: 'Backbone' },
    { technology: 'JavaScript' },
    { technology: 'CSS' },
  ],
  order: 4,
}

export const experience6: RequiredDataFromCollectionSlug<'experiences'> = {
  company: 'MullenLowe U.S.',
  title: 'Creative Technologist Co-op',
  location: 'Boston, MA',
  companyUrl: 'https://us.mullenlowe.com',
  startDate: '2015-07-01T00:00:00.000Z',
  endDate: '2015-12-01T00:00:00.000Z',
  current: false,
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Developed, maintained, and shipped production code for client websites. Clients included JetBlue, Lovesac, U.S. Cellular, U.S. Department of Defense, and more.',
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
  technologies: [
    { technology: 'HTML' },
    { technology: 'CSS' },
    { technology: 'JavaScript' },
    { technology: 'jQuery' },
  ],
  order: 5,
}

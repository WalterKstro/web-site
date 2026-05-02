import type { RequiredDataFromCollectionSlug } from 'payload'

export const project1: RequiredDataFromCollectionSlug<'projects'> = {
  title: 'Build a Spotify Connected App',
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.',
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
  projectUrl: 'https://www.newline.co/courses/build-a-spotify-connected-app',
  featured: true,
  technologies: [
    { technology: 'React' },
    { technology: 'Express' },
    { technology: 'Spotify API' },
    { technology: 'Styled Components' },
  ],
  order: 0,
}

export const project2: RequiredDataFromCollectionSlug<'projects'> = {
  title: 'Spotify Profile',
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
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
  projectUrl: 'https://spotify-profile.herokuapp.com',
  githubUrl: 'https://github.com/bchiang7/spotify-profile',
  featured: true,
  stats: {
    value: '1.2k',
    label: 'stars',
  },
  technologies: [
    { technology: 'React' },
    { technology: 'Express' },
    { technology: 'Spotify API' },
    { technology: 'Heroku' },
  ],
  order: 1,
}

export const project3: RequiredDataFromCollectionSlug<'projects'> = {
  title: 'Halcyon Theme',
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more.',
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
  projectUrl: 'https://halcyon-theme.netlify.app',
  githubUrl: 'https://github.com/bchiang7/halcyon-site',
  featured: true,
  stats: {
    value: '100k+',
    label: 'Installs',
  },
  technologies: [
    { technology: 'VS Code' },
    { technology: 'Sublime Text' },
    { technology: 'Atom' },
    { technology: 'iTerm2' },
  ],
  order: 2,
}

export const project4: RequiredDataFromCollectionSlug<'projects'> = {
  title: 'brittanychiang.com (v4)',
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'An old portfolio site built with Gatsby with 6k+ stars and 3k+ forks',
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
  projectUrl: 'https://v4.brittanychiang.com',
  githubUrl: 'https://github.com/bchiang7/v4',
  featured: true,
  stats: {
    value: '6,223',
    label: 'stars',
  },
  technologies: [
    { technology: 'Gatsby' },
    { technology: 'Styled Components' },
    { technology: 'Netlify' },
  ],
  order: 3,
}

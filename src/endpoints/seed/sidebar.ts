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
}

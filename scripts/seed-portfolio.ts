import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { portfolioData } from '../src/endpoints/seed/portfolio'
import {
  experience1,
  experience2,
  experience3,
  experience4,
  experience5,
  experience6,
} from '../src/endpoints/seed/experiences'
import { project1, project2, project3, project4 } from '../src/endpoints/seed/projects'

async function seedPortfolio() {
  const payload = await getPayload({ config })

  console.log('Seeding portfolio data...')

  // Clear existing experiences and projects
  await payload.db.deleteMany({ collection: 'experiences', req: {} as any, where: {} })
  await payload.db.deleteMany({ collection: 'projects', req: {} as any, where: {} })

  // Seed experiences
  console.log('Seeding experiences...')
  await Promise.all([
    payload.create({ collection: 'experiences', depth: 0, data: experience1 }),
    payload.create({ collection: 'experiences', depth: 0, data: experience2 }),
    payload.create({ collection: 'experiences', depth: 0, data: experience3 }),
    payload.create({ collection: 'experiences', depth: 0, data: experience4 }),
    payload.create({ collection: 'experiences', depth: 0, data: experience5 }),
    payload.create({ collection: 'experiences', depth: 0, data: experience6 }),
  ])

  // Seed projects
  console.log('Seeding projects...')
  await Promise.all([
    payload.create({ collection: 'projects', depth: 0, data: project1 }),
    payload.create({ collection: 'projects', depth: 0, data: project2 }),
    payload.create({ collection: 'projects', depth: 0, data: project3 }),
    payload.create({ collection: 'projects', depth: 0, data: project4 }),
  ])

  // Seed portfolio global
  console.log('Seeding portfolio global...')
  await payload.updateGlobal({
    slug: 'portfolio',
    data: portfolioData,
  })

  console.log('Portfolio seed completed successfully!')
  process.exit(0)
}

seedPortfolio().catch((err) => {
  console.error('Portfolio seed failed:', err)
  process.exit(1)
})

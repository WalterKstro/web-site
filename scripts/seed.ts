import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seed } from '../src/endpoints/seed/index.ts'

async function runSeed() {
  const payload = await getPayload({ config })

  // Create a minimal req object for the seed function
  const req = {
    payload,
    user: null,
    headers: new Headers(),
  } as any

  await seed({ payload, req })
  console.log('Seed completed successfully!')
  process.exit(0)
}

runSeed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

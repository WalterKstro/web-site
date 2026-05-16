import type { Metadata } from 'next'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'

import { Sidebar } from '@/components/Portfolio/Sidebar'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderBlocks } from '@/blocks/RenderBlocks'

import type {
  Sidebar as SidebarType,
  Page,
  PortfolioAboutBlock,
  PortfolioExperienceBlock,
  PortfolioProjectsBlock,
  PortfolioWritingBlock,
} from '@/payload-types'
import { homeStatic } from '@/endpoints/seed/home-static'

type NavigableBlock =
  | PortfolioAboutBlock
  | PortfolioExperienceBlock
  | PortfolioProjectsBlock
  | PortfolioWritingBlock

function isNavigableBlock(
  block: Page['layout'][0],
): block is NavigableBlock {
  return (
    block.blockType === 'portfolioAbout' ||
    block.blockType === 'portfolioExperience' ||
    block.blockType === 'portfolioProjects' ||
    block.blockType === 'portfolioWriting'
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const pageResult = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const homePage = pageResult.docs?.[0] as Page | undefined

  if (homePage) {
    return generateMeta({ doc: homePage })
  }

  // Fallback to portfolio global
  const sidebar = await getCachedGlobal('sidebar', 0)()
  const p = sidebar as SidebarType

  const title = p?.name || 'Portfolio'
  const description = p?.tagline || ''

  return {
    title: `${title} | ${p?.title || ''}`.trim(),
    description,
    openGraph: mergeOpenGraph({
      title: `${title} | ${p?.title || ''}`.trim(),
      description,
      url: '/',
    }),
  }
}

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  // Fetch home page from Pages collection
  const pageResult = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const homePage = (pageResult.docs?.[0] as Page | undefined) || homeStatic

  // Generate navItems dynamically from portfolio blocks
  const navItems = homePage.layout
    .filter(isNavigableBlock)
    .map((block) => ({
      label: block.heading || '',
      sectionId: block.sectionId || '',
    }))

  // Fetch sidebar global
  const sidebar = await getCachedGlobal('sidebar', 1)()
  const p = sidebar as SidebarType

  return (
    <>
      {draft && <LivePreviewListener />}

      <div className="min-h-screen bg-pf-bg text-pf-text">
        <div className="container py-12 md:py-20 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-16">
            {/* Sidebar - Sticky on desktop */}
            <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[45%] lg:flex-col lg:pb-24">
              <Sidebar sidebar={p} navItems={navItems} />
            </aside>

            {/* Main Content */}
            <main className="pt-24 lg:w-[55%] lg:py-24">
              <RenderBlocks
                blocks={homePage.layout}
                blockWrapperClassName=""
              />
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

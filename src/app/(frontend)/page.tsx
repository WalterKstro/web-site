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
import { AboutSection } from '@/components/Portfolio/About'
import { ExperienceSection } from '@/components/Portfolio/Experience'
import { ProjectsSection } from '@/components/Portfolio/Projects'
import { WritingSection } from '@/components/Portfolio/Writing'
import { LivePreviewListener } from '@/components/LivePreviewListener'

import type { Portfolio as PortfolioType, Experience, Project, Post } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getCachedGlobal('portfolio', 0)()

  const p = portfolio as PortfolioType

  const title = p?.meta?.title || p?.name || 'Portfolio'
  const description = p?.meta?.description || p?.tagline || ''
  const ogImage =
    p?.meta?.image && typeof p.meta.image === 'object' && 'url' in p.meta.image
      ? getServerSideURL() + p.meta.image.url
      : undefined

  return {
    title: `${title} | ${p?.title || ''}`.trim(),
    description,
    openGraph: mergeOpenGraph({
      title: `${title} | ${p?.title || ''}`.trim(),
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      url: '/',
    }),
  }
}

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  // Fetch all data in parallel
  const [portfolio, experiences, projects, posts] = await Promise.all([
    getPayload({ config: configPromise }).then((payload) =>
      payload.findGlobal({
        slug: 'portfolio',
        depth: 1,
      }),
    ),
    getPayload({ config: configPromise }).then((payload) =>
      payload.find({
        collection: 'experiences',
        limit: 100,
        pagination: false,
        overrideAccess: false,
      }),
    ),
    getPayload({ config: configPromise }).then((payload) =>
      payload.find({
        collection: 'projects',
        limit: 100,
        pagination: false,
        overrideAccess: false,
      }),
    ),
    getPayload({ config: configPromise }).then((payload) =>
      payload.find({
        collection: 'posts',
        limit: 10,
        pagination: false,
        overrideAccess: false,
        draft: false,
      }),
    ),
  ])

  const p = portfolio as PortfolioType
  const expDocs = (experiences.docs || []) as Experience[]
  const projDocs = (projects.docs || []) as Project[]
  const postDocs = (posts.docs || []) as Post[]

  return (
    <>
      {draft && <LivePreviewListener />}

      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-16">
            {/* Sidebar - Sticky on desktop */}
            <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
              <Sidebar portfolio={p} />
            </aside>

            {/* Main Content */}
            <main
              id="main-content"
              className="pt-24 lg:w-[55%] lg:py-24"
              tabIndex={-1}
            >
              {p.about && <AboutSection about={p.about} />}
              <ExperienceSection experiences={expDocs} />
              <ProjectsSection projects={projDocs} />
              <WritingSection posts={postDocs} />

              {/* Footer */}
              <footer className="mt-24 text-sm text-slate-500 leading-relaxed max-w-md">
                <p>
                  Loosely designed in{' '}
                  <span className="text-slate-300">Figma</span> and coded in{' '}
                  <span className="text-slate-300">Visual Studio Code</span> by{' '}
                  {p.name || 'yours truly'}. Built with{' '}
                  <span className="text-slate-300">Next.js</span> and{' '}
                  <span className="text-slate-300">Tailwind CSS</span>, deployed with{' '}
                  <span className="text-slate-300">Vercel</span>.
                </p>
                <p className="mt-4">
                  All text is set in the{' '}
                  <span className="text-slate-300">Inter</span> typeface.
                </p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

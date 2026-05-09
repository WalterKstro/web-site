import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { PortfolioWritingBlock as PortfolioWritingBlockProps, Post, Media } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const PortfolioWritingBlock: React.FC<PortfolioWritingBlockProps> = async (props) => {
  const { heading, sectionId, limit } = props

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    limit: limit || 4,
    pagination: false,
    overrideAccess: false,
    draft: false,
  })

  const posts = (result.docs || []) as Post[]

  if (!posts.length) return null

  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.publishedAt || b.createdAt || 0).getTime() - new Date(a.publishedAt || a.createdAt || 0).getTime()
  })

  const displayPosts = sortedPosts.slice(0, limit || 4)

  return (
    <section
      id={sectionId || 'writing'}
      className="mb-24 scroll-mt-24"
      aria-labelledby={`${sectionId}-heading`}
    >
      <h2
        id={`${sectionId}-heading`}
        className="text-sm font-bold uppercase tracking-widest text-pf-text-heading mb-8 lg:hidden"
      >
        {heading || 'Writing'}
      </h2>

      <div className="space-y-6">
        {displayPosts.map((post) => {
          const heroImage = post.heroImage as Media | undefined
          const year = post.publishedAt
            ? formatDateTime({ date: post.publishedAt, format: 'year' })
            : formatDateTime({ date: post.createdAt, format: 'year' })

          return (
            <article key={post.id} className="group">
              <a
                href={`/posts/${post.slug}`}
                className="flex items-start gap-4 p-4 -mx-4 rounded-xl hover:bg-pf-hover transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2"
              >
                <time
                  dateTime={post.publishedAt || post.createdAt}
                  className="text-xs font-medium uppercase tracking-wider text-pf-text-subtle pt-1 min-w-[3rem]"
                >
                  {year}
                </time>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-pf-text-heading group-hover:text-pf-accent transition-colors duration-200 inline-flex items-center gap-1.5">
                    {post.title}
                    <ArrowUpRight
                      className="w-4 h-4 text-pf-text-muted group-hover:text-pf-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </h3>

                  {post.meta?.description && (
                    <p className="mt-1 text-sm text-pf-text-muted line-clamp-2">
                      {post.meta.description}
                    </p>
                  )}
                </div>

                {getMediaUrl(heroImage) && (
                  <div className="hidden sm:block relative w-16 h-10 rounded overflow-hidden bg-pf-card-bg flex-shrink-0">
                    <Image
                      src={getMediaUrl(heroImage)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </a>
            </article>
          )
        })}
      </div>

      <a
        href="/posts"
        className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-pf-text-heading hover:text-pf-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2 rounded group"
      >
        View All Articles
        <ArrowUpRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    </section>
  )
}

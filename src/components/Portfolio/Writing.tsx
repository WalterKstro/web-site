import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Post, Media } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'

interface WritingSectionProps {
  posts: Post[]
}

export const WritingSection: React.FC<WritingSectionProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.publishedAt || b.createdAt || 0).getTime() - new Date(a.publishedAt || a.createdAt || 0).getTime()
  })

  const displayPosts = sortedPosts.slice(0, 4)

  return (
    <section
      id="writing"
      className="mb-24 scroll-mt-24"
      aria-labelledby="writing-heading"
    >
      <h2
        id="writing-heading"
        className="text-sm font-bold uppercase tracking-widest text-slate-100 mb-8 lg:hidden"
      >
        Writing
      </h2>

      <div className="space-y-6">
        {displayPosts.map((post) => {
          const heroImage = post.heroImage as Media | undefined
          const year = post.publishedAt
            ? formatDateTime({ date: post.publishedAt, format: 'year' })
            : formatDateTime({ date: post.createdAt, format: 'year' })

          return (
            <article
              key={post.id}
              className="group"
            >
              <a
                href={`/posts/${post.slug}`}
                className="flex items-start gap-4 p-4 -mx-4 rounded-xl hover:bg-slate-800/30 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:outline-offset-2"
              >
                {/* Year */}
                <time
                  dateTime={post.publishedAt || post.createdAt}
                  className="text-xs font-medium uppercase tracking-wider text-slate-500 pt-1 min-w-[3rem]"
                >
                  {year}
                </time>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-slate-100 group-hover:text-teal-300 transition-colors duration-200 inline-flex items-center gap-1.5">
                    {post.title}
                    <ArrowUpRight
                      className="w-4 h-4 text-slate-400 group-hover:text-teal-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </h3>

                  {post.meta?.description && (
                    <p className="mt-1 text-sm text-slate-400 line-clamp-2">
                      {post.meta.description}
                    </p>
                  )}
                </div>

                {/* Thumbnail */}
                {heroImage?.url && (
                  <div className="hidden sm:block relative w-16 h-10 rounded overflow-hidden bg-slate-800 flex-shrink-0">
                    <Image
                      src={heroImage.url}
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
        className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-slate-100 hover:text-teal-300 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:outline-offset-2 rounded group"
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

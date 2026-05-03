import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { PortfolioExperienceBlock as PortfolioExperienceBlockProps, Experience } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'

export const PortfolioExperienceBlock: React.FC<PortfolioExperienceBlockProps> = async (props) => {
  const { heading, sectionId, limit } = props

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'experiences',
    limit: limit || 100,
    pagination: false,
    overrideAccess: false,
  })

  const experiences = (result.docs || []) as Experience[]

  if (!experiences.length) return null

  const sortedExperiences = [...experiences].sort((a, b) => {
    const orderDiff = (b.order || 0) - (a.order || 0)
    if (orderDiff !== 0) return orderDiff
    return new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime()
  })

  return (
    <section
      id={sectionId || 'experience'}
      className="mb-24 scroll-mt-24"
      aria-labelledby={`${sectionId}-heading`}
    >
      <h2
        id={`${sectionId}-heading`}
        className="text-sm font-bold uppercase tracking-widest text-pf-text-heading mb-8 lg:hidden"
      >
        {heading || 'Experience'}
      </h2>

      <div className="space-y-12">
        {sortedExperiences.map((exp) => {
          const startDate = exp.startDate
            ? formatDateTime({ date: exp.startDate, format: 'monthYear' })
            : ''
          const endDate = exp.current
            ? 'Present'
            : exp.endDate
              ? formatDateTime({ date: exp.endDate, format: 'monthYear' })
              : ''

          return (
            <article
              key={exp.id}
              className="group relative grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8"
            >
              <div className="text-xs font-medium uppercase tracking-wider text-pf-text-subtle md:pt-1">
                {startDate} — {endDate}
              </div>
              <div className="space-y-3">
                <h3 className="text-base font-medium text-pf-text-heading">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 group/link hover:text-pf-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2 rounded"
                    >
                      {exp.title} · {exp.company}
                      <ArrowUpRight
                        className="w-4 h-4 text-pf-text-muted group-hover/link:text-pf-accent transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  ) : (
                    <>
                      {exp.title} · {exp.company}
                    </>
                  )}
                </h3>
                {exp.location && (
                  <p className="text-sm text-pf-text-subtle">{exp.location}</p>
                )}
                {exp.description && (
                  <div className="text-sm text-pf-text-muted leading-relaxed">
                    <RichTextRenderer content={exp.description} />
                  </div>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <ul
                    className="flex flex-wrap gap-2 pt-2"
                    aria-label={`Technologies used at ${exp.company}`}
                  >
                    {exp.technologies.map((tech, i) => (
                      <li
                        key={i}
                        className="px-3 py-1 text-xs font-medium text-pf-accent bg-pf-accent-bg rounded-full"
                      >
                        {tech.technology}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function RichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root) return null

  const renderNode = (node: any): React.ReactNode => {
    if (node.type === 'text') {
      let className = ''
      if (node.format & 1) className += 'font-bold '
      if (node.format & 2) className += 'italic '
      return (
        <span className={className}>
          {node.text}
        </span>
      )
    }

    if (node.type === 'paragraph') {
      return (
        <p className="mb-3 last:mb-0">
          {node.children?.map((child: any, i: number) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))}
        </p>
      )
    }

    if (node.type === 'link') {
      return (
        <a
          href={node.fields?.url || '#'}
          target={node.fields?.newTab ? '_blank' : undefined}
          rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
          className="text-pf-text hover:text-pf-accent transition-colors duration-200 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2 rounded"
        >
          {node.children?.map((child: any, i: number) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))}
        </a>
      )
    }

    if (node.children) {
      return node.children.map((child: any, i: number) => (
        <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
      ))
    }

    return null
  }

  return (
    <>
      {content.root.children?.map((child: any, i: number) => (
        <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
      ))}
    </>
  )
}

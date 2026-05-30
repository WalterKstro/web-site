import React from 'react'
import Image from 'next/image'
import { ArrowUpRight, Star } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { PortfolioProjectsBlock as PortfolioProjectsBlockProps, Project, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const PortfolioProjectsBlock: React.FC<PortfolioProjectsBlockProps> = async (props) => {
  const { heading, sectionId, limit, featuredOnly } = props

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    limit: limit || 6,
    pagination: false,
    overrideAccess: false,
  })

  const projects = (result.docs || []) as Project[]

  if (!projects.length) return null

  const sortedProjects = [...projects].sort((a, b) => {
    const orderDiff = (a.order || 0) - (b.order || 0)
    if (orderDiff !== 0) return orderDiff
    return 0
  })

  const displayProjects = featuredOnly
    ? sortedProjects.filter((p) => p.featured)
    : sortedProjects

  return (
    <section
      id={sectionId || 'projects'}
      className="mb-24 scroll-mt-24"
      aria-labelledby={`${sectionId}-heading`}
    >
      <h2
        id={`${sectionId}-heading`}
        className="text-sm font-bold uppercase tracking-widest text-pf-text-heading mb-8 lg:hidden"
      >
        {heading || 'Proyectos'}
      </h2>

      <div className="space-y-12">
        {displayProjects.map((project) => {
          const image = project.image as Media | undefined

          return (
            <article
              key={project.id}
              className="group relative grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 sm:gap-6 p-4 -mx-4 rounded-xl hover:bg-pf-hover transition-colors duration-200"
            >
              {getMediaUrl(image) && (
                <div className="relative aspect-[4/3] sm:aspect-square rounded-lg overflow-hidden bg-pf-card-bg">
                  <Image
                    src={getMediaUrl(image)}
                    alt={`Captura de pantalla de ${project.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 140px"
                  />
                </div>
              )}

              <div className={`space-y-2 ${!getMediaUrl(image) ? 'sm:col-span-full' : ''}`}>
                <h3 className="text-base font-medium text-pf-text-heading">
                  {project.projectUrl ? (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 group/link hover:text-pf-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2 rounded"
                    >
                      {project.title}
                      <ArrowUpRight
                        className="w-4 h-4 text-pf-text-muted group-hover/link:text-pf-accent transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">(abre en nueva pestaña)</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>

                {project.description && (
                  <div className="text-sm text-pf-text-muted leading-relaxed line-clamp-3">
                    <RichTextRenderer content={project.description} />
                  </div>
                )}

                {project.stats?.value && (
                  <div className="flex items-center gap-1.5 text-sm text-pf-text">
                    <Star className="w-3.5 h-3.5 text-pf-accent" aria-hidden="true" />
                    <span>{project.stats.value}</span>
                    {project.stats.label && (
                      <span className="text-pf-text-subtle">{project.stats.label}</span>
                    )}
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <ul
                    className="flex flex-wrap gap-2 pt-2"
                    aria-label={`Tecnologías usadas en ${project.title}`}
                  >
                    {project.technologies.map((tech, i) => (
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

      <a
        href="/proyectos"
        className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-pf-text-heading hover:text-pf-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2 rounded group"
      >
        Ver archivo completo de proyectos
        <ArrowUpRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    </section>
  )
}

function RichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root) return null

  const renderNode = (node: any): React.ReactNode => {
    if (node.type === 'text') {
      return <span>{node.text}</span>
    }

    if (node.type === 'paragraph') {
      return (
        <span>
          {node.children?.map((child: any, i: number) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))}
        </span>
      )
    }

    if (node.type === 'link') {
      return (
        <a
          href={node.fields?.url || '#'}
          target={node.fields?.newTab ? '_blank' : undefined}
          rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
          className="text-pf-text hover:text-pf-accent transition-colors duration-200"
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

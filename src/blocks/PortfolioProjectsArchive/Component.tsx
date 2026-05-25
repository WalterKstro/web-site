import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Project } from '@/payload-types'

// Temporary type alias until payload-types are regenerated
interface PortfolioProjectsArchiveBlockProps {
  heading?: string | null
  sectionId?: string | null
  id?: string | null
  blockName?: string | null
  blockType: 'portfolioProjectsArchive'
}

export const PortfolioProjectsArchiveBlock: React.FC<
  PortfolioProjectsArchiveBlockProps
> = async (props) => {
  const { heading, sectionId } = props

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    limit: 1000,
    pagination: false,
    overrideAccess: false,
  })

  const projects = (result.docs || []) as Project[]

  if (!projects.length) {
    return (
      <section id={sectionId || 'proyectos'} className="py-16" aria-labelledby={`${sectionId || 'proyectos'}-heading`}>
        <h2
          id={`${sectionId || 'proyectos'}-heading`}
          className="text-3xl font-bold text-pf-text-heading mb-12"
        >
          {heading || 'Proyectos'}
        </h2>
        <p className="text-center text-pf-text-muted">
          No hay proyectos disponibles.
        </p>
      </section>
    )
  }

  const sortedProjects = [...projects].sort((a, b) => {
    return (a.order || 0) - (b.order || 0)
  })

  return (
    <section
      id={sectionId || 'proyectos'}
      className="py-16"
      aria-labelledby={`${sectionId || 'proyectos'}-heading`}
    >
      <h2
        id={`${sectionId || 'proyectos'}-heading`}
        className="text-3xl font-bold text-pf-text-heading mb-12"
      >
        {heading || 'Proyectos'}
      </h2>

      {/* Desktop Table Header */}
      <div className="hidden md:grid md:grid-cols-[2fr_2fr_1fr] gap-4 pb-3 border-b border-pf-line mb-2">
        <span className="text-sm font-semibold text-pf-text-heading uppercase tracking-wider">
          Proyecto
        </span>
        <span className="text-sm font-semibold text-pf-text-heading uppercase tracking-wider">
          Tecnologías
        </span>
        <span className="text-sm font-semibold text-pf-text-heading uppercase tracking-wider text-right">
          Enlace
        </span>
      </div>

      <div className="divide-y divide-pf-line">
        {sortedProjects.map((project) => {
          const hasLink = project.projectUrl || project.githubUrl
          const linkUrl = project.projectUrl || project.githubUrl

          return (
            <article
              key={project.id}
              className="group py-6 md:grid md:grid-cols-[2fr_2fr_1fr] md:gap-4 md:items-start hover:bg-pf-hover transition-colors duration-200 rounded-lg px-2 -mx-2"
            >
              {/* Project Info */}
              <div className="mb-2 md:mb-0">
                <h3 className="text-base font-medium text-pf-text-heading">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-sm text-pf-text-muted mt-1 line-clamp-2">
                    {extractPlainText(project.description, 120)}
                  </p>
                )}
              </div>

              {/* Technologies */}
              <div className="mb-3 md:mb-0">
                {project.technologies && project.technologies.length > 0 ? (
                  <ul
                    className="flex flex-wrap gap-2"
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
                ) : (
                  <span className="text-sm text-pf-text-subtle">—</span>
                )}
              </div>

              {/* Link */}
              <div className="md:text-right">
                {hasLink ? (
                  <a
                    href={linkUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-pf-text-muted hover:text-pf-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2 rounded group/link"
                  >
                    <span className="truncate max-w-[120px] md:max-w-[150px]">
                      {safeGetHostname(linkUrl)}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(abre en nueva pestaña)</span>
                  </a>
                ) : (
                  <span className="text-sm text-pf-text-subtle">—</span>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/**
 * Safely extract hostname from a URL string.
 * Returns the original string if parsing fails.
 */
function safeGetHostname(url: string | null | undefined): string {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/**
 * Extract plain text from Lexical rich text content.
 * Recursively traverses nodes and concatenates text values.
 */
function extractPlainText(content: any, maxLength: number = 120): string {
  if (!content || !content.root) return ''

  let text = ''

  const traverse = (node: any): void => {
    if (text.length >= maxLength) return

    if (node.type === 'text' && typeof node.text === 'string') {
      text += node.text
      return
    }

    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        traverse(child)
        if (text.length >= maxLength) break
      }
    }
  }

  if (content.root.children && Array.isArray(content.root.children)) {
    for (let i = 0; i < content.root.children.length; i++) {
      traverse(content.root.children[i])
      if (text.length >= maxLength) break
      // Add space between block-level siblings, but not after the last one
      if (i < content.root.children.length - 1 && text.length > 0) {
        text += ' '
      }
    }
  }

  // Truncate and add ellipsis if needed
  if (text.length > maxLength) {
    text = text.slice(0, maxLength).trim() + '…'
  }

  return text
}

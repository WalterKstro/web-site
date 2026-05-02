import React from 'react'
import Image from 'next/image'
import { ArrowUpRight, Star } from 'lucide-react'
import type { Project, Media } from '@/payload-types'

interface ProjectsSectionProps {
  projects: Project[]
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null

  const sortedProjects = [...projects].sort((a, b) => {
    const orderDiff = (a.order || 0) - (b.order || 0)
    if (orderDiff !== 0) return orderDiff
    return 0
  })

  const featuredProjects = sortedProjects.filter((p) => p.featured)
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : sortedProjects.slice(0, 6)

  return (
    <section
      id="projects"
      className="mb-24 scroll-mt-24"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="text-sm font-bold uppercase tracking-widest text-slate-100 mb-8 lg:hidden"
      >
        Projects
      </h2>

      <div className="space-y-12">
        {displayProjects.map((project) => {
          const image = project.image as Media | undefined

          return (
            <article
              key={project.id}
              className="group relative grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 sm:gap-6 p-4 -mx-4 rounded-xl hover:bg-slate-800/30 transition-colors duration-200"
            >
              {/* Image */}
              {image?.url && (
                <div className="relative aspect-[4/3] sm:aspect-square rounded-lg overflow-hidden bg-slate-800">
                  <Image
                    src={image.url}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 140px"
                  />
                </div>
              )}

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-base font-medium text-slate-100">
                  {project.projectUrl ? (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 group/link hover:text-teal-300 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:outline-offset-2 rounded"
                    >
                      {project.title}
                      <ArrowUpRight
                        className="w-4 h-4 text-slate-400 group-hover/link:text-teal-300 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>

                {project.description && (
                  <div className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    <RichTextRenderer content={project.description} />
                  </div>
                )}

                {project.stats?.value && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-300">
                    <Star className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
                    <span>{project.stats.value}</span>
                    {project.stats.label && (
                      <span className="text-slate-500">{project.stats.label}</span>
                    )}
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <ul
                    className="flex flex-wrap gap-2 pt-2"
                    aria-label={`Technologies used in ${project.title}`}
                  >
                    {project.technologies.map((tech, i) => (
                      <li
                        key={i}
                        className="px-3 py-1 text-xs font-medium text-teal-300 bg-teal-400/10 rounded-full"
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
        href="/projects"
        className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-slate-100 hover:text-teal-300 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:outline-offset-2 rounded group"
      >
        View Full Project Archive
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
          className="text-slate-200 hover:text-teal-300 transition-colors duration-200"
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

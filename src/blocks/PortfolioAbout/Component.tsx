import React from 'react'
import RichText from '@/components/RichText'
import type { PortfolioAboutBlock as PortfolioAboutBlockProps } from '@/payload-types'

export const PortfolioAboutBlock: React.FC<PortfolioAboutBlockProps> = (props) => {
  const { heading, sectionId, content } = props

  if (!content) return null

  return (
    <section
      id={sectionId || 'about'}
      className="mb-24 scroll-mt-24"
      aria-labelledby={`${sectionId}-heading`}
    >
      <h2 id={`${sectionId}-heading`} className="sr-only">
        {heading || 'About'}
      </h2>
      <div className="text-pf-text-muted leading-relaxed text-base">
        <RichText data={content} enableGutter={false} />
      </div>
    </section>
  )
}

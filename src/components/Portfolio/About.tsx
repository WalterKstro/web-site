import React from 'react'
import RichText from '@/components/RichText'
import type { Portfolio as PortfolioType } from '@/payload-types'

interface AboutSectionProps {
  about: PortfolioType['about']
  sectionId?: string
  heading?: string
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about, sectionId = 'about', heading = 'About' }) => {
  if (!about) return null

  return (
    <section
      id={sectionId}
      className="mb-24 scroll-mt-24"
      aria-labelledby={`${sectionId}-heading`}
    >
      <h2 id={`${sectionId}-heading`} className="sr-only">
        {heading}
      </h2>
      <div className="text-pf-text-muted leading-relaxed text-base">
        <RichText data={about} enableGutter={false} />
      </div>
    </section>
  )
}

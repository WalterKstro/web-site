import React from 'react'
import RichText from '@/components/RichText'
import type { Portfolio as PortfolioType } from '@/payload-types'

interface AboutSectionProps {
  about: PortfolioType['about']
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  if (!about) return null

  return (
    <section
      id="about"
      className="mb-24 scroll-mt-24"
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading" className="sr-only">
        About
      </h2>
      <div className="text-slate-400 leading-relaxed text-base">
        <RichText data={about} enableGutter={false} />
      </div>
    </section>
  )
}

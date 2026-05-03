import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { PortfolioFooterBlock as PortfolioFooterBlockProps } from '@/payload-types'

export const PortfolioFooterBlock: React.FC<PortfolioFooterBlockProps> = async (props) => {
  const { customText } = props

  const payload = await getPayload({ config: configPromise })
  const portfolio = await payload.findGlobal({
    slug: 'sidebar',
    depth: 0,
  })

  const name = portfolio?.name || 'yours truly'

  return (
    <footer className="mt-24 text-sm text-pf-text-subtle leading-relaxed max-w-md">
      {customText ? (
        <p>{customText}</p>
      ) : (
        <>
          <p>
            Loosely designed in{' '}
            <span className="text-pf-text">Figma</span> and coded in{' '}
            <span className="text-pf-text">Visual Studio Code</span> by{' '}
            {name}. Built with{' '}
            <span className="text-pf-text">Next.js</span> and{' '}
            <span className="text-pf-text">Tailwind CSS</span>, deployed with{' '}
            <span className="text-pf-text">Vercel</span>.
          </p>
          <p className="mt-4">
            All text is set in the{' '}
            <span className="text-pf-text">Inter</span> typeface.
          </p>
        </>
      )}
    </footer>
  )
}

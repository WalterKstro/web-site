'use client'

import React from 'react'
import Link from 'next/link'
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Dribbble,
  Globe,
  Mail,
  Codepen,
  ExternalLink,
} from 'lucide-react'
import type { Portfolio as PortfolioType } from '@/payload-types'

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  dribbble: Dribbble,
  website: Globe,
  email: Mail,
  codepen: Codepen,
}

interface SocialLinksProps {
  links: PortfolioType['socialLinks']
  className?: string
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links, className }) => {
  if (!links || links.length === 0) return null

  return (
    <ul className={className} aria-label="Social links">
      {links.map((link, index) => {
        const Icon = iconMap[link.platform] || Globe
        const isEmail = link.platform === 'email' || link.url?.startsWith('mailto:')
        const href = isEmail && !link.url?.startsWith('mailto:') ? `mailto:${link.url}` : link.url

        return (
          <li key={index}>
            <a
              href={href || '#'}
              target={isEmail ? undefined : '_blank'}
              rel={isEmail ? undefined : 'noopener noreferrer'}
              aria-label={link.label}
              className="group inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:outline-offset-2"
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">{link.label}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

interface NavigationProps {
  items: PortfolioType['navItems']
  className?: string
}

export const Navigation: React.FC<NavigationProps> = ({ items, className }) => {
  if (!items || items.length === 0) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${sectionId}`)
    }
  }

  return (
    <nav className={className} aria-label="Page sections">
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={`#${item.sectionId}`}
              onClick={(e) => handleClick(e, item.sectionId!)}
              className="group flex items-center gap-4 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:outline-offset-2 rounded"
            >
              <span className="h-px w-8 bg-slate-600 group-hover:w-16 group-hover:bg-teal-300 transition-all duration-300" aria-hidden="true" />
              <span className="uppercase tracking-widest text-xs">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface SidebarProps {
  portfolio: PortfolioType
}

export const Sidebar: React.FC<SidebarProps> = ({ portfolio }) => {
  const { name, title, tagline, socialLinks, navItems, showResumeLink, resumeUrl } = portfolio

  return (
    <header className="flex flex-col justify-between h-full py-12 lg:py-0">
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-3">
          {name}
        </h1>
        <h2 className="text-lg sm:text-xl font-medium text-teal-300 mb-4">
          {title}
        </h2>
        {tagline && (
          <p className="text-slate-400 text-base leading-relaxed max-w-xs">
            {tagline}
          </p>
        )}
      </div>

      {navItems && navItems.length > 0 && (
        <div className="hidden lg:block mt-16">
          <Navigation items={navItems} />
        </div>
      )}

      <div className="mt-auto pt-12 lg:pt-0">
        {socialLinks && socialLinks.length > 0 && (
          <SocialLinks links={socialLinks} className="flex items-center gap-1" />
        )}
        {showResumeLink && resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-slate-400 hover:text-teal-300 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:outline-offset-2 rounded"
          >
            View Full Resume
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </header>
  )
}

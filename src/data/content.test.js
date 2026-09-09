import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { experience } from './experience'
import { navLinks, profile } from './profile'
import { projects } from './projects'
import { logoBriefcase, logoRobot, noLink, privateRepo } from './projectSentinels'
import { certifications, languages, skillCategories } from './skills'
import { darkIcons, deviconUrl, simpleIconUrl, skillIconConfig } from './skillIconConfig'
import { uiCopy } from './uiCopy'

describe('portfolio content', () => {
  it('lists every project with a title, tags, and status', () => {
    expect(projects.map((p) => p.title)).toEqual([
      'Job Tracker',
      'BestJobs Filter Extension',
      'Firehouse Restaurant',
      'Portfolio Website',
      'YNAB Automation Agent',
    ])
    for (const project of projects) {
      expect(project.tags.length).toBeGreaterThan(0)
      expect(project.status).toBe('live')
    }
  })

  it('lists every experience role with a company and period', () => {
    expect(experience.map((job) => job.company)).toEqual([
      'Morningstar Sustainalytics',
      'Deutsche Bank',
      'Mindgeek',
      'Simpology Australia',
    ])
    for (const job of experience) {
      expect(job.role).toBeTruthy()
      expect(job.period).toBeTruthy()
    }
  })

  it('lists skill categories, certifications, and languages', () => {
    expect(skillCategories.map((c) => c.name)).toEqual([
      'Frontend',
      'Backend',
      'Cloud & DevOps',
      'Tooling & AI',
    ])
    expect(certifications.map((c) => c.title)).toContain('AI Agent Development')
    expect(languages.map((l) => l.name)).toEqual([
      'English',
      'Romanian',
      'Arabic',
      'German',
    ])
  })

  it('keeps identity, contact, and nav links in one profile module', () => {
    expect(profile.email).toMatch(/@/)
    expect(profile.linkedinUrl).toMatch(/^https:\/\//)
    expect(profile.phoneHref).toMatch(/^tel:/)
    expect(profile.siteUrl).toBe('https://zakariaahmad.site')
    expect(profile.githubUrl).toMatch(/^https:\/\/github\.com\//)
    expect(navLinks.map((l) => l.href)).toEqual([
      '#about',
      '#projects',
      '#skills',
      '#contact',
    ])
  })

  it('keeps SEO markup aligned with profile site and GitHub URLs', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toContain(`href="${profile.siteUrl}"`)
    expect(html).toContain(`content="${profile.siteUrl}"`)
    expect(html).toContain(`"url": "${profile.siteUrl}"`)
    expect(html).toContain(profile.githubUrl)
    expect(html).toContain(profile.fullName)
    expect(html).toContain(profile.email)
  })

  it('centralizes UI chrome copy and skill icon CDN config', () => {
    expect(uiCopy.hero.viewWork).toBe('View My Work')
    expect(uiCopy.projects.privateRepo).toBe('Private Repo')
    expect(uiCopy.nav.resume).toBe('Resume ↓')
    expect(skillIconConfig.simpleIconsBase).toContain('simple-icons')
    expect(skillIconConfig.deviconBase).toContain('devicon')
    expect(darkIcons.has('github')).toBe(true)
    expect(simpleIconUrl('react')).toContain('/react.svg')
    expect(deviconUrl('react')).toContain('/react/react-original.svg')
  })

  it('uses shared project sentinels instead of magic strings', () => {
    expect(projects.filter((p) => p.repo === privateRepo).map((p) => p.title)).toEqual([
      'Job Tracker',
      'YNAB Automation Agent',
    ])
    expect(projects.find((p) => p.title === 'Firehouse Restaurant').repo).toBe(noLink)
    expect(projects.find((p) => p.title === 'Job Tracker').logo).toBe(logoBriefcase)
    expect(projects.find((p) => p.title === 'YNAB Automation Agent').logo).toBe(logoRobot)
    expect(projects.find((p) => p.self).link).toBe(profile.siteUrl)
    expect(projects.find((p) => p.self).repo).toBe(`${profile.githubUrl}/cv-website`)
  })
})

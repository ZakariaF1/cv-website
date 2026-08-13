import { describe, expect, it } from 'vitest'
import { experience } from './experience'
import { navLinks, profile } from './profile'
import { projects } from './projects'
import { certifications, languages, skillCategories } from './skills'

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
    expect(navLinks.map((l) => l.href)).toEqual([
      '#about',
      '#projects',
      '#skills',
      '#contact',
    ])
  })
})

import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { experience } from '../data/experience'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { prerender } from '../prerender.jsx'

const html = readFileSync('index.html', 'utf8')
const vite = readFileSync('vite.config.js', 'utf8')

describe('prerender findability', () => {
  it('wires vite-prerender-plugin to inject into #root', () => {
    expect(vite).toContain('vitePrerenderPlugin')
    expect(vite).toContain("renderTarget: '#root'")
    expect(vite).toMatch(/prerenderScript:[\s\S]*prerender\.jsx/)
  })

  it('prerenders CV title, employers, and project titles into HTML', async () => {
    const { html: body } = await prerender()
    expect(body).toContain(profile.title)
    expect(body).toContain(profile.bios[0].slice(0, 40))
    expect(body).toContain(experience[0].company)
    expect(body).toContain(projects[0].title)
    expect(body).toContain('Azure AI / Foundry')
  })

  it('keeps JSON-LD description aligned with About positioning', () => {
    expect(html).toContain('Building into applied AI')
    expect(html).toContain('Azure AI Foundry')
    expect(html).toContain('"knowsAbout"')
    expect(html).toContain('RAG')
  })
})

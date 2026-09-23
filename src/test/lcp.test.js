import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { profile } from '../data/profile'

const html = readFileSync('index.html', 'utf8')
const css = readFileSync('src/index.css', 'utf8')
const app = readFileSync('src/App.jsx', 'utf8')
const vite = readFileSync('vite.config.js', 'utf8')

describe('LCP image preload', () => {
  it('preloads the hero photo before the React module runs', () => {
    expect(html).toContain(`href="${profile.photo}"`)
    expect(html).toMatch(
      new RegExp(
        `<link rel="preload" as="image" href="${profile.photo.replace('/', '\\/')}" type="image\\/avif" fetchpriority="high"`,
      ),
    )
  })
})

describe('LCP font and JS critical path', () => {
  it('loads Inter and Space Mono from HTML without a CSS @import', () => {
    expect(css).not.toMatch(/@import\s+url\(['"]https:\/\/fonts\.googleapis/)
    expect(html).toContain('rel="stylesheet"')
    expect(html).toMatch(/fonts\.googleapis\.com\/css2\?family=Inter:wght@400;500;600;700/)
    expect(html).toMatch(/family=Space\+Mono:wght@400;700/)
    expect(html).toContain('display=swap')
    expect(html).not.toMatch(/Inter:wght@[^\s"']*300/)
    expect(html).not.toMatch(/Inter:wght@[^\s"']*800/)
  })

  it('preconnects to Google Fonts before the stylesheet', () => {
    expect(html).toContain('rel="preconnect" href="https://fonts.googleapis.com"')
    expect(html).toContain('rel="preconnect" href="https://fonts.gstatic.com" crossorigin')
    const preconnectEnd = html.indexOf('fonts.gstatic.com')
    const stylesheet = html.indexOf('fonts.googleapis.com/css2')
    expect(preconnectEnd).toBeGreaterThan(-1)
    expect(stylesheet).toBeGreaterThan(-1)
    expect(preconnectEnd).toBeLessThan(stylesheet)
  })

  it('defers Projects, Skills, and Contact behind React.lazy', () => {
    expect(app).toMatch(/lazy\(\s*\(\)\s*=>\s*import\(['"].*\/Projects['"]\)/)
    expect(app).toMatch(/lazy\(\s*\(\)\s*=>\s*import\(['"].*\/Skills['"]\)/)
    expect(app).toMatch(/lazy\(\s*\(\)\s*=>\s*import\(['"].*\/Contact['"]\)/)
    expect(app).toMatch(/<Suspense[\s\S]*<Projects/)
  })

  it('does not modulepreload deferred chunks on first paint', () => {
    expect(vite).toMatch(/modulePreload:\s*false/)
  })
})

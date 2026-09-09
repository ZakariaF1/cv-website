import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { profile } from '../data/profile'

const html = readFileSync('index.html', 'utf8')

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

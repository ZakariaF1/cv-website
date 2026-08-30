import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'))

function headerValue(sourcePattern, headerName) {
  const rule = vercel.headers?.find((entry) => entry.source === sourcePattern)
  return rule?.headers.find((header) => header.key === headerName)?.value
}

describe('Cloudflare CDN origin headers', () => {
  it('caches public photos, videos, and the resume PDF at the edge', () => {
    expect(headerValue('/(.*)\\.(avif|png|webp|svg|webm|pdf)$', 'Cache-Control')).toBe(
      'public, max-age=2592000, stale-while-revalidate=86400',
    )
  })

  it('caches hashed Vite assets as immutable', () => {
    expect(headerValue('/assets/(.*)', 'Cache-Control')).toBe(
      'public, max-age=31536000, immutable',
    )
  })
})

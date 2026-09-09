import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const html = readFileSync('index.html', 'utf8')

describe('Cloudflare Web Analytics', () => {
  it('relies on Automatic injection instead of a manual beacon', () => {
    expect(html).not.toContain('static.cloudflareinsights.com/beacon.min.js')
    expect(html).not.toContain('data-cf-beacon')
    expect(html).not.toContain('3a310353c0fd4e9fbbcf4c1152312b59')
  })
})

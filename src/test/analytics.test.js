import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const html = readFileSync('index.html', 'utf8')

describe('Cloudflare Web Analytics', () => {
  it('installs the RUM beacon with the site token', () => {
    expect(html).toContain('https://static.cloudflareinsights.com/beacon.min.js')
    expect(html).toContain('"token": "3a310353c0fd4e9fbbcf4c1152312b59"')
    expect(html).toMatch(
      /<script type='module' src='https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js' data-cf-beacon='\{"token": "3a310353c0fd4e9fbbcf4c1152312b59"\}'><\/script>/,
    )
  })
})

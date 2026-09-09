import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const runbook = readFileSync('RUNBOOK.md', 'utf8')
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'))

describe('availability runbook', () => {
  it('documents UptimeRobot detect and Vercel rollback recover steps', () => {
    expect(runbook).toContain('UptimeRobot')
    expect(runbook).toContain('https://www.zakariaahmad.site/')
    expect(runbook).toContain('Full (strict)')
    expect(runbook).toContain('Promote to Production')
    expect(runbook).toContain('Health Checks')
  })
})

describe('scalability (edge cache)', () => {
  it('documents purge-after-deploy and spike response using existing CDN headers', () => {
    expect(runbook).toContain('Purge Everything')
    expect(runbook).toContain('Scalability under a traffic spike')
    expect(runbook).toContain('cf-cache-status: HIT')
    expect(runbook).toContain('vercel.json')

    const sources = vercel.headers.map((rule) => rule.source)
    expect(sources).toContain('/assets/(.*)')
    expect(sources).toContain('/:path*.(avif|png|webp|svg|webm|pdf)')
  })
})

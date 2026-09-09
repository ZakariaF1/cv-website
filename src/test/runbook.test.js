import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const runbook = readFileSync('RUNBOOK.md', 'utf8')

describe('availability runbook', () => {
  it('documents UptimeRobot detect and Vercel rollback recover steps', () => {
    expect(runbook).toContain('UptimeRobot')
    expect(runbook).toContain('https://www.zakariaahmad.site/')
    expect(runbook).toContain('Full (strict)')
    expect(runbook).toContain('Promote to Production')
    expect(runbook).toContain('Health Checks')
  })
})

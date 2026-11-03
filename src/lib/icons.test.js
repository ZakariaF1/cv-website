import { describe, expect, it } from 'vitest'
import {
  DEVICON_VERSION,
  MDI_VERSION,
  SIMPLE_ICONS_VERSION,
  STACK_BY_NAME,
  resolveIcon,
} from './icons'

describe('resolveIcon', () => {
  it('pins CDN versions (no @latest)', () => {
    expect(DEVICON_VERSION).toMatch(/^\d+\.\d+\.\d+$/)
    expect(SIMPLE_ICONS_VERSION).toMatch(/^\d+\.\d+\.\d+$/)
    expect(MDI_VERSION).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('resolves skills-style specs and stack tag names', () => {
    const js = resolveIcon({ icon: 'javascript' })
    expect(js.src).toContain(`devicon@${DEVICON_VERSION}`)
    expect(js.src).toContain('/javascript/javascript-original.svg')
    expect(js.invert).toBe(false)

    const claude = resolveIcon({ icon: 'claude', simple: true })
    expect(claude.src).toContain(`simple-icons@${SIMPLE_ICONS_VERSION}`)
    expect(claude.invert).toBe(true)

    const rest = resolveIcon({ icon: 'api', mdi: true })
    expect(rest.src).toContain(`@mdi/svg@${MDI_VERSION}`)
    expect(rest.invert).toBe(true)

    const aws = resolveIcon('AWS SQS')
    expect(aws.src).toContain('amazonwebservices-original-wordmark.svg')
    expect(aws.invert).toBe(true)
    expect(typeof aws.onError).toBe('function')
  })

  it('maps every STACK_BY_NAME entry to a resolver result', () => {
    for (const name of Object.keys(STACK_BY_NAME)) {
      expect(resolveIcon(name), name).not.toBeNull()
    }
  })
})

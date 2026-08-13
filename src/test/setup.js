import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
HTMLMediaElement.prototype.pause = vi.fn()


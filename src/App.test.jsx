import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('assembles the main landmark sections', async () => {
    render(<App />)

    expect(document.getElementById('about')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: /things i've built/i })).toBeInTheDocument()
    expect(document.getElementById('projects')).toBeInTheDocument()
    expect(document.getElementById('skills')).toBeInTheDocument()
    expect(document.getElementById('contact')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument()
  })

  it('defers projects, skills, and contact until after first paint', async () => {
    let runIdle
    vi.stubGlobal('requestIdleCallback', (cb) => {
      runIdle = cb
      return 1
    })
    vi.stubGlobal('cancelIdleCallback', vi.fn())

    render(<App />)

    expect(document.getElementById('about')).toBeInTheDocument()
    expect(document.getElementById('projects')).not.toBeInTheDocument()
    expect(document.getElementById('skills')).not.toBeInTheDocument()
    expect(document.getElementById('contact')).not.toBeInTheDocument()

    runIdle()

    expect(await screen.findByRole('heading', { name: /things i've built/i })).toBeInTheDocument()
    expect(document.getElementById('skills')).toBeInTheDocument()
    expect(document.getElementById('contact')).toBeInTheDocument()
  })
})

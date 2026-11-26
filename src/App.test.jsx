import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('assembles the main landmark sections', () => {
    render(<App />)

    expect(document.getElementById('about')).toBeInTheDocument()
    expect(document.getElementById('projects')).toBeInTheDocument()
    expect(document.getElementById('skills')).toBeInTheDocument()
    expect(document.getElementById('contact')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument()
  })
})

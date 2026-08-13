import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import About from './About'

describe('About', () => {
  it('renders the experience timeline companies and roles', () => {
    render(<About />)

    expect(document.getElementById('about')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /where i've worked/i })).toBeInTheDocument()

    expect(screen.getByText('Morningstar Sustainalytics')).toBeInTheDocument()
    expect(screen.getByText('Deutsche Bank')).toBeInTheDocument()
    expect(screen.getByText('Mindgeek')).toBeInTheDocument()
    expect(screen.getByText('Simpology Australia')).toBeInTheDocument()

    expect(screen.getByText('Backend-Focused Full Stack Developer (Contractor)')).toBeInTheDocument()
    expect(screen.getByText('Senior Frontend (Angular) Developer')).toBeInTheDocument()
  })
})

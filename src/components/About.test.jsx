import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { experience } from '../data/experience'
import About from './About'

describe('About', () => {
  it('renders the experience timeline companies and roles', () => {
    render(<About />)

    expect(document.getElementById('about')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /where i've worked/i })).toBeInTheDocument()

    for (const job of experience) {
      expect(screen.getByText(job.company)).toBeInTheDocument()
      expect(screen.getByText(job.role)).toBeInTheDocument()
    }
  })
})

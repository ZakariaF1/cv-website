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
      const item = screen.getByText(job.company).closest('.timeline-item')
      expect(item).toHaveTextContent(job.period)
      expect(item).toHaveTextContent(job.duration)
      for (const tag of job.stack) {
        expect(item).toHaveTextContent(tag.name)
      }
    }
    expect(screen.getAllByText('Stack').length).toBe(experience.length)
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Projects from './Projects'

describe('Projects', () => {
  it('renders the portfolio section and every current project', () => {
    render(<Projects />)

    expect(document.getElementById('projects')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /things i've built/i })).toBeInTheDocument()

    for (const title of [
      'Job Tracker',
      'BestJobs Filter Extension',
      'Firehouse Restaurant',
      'Portfolio Website',
      'YNAB Automation Agent',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
  })

  it('marks private repos and the live portfolio without fake external links', () => {
    render(<Projects />)

    expect(screen.getAllByText('Private Repo').length).toBeGreaterThan(0)
    expect(screen.getByText("You're here")).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /live site/i }).map((link) => link.getAttribute('href')),
    ).toEqual(expect.arrayContaining(['https://firehousebucharest.com']))
  })

  it('opens the Firehouse lightbox from the preview image', async () => {
    const user = userEvent.setup()
    render(<Projects />)

    const preview = screen.getAllByAltText('Preview')[1]
    await user.click(preview)

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    expect(document.querySelector('.lightbox-title')).toHaveTextContent('Firehouse Restaurant')
  })
})

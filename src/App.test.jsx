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
    expect(document.querySelector('.scroll-top')).toHaveAttribute('aria-label', 'Back to top')
  })

  it('offers a skip link to main content and hides back-to-top from the tab order until scrolled', () => {
    render(<App />)

    const skip = screen.getByRole('link', { name: /skip to content/i })
    expect(skip).toHaveAttribute('href', '#main-content')
    expect(document.getElementById('main-content')).toBeInTheDocument()

    const backToTop = document.querySelector('.scroll-top')
    expect(backToTop).toHaveAttribute('tabindex', '-1')
    expect(backToTop).toHaveAttribute('aria-hidden', 'true')
  })
})

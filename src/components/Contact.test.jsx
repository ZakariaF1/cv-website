import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Contact from './Contact'

describe('Contact', () => {
  it('renders contact channels', () => {
    render(<Contact />)

    expect(document.getElementById('contact')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /zackm\.ahmad@outlook\.com/i })).toHaveAttribute(
      'href',
      'mailto:zackm.ahmad@outlook.com',
    )
    expect(screen.getByRole('link', { name: /linkedin\.com\/in\/syzack/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/syzack',
    )
    expect(screen.getByRole('link', { name: /\+40 732 911 110/i })).toHaveAttribute(
      'href',
      'tel:+40732911110',
    )
  })
})

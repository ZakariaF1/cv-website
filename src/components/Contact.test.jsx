import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from '../data/profile'
import Contact from './Contact'

describe('Contact', () => {
  it('renders contact channels', () => {
    render(<Contact />)

    expect(document.getElementById('contact')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    )
    expect(screen.getByRole('link', { name: profile.linkedinLabel })).toHaveAttribute(
      'href',
      profile.linkedinUrl,
    )
    expect(screen.getByRole('link', { name: profile.phoneLabel })).toHaveAttribute(
      'href',
      profile.phoneHref,
    )
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { navLinks, profile } from '../data/profile'
import Nav from './Nav'

describe('Nav', () => {
  it('renders section links and a resume download', () => {
    render(<Nav />)

    expect(screen.getByRole('link', { name: new RegExp(profile.firstName, 'i') })).toHaveAttribute('href', '#about')
    for (const link of navLinks) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href)
    }

    const resume = screen.getByRole('link', { name: /resume/i })
    expect(resume).toHaveAttribute('href', profile.resume)
    expect(resume).toHaveAttribute('download')
  })

  it('toggles the mobile menu from the burger button', async () => {
    const user = userEvent.setup()
    const { container } = render(<Nav />)
    const links = container.querySelector('.nav-links')

    expect(links).not.toHaveClass('open')

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }))
    expect(links).toHaveClass('open')

    await user.click(screen.getByRole('link', { name: navLinks[0].label }))
    expect(links).not.toHaveClass('open')
  })
})

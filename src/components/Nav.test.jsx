import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Nav from './Nav'

describe('Nav', () => {
  it('renders section links and a resume download', () => {
    render(<Nav />)

    expect(screen.getByRole('link', { name: /zakaria/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: 'Personal Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')

    const resume = screen.getByRole('link', { name: /resume/i })
    expect(resume).toHaveAttribute('href', '/ZakariaAhmadResume.pdf')
    expect(resume).toHaveAttribute('download')
  })

  it('toggles the mobile menu from the burger button', async () => {
    const user = userEvent.setup()
    const { container } = render(<Nav />)
    const links = container.querySelector('.nav-links')

    expect(links).not.toHaveClass('open')

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }))
    expect(links).toHaveClass('open')

    await user.click(screen.getByRole('link', { name: 'About' }))
    expect(links).not.toHaveClass('open')
  })
})

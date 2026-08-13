import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import Hero from './Hero'

describe('Hero', () => {
  it('renders identity, availability, and primary actions', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { name: /zakaria/i })).toBeInTheDocument()
    expect(screen.getByText('Available for work')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Zakaria Ahmad' })).toHaveAttribute(
      'src',
      '/personal-photo.avif',
    )
    expect(screen.getByRole('link', { name: 'View My Work' })).toHaveAttribute('href', '#projects')
    expect(screen.getByText(String(experience.length))).toBeInTheDocument()
    expect(screen.getByText(String(projects.length))).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { experience } from '../data/experience'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import Hero from './Hero'

describe('Hero', () => {
  it('renders identity, availability, and primary actions', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { name: new RegExp(profile.firstName, 'i') })).toBeInTheDocument()
    expect(screen.getByText(profile.availabilityBadge)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: profile.fullName })).toHaveAttribute(
      'src',
      profile.photo,
    )
    expect(screen.getByRole('link', { name: 'View My Work' })).toHaveAttribute('href', '#projects')
    expect(screen.getByText(profile.yearsLabel)).toBeInTheDocument()
    expect(screen.getByText(String(experience.length))).toBeInTheDocument()
    expect(screen.getByText(String(projects.length))).toBeInTheDocument()
  })
})

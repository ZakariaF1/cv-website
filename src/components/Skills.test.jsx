import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { certifications, languages, skillCategories } from '../data/skills'
import Skills from './Skills'

describe('Skills', () => {
  it('renders stack categories, certifications, and languages', () => {
    render(<Skills />)

    expect(document.getElementById('skills')).toBeInTheDocument()
    for (const category of skillCategories) {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    }

    expect(screen.getByRole('heading', { name: /shared skills i use everywhere/i })).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()

    for (const cert of certifications) {
      expect(screen.getByText(cert.title)).toBeInTheDocument()
    }
    for (const language of languages) {
      expect(screen.getByText(language.name)).toBeInTheDocument()
    }
  })
})

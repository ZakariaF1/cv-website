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

    expect(screen.getByText('Angular')).toBeInTheDocument()
    expect(screen.getByText('C# / .NET')).toBeInTheDocument()
    expect(screen.getByText('Azure')).toBeInTheDocument()
    expect(screen.getByText('RAG')).toBeInTheDocument()

    for (const cert of certifications) {
      expect(screen.getByText(cert.title)).toBeInTheDocument()
    }
    for (const language of languages) {
      expect(screen.getByText(language.name)).toBeInTheDocument()
    }
  })
})

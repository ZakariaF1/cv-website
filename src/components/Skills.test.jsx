import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Skills from './Skills'

describe('Skills', () => {
  it('renders stack categories, certifications, and languages', () => {
    render(<Skills />)

    expect(document.getElementById('skills')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument()
    expect(screen.getByText('Tooling & AI')).toBeInTheDocument()

    expect(screen.getByText('Angular')).toBeInTheDocument()
    expect(screen.getByText('C# / .NET')).toBeInTheDocument()
    expect(screen.getByText('Azure')).toBeInTheDocument()
    expect(screen.getByText('RAG')).toBeInTheDocument()

    expect(screen.getByText('AI Agent Development')).toBeInTheDocument()
    expect(screen.getByText('Microsoft Azure Fundamentals AZ-900')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Romanian')).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Lightbox from './Lightbox'

const project = {
  title: 'Firehouse Restaurant',
  video: '/firehouse-presentation.webm',
  screenshots: ['/firehouse-screenshot1.avif', '/firehouse-screenshot2.avif'],
}

describe('Lightbox', () => {
  it('shows the project title and starts on the requested media item', () => {
    const { container } = render(<Lightbox project={project} startIndex={1} onClose={vi.fn()} />)

    expect(screen.getByText('Firehouse Restaurant')).toBeInTheDocument()
    expect(container.ownerDocument.querySelector('.lightbox-img')).toHaveAttribute(
      'src',
      '/firehouse-screenshot1.avif',
    )
  })

  it('moves to the next and previous items', async () => {
    const user = userEvent.setup()
    const { container } = render(<Lightbox project={project} startIndex={1} onClose={vi.fn()} />)
    const media = () => container.ownerDocument.querySelector('.lightbox-img, .lightbox-video')

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(media()).toHaveAttribute('src', '/firehouse-screenshot2.avif')

    await user.click(screen.getByRole('button', { name: 'Previous' }))
    expect(media()).toHaveAttribute('src', '/firehouse-screenshot1.avif')
  })

  it('closes from the close button and from Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Lightbox project={project} startIndex={0} onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup()
    const { container } = render(<Lightbox project={project} startIndex={1} onClose={vi.fn()} />)
    const media = () => container.ownerDocument.querySelector('.lightbox-img, .lightbox-video')

    await user.keyboard('{ArrowRight}')
    expect(media()).toHaveAttribute('src', '/firehouse-screenshot2.avif')

    await user.keyboard('{ArrowLeft}')
    expect(media()).toHaveAttribute('src', '/firehouse-screenshot1.avif')
  })

  it('plays the demo when navigating onto a video item', async () => {
    const user = userEvent.setup()
    HTMLMediaElement.prototype.play.mockClear()
    render(<Lightbox project={project} startIndex={1} onClose={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Previous' }))

    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled()
  })

  it('renders nothing when the project has no media', () => {
    render(<Lightbox project={{ title: 'Empty' }} startIndex={0} onClose={vi.fn()} />)
    expect(document.querySelector('.lightbox')).not.toBeInTheDocument()
  })

  it('hides prev/next controls when there is only one media item', () => {
    render(
      <Lightbox
        project={{ title: 'Solo', screenshots: ['/only.avif'] }}
        startIndex={0}
        onClose={vi.fn()}
      />,
    )

    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument()
  })
})

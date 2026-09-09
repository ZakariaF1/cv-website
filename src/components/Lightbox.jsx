import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { buildMediaItems } from './projectMedia'

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])'

export default function Lightbox({ project, startIndex, onClose }) {
  const items = useMemo(() => buildMediaItems(project), [project])
  const [index, setIndex] = useState(startIndex)
  const videoRef = useRef(null)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const previouslyFocused = useRef(null)
  const current = items[index]
  const count = items.length
  const titleId = 'lightbox-title'

  const prev = useCallback(() => {
    if (!count) return
    setIndex(i => (i - 1 + count) % count)
  }, [count])
  const next = useCallback(() => {
    if (!count) return
    setIndex(i => (i + 1) % count)
  }, [count])

  useEffect(() => {
    previouslyFocused.current = document.activeElement
    closeRef.current?.focus()
    return () => {
      const el = previouslyFocused.current
      if (el && typeof el.focus === 'function') el.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter(
          (node) => !node.hasAttribute('disabled') && node.getAttribute('aria-hidden') !== 'true',
        )
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  useEffect(() => {
    if (current?.type === 'video') videoRef.current?.play()
  }, [current])

  const touchStartX = useRef(null)

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  if (!current) return null

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      ref={dialogRef}
      onClick={onClose}
    >
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>

        <div className="lightbox-header">
          <span id={titleId} className="lightbox-title">{project.title}</span>
          <button ref={closeRef} className="lightbox-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="lightbox-media" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {current.type === 'video' ? (
            <video ref={videoRef} src={current.src} loop playsInline autoPlay controls className="lightbox-video" />
          ) : (
            <img src={current.src} alt="" className="lightbox-img" />
          )}

          {items.length > 1 && (
            <>
              <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {items.length > 1 && (
          <div className="lightbox-dots">
            {items.map((item, i) => (
              <button
                key={i}
                className={`lightbox-dot${i === index ? ' active' : ''}${item.type === 'video' ? ' dot-video' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={item.type === 'video' ? 'Demo video' : `Screenshot ${i}`}
              >
                {item.type === 'video' && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>,
    document.body
  )
}

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { buildMediaItems } from './projectUtils'

export default function Lightbox({ project, startIndex, onClose }) {
  const items = useMemo(() => buildMediaItems(project), [project])
  const [index, setIndex] = useState(startIndex)
  const videoRef = useRef(null)
  const current = items[index]
  const count = items.length

  const prev = useCallback(() => {
    if (!count) return
    setIndex(i => (i - 1 + count) % count)
  }, [count])
  const next = useCallback(() => {
    if (!count) return
    setIndex(i => (i + 1) % count)
  }, [count])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
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
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>

        <div className="lightbox-header">
          <span className="lightbox-title">{project.title}</span>
          <button className="lightbox-close" onClick={onClose} aria-label="Close">
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

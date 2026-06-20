import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './Projects.css'

const projects = [
  {
    title: 'BestJobs Filter Extension',
    latest: true,
    desc: 'Browser extension for bestjobs.eu that lets you hide unwanted job listings by keyword, company name, or manually. All filtering runs locally — no data leaves your device.',
    tags: ['JavaScript', 'Browser Extension', 'Chrome', 'HTML/CSS'],
    link: 'https://chromewebstore.google.com/detail/bestjobs-filter/mddnacgggjghjjocidnedhbcnbdhkojk',
    repo: 'https://github.com/ZakariaF1/bestjobs-filter',
    year: '2026',
    status: 'live',
    logo: '/bestJobs-Icon-48.png',
    video: '/best-jobs-presentation.webm',
    screenshots: [
      '/best-jobs-screenshot1.avif',
      '/best-jobs-screenshot2.avif',
      '/best-jobs-screenshot3.avif',
    ],
  },
  {
    title: 'YNAB Automation Agent',
    desc: 'TypeScript automation suite for personal budget management. Scrapes ING HomeBanking via Playwright, transforms and deduplicates transactions, imports into YNAB, and auto-flags/approves using 200+ payee rules. Includes an LLM-based flag agent (OpenAI + Phoenix tracing) and a daily email reminder system via GitHub Actions, Vercel, and Resend.',
    tags: ['TypeScript', 'Playwright', 'OpenAI', 'YNAB API', 'GitHub Actions', 'Vercel'],
    link: '#',
    repo: '#',
    year: '2026',
    status: 'live',
    logo: 'robot',
  },
  {
    title: 'Firehouse Restaurant',
    desc: 'Full Angular SSR website for a real burger restaurant in Bucharest. Features a menu browser, table reservations, photo gallery, and customer reviews. Includes AI-powered menu search — users describe what they feel like eating in natural language and OpenAI suggests matching dishes.',
    tags: ['Angular', 'TypeScript', 'SSR', 'SCSS', 'OpenAI API'],
    link: 'https://firehousebucharest.com',
    repo: '#',
    year: '2025',
    status: 'live',
    logo: '/fire-house-logo-square.png',
    video: '/firehouse-presentation.webm',
    screenshots: [
      '/firehouse-screenshot1.avif',
      '/firehouse-screenshot2.avif',
    ],
  },
]

function RobotIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M12 2a2 2 0 0 1 2 2v1H10V4a2 2 0 0 1 2-2z" />
      <line x1="12" y1="5" x2="12" y2="11" />
      <circle cx="8.5" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <path d="M9 20h6" />
      <line x1="3" y1="15" x2="1" y2="15" />
      <line x1="21" y1="15" x2="23" y2="15" />
    </svg>
  )
}

function Lightbox({ project, startIndex, onClose }) {
  const items = [
    ...(project.video ? [{ type: 'video', src: project.video }] : []),
    ...(project.screenshots || []).map(src => ({ type: 'img', src })),
  ]
  const [index, setIndex] = useState(startIndex)
  const videoRef = useRef(null)

  const prev = useCallback(() => setIndex(i => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setIndex(i => (i + 1) % items.length), [items.length])

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
    if (items[index].type === 'video') {
      videoRef.current?.play()
    }
  }, [index])

  const current = items[index]
  const touchStartX = useRef(null)

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

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

        <div
          className="lightbox-media"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
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

function CardMedia({ project, lightboxIndex, setLightboxIndex }) {
  const { video, screenshots } = project
  if (!video && !screenshots?.length) return null

  const totalCount = (screenshots?.length || 0) + (video ? 1 : 0)
  const previewSrc = screenshots?.[0]

  return (
    <>
      <div className="card-hero" onClick={() => setLightboxIndex(previewSrc ? (video ? 1 : 0) : 0)}>
        {previewSrc && (
          <img src={previewSrc} alt="Preview" className="card-hero-img" loading="lazy" />
        )}
        <div className="card-hero-overlay" />
        {video && (
          <button
            className="card-hero-play"
            onClick={e => { e.stopPropagation(); setLightboxIndex(0) }}
            aria-label="Play demo"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Demo
          </button>
        )}
        {totalCount > 1 && (
          <span className="card-hero-count">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
            {totalCount}
          </span>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          project={project}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <p className="section-label">Portfolio</p>
      <h2 className="section-title">Things I've <span>built</span></h2>

      <div className="projects-featured">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project: p }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div className={`project-card big${p.latest ? ' has-banner' : ''}`}>
      <div className="card-glow" />
      {p.latest && <div className="card-latest">Just Shipped</div>}
      <CardMedia project={p} lightboxIndex={lightboxIndex} setLightboxIndex={setLightboxIndex} />
      <div className="card-top">
        <div className="card-icon card-icon-logo">
          {p.logo === 'robot'
            ? <RobotIcon />
            : <img src={p.logo} alt={p.title} className="card-logo-img" />
          }
        </div>
        <div className="card-badges">
          <span className={`card-status ${p.status}`}>⬤ Live · {p.year}</span>
        </div>
      </div>

      <h3 className="card-title">{p.title}</h3>
      <p className="card-desc">{p.desc}</p>

      <div className="card-tags">
        {p.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {(p.repo !== '#' || p.link !== '#' || p.video) && (
        <div className="card-links">
          {p.link !== '#' && (
            <a href={p.link} target="_blank" rel="noopener" className="card-link-btn card-link-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              Live Site
            </a>
          )}
          {p.repo !== '#' && (
            <a href={p.repo} target="_blank" rel="noopener" className="card-link-btn card-link-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              Source Code
            </a>
          )}
        </div>
      )}
    </div>
  )
}

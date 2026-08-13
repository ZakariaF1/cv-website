import { useState } from 'react'
import Lightbox from './Lightbox'
import { buildMediaItems } from './projectUtils'
import { projects } from '../data/projects'
import './Projects.css'

function ProjectLogo({ logo, title }) {
  if (logo === 'robot') {
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
  if (logo === 'briefcase') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12.01" />
        <path d="M2 12h20" />
      </svg>
    )
  }
  return <img src={logo} alt={title} className="card-logo-img" />
}

function CardMedia({ project, lightboxIndex, setLightboxIndex }) {
  const { video, screenshots } = project

  if (!video && !screenshots?.length) {
    if (project.self) {
      return (
        <div className="card-hero card-hero-private">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <span>Live Experience</span>
          <p>Navigate the site to see it in action</p>
        </div>
      )
    }
    if (project.repo === 'private') {
      return (
        <div className="card-hero card-hero-private">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Private Project</span>
          <p>Source &amp; preview available on request</p>
        </div>
      )
    }
    return null
  }

  const items = buildMediaItems(project)
  const previewSrc = screenshots?.[0]
  const screenshotStartIndex = video ? 1 : 0

  return (
    <>
      <div className="card-hero" onClick={() => setLightboxIndex(previewSrc ? screenshotStartIndex : 0)}>
        {previewSrc && (
          <img src={previewSrc} alt="Preview" className="card-hero-img" loading="lazy" />
        )}
        <div className="card-hero-overlay" />
        {project.latest && <span className="card-just-shipped">Just Shipped</span>}
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
        {items.length > 1 && (
          <span className="card-hero-count">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
            {items.length}
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

function CardLinks({ p }) {
  if (p.repo === '#' && p.link === '#') return null
  return (
    <div className="card-links">
      {p.link !== '#' && (
        p.self
          ? <span className="card-link-btn card-link-ghost card-link-private">You're here</span>
          : <a href={p.link} target="_blank" rel="noopener" className="card-link-btn card-link-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              Live Site
            </a>
      )}
      {p.repo === 'private' ? (
        <span className="card-link-btn card-link-ghost card-link-private">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Private Repo
        </span>
      ) : p.repo !== '#' && (
        <a href={p.repo} target="_blank" rel="noopener" className="card-link-btn card-link-ghost">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
          </svg>
          Source Code
        </a>
      )}
    </div>
  )
}

function ProjectCard({ project: p }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div className="project-card big">
      <div className="card-glow" />
      <CardMedia project={p} lightboxIndex={lightboxIndex} setLightboxIndex={setLightboxIndex} />

      <div className="card-top">
        <div className="card-icon card-icon-logo">
          <ProjectLogo logo={p.logo} title={p.title} />
        </div>
        <div className="card-badges">
          <span className={`card-status ${p.status}`}>⬤ Live · {p.year}</span>
        </div>
      </div>

      <h3 className="card-title">{p.title}</h3>
      <p className="card-desc">{p.desc}</p>

      <div className="card-tags">
        {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <CardLinks p={p} />
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <p className="section-label">Portfolio</p>
      <h2 className="section-title">Things I've <span>built</span></h2>
      <div className="projects-bento">
        {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
      </div>
    </section>
  )
}

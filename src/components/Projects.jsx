import './Projects.css'

const projects = [
  {
    title: 'Firehouse Restaurant',
    desc: 'Full Angular SSR website for a real burger restaurant in Bucharest. Features a menu browser, table reservations, photo gallery, and customer reviews. Includes AI-powered menu search — users describe what they feel like eating in natural language and OpenAI suggests matching dishes.',
    tags: ['Angular', 'TypeScript', 'SSR', 'SCSS', 'OpenAI API'],
    link: 'https://firehousebucharest.com',
    repo: '#',
    accent: '#8b5cf6',
    year: '2025',
    status: 'live',
  },
  {
    title: 'BestJobs Filter Extension',
    latest: true,
    desc: 'Browser extension for bestjobs.eu that lets you hide unwanted job listings by keyword, company name, or manually. All filtering runs locally — no data leaves your device.',
    tags: ['JavaScript', 'Browser Extension', 'Chrome', 'HTML/CSS'],
    link: 'https://chromewebstore.google.com/detail/bestjobs-filter/mddnacgggjghjjocidnedhbcnbdhkojk',
    repo: 'https://github.com/ZakariaF1/bestjobs-filter',
    accent: '#06d6a0',
    year: '2026',
    status: 'live',
  },
  {
    title: 'YNAB Automation Agent',
    desc: 'TypeScript automation suite for personal budget management. Scrapes ING HomeBanking via Playwright, transforms and deduplicates transactions, imports into YNAB, and auto-flags/approves using 200+ payee rules. Includes an LLM-based flag agent (OpenAI + Phoenix tracing) and a daily email reminder system via GitHub Actions, Vercel, and Resend.',
    tags: ['TypeScript', 'Playwright', 'OpenAI', 'YNAB API', 'GitHub Actions', 'Vercel'],
    link: '#',
    repo: '#',
    accent: '#f59e0b',
    year: '2026',
    status: 'live',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <p className="section-label">Portfolio</p>
      <h2 className="section-title">Things I've <span>built</span></h2>

      <div className="projects-featured">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} big />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project: p }) {
  return (
    <div className="project-card big" style={{ '--card-accent': p.accent }}>
      <div className="card-glow" />
      {p.latest && <div className="card-latest">🚀 Just Shipped</div>}
      <div className="card-top">
        <div className="card-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <div className="card-links">
          {p.repo !== '#' && (
            <a href={p.repo} target="_blank" rel="noopener" aria-label="GitHub" title="Source code">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
            </a>
          )}
          {p.link !== '#' && (
            <a href={p.link} target="_blank" rel="noopener" aria-label="Live site" title="Live site">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="card-meta">
        <h3 className="card-title">{p.title}</h3>
        <div className="card-badges">
          <span className="card-year">{p.year}</span>
          <span className={`card-status ${p.status}`}>
            {p.status === 'active' ? '⬤ Continuously Improving' : '⬤ Live'}
          </span>
        </div>
      </div>
      <p className="card-desc">{p.desc}</p>

      <div className="card-tags">
        {p.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  )
}

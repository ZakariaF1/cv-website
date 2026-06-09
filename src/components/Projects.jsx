import './Projects.css'

const projects = [
  {
    title: 'Project Alpha',
    desc: 'A high-performance API gateway built with Node.js and Redis. Handles 10k+ requests/sec with sub-20ms latency. Features rate limiting, auth middleware, and real-time analytics.',
    tags: ['Node.js', 'Redis', 'Docker', 'TypeScript'],
    link: '#',
    repo: '#',
    accent: '#8b5cf6',
    featured: true,
  },
  {
    title: 'DataViz Dashboard',
    desc: 'Real-time analytics dashboard for monitoring business KPIs. Built with React and D3.js, backed by a FastAPI service that streams live data via WebSockets.',
    tags: ['React', 'D3.js', 'FastAPI', 'WebSockets'],
    link: '#',
    repo: '#',
    accent: '#06d6a0',
    featured: true,
  },
  {
    title: 'CLI Dev Toolkit',
    desc: 'A command-line tool that automates repetitive dev workflows — scaffolding, linting, and deployment. Used daily by a team of 10+ engineers.',
    tags: ['Python', 'Click', 'Shell', 'CI/CD'],
    link: '#',
    repo: '#',
    accent: '#f59e0b',
    featured: true,
  },
  {
    title: 'Auth Service',
    desc: 'Microservice handling OAuth2, JWT, and MFA. Designed for horizontal scaling with stateless tokens and audit logging.',
    tags: ['Go', 'JWT', 'PostgreSQL'],
    link: '#',
    repo: '#',
    accent: '#8b5cf6',
  },
  {
    title: 'E-commerce Platform',
    desc: 'Full-stack marketplace with Stripe integration, inventory management, and an admin panel. Serving 500+ active users.',
    tags: ['Next.js', 'Stripe', 'Prisma', 'Vercel'],
    link: '#',
    repo: '#',
    accent: '#06d6a0',
  },
  {
    title: 'Open Source Contrib',
    desc: 'Contributed performance patches and documentation to popular open-source projects. PRs merged into repos with 5k+ stars.',
    tags: ['Open Source', 'TypeScript', 'Docs'],
    link: '#',
    repo: '#',
    accent: '#f59e0b',
  },
]

const featured = projects.filter(p => p.featured)
const rest = projects.filter(p => !p.featured)

export default function Projects() {
  return (
    <section id="projects">
      <p className="section-label">Portfolio</p>
      <h2 className="section-title">Things I've <span>built</span></h2>

      <div className="projects-featured">
        {featured.map((p, i) => (
          <ProjectCard key={i} project={p} big />
        ))}
      </div>

      <div className="projects-grid">
        {rest.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project: p, big }) {
  return (
    <div className={`project-card${big ? ' big' : ''}`} style={{ '--card-accent': p.accent }}>
      <div className="card-glow" />
      <div className="card-top">
        <div className="card-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <div className="card-links">
          <a href={p.repo} aria-label="GitHub" title="Source code">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
          </a>
          <a href={p.link} aria-label="Live demo" title="Live site">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <h3 className="card-title">{p.title}</h3>
      <p className="card-desc">{p.desc}</p>

      <div className="card-tags">
        {p.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  )
}

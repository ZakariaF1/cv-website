import './Skills.css'

const categories = [
  {
    name: 'Frontend',
    accent: 'var(--accent)',
    skills: [
      { name: 'Angular', icon: 'angular', primary: true },
      { name: 'TypeScript', icon: 'typescript', primary: true },
      { name: 'RxJS', icon: 'rxjs', primary: true },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'SCSS', icon: 'sass' },
      { name: 'React', icon: 'react' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Miro', icon: 'miro', simple: true },
    ],
  },
  {
    name: 'Backend',
    accent: 'var(--accent2)',
    skills: [
      { name: 'C# / .NET', icon: 'csharp', primary: true },
      { name: 'ASP.NET Core', icon: 'dotnetcore', primary: true },
      { name: 'Entity Framework', icon: 'dotnetcore' },
      { name: 'LINQ', icon: 'dotnetcore' },
      { name: 'REST APIs', icon: null },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Elasticsearch', icon: 'elasticsearch' },
      { name: 'Oracle DB', icon: 'oracle' },
      { name: 'Redis', icon: 'redis' },
      { name: 'MVC', icon: 'dotnetcore' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    accent: 'var(--accent3)',
    skills: [
      { name: 'Azure', icon: 'azure', primary: true },
      { name: 'Azure Functions', icon: 'azure' },
      { name: 'Azure Logic Apps', icon: 'azure' },
      { name: 'AWS EKS', icon: 'amazonwebservices', primary: true },
      { name: 'AWS SQS', icon: 'amazonwebservices' },
      { name: 'Docker', icon: 'docker', primary: true },
      { name: 'Kubernetes', icon: 'kubernetes' },
      { name: 'GitHub Actions', icon: 'github' },
      { name: 'Vercel', icon: 'vercel' },
    ],
  },
  {
    name: 'Tooling & AI',
    accent: '#7b8fd4',
    skills: [
      { name: 'OpenAI API', icon: 'openai', primary: true, simple: true },
      { name: 'Claude Code', icon: 'claude', primary: true, inline: true },
      { name: 'Playwright', icon: 'playwright' },
      { name: 'Git / GitHub', icon: 'git' },
      { name: 'GitLab', icon: 'gitlab' },
      { name: 'GitHub Copilot', icon: 'github' },
      { name: 'JWT & Auth', icon: null },
      { name: 'ETL Pipelines', icon: null },
    ],
  },
]

const certifications = [
  {
    title: 'AI Agent Development',
    org: 'Skillab',
    year: '2026',
    logo: '/skillab-logo.avif',
    desc: 'LLM fine-tuning methods, RAG pipelines, and multi-agent system design.',
  },
  {
    title: 'UX/UI Design',
    org: 'IT School',
    year: '2025',
    logo: '/it-school-logo.avif',
    desc: 'User-centered design, design thinking, wireframing, prototyping, and accessibility using Figma & Miro.',
  },
  {
    title: 'Microsoft Azure Fundamentals AZ-900',
    org: 'Pearson VUE',
    year: '2022',
    logo: '/azure-fundamentals-logo.avif',
    desc: 'Cloud concepts, Azure services, security, compliance, and pricing fundamentals.',
    id: '1210-9259',
  },
  {
    title: 'Oracle Java SE Programmer Certificate',
    org: 'Link Academy',
    year: '2018',
    logo: '/link-academy-logo.avif',
    desc: 'Java SE fundamentals, OOP principles, and computer programming standards.',
  },
]

const languages = [
  { name: 'English', level: 'Proficient', flag: 'https://flagcdn.com/gb.svg' },
  { name: 'Romanian', level: 'Native', flag: 'https://flagcdn.com/ro.svg' },
  { name: 'Arabic', level: 'Native', flag: 'https://flagcdn.com/sa.svg' },
  { name: 'German', level: 'Beginner', flag: 'https://flagcdn.com/de.svg' },
]

// Icons that are dark/black and need inversion on dark backgrounds
const darkIcons = new Set(['github', 'vercel', 'amazonwebservices'])

function SkillIcon({ icon, simple, inline }) {
  if (!icon) return null

  if (inline) {
    // Anthropic / Claude logo
    return (
      <svg className="skill-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: '#d4956a' }}>
        <path d="M17.304 3h-3.318l-5.99 18h3.318l5.99-18zM6.696 3H3.378L9.37 21h3.317L6.696 3z" />
      </svg>
    )
  }

  if (simple) {
    return (
      <img
        src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${icon}.svg`}
        alt=""
        className="skill-icon skill-icon-invert"
        aria-hidden="true"
      />
    )
  }

  const needsInvert = darkIcons.has(icon)
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
      alt=""
      className={`skill-icon${needsInvert ? ' skill-icon-invert' : ''}`}
      aria-hidden="true"
      onError={e => { e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-plain.svg` }}
    />
  )
}

export default function Skills() {
  return (
    <section id="skills">
      <p className="section-label">Stack</p>
      <h2 className="section-title">What I work <span>with</span></h2>

      <div className="skills-bento">
        {categories.map(cat => (
          <div key={cat.name} className="skills-card" style={{ '--cat-accent': cat.accent }}>
            <div className="skills-card-header">
              <span className="skills-cat-dot" />
              <span className="skills-cat">{cat.name}</span>
            </div>
            <div className="skills-chips">
              {cat.skills.map(s => (
                <span key={s.name} className="skill-chip">
                  <SkillIcon icon={s.icon} simple={s.simple} />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="skills-card skills-card-certs">
          <p className="section-label skills-extra-label">Certifications</p>
          <div className="cert-list">
            {certifications.map((c, i) => (
              <div className="cert-item" key={i}>
                {c.logo && <img src={c.logo} alt={c.org} className="cert-logo" />}
                <div className="cert-text">
                  <span className="cert-title">{c.title}</span>
                  <span className="cert-meta">{c.org} · {c.year}{c.id && <> · <span className="cert-id">#{c.id}</span></>}</span>
                  {c.desc && <span className="cert-desc">{c.desc}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-card skills-card-langs">
          <p className="section-label skills-extra-label">Languages</p>
          <div className="lang-list">
            {languages.map((l, i) => (
              <div className="lang-item" key={i}>
                <div className="lang-left">
                  {l.flag && <img src={l.flag} alt={l.name} className="lang-flag" />}
                  <span className="lang-name">{l.name}</span>
                </div>
                <span className="lang-level">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

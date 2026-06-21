import './Skills.css'

const categories = [
  {
    name: 'Frontend',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: ['Angular (v21+)', 'RxJS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / SCSS', 'Responsive Design', 'State Management'],
  },
  {
    name: 'Backend',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    skills: ['C# / .NET Core', '.NET Framework', 'ASP.NET Core', 'REST APIs', 'Entity Framework', 'LINQ', 'SQL', 'NoSQL'],
  },
  {
    name: 'Cloud & DevOps',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    skills: ['Azure (AZ-900)', 'AWS EKS', 'AWS SQS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'GitHub Actions', 'Vercel'],
  },
  {
    name: 'Tooling & Other',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    skills: ['Git / GitHub / GitLab', 'JWT & API Security', 'GitHub Copilot', 'Playwright', 'OpenAI API', 'ETL Pipelines', 'PostgreSQL', 'Redis'],
  },
]

const certifications = [
  { title: 'AI Agent Development', org: 'Skillab', year: '2026' },
  { title: 'UX/UI Design', org: 'IT School', year: '2025' },
  { title: 'Microsoft Azure Fundamentals AZ-900', org: 'Pearson VUE', year: '2022' },
  { title: 'Oracle Java SE Programmer Certificate', org: 'Link Academy', year: '2018' },
]

const languages = [
  { name: 'English', level: 'Proficient' },
  { name: 'Romanian', level: 'Native' },
  { name: 'Arabic', level: 'Native' },
  { name: 'German', level: 'Beginner' },
]

export default function Skills() {
  return (
    <section id="skills">
      <p className="section-label">Stack</p>
      <h2 className="section-title">What I work <span>with</span></h2>

      <div className="skills-bento">
        {categories.map(cat => (
          <div key={cat.name} className="skills-card">
            <div className="skills-card-header">
              <span className="skills-icon">{cat.icon}</span>
              <span className="skills-cat">{cat.name}</span>
            </div>
            <div className="skills-chips">
              {cat.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
            </div>
          </div>
        ))}

        <div className="skills-card skills-card-certs">
          <p className="section-label skills-extra-label">Certifications</p>
          <div className="cert-list">
            {certifications.map((c, i) => (
              <div className="cert-item" key={i}>
                <span className="cert-title">{c.title}</span>
                <span className="cert-meta">{c.org} · {c.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-card skills-card-langs">
          <p className="section-label skills-extra-label">Languages</p>
          <div className="lang-list">
            {languages.map((l, i) => (
              <div className="lang-item" key={i}>
                <span className="lang-name">{l.name}</span>
                <span className="lang-level">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

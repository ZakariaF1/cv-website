import './Skills.css'

const categories = [
  {
    name: 'Frontend',
    icon: '🎨',
    skills: ['Angular (v21+)', 'RxJS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / SCSS', 'Responsive Design', 'State Management'],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    skills: ['C# / .NET Core', '.NET Framework', 'ASP.NET Core', 'REST APIs', 'Entity Framework', 'LINQ', 'SQL', 'NoSQL'],
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    skills: ['Azure (AZ-900)', 'AWS EKS', 'AWS SQS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'GitHub Actions', 'Vercel'],
  },
  {
    name: 'Tooling & Other',
    icon: '🔧',
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

      <div className="skills-grid">
        {categories.map(cat => (
          <div key={cat.name} className="skills-card">
            <div className="skills-card-header">
              <span className="skills-icon">{cat.icon}</span>
              <span className="skills-cat">{cat.name}</span>
            </div>
            <div className="skills-chips">
              {cat.skills.map(s => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skills-extras">
        <div className="skills-extra-block">
          <p className="section-label" style={{ marginBottom: '20px' }}>Certifications</p>
          <div className="cert-list">
            {certifications.map((c, i) => (
              <div className="cert-item" key={i}>
                <span className="cert-title">{c.title}</span>
                <span className="cert-meta">{c.org} · {c.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-extra-block">
          <p className="section-label" style={{ marginBottom: '20px' }}>Languages</p>
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

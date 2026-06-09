import './Skills.css'

const categories = [
  {
    name: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'Angular (v21+) / RxJS', level: 92 },
      { name: 'TypeScript / JavaScript', level: 90 },
      { name: 'HTML5 / CSS3 / SCSS', level: 88 },
      { name: 'Responsive & State Mgmt', level: 85 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'C# / .NET Core & Framework', level: 88 },
      { name: 'ASP.NET Core & REST APIs', level: 86 },
      { name: 'Entity Framework / LINQ', level: 82 },
      { name: 'SQL / NoSQL Databases', level: 80 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { name: 'Azure Cloud (AZ-900 Certified)', level: 78 },
      { name: 'AWS (EKS, SQS)', level: 70 },
      { name: 'Docker / Kubernetes', level: 68 },
      { name: 'CI/CD Pipelines', level: 75 },
    ],
  },
  {
    name: 'Tooling & Other',
    icon: '🔧',
    skills: [
      { name: 'Git / GitHub / GitLab', level: 90 },
      { name: 'JWT & API Security', level: 80 },
      { name: 'GitHub Copilot / AI Workflows', level: 78 },
      { name: 'ETL Pipelines', level: 75 },
    ],
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
            <div className="skills-list">
              {cat.skills.map(s => (
                <div key={s.name} className="skill-row">
                  <div className="skill-meta">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-pct">{s.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{ '--fill': `${s.level}%` }}
                    />
                  </div>
                </div>
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

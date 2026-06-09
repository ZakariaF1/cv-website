import './Skills.css'

const categories = [
  {
    name: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'CSS / Tailwind', level: 88 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 82 },
      { name: 'Go', level: 70 },
      { name: 'REST / GraphQL', level: 85 },
    ],
  },
  {
    name: 'Data & Cloud',
    icon: '☁️',
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'Docker / K8s', level: 72 },
      { name: 'AWS', level: 70 },
    ],
  },
  {
    name: 'Tooling',
    icon: '🔧',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'CI/CD', level: 78 },
      { name: 'Linux / Shell', level: 80 },
      { name: 'Testing', level: 75 },
    ],
  },
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
    </section>
  )
}

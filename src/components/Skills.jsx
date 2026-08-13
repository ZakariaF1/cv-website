import './Skills.css'
import { certifications, languages, skillCategories } from '../data/skills'

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
      onError={e => {
        if (e.target.src.includes('-original')) {
          e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-plain.svg`
        } else {
          e.target.style.display = 'none'
        }
      }}
    />
  )
}

export default function Skills() {
  return (
    <section id="skills">
      <p className="section-label">Stack</p>
      <h2 className="section-title">What I work <span>with</span></h2>

      <div className="skills-bento">
        {skillCategories.map(cat => (
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
                {c.logo && (
                  c.link
                    ? <a href={c.link} target="_blank" rel="noopener" className="cert-logo-link"><img src={c.logo} alt={c.org} className="cert-logo" /></a>
                    : <img src={c.logo} alt={c.org} className="cert-logo" />
                )}
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

import './Skills.css'
import { certifications, languages, skillCategories } from '../data/skills'
import { resolveIcon } from '../lib/icons'

function SkillIcon({ icon, simple, mdi }) {
  const resolved = resolveIcon({ icon, simple, mdi })
  if (!resolved) return null

  return (
    <img
      src={resolved.src}
      alt=""
      className={`skill-icon${resolved.invert ? ' skill-icon-invert' : ''}`}
      aria-hidden="true"
      onError={resolved.onError}
    />
  )
}

export default function Skills() {
  return (
    <section id="skills">
      <p className="section-label">Foundation</p>
      <h2 className="section-title">Shared skills I use <span>everywhere</span></h2>

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
                  <SkillIcon icon={s.icon} simple={s.simple} mdi={s.mdi} />
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
                {c.logo && <img src={c.logo} alt="" className="cert-logo" aria-hidden="true" />}
                <div className="cert-text">
                  <span className="cert-title">{c.title}</span>
                  <span className="cert-meta">{c.org} · {c.year}{c.id && <> · <span className="cert-id">#{c.id}</span></>}</span>
                  {c.desc && <span className="cert-desc">{c.desc}</span>}
                  {c.link && (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                      View credential
                    </a>
                  )}
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

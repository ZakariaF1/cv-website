import './About.css'
import { experience } from '../data/experience'
import { uiCopy } from '../data/uiCopy'

const { about: copy } = uiCopy

function CompanyLogo({ logo, company }) {
  if (logo) {
    return <img src={logo} alt={company} className="timeline-logo" />
  }
  return (
    <div className="timeline-logo timeline-logo-fallback">
      {company.charAt(0)}
    </div>
  )
}

export default function About() {
  return (
    <section id="about">
      <p className="section-label">{copy.label}</p>
      <h2 className="section-title">{copy.titleBefore}<span>{copy.titleAccent}</span></h2>
      <div className="timeline">
        {experience.map((e, i) => (
          <div className="timeline-item" key={i}>
            <CompanyLogo logo={e.logo} company={e.company} />
            <div className="timeline-body">
              <div className="timeline-header">
                <span className="timeline-role">{e.role}</span>
                <span className="timeline-period">{e.period}</span>
              </div>
              <span className="timeline-company">{e.company}</span>
              <p className="timeline-desc">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

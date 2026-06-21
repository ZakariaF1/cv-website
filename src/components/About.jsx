import './About.css'

const experience = [
  {
    role: 'Backend-Focused Full Stack Developer (Contractor)',
    company: 'Morningstar Sustainalytics',
    period: 'Oct 2025 — May 2026',
    logo: '/morningstar_logo.avif',
    desc: 'Contributed to Canvas, a centralized ESG orchestration platform. Developed .NET/C# backend flows, async event-driven processing (SQS, batch jobs, ETL pipelines), and contributed to a Pentaho → C# migration that reduced bugs by ~50%.',
  },
  {
    role: 'Senior Frontend (Angular) Developer',
    company: 'Deutsche Bank',
    period: 'Aug 2022 — May 2025',
    logo: '/deutshche-bank-logo.avif',
    desc: 'Led end-to-end migration of two core apps from legacy HTML/JS to TypeScript Angular v13, improving responsiveness by 45%. Mentored 4 junior developers and reduced codebase size by ~50%.',
  },
  {
    role: 'Full Stack Software Developer',
    company: 'Mindgeek',
    period: 'Jun 2020 — Jun 2022',
    logo: '/mindgeek-logo.avif',
    desc: 'Worked across the full development lifecycle on Fraud and Reporting applications. Integrated Azure Logic Apps and Functions, automating workflows that reduced chargebacks and fraud cases by ~15%.',
  },
  {
    role: 'Junior Full Stack .NET Developer',
    company: 'Simpology Australia',
    period: 'May 2018 — 2020',
    logo: '/Simpology-Australia-logo.avif',
    desc: 'Built APIs and web apps using MySQL and MongoDB, increasing application speed by 30%. Applied best practices across plugins, widgets, and HTML page development.',
  },
]

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
      <p className="section-label">Experience</p>
      <h2 className="section-title">Where I've <span>worked</span></h2>
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

import './About.css'

const experience = [
  {
    role: 'Backend-Focused Full Stack Developer (Contractor)',
    company: 'Morningstar Sustainalytics',
    period: 'Oct 2025 — May 2026',
    desc: 'Contributed to Canvas, a centralized ESG orchestration platform. Developed .NET/C# backend flows, async event-driven processing (SQS, batch jobs, ETL pipelines), and contributed to a Pentaho → C# migration that reduced bugs by ~50%.',
  },
  {
    role: 'Senior Frontend (Angular) Developer',
    company: 'Deutsche Bank',
    period: 'Aug 2022 — May 2025',
    desc: 'Led end-to-end migration of two core apps from legacy HTML/JS to TypeScript Angular v13, improving responsiveness by 45%. Mentored 4 junior developers and reduced codebase size by ~50%.',
  },
  {
    role: 'Full Stack Software Developer',
    company: 'Mindgeek',
    period: 'Jun 2020 — Jun 2022',
    desc: 'Worked across the full development lifecycle on Fraud and Reporting applications. Integrated Azure Logic Apps and Functions, automating workflows that reduced chargebacks and fraud cases by ~15%.',
  },
  {
    role: 'Junior Full Stack .NET Developer',
    company: 'Simpology Australia',
    period: 'May 2018 — 2020',
    desc: 'Built APIs and web apps using MySQL and MongoDB, increasing application speed by 30%. Applied best practices across plugins, widgets, and HTML page development.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-left">
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            Building scalable systems <span>across the full stack</span>
          </h2>
          <p className="about-bio">
            Full Stack Software Developer with 7+ years of experience building scalable web applications across frontend, backend, and data layers. Experienced in Angular, .NET (C#), and SQL/NoSQL systems, with exposure to Azure, AWS, and AI-assisted developer workflows including GitHub Copilot.
          </p>
          <p className="about-bio">
            Currently expanding into applied AI — LLM fine-tuning methods, RAG, and multi-agent systems. I care about maintainability, performance, and clean cross-team collaboration.
          </p>

          <div className="about-details">
            <div className="detail">
              <span className="detail-key">Location</span>
              <span className="detail-val">Bucharest, Romania</span>
            </div>
            <div className="detail">
              <span className="detail-key">Email</span>
              <span className="detail-val">zackm.ahmad@outlook.com</span>
            </div>
            <div className="detail">
              <span className="detail-key">LinkedIn</span>
              <span className="detail-val">linkedin.com/in/syzack</span>
            </div>
            <div className="detail">
              <span className="detail-key">Phone</span>
              <span className="detail-val">0732 911 110</span>
            </div>
            <div className="detail">
              <span className="detail-key">Availability</span>
              <span className="detail-val available">Open to opportunities</span>
            </div>
          </div>

          <a href="/ZakariaAhmadResume.pdf" className="btn btn-primary resume-btn" download>
            Download Resume ↓
          </a>
        </div>

        <div className="about-right">
          <p className="section-label">Experience</p>
          <div className="timeline">
            {experience.map((e, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot" />
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
        </div>
      </div>
    </section>
  )
}

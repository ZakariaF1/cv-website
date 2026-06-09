import './About.css'

const experience = [
  {
    role: 'Software Engineer',
    company: 'Your Company',
    period: '2023 — Present',
    desc: 'Building scalable backend services and modern web interfaces. Leading feature development and collaborating across teams.',
  },
  {
    role: 'Junior Developer',
    company: 'Previous Company',
    period: '2022 — 2023',
    desc: 'Developed and maintained full-stack web applications. Improved CI/CD pipelines and contributed to open-source tooling.',
  },
  {
    role: 'Intern — Software Engineering',
    company: 'Startup',
    period: '2021 — 2022',
    desc: 'Built internal tools, automated reporting workflows, and shipped customer-facing features under tight deadlines.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-left">
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            Crafting software that <span>actually matters</span>
          </h2>
          <p className="about-bio">
            I'm a software engineer who cares deeply about the quality of code and the experience of the people using it. I move fast without breaking things — mostly — and I love working on problems that are genuinely hard.
          </p>
          <p className="about-bio">
            When I'm not writing code, you'll find me diving into new tech, contributing to open source, or trying to explain to non-engineers why "just add a button" is never that simple.
          </p>

          <div className="about-details">
            <div className="detail">
              <span className="detail-key">Location</span>
              <span className="detail-val">Your City, Country</span>
            </div>
            <div className="detail">
              <span className="detail-key">Email</span>
              <span className="detail-val">zack@example.com</span>
            </div>
            <div className="detail">
              <span className="detail-key">Availability</span>
              <span className="detail-val available">Open to opportunities</span>
            </div>
          </div>

          <a href="/resume.pdf" className="btn btn-primary resume-btn" download>
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

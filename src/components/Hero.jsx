import './Hero.css'

export default function Hero() {
  return (
    <div className="hero-panel">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-panel-inner">
        <div className="hero-photo-wrap">
          <img src="/personal-photo.avif" alt="Zakaria Ahmad" className="hero-photo" />
        </div>

        <div className="hero-badge">
          <span className="badge-dot" />
          Available for work
        </div>

        <h1 className="hero-title">
          Hi, I'm <span className="hero-name">Zakaria</span>
          <br />
          Full Stack Developer
        </h1>

        <p className="hero-sub">
          .NET · Angular · Cloud Systems — building scalable web applications
          across frontend, backend, and data layers for 7+ years.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-ghost">Get In Touch</a>
        </div>

        <div className="hero-divider" />

        <div className="hero-about">
          <p className="hero-section-label">About Me</p>
          <p className="hero-bio">
            Full Stack Software Developer with 7+ years of experience building scalable web applications across frontend, backend, and data layers. Experienced in Angular, .NET (C#), and SQL/NoSQL systems, with exposure to Azure, AWS, and AI-assisted developer workflows.
          </p>
          <p className="hero-bio">
            Currently expanding into applied AI — LLM fine-tuning, RAG, and multi-agent systems. I care about maintainability, performance, and clean cross-team collaboration.
          </p>

          <div className="hero-details">
            <div className="hero-detail">
              <span className="hero-detail-key">Location</span>
              <span className="hero-detail-val">Bucharest, Romania</span>
            </div>
            <div className="hero-detail">
              <span className="hero-detail-key">Email</span>
              <span className="hero-detail-val">zackm.ahmad@outlook.com</span>
            </div>
            <div className="hero-detail">
              <span className="hero-detail-key">LinkedIn</span>
              <span className="hero-detail-val">linkedin.com/in/syzack</span>
            </div>
            <div className="hero-detail">
              <span className="hero-detail-key">Availability</span>
              <span className="hero-detail-val hero-detail-available">Open to opportunities</span>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">7+</span>
            <span className="hero-stat-label">Years</span>
          </div>
          <div className="hero-strip-div" />
          <div className="hero-stat">
            <span className="hero-stat-num">4</span>
            <span className="hero-stat-label">Companies</span>
          </div>
          <div className="hero-strip-div" />
          <div className="hero-stat">
            <span className="hero-stat-num">3</span>
            <span className="hero-stat-label">Personal Projects</span>
          </div>
        </div>
      </div>
    </div>
  )
}

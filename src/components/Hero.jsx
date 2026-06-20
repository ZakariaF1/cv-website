import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-photo-wrap">
        <img src="/personal-photo.avif" alt="Zakaria Ahmad" className="hero-photo" />
      </div>

      <div className="hero-content">
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
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}

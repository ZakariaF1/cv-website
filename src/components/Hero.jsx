import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${p.a * 0.6})`
        ctx.fill()
      })

      // draw faint connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / 120) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-photo-wrap">
        <img src="/personal-photo.jpeg" alt="Zakaria Ahmad" className="hero-photo" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for work
        </div>

        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">Zakaria</span>
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

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">7+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">4</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">AZ-900</span>
            <span className="stat-label">Azure Certified</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

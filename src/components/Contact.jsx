import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sent')
  }

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <p className="section-label">Contact</p>
          <h2 className="section-title">
            Let's build something <span>together</span>
          </h2>
          <p className="contact-intro">
            Have a project in mind, a role to fill, or just want to connect? Drop me a message — I reply to everything.
          </p>

          <div className="contact-socials">
            <a href="https://linkedin.com/in/syzack" target="_blank" rel="noopener" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              linkedin.com/in/syzack
            </a>
            <a href="mailto:zackm.ahmad@outlook.com" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              zackm.ahmad@outlook.com
            </a>
            <a href="tel:0732911110" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              0732 911 110
            </a>
          </div>
        </div>

        <div className="contact-right">
          {status === 'sent' ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="you@example.com" required autoComplete="email" />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="What's this about?" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={5} placeholder="Tell me about your project or opportunity..." required />
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="footer">
        <span>Designed & built by Zakaria Ahmad — {new Date().getFullYear()}</span>
        <span className="footer-stack">React + Vite</span>
      </footer>
    </section>
  )
}

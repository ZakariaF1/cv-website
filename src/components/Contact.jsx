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
            <a href="https://github.com" target="_blank" rel="noopener" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="mailto:zack@example.com" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
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
                  <input type="email" placeholder="you@example.com" required />
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
        <span>Designed & built by Zack — {new Date().getFullYear()}</span>
        <span className="footer-stack">React + Vite</span>
      </footer>
    </section>
  )
}

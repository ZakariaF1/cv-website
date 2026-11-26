import { useState, useEffect, useRef, useCallback } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import './App.css'

function ScrollToTop({ scrollRef }) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    const isMobile = () => el && el.scrollHeight <= el.clientHeight

    const getScrolled = () => isMobile() ? window.scrollY : el?.scrollTop ?? 0
    const getTotal = () => isMobile()
      ? document.documentElement.scrollHeight - window.innerHeight
      : (el ? el.scrollHeight - el.clientHeight : 0)

    const onScroll = () => {
      const scrolled = getScrolled()
      const total = getTotal()
      setProgress(total > 0 ? scrolled / total : 0)
      setVisible(scrolled > 400)
    }

    const target = isMobile() ? window : el
    if (!target) return
    target.addEventListener('scroll', onScroll)
    return () => target.removeEventListener('scroll', onScroll)
  }, [scrollRef])

  const size = 44
  const radius = 19
  const circumference = 2 * Math.PI * radius
  const dash = circumference * progress

  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      onClick={() => {
        const el = scrollRef.current
        if (el && el.scrollHeight > el.clientHeight) {
          el.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
      aria-label="Back to top"
    >
      <svg className="scroll-top-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <svg className="scroll-top-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}

export default function App() {
  const rightRef = useRef(null)

  // Intercept anchor clicks so they scroll inside panel-right instead of the window
  const handleAnchorClick = useCallback((e) => {
    const anchor = e.target.closest('a[href^="#"]')
    if (!anchor) return
    const id = anchor.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    const panel = rightRef.current
    if (!target || !panel) return
    // Only intercept when the panel is the scroll container (desktop)
    if (panel.scrollHeight <= panel.clientHeight) return
    e.preventDefault()
    const offset = target.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop
    panel.scrollTo({ top: offset, behavior: 'smooth' })
  }, [])

  return (
    <div className="layout" onClick={handleAnchorClick}>
      <Nav scrollRef={rightRef} />
      <div className="panels">
        <aside className="panel-left">
          <Hero />
        </aside>

        <div className="panel-right" ref={rightRef}>
          <main>
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <ScrollToTop scrollRef={rightRef} />
        </div>
      </div>
    </div>
  )
}

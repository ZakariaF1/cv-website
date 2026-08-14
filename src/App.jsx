import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import './App.css'

const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Contact = lazy(() => import('./components/Contact'))

function shouldLoadRestImmediately() {
  if (typeof window === 'undefined') return false
  const hash = window.location.hash
  return Boolean(hash && hash !== '#about')
}

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
  const pendingAnchorIdRef = useRef(null)
  const [loadRest, setLoadRest] = useState(shouldLoadRestImmediately)

  useEffect(() => {
    if (loadRest) return undefined

    const load = () => setLoadRest(true)

    let idleId
    let timeoutId
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(load, { timeout: 1500 })
    } else {
      timeoutId = window.setTimeout(load, 1)
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [loadRest])

  useEffect(() => {
    if (!loadRest) return undefined
    const id = pendingAnchorIdRef.current
    if (!id) return undefined

    let cancelled = false
    let attempts = 0
    const tryScroll = () => {
      if (cancelled) return
      const target = document.getElementById(id)
      const panel = rightRef.current
      if (target) {
        pendingAnchorIdRef.current = null
        if (panel && panel.scrollHeight > panel.clientHeight) {
          const offset = target.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop
          panel.scrollTo({ top: offset, behavior: 'smooth' })
        } else {
          target.scrollIntoView({ behavior: 'smooth' })
        }
        return
      }
      if (attempts++ > 60) {
        pendingAnchorIdRef.current = null
        return
      }
      requestAnimationFrame(tryScroll)
    }
    tryScroll()
    return () => {
      cancelled = true
    }
  }, [loadRest])

  // Intercept anchor clicks so they scroll inside panel-right instead of the window
  const handleAnchorClick = useCallback((e) => {
    const anchor = e.target.closest('a[href^="#"]')
    if (!anchor) return
    const id = anchor.getAttribute('href').slice(1)
    if (!id) return

    const target = document.getElementById(id)
    const panel = rightRef.current

    if (!target && id !== 'about') {
      pendingAnchorIdRef.current = id
      setLoadRest(true)
      e.preventDefault()
      return
    }

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
            {loadRest ? (
              <Suspense fallback={null}>
                <Projects />
                <Skills />
                <Contact />
              </Suspense>
            ) : null}
          </main>
          <ScrollToTop scrollRef={rightRef} />
        </div>
      </div>
    </div>
  )
}

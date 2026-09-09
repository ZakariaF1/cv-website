import { useState, useEffect } from 'react'
import { navLinks, profile } from '../data/profile'
import './Nav.css'

const MOBILE_MENU_QUERY = '(max-width: 767px)'

export default function Nav({ scrollRef }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const el = scrollRef?.current ?? window
    const onScroll = () => {
      const top = scrollRef?.current ? scrollRef.current.scrollTop : window.scrollY
      setScrolled(top > 50)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [scrollRef])

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MENU_QUERY)
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const menuHidden = isMobile && !open

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#about" className="nav-logo">
        <span className="logo-bracket">&lt;</span>
        {profile.firstName}
        <span className="logo-bracket"> /&gt;</span>
      </a>

      <ul
        id="nav-menu"
        className={`nav-links${open ? ' open' : ''}`}
        inert={menuHidden ? true : undefined}
        aria-hidden={menuHidden ? true : undefined}
      >
        <li className="nav-mobile-profile">
          <img src={profile.photo} alt={profile.fullName} className="nav-mobile-photo" />
          <span className="nav-mobile-name">{profile.fullName}</span>
          <span className="nav-mobile-title">{profile.title}</span>
        </li>
        {navLinks.map(l => (
          <li key={l.href}>
            <a href={l.href} tabIndex={menuHidden ? -1 : undefined} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href={profile.resume} className="nav-cta" download tabIndex={menuHidden ? -1 : undefined} onClick={() => setOpen(false)}>Resume ↓</a>
        </li>
      </ul>

      <button
        type="button"
        className="nav-burger"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="nav-menu"
      >
        <span className={open ? 'open' : ''} />
        <span className={open ? 'open' : ''} />
        <span className={open ? 'open' : ''} />
      </button>
    </nav>
  )
}

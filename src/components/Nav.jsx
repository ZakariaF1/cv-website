import { useState, useEffect } from 'react'
import { navLinks, profile } from '../data/profile'
import './Nav.css'

export default function Nav({ scrollRef }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = scrollRef?.current ?? window
    const onScroll = () => {
      const top = scrollRef?.current ? scrollRef.current.scrollTop : window.scrollY
      setScrolled(top > 50)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [scrollRef])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#about" className="nav-logo">
        <span className="logo-bracket">&lt;</span>
        {profile.firstName}
        <span className="logo-bracket"> /&gt;</span>
      </a>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li className="nav-mobile-profile">
          <img src={profile.photo} alt={profile.fullName} className="nav-mobile-photo" />
          <span className="nav-mobile-name">{profile.fullName}</span>
          <span className="nav-mobile-title">{profile.title}</span>
        </li>
        {navLinks.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href={profile.resume} className="nav-cta" download onClick={() => setOpen(false)}>Resume ↓</a>
        </li>
      </ul>

      <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        <span className={open ? 'open' : ''} />
        <span className={open ? 'open' : ''} />
        <span className={open ? 'open' : ''} />
      </button>
    </nav>
  )
}

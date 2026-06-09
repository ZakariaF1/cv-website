import { useState, useEffect } from 'react'
import './Nav.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]


export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        <span className="logo-bracket">&lt;</span>
        Zakaria
        <span className="logo-bracket"> /&gt;</span>
      </a>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="/ZakariaAhmadResume.pdf" className="nav-cta" download onClick={() => setOpen(false)}>Resume ↓</a>
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

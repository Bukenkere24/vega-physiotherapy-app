import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { waLink } from '../config/site'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/academy', label: 'Academy' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [logoIcon, setLogoIcon] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="nav-inner">
            <Link to="/" className="nav-logo">
              <img
                className="nav-logo-img"
                src="/logo.png"
                alt="Vega Physiotherapy logo"
                width={44}
                height={44}
                style={{ display: logoIcon ? 'none' : 'block' }}
                onLoad={() => setLogoIcon(false)}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  setLogoIcon(true)
                }}
              />
              <div className="nav-logo-icon" aria-hidden="true" style={{ display: logoIcon ? 'flex' : 'none' }}>
                V
              </div>
              <div className="nav-logo-text">
                VEGA
                <span>Physiotherapy &amp; Rehabilitation</span>
              </div>
            </Link>

            <ul className="nav-links">
              {links.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end} className={({ isActive }) => (isActive ? 'active' : '')}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="nav-cta">
              <a href={waLink()} className="btn btn-outline btn-sm" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <Link to="/book" className="btn btn-primary btn-sm">
                Book &amp; Pay
              </Link>
            </div>

            <button
              type="button"
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobileMenu">
        <button type="button" className="mobile-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
          ✕
        </button>
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)}>
            {label}
          </NavLink>
        ))}
        <Link to="/book" className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setMenuOpen(false)}>
          Book &amp; Pay
        </Link>
      </div>
    </>
  )
}

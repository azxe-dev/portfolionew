import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="header" id="site-header">
      {/* Logo: "© Code by Alkesh" slides to "Alkesh James" on hover */}
      <div className={`header-logo-container ${scrolled ? 'hidden' : ''}`}>
        <Magnetic>
          <div className="header-logo">
            <Link to="/" className="header-logo-wrap" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>© Code by Alkesh</span>
              <span>Alkesh James</span>
            </Link>
          </div>
        </Magnetic>
      </div>

      {/* Nav links with slide-up hover effect - hidden on scroll */}
      <nav className={`header-nav ${scrolled ? 'hidden' : ''}`}>
        <Magnetic>
          <Link to="/" className="header-nav-link">
            <div className="header-nav-link-wrap">
              <span>Work</span>
              <span>Work</span>
            </div>
          </Link>
        </Magnetic>
        <Magnetic>
          <Link to="/about" className="header-nav-link">
            <div className="header-nav-link-wrap">
              <span>About</span>
              <span>About</span>
            </div>
          </Link>
        </Magnetic>
        <Magnetic>
          <a href="mailto:alkesh@amalby.com" className="header-nav-link">
            <div className="header-nav-link-wrap">
              <span>Contact</span>
              <span>Contact</span>
            </div>
          </a>
        </Magnetic>
      </nav>
    </header>
  )
}


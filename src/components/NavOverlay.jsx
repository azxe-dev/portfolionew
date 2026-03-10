import { Link } from 'react-router-dom'

export default function NavOverlay({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`nav-overlay-bg ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <nav className={`nav-overlay ${isOpen ? 'open' : ''}`}>
        <div>
          <p className="nav-overlay-section-label">Navigation</p>
          <div className="nav-overlay-links">
            <Link to="/" className="nav-overlay-link" onClick={onClose}>
              <span className="nav-overlay-dot" />
              Home
            </Link>
            <Link to="/" className="nav-overlay-link" onClick={onClose}>
              <span className="nav-overlay-dot" />
              Work
            </Link>
            <Link to="/about" className="nav-overlay-link" onClick={onClose}>
              <span className="nav-overlay-dot" />
              About
            </Link>
            <a href="mailto:alkesh@amalby.com" className="nav-overlay-link" onClick={onClose}>
              <span className="nav-overlay-dot" />
              Contact
            </a>
          </div>
        </div>

        <div className="nav-overlay-bottom">
          <p className="nav-overlay-bottom-label">Socials</p>
          <div className="nav-overlay-social-links">
            <a href="https://instagram.com/alkexh" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://linkedin.com/in/alkeshjames" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

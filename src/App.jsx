import { useEffect, useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import NavOverlay from './components/NavOverlay'
import Footer from './components/Footer'
import Magnetic from './components/Magnetic'
import Home from './pages/Home'
import About from './pages/About'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuBtnVisible, setMenuBtnVisible] = useState(false)
  const [menuBtnLight, setMenuBtnLight] = useState(false)

  useEffect(() => {
    let marqueeTick;

    // ── Lenis smooth scroll ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // ── Bento music scroll-lock ──
    const onBentoMusic = (e) => {
      e.detail.playing ? lenis.stop() : lenis.start()
    }
    window.addEventListener('bento-music-toggle', onBentoMusic)

    // ── Show floating menu button after scrolling past top ──
    const onScroll = () => {
      setMenuBtnVisible(window.scrollY > 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── GSAP Animations ──
    const ctx = gsap.context(() => {

      // Hero name marquee - infinite auto scroll
      let xPercent = 0;

      marqueeTick = () => {
        if (xPercent < -50) {
          xPercent += 50;
        } else if (xPercent > 0) {
          xPercent -= 50;
        }
        gsap.set('.hero-name-slider', { xPercent });
        // Smooth, slow, constant left-to-right movement
        xPercent += 0.035;
      };

      gsap.ticker.add(marqueeTick);

      // ── Global Nav Overlay Inversion ──
      ScrollTrigger.create({
        trigger: '.nav-overlay',
        start: 'top 60px',
        end: 'bottom 60px',
        onEnter: () => setMenuBtnLight(true),
        onLeave: () => setMenuBtnLight(false),
        onEnterBack: () => setMenuBtnLight(true),
        onLeaveBack: () => setMenuBtnLight(false),
      })
    })

    return () => {
      if (marqueeTick) {
        gsap.ticker.remove(marqueeTick);
      }
      ctx.revert()
      lenis.destroy()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('bento-music-toggle', onBentoMusic)
    }
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  return (
    <Router>
      <CustomCursor />
      <Header />

      {/* Floating hamburger menu button */}
      <div className={`menu-btn-container ${menuBtnVisible ? 'visible' : ''}`}>
        <Magnetic>
          <button
            className={`menu-btn ${menuOpen ? 'active' : ''} ${menuBtnLight && !menuOpen ? 'light' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            id="menu-toggle-btn"
          >
            <span className="menu-btn-line" />
            <span className="menu-btn-line" />
          </button>
        </Magnetic>
      </div>

      <NavOverlay isOpen={menuOpen} onClose={closeMenu} />

      <Routes>
        <Route path="/" element={<Home setMenuBtnLight={setMenuBtnLight} />} />
        <Route path="/about" element={<About setMenuBtnLight={setMenuBtnLight} />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App

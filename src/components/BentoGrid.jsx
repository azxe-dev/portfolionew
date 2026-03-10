import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ─── Magnetic card hook (GSAP elastic, max 8px shift) ─── */
function useMagCard() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 8
      const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 8
      xTo(dx)
      yTo(dy)
    }
    const onLeave = () => { xTo(0); yTo(0) }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}

/* Cert data */
const CERTS = [
  { name: 'Risk Management', org: 'Goldman Sachs · Forage' },
  { name: 'On Premise Sales Simulation', org: 'Red Bull' },
  { name: 'Cyber Security', org: 'Deloitte · Australia' },
  { name: 'Software Engineering Job Sim', org: 'JPMorgan Chase' },
]

/* Component */
export default function BentoGrid() {
  const [playing, setPlaying] = useState(false)
  const [certsOpen, setCertsOpen] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const musicRef = useMagCard()
  const certsRef = useMagCard()
  const locationRef = useMagCard()
  const audioRef = useRef(null)

  /* Toggle Play/Pause */
  const togglePlay = () => {
    setPlaying(prev => {
      const next = !prev
      if (next) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
      window.dispatchEvent(new CustomEvent('bento-music-toggle', { detail: { playing: next } }))
      return next
    })
  }

  /* Handlers for audio */
  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const onEnded = () => {
    setPlaying(false)
    setCurrentTime(0)
    window.dispatchEvent(new CustomEvent('bento-music-toggle', { detail: { playing: false } }))
  }

  /* Helper: Format time MM:SS */
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  /* Sync progress % */
  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  /* Clean up on unmount */
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('bento-music-toggle', { detail: { playing: false } }))
    }
  }, [])

  return (
    <>
      <section className={`bento ${playing ? 'is-playing' : ''}`}>
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="/best-part.mp3"
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
        />

        {/* ── Deep-blue blur overlay — outside grid for global coverage ── */}
        <div
          className={`bento-overlay ${playing ? 'active' : ''}`}
          onClick={togglePlay}
          aria-hidden="true"
        />

        <div className="bento-grid">
          {/* ══ 1 — CERTIFICATIONS ══ */}
          <div className="bento-card bento-card--certs" ref={certsRef}>
            <button
              className="bento-certs-toggle"
              onClick={() => setCertsOpen(p => !p)}
              aria-expanded={certsOpen}
            >
              <span className="bento-label">Certifications</span>
              <span className={`bento-chevron ${certsOpen ? 'up' : ''}`}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                  strokeWidth="1.5" width="13" height="13">
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </span>
            </button>

            <div className={`bento-certs-body ${certsOpen ? 'open' : ''}`}>
              {CERTS.map((c, i) => (
                <div key={i} className="bento-cert-row">
                  <span className="bento-cert-name">{c.name}</span>
                  <span className="bento-cert-org">{c.org}</span>
                </div>
              ))}
              <a
                href="https://www.linkedin.com/in/alkesh-james/"
                target="_blank"
                rel="noopener noreferrer"
                className="bento-cert-more"
              >
                <span>More on LinkedIn</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                  strokeWidth="1.5" width="12" height="12">
                  <path d="M3 13L13 3M13 3H6M13 3v7" />
                </svg>
              </a>
            </div>
          </div>

          {/* ══ 2 — MUSIC ══ */}
          <div
            className={`bento-card bento-card--music ${playing ? 'playing' : ''}`}
            ref={musicRef}
          >
            {/* Vinyl disc - repositioned to top */}
            <div className="bento-disc">
              <img
                src="/never-enough.jpg"
                alt="Daniel Caesar - Best Part"
                className="bento-disc-img"
              />
              <div className="bento-disc-center-dot" />
            </div>

            {/* Hidden Toggle Button (Entire card should toggle) */}
            <button
              className="bento-player-toggle-overlay"
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
            />

            {/* Editorial Metadata */}
            <div className="bento-player-metadata">
              {/* Subtle Bars Icon */}
              <div className={`bento-mini-bars ${playing ? 'active' : ''}`}>
                {[1, 2, 3].map(i => (
                  <span key={i} className="bento-mini-bar" style={{ '--i': i }} />
                ))}
              </div>

              <div className="bento-artist">Daniel Caesar (feat. H.E.R.)</div>
              <div className="bento-title">Best Part</div>

              {/* Progress Bar */}
              <div className="bento-progress-wrap">
                <div className="bento-progress-bar">
                  <div className="bento-progress-fill" style={{ width: `${progressPercent}%` }} />
                  <div className="bento-progress-dot" style={{ left: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Time stamps */}
              <div className="bento-time">
                <span className="bento-time-current">{formatTime(currentTime)}</span>
                <span className="bento-time-sep">/</span>
                <span className="bento-time-total">{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* ══ 3 — LOCATION & EDUCATION ══ */}
          <div className="bento-card bento-card--location" ref={locationRef}>
            <span className="bento-label">Location & Education</span>

            <div className="bento-location-block">
              <div className="bento-location-city">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.4" width="17" height="17">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
                </svg>
                <span>Dubai, UAE</span>
              </div>
              <p className="bento-location-note">All works based in Dubai</p>
            </div>

            <div className="bento-divider" />

            <div className="bento-edu-block">
              <span className="bento-edu-degree">B.A. Criminology &amp; Police Science</span>
              <span className="bento-edu-school">St. Thomas College</span>
              <span className="bento-edu-sub">Thrissur, Kerala</span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

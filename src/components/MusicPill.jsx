import { useState, useEffect, useRef } from 'react'

export default function MusicPill() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Lock/unlock scroll on play/pause
    if (playing) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [playing])

  const toggle = () => {
    setPlaying((prev) => !prev)
    // If you wire up a real audio file later, control it here:
    // if (audioRef.current) {
    //   playing ? audioRef.current.pause() : audioRef.current.play()
    // }
  }

  return (
    <>
      {/* Dark-blue blur overlay */}
      <div
        className={`music-overlay ${playing ? 'active' : ''}`}
        onClick={toggle}
        aria-hidden="true"
      />

      {/* The pill */}
      <div className={`music-pill ${playing ? 'playing' : ''}`}>
        {/* Album art placeholder */}
        <div className="music-pill-art">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        {/* Track info */}
        <div className="music-pill-info">
          <span className="music-pill-track">Now Playing</span>
          <span className="music-pill-artist">Alkesh James</span>
        </div>

        {/* Play / Pause button */}
        <button
          className="music-pill-btn"
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
          id="music-pill-toggle"
        >
          {playing ? (
            /* Pause icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        {/* Waveform bars (animated when playing) */}
        <div className={`music-pill-bars ${playing ? 'active' : ''}`}>
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="music-bar" style={{ '--i': i }} />
          ))}
        </div>
      </div>

      {/* Hidden audio element — wire up an src when ready */}
      <audio ref={audioRef} loop />
    </>
  )
}

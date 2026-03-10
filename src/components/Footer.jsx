import { useState, useEffect } from 'react'

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const str = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Dubai',
      })
      setTime(str + ' GMT+4')
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <span className="footer-lbl">Version</span>
          <span className="footer-val">2025 © Edition</span>
        </div>
        <div className="footer-col">
          <span className="footer-lbl">Local Time</span>
          <span className="footer-val">{time}</span>
        </div>
        <div className="footer-col">
          <span className="footer-lbl">Socials</span>
          <div className="footer-social-row">
            <a href="https://instagram.com/alkexh" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://linkedin.com/in/alkeshjames" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

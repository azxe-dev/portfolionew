import { useState, useEffect, useRef } from 'react'

const PROJECTS = [
  {
    name: 'Amalby',
    category: 'Platform & Development',
    href: 'https://amalby.com',
    bg: '#2D5A27',
  },
  {
    name: 'FR.',
    category: 'Fintech — Coming Soon',
    href: '#',
    bg: '#16213E',
  },
]

export default function Projects() {
  const [active, setActive] = useState(-1)
  const mouseRef = useRef({ x: 0, y: 0 })
  const floatRef = useRef(null)
  const rafRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    // Smooth follow for floating image
    const animate = () => {
      const el = floatRef.current
      if (el) {
        posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.1
        posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.1
        el.style.left = (posRef.current.x - 220) + 'px'
        el.style.top = (posRef.current.y - 150) + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="projects" id="work">
      <p className="projects-label">Recent Work</p>

      {PROJECTS.map((p, i) => (
        <a
          key={i}
          className="project-row"
          href={p.href}
          target={p.href !== '#' ? '_blank' : undefined}
          rel="noopener noreferrer"
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(-1)}
        >
          <span className="project-title">{p.name}</span>
          <div 
            className="project-mobile-img" 
            style={{ background: p.bg }}
          >
            <span className="project-mobile-img-text">{p.name}</span>
          </div>
          <span className="project-cat">{p.category}</span>
        </a>
      ))}

      {/* Floating preview card */}
      <div
        ref={floatRef}
        className={`project-floating-img ${active >= 0 ? 'show' : ''}`}
        style={{ background: active >= 0 ? PROJECTS[active].bg : '#333' }}
      >
        <span className="project-floating-img-text">
          {active >= 0 ? PROJECTS[active].name : ''}
        </span>
      </div>
    </section>
  )
}

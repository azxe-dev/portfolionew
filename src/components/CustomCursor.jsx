import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState('default') // 'default' | 'link' | 'project'
  const isTouch = useRef(window.matchMedia('(hover: none)').matches)

  useEffect(() => {
    // Skip entirely on touch/mobile devices
    if (isTouch.current) return
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = -100
    let mouseY = -100
    let cursorX = -100
    let cursorY = -100

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)
    }

    const onMouseEnter = () => setVisible(true)
    const onMouseLeave = () => setVisible(false)

    // Smooth follow with requestAnimationFrame
    let raf
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    // Hover detection
    const onOver = (e) => {
      const el = e.target.closest('.project-row')
      if (el) { setMode('project'); return }
      const link = e.target.closest('a, button, .circle-btn, .pill, .header-logo, .header-nav-link')
      if (link) { setMode('link'); return }
    }

    const onOut = (e) => {
      const el = e.target.closest('.project-row, a, button, .circle-btn, .pill, .header-logo, .header-nav-link')
      if (el) setMode('default')
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [visible])

  let className = 'cursor'
  if (visible) className += ' visible'
  if (mode === 'link') className += ' link-hover'
  if (mode === 'project') className += ' project-hover'

  return (
    <div ref={cursorRef} className={className}>
      <span className="cursor-label">View</span>
    </div>
  )
}

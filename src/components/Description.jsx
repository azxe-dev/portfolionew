import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'

export default function Description() {
  return (
    <section className="description" id="about">
      <div className="description-top">
        <p className="description-text-main">
          Building what matters in the digital era.
          Together we will set the new status quo. No
          nonsense, always on the cutting edge.
        </p>
        <p className="description-text-side">
          The combination of my passion for
          design, technology &amp; entrepreneurship
          positions me in a unique place in
          the startup world.
        </p>
      </div>
      <div className="description-cta-row">
        <Magnetic>
          <Link to="/about" className="circle-btn circle-btn--dark">
            <span className="circle-btn-text">About me</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  )
}

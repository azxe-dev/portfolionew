export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Main Hero Background - Image */}
      <div className="hero-img-wrapper">
        <img 
          src="/hero-img.png" 
          alt="Alkesh James"
          className="hero-img"
        />
      </div>

      {/* Role tagline */}
      <div className="hero-tagline">
        <div className="hero-tagline-line">
          <span>Founder.</span>
        </div>
        <div className="hero-tagline-line">
          <span>Student. Builder.</span>
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="hero-scroll-arrow">↘</div>

      {/* Location badge */}
      <div className="hero-location">
        <span>Located<br />in Dubai</span>
        <div className="hero-location-globe">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
      </div>

      {/* Large marquee name */}
      <div className="hero-name-marquee">
        <div className="hero-name-slider">
          <h1>
            Alkesh James<span className="separator">—</span>Alkesh James<span className="separator">—</span>Alkesh James<span className="separator">—</span>
          </h1>
          <h1>
            Alkesh James<span className="separator">—</span>Alkesh James<span className="separator">—</span>Alkesh James<span className="separator">—</span>
          </h1>
        </div>
      </div>
    </section>
  )
}

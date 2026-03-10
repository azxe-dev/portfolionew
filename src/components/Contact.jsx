import Magnetic from './Magnetic'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      {/* Curved top edge */}
      <div className="contact-curve-wrapper">
        <div className="contact-curve-fill" />
      </div>

      {/* Heading with avatar */}
      <div className="contact-top">
        <div className="contact-avatar" />
        <h2 className="contact-heading">
          Let&rsquo;s work<br />together
        </h2>
      </div>

      {/* Arrow + CTA */}
      <div className="contact-mid">
        <span className="contact-arrow-icon">↙</span>
        <div className="contact-cta-wrap">
          <Magnetic>
            <a href="mailto:james@amalby.com" className="circle-btn circle-btn--accent">
              <span className="circle-btn-text">Get in touch</span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Divider */}
      <div className="contact-hr" />

      {/* Contact pills */}
      <div className="contact-pills-row">
        <Magnetic>
          <a href="mailto:james@amalby.com" className="pill">
            james@amalby.com
          </a>
        </Magnetic>
        <Magnetic>
          <a href="https://instagram.com/alkexh" target="_blank" rel="noopener noreferrer" className="pill">
            Instagram
          </a>
        </Magnetic>
        <Magnetic>
          <a href="https://linkedin.com/in/alkeshjames" target="_blank" rel="noopener noreferrer" className="pill">
            LinkedIn
          </a>
        </Magnetic>
      </div>
    </section>
  )
}

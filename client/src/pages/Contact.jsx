import { Helmet } from 'react-helmet-async'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import { site, waLink, telLink } from '../config/site'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Vega Physiotherapy · Banashankari, Bangalore</title>
        <meta
          name="description"
          content="Phone, WhatsApp, email, hours, and map — book an appointment or enquire about ACSM academy testing."
        />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <div className="section-label">Get In Touch</div>
          <h1>
            Ready to <span style={{ color: 'var(--teal)' }}>get started?</span>
          </h1>
          <p>We respond quickly on WhatsApp. Use the form for structured enquiries.</p>
        </div>
      </section>
      <section id="contact">
        <div className="container">
          <div className="contact-grid">
            <Reveal className="contact-info-block">
              <div className="contact-info-item">
                <div className="contact-info-icon ci-phone" aria-hidden="true">
                  📞
                </div>
                <div className="contact-info-text">
                  <strong>Phone</strong>
                  <a href={telLink()}>{site.phoneDisplay}</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon ci-wa" aria-hidden="true">
                  💬
                </div>
                <div className="contact-info-text">
                  <strong>WhatsApp</strong>
                  <a href={waLink()} target="_blank" rel="noreferrer">
                    Chat with us instantly
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon ci-email" aria-hidden="true">
                  ✉️
                </div>
                <div className="contact-info-text">
                  <strong>Email</strong>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon ci-map" aria-hidden="true">
                  📍
                </div>
                <div className="contact-info-text">
                  <strong>Address</strong>
                  <p>
                    {site.addressLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon ci-time" aria-hidden="true">
                  🕐
                </div>
                <div className="contact-info-text">
                  <strong>Operating hours</strong>
                  <p>
                    {site.hours.map((h) => (
                      <span key={h}>
                        {h}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="map-embed">
                <iframe
                  src={site.mapsEmbedSrc}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vega Physiotherapy location"
                />
              </div>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

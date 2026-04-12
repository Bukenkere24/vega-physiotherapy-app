import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Vega Physiotherapy · Banashankari, Bangalore</title>
        <meta
          name="description"
          content="Initial assessment, physiotherapy, ACSM performance testing, sports rehab, IT packages, and onsite academy programs — pricing and details."
        />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <div className="section-label">What We Offer</div>
          <h1>
            Our <span style={{ color: 'var(--teal)' }}>Services</span>
          </h1>
          <p>Detailed descriptions aligned with your care plan — transparent pricing for every session and program.</p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="services-grid">
            {services.map((s) => (
              <Reveal key={s.name} className="service-card">
                <div className="service-card-top">
                  <div className="service-emoji" aria-hidden="true">
                    {s.emoji}
                  </div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-desc">{s.desc}</div>
                </div>
                <div className="service-card-bottom">
                  <div>
                    <div className="service-price">{s.price}</div>
                    <div className="service-price-label">{s.priceLabel}</div>
                  </div>
                  <Link to="/book" className="service-link">
                    Book &amp; pay →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center" style={{ marginTop: 48 }}>
            <Link to="/contact" className="btn btn-outline">
              Prefer to enquire first? Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

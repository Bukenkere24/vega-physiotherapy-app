import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ReviewCarousel from '../components/ReviewCarousel'
import { services, whyCards } from '../data/services'
import { waLink } from '../config/site'

export default function Home() {
  const previewServices = services.slice(0, 6)

  return (
    <>
      <Helmet>
        <title>Vega Physiotherapy | Evidence-Based Physiotherapy · Bangalore</title>
        <meta
          name="description"
          content="MPT Sports Science specialists delivering ACSM-validated performance testing and sports rehabilitation in Banashankari, Bangalore."
        />
      </Helmet>

      <section id="home">
        <div className="hero-bg-shapes" aria-hidden="true" />
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Banashankari · Bangalore
              </div>
              <h1 className="hero-h1">
                Evidence-Based
                <br />
                <span className="teal underline-accent">Physiotherapy</span>
              </h1>
              <p className="hero-sub">
                MPT Sports Science specialists delivering ACSM-validated performance testing and data-driven rehabilitation for athletes, sports academies and IT professionals.
              </p>
              <div className="hero-btns">
                <Link to="/book" className="btn btn-primary">
                  Book Assessment
                </Link>
                <Link to="/academy" className="btn btn-outline">
                  Academy Program
                </Link>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-num">2</div>
                  <div className="hero-stat-label">MPT Specialists</div>
                </div>
                <div className="hero-stat-divider" aria-hidden="true" />
                <div className="hero-stat">
                  <div className="hero-stat-num">5</div>
                  <div className="hero-stat-label">Fitness Components</div>
                </div>
                <div className="hero-stat-divider" aria-hidden="true" />
                <div className="hero-stat">
                  <div className="hero-stat-num">60</div>
                  <div className="hero-stat-label">Day Tracking</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card-main">
                <div className="hero-card-icon-row">
                  <div className="hero-card-icon hci-1" aria-hidden="true">
                    🏃
                  </div>
                  <div className="hero-card-icon hci-2" aria-hidden="true">
                    📊
                  </div>
                  <div className="hero-card-icon hci-3" aria-hidden="true">
                    💪
                  </div>
                </div>
                <div className="hero-card-title">60-Day Performance Tracking</div>
                <div className="hero-card-text">Real data. Measurable outcomes. Evidence-based progress.</div>
                <div className="hero-progress-row">
                  <div className="hero-progress-item">
                    <label>
                      <span>Strength Recovery</span>
                      <span>89%</span>
                    </label>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '89%' }} />
                    </div>
                  </div>
                  <div className="hero-progress-item">
                    <label>
                      <span>Mobility Index</span>
                      <span>95%</span>
                    </label>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div className="hero-progress-item">
                    <label>
                      <span>Performance Score</span>
                      <span>98%</span>
                    </label>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '98%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-float hero-float-1">
                <div className="hero-float-icon" aria-hidden="true">
                  🏅
                </div>
                <div>
                  <div className="hero-float-label">ACSM Certified</div>
                  <div className="hero-float-sub">Performance Testing</div>
                </div>
              </div>
              <div className="hero-float hero-float-2">
                <div className="hero-float-icon" aria-hidden="true">
                  ⚡
                </div>
                <div>
                  <div className="hero-float-label">Onsite Academy</div>
                  <div className="hero-float-sub">Available across Bangalore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews carousel */}
      <ReviewCarousel />


      <section id="why">
        <div className="container">
          <Reveal className="text-center">
            <div className="section-label">Why Vega?</div>
            <h2 className="section-title">
              The Vega <span>Difference</span>
            </h2>
            <p className="section-sub">Where clinical expertise meets sports science — built for athletes who demand measurable results.</p>
          </Reveal>
          <div className="why-grid">
            {whyCards.map((c) => (
              <Reveal key={c.title} className="why-card">
                <div className="why-icon" aria-hidden="true">
                  {c.icon}
                </div>
                <div className="why-card-title">{c.title}</div>
                <div className="why-card-text">{c.text}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="services-preview">
        <div className="container">
          <div className="services-header">
            <Reveal>
              <div className="section-label">What We Offer</div>
              <h2 className="section-title">
                Our <span>Services</span>
              </h2>
              <p className="section-sub">Comprehensive sports rehabilitation and performance services — transparent pricing.</p>
            </Reveal>
            <Reveal>
              <Link to="/services" className="btn btn-primary">
                View all services →
              </Link>
            </Reveal>
          </div>
          <div className="services-grid">
            {previewServices.map((s) => (
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
                  <Link to="/contact" className="service-link">
                    Enquire →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="academy-preview" className="cta-band">
        <div className="container">
          <h2>Onsite ACSM testing for your academy</h2>
          <p>Certified performance testing at your facility — structured reporting and 60-day retesting cycles.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/academy" className="btn btn-white">
              Academy details
            </Link>
            <a href={waLink()} className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }} target="_blank" rel="noreferrer">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

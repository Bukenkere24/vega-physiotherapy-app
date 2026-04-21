import { Helmet } from 'react-helmet-async'
import Reveal from '../components/Reveal'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Our Team | Vega Physiotherapy · Bangalore</title>
        <meta
          name="description"
          content="Clinic story, mission, and MPT Sports Science specialists — evidence-based rehabilitation in Banashankari."
        />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <div className="section-label">Our Story</div>
          <h1>
            Built by athletes, <span style={{ color: 'var(--teal)' }}>for athletes</span>
          </h1>
          <p>Mission, credentials, and the measurable approach that defines Vega.</p>
        </div>
      </section>
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                Clinic <span>mission</span>
              </h2>
              <p className="section-sub" style={{ marginBottom: 20, maxWidth: 'none' }}>
                Vega Physiotherapy was founded on a simple belief: rehabilitation should be measurable, evidence-based, and sport-specific. We were frustrated with generic treatments that only addressed symptoms — so we built a clinic that addresses the root cause.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--gray)', lineHeight: 1.8 }}>
                Located in Banashankari, Bangalore, we serve athletes, sports academies, and IT professionals who demand more from their healthcare. With ACSM-validated testing equipment and dual MPT Sports Science credentials, we focus on data-driven outcomes.
              </p>
              <div className="about-stats-row">
                <div className="about-stat">
                  <div className="about-stat-num">MPT</div>
                  <div className="about-stat-label">Sports Science Qualified</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-num">ACSM</div>
                  <div className="about-stat-label">Validated Testing</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-num">60D</div>
                  <div className="about-stat-label">Reassessment Cycle</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-num">5+</div>
                  <div className="about-stat-label">Sports Served</div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="section-label">Meet the Team</div>
              <h2 className="section-title" style={{ marginBottom: 28 }}>
                Our <span>Specialists</span>
              </h2>
              <div className="team-cards">
                <div className="team-card">
                  <div className="team-avatar" aria-hidden="true">
                    👨‍⚕️
                  </div>
                  <div className="team-info">
                    <div className="team-info-name">Dr. [Name]</div>
                    <div className="team-info-cred">MPT – Sports Science</div>
                    <div className="team-info-desc">
                      Specializes in sports injury rehabilitation, return-to-sport programming, and ACSM performance testing for competitive athletes and academies.
                    </div>
                  </div>
                </div>
                <div className="team-card">
                  <div className="team-avatar" aria-hidden="true">
                    👩‍⚕️
                  </div>
                  <div className="team-info">
                    <div className="team-info-name">Dr. [Name]</div>
                    <div className="team-info-cred">MPT – Sports Science</div>
                    <div className="team-info-desc">
                      Expert in movement analysis, postural correction, and evidence-based rehabilitation for athletes and IT professionals with chronic musculoskeletal issues.
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: 20, fontSize: '0.85rem', color: 'var(--gray)' }}>
                Replace names, copy, and avatars with professional photos when the client provides assets (per website brief).
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

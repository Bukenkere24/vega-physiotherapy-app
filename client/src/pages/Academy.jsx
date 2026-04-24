import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'

const steps = [
  { title: 'Enquiry & Scheduling', text: "Contact us to schedule a visit. We work around your academy's training calendar." },
  { title: 'Onsite Setup', text: 'Our team arrives with all equipment — Dynamometer, SPOT 6 reaction lights, and more.' },
  { title: '5-Component Testing', text: 'Each athlete undergoes a full battery of ACSM-validated fitness assessments.' },
  { title: 'Individual Reports', text: 'Detailed performance report with benchmarks and personalized recommendations per athlete.' },
  { title: '60-Day Retesting', text: 'Structured reassessment cycle to track progress and refine training programs.' },
]

const components = [
  { icon: '💪', title: 'Muscular Strength', text: 'Dynamometer-measured force output across key muscle groups' },
  { icon: '🫀', title: 'Cardiovascular Fitness', text: 'Aerobic capacity and VO2 max estimation protocols' },
  { icon: '🤸', title: 'Flexibility', text: 'Sport-specific range of motion and joint mobility testing' },
  { icon: '⚡', title: 'Reaction Time', text: 'SPOT 6 light system for agility and neuromuscular testing' },
  { icon: '⚖️', title: 'Body Composition', text: 'Muscle mass, fat percentage and body composition analysis', wide: true },
]

export default function Academy() {
  return (
    <>
      <Helmet>
        <title>Academy Program | Onsite ACSM Testing · Vega Physiotherapy</title>
        <meta
          name="description"
          content="Onsite ACSM performance testing for sports academies in Bangalore — equipment, process, pricing, and enquiry form."
        />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <div className="section-label">For Sports Academies</div>
          <h1>
            Onsite <span style={{ color: 'var(--teal)' }}>ACSM Testing</span> Program
          </h1>
          <p>Performance testing brought to your facility — minimal disruption, maximum insight for every athlete.</p>
        </div>
      </section>
      <section id="academy">
        <div className="container">
          <div className="academy-grid">
            <div>
              <div className="section-label academy-label">Process</div>
              <h2 className="section-title academy-title">
                How it <span style={{ color: 'var(--mint)' }}>works</span>
              </h2>
              <p className="section-sub academy-sub" style={{ maxWidth: 480 }}>
                The only clinic in Bangalore delivering certified ACSM performance testing directly at your academy — aligned with your training schedule.
              </p>
              <div className="academy-steps">
                {steps.map((s, i) => (
                  <div key={s.title} className="academy-step">
                    <div className="academy-step-num">{i + 1}</div>
                    <div className="academy-step-text">
                      <strong>{s.title}</strong>
                      <p>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="academy-btns">
                <Link to="/contact" className="btn btn-primary">
                  Enquire for your academy
                </Link>
              </div>
            </div>
            <div>
              <div className="section-label academy-label">What we test</div>
              <h2 className="section-title academy-title" style={{ marginBottom: 16 }}>
                Five <span style={{ color: 'var(--mint)' }}>components</span>
              </h2>
              <div className="academy-components">
                {components.map((c) => (
                  <div key={c.title} className="academy-comp-card" style={c.wide ? { gridColumn: '1 / -1' } : undefined}>
                    <div className="academy-comp-icon" aria-hidden="true">
                      {c.icon}
                    </div>
                    <div className="academy-comp-title">{c.title}</div>
                    <div className="academy-comp-text">{c.text}</div>
                  </div>
                ))}
              </div>
              <div className="gallery-placeholder" aria-label="Equipment photo placeholders">
                <div className="ph">Dynamometer (client photo)</div>
                <div className="ph">SPOT 6 lights (client photo)</div>
                <div className="ph">Onsite setup (client photo)</div>
              </div>
              <div className="academy-price-tag">
                <div>
                  <div className="price">₹2,500 – ₹3,000</div>
                  <div className="price-label">per athlete · bulk pricing available</div>
                </div>
                <Link to="/contact" className="btn btn-primary btn-sm">
                  Get quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <Reveal className="text-center">
            <div className="section-label">Academy owners</div>
            <h2 className="section-title">
              Send an <span>enquiry</span>
            </h2>
            <p className="section-sub">We will respond with availability and a tailored quote for your squad size.</p>
          </Reveal>
          <div style={{ maxWidth: 720, margin: '40px auto 0' }}>
            <ContactForm
              title="Academy programme enquiry"
              subtitle="Tell us about your academy, athlete count, and preferred dates."
              source="academy"
              defaultService="Academy Program"
            />
          </div>
        </div>
      </section>
    </>
  )
}

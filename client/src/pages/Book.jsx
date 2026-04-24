import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

export default function Book() {
  return (
    <>
      <Helmet>
        <title>Book Appointment | Vega Physiotherapy</title>
        <meta
          name="description"
          content="Request a physiotherapy appointment with Vega Physiotherapy in Banashankari, Bangalore."
        />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <div className="section-label">Appointment booking</div>
          <h1>
            Book your <span style={{ color: 'var(--teal)' }}>appointment</span>
          </h1>
          <p>Select a service, preferred date, and time. Our team will confirm the slot by phone or WhatsApp.</p>
        </div>
      </section>
      <section>
        <div className="container">
          <ContactForm
            title="Request an Appointment"
            subtitle="Pick a preferred date and time slot. No online payment is required."
            source="booking"
            className="booking-form"
          />
        </div>
      </section>
    </>
  )
}

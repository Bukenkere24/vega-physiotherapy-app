import { useState } from 'react'
import { apiUrl } from '../config/site'

const SERVICE_OPTIONS = [
  'Sports Assessment',
  'Rehabilitation',
  'ACSM Testing',
  'Academy Program',
  'IT Professional Package',
  'Other',
]

export default function ContactForm({
  title = 'Book an Appointment',
  subtitle = "Fill in the form below and we'll get back to you within 2 hours.",
  source = 'contact',
  defaultService = '',
  className = '',
}) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setStatus('sending')
    const fd = new FormData(e.target)
    const payload = {
      full_name: fd.get('full_name'),
      phone: fd.get('phone'),
      email: fd.get('email') || '',
      service_interest: fd.get('service_interest'),
      message: fd.get('message') || '',
      source,
    }
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus('success')
      e.target.reset()
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setStatus('idle')
    }
  }

  return (
    <div className={`contact-form-card ${className}`.trim()}>
      <div className="form-title">{title}</div>
      <div className="form-sub">{subtitle}</div>

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="full_name">Full Name *</label>
            <input id="full_name" name="full_name" type="text" placeholder="Your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label htmlFor="service_interest">Service Interest *</label>
          <select
            id="service_interest"
            name="service_interest"
            required
            defaultValue={defaultService || ''}
          >
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us about your condition, injury, or goals…"
            rows={4}
          />
        </div>
        <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message →'}
        </button>
        {error ? (
          <div className="form-error" role="alert">
            {error}
          </div>
        ) : null}
        {status === 'success' ? (
          <div className="form-success visible" role="status">
            Thank you! We will reach out within 2 hours. You can also WhatsApp us for a faster response.
          </div>
        ) : null}
      </form>
    </div>
  )
}

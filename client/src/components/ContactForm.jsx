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

const TIME_SLOTS = [
  '8:00 AM',
  '9:30 AM',
  '11:00 AM',
  '12:30 PM',
  '3:00 PM',
  '4:30 PM',
  '6:00 PM',
  '7:30 PM',
]

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

export default function ContactForm({
  title = 'Book an Appointment',
  subtitle = "Choose a preferred date and time. We'll confirm the final slot by phone or WhatsApp.",
  source = 'contact',
  defaultService = '',
  className = '',
}) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

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
      preferred_date: fd.get('preferred_date'),
      preferred_time: fd.get('preferred_time'),
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
      setSelectedTime('')
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
            <option value="">Select a service...</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="preferred_date">Preferred Date *</label>
          <input id="preferred_date" name="preferred_date" type="date" min={todayIso()} required />
        </div>
        <div className="form-group">
          <span className="form-label">Preferred Time *</span>
          <div className="time-slot-grid" role="radiogroup" aria-label="Preferred appointment time">
            {TIME_SLOTS.map((slot) => (
              <label className={`time-slot ${selectedTime === slot ? 'selected' : ''}`} key={slot}>
                <input
                  type="radio"
                  name="preferred_time"
                  value={slot}
                  required
                  checked={selectedTime === slot}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us about your condition, injury, or goals..."
            rows={4}
          />
        </div>
        <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Request Appointment'}
        </button>
        {error ? (
          <div className="form-error" role="alert">
            {error}
          </div>
        ) : null}
        {status === 'success' ? (
          <div className="form-success visible" role="status">
            Thank you. We will confirm your appointment slot shortly. You can also WhatsApp us for a faster response.
          </div>
        ) : null}
      </form>
    </div>
  )
}

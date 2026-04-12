import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { apiUrl, site } from '../config/site'

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

function rupeesFromPaise(paise) {
  return (Number(paise) / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
}

export default function Book() {
  const [busy, setBusy] = useState(false)
  const [paid, setPaid] = useState(false)
  const [message, setMessage] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setMessage('')
    setBusy(true)

    const fd = new FormData(e.target)
    const contact_name = String(fd.get('contact_name') || '').trim()
    const contact_phone = String(fd.get('contact_phone') || '').trim()
    const contact_email = String(fd.get('contact_email') || '').trim()
    const service_note = String(fd.get('service_note') || '').trim()
    const amount_paise = site.bookingAmountPaise

    try {
      const orderRes = await fetch(apiUrl('/api/payments/create-order'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount_paise,
          contact_name,
          contact_phone,
          contact_email,
          service_note,
        }),
      })
      const orderData = await orderRes.json().catch(() => ({}))

      if (!orderRes.ok) {
        throw new Error(orderData.hint || orderData.error || 'Could not start payment')
      }

      const okScript = await loadRazorpayScript()
      if (!okScript || !window.Razorpay) {
        throw new Error('Could not load Razorpay checkout. Check your network or ad-blocker.')
      }

      setBusy(false)

      await new Promise((resolve, reject) => {
        const options = {
          key: orderData.key_id,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          order_id: orderData.order_id,
          name: site.name,
          description: 'Initial assessment booking (adjust copy as needed)',
          prefill: {
            name: contact_name,
            email: contact_email || undefined,
            contact: contact_phone.replace(/\D/g, ''),
          },
          notes: { service: service_note },
          handler: async function handler(response) {
            try {
              const verifyRes = await fetch(apiUrl('/api/payments/verify'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              })
              const v = await verifyRes.json().catch(() => ({}))
              if (!verifyRes.ok) throw new Error(v.error || 'Verification failed')
              setPaid(true)
              setMessage('Payment successful. We will confirm your slot on WhatsApp shortly.')
              resolve()
            } catch (err) {
              reject(err)
            }
          },
          modal: {
            ondismiss: () => resolve(),
          },
        }
        const rz = new window.Razorpay(options)
        rz.on('payment.failed', (res) => {
          reject(new Error(res?.error?.description || 'Payment failed'))
        })
        rz.open()
      })
    } catch (err) {
      setMessage(err.message || 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Book &amp; Pay | Vega Physiotherapy</title>
        <meta name="description" content="Secure online payment for your assessment booking via Razorpay." />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <div className="section-label">Online booking</div>
          <h1>
            Book &amp; <span style={{ color: 'var(--teal)' }}>pay</span>
          </h1>
          <p>
            Pay the initial assessment fee securely. Add Razorpay keys on the server to activate live payments — until then, the API returns a clear configuration message.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="book-card">
            <p className="book-note">
              Default amount: <strong>{rupeesFromPaise(site.bookingAmountPaise)}</strong> (aligned with the ₹700 assessment in your brief). Adjust{' '}
              <code style={{ fontSize: '0.85em' }}>VITE_BOOKING_AMOUNT_PAISE</code> (client) and validate business rules on the server.
            </p>
            {message ? (
              <div className={paid ? 'form-success visible' : 'form-error'} role="status">
                {message}
              </div>
            ) : null}
            <form onSubmit={onSubmit} style={{ marginTop: 16 }}>
              <div className="form-group">
                <label htmlFor="contact_name">Full name *</label>
                <input id="contact_name" name="contact_name" required placeholder="Your name" disabled={paid} />
              </div>
              <div className="form-group">
                <label htmlFor="contact_phone">Phone *</label>
                <input id="contact_phone" name="contact_phone" type="tel" required placeholder="+91 …" disabled={paid} />
              </div>
              <div className="form-group">
                <label htmlFor="contact_email">Email</label>
                <input id="contact_email" name="contact_email" type="email" placeholder="you@email.com" disabled={paid} />
              </div>
              <div className="form-group">
                <label htmlFor="service_note">Notes (injury / sport / preferred time)</label>
                <textarea id="service_note" name="service_note" rows={3} placeholder="Optional context for the team" disabled={paid} />
              </div>
              <button type="submit" className="btn btn-primary form-submit" disabled={busy || paid}>
                {busy ? 'Starting checkout…' : `Pay ${rupeesFromPaise(site.bookingAmountPaise)} with Razorpay`}
              </button>
            </form>
            <p className="book-note" style={{ marginTop: 20 }}>
              Prefer not to pay online?{' '}
              <Link to="/contact" style={{ color: 'var(--teal)', fontWeight: 600 }}>
                Use the contact form
              </Link>{' '}
              or WhatsApp the clinic directly.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

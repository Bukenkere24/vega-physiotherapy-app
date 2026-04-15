import { Link } from 'react-router-dom'
import { site, waLink, telLink } from '../config/site'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.8" cy="7.2" r="1" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5.1 19l1-3A7.9 7.9 0 1 1 9 18.4z" />
      <path d="M9.3 8.5c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c.7 1.2 1.6 2.1 2.9 2.7l.5-.6c.2-.2.4-.3.7-.2l1.6.7c.3.1.4.3.4.6v.5c0 .4-.2.6-.5.8-.6.4-1.4.5-2.2.3-2.8-.7-5.4-3.2-6.1-6-.2-.7-.1-1.4.3-2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.3 5.1l2.1 3.7-1.3 1.4c.9 1.9 2.4 3.4 4.4 4.4l1.4-1.3 3.7 2.1-.5 2.7c-.1.6-.6 1-1.2 1C9.8 19.1 4.9 14.2 4.9 8.1c0-.6.4-1.1 1-1.2z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="container">
        {site.partnerLine ? (
          <div className="partner-strip">
            <span>{site.partnerLine}</span>
          </div>
        ) : null}
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">{site.name}</div>
            <div className="footer-brand-tag">Rehabilitation &amp; Performance Center · Banashankari, Bangalore</div>
            <div className="footer-brand-desc">
              Evidence-based sports rehabilitation and ACSM performance testing — onsite academy testing across Bangalore.
            </div>
            <div className="footer-socials">
              <a href={site.instagram} className="footer-social" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                <InstagramIcon />
              </a>
              <a href={waLink()} className="footer-social" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href={telLink()} className="footer-social" aria-label="Call" title="Call">
                <PhoneIcon />
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li>
                <Link to="/services">Initial Assessment</Link>
              </li>
              <li>
                <Link to="/services">Physiotherapy Treatment</Link>
              </li>
              <li>
                <Link to="/services">ACSM Performance Testing</Link>
              </li>
              <li>
                <Link to="/academy">Academy Program</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/book">Book</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li>
                <a href={telLink()}>{site.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noreferrer">
                  @vegaphysiotherapy
                </a>
              </li>
              <li className="footer-address">{site.addressLines.join(' ')}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            © {year} Vega Physiotherapy and Rehabilitation Center. All rights reserved.
          </div>
          <div>Designed for athletes · Backed by science · Based in Bangalore</div>
        </div>
      </div>
    </footer>
  )
}

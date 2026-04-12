import { Link } from 'react-router-dom'
import { site, waLink, telLink } from '../config/site'

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
              <a href={site.instagram} className="footer-social" target="_blank" rel="noreferrer" title="Instagram">
                IG
              </a>
              <a href={waLink()} className="footer-social" target="_blank" rel="noreferrer" title="WhatsApp">
                WA
              </a>
              <a href={telLink()} className="footer-social" title="Call">
                Call
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
                <Link to="/book">Book &amp; Pay</Link>
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

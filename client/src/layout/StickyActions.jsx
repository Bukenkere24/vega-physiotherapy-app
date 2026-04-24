import { waLink, telLink } from '../config/site'

export default function StickyActions() {
  return (
    <div className="sticky-actions">
      <a href={waLink()} className="sticky-btn sticky-wa" target="_blank" rel="noreferrer" title="WhatsApp">
        <span className="sticky-label">WhatsApp Us</span>
        <span aria-hidden="true">💬</span>
      </a>
      <a href={telLink()} className="sticky-btn sticky-call" title="Call Us">
        <span className="sticky-label">Call Us</span>
        <span aria-hidden="true">📞</span>
      </a>
    </div>
  )
}

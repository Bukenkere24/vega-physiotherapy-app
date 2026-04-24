import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

function injectGtag(measurementId) {
  if (typeof window === 'undefined' || window.__vegaGaLoaded) return
  window.__vegaGaLoaded = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', measurementId, { send_page_view: false })
}

export default function GoogleAnalytics() {
  const loc = useLocation()

  useEffect(() => {
    if (!site.gaId) return
    injectGtag(site.gaId)
  }, [])

  useEffect(() => {
    if (!site.gaId || typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', 'page_view', {
      page_path: loc.pathname + loc.search,
      page_title: document.title,
    })
  }, [loc])

  return null
}

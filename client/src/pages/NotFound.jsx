import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | Vega Physiotherapy</title>
      </Helmet>
      <section className="not-found">
        <h1>404</h1>
        <p style={{ color: 'var(--gray)' }}>This page does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </section>
    </>
  )
}

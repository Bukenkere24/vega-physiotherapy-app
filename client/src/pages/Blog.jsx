import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const posts = [
  {
    slug: 'preventing-badminton-knee-injuries',
    title: 'Preventing common badminton knee injuries',
    excerpt: 'Load management, landing mechanics, and when to seek a sports physio assessment in Bangalore.',
  },
  {
    slug: 'desk-neck-and-shoulder-patterns',
    title: 'Desk neck and shoulder patterns IT professionals should know',
    excerpt: 'Ergonomic tweaks, micro-breaks, and evidence-based rehab goals beyond short-term pain relief.',
  },
  {
    slug: 'what-acsm-testing-measures',
    title: 'What ACSM performance testing measures for young athletes',
    excerpt: 'How strength, CV fitness, flexibility, reaction time, and body composition inform training decisions.',
  },
]

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog | Vega Physiotherapy — Sports Science &amp; Rehab Tips</title>
        <meta name="description" content="Educational articles on injury prevention, sports performance, and rehabilitation." />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <div className="section-label">SEO content</div>
          <h1>
            <span style={{ color: 'var(--teal)' }}>Insights</span> for athletes &amp; coaches
          </h1>
          <p>Starter topics aligned with your keyword strategy — replace with long-form posts when ready.</p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="blog-list">
            {posts.map((p) => (
              <Reveal key={p.slug} className="blog-card">
                <h2>{p.title}</h2>
                <p>{p.excerpt}</p>
                <p style={{ marginTop: 12, fontSize: '0.82rem', color: 'var(--gray)' }}>
                  Full article page can be added as static MDX or a CMS later. Slug: <code>{p.slug}</code>
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center" style={{ marginTop: 40 }}>
            <Link to="/contact" className="btn btn-primary">
              Book an assessment
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, A11y } from 'swiper/modules'
import { reviews } from '../data/reviews'
import 'swiper/css'
import 'swiper/css/pagination'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?sca_esv=e42243e293ad428e&sxsrf=ANbL-n4NQ-R4MJtXNsE0MmmVXjJvpOOejw:1777015300976&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qObhcZq_JaZHhQths0gNZOmpIh2j1g0lJFrWTh2IXEZX2qd1jLwpXs2EdGwNdj6de4pR5x35YxN1m2iqwWXuIFIjJEQorh3ktSR6h7FtEiUtGytPd8R8WmmEG-_7hg823PmW-1Ic%3D&q=Vega+Physiotherapy+and+Rehabilitation+Center+Reviews&sa=X&ved=2ahUKEwj0vpnu-YWUAxW0SGwGHfY_GgMQ0bkNegQIHRAH&biw=767&bih=730&dpr=1.25'

function StarRow({ count = 5 }) {
  return (
    <div className="rev-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  // Trim long reviews to keep cards a consistent height
  const MAX = 240
  const trimmed =
    review.text.length > MAX ? review.text.slice(0, MAX).trimEnd() + '…' : review.text

  return (
    <div className="rev-card">
      <div className="rev-card-top">
        <StarRow count={review.rating} />
        <p className="rev-text">{trimmed}</p>
      </div>
      <div className="rev-card-bottom">
        <div className="rev-avatar" aria-hidden="true">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="rev-name">{review.name}</div>
          <div className="rev-source">Verified Google Review</div>
        </div>
      </div>
    </div>
  )
}

export default function ReviewCarousel() {
  const progressRef = useRef(null)

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 12 }}>
          <div className="section-label">Patient Reviews</div>
          <h2 className="section-title">
            What our patients <span>say</span>
          </h2>
        </div>

        <div className="text-center" style={{ marginBottom: 48 }}>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rev-trust-link"
            aria-label="See all reviews on Google"
          >
            <span className="rev-trust-stars" aria-hidden="true">
              {'★'.repeat(5)}
            </span>
            <span className="rev-trust-text">5.0 from 70+ reviews on Google</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, el: '.rev-pagination' }}
          a11y={{ prevSlideMessage: 'Previous review', nextSlideMessage: 'Next review' }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          className="rev-swiper"
          onAutoplayTimeLeft={(swiper, timeLeft, percentage) => {
            if (progressRef.current) {
              progressRef.current.style.setProperty('--progress', 1 - percentage)
            }
          }}
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="rev-controls">
          <div className="rev-pagination" />
          <div className="rev-progress-wrap" aria-hidden="true">
            <div className="rev-progress-bar" ref={progressRef} />
          </div>
        </div>
      </div>
    </section>
  )
}

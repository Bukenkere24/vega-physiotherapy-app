import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import GoogleAnalytics from './components/GoogleAnalytics'
import Home from './pages/Home'
import Services from './pages/Services'
import Academy from './pages/Academy'
import About from './pages/About'
import Contact from './pages/Contact'
import Book from './pages/Book'
import Blog from './pages/Blog'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <GoogleAnalytics />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

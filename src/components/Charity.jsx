import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { FaMosque, FaCalendarAlt, FaBoxOpen, FaHandsHelping, FaLeaf, FaWhatsapp, FaHeart } from 'react-icons/fa'
import { useState } from 'react'
import { submitCharity } from '../api/api'
import s1 from '../assets/seva/s1.jpeg'
import s2 from '../assets/seva/s2.jpeg'
import s3 from '../assets/seva/s3.jpeg'
import s4 from '../assets/seva/s4.jpeg'
import s5 from '../assets/seva/s5.jpeg'
import s6 from '../assets/seva/s6.jpeg'
import s7 from '../assets/seva/s7.jpeg'
import s8 from '../assets/seva/s8.jpeg'

const sevaPhotos = [
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820510/WhatsApp_Image_2026-07-23_at_2.12.25_PM_2_fvyvix.jpg',
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820499/WhatsApp_Image_2026-07-23_at_2.12.25_PM_vdxdcj.jpg',
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820496/WhatsApp_Image_2026-07-23_at_2.12.25_PM_1_lgclgi.jpg',
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820341/WhatsApp_Image_2026-07-23_at_2.12.23_PM_kng2iv.jpg',
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820341/WhatsApp_Image_2026-07-23_at_2.12.24_PM_ctph53.jpg',
]
// Second slideshow — food distribution seva, rotates independently of the one above.
const sevaPhotos2 = [s1, s2, s3, s4, s5, s6, s7, s8]

const cards = [
  {
    icon: <FaMosque />,
    title: 'Where',
    desc: 'Hanuman Mandir, Gandhi Gram, Kanpur, U.P.'
  },
  {
    icon: <FaCalendarAlt />,
    title: 'When',
    desc: 'Every Tuesday, 5:00 PM – 8:00 PM — Prasad Vitaran'
  },
  {
    icon: <FaBoxOpen />,
    title: 'What We Serve',
    desc: 'Fresh, hot, pure vegetarian prasad prepared with love and devotion.'
  },
  {
    icon: <FaHandsHelping />,
    title: 'How to Help',
    desc: 'Donate meals, volunteer your time, or sponsor a Tuesday distribution.'
  },
]

export default function Charity() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    if (!form.name || !form.phone) {
      setError('Please enter your name and phone number.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await submitCharity(form)
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="charity">
      <div className="charity-inner">
        <div className="ct">

          {/* Header */}
          <div className="charity-header">
            <span className="charity-eyebrow">Seva & Compassion</span>
            <span className="charity-gline"></span>
            <h2 className="charity-title">Prasad Vitaran — Seva & Compassion</h2>
            <p className="charity-subtitle">
              Every Tuesday, we distribute prasad outside Hanuman Mandir, Gandhi Gram, Kanpur —
              because serving food is serving God. Join us in this sacred mission.
            </p>
          </div>

          {/* Info Cards */}
          <div className="charity-cards">
            {cards.map((c) => (
              <div className="charity-card" key={c.title}>
                <div className="charity-card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="charity-main">

            {/* Left — Story */}
            <div className="charity-story">

              {/* Photo */}
          
          <div className="charity-slideshow">
  {sevaPhotos.map((photo, i) => (
    <img
      key={i}
      src={photo}
      alt={`Seva event ${i + 1}`}
      className={`charity-slide-img slide-${i}`}
    />
  ))}
</div>
              <span className="ey" style={{ color: 'var(--yellow)' }}>Our Mission</span>
              <h3 className="charity-story-title">
                Serving the Community<br />
                <em style={{ color: 'var(--yellow)', fontStyle: 'italic' }}>Every Tuesday</em>
              </h3>

              <p>
                At LTCS, we believe food is more than a business — it is a blessing and
                a form of seva. Every Tuesday evening, we gather at
                <strong> Hanuman Mandir, Gandhi Gram, Kanpur</strong> to distribute
                prasad to devotees and those in need.
              </p>
              <p>
                From 5PM to 8PM every Tuesday, our dedicated volunteers ensure that
                warm, nutritious, pure vegetarian prasad reaches everyone with
                <strong> devotion, dignity and love</strong>.
              </p>

              <div className="charity-slideshow charity-slideshow-2">
                {sevaPhotos2.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt={`Prasad distribution ${i + 1}`}
                    className={`charity-slide-img-2 slide2-${i}`}
                  />
                ))}
              </div>

              <div className="charity-highlights">
                <div className="charity-highlight">
                  <span className="charity-highlight-num">1000+</span>
                  <span className="charity-highlight-lbl">Prasad Every Tuesday</span>
                </div>
                <div className="charity-highlight">
                  <span className="charity-highlight-num">52+</span>
                  <span className="charity-highlight-lbl">Tuesdays a Year</span>
                </div>
                <div className="charity-highlight">
                  <span className="charity-highlight-num">∞</span>
                  <span className="charity-highlight-lbl">Love & Devotion</span>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="charity-form-wrap">
              <div className="charity-form-header">
                <h3>Be Part of This Mission</h3>
                <p>Join us as a volunteer or sponsor prasad for those in need.</p>
              </div>

              {submitted ? (
                <div className="charity-success">
                  <div className="charity-success-icon">
                    <FaHeart style={{ color: 'var(--green)', fontSize: '2.5rem' }} />
                  </div>
                  <h4>Thank You!</h4>
                  <p>We will contact you soon. Your kindness matters.</p>
                </div>
              ) : (
                <div className="charity-form">
                  {error && (
                    <div style={{ background: '#FFF3F3', border: '1px solid #FFCDD2', padding: '10px 14px', color: '#C62828', fontSize: '.85rem', marginBottom: '14px' }}>
                      {error}
                    </div>
                  )}
                  <div className="charity-form-row">
                    <div className="fr">
                      <label>Your Name</label>
                      <input type="text" name="name" placeholder="Full name" value={form.name} onChange={handle} />
                    </div>
                    <div className="fr">
                      <label>Phone</label>
                      <input type="tel" name="phone" placeholder="+91 xxxxx xxxxx" value={form.phone} onChange={handle} />
                    </div>
                  </div>
                  <div className="fr">
                    <label>Email (optional)</label>
                    <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handle} />
                  </div>
                  <div className="fr">
                    <label>I want to</label>
                    <select name="type" value={form.type} onChange={handle}>
                      <option value="">Select your contribution…</option>
                      <option>Volunteer on Tuesdays</option>
                      <option>Sponsor prasad (one time)</option>
                      <option>Sponsor prasad (monthly)</option>
                      <option>Donate groceries / supplies</option>
                      <option>Spread awareness</option>
                    </select>
                  </div>
                  <div className="fr">
                    <label>Message (optional)</label>
                    <textarea name="message" placeholder="Any message for us…" value={form.message} onChange={handle}></textarea>
                  </div>
                  <button
                    className="charity-submit"
                    onClick={submit}
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    <FaLeaf style={{ marginRight: '8px' }} />
                    {loading ? 'Submitting...' : 'Join the Mission'}
                  </button>
                  <a
                    href="https://wa.me/919936485155?text=Hello! I want to volunteer/donate for your prasad vitaran at Hanuman Mandir."
                    target="_blank"
                    rel="noreferrer"
                    className="charity-wa"
                  >
                    <FaWhatsapp style={{ marginRight: '8px' }} /> Or WhatsApp Us Directly
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
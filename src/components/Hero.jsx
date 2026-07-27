import { motion } from 'framer-motion'
import { FaWhatsapp, FaRing, FaBuilding, FaUsers, FaStar } from 'react-icons/fa'
import hero1 from '../assets/hero/hero1.jpg'
import hero2 from '../assets/hero/hero2.jpg'
import hero3 from '../assets/hero/hero3.jpg'
import hero4 from '../assets/hero/hero4.jpg'
import hero5 from '../assets/hero/hero5.jpg'
import hero6 from '../assets/hero/hero6.jpg'

const heroSlides = [

  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
  hero6,
]

export default function Hero({ onBookNow }) {
  return (
    <section id="hero">

      {/* Slideshow Background */}
      <div className="hero-slideshow">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide hero-slide-${i}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Pure Vegetarian.<br />
          <em>Unforgettable</em> Flavours.
        </motion.h1>

        <motion.div
          className="hero-sub-hindi"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          लाला त्रिवेदी कैटरिंग सर्विस — आपके हर उत्सव का साथी
        </motion.div>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Crafting exceptional vegetarian culinary experiences for weddings,
          corporate events, and celebrations across Kanpur.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button className="btn btn-y" onClick={onBookNow}>
            Get a Free Quote
          </button>
          <a
            href="https://wa.me/919936485155"
            target="_blank"
            rel="noreferrer"
            className="btn btn-wa"
          >
            <FaWhatsapp /> WhatsApp Us
          </a>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
      >
        <div className="hstat">
          <div className="hstat-num">42<span style={{ fontSize: '1.5rem' }}>+</span></div>
          <div className="hstat-lbl">Years of Excellence</div>
        </div>
        <div className="hstat">
          <div className="hstat-num">100<span style={{ fontSize: '1.5rem' }}>%</span></div>
          <div className="hstat-lbl">Pure Vegetarian</div>
        </div>
      </motion.div>

      {/* Strip */}
      <motion.div
        className="hero-strip"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="hero-strip-inner ct">
          <div className="strip-item"><FaRing /> Weddings</div>
          <div className="strip-item"><FaBuilding /> Corporate Events</div>
          <div className="strip-item"><FaUsers /> Social Gatherings</div>
          <div className="strip-item"><FaStar /> VIP Parties</div>
        </div>
      </motion.div>
    </section>
  )
}
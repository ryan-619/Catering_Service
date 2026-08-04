import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FadeUp } from './AnimatedSection'
import gvideo from '../assets/gallery/gvideo.mp4'

const videos = [
  {
    src: gvideo,
    title: 'Live Buffet Event',
    desc: 'Premium catering setup for a grand wedding celebration',
    thumb: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80'
  },
  {
    src: 'https://res.cloudinary.com/r9upjg8g/video/upload/v1784832091/WhatsApp_Video_2026-07-21_at_11.48.26_AM_h3yc7f.mp4',
    title: 'Corporate Event Catering',
    desc: 'Professional catering service for corporate gatherings',
    thumb: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80'
  },
  {
    src: 'https://res.cloudinary.com/r9upjg8g/video/upload/v1784832091/WhatsApp_Video_2026-07-21_at_11.48.28_AM_k102fy.mp4',
    title: 'Special Occasion Setup',
    desc: 'Elegant food presentation for special celebrations',
    thumb: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80'
  },
]

export default function VideoGallery() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  const prev = () => {
    setActive((a) => (a - 1 + videos.length) % videos.length)
    setPlaying(false)
  }

  const next = () => {
    setActive((a) => (a + 1) % videos.length)
    setPlaying(false)
  }

  return (
    <section id="videos">
      <div className="ct">
        <FadeUp>
          <div className="vg-header">
            <span className="ey">Our Events</span>
            <span className="gline"></span>
            <h2 className="st">Our Events in Motion</h2>
            <p className="vg-subtitle">
              Watch our team in action — crafting unforgettable vegetarian
              dining experiences across Kanpur.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="vg-main">

            {/* Featured Video Player */}
            <div className="vg-player-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="vg-player"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                >
                  {!playing ? (
                    <div className="vg-thumbnail">
                      <img
                        src={videos[active].thumb}
                        alt={videos[active].title}
                        loading="lazy"
                      />
                      <div className="vg-thumb-overlay">
                        <motion.button
                          className="vg-play-btn"
                          onClick={() => setPlaying(true)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaPlay />
                        </motion.button>
                        <div className="vg-thumb-info">
                          <div className="vg-thumb-title">{videos[active].title}</div>
                          <div className="vg-thumb-desc">{videos[active].desc}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <video
                      src={videos[active].src}
                      controls
                      autoPlay
                      className="vg-video"
                      onEnded={() => { setPlaying(false); next() }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button className="vg-nav vg-nav-prev" onClick={prev}>
                <FaChevronLeft />
              </button>
              <button className="vg-nav vg-nav-next" onClick={next}>
                <FaChevronRight />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="vg-thumbs">
              {videos.map((v, i) => (
                <motion.div
                  key={i}
                  className={`vg-thumb ${active === i ? 'active' : ''}`}
                  onClick={() => { setActive(i); setPlaying(false) }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="vg-thumb-img-wrap">
                    <img src={v.thumb} alt={v.title} loading="lazy" />
                    <div className="vg-thumb-play">
                      <FaPlay />
                    </div>
                    {active === i && (
                      <motion.div
                        className="vg-thumb-active-bar"
                        layoutId="activeBar"
                      />
                    )}
                  </div>
                  <div className="vg-thumb-label">{v.title}</div>
                </motion.div>
              ))}
            </div>

            {/* Counter */}
            <div className="vg-counter">
              {videos.map((_, i) => (
                <button
                  key={i}
                  className={`vg-dot ${active === i ? 'active' : ''}`}
                  onClick={() => { setActive(i); setPlaying(false) }}
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
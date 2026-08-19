import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa'
import { FadeUp } from './AnimatedSection'

import ev1 from '../assets/events/ev1.jpg'
import ev2 from '../assets/events/ev2.jpg'
import ev3 from '../assets/events/ev3.jpg'
import ev4 from '../assets/events/ev4.jpg'
import ev5 from '../assets/events/ev5.jpg'
import ev6 from '../assets/events/ev6.jpg'
import ev7 from '../assets/events/ev7.jpg'
import evv1 from '../assets/events/ev-v1.mp4'
import evv2 from '../assets/events/ev-v2.mp4'
import evv3 from '../assets/events/ev-v3.mp4'

// Six of these are wide 20:9 panoramas of the live counters and one (ev7) is a
// portrait, so the grid spans are assigned to match each shot's real aspect
// ratio rather than forcing everything into the same cell.
const photos = [
  { src: ev1, cls: 'wide', cap: 'Illuminated Live Counter' },
  { src: ev7, cls: 'portrait', cap: 'Sweet & Dessert Station' },
  { src: ev2, cls: 'wide', cap: 'Grand Buffet Setup' },
  { src: ev3, cls: 'wide', cap: 'Brass & Copper Service' },
  { src: ev4, cls: '',     cap: 'Signature Counter Décor' },
  { src: ev5, cls: '',     cap: 'Royal Banquet Spread' },
  { src: ev6, cls: 'wide', cap: 'Premium Event Styling' },
]

const videos = [
  { src: evv1, cap: 'Live Counter Walkthrough' },
  { src: evv2, cap: 'Banquet Setup' },
  { src: evv3, cap: 'Full Event Spread' },
]

// One combined collection so the lightbox can step from the last photo straight
// into the videos.
const allMedia = [
  ...photos.map((p) => ({ src: p.src, type: 'image', cap: p.cap })),
  ...videos.map((v) => ({ src: v.src, type: 'video', cap: v.cap })),
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (index) => setLightbox({ index })
  const closeLightbox = () => setLightbox(null)

  const prevItem = useCallback(() => {
    setLightbox((p) => p && { index: (p.index - 1 + allMedia.length) % allMedia.length })
  }, [])

  const nextItem = useCallback(() => {
    setLightbox((p) => p && { index: (p.index + 1) % allMedia.length })
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevItem()
      if (e.key === 'ArrowRight') nextItem()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prevItem, nextItem])

  // Body scroll lock while the lightbox is open.
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const current = lightbox ? allMedia[lightbox.index] : null

  return (
    <section id="gallery">
      <div className="ct">

        <FadeUp>
          <div className="gh">
            <span className="ey">Photo Gallery</span>
            <span className="gline"></span>
            <h2 className="st">Moments We've Crafted</h2>
            <p className="gallery-subtitle">
              A glimpse into the events, celebrations and memories
              we have been privileged to be part of.
            </p>
          </div>
        </FadeUp>

        {/* Photos */}
        <FadeUp delay={0.15}>
          <div className="gallery-masonry">
            {photos.map((item, i) => (
              <motion.div
                className={`gm-item ${item.cls}`}
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => openLightbox(i)}
              >
                <img src={item.src} alt={item.cap} loading="lazy" />
                <div className="gm-overlay">
                  <FaExpand className="gm-icon" />
                  <span className="gm-cap">{item.cap}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Videos */}
        <FadeUp delay={0.2}>
          <div className="gallery-videos">
            <h3 className="gallery-carousel-title">Behind the Setup</h3>
            <div className="gv-grid">
              {videos.map((v, i) => (
                <motion.div
                  className="gv-card"
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  onClick={() => openLightbox(photos.length + i)}
                >
                  <video
                    src={v.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="gv-thumb"
                  />
                  <div className="gv-overlay">
                    <span className="gv-play"><FaPlay /></span>
                  </div>
                  <div className="gv-cap">{v.cap}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="gallery-lightbox-inner"
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="gallery-lightbox-close" onClick={closeLightbox} aria-label="Close">
                <FaTimes />
              </button>
              <button className="gallery-lightbox-prev" onClick={prevItem} aria-label="Previous">
                <FaChevronLeft />
              </button>

              {current.type === 'video' ? (
                <video
                  key={current.src}
                  src={current.src}
                  controls
                  autoPlay
                  playsInline
                  className="gallery-lightbox-img"
                />
              ) : (
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.cap}
                  className="gallery-lightbox-img"
                />
              )}

              <button className="gallery-lightbox-next" onClick={nextItem} aria-label="Next">
                <FaChevronRight />
              </button>
              <div className="gallery-lightbox-counter">
                {current.cap} &nbsp;·&nbsp; {lightbox.index + 1} / {allMedia.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

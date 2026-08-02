import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FadeUp } from './AnimatedSection'

import rm1 from '../assets/rammandir/rm1.jpg'
import rm2 from '../assets/rammandir/rm2.jpg'
import rm3 from '../assets/rammandir/rm3.jpg'
import rm4 from '../assets/rammandir/rm4.jpg'
import rm5 from '../assets/rammandir/rm5.jpg'
import rm6 from '../assets/rammandir/rm6.jpg'
import rm7 from '../assets/rammandir/rm7.jpg'
import rm8 from '../assets/rammandir/rm8.jpg'
import rm9 from '../assets/rammandir/rm9.jpg'
import rm10 from '../assets/rammandir/rm10.jpg'
import rm11 from '../assets/rammandir/rm11.jpg'
import rm12 from '../assets/rammandir/rm12.jpg'
import rm13 from '../assets/rammandir/rm13.jpg'
import rm14 from '../assets/rammandir/rm14.jpg'
import rm15 from '../assets/rammandir/rm15.jpg'
import rm16 from '../assets/rammandir/rm16.jpg'
import rm17 from '../assets/rammandir/rm17.jpg'
import rm18 from '../assets/rammandir/rm18.jpg'
import rmv1 from '../assets/rammandir/rmv1.mp4'
import rmv2 from '../assets/rammandir/rmv2.mp4'
import rmv3 from '../assets/rammandir/rmv3.mp4'

const asImages = (arr) => arr.map((src) => ({ src, type: 'image' }))
const asVideos = (arr) => arr.map((src) => ({ src, type: 'video' }))

// Each subsection keeps its photos and videos in separate collections so the
// two carousels stay independent of one another.
const subsections = [
  {
    key: 'samiti',
    title: 'Privileged to Serve at Rashtriya Karyakari Samiti',
    desc: 'Entrusted with catering for the national executive committee — serving pure vegetarian meals at a gathering of national significance.',
    photos: asImages([]),
    videos: asVideos([]),
  },
  {
    key: 'ram-mandir',
    title: 'Blessed to Serve at Ram Mandir',
    desc: 'A moment of devotion and honour — preparing and serving prasad and meals at Shri Ram Janmabhoomi, Ayodhya.',
    photos: asImages([
      rm1, rm2, rm3, rm4, rm5, rm6, rm7, rm8, rm9,
      rm10, rm11, rm12, rm13, rm14, rm15, rm16, rm17, rm18,
    ]),
    videos: asVideos([rmv1, rmv2, rmv3]),
  },
]

/**
 * One carousel of media. `navKey` must be unique per instance — Swiper resolves
 * navigation elements with document-wide selectors, so a shared class would
 * make every carousel on the page respond to the same pair of arrows.
 */
function MediaCarousel({ items, navKey, onOpen }) {
  if (!items.length) return null

  return (
    <div className="gallery-swiper-wrap ne-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          prevEl: `.ne-prev-${navKey}`,
          nextEl: `.ne-next-${navKey}`,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        loop={items.length > 1}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="gallery-swiper"
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="gallery-slide" onClick={() => onOpen(items, i)}>
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="gallery-slide-video"
                />
              ) : (
                <img src={item.src} alt={`Event ${i + 1}`} />
              )}
              <div className="gallery-slide-overlay">
                {item.type === 'video' ? (
                  <FaPlay className="gallery-slide-icon" />
                ) : (
                  <FaExpand className="gallery-slide-icon" />
                )}
              </div>
              {item.type === 'video' && (
                <span className="gallery-slide-badge">
                  <FaPlay /> Video
                </span>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className={`ne-prev-${navKey} gallery-nav-btn`} aria-label="Previous">
        <FaChevronLeft />
      </button>
      <button className={`ne-next-${navKey} gallery-nav-btn gallery-nav-next`} aria-label="Next">
        <FaChevronRight />
      </button>
    </div>
  )
}

export default function NationalEvents() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (items, index) => setLightbox({ items, index })
  const closeLightbox = () => setLightbox(null)

  const prevItem = useCallback(() => {
    setLightbox((prev) =>
      prev && { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length }
    )
  }, [])

  const nextItem = useCallback(() => {
    setLightbox((prev) =>
      prev && { ...prev, index: (prev.index + 1) % prev.items.length }
    )
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

  const current = lightbox ? lightbox.items[lightbox.index] : null

  return (
    <section id="national-events">
      <div className="ct">

        <FadeUp>
          <div className="ne-header">
            <span className="ey">National Recognition</span>
            <span className="gline"></span>
            <h2 className="st">Trusted at National-Level Events</h2>
            <p className="ne-subtitle">
              Chosen to cater at gatherings of national and spiritual importance —
              a responsibility we carry with devotion and pride.
            </p>
          </div>
        </FadeUp>

        {subsections.map((sub) => (
          <FadeUp key={sub.key}>
            <div className="ne-sub" id={sub.key}>
              <div className="ne-sub-head">
                <span className="ne-sub-line"></span>
                <h3 className="ne-sub-title">{sub.title}</h3>
                <p className="ne-sub-desc">{sub.desc}</p>
              </div>

              {sub.photos.length > 0 && (
                <div className="ne-block">
                  <h4 className="ne-block-title">Photos</h4>
                  <MediaCarousel
                    items={sub.photos}
                    navKey={`${sub.key}-photos`}
                    onOpen={openLightbox}
                  />
                </div>
              )}

              {sub.videos.length > 0 && (
                <div className="ne-block">
                  <h4 className="ne-block-title">Videos</h4>
                  <MediaCarousel
                    items={sub.videos}
                    navKey={`${sub.key}-videos`}
                    onOpen={openLightbox}
                  />
                </div>
              )}

              {sub.photos.length === 0 && sub.videos.length === 0 && (
                <p className="ne-empty">Photos and videos from this event are coming soon.</p>
              )}
            </div>
          </FadeUp>
        ))}

      </div>

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
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="gallery-lightbox-close" onClick={closeLightbox}>
                <FaTimes />
              </button>
              <button className="gallery-lightbox-prev" onClick={prevItem}>
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
                  src={current.src}
                  alt={`Event ${lightbox.index + 1}`}
                  className="gallery-lightbox-img"
                />
              )}
              <button className="gallery-lightbox-next" onClick={nextItem}>
                <FaChevronRight />
              </button>
              <div className="gallery-lightbox-counter">
                {lightbox.index + 1} / {lightbox.items.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

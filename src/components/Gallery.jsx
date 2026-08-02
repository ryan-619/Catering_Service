import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FadeUp, Stagger, StaggerItem } from './AnimatedSection'

import g1 from '../assets/gallery/g1.jpg'
import g2 from '../assets/gallery/g2.jpg'
import g3 from '../assets/gallery/g3.jpg'
import g4 from '../assets/gallery/g4.jpg'
import g5 from '../assets/gallery/g5.jpg'
import g6 from '../assets/gallery/g6.jpg'
import g7 from '../assets/gallery/g7.jpg'
import g8 from '../assets/gallery/g8.jpg'
import g9 from '../assets/gallery/g9.jpg'
import g10 from '../assets/gallery/g10.jpg'
import g11 from '../assets/gallery/g11.jpg'
import g12 from '../assets/gallery/g12.jpg'
import g13 from '../assets/gallery/g13.jpg'
import g14 from '../assets/gallery/g14.jpg'
import g15 from '../assets/gallery/g15.jpg'
import g16 from '../assets/gallery/g16.jpg'
import g17 from '../assets/gallery/g17.jpg'
// import g18 from '../assets/gallery/g18.jpg'
// import g19 from '../assets/gallery/g19.jpg'
// import gvideo from '../assets/gallery/gvideo.mp4'

const photos = [g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14,g15,g16,g17]

const photoMedia = photos.map((src) => ({ src, type: 'image' }))

const masonryLayout = [
  { img: g1, cls: 'tall' },
  { img: g2, cls: '' },
  { img: g3, cls: '' },
  { img: g4, cls: 'tall' },
  { img: g5, cls: 'wide' },
  { img: g6, cls: '' },
  { img: g7, cls: '' },
  { img: g8, cls: '' },
  { img: g9, cls: '' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (items, index) => setLightbox({ items, index })
  const closeLightbox = () => setLightbox(null)

  const prevPhoto = useCallback(() => {
    setLightbox((prev) =>
      prev && {
        ...prev,
        index: (prev.index - 1 + prev.items.length) % prev.items.length,
      }
    )
  }, [])

  const nextPhoto = useCallback(() => {
    setLightbox((prev) =>
      prev && { ...prev, index: (prev.index + 1) % prev.items.length }
    )
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prevPhoto, nextPhoto])

  return (
    <section id="gallery">
      <div className="ct">

        {/* Header */}
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

        {/* Featured Video
        <FadeUp delay={0.2}>
          <div className="gallery-video-wrap">
            <video
              src={gvideo}
              autoPlay
              muted
              loop
              playsInline
              className="gallery-video"
            />
            <div className="gallery-video-overlay">
              <div className="gallery-video-badge">
                <FaPlay style={{ fontSize: '.7rem' }} />
                Live Event
              </div>
            </div>
          </div>
        </FadeUp> */}

        {/* Masonry Grid */}
        <FadeUp delay={0.3}>
          <div className="gallery-masonry">
            {masonryLayout.map((item, i) => (
              <motion.div
                className={`gm-item ${item.cls}`}
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => openLightbox(photoMedia, i)}
              >
                <img src={item.img} alt={`Event ${i + 1}`} />
                <div className="gm-overlay">
                  <FaExpand className="gm-icon" />
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Swiper Carousel */}
        <FadeUp delay={0.4}>
          <div className="gallery-swiper-wrap">
            <h3 className="gallery-carousel-title">More Memories</h3>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-btn-prev',
                nextEl: '.swiper-btn-next',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 12 },
                768: { slidesPerView: 3, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="gallery-swiper"
            >
              {photos.slice(9).map((photo, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="gallery-slide"
                    onClick={() => openLightbox(photoMedia, i + 9)}
                  >
                    <img src={photo} alt={`Event ${i + 10}`} />
                    <div className="gallery-slide-overlay">
                      <FaExpand className="gallery-slide-icon" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="swiper-btn-prev gallery-nav-btn">
              <FaChevronLeft />
            </button>
            <button className="swiper-btn-next gallery-nav-btn gallery-nav-next">
              <FaChevronRight />
            </button>
          </div>
        </FadeUp>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
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
              <button className="gallery-lightbox-prev" onClick={prevPhoto}>
                <FaChevronLeft />
              </button>
              {lightbox.items[lightbox.index].type === 'video' ? (
                <video
                  key={lightbox.items[lightbox.index].src}
                  src={lightbox.items[lightbox.index].src}
                  controls
                  autoPlay
                  playsInline
                  className="gallery-lightbox-img"
                />
              ) : (
                <img
                  src={lightbox.items[lightbox.index].src}
                  alt={`Event ${lightbox.index + 1}`}
                  className="gallery-lightbox-img"
                />
              )}
              <button className="gallery-lightbox-next" onClick={nextPhoto}>
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
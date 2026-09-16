import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import { useMagnetic } from '../lib/useMagnetic'
import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'

import gvideo from '../assets/gallery/gvideo.mp4'
/* Stills are pulled from the house's own event photography (src/assets/events)
   rather than stock: a caterer with 10,000 events has no business advertising
   itself with somebody else's buffet. Each still is the closest real match to
   the footage it fronts. */
import evBuffet from '../assets/events/ev3.jpg'
import evCorporate from '../assets/events/ev5.jpg'
import evOccasion from '../assets/events/ev4.jpg'

const videos = [
  {
    src: gvideo,
    title: 'Live Buffet Event',
    desc: 'Premium catering setup for a grand wedding celebration',
    thumb: evBuffet
  },
  {
    src: 'https://res.cloudinary.com/r9upjg8g/video/upload/v1784832091/WhatsApp_Video_2026-07-21_at_11.48.26_AM_h3yc7f.mp4',
    title: 'Corporate Event Catering',
    desc: 'Professional catering service for corporate gatherings',
    thumb: evCorporate
  },
  {
    src: 'https://res.cloudinary.com/r9upjg8g/video/upload/v1784832091/WhatsApp_Video_2026-07-21_at_11.48.28_AM_k102fy.mp4',
    title: 'Special Occasion Setup',
    desc: 'Elegant food presentation for special celebrations',
    thumb: evOccasion
  },
]

/* Framer takes easing as numbers, so the curve of `--lx-e-out` is restated here
   rather than hard-coded to some other feel. Keep the two in step. */
const EASE_OUT = [0.16, 1, 0.3, 1]

const pad = (n) => String(n).padStart(2, '0')

export default function VideoGallery() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  /* The two arrows are the only magnetic targets in the section — they sit
     outside the frame where there is room for the pull to read. */
  const prevRef = useMagnetic({ strength: 0.28 })
  const nextRef = useMagnetic({ strength: 0.28 })

  /* Scrubbed counter-drift on the two gold washes. Scoped to the section so
     StrictMode's double-invoke cannot stack duplicate ScrollTriggers. */
  const scope = useGsapContext((ctx, el) => {
    if (prefersReducedMotion()) return
    const drift = (sel, to) =>
      gsap.fromTo(sel, { yPercent: -to }, {
        yPercent: to, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      })
    drift('.lx-vid-wash--a', 11)
    drift('.lx-vid-wash--b', -8)
  }, [])

  const prev = () => {
    setActive((a) => (a - 1 + videos.length) % videos.length)
    setPlaying(false)
  }

  const next = () => {
    setActive((a) => (a + 1) % videos.length)
    setPlaying(false)
  }

  const select = (i) => { setActive(i); setPlaying(false) }

  const current = videos[active]

  return (
    <section id="videos" className="lx-sec lx-sec--dark lx-vid" ref={scope}>
      <span className="lx-wash lx-wash--gold lx-vid-wash lx-vid-wash--a" aria-hidden="true" />
      <span className="lx-wash lx-wash--gold lx-vid-wash lx-vid-wash--b" aria-hidden="true" />

      <div className="lx-ct-wide lx-vid-inner">
        <SectionHead
          eyebrow="Our Events"
          title="Our Events in Motion"
          lead="Watch our team in action — crafting unforgettable vegetarian dining experiences across Kanpur."
        />

        {/* ── Cinematic stage ── */}
        <div className="lx-vid-stage-wrap">
          <button
            ref={prevRef}
            className="lx-arrow lx-arrow--prev lx-vid-arrow"
            onClick={prev}
            aria-label="Previous film"
            data-cursor="hot"
          >
            <FaChevronLeft />
          </button>

          <div className="lx-vid-stage">
            <AnimatePresence>
              <motion.div
                key={active}
                className="lx-vid-frame"
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.38, ease: EASE_OUT }}
              >
                {!playing ? (
                  <>
                    <img
                      className="lx-vid-shot"
                      src={current.thumb}
                      alt={current.title}
                      loading="lazy"
                    />
                    <span className="lx-vid-scrim" aria-hidden="true" />

                    <button
                      className="lx-vid-play"
                      onClick={() => setPlaying(true)}
                      aria-label={`Play ${current.title}`}
                      data-cursor="hot"
                    >
                      <span className="lx-vid-play-ring" aria-hidden="true" />
                      <span className="lx-vid-play-disc" aria-hidden="true"><FaPlay /></span>
                    </button>

                    <div className="lx-vid-caption">
                      <span className="lx-chip lx-chip--glass lx-vid-badge">
                        {pad(active + 1)} / {pad(videos.length)}
                      </span>
                      <h3 className="lx-vid-title">{current.title}</h3>
                      <p className="lx-vid-desc">{current.desc}</p>
                    </div>
                  </>
                ) : (
                  <video
                    src={current.src}
                    poster={current.thumb}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="lx-vid-media"
                    onEnded={() => { setPlaying(false); next() }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            ref={nextRef}
            className="lx-arrow lx-arrow--next lx-vid-arrow"
            onClick={next}
            aria-label="Next film"
            data-cursor="hot"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* ── Thumbnail strip ── */}
        <Reveal className="lx-vid-strip" stagger={0.08} start="top 92%">
          {videos.map((v, i) => (
            <button
              key={v.title}
              type="button"
              className={`lx-vid-t ${active === i ? 'is-on' : ''}`}
              onClick={() => select(i)}
              aria-pressed={active === i}
              aria-label={`${v.title} — ${v.desc}`}
              data-cursor="hot"
            >
              <span className="lx-vid-t-inner">
                <span className="lx-vid-t-shot">
                  <img src={v.thumb} alt="" loading="lazy" />
                  <span className="lx-vid-t-play" aria-hidden="true"><FaPlay /></span>
                </span>
                <span className="lx-vid-t-label">
                  <em>{pad(i + 1)}</em>{v.title}
                </span>
              </span>
              {active === i && (
                <motion.span
                  className="lx-vid-t-bar"
                  layoutId="activeBar"
                  aria-hidden="true"
                  transition={{ duration: 0.42, ease: EASE_OUT }}
                />
              )}
            </button>
          ))}
        </Reveal>

        {/* ── Counter ── */}
        <div className="lx-dots lx-vid-dots" role="group" aria-label="Choose a film">
          {videos.map((v, i) => (
            <button
              key={v.title}
              type="button"
              aria-current={active === i}
              aria-label={v.title}
              className={`lx-vid-dot ${active === i ? 'is-on' : ''}`}
              onClick={() => select(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

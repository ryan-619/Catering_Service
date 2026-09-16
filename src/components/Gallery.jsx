import { useState } from 'react'
import { FaExpand, FaPlay } from 'react-icons/fa'

import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'
import Lightbox from './ui/Lightbox'

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
// portrait. A fixed grid would crop them badly, so the wall is a CSS-columns
// masonry: every tile keeps its real aspect ratio and `cls` survives only as a
// modifier hint (the portrait gets a height cap so it cannot run 1200px tall).
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

/* Below this width the masonry is one or two columns and a per-column drift
   reads as jitter rather than depth, so the scrub is simply not built. */
const DRIFT_MIN_WIDTH = 720
/* Half-travel, in px, of the outermost column. Adjacent columns end up ~22px
   apart at the extremes — enough to feel engineered, small enough to stay calm. */
const DRIFT_STEP = 11

export default function Gallery() {
  // `null` = closed. The shared Lightbox owns keyboard, scroll-lock and portal.
  const [lbIndex, setLbIndex] = useState(null)

  const scope = useGsapContext((ctx, el) => {
    if (prefersReducedMotion()) return
    if (window.innerWidth < DRIFT_MIN_WIDTH) return

    const masonry = el.querySelector('.lx-gal-masonry')
    const tiles = gsap.utils.toArray('.lx-gal-tile', el)
    if (!masonry || !tiles.length) return

    // CSS columns place tiles at a handful of discrete x offsets; the sorted
    // set of those offsets IS the column order. Measured rather than assumed so
    // the same code works at 3 columns and at 2.
    const lefts = [...new Set(tiles.map((t) => Math.round(t.offsetLeft)))].sort((a, b) => a - b)
    const mid = (lefts.length - 1) / 2

    tiles.forEach((tile) => {
      const col = lefts.indexOf(Math.round(tile.offsetLeft))
      const amp = (col - mid) * DRIFT_STEP
      if (!amp) return
      // The drift rides an inner span so it never fights the clip-path reveal
      // GSAP puts on the tile itself.
      gsap.fromTo(
        tile.querySelector('.lx-gal-drift'),
        { y: -amp },
        {
          y: amp,
          ease: 'none',
          scrollTrigger: {
            trigger: masonry,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        }
      )
    })

    // Natural-ratio tiles reserve no height, so each lazily-decoded image grows
    // its column and invalidates the scrub's end point. Lazy loading means they
    // land one at a time while scrolling, hence the debounce.
    let settleTimer = 0
    const settle = () => {
      clearTimeout(settleTimer)
      settleTimer = setTimeout(() => {
        if (el.isConnected) ScrollTrigger.refresh()
      }, 140)
    }
    el.querySelectorAll('.lx-gal-img').forEach((img) => {
      if (img.complete) return
      img.addEventListener('load', settle, { once: true })
      img.addEventListener('error', settle, { once: true })
    })
  }, [])

  return (
    <section id="gallery" className="lx-sec lx-sec--ivory lx-gal" ref={scope}>
      <span className="lx-wash lx-wash--gold lx-gal-wash lx-gal-wash--a" aria-hidden="true" />
      <span className="lx-wash lx-wash--green lx-gal-wash lx-gal-wash--b" aria-hidden="true" />

      <div className="lx-ct-wide lx-gal-inner">

        <SectionHead
          eyebrow="Photo Gallery"
          title="Moments We've Crafted"
          lead="A glimpse into the events, celebrations and memories we have been privileged to be part of."
        >
          <Reveal from="up" delay={0.18}>
            <p className="lx-gal-count">
              <span>{photos.length} photographs</span>
              <i aria-hidden="true">·</i>
              <span>{videos.length} films</span>
            </p>
          </Reveal>
        </SectionHead>

        {/* ── Photographs ── */}
        <Reveal className="lx-gal-masonry" from="mask" stagger={0.07} duration={0.95}>
          {photos.map((item, i) => (
            <button
              type="button"
              key={i}
              className={`lx-gal-tile ${item.cls ? `lx-gal-tile--${item.cls}` : ''}`}
              onClick={() => setLbIndex(i)}
              aria-label={`Open ${item.cap} full size`}
              data-cursor="hot"
            >
              <span className="lx-gal-drift">
                <span className="lx-gal-frame">
                  <img className="lx-gal-img" src={item.src} alt={item.cap} loading="lazy" />
                  <span className="lx-gal-scrim" aria-hidden="true" />
                  <span className="lx-gal-meta">
                    <span className="lx-gal-cap">{item.cap}</span>
                    <span className="lx-gal-glyph" aria-hidden="true"><FaExpand /></span>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </Reveal>

        {/* ── Films ── */}
        <div className="lx-gal-films">
          <Reveal from="up" className="lx-gal-films-head">
            <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
            <h3 className="lx-h3 lx-gal-films-title">Behind the Setup</h3>
            <p className="lx-gal-films-note">Three short films from the floor, shot on the night.</p>
          </Reveal>

          <Reveal className="lx-gal-films-grid" from="up" stagger={0.09}>
            {videos.map((v, i) => (
              <button
                type="button"
                key={i}
                className="lx-gal-film"
                onClick={() => setLbIndex(photos.length + i)}
                aria-label={`Play ${v.cap}`}
                data-cursor="hot"
              >
                <span className="lx-gal-film-frame">
                  <video
                    src={v.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="lx-gal-film-thumb"
                  />
                  <span className="lx-gal-film-scrim" aria-hidden="true" />
                  <span className="lx-gal-play" aria-hidden="true"><FaPlay /></span>
                </span>
                <span className="lx-gal-film-cap">
                  <i aria-hidden="true" />
                  {v.cap}
                </span>
              </button>
            ))}
          </Reveal>
        </div>

      </div>

      <Lightbox
        items={allMedia}
        index={lbIndex}
        onClose={() => setLbIndex(null)}
        onIndexChange={setLbIndex}
      />
    </section>
  )
}

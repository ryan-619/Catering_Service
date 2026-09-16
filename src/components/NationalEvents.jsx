import { useState, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { FaExpand, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'
import SplitHeading from './ui/SplitHeading'
import TiltCard from './ui/TiltCard'
import Lightbox from './ui/Lightbox'

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

import s1 from '../assets/samiti/s1.jpg'
import s2 from '../assets/samiti/s2.jpg'
import s3 from '../assets/samiti/s3.jpg'
import s4 from '../assets/samiti/s4.jpg'
import s5 from '../assets/samiti/s5.jpg'
import s6 from '../assets/samiti/s6.jpg'
import s7 from '../assets/samiti/s7.jpg'
import s8 from '../assets/samiti/s8.jpg'
import s9 from '../assets/samiti/s9.jpg'
import s10 from '../assets/samiti/s10.jpg'
import s11 from '../assets/samiti/s11.jpg'
import s12 from '../assets/samiti/s12.jpg'
import s13 from '../assets/samiti/s13.jpg'
import s14 from '../assets/samiti/s14.jpg'
import s15 from '../assets/samiti/s15.jpg'
import s16 from '../assets/samiti/s16.jpg'
import s17 from '../assets/samiti/s17.jpg'

// Dignitaries served at the Rashtriya Karyakari Samiti. Photo order follows the
// numbering supplied with the images; where two people appear in one frame the
// same photo backs both of their cards.
const samitiCards = [
  { img: s1,  name: 'Narendra Modi',        title: 'Prime Minister of India' },
  { img: s2,  name: 'Jagat Prakash Nadda',  title: 'National President, Bharatiya Janata Party' },
  { img: s3,  name: 'Jagat Prakash Nadda',  title: 'National President, Bharatiya Janata Party' },
  { img: s4,  name: 'Sambit Patra',         title: 'National Spokesperson, Bharatiya Janata Party' },
  { img: s5,  name: 'Sambit Patra',         title: 'National Spokesperson, Bharatiya Janata Party' },
  { img: s6,  name: 'Sunil Bhai Ojha',      title: 'PMO Coordinator & Uttar Pradesh Co-in-charge' },
  { img: s7,  name: 'Manohar Lal Khattar',  title: 'Former Chief Minister, Haryana' },
  { img: s8,  name: 'Lalji Tandon',         title: 'Former Governor of Bihar' },
  { img: s9,  name: 'Syed Shahnawaz Hussain', title: 'National Spokesperson & Central Election Committee Member, Bharatiya Janata Party' },
  { img: s10, name: 'Keshav Maurya',        title: 'Deputy Chief Minister, Uttar Pradesh' },
  { img: s12, name: 'Shiv Prakash',         title: 'National Joint General Secretary (Organisation), Bharatiya Janata Party' },
  { img: s11, name: 'Suresh Khanna',        title: 'Cabinet Minister, Government of Uttar Pradesh' },
  { img: s13, name: 'Dr. Mahesh Sharma',    title: 'Former Union Minister of State, Government of India' },
  { img: s14, name: 'Dr. Mahesh Sharma',    title: 'Former Union Minister of State, Government of India' },
  { img: s15, name: 'Sushil Modi',          title: 'Former Deputy Chief Minister, Bihar' },
  { img: s16, name: 'Ashutosh Tandon',      title: 'Former Cabinet Minister' },
  { img: s17, name: 'Prakash Javadekar',    title: 'Chairperson, National Tiger Conservation Authority of India' },
]

// `cap` is optional supporting text the shared Lightbox prints under the frame.
const asImages = (arr, cap) => arr.map((src) => ({ src, type: 'image', cap }))
const asVideos = (arr, cap) => arr.map((src) => ({ src, type: 'video', cap }))

// Each subsection keeps its photos and videos in separate collections so the
// two carousels stay independent of one another.
//
// `badge` is deliberately place + a neutral label: the images carry no verified
// date, so nothing here claims one.
const subsections = [
  {
    key: 'samiti',
    badge: 'Bharatiya Janata Party · National Event',
    title: 'Privileged to Serve at Rashtriya Karyakari Samiti at BJP',
    desc: 'Entrusted with catering for the national executive committee — serving pure vegetarian meals at a gathering of national significance.',
    cards: samitiCards,
    photos: asImages([]),
    videos: asVideos([]),
  },
  {
    key: 'ram-mandir',
    badge: 'Ayodhya · National Event',
    title: 'Blessed to Serve at Ram Mandir',
    desc: 'A moment of devotion and honour — preparing and serving prasad and meals at Shri Ram Janmabhoomi, Ayodhya.',
    photos: asImages([
      rm1, rm2, rm3, rm4, rm5, rm6, rm7, rm8, rm9,
      rm10, rm11, rm12, rm13, rm14, rm15, rm16, rm17, rm18,
    ], 'Shri Ram Janmabhoomi, Ayodhya'),
    videos: asVideos([rmv1, rmv2, rmv3], 'Shri Ram Janmabhoomi, Ayodhya'),
  },
]

/* Stable identity — Reveal keys its effect on the stagger object. `grid:'auto'`
   lets GSAP read the real column count so the wave travels diagonally. */
const GRID_STAGGER = { each: 0.03, from: 'start', grid: 'auto' }

/** Small gold-uppercase label that opens each block inside a subsection. */
function BlockHead({ label, count }) {
  return (
    <div className="lx-ne-block-head">
      <span className="lx-ne-block-title">{label}</span>
      <span className="lx-ne-block-rule" aria-hidden="true" />
      {count && <span className="lx-ne-block-count">{count}</span>}
    </div>
  )
}

/**
 * One carousel of media. `navKey` must be unique per instance — Swiper resolves
 * navigation and pagination with document-wide selectors, so a shared class
 * would make every carousel on the page answer the same pair of arrows.
 */
function MediaCarousel({ items, navKey, perView = 4, onOpen, calm }) {
  if (!items.length) return null

  return (
    <div className="lx-ne-carousel">
      <div className="lx-swiper-wrap lx-ne-stage">
        <div className="lx-ne-clip">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={14}
            slidesPerView={1}
            navigation={{
              prevEl: `.lx-ne-prev-${navKey}`,
              nextEl: `.lx-ne-next-${navKey}`,
            }}
            pagination={{ clickable: true, el: `.lx-ne-dots-${navKey}` }}
            autoplay={calm ? false : { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={items.length > perView + 1}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: Math.min(3, perView), spaceBetween: 14 },
              1024: { slidesPerView: perView, spaceBetween: 18 },
            }}
            className="lx-swiper lx-ne-swiper"
          >
            {items.map((item, i) => (
              <SwiperSlide key={item.src}>
                <button
                  type="button"
                  className={`lx-ne-tile ${item.type === 'video' ? 'lx-ne-tile--video' : ''}`}
                  onClick={() => onOpen(items, i)}
                  data-cursor="hot"
                  aria-label={item.type === 'video' ? `Play film ${i + 1}` : `Enlarge photograph ${i + 1}`}
                >
                  <span className="lx-ne-tile-shot">
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        muted
                        playsInline
                        preload="metadata"
                        className="lx-ne-tile-media"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={`Event ${i + 1}`}
                        className="lx-ne-tile-media"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <span className="lx-ne-tile-veil" aria-hidden="true" />
                    <span className="lx-ne-tile-frame" aria-hidden="true" />
                  </span>

                  <span className="lx-ne-tile-expand" aria-hidden="true"><FaExpand /></span>

                  {item.type === 'video' && (
                    <span className="lx-ne-tile-play" aria-hidden="true"><FaPlay /></span>
                  )}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          type="button"
          className={`lx-arrow lx-arrow--prev lx-ne-prev-${navKey}`}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          className={`lx-arrow lx-arrow--next lx-ne-next-${navKey}`}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className={`lx-dots lx-ne-dots-${navKey}`} />
    </div>
  )
}

export default function NationalEvents() {
  // Read once: the media query result does not change mid-session in practice,
  // and a stable value keeps Swiper from re-initialising.
  const [calm] = useState(() => prefersReducedMotion())

  const [lb, setLb] = useState({ items: [], index: null })

  const openLightbox = useCallback((items, index) => setLb({ items, index }), [])
  const closeLightbox = useCallback(() => setLb((s) => ({ ...s, index: null })), [])
  const changeIndex = useCallback((next) => {
    setLb((s) => ({ ...s, index: typeof next === 'function' ? next(s.index) : next }))
  }, [])

  const scope = useGsapContext((ctx, el) => {
    if (prefersReducedMotion()) return

    // 1 — the two gold washes drift against the scroll, very slowly.
    const drift = (sel, to) =>
      gsap.fromTo(el.querySelectorAll(sel), { yPercent: -to }, {
        yPercent: to, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
      })
    drift('.lx-ne-wash--a', 8)
    drift('.lx-ne-wash--b', -6)

    // 2 — each subsection's gold rule draws itself across as it arrives.
    el.querySelectorAll('.lx-ne-rule').forEach((rule) => {
      gsap.fromTo(rule, { scaleX: 0 }, {
        scaleX: 1, duration: 1.05, ease: 'power3.out',
        scrollTrigger: { trigger: rule, start: 'top 92%', once: true },
      })
    })
  }, [])

  return (
    <section id="national-events" className="lx-sec lx-ne" ref={scope}>
      <span className="lx-wash lx-wash--gold lx-ne-wash lx-ne-wash--a" aria-hidden="true" />
      <span className="lx-wash lx-wash--green lx-ne-wash lx-ne-wash--b" aria-hidden="true" />

      <div className="lx-ct-wide lx-ne-inner">
        <SectionHead
          className="lx-ne-head"
          eyebrow={<span className="lx-foil">National Recognition</span>}
          title="Trusted at National-Level Events"
          lead="Chosen to cater at gatherings of national and spiritual importance — a responsibility we carry with devotion and pride."
        />

        <div className="lx-ne-subs">
          {subsections.map((sub) => (
            <article className="lx-ne-sub" id={sub.key} key={sub.key}>
              <span className="lx-ne-corner lx-ne-corner--tl" aria-hidden="true" />
              <span className="lx-ne-corner lx-ne-corner--br" aria-hidden="true" />

              <header className="lx-ne-sub-head">
                <span className="lx-ne-rule" aria-hidden="true" />

                <Reveal from="up" duration={0.8}>
                  <span className="lx-chip lx-ne-badge">
                    <i className="lx-ne-badge-dia" aria-hidden="true" />
                    {sub.badge}
                  </span>
                </Reveal>

                <div className="lx-ne-sub-grid">
                  <SplitHeading as="h3" className="lx-ne-sub-title" stagger={0.035}>
                    {sub.title}
                  </SplitHeading>

                  <Reveal from="up" delay={0.1}>
                    <p className="lx-ne-sub-desc">{sub.desc}</p>
                  </Reveal>
                </div>
              </header>

              {sub.cards?.length > 0 && (
                <div className="lx-ne-block">
                  <BlockHead label="Dignitaries We Served" count={`${sub.cards.length} Portraits`} />

                  <Reveal
                    as="ul"
                    role="list"
                    className="lx-ne-grid"
                    from="up"
                    duration={0.85}
                    stagger={GRID_STAGGER}
                  >
                    {sub.cards.map((c, i) => (
                      <li className="lx-ne-cell" key={`${c.name}-${i}`}>
                        <TiltCard max={6} scale={1.012} glare innerClassName="lx-ne-card" data-cursor="hot">
                          <figure className="lx-ne-fig">
                            <span className="lx-ne-shot">
                              <img src={c.img} alt={c.name} className="lx-ne-img" loading="lazy" decoding="async" />
                              <span className="lx-ne-shot-veil" aria-hidden="true" />
                            </span>
                            <figcaption className="lx-ne-plate lx-tilt-layer">
                              <span className="lx-ne-name">{c.name}</span>
                              <span className="lx-ne-role">{c.title}</span>
                            </figcaption>
                          </figure>
                        </TiltCard>
                      </li>
                    ))}
                  </Reveal>
                </div>
              )}

              {sub.photos.length > 0 && (
                <div className="lx-ne-block">
                  <BlockHead label="Photos" count={`${sub.photos.length} Photographs`} />
                  <Reveal from="up" duration={0.9}>
                    <MediaCarousel
                      items={sub.photos}
                      navKey={`${sub.key}-photos`}
                      perView={4}
                      onOpen={openLightbox}
                      calm={calm}
                    />
                  </Reveal>
                </div>
              )}

              {sub.videos.length > 0 && (
                <div className="lx-ne-block">
                  <BlockHead label="Videos" count={`${sub.videos.length} Films`} />
                  <Reveal from="up" duration={0.9}>
                    <MediaCarousel
                      items={sub.videos}
                      navKey={`${sub.key}-videos`}
                      perView={3}
                      onOpen={openLightbox}
                      calm={calm}
                    />
                  </Reveal>
                </div>
              )}

              {!sub.cards?.length && sub.photos.length === 0 && sub.videos.length === 0 && (
                <p className="lx-ne-empty">Photos and videos from this event are coming soon.</p>
              )}
            </article>
          ))}
        </div>
      </div>

      <Lightbox
        items={lb.items}
        index={lb.index}
        onClose={closeLightbox}
        onIndexChange={changeIndex}
      />
    </section>
  )
}

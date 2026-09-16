import { Fragment, useEffect, useState } from 'react'
import { FaWhatsapp, FaRing, FaBuilding, FaUsers, FaStar } from 'react-icons/fa'
import { gsap, prefersReducedMotion, isTouch } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import SplitHeading from './ui/SplitHeading'
import MagneticButton from './ui/MagneticButton'
import Marquee from './ui/Marquee'
import CountUp from './ui/CountUp'
import hero1 from '../assets/hero/hero1.jpg'
import hero2 from '../assets/hero/hero2.jpg'
import hero3 from '../assets/hero/hero3.jpg'
import hero4 from '../assets/hero/hero4.jpg'
import hero5 from '../assets/hero/hero5.jpg'
import hero6 from '../assets/hero/hero6.jpg'
import hero7 from '../assets/hero/hero7.jpg'
import hero8 from '../assets/hero/hero8.jpg'

const heroSlides = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
  hero6,
  hero7,
  hero8,
]

const stripItems = [
  { Icon: FaRing, label: 'Weddings' },
  { Icon: FaBuilding, label: 'Corporate Events' },
  { Icon: FaUsers, label: 'Social Gatherings' },
  { Icon: FaStar, label: 'VIP Parties' },
]

/* Ken Burns cadence. Each photo owns HOLD seconds of the loop; the incoming
   photo cross-fades over FADE while the outgoing one is still fully opaque
   underneath, so there is never a dip to black between frames. */
const HOLD = 5.5
const FADE = 1.4
/* Drift direction per slide so consecutive photos never push the same way. */
const DRIFT = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
const DX = 12
const DY = 8
const SCALE_TO = 1.09

export default function Hero({ onBookNow }) {
  /* The service strip wraps badly on a phone; below 768px it runs as a ticker
     instead. matchMedia rather than CSS because the markup itself changes. */
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = (e) => setNarrow(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const scope = useGsapContext((ctx, root) => {
    if (prefersReducedMotion()) return

    const slides = Array.from(root.querySelectorAll('.lx-hero-slide'))
    const imgs = slides.map((s) => s.querySelector('.lx-hero-img'))
    const n = slides.length
    const loop = n * HOLD

    /* ── 1 · Ken Burns cross-fade slideshow ──
       One repeating timeline drives all eight photos, so the fades and the
       slow scale can never drift apart the way eight CSS animations do. */
    if (n) {
      gsap.set(slides, { autoAlpha: 0, zIndex: 0 })
      gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 })

      const kb = (i) => {
        const [dx, dy] = DRIFT[i % DRIFT.length]
        return {
          from: { scale: 1, x: dx * DX, y: dy * DY },
          to: { scale: SCALE_TO, x: -dx * DX, y: -dy * DY },
        }
      }

      const show = gsap.timeline({ repeat: -1 })

      for (let i = 0; i < n; i++) {
        const cur = slides[i]
        const next = slides[(i + 1) % n]
        const at = (i + 1) * HOLD - FADE

        /* immediateRender:false on every one of these — a fromTo parked later
           in a timeline otherwise slams its start values on at build time,
           which would blank the first photo until the loop caught up. */
        show
          .set(next, { zIndex: 3 }, at)
          .set(cur, { zIndex: 2 }, at)
          .fromTo(
            next,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: FADE, ease: 'power1.inOut', immediateRender: false },
            at
          )
          .set(cur, { autoAlpha: 0, zIndex: 0 }, at + FADE)

        /* Slides 1..n-1 scale across their whole visible life: the fade-in
           plus the hold. Slide 0's life straddles the loop seam, so it is
           split in two below. */
        if (i + 1 < n) {
          const k = kb(i + 1)
          show.fromTo(
            imgs[i + 1],
            k.from,
            { ...k.to, duration: HOLD + FADE, ease: 'none', immediateRender: false },
            at
          )
        }
      }

      /* Slide 0 straddles the repeat boundary. Split its Ken Burns at the seam
         and hand the exact mid-values over, so the loop is continuous — the
         reset to `from` happens while it is still fully transparent. */
      const k0 = kb(0)
      const f = FADE / (HOLD + FADE)
      const mid = {
        scale: k0.from.scale + (k0.to.scale - k0.from.scale) * f,
        x: k0.from.x + (k0.to.x - k0.from.x) * f,
        y: k0.from.y + (k0.to.y - k0.from.y) * f,
      }
      show.fromTo(
        imgs[0],
        k0.from,
        { ...mid, duration: FADE, ease: 'none', immediateRender: false },
        loop - FADE
      )
      show.fromTo(imgs[0], mid, { ...k0.to, duration: HOLD, ease: 'none' }, 0)
    }

    /* ── 2 · Entrance, as one deliberate timeline ──
       The headline is SplitHeading's own per-word reveal (delay 0.3); every
       other beat is timed around it from here. */
    const intro = gsap
      .timeline({ delay: 0.12, defaults: { ease: 'power3.out' } })
      .from('.lx-hero-eyebrow', { yPercent: 60, autoAlpha: 0, duration: 0.7 }, 0)
      .from('.lx-hero-rule', { scaleX: 0, duration: 0.95, ease: 'power4.inOut' }, 0.12)
      .from('.lx-hero-orn', { autoAlpha: 0, scale: 0.82, rotate: -18, duration: 1.1 }, 0.35)
      .from('.lx-hero-deva', { y: 24, autoAlpha: 0, duration: 0.8 }, 0.75)
      .from('.lx-hero-lede', { y: 24, autoAlpha: 0, duration: 0.8 }, 0.88)
      .from('.lx-hero-strip-in', { yPercent: 100, autoAlpha: 0, duration: 0.85 }, 0.92)
      .from('.lx-hero-cta > *', { yPercent: 50, scale: 0.94, autoAlpha: 0, duration: 0.7, stagger: 0.09 }, 1.04)
      .from('.lx-hero-stat', { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 1.16)
      .from('.lx-hero-cue-in', { autoAlpha: 0, y: -10, duration: 0.7 }, 1.3)

    /* Safety net. Every beat above is a `.from()`, which parks its target at
       `autoAlpha: 0` the instant it is built. If the timeline never gets to
       run — a tab opened in the background throttles rAF hard enough to stall
       it — the hero would sit there permanently blank. Force it to its end
       state if it has not started moving a few seconds in. */
    gsap.delayedCall(5, () => {
      if (intro.progress() === 0) intro.progress(1)
    })

    /* ── 3 · Scroll cue: dot travelling down the gold rule ── */
    gsap
      .timeline({ repeat: -1, repeatDelay: 0.5 })
      .fromTo('.lx-hero-cue-dot', { y: 0, autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24, ease: 'none' }, 0)
      .to('.lx-hero-cue-dot', { y: 30, duration: 1, ease: 'power1.in' }, 0)
      .to('.lx-hero-cue-dot', { autoAlpha: 0, duration: 0.3, ease: 'none' }, 0.7)

    /* ── 4 · Parallax exit — background sinks, copy lifts and softens ── */
    const exit = { trigger: root, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.lx-hero-slides', { yPercent: 12, ease: 'none', scrollTrigger: { ...exit } })
    gsap.to('.lx-hero-copy', { yPercent: -5, opacity: 0.3, ease: 'none', scrollTrigger: { ...exit } })
    gsap.to('.lx-hero-cue', {
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: '+=200', scrub: true },
    })

    /* ── 5 · Pointer depth. Three layers, three speeds, real perspective. ── */
    if (isTouch()) return undefined

    const layers = [
      ['.lx-hero-slides', 8],
      ['.lx-hero-copy', 16],
      ['.lx-hero-orn', 28],
    ]
      .map(([sel, amt]) => {
        const el = root.querySelector(sel)
        if (!el) return null
        return {
          amt,
          x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
        }
      })
      .filter(Boolean)

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      layers.forEach((l) => { l.x(-nx * l.amt); l.y(-ny * l.amt) })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const goNext = () => {
    if (typeof window !== 'undefined' && window.lxScrollTo) {
      window.lxScrollTo('#about', { offset: -70 })
    }
  }

  return (
    <section id="hero" className="lx-hero" ref={scope}>

      {/* ── Slideshow background ── */}
      <div className="lx-hero-bg" aria-hidden="true">
        <div className="lx-hero-slides">
          {heroSlides.map((slide, i) => (
            <div key={i} className="lx-hero-slide">
              <img
                className="lx-hero-img"
                src={slide}
                alt=""
                decoding="async"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchpriority={i === 0 ? 'high' : 'low'}
              />
            </div>
          ))}
        </div>
      </div>
      <span className="lx-hero-scrim" aria-hidden="true" />
      <span className="lx-hero-vig" aria-hidden="true" />

      {/* ── Decorative gold ornament (deepest parallax layer) ── */}
      <div className="lx-hero-ornw" aria-hidden="true">
        <div className="lx-hero-orn">
          <span className="lx-wash lx-wash--gold" />
          <i className="lx-hero-orn-ring" />
          <i className="lx-hero-orn-ring lx-hero-orn-ring--in" />
          <b className="lx-hero-orn-gem" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="lx-hero-body">
        <div className="lx-ct">
          <div className="lx-hero-copy">
            <span className="lx-eyebrow lx-hero-eyebrow">Since 1982 · Kanpur</span>
            <span className="lx-hero-rule" aria-hidden="true" />

            <SplitHeading as="h1" className="lx-hero-title" delay={0.3} stagger={0.05}>
              {'Pure Vegetarian.\nUnforgettable Flavours.'}
            </SplitHeading>

            <div className="lx-deva lx-hero-deva">
              लाला त्रिवेदी कैटरिंग सर्विस — आपके हर उत्सव का साथी
            </div>

            <p className="lx-hero-lede">
              Crafting exceptional vegetarian culinary experiences for weddings,
              corporate events, and celebrations across Kanpur.
            </p>

            <div className="lx-btn-row lx-hero-cta">
              <MagneticButton variant="gold" size="lg" onClick={onBookNow}>
                Get a Free Quote
              </MagneticButton>
              <MagneticButton
                variant="wa"
                size="lg"
                href="https://wa.me/919936485155"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp /> WhatsApp Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating stats ── */}
      <div className="lx-hero-stats">
        <div className="lx-hero-stat lx-glass">
          <div className="lx-hero-stat-n lx-foil">
            <CountUp to={42} separator={false} duration={1.6} />
            <span className="lx-hero-stat-suf">+</span>
          </div>
          <div className="lx-hero-stat-l">Years of Excellence</div>
        </div>
        <div className="lx-hero-stat lx-glass">
          <div className="lx-hero-stat-n lx-foil">
            <CountUp to={100} separator={false} duration={1.6} />
            <span className="lx-hero-stat-suf">%</span>
          </div>
          <div className="lx-hero-stat-l">Pure Vegetarian</div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="lx-hero-cue">
        <button
          type="button"
          className="lx-hero-cue-in"
          onClick={goNext}
          aria-label="Scroll to the next section"
          data-cursor="hot"
        >
          <span className="lx-hero-cue-label">Scroll</span>
          <span className="lx-hero-cue-line" aria-hidden="true">
            <i className="lx-hero-cue-dot" />
          </span>
        </button>
      </div>

      {/* ── Service strip ── */}
      <div className="lx-hero-strip">
        <div className="lx-hero-strip-in">
          {narrow ? (
            <Marquee speed={30} gap={26}>
              {stripItems.map(({ Icon, label }) => (
                <Fragment key={label}>
                  <span className="lx-hero-strip-item"><Icon /> {label}</span>
                  <i className="lx-hero-strip-dot" aria-hidden="true" />
                </Fragment>
              ))}
            </Marquee>
          ) : (
            <div className="lx-ct-wide lx-hero-strip-row">
              {stripItems.map(({ Icon, label }) => (
                <span className="lx-hero-strip-item" key={label}><Icon /> {label}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

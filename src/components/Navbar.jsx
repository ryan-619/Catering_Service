import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaLeaf, FaPhoneAlt } from 'react-icons/fa'
import logoBase64 from '../assets/logo.js'
import MagneticButton from './ui/MagneticButton'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsapSetup'

/**
 * Sticky header.
 *
 * The bar is transparent (a soft green scrim, so light type survives whatever
 * photograph the hero is showing) while the page is at the top, then morphs
 * into a frosted ivory bar with a gold hairline past ~80px of scroll. Both the
 * background fade and the 86px → 66px compression are GSAP-tweened so the
 * change reads as a morph rather than a class snap.
 *
 * Layout trick: the header carries `margin-bottom: calc(-1 * var(--lx-navh))`,
 * so it contributes zero height to the flow and floats over the hero. Because
 * the tween drives `--lx-navh` (which feeds BOTH `height` and that negative
 * margin) the compression never shifts a single pixel of the page below.
 */

const LINKS = [
  { label: 'Founder', id: 'founder' },
  { label: 'Services', id: 'services' },
  { label: 'Cuisines', id: 'cuisines' },
  { label: 'Our Honour', id: 'personalities' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Reviews', id: 'testi' },
  { label: 'Seva', id: 'charity' },
  { label: 'FAQs', id: 'faq' },
]

const PHONES = [
  { label: '+91-9936485155', tel: 'tel:+919936485155' },
  { label: '+91-8299504889', tel: 'tel:+918299504889' },
]

const SOLID_AT = 80

/** Lenis owns the scroll; never call window.scrollTo directly. */
function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (typeof window.lxScrollTo === 'function') window.lxScrollTo(el, { offset: -70 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Lockup({ compact = false }) {
  return (
    <>
      <span className="lx-nav-mark" aria-hidden="true">
        <img src={`data:image/png;base64,${logoBase64}`} alt="" />
      </span>
      <span className={`lx-nav-name ${compact ? 'lx-nav-name--compact' : ''}`}>
        <b>Lala Trivedi Catering</b>
        <i>Only Veg Food Series · Since 1982</i>
      </span>
    </>
  )
}

export default function Navbar({ onBookNow }) {
  const [mobOpen, setMobOpen] = useState(false)
  const [active, setActive] = useState('')

  const navRef = useRef(null)
  const skinRef = useRef(null)
  const scrimRef = useRef(null)
  const panelRef = useRef(null)
  const panelCtx = useRef(null)
  const hasOpened = useRef(false)

  const closeMob = useCallback(() => setMobOpen(false), [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    closeMob()
    // Let the overlay start sliding out before the scroll begins.
    window.setTimeout(() => scrollToId(id), mobOpen ? 220 : 0)
  }

  const handleHome = (e) => {
    e.preventDefault()
    closeMob()
    scrollToId('hero')
  }

  const handleBook = () => {
    closeMob()
    onBookNow?.()
  }

  /* ── Scroll state: transparent → frosted, 86px → 66px ────────────────── */
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const ctx = gsap.context(() => {
      const skin = skinRef.current
      const scrim = scrimRef.current
      const reduce = prefersReducedMotion()
      const size = { h: 0 }
      let solid = null

      const target = (isSolid) => {
        const v = getComputedStyle(nav).getPropertyValue(
          isSolid ? '--lx-navh-tight' : '--lx-navh-rest'
        )
        return parseFloat(v) || (isSolid ? 66 : 86)
      }

      const apply = (next, instant) => {
        const same = solid === next
        solid = next
        nav.classList.toggle('is-solid', next)
        const d = instant || reduce ? 0 : 0.55
        size.h = size.h || target(next)
        gsap.to(size, {
          h: target(next),
          duration: same ? 0 : d,
          ease: 'power3.out',
          overwrite: true,
          onUpdate: () => nav.style.setProperty('--lx-navh', `${size.h}px`),
          onComplete: () => nav.style.setProperty('--lx-navh', `${size.h}px`),
        })
        gsap.to(skin, { opacity: next ? 1 : 0, duration: d, ease: 'power2.out', overwrite: true })
        gsap.to(scrim, { opacity: next ? 0 : 1, duration: d * 0.7, ease: 'power2.out', overwrite: true })
      }

      apply(window.scrollY > SOLID_AT, true)

      ScrollTrigger.create({
        start: `top -${SOLID_AT}`,
        end: 'max',
        onToggle: (self) => apply(self.isActive, false),
      })

      /* Active-section dot + underline */
      LINKS.forEach(({ id }) => {
        const sec = document.getElementById(id)
        if (!sec) return
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => { if (self.isActive) setActive(id) },
        })
      })

      const onResize = () => apply(solid, true)
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }, nav)

    return () => ctx.revert()
  }, [])

  /* ── Mobile overlay: slide-in + staggered links ──────────────────────── */
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const ctx = gsap.context((self) => {
      const items = self.selector('[data-lx-navitem]')
      const reduce = prefersReducedMotion()

      gsap.set(panel, { xPercent: 100, visibility: 'hidden' })

      self.add('openPanel', () => {
        gsap.killTweensOf([panel, items])
        gsap.set(panel, { visibility: 'visible' })
        if (reduce) { gsap.set(panel, { xPercent: 0 }); gsap.set(items, { y: 0, opacity: 1 }); return }
        gsap.timeline()
          .fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.62, ease: 'power3.out' })
          .fromTo(
            items,
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.055, ease: 'power3.out' },
            '-=0.34'
          )
      })

      self.add('closePanel', () => {
        gsap.killTweensOf([panel, items])
        if (reduce) { gsap.set(panel, { xPercent: 100, visibility: 'hidden' }); return }
        gsap.to(panel, {
          xPercent: 100,
          duration: 0.44,
          ease: 'power3.in',
          onComplete: () => gsap.set(panel, { visibility: 'hidden' }),
        })
      })
    }, panel)

    panelCtx.current = ctx
    return () => { panelCtx.current = null; ctx.revert() }
  }, [])

  useEffect(() => {
    const ctx = panelCtx.current
    if (!ctx) return
    if (mobOpen) { hasOpened.current = true; ctx.openPanel() }
    else if (hasOpened.current) ctx.closePanel()
  }, [mobOpen])

  /* ── Scroll lock + Escape while the overlay is open ──────────────────── */
  useEffect(() => {
    if (!mobOpen) return
    const lenis = window.lxLenis
    if (lenis) lenis.stop()
    else document.body.style.overflow = 'hidden'

    const onKey = (e) => { if (e.key === 'Escape') closeMob() }
    window.addEventListener('keydown', onKey)

    return () => {
      if (lenis) lenis.start()
      else document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [mobOpen, closeMob])

  const burger = (open, onClick, label) => (
    <button
      type="button"
      className={`lx-nav-burger ${open ? 'is-open' : ''}`}
      onClick={onClick}
      aria-label={label}
      aria-expanded={open}
      data-cursor="hot"
    >
      <i /><i /><i />
    </button>
  )

  return (
    <>
      <header className="lx-nav" ref={navRef}>
        <span className="lx-nav-scrim" ref={scrimRef} aria-hidden="true" />
        <span className="lx-nav-skin" ref={skinRef} aria-hidden="true" />

        <div className="lx-ct-wide lx-nav-in">
          <a href="#hero" className="lx-nav-logo" onClick={handleHome} data-cursor="hot">
            <Lockup />
          </a>

          <nav className="lx-nav-nav" aria-label="Primary">
            <ul className="lx-nav-links">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`lx-nav-link ${active === l.id ? 'is-active' : ''}`}
                    onClick={(e) => handleNavClick(e, l.id)}
                    aria-current={active === l.id ? 'true' : undefined}
                  >
                    <span className="lx-nav-lbl">
                      <span className="lx-nav-dot" aria-hidden="true" />
                      {l.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lx-nav-cta">
            <MagneticButton variant="gold" size="sm" className="lx-nav-book" onClick={handleBook}>
              Book Now
            </MagneticButton>
            {burger(false, () => setMobOpen(true), 'Open menu')}
          </div>
        </div>
      </header>

      {createPortal(
        <aside
          className="lx-nav-panel"
          ref={panelRef}
          aria-hidden={!mobOpen}
          aria-label="Menu"
        >
          <span className="lx-wash lx-wash--gold lx-nav-panel-wash" aria-hidden="true" />

          <div className="lx-nav-panel-top">
            <span className="lx-nav-logo lx-nav-logo--panel" data-lx-navitem>
              <Lockup compact />
            </span>
            {burger(true, closeMob, 'Close menu')}
          </div>

          <nav className="lx-nav-panel-nav" aria-label="Mobile">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-lx-navitem
                className={`lx-nav-plink ${active === l.id ? 'is-active' : ''}`}
                onClick={(e) => handleNavClick(e, l.id)}
              >
                <span className="lx-nav-pnum" aria-hidden="true">
                  {String(LINKS.indexOf(l) + 1).padStart(2, '0')}
                </span>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="lx-nav-panel-foot">
            <span className="lx-orn" data-lx-navitem><i /><b /><i /></span>

            <div className="lx-nav-panel-tel" data-lx-navitem>
              {PHONES.map((p) => (
                <a key={p.tel} href={p.tel}>
                  <FaPhoneAlt aria-hidden="true" />
                  {p.label}
                </a>
              ))}
            </div>

            <span className="lx-nav-panel-cta" data-lx-navitem>
              <MagneticButton variant="gold" onClick={handleBook}>Book Now</MagneticButton>
            </span>

            <p className="lx-nav-panel-veg" data-lx-navitem>
              <FaLeaf aria-hidden="true" />
              100% Pure Vegetarian · Serving Kanpur Since 1982
            </p>
          </div>
        </aside>,
        document.body
      )}
    </>
  )
}

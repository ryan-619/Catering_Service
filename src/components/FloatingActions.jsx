import { useLayoutEffect, useRef, useState } from 'react'
import { FaWhatsapp, FaPhoneAlt, FaRegCalendarCheck, FaPlus } from 'react-icons/fa'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'

const WA = 'https://wa.me/919936485155?text=Hello! I would like to enquire about catering for my event.'
const TEL = 'tel:+919936485155'

/**
 * Persistent conversion cluster.
 *
 * A catering enquiry is a phone-call business, so the two numbers stay one tap
 * away for the whole scroll. It stays hidden over the hero — where the page
 * already shows both CTAs — and flies in once the visitor is past it, so the
 * first screen is not cluttered.
 */
export default function FloatingActions({ onBookNow }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)

  useLayoutEffect(() => {
    const el = wrap.current
    if (!el) return
    if (prefersReducedMotion()) { gsap.set(el, { autoAlpha: 1, y: 0 }); return }

    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0, y: 26 })
      gsap.to(el, {
        autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: document.body, start: '88% top', end: 'max', toggleActions: 'play none none reverse' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div className={`lx-fab ${open ? 'is-open' : ''}`} ref={wrap}>
      <div className="lx-fab-items">
        <button
          type="button"
          className="lx-fab-btn lx-fab-btn--book"
          onClick={() => { setOpen(false); onBookNow?.() }}
          data-cursor="hot"
        >
          <FaRegCalendarCheck aria-hidden="true" />
          <span className="lx-fab-label">Get a Quote</span>
        </button>

        <a href={TEL} className="lx-fab-btn lx-fab-btn--call" data-cursor="hot">
          <FaPhoneAlt aria-hidden="true" />
          <span className="lx-fab-label">Call Us</span>
        </a>

        <a href={WA} target="_blank" rel="noreferrer" className="lx-fab-btn lx-fab-btn--wa" data-cursor="hot">
          <FaWhatsapp aria-hidden="true" />
          <span className="lx-fab-label">WhatsApp</span>
        </a>
      </div>

      <button
        type="button"
        className="lx-fab-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        data-cursor="hot"
      >
        <span className="lx-fab-pulse" aria-hidden="true" />
        <FaPlus aria-hidden="true" />
      </button>
    </div>
  )
}

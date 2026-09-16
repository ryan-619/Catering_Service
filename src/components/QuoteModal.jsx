import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaWhatsapp, FaPhoneAlt, FaLeaf } from 'react-icons/fa'
import logoBase64 from '../assets/logo.js'
import MagneticButton from './ui/MagneticButton'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { submitBooking } from '../api/api'

/**
 * Free-quote / booking modal.
 *
 * Rendered through a portal on document.body so no section's `overflow: clip`
 * can crop it and so it always outranks the sticky header.
 *
 * Layout is two-part above 760px — a deep-green rail carrying the brand mark,
 * one line of reassurance and the phone numbers, with the form on ivory beside
 * it. Below 760px the rail collapses into a slim strip above the form.
 *
 * Behaviour contract: Escape and backdrop close it, Lenis is stopped while it
 * is open (body `overflow:hidden` alone is not enough — Lenis runs its own
 * wheel handler), focus moves to the panel on open, is trapped on Tab and is
 * handed back to whatever opened the modal on close.
 */

const PHONES = [
  { label: '+91-9936485155', tel: 'tel:+919936485155' },
  { label: '+91-8299504889', tel: 'tel:+918299504889' },
]

const WA_HREF = 'https://wa.me/919936485155?text=Hello! I would like to book catering.'

const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Birthday / Anniversary',
  'Pooja / Religious Function',
  'Social Gathering',
  'VIP Private Party',
  'Other',
]

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export default function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', eventType: '', eventDate: '', guests: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  // Purely presentational: lets the required fields show inline errors once the
  // visitor has actually tried to send. The validation itself is unchanged.
  const [tried, setTried] = useState(false)

  const uid = useId()
  const titleId = `${uid}-title`
  const doneId = `${uid}-done`

  const panelRef = useRef(null)
  const tickRef = useRef(null)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)

  const reduce = typeof window !== 'undefined' && prefersReducedMotion()

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setTried(true)
    if (!form.name || !form.phone || !form.eventType) {
      setError('Please fill in name, phone and event type.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await submitBooking(form)
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', eventType: '', eventDate: '', guests: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = useCallback(() => {
    setSuccess(false)
    setError('')
    setTried(false)
    onClose()
  }, [onClose])

  // Keep a stable handle on the latest close callback so the open/close effect
  // below can depend on `isOpen` alone — re-running it would restart Lenis and
  // steal focus on every parent render.
  useEffect(() => { closeRef.current = handleClose }, [handleClose])

  /* ── open: scroll lock, focus move, Escape, focus trap ───────────── */
  useEffect(() => {
    if (!isOpen) return

    triggerRef.current = document.activeElement
    window.lxLenis?.stop()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 30)

    const trapTab = (e) => {
      const root = panelRef.current
      if (!root) return
      const nodes = Array.from(root.querySelectorAll(FOCUSABLE))
        .filter((n) => n.offsetWidth > 0 || n.offsetHeight > 0 || n === document.activeElement)
      if (!nodes.length) { e.preventDefault(); root.focus(); return }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement
      const inside = root.contains(active)
      if (e.shiftKey) {
        if (!inside || active === first || active === root) { e.preventDefault(); last.focus() }
      } else if (!inside || active === last) {
        e.preventDefault(); first.focus()
      }
    }

    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current?.() }
      else if (e.key === 'Tab') trapTab(e)
    }

    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      window.lxLenis?.start()
      document.body.style.overflow = prevOverflow
      const trigger = triggerRef.current
      if (trigger && typeof trigger.focus === 'function' && document.contains(trigger)) trigger.focus()
    }
  }, [isOpen])

  /* ── success: the gold tick draws itself ─────────────────────────── */
  useLayoutEffect(() => {
    const el = tickRef.current
    if (!success || !el) return
    const strokes = el.querySelectorAll('.lx-qm-draw')
    if (reduce) { gsap.set(strokes, { strokeDashoffset: 0 }); return }
    const ctx = gsap.context(() => {
      const ring = el.querySelector('.lx-qm-tick-ring')
      const check = el.querySelector('.lx-qm-tick-check')
      gsap.set(strokes, { strokeDashoffset: 1 })
      gsap.timeline()
        .to(ring, { strokeDashoffset: 0, duration: 0.66, ease: 'power2.inOut' })
        .to(check, { strokeDashoffset: 0, duration: 0.38, ease: 'power2.out' }, '-=0.16')
    }, el)
    return () => ctx.revert()
  }, [success, reduce])

  if (typeof document === 'undefined') return null

  const missing = {
    name: tried && !form.name,
    phone: tried && !form.phone,
    eventType: tried && !form.eventType,
  }

  const fieldProps = (name) => ({
    id: `${uid}-${name}`,
    name,
    value: form[name],
    onChange: handle,
    className: 'lx-qm-in',
  })

  const backdropIn = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.12 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.28 } }

  const panelIn = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.12 } }
    : {
        initial: { opacity: 0, scale: 0.94, y: 34 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.975, y: 14, transition: { duration: 0.2, ease: [0.65, 0, 0.35, 1] } },
        transition: { type: 'spring', stiffness: 250, damping: 26, mass: 0.9 },
      }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lx-qm"
          {...backdropIn}
          onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose() }}
        >
          <motion.div
            className={`lx-qm-panel ${success ? 'is-done' : ''}`}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={success ? doneId : titleId}
            {...panelIn}
          >
            <button className="lx-qm-x" type="button" onClick={handleClose} aria-label="Close" data-cursor="hot">
              <FaTimes aria-hidden="true" />
            </button>

            {/* ── left rail / mobile strip ── */}
            <aside className="lx-qm-rail">
              <div className="lx-qm-mark">
                <img src={`data:image/png;base64,${logoBase64}`} alt="" loading="lazy" />
                <span className="lx-qm-mark-tx">
                  <b>Lala Trivedi Catering</b>
                  <i>Only Veg Food Series · Since 1982</i>
                </span>
              </div>

              <div className="lx-qm-rail-mid">
                <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
                <p className="lx-qm-assure">
                  <FaLeaf className="lx-qm-leaf" aria-hidden="true" />
                  Pure vegetarian · Since 1982 · We reply within 24 hours
                </p>
              </div>

              <div className="lx-qm-phones">
                <span className="lx-qm-phones-k">Prefer to talk?</span>
                {PHONES.map((p) => (
                  <a key={p.tel} className="lx-qm-phone" href={p.tel} data-cursor="hot">
                    <FaPhoneAlt aria-hidden="true" />
                    <span>{p.label}</span>
                  </a>
                ))}
              </div>
            </aside>

            {/* ── right body ── */}
            <div className="lx-qm-body">
              {success ? (
                <div className="lx-qm-done" role="status" aria-live="polite">
                  <svg className="lx-qm-tick" ref={tickRef} viewBox="0 0 72 72" aria-hidden="true">
                    <circle
                      className="lx-qm-draw lx-qm-tick-ring"
                      cx="36" cy="36" r="31" pathLength="1"
                    />
                    <path
                      className="lx-qm-draw lx-qm-tick-check"
                      d="M22 37.5 L32 47.5 L51 26" pathLength="1"
                    />
                  </svg>

                  <h4 className="lx-qm-done-h" id={doneId}>Request Sent!</h4>
                  <p className="lx-qm-done-p">
                    We will contact you within 24 hours.
                  </p>
                  <p className="lx-qm-done-eta">
                    <span className="lx-chip lx-chip--green">Reply within 24 hours</span>
                  </p>

                  <a className="lx-qm-wa" href={WA_HREF} target="_blank" rel="noreferrer" data-cursor="hot">
                    <FaWhatsapp aria-hidden="true" />
                    <span>You can also WhatsApp us at +91-9936485155</span>
                  </a>

                  <div className="lx-qm-done-act">
                    <MagneticButton variant="ghost" onClick={handleClose}>Close</MagneticButton>
                  </div>
                </div>
              ) : (
                <>
                  <header className="lx-qm-head">
                    <span className="lx-eyebrow">Book Now</span>
                    <h3 className="lx-qm-title" id={titleId}>Request a Quote</h3>
                    <p className="lx-qm-sub">Fill in your details and we will get back within 24 hours!</p>
                  </header>

                  {error && (
                    <div className="lx-qm-alert" role="alert">{error}</div>
                  )}

                  <form
                    className="lx-qm-form"
                    noValidate
                    onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
                  >
                    <div className="lx-qm-f" style={{ '--i': 0 }} data-filled={form.name ? 'on' : 'off'} data-bad={missing.name ? 'on' : 'off'}>
                      <input
                        type="text"
                        placeholder="Your full name"
                        aria-required="true"
                        aria-invalid={missing.name || undefined}
                        aria-describedby={missing.name ? `${uid}-name-e` : undefined}
                        {...fieldProps('name')}
                      />
                      <label className="lx-qm-lb" htmlFor={`${uid}-name`}>
                        Name <span className="lx-qm-req" aria-hidden="true">*</span>
                      </label>
                      {missing.name && <p className="lx-qm-fe" id={`${uid}-name-e`}>Please tell us your name.</p>}
                    </div>

                    <div className="lx-qm-f" style={{ '--i': 1 }} data-filled={form.phone ? 'on' : 'off'} data-bad={missing.phone ? 'on' : 'off'}>
                      <input
                        type="tel"
                        placeholder="+91 xxxxx xxxxx"
                        aria-required="true"
                        aria-invalid={missing.phone || undefined}
                        aria-describedby={missing.phone ? `${uid}-phone-e` : undefined}
                        {...fieldProps('phone')}
                      />
                      <label className="lx-qm-lb" htmlFor={`${uid}-phone`}>
                        Phone <span className="lx-qm-req" aria-hidden="true">*</span>
                      </label>
                      {missing.phone && <p className="lx-qm-fe" id={`${uid}-phone-e`}>We need a number to call you back.</p>}
                    </div>

                    <div className="lx-qm-f lx-qm-f--wide" style={{ '--i': 2 }} data-filled={form.email ? 'on' : 'off'}>
                      <input type="email" placeholder="you@example.com" {...fieldProps('email')} />
                      <label className="lx-qm-lb" htmlFor={`${uid}-email`}>Email (optional)</label>
                    </div>

                    <div className="lx-qm-f lx-qm-f--wide lx-qm-f--sel" style={{ '--i': 3 }} data-filled={form.eventType ? 'on' : 'off'} data-bad={missing.eventType ? 'on' : 'off'}>
                      <select
                        aria-required="true"
                        aria-invalid={missing.eventType || undefined}
                        aria-describedby={missing.eventType ? `${uid}-eventType-e` : undefined}
                        {...fieldProps('eventType')}
                      >
                        <option value="">Select event type…</option>
                        {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <label className="lx-qm-lb" htmlFor={`${uid}-eventType`}>
                        Event Type <span className="lx-qm-req" aria-hidden="true">*</span>
                      </label>
                      <svg className="lx-qm-caret" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5 11 1.5" /></svg>
                      {missing.eventType && <p className="lx-qm-fe" id={`${uid}-eventType-e`}>Choose the kind of event.</p>}
                    </div>

                    <div className="lx-qm-f" style={{ '--i': 4 }} data-filled={form.eventDate ? 'on' : 'off'}>
                      <input type="date" {...fieldProps('eventDate')} />
                      <label className="lx-qm-lb lx-qm-lb--fixed" htmlFor={`${uid}-eventDate`}>Event Date</label>
                    </div>

                    <div className="lx-qm-f" style={{ '--i': 5 }} data-filled={form.guests ? 'on' : 'off'}>
                      <input type="number" placeholder="~100" min="0" {...fieldProps('guests')} />
                      <label className="lx-qm-lb" htmlFor={`${uid}-guests`}>No. of Guests</label>
                    </div>

                    <div className="lx-qm-f lx-qm-f--wide lx-qm-f--area" style={{ '--i': 6 }} data-filled={form.message ? 'on' : 'off'}>
                      <textarea
                        rows={3}
                        placeholder="Menu preferences, Jain food, event details…"
                        {...fieldProps('message')}
                      />
                      <label className="lx-qm-lb" htmlFor={`${uid}-message`}>Requirements</label>
                    </div>

                    <div className="lx-qm-act" style={{ '--i': 7 }}>
                      <MagneticButton
                        variant="gold"
                        size="lg"
                        type="submit"
                        className="lx-qm-submit"
                        disabled={loading}
                        aria-busy={loading || undefined}
                      >
                        {loading ? (
                          <><span className="lx-qm-spin" aria-hidden="true" />Sending...</>
                        ) : 'Send Enquiry →'}
                      </MagneticButton>

                      <a className="lx-qm-wa" href={WA_HREF} target="_blank" rel="noreferrer" data-cursor="hot">
                        <FaWhatsapp aria-hidden="true" />
                        <span>Or Chat on WhatsApp</span>
                      </a>

                      <p className="lx-qm-note">
                        <span className="lx-qm-req" aria-hidden="true">*</span> Required. No spam, ever — we only use this to quote your event.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

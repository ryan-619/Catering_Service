import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsapSetup'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import MagneticButton from './ui/MagneticButton'

const faqs = [
  { q: 'Do you serve only vegetarian food?', a: 'Yes — absolutely. Lala Trivedi Catering Service serves ONLY vegetarian food. This is our founding commitment since 1982. We do not handle any non-vegetarian ingredients. We also offer dedicated Jain food options.' },
  { q: 'What types of events do you cater to?', a: 'We cater to weddings, corporate events, birthday parties, anniversaries, Pooja functions, festivals, community gatherings, and all types of social events in and around Kanpur, U.P.' },
  { q: 'Can you provide Jain food options?', a: 'Yes. We cater to Jain dietary requirements with dedicated preparation. Please mention your requirements when booking and we will ensure complete compliance.' },
  { q: 'Do you offer tasting sessions?', a: 'Yes. We offer menu tasting sessions at our Kanpur office so you can experience our food quality before making a decision. Contact us to schedule.' },
  { q: 'What is your service area?', a: 'We are based in Kanpur, U.P. and serve events across Kanpur and surrounding areas. Contact us for events outside Kanpur to discuss logistics.' },
  { q: 'How do I get a quote or book?', a: 'Call us at +91-9936485155 or +91-8299504889, WhatsApp at +91-9936485155, or fill out the booking form on this page. We respond within 24 hours.' },
]

export default function Faq({ onBookNow }) {
  const [openIndex, setOpenIndex] = useState(0)

  const rootRef = useRef(null)
  const panelsRef = useRef([])
  /* which row was open on the previous render, and whether a human has ever
     clicked — the first paint (and StrictMode's replay of it) must be silent. */
  const prevOpen = useRef(openIndex)
  const interacted = useRef(false)

  const toggle = (i) => {
    interacted.current = true
    setOpenIndex(openIndex === i ? null : i)
  }

  /* Panel height is animated, never guessed: scrollHeight → px → 'auto', so a
     long answer can never be clipped by a max-height that was too small. */
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const animate = interacted.current && !prefersReducedMotion()
    const was = prevOpen.current
    prevOpen.current = openIndex

    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return
        const open = i === openIndex

        if (open && !animate) {
          gsap.set(panel, { height: 'auto', autoAlpha: 1 })
          return
        }

        if (open) {
          gsap.set(panel, { autoAlpha: 1 })
          gsap.fromTo(
            panel,
            { height: 0 },
            {
              height: panel.scrollHeight,
              duration: 0.55,
              ease: 'power3.out',
              onComplete: () => {
                gsap.set(panel, { height: 'auto' })
                ScrollTrigger.refresh()
              },
            },
          )
          if (panel.firstElementChild) {
            gsap.fromTo(
              panel.firstElementChild,
              { y: -12, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, delay: 0.08, ease: 'power2.out' },
            )
          }
          return
        }

        if (animate && i === was) {
          gsap.fromTo(
            panel,
            { height: panel.scrollHeight, autoAlpha: 1 },
            {
              height: 0,
              autoAlpha: 0,
              duration: 0.42,
              ease: 'power3.inOut',
              onComplete: () => ScrollTrigger.refresh(),
            },
          )
          return
        }

        gsap.set(panel, { height: 0, autoAlpha: 0 })
      })

      /* the animated paths refresh in their onComplete; the instant path
         (reduced motion) still moves everything below it, so refresh here. */
      if (!animate && interacted.current) ScrollTrigger.refresh()
    }, root)

    return () => ctx.revert()
  }, [openIndex])

  return (
    <section id="faq" className="lx-faq" ref={rootRef}>
      <span className="lx-faq-wash" aria-hidden="true" />

      <div className="lx-ct lx-faq-grid">
        {/* ── intro column ── */}
        <div className="lx-faq-intro">
          <Reveal from="up" duration={0.8}>
            <span className="lx-eyebrow">FAQs</span>
          </Reveal>

          <Reveal from="zoom" duration={0.7} delay={0.05}>
            <span className="lx-orn lx-faq-orn" aria-hidden="true"><i /><b /><i /></span>
          </Reveal>

          <h2 className="lx-faq-title">
            <SplitHeading as="span" className="lx-faq-title-l">{'Frequently Asked'}</SplitHeading>
            <SplitHeading as="span" className="lx-faq-title-em" delay={0.12}>{'Questions'}</SplitHeading>
          </h2>

          <Reveal from="up" delay={0.12}>
            <p className="lx-faq-lead">
              Have questions about our catering? Find answers here, or reach out directly.
            </p>
          </Reveal>

          <Reveal from="up" delay={0.18}>
            <div className="lx-btn-row lx-faq-actions">
              <MagneticButton variant="green" onClick={onBookNow}>Contact Us</MagneticButton>
              <MagneticButton
                variant="ghost"
                href="https://wa.me/919936485155"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Us
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal from="up" delay={0.24}>
            <p className="lx-faq-note">
              Pure vegetarian since 1982
              <i aria-hidden="true" />
              We respond within 24 hours
            </p>
          </Reveal>
        </div>

        {/* ── accordion ── */}
        <Reveal className="lx-faq-list" from="up" stagger={0.07} start="top 88%">
          {faqs.map((faq, i) => {
            const open = openIndex === i
            return (
              <div className={`lx-faq-item ${open ? 'is-open' : ''}`} key={faq.q}>
                <span className="lx-faq-rule" aria-hidden="true" />
                <button
                  type="button"
                  className="lx-faq-q"
                  id={`lx-faq-q-${i}`}
                  aria-expanded={open}
                  aria-controls={`lx-faq-p-${i}`}
                  onClick={() => toggle(i)}
                  data-cursor="hot"
                >
                  <span className="lx-faq-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="lx-faq-qt lx-h4">{faq.q}</span>
                  <span className="lx-faq-ic" aria-hidden="true"><i /><i /></span>
                </button>

                <div
                  className="lx-faq-panel"
                  id={`lx-faq-p-${i}`}
                  role="region"
                  aria-labelledby={`lx-faq-q-${i}`}
                  ref={(el) => { panelsRef.current[i] = el }}
                >
                  <div className="lx-faq-a">{faq.a}</div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

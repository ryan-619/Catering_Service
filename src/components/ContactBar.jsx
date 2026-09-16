import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaDirections, FaExternalLinkAlt } from 'react-icons/fa'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'

/* The Krishna Nagar office, written once. The maps link is derived from this
   exact string so the pin and the printed address can never drift apart. */
const OFFICE_ADDRESS = '7/1, 7/2 LT Enclave, Krishna Nagar, Kanpur – 208007, U.P.'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`

export default function ContactBar() {
  const scope = useGsapContext((ctx, el) => {
    if (prefersReducedMotion()) return

    /* 1 — the gold wash drifts against the scroll as the band passes. */
    gsap.fromTo(
      el.querySelector('.lx-cb-wash'),
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    )

    /* 2 — the gold hairline draws itself across the top edge on arrival. */
    gsap.fromTo(
      el.querySelector('.lx-cb-rule'),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  })

  return (
    <section id="contact-bar" className="lx-cb" ref={scope}>
      <span className="lx-cb-rule" aria-hidden="true" />
      <span className="lx-cb-wash" aria-hidden="true" />

      <div className="lx-ct-wide lx-cb-inner">
        <div className="lx-cb-head">
          <Reveal from="up" duration={0.8}>
            <span className="lx-eyebrow lx-eyebrow--center">Reach Us</span>
          </Reveal>
          <Reveal from="zoom" duration={0.7} delay={0.05}>
            <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
          </Reveal>
          <SplitHeading className="lx-cb-title">Speak to us directly</SplitHeading>
        </div>

        <Reveal className="lx-cb-grid" stagger={0.08} start="top 88%">
          <article className="lx-cb-card">
            <span className="lx-cb-ring" aria-hidden="true"><FaPhone /></span>
            <div className="lx-cb-body">
              <span className="lx-cb-label">Call Us</span>
              <div className="lx-cb-vals">
                <a className="lx-cb-link" href="tel:+919936485155" data-cursor="hot">+91-9936485155</a>
                <a className="lx-cb-link" href="tel:+918299504889" data-cursor="hot">+91-8299504889</a>
                <a className="lx-cb-link" href="tel:+919336118498" data-cursor="hot">+91-9336118498</a>
              </div>
            </div>
          </article>

          <article className="lx-cb-card">
            <span className="lx-cb-ring" aria-hidden="true"><FaWhatsapp /></span>
            <div className="lx-cb-body">
              <span className="lx-cb-label">WhatsApp</span>
              <div className="lx-cb-vals">
                <a
                  className="lx-cb-link"
                  href="https://wa.me/919936485155"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hot"
                >
                  +91-9936485155
                </a>
                <span className="lx-cb-note">Send us your date and guest count</span>
              </div>
            </div>
          </article>

          <article className="lx-cb-card">
            <span className="lx-cb-ring" aria-hidden="true"><FaMapMarkerAlt /></span>
            <div className="lx-cb-body">
              <span className="lx-cb-label">Our Office</span>
              <div className="lx-cb-vals">
                <address className="lx-cb-addr">
                  7/1, 7/2 LT Enclave, Krishna Nagar<br />
                  Kanpur – 208007, U.P.
                </address>
              </div>
            </div>
          </article>

          <article className="lx-cb-card">
            <span className="lx-cb-ring" aria-hidden="true"><FaDirections /></span>
            <div className="lx-cb-body">
              <span className="lx-cb-label">Find Us</span>
              <div className="lx-cb-vals">
                <a
                  className="lx-cb-link lx-cb-link--maps"
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hot"
                >
                  Open in Google Maps
                  <FaExternalLinkAlt aria-hidden="true" />
                </a>
                <span className="lx-cb-note">Krishna Nagar, Kanpur</span>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

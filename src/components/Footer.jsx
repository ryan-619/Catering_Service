import {
  FaPhone, FaMapMarkerAlt, FaBuilding,
  FaFacebookF, FaLinkedinIn, FaYoutube, FaArrowUp,
} from 'react-icons/fa'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'

/* Not links to anywhere — these are the service lines, rendered as a list. */
const SERVICES = [
  'Wedding Catering',
  'Corporate Events',
  'Social Gatherings',
  'VIP Private Events',
  'Jain Food Options',
]

/* Targets are the section ids App.jsx renders; scrolling is handed to Lenis. */
const QUICK_LINKS = [
  { label: 'Our Menu', href: '#cuisines' },
  { label: 'Reviews', href: '#testi' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Gallery', href: '#gallery' },
]

const SOCIALS = [
  { label: 'Facebook', href: '#', Icon: FaFacebookF },
  { label: 'LinkedIn', href: '#', Icon: FaLinkedinIn },
  { label: 'YouTube', href: '#', Icon: FaYoutube },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scope = useGsapContext((ctx, el) => {
    if (prefersReducedMotion()) return

    /* The gold hairline above the bottom bar draws itself out from the centre. */
    gsap.fromTo(
      el.querySelector('.lx-ftr-rule'),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      },
    )
  })

  /* Lenis owns the scroll — hand anchors to it rather than jumping natively.
     If the target is not on the page, let the href do whatever it would. */
  const onQuickLink = (e, href) => {
    if (typeof window.lxScrollTo !== 'function') return
    if (!document.querySelector(href)) return
    e.preventDefault()
    window.lxScrollTo(href, { offset: -70 })
  }

  const onBackToTop = () => {
    if (typeof window.lxScrollTo === 'function') window.lxScrollTo(0)
    /* The reduced-motion build of lxScrollTo ignores a numeric target,
       so the native jump covers that path. */
    if (prefersReducedMotion()) window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <footer className="lx-ftr" ref={scope}>
      <span className="lx-ftr-wash" aria-hidden="true" />

      <div className="lx-ct lx-ftr-inner">
        <Reveal className="lx-ftr-grid" stagger={0.08} start="top 92%">
          <div className="lx-ftr-brand">
            <div className="lx-ftr-mark">LTCS<span>.</span></div>
            <div className="lx-ftr-since">Only Veg Food Series · Since 1982</div>
            <p className="lx-ftr-copy">
              Lala Trivedi Catering Service has been a trusted name in pure vegetarian
              catering across Kanpur since 1982, serving with devotion guided by Mata Annapurna.
            </p>
            <div className="lx-ftr-soc">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  className="lx-ftr-soc-link"
                  href={href}
                  aria-label={label}
                  data-cursor="hot"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lx-ftr-col">
            <h4 className="lx-ftr-h">Services</h4>
            <ul className="lx-ftr-list lx-ftr-list--dots">
              {SERVICES.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>

          <div className="lx-ftr-col">
            <h4 className="lx-ftr-h">Quick Links</h4>
            <ul className="lx-ftr-list">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    className="lx-ftr-link"
                    href={href}
                    onClick={(e) => onQuickLink(e, href)}
                    data-cursor="hot"
                  >
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lx-ftr-col">
            <h4 className="lx-ftr-h">Contact Us</h4>

            <div className="lx-ftr-line">
              <span className="lx-ftr-ic" aria-hidden="true"><FaPhone /></span>
              <span className="lx-ftr-line-body">
                <a className="lx-ftr-link" href="tel:+919936485155" data-cursor="hot">
                  <span>+91-9936485155</span>
                </a>
                <a className="lx-ftr-link" href="tel:+918299504889" data-cursor="hot">
                  <span>+91-8299504889</span>
                </a>
              </span>
            </div>

            <div className="lx-ftr-line">
              <span className="lx-ftr-ic" aria-hidden="true"><FaMapMarkerAlt /></span>
              <span className="lx-ftr-line-body">77/6 Gandhi Gram, Kanpur – 208007, U.P.</span>
            </div>

            <div className="lx-ftr-line">
              <span className="lx-ftr-ic" aria-hidden="true"><FaBuilding /></span>
              <span className="lx-ftr-line-body">7/1, 7/2 LT Enclave, Krishna Nagar, Kanpur</span>
            </div>
          </div>
        </Reveal>

        <span className="lx-ftr-rule" aria-hidden="true" />

        <div className="lx-ftr-bot">
          <p className="lx-ftr-legal">
            © {year} Lala Trivedi Catering Service. All Rights Reserved.
            <span className="lx-ftr-sep" aria-hidden="true">|</span>
            <span className="lx-ftr-gst">GSTIN: 09ACSPT6343B2Z7</span>
          </p>

          <div className="lx-ftr-bot-end">
            <p className="lx-ftr-made">
              Designed &amp; developed by{' '}
              <a
                className="lx-ftr-made-link"
                href="https://pinweb.in"
                target="_blank"
                rel="noopener"
                data-cursor="hot"
              >
                PinWeb
              </a>
            </p>
            <button
              type="button"
              className="lx-ftr-top"
              onClick={onBackToTop}
              aria-label="Back to top"
              data-cursor="hot"
            >
              <FaArrowUp aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

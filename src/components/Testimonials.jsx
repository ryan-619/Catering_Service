import { useLayoutEffect, useRef } from 'react'
import { FaStar, FaQuoteRight, FaCheckCircle } from 'react-icons/fa'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'

import imgDharmendra from '../assets/reviews/dharmendra.jpg'
import imgAnurag from '../assets/reviews/anurag.jpg'
import imgAakash from '../assets/reviews/aakash.jpg'
import imgRajveer from '../assets/reviews/rajveer.jpg'
import imgSavita from '../assets/reviews/savita.jpg'

/**
 * Client reviews.
 *
 * Two tiers on purpose. `reviews` holds the people whose own words we have, so
 * those cards carry a quote. `alsoServed` holds clients we were given a name
 * and designation for but no written review — they are listed as an honour roll
 * instead of being given a quote they never said. Move an entry up into
 * `reviews` (adding `quote`) the moment their actual words come in.
 */
const reviews = [
  {
    id: 'aakash',
    img: imgAakash,
    name: 'CA Aakash Gupta',
    role: 'Chartered Accountant',
    place: 'Kanpur',
    featured: true,
    quote:
      'Exceptional service and flawless execution from start to finish. The team handled our catering with utmost professionalism, ensuring every dish was fresh, beautifully presented, and delivered right on time. Our guests praised both the quality of the food and the seamless coordination.\n\nTheir attention to hygiene, customized menu options, and precise execution make them our go-to catering partner for any event. Highly recommended.',
  },
  {
    id: 'dharmendra',
    img: imgDharmendra,
    name: 'Dharmendra Singh Bhadauria',
    role: 'Patron · Former State President',
    org: 'Veer Abhimanyu Kshatriya Mahasabha, Uttar Pradesh',
    quote: 'Excellent service and food.',
  },
  {
    id: 'anurag',
    img: imgAnurag,
    name: 'Anurag Pandey',
    role: 'Vice President',
    org: 'Bar Council of Uttar Pradesh',
    quote: 'Food quality was the best.',
  },
]

const alsoServed = [
  { id: 'rajveer', img: imgRajveer, name: 'Rajveer Singh', role: 'Senior Journalist' },
  { id: 'savita', img: imgSavita, name: 'Dr Savita Sahu', role: 'Surya Hospital, Rama Devi, Kanpur' },
  { id: 'vikas', name: 'Vikas Kapoor', role: 'Havells' },
  { id: 'piyush', name: 'Dr Piyush Mishra', role: 'Doctor' },
  { id: 'manu', name: 'Manu Sehgal', role: 'Businessman' },
]

const initials = (n) =>
  n.replace(/^(Dr|CA|Mr|Mrs|Ms)\.?\s+/i, '')
    .split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

function Stars({ n = 5 }) {
  return (
    <span className="lx-rev-stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => <FaStar key={i} />)}
    </span>
  )
}

function ReviewCard({ r }) {
  return (
    <TiltCard max={r.featured ? 4 : 7} className={`lx-rev-scene ${r.featured ? 'is-featured' : ''}`}>
      <article className={`lx-rev-card ${r.featured ? 'lx-rev-card--lg' : ''}`}>
        <FaQuoteRight className="lx-rev-mark" aria-hidden="true" />

        <header className="lx-rev-top lx-tilt-layer">
          <Stars />
          <span className="lx-rev-verified"><FaCheckCircle /> Verified client</span>
        </header>

        <blockquote className="lx-rev-quote">
          {r.quote.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </blockquote>

        <footer className="lx-rev-by">
          <span className="lx-rev-avatar">
            <img src={r.img} alt={r.name} loading="lazy" />
          </span>
          <span className="lx-rev-id">
            <span className="lx-rev-name">{r.name}</span>
            <span className="lx-rev-role">{r.role}</span>
            {r.org && <span className="lx-rev-org">{r.org}</span>}
          </span>
        </footer>
      </article>
    </TiltCard>
  )
}

export default function Testimonials() {
  const markRef = useRef(null)

  // The oversized quotation glyph behind the grid drifts against the scroll so
  // the section has a background layer rather than sitting flat on the ivory.
  useLayoutEffect(() => {
    const el = markRef.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { yPercent: -14 }, {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="testi" className="lx-sec lx-rev">
      <span className="lx-wash lx-wash--gold lx-rev-wash-a" aria-hidden="true" />
      <span className="lx-wash lx-wash--green lx-rev-wash-b" aria-hidden="true" />
      <span className="lx-rev-bgmark" ref={markRef} aria-hidden="true">&rdquo;</span>

      <div className="lx-ct">
        <SectionHead
          eyebrow="Client Reviews"
          title={'In Their Own Words'}
          lead="Four decades of service, judged by the people who sat down to eat. These are their words, unedited."
        />

        <Reveal stagger={0.1} className="lx-rev-grid" start="top 88%">
          {reviews.map((r) => <ReviewCard key={r.id} r={r} />)}
        </Reveal>

        {/* Honour roll — clients whose written review we do not have yet, so
            they are named and credited without a quote being put in their mouth. */}
        <Reveal from="up" delay={0.05}>
          <div className="lx-rev-also">
            <div className="lx-rev-also-head">
              <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
              <h3 className="lx-h3">Also served &amp; trusted by</h3>
            </div>

            <ul className="lx-rev-also-list">
              {alsoServed.map((p) => (
                <li key={p.id} className="lx-rev-also-item">
                  <span className={`lx-rev-also-avatar ${p.img ? '' : 'is-mono'}`}>
                    {p.img
                      ? <img src={p.img} alt={p.name} loading="lazy" />
                      : <b>{initials(p.name)}</b>}
                  </span>
                  <span className="lx-rev-also-id">
                    <span className="lx-rev-name">{p.name}</span>
                    <span className="lx-rev-role">{p.role}</span>
                  </span>
                  <Stars />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

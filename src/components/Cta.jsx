import { Fragment } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import Marquee from './ui/Marquee'
import MagneticButton from './ui/MagneticButton'

/* Decorative ticker behind the copy — short service words, nothing load-bearing,
   which is why the whole strip is aria-hidden. */
const BAND = ['Weddings', 'Corporate', 'Festivals', 'Live Counters', 'Jain Menus']

const WA_HREF =
  'https://wa.me/919936485155?text=Hello! I would like to enquire about catering for my event.'

export default function Cta({ onBookNow }) {
  const scope = useGsapContext((self, root) => {
    if (prefersReducedMotion()) return

    /* ── wow #1 · the gold wash drifts as the band passes the viewport ── */
    const wash = root.querySelector('.lx-cta-wash')
    if (wash) {
      gsap.fromTo(
        wash,
        { yPercent: -9, scale: 1.04 },
        {
          yPercent: 9,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        },
      )
    }

    /* the lattice creeps the other way — half the distance, twice the lag */
    const motif = root.querySelector('.lx-cta-motif')
    if (motif) {
      gsap.fromTo(
        motif,
        { yPercent: 3.5 },
        {
          yPercent: -3.5,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
        },
      )
    }

    /* the two gold hairlines draw themselves outward from the centre */
    const hairs = root.querySelectorAll('.lx-cta-hair')
    if (hairs.length) {
      gsap.from(hairs, {
        scaleX: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 84%', once: true },
      })
    }
  }, [])

  return (
    <section id="cta" className="lx-cta" ref={scope}>
      <span className="lx-cta-hair lx-cta-hair--top" aria-hidden="true" />
      <span className="lx-cta-wash" aria-hidden="true" />
      <span className="lx-cta-motif" aria-hidden="true" />

      {/* ── wow #2 · low-opacity gold ticker sitting behind the headline ── */}
      <div className="lx-cta-mq" aria-hidden="true">
        <Marquee speed={26} gap={0} fade>
          {BAND.map((w) => (
            <Fragment key={w}>
              <span className="lx-cta-mq-word">{w}</span>
              <i className="lx-cta-mq-dot" />
            </Fragment>
          ))}
        </Marquee>
      </div>

      <div className="lx-ct lx-cta-inner">
        <Reveal from="up" duration={0.8}>
          <span className="lx-eyebrow lx-eyebrow--center">Ready to Celebrate?</span>
        </Reveal>

        <Reveal from="zoom" duration={0.7} delay={0.05}>
          <span className="lx-orn lx-cta-orn" aria-hidden="true"><i /><b /><i /></span>
        </Reveal>

        <h2 className="lx-cta-title">
          <SplitHeading as="span" className="lx-cta-title-l">{'Make Your Event'}</SplitHeading>
          <SplitHeading as="span" className="lx-cta-title-em" delay={0.12}>{'Truly Memorable'}</SplitHeading>
          <SplitHeading as="span" className="lx-cta-title-l" delay={0.24}>
            {'with Pure Vegetarian Perfection'}
          </SplitHeading>
        </h2>

        <Reveal from="up" delay={0.16}>
          <p className="lx-cta-sub">
            Contact us today and let us craft a personalised vegetarian menu for your occasion.
          </p>
        </Reveal>

        <Reveal from="up" delay={0.22}>
          <div className="lx-btn-row lx-cta-actions">
            <MagneticButton variant="gold" size="lg" onClick={onBookNow}>
              Get a Free Quote
            </MagneticButton>
            <MagneticButton
              variant="ghost-d"
              size="lg"
              href={WA_HREF}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Now
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal from="up" delay={0.3}>
          <p className="lx-cta-note">
            Serving Kanpur &amp; around since 1982
            <i aria-hidden="true" />
            100% pure vegetarian
          </p>
        </Reveal>
      </div>

      <span className="lx-cta-hair lx-cta-hair--bot" aria-hidden="true" />
    </section>
  )
}

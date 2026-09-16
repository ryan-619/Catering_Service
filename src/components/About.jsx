import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import MagneticButton from './ui/MagneticButton'
import CountUp from './ui/CountUp'

import aboutLarge from '../assets/hero/hero3.jpg'
import aboutSmall from '../assets/hero/hero2.jpg'

const FEATURES = [
  '100% Pure Vegetarian',
  'Jain Food Options',
  'Custom Menu Planning',
  'Live Food Stations',
  'Professional Staff',
  'Complete Event Setup',
]

/** Gold tick used in the feature index. */
function Tick() {
  return (
    <span className="lx-about-tick" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 12.4 9.4 17.2 19.5 6.8" />
      </svg>
    </span>
  )
}

export default function About({ onBookNow }) {
  /* Scrub parallax: the two frames drift against each other as the block
     passes, so the composition reads as layered prints rather than a collage. */
  const scope = useGsapContext((self, root) => {
    if (prefersReducedMotion()) return
    const media = root.querySelector('.lx-about-media')
    if (!media) return

    const st = () => ({ trigger: media, start: 'top bottom', end: 'bottom top', scrub: 0.6 })
    const big = root.querySelector('[data-lx-par="lg"]')
    const small = root.querySelector('[data-lx-par="sm"]')

    if (big) gsap.fromTo(big, { yPercent: 6 }, { yPercent: -8, ease: 'none', scrollTrigger: st() })
    if (small) gsap.fromTo(small, { yPercent: -5 }, { yPercent: 6, ease: 'none', scrollTrigger: st() })
  }, [])

  return (
    <section id="about" className="lx-sec lx-about" ref={scope}>
      <span className="lx-wash lx-wash--gold lx-about-wash" aria-hidden="true" />

      <div className="lx-ct lx-about-grid">
        {/* ── Left: curated photo composition ── */}
        <div className="lx-about-media">
          <figure className="lx-about-fig lx-about-fig--lg">
            <Reveal from="mask" duration={1.05} className="lx-about-wipe">
              <img
                className="lx-about-img"
                data-lx-par="lg"
                src={aboutLarge}
                alt="LTCS catering event"
                loading="lazy"
              />
            </Reveal>
          </figure>

          <figure className="lx-about-fig lx-about-fig--sm">
            <Reveal from="mask" duration={1} delay={0.16} className="lx-about-wipe">
              <img
                className="lx-about-img"
                data-lx-par="sm"
                src={aboutSmall}
                alt="Gold and ivory buffet counter laid out for an LTCS banquet"
                loading="lazy"
              />
            </Reveal>
          </figure>

          <div className="lx-about-sealpos">
            <Reveal from="zoom" duration={0.8} delay={0.28} className="lx-about-seal">
              <span className="lx-about-seal-ring" aria-hidden="true" />
              <span className="lx-about-seal-num">
                <CountUp to={42} suffix="+" separator={false} duration={1.6} />
              </span>
              <span className="lx-about-seal-lbl">Years of Pure<br />Veg Excellence</span>
            </Reveal>
          </div>
        </div>

        {/* ── Right: the story ── */}
        <div className="lx-about-copy">
          <div className="lx-about-markwrap" aria-hidden="true">
            <span className="lx-about-mark lx-deva">अन्नपूर्णा</span>
          </div>

          <div className="lx-about-body">
            <Reveal from="up" duration={0.8}>
              <span className="lx-eyebrow">Who We Are</span>
            </Reveal>

            <Reveal from="zoom" duration={0.7} delay={0.05}>
              <span className="lx-orn lx-about-orn" aria-hidden="true"><i /><b /><i /></span>
            </Reveal>

            <SplitHeading className="lx-h2 lx-about-h">
              {'Pure Vegetarian Excellence\nSince 1982'}
            </SplitHeading>

            <Reveal from="up" delay={0.1} duration={0.9}>
              <p className="lx-lead lx-about-p">
                Founded in <strong>1982</strong>, Lala Trivedi Catering Service has built a proud legacy
                of <strong>pure vegetarian catering</strong> in Kanpur, U.P. For over four decades, we
                have been the most trusted name for families, corporates, and communities seeking
                authentic, wholesome vegetarian food prepared with love, devotion, and expertise.
              </p>
            </Reveal>

            <Reveal from="up" delay={0.16} duration={0.9}>
              <p className="lx-lead lx-about-p">
                Under our brand <strong>LTCS — Only Veg Food Series</strong>, we bring together
                traditional recipes, expert culinary craftsmanship, and warm hospitality to make every
                event truly unforgettable.
              </p>
            </Reveal>

            <Reveal as="ul" from="up" duration={0.7} stagger={0.07} className="lx-about-feats">
              {FEATURES.map((f) => (
                <li className="lx-about-feat" key={f}>
                  <Tick />
                  <span className="lx-about-feat-t">{f}</span>
                </li>
              ))}
            </Reveal>

            <Reveal from="up" delay={0.08} duration={0.8} className="lx-btn-row lx-about-cta">
              <MagneticButton variant="gold" onClick={onBookNow}>Book a Tasting</MagneticButton>
              <MagneticButton variant="wa" href="https://wa.me/919936485155" target="_blank" rel="noreferrer">
                WhatsApp Us
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

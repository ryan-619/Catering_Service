import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import CountUp from './ui/CountUp'

const stats = [
  { num: 42, unit: '+', label: 'Years of Service' },
  { num: 300, unit: '+', label: 'Veg Menu Varieties' },
  { num: 10000, unit: '+', label: 'Events Catered' },
  { num: 100, unit: '%', label: 'Pure Vegetarian' },
]

export default function Stats() {
  const scope = useGsapContext((ctx, el) => {
    if (prefersReducedMotion()) return

    /* A fresh config per trigger — ScrollTrigger mutates the object it is given. */
    const drift = () => ({ trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 })

    /* 1 — the gold wash drifts ~40px against the scroll as the band passes. */
    gsap.fromTo(
      el.querySelector('.lx-stats-wash'),
      { backgroundPosition: '50% -20px' },
      { backgroundPosition: '50% 20px', ease: 'none', scrollTrigger: drift() },
    )
    gsap.fromTo(
      el.querySelector('.lx-stats-motif'),
      { y: 20 },
      { y: -20, ease: 'none', scrollTrigger: drift() },
    )

    /* 2 — one sheen sweeps across the foil numerals as they arrive. */
    gsap.fromTo(
      el.querySelectorAll('.lx-stats-num'),
      { backgroundPosition: '150% 0%' },
      {
        backgroundPosition: '0% 0%',
        duration: 1.05,
        ease: 'power2.out',
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      },
    )
  })

  return (
    <section id="stats" className="lx-stats" ref={scope}>
      <span className="lx-stats-wash" aria-hidden="true" />
      <span className="lx-stats-motif" aria-hidden="true" />

      <div className="lx-ct-wide lx-stats-inner">
        <Reveal className="lx-stats-grid" stagger={0.08} start="top 88%">
          {stats.map((s) => (
            <div className="lx-stats-item" key={s.label}>
              <span className="lx-stats-num lx-foil">
                <CountUp to={s.num} className="lx-stats-val" />
                <span className="lx-stats-unit">{s.unit}</span>
              </span>
              <span className="lx-stats-label">{s.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="lx-stats-foot" from="up" delay={0.1}>
          <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
          <p className="lx-stats-note">
            Four decades. One promise — pure vegetarian, every single time.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

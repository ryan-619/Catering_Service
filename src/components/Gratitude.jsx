import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import gratitudeCard from '../assets/gratitude-card.jpg'

/**
 * Closing gratitude note — the "हम आभारी है / माता अन्नपूर्णा के" card.
 *
 * The last thing on the page before the footer, so it is staged as a grace
 * note rather than a stray image: deep green ground, a gold halo, the card
 * held inside a hairline frame with corner ticks, and a rule beneath that
 * closes the document. The card arrives on a clip-path wipe with a small
 * scale settle; the halo drifts on a scrub. Nothing else moves.
 */
export default function Gratitude() {
  const scope = useGsapContext((self, root) => {
    if (prefersReducedMotion()) return

    const q = gsap.utils.selector(root)
    if (!root.querySelector('.lx-grat-frame')) return

    /* ── the one reveal: everything rides a single trigger ── */
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: root, start: 'top 78%', once: true },
    })

    tl.from(q('.lx-grat-eyebrow'), { y: 16, opacity: 0, duration: 0.7 })
      .from(q('.lx-grat-orn'), { scaleX: 0, opacity: 0, duration: 0.7 }, '-=0.5')
      .from(q('.lx-grat-line'), { y: 14, opacity: 0, duration: 0.7 }, '-=0.52')
      .from(q('.lx-grat-halo'), { scale: 0.72, opacity: 0, duration: 1.05 }, '-=0.5')
      .from(q('.lx-grat-frame'), { opacity: 0, duration: 0.6 }, '<')
      .fromTo(
        q('.lx-grat-shot'),
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'power4.out' },
        '-=0.92',
      )
      .from(q('.lx-grat-card'), { scale: 1.09, duration: 1.1, ease: 'power3.out' }, '<')
      .from(q('.lx-grat-tick'), { scale: 0, opacity: 0, duration: 0.55, stagger: 0.06 }, '-=0.58')
      .from(q('.lx-grat-rule'), { scaleX: 0, duration: 0.85, ease: 'power2.out' }, '-=0.4')
      .from(q('.lx-grat-sign'), { y: 12, opacity: 0, duration: 0.65 }, '-=0.55')

    /* ── the one scrub: the halo breathes past as the page closes ── */
    const halo = root.querySelector('.lx-grat-halo')
    if (halo) {
      gsap.fromTo(
        halo,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      )
    }
  }, [])

  return (
    <section id="gratitude" className="lx-grat" ref={scope}>
      <span className="lx-grat-veil" aria-hidden="true" />

      <div className="lx-ct">
        <div className="lx-grat-head">
          <span className="lx-eyebrow lx-eyebrow--center lx-grat-eyebrow">With Gratitude</span>
          <span className="lx-orn lx-grat-orn" aria-hidden="true"><i /><b /><i /></span>
          <p className="lx-grat-line">
            Every plate we have ever served came from{' '}
            <em className="lx-grat-deva">माता अन्नपूर्णा</em>
          </p>
        </div>

        <div className="lx-grat-stage">
          <span className="lx-grat-halo" aria-hidden="true" />

          <figure className="lx-grat-frame">
            <span className="lx-grat-tick lx-grat-tick--tl" aria-hidden="true" />
            <span className="lx-grat-tick lx-grat-tick--tr" aria-hidden="true" />
            <span className="lx-grat-tick lx-grat-tick--bl" aria-hidden="true" />
            <span className="lx-grat-tick lx-grat-tick--br" aria-hidden="true" />

            <span className="lx-grat-shot">
              <img
                src={gratitudeCard}
                alt="हम आभारी है — माता अन्नपूर्णा के। जिन्होंने हमको माध्यम बनाया, आप का अन्न आप तक पहुँचाने का।"
                className="lx-grat-card"
                width="1400"
                height="1436"
                loading="lazy"
                decoding="async"
              />
            </span>
          </figure>
        </div>

        <div className="lx-grat-foot">
          <span className="lx-grat-rule" aria-hidden="true" />
          <p className="lx-grat-sign">Lala Trivedi Catering Service</p>
        </div>
      </div>
    </section>
  )
}

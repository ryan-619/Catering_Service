import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import founder1Img from '../assets/founder1.jpg'
import founder2Img from '../assets/founder2.jpg'

const founders = [
  {
    img: founder1Img,
    tag: '🌿 Est. 1982',
    name: 'Surya Prakash Trivedi',
    nickname: '(Lala Trivedi)',
    role: 'Founder, LTCS',
    story: `Born with a deep love for pure vegetarian food and community service, Surya Prakash Trivedi laid the foundation of Lala Trivedi Catering Service in 1982. His vision was simple yet powerful — to serve wholesome, hygienic vegetarian food to every household, event, and celebration with the same devotion one offers to the divine.`,
    quote: 'A meal prepared with devotion is not just food — it is a blessing that nourishes the soul, strengthens bonds, and keeps traditions alive for generations.',
    stats: [
      { val: '1982', lbl: 'Founded' },
      { val: '42+', lbl: 'Years' },
      { val: 'Kanpur', lbl: 'Hometown' },
    ],
    expNum: '42',
    expLbl: 'Years of Vision',
    reverse: false,
  },
  {
    img: founder2Img,
    tag: '🤝 Co-Founder',
    name: 'Vijay Prakash Trivedi',
    nickname: '',
    role: 'Co-Founder, LTCS',
    story: `Carrying forward the legacy of LTCS with passion and precision, Vijay Prakash Trivedi has been the driving force behind the brand's modern growth. With an eye for detail and an uncompromising commitment to quality, he has helped LTCS scale from a local catering unit to Kanpur's most trusted vegetarian catering service.`,
    quote: 'Quality is not what we do sometimes — it is what we do every single time, for every single guest, without exception.',
    stats: [
      { val: '10K+', lbl: 'Events' },
      { val: '300+', lbl: 'Menus' },
      { val: '100%', lbl: 'Veg Always' },
    ],
    expNum: '26+',
    expLbl: 'Years of Leadership',
    reverse: true,
  },
]

export default function Founder() {
  /* Two engineered moments, both scoped to this section:
     1. a slow dashed gold ring orbiting each portrait (continuous),
     2. the portrait scrubbing a few percent against its text column.
     Both are skipped outright under prefers-reduced-motion. */
  const scope = useGsapContext((ctx, root) => {
    if (prefersReducedMotion()) return

    Array.from(root.querySelectorAll('.lx-fd-ring')).forEach((ring, i) => {
      const spin = gsap.to(ring, {
        rotation: i % 2 ? -360 : 360,
        transformOrigin: '50% 50%',
        duration: 78,
        ease: 'none',
        repeat: -1,
      })
      // idle rings cost frames — only turn while the portrait is on screen
      ScrollTrigger.create({
        trigger: ring,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
      })
    })

    Array.from(root.querySelectorAll('.lx-fd-row')).forEach((row) => {
      const img = row.querySelector('.lx-fd-img')
      if (!img) return
      gsap.fromTo(
        img,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        }
      )
    })
  }, [])

  return (
    <section id="founder" className="lx-sec lx-sec--dark lx-fd" ref={scope}>
      <div className="lx-ct">

        {/* Header */}
        <div className="lx-fd-head">
          <Reveal from="up" duration={0.8}>
            <h2 className="lx-eyebrow lx-eyebrow--center lx-fd-eyebrow">The Visionaries Behind LTCS</h2>
          </Reveal>
          <Reveal from="zoom" duration={0.7} delay={0.05} className="lx-fd-ornwrap">
            <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
          </Reveal>
          <Reveal from="up" duration={0.9} delay={0.1}>
            <p className="lx-fd-intro">Four decades of pure vegetarian hospitality, held to a single standard.</p>
          </Reveal>
        </div>

        {/* Founders */}
        {founders.map((f, i) => (
          <div key={f.name} className="lx-fd-block">
            <article className={`lx-fd-row ${f.reverse ? 'lx-fd-row--rev' : ''}`}>

              {/* Portrait */}
              <div className="lx-fd-media">
                <span className="lx-wash lx-wash--gold lx-fd-wash" aria-hidden="true" />
                <Reveal from="zoom" duration={1} className="lx-fd-stage">
                  <svg className="lx-fd-ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
                    <circle cx="100" cy="100" r="96" />
                  </svg>
                  <div className="lx-fd-frame">
                    <img src={f.img} alt={f.name} className="lx-fd-img" loading="lazy" />
                  </div>
                  <div className="lx-fd-exp">
                    <span className="lx-fd-exp-num lx-foil">{f.expNum}</span>
                    <span className="lx-fd-exp-lbl">{f.expLbl}</span>
                  </div>
                </Reveal>
              </div>

              {/* Content */}
              <div className="lx-fd-body">
                <Reveal from="up" duration={0.8}>
                  <span className="lx-chip lx-fd-tag">{f.tag}</span>
                </Reveal>

                <SplitHeading as="h3" className="lx-fd-name">{f.name}</SplitHeading>

                {f.nickname && (
                  <Reveal from="up" duration={0.7} delay={0.08}>
                    <p className="lx-fd-nick">{f.nickname}</p>
                  </Reveal>
                )}

                <Reveal from="up" duration={0.7} delay={0.1}>
                  <p className="lx-fd-role">{f.role}</p>
                </Reveal>

                <Reveal from="up" duration={0.9} delay={0.12}>
                  <p className="lx-fd-story">{f.story}</p>
                </Reveal>

                <Reveal from="up" duration={0.9} delay={0.06}>
                  <figure className="lx-fd-quote">
                    <span className="lx-fd-qmark" aria-hidden="true">&ldquo;</span>
                    <blockquote className="lx-fd-qtext">{f.quote}</blockquote>
                    <figcaption className="lx-fd-qby">
                      <span className="lx-fd-qrule" aria-hidden="true" />
                      <span className="lx-fd-qname">{f.name}</span>
                      <span className="lx-fd-qlbl">His Words</span>
                    </figcaption>
                  </figure>
                </Reveal>

                <Reveal from="up" duration={0.8} delay={0.08} stagger={0.08} className="lx-fd-stats">
                  {f.stats.map((s, j) => (
                    <div className="lx-fd-stat" key={j}>
                      <span className="lx-fd-stat-v lx-foil">{s.val}</span>
                      <span className="lx-fd-stat-l">{s.lbl}</span>
                    </div>
                  ))}
                </Reveal>
              </div>

            </article>

            {i < founders.length - 1 && (
              <Reveal from="zoom" duration={0.8} className="lx-fd-divwrap">
                <span className="lx-orn lx-fd-div" aria-hidden="true"><i /><b /><i /></span>
              </Reveal>
            )}
          </div>
        ))}

      </div>
    </section>
  )
}

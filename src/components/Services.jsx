import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'
import MagneticButton from './ui/MagneticButton'
import TiltCard from './ui/TiltCard'
import lunchBoxImg from '../assets/services/lunch-box.jpg'
import thaliImg from '../assets/services/thali.jpg'
import liveBuffetImg from '../assets/services/live-buffet.jpg'

const services = [
  {
    tag: 'Lunch Box',
    name: 'Lunch Box Catering',
    items: ['Corporate Meetings', 'Seminars', 'School Events', 'Office Training', 'Travel Groups', 'Wedding Functions', 'Puja / Religious Programs'],
    img: lunchBoxImg,
    alt: 'Lunch Box Catering',
  },
  {
    tag: 'Thali',
    name: 'Thali Catering',
    items: ['Birthday Parties', 'Housewarming', 'Puja', 'Family Functions', 'Small Gatherings'],
    img: thaliImg,
    alt: 'Thali Catering',
  },
  {
    tag: 'Live Buffet',
    name: 'Live Buffet Catering',
    items: ['Wedding', 'Reception', 'Anniversary', 'Corporate Events', 'Festivals'],
    img: liveBuffetImg,
    alt: 'Live Buffet Catering',
  },
]

export default function Services() {
  const goToMenu = () => window.lxScrollTo?.('#cuisines', { offset: -80 })

  return (
    <section id="services" className="lx-sec lx-srv">
      <span className="lx-wash lx-wash--gold lx-srv-wash" aria-hidden="true" />

      <div className="lx-ct">
        <SectionHead
          eyebrow="What We Do"
          title={'Freshly Prepared Meals\nfor Every Occasion'}
          lead="From intimate gatherings to large corporate events, we deliver hygienic, delicious meals on time."
        />

        <Reveal className="lx-srv-grid" from="up" stagger={0.09} duration={0.9}>
          {services.map((s, i) => (
            <TiltCard
              key={s.name}
              max={7}
              scale={1.015}
              className="lx-srv-cell"
              innerClassName="lx-srv-card lx-topline"
            >
              <article className="lx-srv-inner" tabIndex={0} data-cursor="hot" aria-label={s.name}>
                <figure className="lx-srv-media">
                  <img src={s.img} alt={s.alt} loading="lazy" decoding="async" />
                  <span className="lx-srv-scrim" aria-hidden="true" />
                </figure>

                <span className="lx-chip lx-chip--glass lx-srv-tag">{s.tag}</span>
                <span className="lx-srv-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>

                <div className="lx-srv-body">
                  <h3 className="lx-srv-name">{s.name}</h3>
                  <div className="lx-srv-drop">
                    <div>
                      <span className="lx-srv-rule" aria-hidden="true" />
                      <ul className="lx-srv-list">
                        {s.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </Reveal>

        <Reveal className="lx-srv-foot" from="up" delay={0.08}>
          <p className="lx-srv-note">
            Pure vegetarian throughout — freshly prepared, hygienically packed and served on time.
          </p>
          <MagneticButton variant="ghost" onClick={goToMenu}>See Full Menu</MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}

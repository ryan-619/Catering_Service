import { FadeUp, Stagger, StaggerItem } from './AnimatedSection'
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
  return (
    <section id="services">
      <div className="ct">
        <FadeUp>
          <div className="sh">
            <span className="ey">What We Do</span>
            <span className="gline"></span>
            <h2 className="st">Freshly Prepared Meals for Every Occasion</h2>
            <p className="services-subheading">
              From intimate gatherings to large corporate events, we deliver hygienic, delicious meals on time.
            </p>
          </div>
        </FadeUp>

        <Stagger className="sgrid">
          {services.map((s) => (
            <StaggerItem key={s.name}>
              <div className="sc">
                <img src={s.img} alt={s.alt} />
                <div className="so">
                  <span className="stag">{s.tag}</span>
                  <div className="sname">{s.name}</div>
                  <ul className="slist">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="sarrow">→</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
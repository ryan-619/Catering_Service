import { FaLandmark, FaFlag, FaFilm, FaMusic } from 'react-icons/fa'
import { FadeUp, Stagger, StaggerItem } from './AnimatedSection'
import p1 from '../assets/p1.jpeg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import p4 from '../assets/p4.jpg'
import p5 from '../assets/p5.jpeg'
import p6 from '../assets/p6.jpeg'
import p7 from '../assets/p7.jpeg'
import p8 from '../assets/p8.jpeg'
import p9 from '../assets/p9.jpeg'
import p10 from '../assets/p10.jpeg'
import p11 from '../assets/p11.jpeg'
import p12 from '../assets/p12.jpeg'
import p13 from '../assets/p13.jpeg'
import p14 from '../assets/p14.jpeg'
import p15 from '../assets/p15.jpeg'

const personalities = [
  { img: p2, name: 'PM Narendra Modi', title: 'Prime Minister of India', tag: <><FaFlag /> Prime Minister</> },
  { img: p1, name: 'CM Yogi Adityanath', title: 'Chief Minister, Uttar Pradesh', tag: <><FaLandmark /> Political Leader</> },
  { img: p5, name: 'Rajnath Singh', title: 'Defence Minister of India', tag: <><FaLandmark /> Defence Minister</> },
  { img: p8, name: 'Brijesh Pathak', title: 'Deputy CM', tag: <><FaLandmark /> Political Leader</> },
  { img: p6, name: 'Sunil Bansal', title: 'National General Secretary, Uttar Pradesh', tag: <><FaLandmark /> Political Leader</> },
  { img: p9, name: 'Dharam Pal', title: 'Uttar Pradesh Organization General Secretary', tag: <><FaLandmark /> Political Leader</> },
  { img: p7, name: 'Sanjay Seth', title: 'Minister of State for Defence, Central Government', tag: <><FaLandmark /> Political Leader</> },
  { img: p10, name: 'Sunil Devdhar', title: 'Uttar Pradesh Organization General Secretary', tag: <><FaLandmark /> Political Leader</> },
  { img: p11, name: 'Swatantra Dev Singh', title: 'Jal Shakti Minister', tag: <><FaLandmark /> Political Leader</> },
  { img: p13, name: 'Baldev Singh Aulakh', title: 'Minister of State Government', tag: <><FaLandmark /> Political Leader</> },
  { img: p12, name: 'Mahendra Singh', title: 'MP State In-charge', tag: <><FaLandmark /> Political Leader</> },
  { img: p14, name: 'Vinod Kumar Sonkar', title: 'Member of Parliament', tag: <><FaLandmark /> Political Leader</> },
  { img: p3, name: 'Vindu Dara Singh', title: 'Actor & Celebrity', tag: <><FaFilm /> Bollywood</> },
  { img: p4, name: 'Udit Narayan', title: 'Legendary Playback Singer', tag: <><FaMusic /> Music Icon</> },
  { img: p15, name: 'Arun Yogiraj', title: 'Sculptor of Ram Lalla, Ayodhya', tag: <><FaLandmark /> Sculptor</> },
]

export default function Personalities() {
  return (
    <section id="personalities">
      <div className="ct">
        <FadeUp>
          <div className="pers-header">
            <span className="ey">Our Honour</span>
            <span className="gline"></span>
            <h2 className="st">Trusted by the Greatest</h2>
            <p className="pers-subtitle">
              Over the decades, LTCS has had the privilege of serving and being
              associated with some of India's most celebrated personalities.
            </p>
          </div>
        </FadeUp>

        <Stagger className="pers-grid">
          {personalities.map((p, i) => (
            <StaggerItem key={i}>
              <div className="pers-card">
                <div className="pers-img-wrap">
                  <img src={p.img} alt={p.name} className="pers-img" />
                  <div className="pers-overlay">
                    <div className="pers-overlay-content">
                      <div className="pers-tag">{p.tag}</div>
                      <div className="pers-overlay-name">{p.name}</div>
                      <div className="pers-overlay-title">{p.title}</div>
                    </div>
                  </div>
                </div>
                <div className="pers-body">
                  <div className="pers-name">{p.name}</div>
                  <div className="pers-title">{p.title}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp>
          <div className="pers-bottom-quote">
            <p>We are honoured to have served India's finest — a testament to our
            commitment to quality, purity, and hospitality.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
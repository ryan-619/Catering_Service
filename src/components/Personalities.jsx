import { FaLandmark, FaFlag, FaFilm, FaMusic } from 'react-icons/fa'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'
import TiltCard from './ui/TiltCard'
import p1 from '../assets/p1.jpeg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpeg'
import p4 from '../assets/p4.jpeg'
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
import p16 from '../assets/p16.jpeg'
import p19 from '../assets/p19.jpeg'
import p18 from '../assets/p18.jpeg'
import p17 from '../assets/p17.jpeg'
import arunYogiraj from '../assets/arunyogiraj.jpeg'
import chandraShekhar from '../assets/chandrashekhar.jpeg'



const personalities = [
  { img: p16, name: 'Draoupadi Murmu', title: 'President of India', tag: <><FaFlag /> President </> },
  { img: p2, name: 'PM Narendra Modi', title: 'Prime Minister of India', tag: <><FaFlag /> Prime Minister</> },
  { img: p17, name: 'PM Narendra Modi', title: 'Prime Minister of India', tag: <><FaFlag /> Prime Minister</> },
  { img: p1, name: 'CM Yogi Adityanath', title: 'Chief Minister, Uttar Pradesh', tag: <><FaLandmark /> Political Leader</> },
  { img: p5, name: 'Rajnath Singh', title: 'Defence Minister of India', tag: <><FaLandmark /> Defence Minister</> },
  { img: p19, name: 'Nripendra Misra, Govind Dev Giri Ji Maharaj', title: 'Nyas Peeth', tag: <><FaLandmark /> </> },
  { img: p8, name: 'Brijesh Pathak', title: 'Deputy CM', tag: <><FaLandmark /> Political Leader</> },
  { img: p18, name: 'Satish Mahana', title: 'Speaker of the Legislative Assembly UP', tag: <><FaLandmark /> Political Leader</> },
  { img: chandraShekhar, name: 'Chandra Shekhar', title: 'Speaker of the Legislative Assembly UP', tag: <><FaLandmark /> Political Leader</> },
  { img: p6, name: 'Sunil Bansal', title: 'National General Secretary, Uttar Pradesh', tag: <><FaLandmark /> Political Leader</> },
  { img: p9, name: 'Dharam Pal', title: 'Uttar Pradesh Organization General Secretary', tag: <><FaLandmark /> Political Leader</> },
  { img: p7, name: 'Sanjay Seth', title: 'Minister of State for Defence, Central Government', tag: <><FaLandmark /> Political Leader</> },
  { img: p10, name: 'Sunil Devdhar', title: 'Uttar Pradesh Organization General Secretary', tag: <><FaLandmark /> Political Leader</> },
  { img: p11, name: 'Swatantra Dev Singh', title: 'Jal Shakti Minister', tag: <><FaLandmark /> Political Leader</> },
  { img: p13, name: 'Baldev Singh Aulakh', title: 'Minister of State Government', tag: <><FaLandmark /> Political Leader</> },
  { img: p12, name: 'Mahendra Singh', title: 'MP State In-charge', tag: <><FaLandmark /> Political Leader</> },
  { img: p14, name: 'Vinod Kumar Sonkar', title: 'Member of Parliament', tag: <><FaLandmark /> Political Leader</> },
  { img: p14, name: 'Uday Bhan Kavaria', title: 'Ex - MLA Prayagraj', tag: <><FaLandmark /> Political Leader</> },
  { img: p3, name: 'Vindu Dara Singh', title: 'Actor & Celebrity', tag: <><FaFilm /> Bollywood</> },
  { img: p4, name: 'Udit Narayan', title: 'Legendary Playback Singer', tag: <><FaMusic /> Music Icon</> },
  { img: arunYogiraj, name: 'South Businessman', title: '', tag: <><FaLandmark /> Businessman</> },
]

/* Module-level so the object identity is stable — Reveal keys its effect on it.
   `grid:'auto'` lets GSAP read the real column count, so the wave travels
   diagonally across the wall instead of straight left-to-right. */
const GRID_STAGGER = { each: 0.035, from: 'start', grid: 'auto' }

export default function Personalities() {
  const scope = useGsapContext((ctx, el) => {
    if (prefersReducedMotion()) return
    const drift = (sel, to) => gsap.fromTo(sel, { yPercent: -to }, {
      yPercent: to, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    })
    drift('.lx-pers-wash--a', 9)
    drift('.lx-pers-wash--b', -7)
  }, [])

  return (
    <section id="personalities" className="lx-sec lx-sec--ivory lx-pers" ref={scope}>
      <span className="lx-wash lx-wash--gold lx-pers-wash lx-pers-wash--a" aria-hidden="true" />
      <span className="lx-wash lx-wash--gold lx-pers-wash lx-pers-wash--b" aria-hidden="true" />

      <div className="lx-ct-wide lx-pers-inner">
        <SectionHead
          eyebrow="Our Honour"
          title="Trusted by the Greatest"
          lead="Over the decades, LTCS has had the privilege of serving and being associated with some of India's most celebrated personalities."
        />

        <Reveal as="ul" role="list" className="lx-pers-grid" from="up" duration={0.9} stagger={GRID_STAGGER}>
          {personalities.map((p, i) => (
            <li className="lx-pers-cell" key={i}>
              <TiltCard max={8} scale={1.015} glare innerClassName="lx-pers-card" data-cursor="hot">
                <figure className="lx-pers-fig">
                  <span className="lx-pers-shot">
                    <img src={p.img} alt={p.name} className="lx-pers-img" loading="lazy" decoding="async" />
                    <span className="lx-pers-scrim" aria-hidden="true" />
                  </span>

                  <span className="lx-pers-frame" aria-hidden="true" />

                  <span className="lx-pers-tagwrap lx-tilt-layer">
                    <span className="lx-pers-tag">{p.tag}</span>
                  </span>

                  <figcaption className="lx-pers-meta">
                    <span className="lx-pers-name">{p.name}</span>
                    {p.title && <span className="lx-pers-role">{p.title}</span>}
                  </figcaption>
                </figure>
              </TiltCard>
            </li>
          ))}
        </Reveal>

        <Reveal from="up" delay={0.05}>
          <blockquote className="lx-pers-quote">
            <span className="lx-pers-dia" aria-hidden="true" />
            <p>
              We are honoured to have served India's finest — a testament to our
              commitment to quality, purity, and hospitality.
            </p>
            <span className="lx-pers-dia" aria-hidden="true" />
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

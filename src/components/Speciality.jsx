import { Fragment } from 'react'
import { FaLeaf, FaSeedling, FaRecycle, FaFlask, FaBan } from 'react-icons/fa'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'

const specialities = [
  {
    icon: <FaBan />,
    title: 'No Onion No Garlic',
    desc: 'Pure satvik food preparation'
  },
  {
    icon: <FaLeaf />,
    title: '100% Plant-Based',
    desc: 'Eco-Friendly Cutlery'
  },
  {
    icon: <FaRecycle />,
    title: 'Biodegradable',
    desc: 'Disposable Cutlery'
  },
  {
    icon: <FaFlask />,
    title: 'Food-Grade & Non-Toxic',
    desc: 'Sustainable Cutlery'
  },
  {
    icon: <FaSeedling />,
    title: 'Plastic-Free',
    desc: 'Premium Cutlery'
  },
]

export default function Speciality() {
  const scope = useGsapContext((self, root) => {
    if (prefersReducedMotion()) return

    const row = root.querySelector('.lx-spc-row')
    if (!row) return

    /* fresh config per tween — ScrollTrigger annotates the object it is given */
    const trig = () => ({ trigger: row, start: 'top 90%', once: true })

    gsap.from(root.querySelectorAll('.lx-spc-label'), {
      y: 18, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: trig(),
    })

    gsap.from(row.querySelectorAll('.lx-spc-text'), {
      y: 16, opacity: 0, duration: 0.65, stagger: 0.07, delay: 0.14,
      ease: 'power3.out', scrollTrigger: trig(),
    })

    /* the one "wow": each gold ring pops in with a short spring */
    gsap.from(row.querySelectorAll('.lx-spc-icon'), {
      scale: 0.35, opacity: 0, duration: 0.8, stagger: 0.07, delay: 0.06,
      ease: 'back.out(2.4)', scrollTrigger: trig(),
    })

    gsap.from(row.querySelectorAll('.lx-spc-rule'), {
      scaleY: 0, opacity: 0, duration: 0.6, stagger: 0.07, delay: 0.2,
      ease: 'power2.out', scrollTrigger: trig(),
    })
  }, [])

  return (
    <section id="speciality" className="lx-spc" ref={scope}>
      <span className="lx-spc-glow" aria-hidden="true" />

      <div className="lx-ct-wide">
        <div className="lx-spc-head">
          <span className="lx-eyebrow lx-eyebrow--center lx-spc-label">Our Speciality</span>
        </div>

        <div className="lx-spc-row">
          {specialities.map((s, i) => (
            <Fragment key={i}>
              <div className="lx-spc-item">
                <span className="lx-spc-icon" aria-hidden="true">{s.icon}</span>
                <div className="lx-spc-text">
                  <div className="lx-spc-title">{s.title}</div>
                  <div className="lx-spc-desc">{s.desc}</div>
                </div>
              </div>
              {i < specialities.length - 1 && (
                <span className="lx-spc-rule" aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

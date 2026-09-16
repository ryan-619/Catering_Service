import { memo, useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import {
  FaMosque, FaCalendarAlt, FaBoxOpen, FaHandsHelping,
  FaLeaf, FaWhatsapp, FaHeart, FaCheck, FaExclamationCircle,
} from 'react-icons/fa'

import { submitCharity } from '../api/api'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import CountUp from './ui/CountUp'
import MagneticButton from './ui/MagneticButton'
import { gsap, prefersReducedMotion, isTouch } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'

import s1 from '../assets/seva/s1.jpeg'
import s2 from '../assets/seva/s2.jpeg'
import s3 from '../assets/seva/s3.jpeg'
import s4 from '../assets/seva/s4.jpeg'
import s5 from '../assets/seva/s5.jpeg'
import s6 from '../assets/seva/s6.jpeg'
import s7 from '../assets/seva/s7.jpeg'
import s8 from '../assets/seva/s8.jpeg'

const sevaPhotos = [
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820510/WhatsApp_Image_2026-07-23_at_2.12.25_PM_2_fvyvix.jpg',
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820499/WhatsApp_Image_2026-07-23_at_2.12.25_PM_vdxdcj.jpg',
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820496/WhatsApp_Image_2026-07-23_at_2.12.25_PM_1_lgclgi.jpg',
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820341/WhatsApp_Image_2026-07-23_at_2.12.23_PM_kng2iv.jpg',
  'https://res.cloudinary.com/r9upjg8g/image/upload/v1784820341/WhatsApp_Image_2026-07-23_at_2.12.24_PM_ctph53.jpg',
]
// Second slideshow — food distribution seva, rotates independently of the one above.
const sevaPhotos2 = [s1, s2, s3, s4, s5, s6, s7, s8]

const cards = [
  {
    icon: <FaMosque />,
    title: 'Where',
    desc: 'Hanuman Mandir, Gandhi Gram, Kanpur, U.P.'
  },
  {
    icon: <FaCalendarAlt />,
    title: 'When',
    desc: 'Every Tuesday, 5:00 PM – 8:00 PM — Prasad Vitaran'
  },
  {
    icon: <FaBoxOpen />,
    title: 'What We Serve',
    desc: 'Fresh, hot, pure vegetarian prasad prepared with love and devotion.'
  },
  {
    icon: <FaHandsHelping />,
    title: 'How to Help',
    desc: 'Donate meals, volunteer your time, or sponsor a Tuesday distribution.'
  },
]

const WA_LINK =
  'https://wa.me/919936485155?text=Hello! I want to volunteer/donate for your prasad vitaran at Hanuman Mandir.'

/**
 * Seva frame — one fading Swiper inside a rounded, gold-hairlined window.
 * No arrows, no dots: the photography is meant to breathe on its own, so the
 * only control is the drag the visitor may or may not discover.
 *
 * memo'd on purpose: the form below lives in the same component tree, and
 * without this every keystroke would re-render both carousels.
 */
const SevaFrame = memo(function SevaFrame({ photos, alt, delay, variant, parallax }) {
  // Resolved once, at first render, so Swiper is initialised with its final
  // autoplay setting instead of having the param swapped under it afterwards.
  const autoplay = useMemo(
    () => (prefersReducedMotion() ? false : { delay, disableOnInteraction: false }),
    [delay],
  )

  return (
    <figure className={`lx-ch-frame lx-ch-frame--${variant}`} data-ch-par={parallax}>
      <Swiper
        className="lx-ch-shots"
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop
        allowTouchMove
        autoplay={autoplay}
      >
        {photos.map((photo, i) => (
          <SwiperSlide key={i}>
            <img src={photo} alt={`${alt} ${i + 1}`} loading="lazy" decoding="async" />
          </SwiperSlide>
        ))}
      </Swiper>
    </figure>
  )
})

export default function Charity() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    if (!form.name || !form.phone) {
      setError('Please enter your name and phone number.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await submitCharity(form)
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  /* Motion: the two photo frames drift against each other on scroll, and the
     gold rule beside the info list draws itself down. Everything is scoped to
     the section so StrictMode's double-invoke cannot stack triggers. */
  const scope = useGsapContext((ctx, root) => {
    if (prefersReducedMotion()) return

    const rule = root.querySelector('[data-ch-rule]')
    if (rule) {
      gsap.fromTo(rule,
        { scaleY: 0, transformOrigin: '50% 0%' },
        {
          scaleY: 1, transformOrigin: '50% 0%', duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: rule, start: 'top 84%', once: true },
        })
    }

    const media = root.querySelector('[data-ch-media]')
    if (!media) return

    /* The photo wipe is clipped on the Swiper surface rather than on a
       wrapper: Reveal's `mask` leaves its clip-path in place for good, which
       would slice the frames' drop shadows off square. Inside the frame the
       clip has nothing to damage — the frame already hides its overflow. */
    const shots = media.querySelectorAll('.lx-ch-shots')
    if (shots.length) {
      gsap.fromTo(shots,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: media, start: 'top 84%', once: true },
        })
    }

    if (isTouch()) return
    const main = media.querySelector('[data-ch-par="main"]')
    const sub = media.querySelector('[data-ch-par="sub"]')
    if (!main || !sub) return

    const drift = { trigger: media, start: 'top bottom', end: 'bottom top', scrub: 0.85 }
    gsap.fromTo(main, { yPercent: -3.2 }, { yPercent: 3.2, ease: 'none', scrollTrigger: drift })
    gsap.fromTo(sub, { yPercent: 8 }, { yPercent: -8, ease: 'none', scrollTrigger: drift })
  }, [])

  return (
    <section id="charity" className="lx-sec lx-ch" ref={scope}>
      <span className="lx-wash lx-ch-wash lx-ch-wash--a" aria-hidden="true" />
      <span className="lx-wash lx-ch-wash lx-ch-wash--b" aria-hidden="true" />

      <div className="lx-ct lx-ch-ct">

        {/* ── Split: story left, photography right ── */}
        <div className="lx-ch-split">

          {/* Left — the story */}
          <div className="lx-ch-story">
            <Reveal from="up" duration={0.8}>
              <span className="lx-eyebrow">Seva &amp; Compassion</span>
            </Reveal>

            <Reveal from="zoom" duration={0.7} delay={0.05}>
              <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
            </Reveal>

            <SplitHeading className="lx-h2 lx-ch-title">
              {'Prasad Vitaran —\nSeva & Compassion'}
            </SplitHeading>

            <Reveal from="up" delay={0.1}>
              <p className="lx-lead lx-ch-lead">
                Every Tuesday, we distribute prasad outside Hanuman Mandir, Gandhi Gram, Kanpur —
                because serving food is serving God. Join us in this sacred mission.
              </p>
            </Reveal>

            <Reveal from="up" delay={0.12} className="lx-ch-mission">
              <span className="lx-ch-mission-ey">Our Mission</span>
              <h3 className="lx-h3 lx-ch-mission-title">
                Serving the Community<br />
                <em>Every Tuesday</em>
              </h3>
              <p className="lx-body">
                At LTCS, we believe food is more than a business — it is a blessing and
                a form of seva. Every Tuesday evening, we gather at
                <strong> Hanuman Mandir, Gandhi Gram, Kanpur</strong> to distribute
                prasad to devotees and those in need.
              </p>
              <p className="lx-body">
                From 5PM to 8PM every Tuesday, our dedicated volunteers ensure that
                warm, nutritious, pure vegetarian prasad reaches everyone with
                <strong> devotion, dignity and love</strong>.
              </p>
            </Reveal>

            {/* Four info rows — where / when / what / how */}
            <div className="lx-ch-facts">
              <span className="lx-ch-rule" data-ch-rule aria-hidden="true" />
              <Reveal as="ul" from="up" stagger={0.08} className="lx-ch-list">
                {cards.map((c) => (
                  <li className="lx-ch-row" key={c.title}>
                    <span className="lx-ch-row-ico" aria-hidden="true">{c.icon}</span>
                    <div className="lx-ch-row-body">
                      <h3 className="lx-ch-row-lab">{c.title}</h3>
                      <p className="lx-ch-row-txt">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>

          {/* Right — the photography */}
          <Reveal from="up" duration={0.9} className="lx-ch-media" data-ch-media>
            <div className="lx-ch-stack">
              <SevaFrame
                photos={sevaPhotos}
                alt="Seva event"
                delay={4600}
                variant="main"
                parallax="main"
              />
              <SevaFrame
                photos={sevaPhotos2}
                alt="Prasad distribution"
                delay={6100}
                variant="sub"
                parallax="sub"
              />
              <span className="lx-ch-stamp" aria-hidden="true">
                <b>Tue</b>
                <i>5 – 8 PM</i>
              </span>
            </div>
          </Reveal>
        </div>

        {/* ── The ledger of the seva ── */}
        <Reveal from="up" stagger={0.08} className="lx-ch-ledger">
          <div className="lx-ch-fig">
            <span className="lx-ch-fig-n"><CountUp to={1000} suffix="+" separator={false} /></span>
            <span className="lx-ch-fig-l">Prasad Every Tuesday</span>
          </div>
          <div className="lx-ch-fig">
            <span className="lx-ch-fig-n"><CountUp to={52} suffix="+" separator={false} /></span>
            <span className="lx-ch-fig-l">Tuesdays a Year</span>
          </div>
          <div className="lx-ch-fig">
            <span className="lx-ch-fig-n">∞</span>
            <span className="lx-ch-fig-l">Love &amp; Devotion</span>
          </div>
        </Reveal>

        {/* ── Join in ── */}
        <div className="lx-ch-give">
          <Reveal from="up" className="lx-ch-give-head">
            <span className="lx-eyebrow lx-eyebrow--center lx-ch-give-ey">
              <FaHeart aria-hidden="true" /> Join the seva
            </span>
            <h3 className="lx-h3 lx-ch-give-title">Be Part of This Mission</h3>
            <p className="lx-body lx-ch-give-lead">
              Join us as a volunteer or sponsor prasad for those in need.
            </p>
          </Reveal>

          <Reveal from="up" delay={0.08}>
            <div className="lx-ch-card">
              {submitted ? (
                <div className="lx-ch-done" role="status">
                  <span className="lx-ch-done-mark" aria-hidden="true"><FaCheck /></span>
                  <h4 className="lx-ch-done-title">Thank You!</h4>
                  <p className="lx-ch-done-txt">We will contact you soon. Your kindness matters.</p>
                  <MagneticButton
                    variant="wa"
                    size="sm"
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="lx-ch-wa"
                  >
                    <FaWhatsapp aria-hidden="true" /> WhatsApp Us Directly
                  </MagneticButton>
                </div>
              ) : (
                <div className="lx-ch-form">
                  {error && (
                    <p className="lx-ch-err" role="alert">
                      <FaExclamationCircle aria-hidden="true" /> {error}
                    </p>
                  )}

                  <div className="lx-ch-fields">
                    <div className="lx-ch-field">
                      <input
                        id="ch-name" className="lx-ch-inp" type="text" name="name"
                        placeholder="Full name" value={form.name} onChange={handle}
                        autoComplete="name" required
                      />
                      <label className="lx-ch-label" htmlFor="ch-name">Your Name</label>
                    </div>

                    <div className="lx-ch-field">
                      <input
                        id="ch-phone" className="lx-ch-inp" type="tel" name="phone"
                        placeholder="+91 xxxxx xxxxx" value={form.phone} onChange={handle}
                        autoComplete="tel" required
                      />
                      <label className="lx-ch-label" htmlFor="ch-phone">Phone</label>
                    </div>

                    <div className="lx-ch-field is-full">
                      <input
                        id="ch-email" className="lx-ch-inp" type="email" name="email"
                        placeholder="you@example.com" value={form.email} onChange={handle}
                        autoComplete="email"
                      />
                      <label className="lx-ch-label" htmlFor="ch-email">Email (optional)</label>
                    </div>

                    <div className="lx-ch-field lx-ch-field--select is-full">
                      <select id="ch-type" className="lx-ch-inp" name="type" value={form.type} onChange={handle}>
                        <option value="">Select your contribution…</option>
                        <option>Volunteer on Tuesdays</option>
                        <option>Sponsor prasad (one time)</option>
                        <option>Sponsor prasad (monthly)</option>
                        <option>Donate groceries / supplies</option>
                        <option>Spread awareness</option>
                      </select>
                      <label className="lx-ch-label" htmlFor="ch-type">I want to</label>
                      <span className="lx-ch-caret" aria-hidden="true" />
                    </div>

                    <div className="lx-ch-field lx-ch-field--area is-full">
                      <textarea
                        id="ch-message" className="lx-ch-inp" name="message" rows={4}
                        placeholder="Any message for us…" value={form.message} onChange={handle}
                      ></textarea>
                      <label className="lx-ch-label" htmlFor="ch-message">Message (optional)</label>
                    </div>
                  </div>

                  <div className="lx-ch-actions">
                    <MagneticButton
                      variant="gold"
                      onClick={submit}
                      disabled={loading}
                      aria-busy={loading}
                      className="lx-ch-submit"
                    >
                      <FaLeaf aria-hidden="true" />
                      {loading ? 'Submitting...' : 'Join the Mission'}
                    </MagneticButton>

                    <MagneticButton
                      variant="wa"
                      size="sm"
                      href={WA_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="lx-ch-wa"
                    >
                      <FaWhatsapp aria-hidden="true" /> Or WhatsApp Us Directly
                    </MagneticButton>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

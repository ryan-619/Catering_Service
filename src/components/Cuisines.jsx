import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaFire, FaLeaf, FaStar, FaPizzaSlice, FaCrown, FaGlassCheers,
  FaCookie, FaSeedling, FaTimes, FaWhatsapp, FaArrowRight,
} from 'react-icons/fa'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'
import SplitHeading from './ui/SplitHeading'
import TiltCard from './ui/TiltCard'
import MagneticButton from './ui/MagneticButton'

const cuisines = [
  {
    name: 'North Indian',
    badge: 'Most Popular',
    badgeIcon: <FaStar />,
    badgeColor: '#1B7B34',
    desc: 'Paneer delicacies, rich curries, butter naan, dal makhani, and authentic Punjabi flavors.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Paneer_Butter_Masala_3.jpg/960px-Paneer_Butter_Masala_3.jpg',
    dishes: [
      { name: 'Dal Makhani', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Dal_Makhani.jpg' },
      { name: 'Paneer Butter Masala', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Paneer_Butter_Masala_3.jpg/960px-Paneer_Butter_Masala_3.jpg' },
      { name: 'Butter Naan', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Butter_Naan_2.jpg/960px-Butter_Naan_2.jpg' },
      { name: 'Chole Bhature', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Chole_Bhature_5.jpg/960px-Chole_Bhature_5.jpg' },
      { name: 'Aloo Gobi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Aloo_gobi.jpg/960px-Aloo_gobi.jpg' },
      { name: 'Gulab Jamun', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Gulab_Jamun_as_a_Diwali_Sweet.jpg/960px-Gulab_Jamun_as_a_Diwali_Sweet.jpg' },
    ]
  },
  {
    name: 'South Indian',
    badge: 'Traditional',
    badgeIcon: <FaLeaf />,
    badgeColor: '#7B4F1B',
    desc: 'Fresh dosas, idlis, uttapams, sambhar, coconut chutneys, and traditional specialties.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Masala_dosa_01.jpg/960px-Masala_dosa_01.jpg',
    dishes: [
      { name: 'Masala Dosa', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Masala_dosa_01.jpg/960px-Masala_dosa_01.jpg' },
      { name: 'Idli Sambhar', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Idli_Sambar-Noida-UP-SP004.jpg/960px-Idli_Sambar-Noida-UP-SP004.jpg' },
      { name: 'Uttapam', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Uttapam_dosa.jpg/960px-Uttapam_dosa.jpg' },
      { name: 'Coconut Chutney', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Coconut_Chutney_%28Indian_Cuisine%29.jpg/960px-Coconut_Chutney_%28Indian_Cuisine%29.jpg' },
      { name: 'Rasam', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Rasam.JPG/960px-Rasam.JPG' },
      { name: 'Pongal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ven_Pongal_with_cashew.jpg/960px-Ven_Pongal_with_cashew.jpg' },
    ]
  },
  {
    name: 'Chinese',
    badge: "Chef's Special",
    badgeIcon: <FaFire />,
    badgeColor: '#C2185B',
    desc: 'Noodles, fried rice, Manchurian, spring rolls, and Indo-Chinese favorites.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Tasty_hakka_noodles_image.jpg/960px-Tasty_hakka_noodles_image.jpg',
    dishes: [
      { name: 'Veg Fried Rice', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Vegetable_Fried_Rice.jpg/960px-Vegetable_Fried_Rice.jpg' },
      { name: 'Hakka Noodles', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Tasty_hakka_noodles_image.jpg/960px-Tasty_hakka_noodles_image.jpg' },
      { name: 'Veg Manchurian', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Veg_manchurian_Balls.jpg/960px-Veg_manchurian_Balls.jpg' },
      { name: 'Spring Rolls', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Spring_roll_001.jpg/960px-Spring_roll_001.jpg' },
      { name: 'Chilli Paneer', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Chilly_Paneer_01.jpg/960px-Chilly_Paneer_01.jpg' },
      { name: 'Sweet Corn Soup', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Corn_cream_soup.jpg/960px-Corn_cream_soup.jpg' },
    ]
  },
  {
    name: 'Italian',
    badge: "Kids' Favorite",
    badgeIcon: <FaPizzaSlice />,
    badgeColor: '#1565C0',
    desc: 'Wood-fired pizzas, creamy pasta, garlic bread, and lasagna.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Margherita_pizza_on_plate.jpg/960px-Margherita_pizza_on_plate.jpg',
    dishes: [
      { name: 'Margherita Pizza', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Margherita_pizza_on_plate.jpg/960px-Margherita_pizza_on_plate.jpg' },
      { name: 'Penne Arrabbiata', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Penne_Arrabbiata.jpg/960px-Penne_Arrabbiata.jpg' },
      { name: 'Garlic Bread', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Garlic_bread_-_on_plate%2C_ready_to_eat.jpg/960px-Garlic_bread_-_on_plate%2C_ready_to_eat.jpg' },
      { name: 'Lasagna', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Vegetarian-lasagna_.jpg/960px-Vegetarian-lasagna_.jpg' },
      { name: 'Bruschetta', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Bruschetta.jpg/960px-Bruschetta.jpg' },
      { name: 'Tiramisu', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Tiramisu_dessert.jpg/960px-Tiramisu_dessert.jpg' },
    ]
  },
  {
    name: 'Continental',
    badge: 'Premium Selection',
    badgeIcon: <FaCrown />,
    badgeColor: '#4A148C',
    desc: 'Fresh salads, grilled vegetables, gourmet pasta, and international cuisine.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Grilled_vegetables_%2820240910%29.jpg/960px-Grilled_vegetables_%2820240910%29.jpg',
    dishes: [
      { name: 'Caesar Salad', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Caesar-salad.jpg/960px-Caesar-salad.jpg' },
      { name: 'Grilled Vegetables', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Grilled_vegetables_%2820240910%29.jpg/960px-Grilled_vegetables_%2820240910%29.jpg' },
      { name: 'Mushroom Soup', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Cream_Mushroom_soup_2.jpg/960px-Cream_Mushroom_soup_2.jpg' },
      { name: 'Stuffed Bell Pepper', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Quinoa_stuffed_peppers.jpg/960px-Quinoa_stuffed_peppers.jpg' },
      { name: 'Pasta Primavera', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Pasta_primavera.jpg/960px-Pasta_primavera.jpg' },
      { name: 'Panna Cotta', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Panna_Cotta_with_cream_and_garnish.jpg/960px-Panna_Cotta_with_cream_and_garnish.jpg' },
    ]
  },
  {
    name: 'Street Food',
    badge: 'Party Favourite',
    badgeIcon: <FaGlassCheers />,
    badgeColor: '#E65100',
    desc: 'Pani Puri, Chaat, Tikki, Pav Bhaji, and live street-food counters.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Pav_Bhaji.jpg',
    dishes: [
      { name: 'Pani Puri', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Crispy_Pani_Puri.jpg/960px-Crispy_Pani_Puri.jpg' },
      { name: 'Pav Bhaji', img: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Pav_Bhaji.jpg' },
      { name: 'Aloo Tikki', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Aloo_Tikki_served_with_chutneys.jpg/960px-Aloo_Tikki_served_with_chutneys.jpg' },
      { name: 'Bhel Puri', img: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Bhel_puri_Snack.jpg' },
      { name: 'Samosa', img: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Samosa_with_sweet_chutney.jpg' },
      { name: 'Dahi Papdi', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Papri_chat_with_dahi_in_IIT_canteen.jpg' },
    ]
  },
  {
    name: 'Desserts',
    badge: 'Sweet Moments',
    badgeIcon: <FaCookie />,
    badgeColor: '#880E4F',
    desc: 'Traditional Indian sweets, pastries, cakes, ice cream, and dessert stations.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Delicious_Gajar_Ka_Halwa.jpg/960px-Delicious_Gajar_Ka_Halwa.jpg',
    dishes: [
      { name: 'Gulab Jamun', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Two_Gulab_Jamun_in_a_plate_01.jpg/960px-Two_Gulab_Jamun_in_a_plate_01.jpg' },
      { name: 'Rasmalai', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Rasmalai_3.jpg/960px-Rasmalai_3.jpg' },
      { name: 'Gajar Halwa', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Delicious_Gajar_Ka_Halwa.jpg/960px-Delicious_Gajar_Ka_Halwa.jpg' },
      { name: 'Kheer', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kheer.jpg/960px-Kheer.jpg' },
      { name: 'Jalebi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Jalebi_1.jpg/960px-Jalebi_1.jpg' },
      { name: 'Barfi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Barfi.JPG/960px-Barfi.JPG' },
    ]
  },
  {
    name: 'Jain & Healthy',
    badge: 'Healthy Choice',
    badgeIcon: <FaSeedling />,
    badgeColor: '#2E7D32',
    desc: 'Pure Jain cuisine, vegan options, and customized healthy meal selections.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Fruit_Salad_4.jpg/960px-Fruit_Salad_4.jpg',
    dishes: [
      { name: 'Jain Dal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Dal_tadka_and_chapati.jpg/960px-Dal_tadka_and_chapati.jpg' },
      { name: 'Quinoa Salad', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Quinoa_Salad_%285045982815%29.jpg/960px-Quinoa_Salad_%285045982815%29.jpg' },
      { name: 'Jain Sabzi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Mixed_vegetable_curry_1.jpg/960px-Mixed_vegetable_curry_1.jpg' },
      { name: 'Fruit Bowl', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Fruit_Salad_4.jpg/960px-Fruit_Salad_4.jpg' },
      { name: 'Sprout Chaat', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sprouted_Moong_Salad.JPG/960px-Sprouted_Moong_Salad.JPG' },
      { name: 'Jain Khichdi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Masala_Khichadi.jpg/960px-Masala_Khichadi.jpg' },
    ]
  },
]

// Full menu — 15 categories, 5 signature items each. Listed as text rather
// than photos: sourcing 75 accurate dish images isn't practical, and a wrong
// photo next to a dish name is worse than no photo at all.
const menuCategories = [
  { icon: '🥂', name: 'Welcome Drinks & Mocktails', items: ['Virgin Mojito', 'Blue Lagoon', 'Fruit Punch', 'Fresh Lime Soda', 'Cold Coffee'] },
  { icon: '🍲', name: 'Soups', items: ['Tomato Soup with Cream', 'Sweet Corn Soup', 'Manchow Soup', 'Thai Vegetable Soup', 'Lemon Coriander Soup'] },
  { icon: '🧆', name: 'Signature Starters', items: ['Malai Paneer Tikka', 'Achari Paneer Tikka', 'Spring Roll', 'Hariyali Kabab', 'Crispy Potato'] },
  { icon: '🥙', name: 'Live Chaat Counter', items: ['Raj Kachori', 'Bhalla Papdi Chaat', 'Banarasi Tomato Chaat', 'Basket Chaat', 'Pani Ka Batashe'] },
  { icon: '🍜', name: 'Indo-Chinese', items: ['Hakka Noodles', 'Veg Manchurian', 'Paneer Manchurian', 'Chilli Paneer', 'Fried Rice'] },
  { icon: '🥞', name: 'South Indian', items: ['Masala Dosa', 'Paper Dosa', 'Idli Sambar', 'Rava Dosa', 'Sambar Vada'] },
  { icon: '🍕', name: 'Italian Corner', items: ['Mini Pizza', 'Paneer Pizza', 'Cheese Pasta', 'Baked Pasta', 'Garlic Bread'] },
  { icon: '🍛', name: 'North Indian Main Course', items: ['Shahi Paneer', 'Paneer Makhani', 'Methi Malai Paneer', 'Dal Makhani', 'Navratan Korma'] },
  { icon: '🍚', name: 'Rice & Pulao', items: ['Veg Pulao', 'Jeera Rice', 'Kashmiri Rice', 'Matar Pulao', 'Steam Rice'] },
  { icon: '🫓', name: 'Indian Breads', items: ['Butter Naan', 'Lachha Paratha', 'Missi Roti', 'Tandoori Roti', 'Stuffed Kulcha'] },
  { icon: '🥗', name: 'Salads & Accompaniments', items: ['Green Salad', 'Russian Salad', 'Fruit Raita', 'Boondi Raita', 'Masala Papad'] },
  { icon: '🍰', name: 'Desserts & Mithai', items: ['Gulab Jamun', 'Rasmalai', 'Jalebi with Rabdi', 'Gajar Halwa', 'Kesar Kheer'] },
  { icon: '🍨', name: 'Ice Cream Station', items: ['Ice Cream Parlour', 'Softy', 'Ice Cream Roll', 'Cream Ball Ice Cream', 'Ice Cream with Sauces'] },
  { icon: '🍉', name: 'Fresh Fruit Counter', items: ['Watermelon', 'Pineapple', 'Grapes', 'Dragon Fruit', 'Kiwi'] },
  { icon: '🌍', name: 'Regional Food Experiences', items: ['Amritsari Kulcha', 'Sarson Ka Saag & Makki Ki Roti', 'Dal Baati Churma', 'Gujarati Dhokla', 'Khandvi'] },
]

const WA_NUMBER = '919936485155'

export default function Cuisines({ onBookNow }) {
  const [selected, setSelected] = useState(null)
  // Wikimedia URLs rot. A tile whose photo 404s is removed rather than left
  // showing a torn-image glyph in the middle of a luxury grid.
  const [broken, setBroken] = useState(() => new Set())

  const closeRef = useRef(null)
  const lastTrigger = useRef(null)

  const markBroken = useCallback((src) => {
    setBroken((prev) => {
      if (prev.has(src)) return prev
      const next = new Set(prev)
      next.add(src)
      return next
    })
  }, [])

  const close = useCallback(() => setSelected(null), [])

  const open = useCallback((c, e) => {
    lastTrigger.current = e?.currentTarget || null
    setSelected(c)
  }, [])

  /* ── Engineered motion: each card photo drifts inside its own 4:3 frame.
        The lens wrapper is what GSAP moves, so the CSS hover zoom on the
        <img> never fights the scrubbed transform. ── */
  const scope = useGsapContext((ctx, root) => {
    if (prefersReducedMotion()) return
    gsap.utils.toArray('.lx-cuis-lens', root).forEach((lens) => {
      gsap.fromTo(
        lens,
        { yPercent: -4.5 },
        {
          yPercent: 4.5,
          ease: 'none',
          scrollTrigger: {
            trigger: lens.parentElement || lens,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    })
  }, [])

  const modalWa = selected
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello! Please share your ${selected.name} menu details.`)}`
    : ''

  /* ── Escape to close + hand the scroll back to Lenis when we let go ── */
  useEffect(() => {
    if (!selected) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    window.lxLenis?.stop()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      window.lxLenis?.start()
      document.body.style.overflow = prev
    }
  }, [selected, close])

  useEffect(() => {
    if (selected) {
      const t = setTimeout(() => closeRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
    lastTrigger.current?.focus?.()
  }, [selected])

  const spring = prefersReducedMotion()
    ? { duration: 0.01 }
    : { type: 'spring', stiffness: 280, damping: 26, mass: 0.9 }

  const modal = (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="lx-cuis-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} signature dishes`}
        >
          <motion.div
            className="lx-cuis-sheet"
            style={{ '--lx-cuis-tint': selected.badgeColor }}
            initial={{ opacity: 0, scale: 0.92, y: 34 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={spring}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="lx-cuis-sheet-head">
              <div className="lx-cuis-sheet-text">
                <span className="lx-cuis-sheet-badge">
                  <i aria-hidden="true">{selected.badgeIcon}</i>
                  {selected.badge}
                </span>
                <h3 className="lx-cuis-sheet-title">{selected.name} Cuisine</h3>
                <p className="lx-cuis-sheet-desc">{selected.desc}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="lx-cuis-x"
                onClick={close}
                aria-label="Close dish list"
                data-cursor="hot"
              >
                <FaTimes />
              </button>
            </header>

            <div className="lx-cuis-sheet-body">
              <span className="lx-eyebrow lx-cuis-sheet-sub">Our Signature Dishes</span>

              <div className="lx-cuis-dishes">
                {selected.dishes.map((dish, i) => (
                  broken.has(dish.img) ? null : (
                    <motion.figure
                      className="lx-cuis-dish"
                      key={dish.name}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: prefersReducedMotion() ? 0 : i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={dish.img}
                        alt={dish.name}
                        loading="lazy"
                        decoding="async"
                        onError={() => markBroken(dish.img)}
                      />
                      <span className="lx-cuis-dish-scrim" aria-hidden="true" />
                      <figcaption className="lx-cuis-dish-name">{dish.name}</figcaption>
                    </motion.figure>
                  )
                ))}
              </div>
            </div>

            <footer className="lx-cuis-sheet-foot">
              <p className="lx-cuis-veg">
                <FaLeaf aria-hidden="true" />
                All dishes are <strong>100% Pure Vegetarian</strong>
              </p>
              <div className="lx-cuis-foot-actions">
                <a
                  className="lx-btn lx-btn--wa lx-btn--sm"
                  href={modalWa}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hot"
                >
                  <span><FaWhatsapp /> Ask About This Menu</span>
                </a>
                <button type="button" className="lx-btn lx-btn--ghost lx-btn--sm" onClick={close}>
                  <span>Close</span>
                </button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <section id="cuisines" ref={scope} className="lx-sec lx-sec--ivory lx-cuis">
      <span className="lx-wash lx-wash--gold lx-cuis-wash lx-cuis-wash--a" aria-hidden="true" />
      <span className="lx-wash lx-wash--green lx-cuis-wash lx-cuis-wash--b" aria-hidden="true" />

      <div className="lx-ct">
        <SectionHead
          eyebrow="What We Serve"
          title={'Explore Our\nSignature Cuisines'}
          lead="Click on any cuisine to explore the dishes we offer. From authentic Indian delicacies to international favorites."
          className="lx-cuis-head"
        />

        <Reveal stagger={0.08} className="lx-cuis-grid">
          {cuisines.map((c) => (
            <TiltCard key={c.name} max={6} className="lx-cuis-tilt">
              <article
                className="lx-cuis-card lx-topline"
                style={{ '--lx-cuis-tint': c.badgeColor }}
                role="button"
                tabIndex={0}
                aria-label={`${c.name} — view dishes`}
                data-cursor="hot"
                onClick={(e) => open(c, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(c, e) }
                }}
              >
                <div className="lx-cuis-shot">
                  <span className="lx-cuis-lens">
                    {broken.has(c.img) ? (
                      <span className="lx-cuis-fallback" aria-hidden="true" />
                    ) : (
                      <img
                        src={c.img}
                        alt={c.name}
                        className="lx-cuis-img"
                        loading="lazy"
                        decoding="async"
                        onError={() => markBroken(c.img)}
                      />
                    )}
                  </span>
                  <span className="lx-cuis-scrim" aria-hidden="true" />
                  <span className="lx-cuis-badge lx-tilt-layer">
                    <i aria-hidden="true">{c.badgeIcon}</i>
                    {c.badge}
                  </span>
                </div>

                <div className="lx-cuis-body">
                  <h3 className="lx-cuis-name">{c.name}</h3>
                  <p className="lx-cuis-desc">{c.desc}</p>
                  <span className="lx-cuis-go">
                    View Dishes
                    <FaArrowRight aria-hidden="true" />
                  </span>
                </div>
              </article>
            </TiltCard>
          ))}
        </Reveal>

        {/* ── The full spread ── */}
        <div className="lx-cuis-menu">
          <div className="lx-cuis-menu-head">
            <Reveal from="up" duration={0.8}>
              <span className="lx-eyebrow lx-eyebrow--center">The Full Spread</span>
            </Reveal>
            <Reveal from="zoom" duration={0.7} delay={0.05}>
              <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
            </Reveal>
            <SplitHeading as="h3" className="lx-h2 lx-cuis-menu-title">
              A Glimpse of Our Menu
            </SplitHeading>
          </div>

          <Reveal stagger={0.05} className="lx-cuis-menu-grid">
            {menuCategories.map((cat) => (
              <article className="lx-cuis-mcard lx-topline" key={cat.name}>
                <div className="lx-cuis-mcard-head">
                  <span className="lx-cuis-mcard-icon" aria-hidden="true">{cat.icon}</span>
                  <h4 className="lx-cuis-mcard-title">{cat.name}</h4>
                </div>
                <ul className="lx-cuis-mcard-list">
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>

          <Reveal from="up" delay={0.05}>
            <div className="lx-cuis-cta">
              <span className="lx-cuis-cta-orn" aria-hidden="true"><i /><b /><i /></span>
              <h4 className="lx-cuis-cta-title">Request Our Complete Menu</h4>
              <p className="lx-cuis-cta-desc">
                Customized menus available for Weddings, Corporate Events,
                Social Gatherings &amp; Special Celebrations.
              </p>
              <div className="lx-btn-row lx-cuis-cta-row">
                <MagneticButton variant="gold" onClick={onBookNow}>
                  Request Complete Menu
                </MagneticButton>
                <MagneticButton
                  variant="wa"
                  href={`https://wa.me/${WA_NUMBER}?text=Hello! Please share your complete catering menu.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp /> WhatsApp Us
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(modal, document.body)}
    </section>
  )
}

import { useState } from 'react'
import { FaFire, FaLeaf, FaStar, FaPizzaSlice, FaCrown, FaGlassCheers, FaCookie, FaSeedling, FaTimes, FaWhatsapp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, Stagger, StaggerItem } from './AnimatedSection'

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

export default function Cuisines({ onBookNow }) {
  const [selected, setSelected] = useState(null)

  return (
    <section id="cuisines">
      <div className="ct">
        <FadeUp>
          <div className="cuisines-header">
            <span className="ey">What We Serve</span>
            <span className="gline"></span>
            <h2 className="st">Explore Our Signature Cuisines</h2>
            <p className="cuisines-subtitle">
              Click on any cuisine to explore the dishes we offer.
              From authentic Indian delicacies to international favorites.
            </p>
          </div>
        </FadeUp>

        <Stagger className="cuisines-grid">
          {cuisines.map((c) => (
            <StaggerItem key={c.name}>
              <div
                className="cuisine-card"
                onClick={() => setSelected(c)}
                style={{ cursor: 'pointer' }}
              >
                <div className="cuisine-img-wrap">
                  <img src={c.img} alt={c.name} className="cuisine-img" loading="lazy" />
                  <div className="cuisine-gradient"></div>
                  <span className="cuisine-badge" style={{ background: c.badgeColor }}>
                    <span className="cuisine-badge-icon">{c.badgeIcon}</span>
                    {c.badge}
                  </span>
                </div>
                <div className="cuisine-body">
                  <h3 className="cuisine-name">{c.name}</h3>
                  <p className="cuisine-desc">{c.desc}</p>
                  <div className="cuisine-explore">
                    Explore Dishes →
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Full Menu */}
        <FadeUp>
          <div className="menu-block">
            <div className="menu-block-head">
              <span className="ey">The Full Spread</span>
              <span className="gline"></span>
              <h3 className="menu-block-title">A Glimpse of Our Menu</h3>
            </div>

            <div className="menu-grid">
              {menuCategories.map((cat, i) => (
                <motion.div
                  className="menu-card"
                  key={cat.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                >
                  <div className="menu-card-head">
                    <span className="menu-card-icon" aria-hidden="true">{cat.icon}</span>
                    <h4 className="menu-card-title">{cat.name}</h4>
                  </div>
                  <ul className="menu-card-list">
                    {cat.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="menu-cta">
              <h4 className="menu-cta-title">Request Our Complete Menu</h4>
              <p className="menu-cta-desc">
                Customized menus available for Weddings, Corporate Events,
                Social Gatherings &amp; Special Celebrations.
              </p>
              <div className="menu-cta-actions">
                <button className="btn btn-y" onClick={onBookNow}>
                  Request Complete Menu
                </button>
                <a
                  href="https://wa.me/919936485155?text=Hello! Please share your complete catering menu."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-wa"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Cuisine Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="cuisine-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="cuisine-modal-box"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="cuisine-modal-header"
                style={{ background: selected.badgeColor }}
              >
                <div>
                  <div className="cuisine-modal-badge">
                    {selected.badgeIcon} {selected.badge}
                  </div>
                  <h3 className="cuisine-modal-title">{selected.name} Cuisine</h3>
                  <p className="cuisine-modal-desc">{selected.desc}</p>
                </div>
                <button
                  className="cuisine-modal-close"
                  onClick={() => setSelected(null)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Dishes Grid */}
              <div className="cuisine-modal-body">
                <p className="cuisine-modal-subtitle">Our Signature Dishes</p>
                <div className="cuisine-dishes-grid">
                  {selected.dishes.map((dish, i) => (
                    <motion.div
                      className="cuisine-dish-card"
                      key={dish.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                    >
                      <div className="cuisine-dish-img-wrap">
                        <img src={dish.img} alt={dish.name} loading="lazy" />
                        <div className="cuisine-dish-overlay"></div>
                      </div>
                      <div className="cuisine-dish-name">{dish.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="cuisine-modal-footer">
                <p>All dishes are <strong>100% Pure Vegetarian</strong></p>
                <button
                  className="btn btn-g"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
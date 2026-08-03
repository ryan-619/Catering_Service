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
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=85',
    dishes: [
      { name: 'Dal Makhani', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
      { name: 'Paneer Butter Masala', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
      { name: 'Butter Naan', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
      { name: 'Chole Bhature', img: 'https://images.unsplash.com/photo-1626132647523-66c9bbbf2d9a?w=400&q=80' },
      { name: 'Aloo Gobi', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
      { name: 'Gulab Jamun', img: 'https://images.unsplash.com/photo-1601303516534-bf4a475e3c75?w=400&q=80' },
    ]
  },
  {
    name: 'South Indian',
    badge: 'Traditional',
    badgeIcon: <FaLeaf />,
    badgeColor: '#7B4F1B',
    desc: 'Fresh dosas, idlis, uttapams, sambhar, coconut chutneys, and traditional specialties.',
    img: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=85',
    dishes: [
      { name: 'Masala Dosa', img: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80' },
      { name: 'Idli Sambhar', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
      { name: 'Uttapam', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
      { name: 'Coconut Chutney', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80' },
      { name: 'Rasam', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
      { name: 'Pongal', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80' },
    ]
  },
  {
    name: 'Chinese',
    badge: "Chef's Special",
    badgeIcon: <FaFire />,
    badgeColor: '#C2185B',
    desc: 'Noodles, fried rice, Manchurian, spring rolls, and Indo-Chinese favorites.',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=85',
    dishes: [
      { name: 'Veg Fried Rice', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
      { name: 'Hakka Noodles', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80' },
      { name: 'Veg Manchurian', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80' },
      { name: 'Spring Rolls', img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80' },
      { name: 'Chilli Paneer', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
      { name: 'Sweet Corn Soup', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
    ]
  },
  {
    name: 'Italian',
    badge: "Kids' Favorite",
    badgeIcon: <FaPizzaSlice />,
    badgeColor: '#1565C0',
    desc: 'Wood-fired pizzas, creamy pasta, garlic bread, and lasagna.',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
    dishes: [
      { name: 'Margherita Pizza', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
      { name: 'Penne Arrabbiata', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80' },
      { name: 'Garlic Bread', img: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=400&q=80' },
      { name: 'Lasagna', img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80' },
      { name: 'Bruschetta', img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80' },
      { name: 'Tiramisu', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80' },
    ]
  },
  {
    name: 'Continental',
    badge: 'Premium Selection',
    badgeIcon: <FaCrown />,
    badgeColor: '#4A148C',
    desc: 'Fresh salads, grilled vegetables, gourmet pasta, and international cuisine.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85',
    dishes: [
      { name: 'Caesar Salad', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80' },
      { name: 'Grilled Vegetables', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
      { name: 'Mushroom Soup', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
      { name: 'Stuffed Bell Pepper', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80' },
      { name: 'Pasta Primavera', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80' },
      { name: 'Panna Cotta', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
    ]
  },
  {
    name: 'Street Food',
    badge: 'Party Favourite',
    badgeIcon: <FaGlassCheers />,
    badgeColor: '#E65100',
    desc: 'Pani Puri, Chaat, Tikki, Pav Bhaji, and live street-food counters.',
    img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=85',
    dishes: [
      { name: 'Pani Puri', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80' },
      { name: 'Pav Bhaji', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
      { name: 'Aloo Tikki', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
      { name: 'Bhel Puri', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
      { name: 'Samosa', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
      { name: 'Dahi Papdi', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80' },
    ]
  },
  {
    name: 'Desserts',
    badge: 'Sweet Moments',
    badgeIcon: <FaCookie />,
    badgeColor: '#880E4F',
    desc: 'Traditional Indian sweets, pastries, cakes, ice cream, and dessert stations.',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=85',
    dishes: [
      { name: 'Gulab Jamun', img: 'https://images.unsplash.com/photo-1601303516534-bf4a475e3c75?w=400&q=80' },
      { name: 'Rasmalai', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80' },
      { name: 'Gajar Halwa', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80' },
      { name: 'Kheer', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80' },
      { name: 'Jalebi', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
      { name: 'Barfi', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
    ]
  },
  {
    name: 'Jain & Healthy',
    badge: 'Healthy Choice',
    badgeIcon: <FaSeedling />,
    badgeColor: '#2E7D32',
    desc: 'Pure Jain cuisine, vegan options, and customized healthy meal selections.',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85',
    dishes: [
      { name: 'Jain Dal', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
      { name: 'Quinoa Salad', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
      { name: 'Jain Sabzi', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
      { name: 'Fruit Bowl', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
      { name: 'Sprout Chaat', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80' },
      { name: 'Jain Khichdi', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80' },
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
                  <img src={c.img} alt={c.name} className="cuisine-img" />
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
                        <img src={dish.img} alt={dish.name} />
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
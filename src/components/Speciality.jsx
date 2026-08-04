import { Fragment } from 'react'
import { FaLeaf, FaSeedling, FaRecycle, FaFlask, FaBan } from 'react-icons/fa'
import { motion } from 'framer-motion'

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
  return (
    <section id="speciality">
      <motion.div
        className="speciality-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="speciality-label">Our Speciality</span>
      </motion.div>

      <div className="speciality-strip">
        {specialities.map((s, i) => (
          <Fragment key={i}>
            <motion.div
              className="speciality-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="speciality-icon"
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {s.icon}
              </motion.div>
              <div className="speciality-text">
                <div className="speciality-title">{s.title}</div>
                <div className="speciality-desc">{s.desc}</div>
              </div>
            </motion.div>
            {i < specialities.length - 1 && (
              <div className="speciality-divider" />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
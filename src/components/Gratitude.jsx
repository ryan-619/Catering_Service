import { motion } from 'framer-motion'
import gratitudeCard from '../assets/gratitude-card.jpg'

/**
 * Closing gratitude note — the "हम आभारी है / माता अन्नपूर्णा के" card.
 * Sits at the very end of the page, just before the footer, so the site
 * closes on the blessing rather than on a hard sell.
 */
export default function Gratitude() {
  return (
    <section id="gratitude">
      <div className="ct">
        <motion.div
          className="grat-wrap"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="grat-glow" aria-hidden="true"></span>
          <img
            src={gratitudeCard}
            alt="हम आभारी है — माता अन्नपूर्णा के। जिन्होंने हमको माध्यम बनाया, आप का अन्न आप तक पहुँचाने का।"
            className="grat-card"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}

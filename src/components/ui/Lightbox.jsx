import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

/**
 * One lightbox for the whole site — gallery, national events and charity all
 * mount this rather than each shipping its own copy with slightly different
 * keyboard handling.
 *
 * Rendered through a portal so a section's `overflow: clip` (which every
 * `.lx-sec` sets, to contain the decorative washes) cannot crop the overlay.
 *
 * @param items  [{ src, type: 'image'|'video', cap? }]
 * @param index  active index, or null when closed
 */
export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const open = index !== null && index !== undefined && items?.length > 0

  const prev = useCallback(() => {
    onIndexChange((i) => (i - 1 + items.length) % items.length)
  }, [items, onIndexChange])

  const next = useCallback(() => {
    onIndexChange((i) => (i + 1) % items.length)
  }, [items, onIndexChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    // Lenis has its own wheel handler, so stopping body scroll is not enough.
    window.lxLenis?.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      window.lxLenis?.start()
      document.body.style.overflow = ''
    }
  }, [open, onClose, prev, next])

  if (typeof document === 'undefined') return null
  const item = open ? items[index] : null

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="lx-lb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button className="lx-lb-x" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>

          <button
            className="lx-lb-nav lx-lb-nav--prev"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          <motion.div
            className="lx-lb-stage"
            key={index}
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === 'video' ? (
              <video key={item.src} src={item.src} controls autoPlay playsInline className="lx-lb-media" />
            ) : (
              <img key={item.src} src={item.src} alt={item.cap || ''} className="lx-lb-media" />
            )}
            {(item.cap || items.length > 1) && (
              <div className="lx-lb-cap">
                {item.cap && <span>{item.cap}</span>}
                {items.length > 1 && <em>{index + 1} / {items.length}</em>}
              </div>
            )}
          </motion.div>

          <button
            className="lx-lb-nav lx-lb-nav--next"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

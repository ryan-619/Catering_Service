import { useEffect, useRef } from 'react'
import { gsap, isTouch, prefersReducedMotion } from './gsapSetup'

/**
 * Magnetic hover — the element drifts toward the cursor while it is nearby and
 * springs back on exit. Used on primary CTAs and carousel arrows so the most
 * important targets feel "sticky" under the pointer.
 */
export function useMagnetic({ strength = 0.34, radius = 1.6 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || isTouch() || prefersReducedMotion()) return

    const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1,0.45)' })
    const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1,0.45)' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < Math.max(r.width, r.height) * radius) {
        qx(dx * strength); qy(dy * strength)
      } else { qx(0); qy(0) }
    }
    const onLeave = () => { qx(0); qy(0) }

    window.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [strength, radius])

  return ref
}

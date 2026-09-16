import { useEffect } from 'react'
import { gsap, isTouch, prefersReducedMotion } from '../../lib/gsapSetup'

/**
 * Two-part cursor: an instant dot and a lagging ring. The ring swells over
 * anything marked `data-cursor="hot"` (buttons, links, media tiles) so hit
 * targets announce themselves before the click.
 */
export default function Cursor() {
  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return

    const dot = document.createElement('div')
    const ring = document.createElement('div')
    dot.className = 'lx-cursor'
    ring.className = 'lx-cursor-ring'
    document.body.append(dot, ring)

    const dx = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'none' })
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'none' })
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY) }
    const over = (e) => {
      const hot = e.target.closest('[data-cursor="hot"], a, button, .lx-tilt, input, textarea, select')
      ring.classList.toggle('is-hot', !!hot)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      dot.remove(); ring.remove()
    }
  }, [])

  return null
}

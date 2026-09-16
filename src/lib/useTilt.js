import { useEffect, useRef } from 'react'
import { gsap, isTouch, prefersReducedMotion } from './gsapSetup'

/**
 * Pointer-driven 3D tilt with a moving specular glare.
 *
 * The element itself is rotated on X/Y; anything inside it marked
 * `.lx-tilt-layer` is pushed forward on Z by CSS, so the card gains real
 * parallax depth rather than looking like a flat plane being rocked.
 * Disabled outright on touch/reduced-motion — a tilt you cannot hover is
 * just a layout cost.
 */
export function useTilt({ max = 10, scale = 1.02, speed = 0.5, glare = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || isTouch() || prefersReducedMotion()) return

    const qx = gsap.quickTo(el, 'rotationY', { duration: speed, ease: 'power3.out' })
    const qy = gsap.quickTo(el, 'rotationX', { duration: speed, ease: 'power3.out' })
    const qs = gsap.quickTo(el, 'scale', { duration: speed, ease: 'power3.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      qx((px - 0.5) * 2 * max)
      qy((0.5 - py) * 2 * max)
      if (glare) {
        el.style.setProperty('--gx', `${px * 100}%`)
        el.style.setProperty('--gy', `${py * 100}%`)
      }
    }
    const onEnter = () => { el.classList.add('is-tilting'); qs(scale) }
    const onLeave = () => { el.classList.remove('is-tilting'); qx(0); qy(0); qs(1) }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [max, scale, speed, glare])

  return ref
}

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsapSetup'

/**
 * Lenis momentum scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * smooth-scroll loop share one rAF and never disagree about scrollY.
 *
 * Exposes window.lxScrollTo(target) so the navbar / footer anchors can hand
 * scrolling back to Lenis instead of calling native scrollTo, which Lenis
 * would immediately fight.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      window.lxScrollTo = (t, o = {}) => {
        const el = typeof t === 'string' ? document.querySelector(t) : t
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (o.offset || 0), behavior: 'auto' })
      }
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      lerp: 0.1,
    })

    document.documentElement.classList.add('lx-lenis')

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    window.lxLenis = lenis
    window.lxScrollTo = (target, opts = {}) =>
      lenis.scrollTo(target, { offset: opts.offset ?? 0, duration: opts.duration ?? 1.25 })

    // The page grows as lazy images decode; re-measure once things settle.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 1200)

    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(tick)
      lenis.destroy()
      document.documentElement.classList.remove('lx-lenis')
      delete window.lxLenis
      delete window.lxScrollTo
    }
  }, [])

  return null
}

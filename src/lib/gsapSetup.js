/**
 * Single place where GSAP is configured for the whole site.
 *
 * Everything animated on scroll goes through ScrollTrigger, and ScrollTrigger
 * has to be told about Lenis (see SmoothScroll.jsx) or the two fight over the
 * scroll position. Importing from here — never straight from 'gsap' — keeps the
 * plugin registration in one module so it cannot be half-registered.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })

ScrollTrigger.config({ ignoreMobileResize: true })

/** True when the visitor asked the OS to cut animation. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Coarse pointer / small screen — skip cursor, tilt and heavy parallax. */
export const isTouch = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(hover: none)').matches || window.innerWidth < 900)

export { gsap, ScrollTrigger }

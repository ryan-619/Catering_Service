import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsapSetup'

/** Number that counts up the first time it scrolls into view. */
export default function CountUp({ to, suffix = '', prefix = '', duration = 2, separator = true, className = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fmt = (n) => (separator ? Math.round(n).toLocaleString('en-IN') : String(Math.round(n)))
    if (prefersReducedMotion()) { el.textContent = fmt(to); return }

    const ctx = gsap.context(() => {
      const obj = { v: 0 }
      gsap.to(obj, {
        v: to, duration, ease: 'power2.out',
        onUpdate: () => { el.textContent = fmt(obj.v) },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [to, duration, separator])

  return <span className={className}>{prefix}<span ref={ref}>0</span>{suffix}</span>
}

import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsapSetup'

/**
 * Seamless infinite ticker. The children are rendered twice and the track is
 * wrapped with modifiers at exactly half its width, so the loop has no seam
 * regardless of content width — no hard-coded pixel distance to keep in sync.
 */
export default function Marquee({ children, speed = 38, reverse = false, gap = 56, className = '', fade = true }) {
  const track = useRef(null)

  useLayoutEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const half = el.scrollWidth / 2
      if (!half) return
      gsap.set(el, { x: reverse ? -half : 0 })
      gsap.to(el, {
        x: reverse ? 0 : -half,
        duration: half / speed,
        ease: 'none',
        repeat: -1,
        modifiers: { x: (x) => `${parseFloat(x) % half}px` },
      })
    }, el)
    return () => ctx.revert()
  }, [speed, reverse, children])

  return (
    <div className={`lx-marquee ${fade ? 'lx-marquee--fade' : ''} ${className}`} style={{ '--mq-gap': `${gap}px` }}>
      <div className="lx-marquee-track" ref={track}>
        {children}{children}
      </div>
    </div>
  )
}

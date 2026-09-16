import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsapSetup'

/** Gold hairline across the top that tracks reading progress. */
export default function ScrollProgress() {
  const bar = useRef(null)
  useLayoutEffect(() => {
    const el = bar.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })
    })
    return () => ctx.revert()
  }, [])
  return <div className="lx-progress" ref={bar} aria-hidden="true" />
}

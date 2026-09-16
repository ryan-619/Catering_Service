import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsapSetup'

/**
 * Per-word 3D reveal for headlines.
 *
 * GSAP's official SplitText is a paid plugin, so the split is done by hand:
 * each word is wrapped in an inline-block span inside an overflow-hidden line,
 * then rotated up from below on X. Words — not characters — because character
 * splitting mangles Devanagari conjuncts, and this site is bilingual.
 *
 * One `fromTo` rather than `set()` + `to()`, for the same reason as Reveal:
 * under StrictMode's double-invoke a standalone `set()` outlives the context
 * revert between the two passes and leaves the words parked below the line,
 * clipped by `overflow: hidden` — i.e. an invisible headline in dev.
 */
export default function SplitHeading({
  children, as: Tag = 'h2', className = '', delay = 0,
  stagger = 0.045, start = 'top 85%', ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('.lx-word')
      if (!words.length) return
      gsap.fromTo(
        words,
        { yPercent: 118, rotateX: -78, opacity: 0 },
        {
          yPercent: 0, rotateX: 0, opacity: 1,
          duration: 1.05, ease: 'power4.out', stagger, delay,
          overwrite: 'auto',
          scrollTrigger: { trigger: el, start, once: true, toggleActions: 'play none none none' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [children, delay, stagger, start])

  // Accept a string; '\n' starts a new line.
  const lines = String(children).split('\n')

  return (
    <Tag ref={ref} className={`lx-split ${className}`} style={{ perspective: 800 }} {...rest}>
      {lines.map((line, li) => {
        const words = line.split(' ')
        return (
          <span className="lx-line" key={li}>
            {words.map((w, wi) => (
              <span className="lx-word" key={wi}>{w}{wi < words.length - 1 ? ' ' : ''}</span>
            ))}
          </span>
        )
      })}
    </Tag>
  )
}

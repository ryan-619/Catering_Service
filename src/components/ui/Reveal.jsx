import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsapSetup'

const FROM = {
  up:    { y: 56, opacity: 0 },
  down:  { y: -46, opacity: 0 },
  left:  { x: -64, opacity: 0 },
  right: { x: 64, opacity: 0 },
  zoom:  { scale: 0.88, opacity: 0 },
  flip:  { rotateX: -62, y: 44, opacity: 0, transformOrigin: '50% 100%' },
  mask:  { clipPath: 'inset(0% 0% 100% 0%)', y: 40, opacity: 1 },
  blur:  { opacity: 0, filter: 'blur(14px)', y: 30 },
}

const REST = {
  y: 0, x: 0, opacity: 1, scale: 1, rotateX: 0,
  clipPath: 'inset(0% 0% 0% 0%)', filter: 'blur(0px)',
}

/** End state built from the start state's own keys, so a tween never animates
 *  a property it did not set — otherwise `from="up"` would also snap clipPath. */
const toVars = (from) =>
  Object.keys(from).reduce((acc, k) => {
    if (k in REST) acc[k] = REST[k]
    return acc
  }, {})

/**
 * Scroll reveal. `stagger` turns the element's direct children into the
 * animated targets instead of the wrapper — one trigger for a whole grid
 * rather than one per card.
 *
 * Deliberately a single `fromTo` rather than `set()` + `to()`: React 18
 * StrictMode double-invokes layout effects in development, and a standalone
 * `set()` survives the context revert that happens in between, leaving the
 * element stuck at its hidden start values. A `fromTo` is fully owned by the
 * tween, so revert restores it cleanly and the second pass replays it.
 */
export default function Reveal({
  children, as: Tag = 'div', from = 'up', delay = 0, duration = 1,
  stagger = 0, start = 'top 86%', className = '', style, once = true, ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const targets = stagger ? Array.from(el.children) : el
    if (stagger && !el.children.length) return

    const fromVars = FROM[from] || FROM.up

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        ...toVars(fromVars),
        duration, delay, stagger,
        ease: 'power3.out',
        overwrite: 'auto',
        scrollTrigger: { trigger: el, start, once, toggleActions: 'play none none none' },
      })
    }, el)

    return () => ctx.revert()
  }, [from, delay, duration, stagger, start, once])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ perspective: from === 'flip' ? 900 : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

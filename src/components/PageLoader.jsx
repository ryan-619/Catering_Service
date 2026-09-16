import { useState, useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsapSetup'
import logoBase64 from '../assets/logo.js'

const BRAND = 'Lala Trivedi Catering Service'
/* Split deliberately so the lockup breaks the same way at 390 and 1440
   instead of rewrapping into "…CATERING / SERVICE" somewhere in between. */
const BRAND_LINES = ['Lala Trivedi', 'Catering Service']

/** Never flash: the overlay stays on screen at least this long. */
const MIN_MS = 1100
/** Never trap: a slow hero video must not hold the visitor hostage. */
const CAP_MS = 3500

/* r=92 inside a 200 viewBox → the circumference the ring's dash animates. */
const RING_R = 92
const RING_C = 2 * Math.PI * RING_R

/** Release the scroll lock. Safe to call more than once. */
function unlockScroll() {
  document.documentElement.classList.remove('lx-load-lock')
  try {
    /* the lock collapsed the document height, so Lenis has to re-measure */
    window.lxLenis?.resize()
    window.lxLenis?.start()
  } catch { /* Lenis not mounted — native scroll, the class was the lock */ }
}

/**
 * Full-screen opening curtain.
 *
 * Timing: a minimum of 1100ms so it never flickers, but it also waits for
 * window 'load' — whichever finishes later wins — hard-capped at 3500ms so a
 * slow video can never strand the visitor behind it.
 *
 * Motion: the logo scales up inside a gold ring that draws itself
 * (stroke-dashoffset), the brand name lands letter by letter, a thin gold
 * rule fills, and on exit the whole sheet sweeps upward behind a curved
 * trailing lip. Scrolling is stopped while it is up, released as it leaves,
 * and the overlay unmounts completely so nothing can catch a click or focus.
 */
export default function PageLoader() {
  const [gone, setGone] = useState(false)
  const [exiting, setExiting] = useState(false)

  const rootRef = useRef(null)
  const doneRef = useRef(false)
  const exitRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = prefersReducedMotion()
    const q = gsap.utils.selector(root)

    /* ── lock the scroll for as long as the curtain is up ──
       The html class is the real lock (it also covers the reduced-motion
       path, where Lenis never boots). Lenis itself is told to stop as soon
       as it exists: SmoothScroll creates it in a useEffect, which runs
       *after* this layout effect, so the first attempt usually misses. */
    let lockTimer = null
    let tries = 0
    const lock = () => {
      document.documentElement.classList.add('lx-load-lock')
      try { window.lxLenis?.stop() } catch { /* not there yet */ }
      if (!window.lxLenis && tries++ < 20) lockTimer = setTimeout(lock, 50)
    }
    lock()

    const t0 = performance.now()
    let minTimer = null
    let capTimer = null

    /* ── entrance ── */
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(q('.lx-load-ring-arc'), { strokeDashoffset: 0 })
        gsap.set(q('.lx-load-fill'), { scaleX: 1 })
        return
      }

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(q('.lx-load-mark'), { scale: 0.84, opacity: 0, duration: 0.9, ease: 'power2.out' }, 0)
        .fromTo(
          q('.lx-load-ring-arc'),
          { strokeDashoffset: RING_C },
          { strokeDashoffset: 0, duration: 1.05, ease: 'power2.inOut' },
          0.08,
        )
        .fromTo(
          q('.lx-load-fill'),
          { scaleX: 0 },
          { scaleX: 0.74, duration: 1.15, ease: 'power1.out' },
          0.28,
        )
        .from(q('.lx-load-ch'), { yPercent: 115, opacity: 0, duration: 0.75, stagger: 0.02 }, 0.34)
    }, root)

    /* ── exit ── built inside the same context so it reverts with it ── */
    const finish = () => {
      clearTimeout(lockTimer)
      unlockScroll()
      setGone(true)
      ScrollTrigger.refresh()
    }

    exitRef.current = () => {
      clearTimeout(lockTimer)
      setExiting(true)

      ctx.add(() => {
        if (reduced) {
          gsap.to(root, { autoAlpha: 0, duration: 0.25, onComplete: finish })
          return
        }

        gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: finish })
          /* the gold rule completes before the sheet leaves */
          .to(q('.lx-load-fill'), { scaleX: 1, duration: 0.24, ease: 'power2.out' }, 0)
          .to(q('.lx-load-in'), { y: -22, opacity: 0, duration: 0.42, ease: 'power2.in' }, 0.12)
          /* -118% because the curved lip trails 17% of the sheet below it */
          .to(root, { yPercent: -118, duration: 0.82 }, 0.26)
          /* hand scrolling back a beat before the sheet clears the viewport */
          .add(unlockScroll, 0.68)
      })
    }

    /* ── dismissal timing: max(min-display, window load), capped ── */
    function onLoaded() {
      const elapsed = performance.now() - t0
      minTimer = setTimeout(dismiss, Math.max(0, MIN_MS - elapsed))
    }

    function dismiss() {
      if (doneRef.current) return
      doneRef.current = true
      clearTimeout(minTimer)
      clearTimeout(capTimer)
      window.removeEventListener('load', onLoaded)
      exitRef.current?.()
    }

    if (document.readyState === 'complete') onLoaded()
    else window.addEventListener('load', onLoaded)

    capTimer = setTimeout(dismiss, CAP_MS)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(capTimer)
      clearTimeout(lockTimer)
      window.removeEventListener('load', onLoaded)
      ctx.revert()
      unlockScroll()
    }
  }, [])

  if (gone) return null

  return (
    <div
      ref={rootRef}
      className={`lx-load${exiting ? ' is-out' : ''}`}
      aria-hidden={exiting ? 'true' : 'false'}
    >
      <span className="lx-load-wash" aria-hidden="true" />

      <div className="lx-load-in">
        <div className="lx-load-mark">
          <svg className="lx-load-ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
            <circle className="lx-load-ring-track" cx="100" cy="100" r={RING_R} />
            <circle
              className="lx-load-ring-arc"
              cx="100"
              cy="100"
              r={RING_R}
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C}
            />
          </svg>

          <img
            src={`data:image/png;base64,${logoBase64}`}
            alt="LTCS"
            className="lx-load-logo"
            draggable="false"
          />
        </div>

        <p className="lx-load-brand">
          <span className="lx-load-sr">{BRAND}</span>
          {BRAND_LINES.map((line, li) => (
            <span className="lx-load-row" key={li} aria-hidden="true">
              {line.split(' ').map((word, wi) => (
                <span className="lx-load-word" key={wi}>
                  {Array.from(word).map((ch, ci) => (
                    <span className="lx-load-ch" key={ci}>{ch}</span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </p>

        <div className="lx-load-rule" aria-hidden="true">
          <span className="lx-load-fill" />
        </div>
      </div>

      <span className="lx-load-lip" aria-hidden="true" />
    </div>
  )
}

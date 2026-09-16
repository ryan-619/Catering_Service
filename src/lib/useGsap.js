import { useLayoutEffect, useRef } from 'react'
import { gsap } from './gsapSetup'

/**
 * Scoped GSAP context. Every tween/ScrollTrigger created inside `fn` is
 * reverted on unmount, so React 18 StrictMode's double-invoke in dev does not
 * leave duplicate triggers behind.
 *
 *   const ref = useGsapContext((ctx, el) => { gsap.to('.x', {...}) })
 *   return <div ref={ref}>…</div>
 */
export function useGsapContext(fn, deps = []) {
  const scope = useRef(null)
  useLayoutEffect(() => {
    if (!scope.current) return
    const ctx = gsap.context((self) => fn(self, scope.current), scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scope
}

import { useTilt } from '../../lib/useTilt'

/**
 * 3D tilt wrapper. The scene element owns the perspective so sibling cards
 * each get their own vanishing point — sharing one perspective across a grid
 * makes the outer cards shear.
 */
export default function TiltCard({
  children, className = '', innerClassName = '', max = 9, scale = 1.02,
  glare = true, style, ...rest
}) {
  const ref = useTilt({ max, scale, glare })
  return (
    <div className={`lx-tilt-scene ${className}`} style={style} {...rest}>
      <div ref={ref} className={`lx-tilt ${innerClassName}`}>
        {glare && <span className="lx-glare" aria-hidden="true" />}
        {children}
      </div>
    </div>
  )
}

import { useMagnetic } from '../../lib/useMagnetic'

/** Primary CTA with magnetic pull. Renders <a> when `href` is given. */
export default function MagneticButton({
  children, href, onClick, variant = 'gold', size = '', className = '',
  strength = 0.3, target, rel, ...rest
}) {
  const ref = useMagnetic({ strength })
  const cls = `lx-btn lx-btn--${variant} ${size ? `lx-btn--${size}` : ''} ${className}`.trim()

  if (href) {
    return (
      <a ref={ref} href={href} target={target} rel={rel} className={cls} data-cursor="hot" {...rest}>
        <span>{children}</span>
      </a>
    )
  }
  return (
    <button ref={ref} type="button" onClick={onClick} className={cls} data-cursor="hot" {...rest}>
      <span>{children}</span>
    </button>
  )
}

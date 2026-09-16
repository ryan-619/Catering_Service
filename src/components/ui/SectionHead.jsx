import Reveal from './Reveal'
import SplitHeading from './SplitHeading'

/** The eyebrow / ornament / headline / lead block every section opens with. */
export default function SectionHead({ eyebrow, title, lead, center = true, className = '', children }) {
  return (
    <div className={`lx-head ${center ? 'lx-head--center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal from="up" duration={0.8}>
          <span className={`lx-eyebrow ${center ? 'lx-eyebrow--center' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal from="zoom" duration={0.7} delay={0.05}>
        <span className="lx-orn" aria-hidden="true"><i /><b /><i /></span>
      </Reveal>
      {title && <SplitHeading className="lx-h2">{title}</SplitHeading>}
      {lead && (
        <Reveal from="up" delay={0.12}>
          <p className="lx-lead">{lead}</p>
        </Reveal>
      )}
      {children}
    </div>
  )
}

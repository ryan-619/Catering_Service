import { useEffect, useState } from 'react'
import { FaLeaf } from 'react-icons/fa'
import Marquee from './ui/Marquee'

/**
 * Slim announcement strip above the nav. It is NOT sticky — it scrolls away
 * with the page and only the navbar stays pinned.
 *
 * Below 720px the two halves would wrap onto two lines, so the whole strip
 * collapses into a single centred <Marquee>. The marquee has to measure its
 * own track width on mount, and an element hidden with `display:none` measures
 * as 0, so the layout is chosen with matchMedia and only one of the two
 * variants is ever mounted.
 */

const PHONES = [
  { label: '+91-9936485155', tel: 'tel:+919936485155' },
  { label: '+91-8299504889', tel: 'tel:+918299504889' },
]

const PLEDGE = '100% Pure Vegetarian · Serving Kanpur Since 1982'

function useNarrow(query = '(max-width: 960px)') {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setNarrow(e.matches)
    setNarrow(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return narrow
}

function Leaf() {
  return (
    <span className="lx-top-leaf" aria-hidden="true">
      <FaLeaf />
    </span>
  )
}

export default function TopBar() {
  const narrow = useNarrow()

  return (
    <div className="lx-top">
      {narrow ? (
        <Marquee className="lx-top-mq" speed={34} gap={34}>
          <span className="lx-top-mqi">
            <Leaf />
            {PLEDGE}
          </span>
          <span className="lx-top-sep" aria-hidden="true" />
          {PHONES.map((p) => (
            <a key={p.tel} className="lx-top-tel" href={p.tel}>
              {p.label}
            </a>
          ))}
          <span className="lx-top-sep" aria-hidden="true" />
        </Marquee>
      ) : (
        <div className="lx-ct-wide lx-top-in">
          <p className="lx-top-side">
            <span className="lx-top-lbl">Call / WhatsApp</span>
            <a className="lx-top-tel" href={PHONES[0].tel}>{PHONES[0].label}</a>
            <span className="lx-top-sep" aria-hidden="true" />
            <a className="lx-top-tel" href={PHONES[1].tel}>{PHONES[1].label}</a>
          </p>

          <p className="lx-top-side lx-top-side--end">
            <Leaf />
            <span className="lx-top-pledge">{PLEDGE}</span>
          </p>
        </div>
      )}
    </div>
  )
}

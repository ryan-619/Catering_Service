# LTCS Frontend — "Heritage Luxe" Design System

Read this before touching any section. It is the contract every rewritten
section obeys so that 20 independently-written files still look like one site.

## The brief

The site is a 43-year-old pure-vegetarian catering house in Kanpur that has
served Presidents, Prime Ministers and the Ram Mandir consecration. The old
design read as a generic template. The new one must read as **heritage luxury**:
confident whitespace, editorial typography, antique gold on deep forest green,
real photography given room to breathe, and motion that feels engineered rather
than sprinkled on.

## Hard rules

1. **Never hard-code a colour, radius, shadow, font or easing.** Use the
   `--lx-*` custom properties in `src/styles/tokens.css`. If a value you need
   does not exist, compose it from tokens (`color-mix`, `rgba` of a token is
   fine) rather than inventing a hex.
2. **All new class names are prefixed `lx-`** and namespaced to the section
   (`lx-hero-…`, `lx-rev-…`). The legacy `src/index.css` is still loaded and
   still owns the un-rewritten sections; a `lx-` prefix guarantees zero
   collisions in either direction.
3. **One section = one CSS file** in `src/styles/sections/<name>.css`, already
   imported by `src/styles/main.css`. Do not edit `main.css`, `tokens.css`,
   `src/index.css`, or any file outside your assignment.
4. **Keep every `id` attribute** on the section elements — the navbar, the
   footer quick-links and `App.jsx` all scroll to them: `hero about founder
   services speciality stats cuisines personalities national-events gallery
   videos testi charity cta faq contact-bar gratitude`.
5. **Keep all existing content, props, data arrays, image imports, API calls
   and handler names.** This is a visual and motion rewrite, not a content
   rewrite. `onBookNow` must keep working. Phone numbers, addresses, names,
   menus, testimonials and photo lists stay exactly as they are unless your
   task says otherwise.
6. **Responsive is not optional.** Every section must be verified at 390px,
   768px, 1024px and 1440px. Grids collapse; type uses `clamp()`; nothing
   overflows the viewport horizontally. Wide content scrolls inside its own
   `overflow-x:auto` box.
7. **Touch and reduced-motion must degrade gracefully.** Tilt, magnetic hover
   and the custom cursor are already disabled automatically — just do not build
   anything that *requires* hover to reach content.
8. `loading="lazy"` on every `<img>` below the fold. `preload="metadata"` on
   every `<video>` thumbnail.

## Tokens (src/styles/tokens.css)

| Group | Tokens |
|---|---|
| Green | `--lx-green-950 900 800 700 600 500 400` |
| Gold | `--lx-gold-700 600 500 400 300 100` |
| Warm | `--lx-saffron`, `--lx-saffron-dp` |
| Ink | `--lx-ink`, `--lx-ink-2`, `--lx-ink-3`, `--lx-ink-4` |
| Ground | `--lx-ivory`, `--lx-ivory-2`, `--lx-paper`, `--lx-line`, `--lx-line-2` |
| Gradients | `--lx-grad-gold`, `--lx-grad-gold-soft`, `--lx-grad-green`, `--lx-grad-ivory` |
| Type | `--lx-display` (Cormorant Garamond), `--lx-sans` (DM Sans), `--lx-deva` (Noto Serif Devanagari) |
| Sizes | `--lx-t-hero h2 h3 h4 lead body sm xs eyebrow` |
| Space | `--lx-pad`, `--lx-pad-sm`, `--lx-gut`, `--lx-max`, `--lx-max-wide`, `--lx-max-text` |
| Radius | `--lx-r-xs sm (none) lg xl pill` → `--lx-r` is the default 16px |
| Depth | `--lx-sh-1..4`, `--lx-sh-gold`, `--lx-sh-green`, `--lx-ring` |
| Motion | `--lx-e-out`, `--lx-e-io`, `--lx-e-soft`, `--lx-d-fast`, `--lx-d`, `--lx-d-slow` |

## Utility classes you should reuse, not re-invent

- `.lx-ct` / `.lx-ct-wide` — page container
- `.lx-sec` (+ `--tight --ivory --paper --dark`) — section padding + background
- `.lx-eyebrow` (+ `--center`), `.lx-orn` (`<span class="lx-orn"><i/><b/><i/></span>`)
- `.lx-h2 .lx-h3 .lx-h4 .lx-lead .lx-body .lx-deva .lx-foil`
- `.lx-btn` + `--gold --green --ghost --ghost-d --wa` + `--sm --lg`, `.lx-btn-row`
- `.lx-chip` (+ `--green --glass`)
- `.lx-card`, `.lx-glass`, `.lx-topline`
- `.lx-wash --gold/--green` — blurred decorative blobs (absolutely positioned)
- `.lx-marquee`, `.lx-marquee-track`

## React primitives (src/components/ui/)

```jsx
import Reveal        from './ui/Reveal'         // <Reveal from="up|down|left|right|zoom|flip|mask|blur" delay stagger>
import SplitHeading  from './ui/SplitHeading'   // per-word 3D headline reveal; children must be a plain string, '\n' = line break
import SectionHead   from './ui/SectionHead'    // <SectionHead eyebrow title lead center />
import MagneticButton from './ui/MagneticButton'// <MagneticButton variant="gold|green|ghost|ghost-d|wa" href? onClick? size="lg|sm">
import TiltCard      from './ui/TiltCard'       // <TiltCard max={9} glare> wrap any card for real 3D tilt + specular glare
import Marquee       from './ui/Marquee'        // <Marquee speed={38} reverse gap={56}> seamless infinite ticker
import CountUp       from './ui/CountUp'        // <CountUp to={10000} suffix="+" />
```

Inside a `TiltCard`, add `className="lx-tilt-layer"` to whatever should float
forward on Z (a badge, a title) for genuine parallax depth.

Mark any custom interactive element with `data-cursor="hot"` so the custom
cursor swells over it.

## GSAP

```js
import { gsap, ScrollTrigger, prefersReducedMotion, isTouch } from '../lib/gsapSetup'
import { useGsapContext } from '../lib/useGsap'
import { useTilt } from '../lib/useTilt'
import { useMagnetic } from '../lib/useMagnetic'
```

- **Always** import GSAP from `lib/gsapSetup`, never from `'gsap'` directly —
  that module is where `ScrollTrigger` is registered and Lenis is synced.
- **Always** scope tweens with `useGsapContext` (or `gsap.context` + `revert()`
  in a `useLayoutEffect` cleanup). React 18 StrictMode double-invokes effects in
  dev; unscoped ScrollTriggers stack up and the page starts jittering.
- Bail out early when `prefersReducedMotion()` is true.
- Lenis owns the scroll. To scroll programmatically use
  `window.lxScrollTo(target, { offset: -80 })` — never `window.scrollTo`.

## Motion vocabulary (be consistent)

| Intent | Treatment |
|---|---|
| Section headline | `SplitHeading` — words rotate up from below on X |
| Section body / lead | `Reveal from="up"` |
| Card grid | one `Reveal stagger={0.08}` around the grid, not one per card |
| Image reveal | `Reveal from="mask"` (clip-path wipe) |
| Hero / large imagery | ScrollTrigger `scrub` parallax, `yPercent` ±12 |
| Cards on hover | `TiltCard` + gold `.lx-topline` |
| Numbers | `CountUp` |
| Logos / taglines | `Marquee` |

Nothing should animate for longer than ~1.1s, and nothing should move more than
~70px. Restraint is what separates premium from busy.

## Verify before you finish

```bash
npm run build     # must pass with no errors
```

Check your section at 390 / 768 / 1440, confirm no horizontal scrollbar, confirm
text contrast holds on photography, and confirm the section still has its `id`.

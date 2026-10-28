# Design system

Define tokens once (CSS custom properties) and use them everywhere. In the APEX starter they are generated
from `theme` in `site.config.mjs` by `src/theme/themes.mjs`.

## Colour tokens

| Token | Role |
|---|---|
| `--c-bg` | page background |
| `--c-surface` | raised panels, cards |
| `--c-ink` | main text |
| `--c-muted` | secondary text (must still meet 4.5:1 on `--c-bg`) |
| `--c-line` | borders, dividers |
| `--c-accent` | primary buttons, links, focus ring |
| `--c-on-accent` | text on accent (≥ 4.5:1) |
| `--c-dark` / `--c-on-dark` | inverted sections (hero overlay, footer) |
| `--lvl-1..4` | optional meaning colours (intensity levels, tags) |

Rules: one accent; meaning colours always paired with a text label (never colour alone); check every text/
background pair for WCAG AA (4.5:1 body, 3:1 large text and UI borders).

## Typography

- 1–2 families maximum. Load at most 2–3 weights. Use `font-display: swap`.
- Prefer self-hosted fonts in the EU (GDPR) — Google Fonts CDN is acceptable for demos.
- Fluid scale with `clamp()`, e.g. body `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`,
  H1 `clamp(2.6rem, 1.5rem + 5vw, 6rem)`.
- Line length ≤ 70ch for body; line-height 1.5–1.65 body, 0.95–1.15 display.
- Sentence case for headings and buttons unless the brand demands otherwise.

## Spacing and layout

- 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Section padding `clamp(4rem, 8vw, 8rem)` vertical.
- Container max ~1240px with 16–24px side gutters on mobile.
- Grid: 4 columns mobile, 8 tablet, 12 desktop; let images break the grid for energy.

## Shape and depth

- Pick a radius scale with hierarchy (e.g. 2px tags, 6px inputs/buttons, 0 or 12px media) — not one radius on everything.
- Depth through contrast and overlap rather than soft shadows on every card.

## Motion

- Respect `prefers-reduced-motion: reduce` (disable non-essential animation).
- One orchestrated page-load moment; interaction feedback 150–250 ms; no scroll-jacking.
- Never animate layout properties for long; prefer `transform` and `opacity`.

## Breakpoints

- Mobile first. Test at 360, 390, 768, 1024, 1280, 1440 px.
- Navigation collapses to a menu button below ~900px; keep the primary CTA visible on mobile
  (sticky bottom bar or in the header).

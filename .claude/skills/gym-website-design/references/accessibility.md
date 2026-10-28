# Accessibility and performance requirements

Target: WCAG 2.2 level AA. In the EU the European Accessibility Act also applies to many online services.

## Accessibility
- Colour contrast: 4.5:1 body text, 3:1 large text and UI components. Check text over photos (use overlays).
- Never rely on colour alone (intensity levels need text labels).
- Keyboard: every interactive element reachable and operable; visible focus ring (≥ 3:1, 2px+).
- Skip link to main content; landmarks (`header`, `nav`, `main`, `footer`).
- Menus: `aria-expanded`, `aria-controls`; Esc closes; focus returns to the button.
- Tabs/filters: `aria-pressed` or proper tab pattern; announce result counts with `aria-live="polite"`.
- Forms: visible `<label>`, `autocomplete`, errors linked with `aria-describedby`, error summary focus.
- Images: meaningful alt text; decorative images `alt=""`.
- Video: no autoplay with sound; pause control; captions for spoken content.
- Motion: honour `prefers-reduced-motion`.
- Touch targets ≥ 44×44 px; text resizable to 200% without loss.
- Language attribute on `<html>`.

## Performance budget
- HTML+CSS+JS under ~150 KB compressed (excluding images).
- Hero image ≤ ~200 KB at mobile width; use `srcset`/`sizes`, `fetchpriority="high"` for the hero only.
- `loading="lazy"` and `decoding="async"` for below-the-fold images; always set width/height.
- At most 2 font families / 3 weights; `preconnect` to the font host or self-host.
- No heavy sliders/carousels or animation libraries for simple effects.
- Third-party widgets (maps, booking, chat) load on interaction where possible.

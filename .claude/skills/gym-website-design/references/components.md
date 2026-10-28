# Component guidelines

Each component should read its content from configuration/data, never hard-coded business facts.

## Header / navigation
- Logo (links home), 4–6 links max, primary CTA button, optional secondary (log in / free trial).
- Mobile: menu button with `aria-expanded`, focus trapped while open, Esc closes, CTA still visible.
- Skip link "Skip to content" as first focusable element.
- Optional announcement bar for a real, dated offer (never a fake countdown).

## Hero
- H1 says what and where ("Strength and conditioning gym in Braga").
- Short supporting line, primary + secondary CTA, real photo or video (muted, with pause control).
- Proof point only if true (rating with source, years open, member count supplied by client).
- Preload the hero image; set width/height to avoid layout shift.

## Programs / services
- Card or list: name, who it's for, duration, intensity, image, link to schedule/booking.
- Group by goal (strength, conditioning, mobility, combat) rather than internal names.

## Class schedule
- Data: day, start time, duration, class, coach, level, room, optional booking link.
- Day selector (tabs with `role="tablist"` or buttons with `aria-pressed`), time-of-day filter.
- Show a clear empty state ("No classes on Sunday — open gym 9:00–14:00").
- Intensity levels shown with text + colour.
- Link to the live booking system when configured.

## Membership / pricing
- 2–4 plans; highlight one honestly ("Most chosen" only if client confirms).
- Price, billing period, commitment, 3–6 included items, CTA, terms link.
- Monthly/annual toggle only if both prices are real.
- Fine print must agree with headline claims (no "no contract" next to a minimum term).
- Add a free trial or day pass as a low-commitment alternative.

## Trainers
- Photo, name, role, specialties, certifications as supplied, short bio, optional booking/Instagram link.
- Consistent photo crop and grade.

## Testimonials
- Real quotes with permission, first name + context (e.g. "member since 2023").
- Demo content must be visibly labelled fictional. Link to Google reviews when possible.

## FAQ
- `<details>/<summary>` accordion or button + region; contract, cancellation, guests, parking, beginners, kids, hours.

## Contact / location
- NAP as text, `tel:` and `mailto:` links, opening hours table, map link (click-to-load embed for privacy),
  parking and transport notes, form.

## Forms
- Labels always visible, `autocomplete` attributes, inline validation, clear success and error states,
  consent checkbox where required (GDPR), honeypot spam field.
- Submit to a configured endpoint; if none, show an honest demo message.

## Footer
- NAP, hours, social links, secondary nav, legal (privacy, terms, cookies), photo credits.

## CTA band
- Repeated near the end of every page: one sentence + primary + secondary CTA.

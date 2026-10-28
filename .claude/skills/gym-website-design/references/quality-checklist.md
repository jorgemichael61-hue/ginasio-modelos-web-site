# Website quality checklist (run before handing over)

## Content and truth
- [ ] Every price, hour, address, name, testimonial and offer supplied or approved by the client
- [ ] No `[CLIENT TO CONFIRM]`, lorem ipsum or template placeholders left (`npm run check`)
- [ ] Demo labels removed and `demoMode: false` only when all content is real
- [ ] Pricing headlines match the fine print (contract, minimum term, fees)
- [ ] Photo licences/credits recorded; no images from other gyms' websites

## Design
- [ ] Direction chosen and applied consistently (type, colour, imagery, CTA wording)
- [ ] Hierarchy clear at 390 px, 768 px, 1440 px; no horizontal scroll
- [ ] One primary CTA + one low-commitment CTA visible on every page
- [ ] Empty states for schedule/filters

## Function
- [ ] Navigation, menu button, filters, toggles, accordions work with mouse, touch and keyboard
- [ ] Forms validate, send to the real endpoint, show success/error states, include consent
- [ ] Booking, join and payment links go to the client's real systems
- [ ] `tel:`, `mailto:` and map links correct
- [ ] 404 page works; no broken internal links

## SEO
- [ ] Unique titles and descriptions; one H1 per page
- [ ] JSON-LD `ExerciseGym` validates (Google Rich Results Test / Schema.org validator)
- [ ] `sitemap.xml`, `robots.txt`, canonical URLs with the real domain
- [ ] Google Business Profile NAP matches the site

## Accessibility and performance
- [ ] Contrast AA, visible focus, skip link, alt text, form labels
- [ ] Reduced-motion respected
- [ ] Lighthouse (mobile) ≥ 90 performance, 100 accessibility/best practices/SEO where possible
- [ ] Images compressed and responsive; hero preloaded

## Legal / launch
- [ ] Privacy policy (and cookie banner if analytics/marketing cookies are used)
- [ ] Terms / cancellation policy if selling memberships online
- [ ] Domain, HTTPS, hosting, analytics, Search Console configured
- [ ] Client trained on editing `site.config.mjs` (or handover document provided)

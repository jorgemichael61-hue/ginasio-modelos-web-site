# Reference research: 10 US gym websites

Research date: 28 October 2026.

## How this research was done (and its limits)

- Pages were read with a text-extraction web fetch tool (page markup and text, **no stylesheets, no screenshots**).
- A real browser was not available in the research session (Claude in Chrome was not connected, and the
  workspace network could not reach these sites directly).
- Because of that, **exact fonts, hex colours, spacing and animation behaviour were NOT verified**.
  Anything about visual style below is marked *(inferred)* when it comes from file names, alt text or copy,
  not from rendered pages. Re-check visuals in a real browser before relying on them.
- Nothing here copies code, logos, images or exact layouts. These are design and conversion *principles*.

## Access status

| # | Site | Page(s) read | Status |
|---|------|--------------|--------|
| 1 | Equinox | home, /groupfitness | Read (text only) |
| 2 | Barry's | home, /studio/west-hollywood | Read (text only) |
| 3 | DOGPOUND | home, /membership/ | Read (text only) |
| 4 | Solace New York | home | Read (text only) |
| 5 | TMPL Clubs | /join-us, /locations/tmpl-hells-kitchen | Partly — /join-us body did not render; location page read |
| 6 | Orangetheory | /en-us/locations (shell only), one studio page (West Village) | Partly — locator widget did not render; studio page read |
| 7 | Life Time | Eden Prairie memberships page, /faq | Read (text only); homepage not fetched |
| 8 | Planet Fitness | /clubs/ny/new-york | Partly — /clubs/ny/brooklyn and /gyms/ **failed to load**; NY page gave copy only |
| 9 | Big Tex Gym | /membership, home | Read (text only) |
| 10 | Crunch Fitness | /locations/round-rock | Read (text only); homepage not fetched |

## Site-by-site findings

### 1. Equinox — premium
- **Structure:** promo hero → short brand statement → clubs (stat-led) → membership → grid of ~11 signature
  class tiles → four "elevated experience" cards (training, Pilates, spa, shop) → large footer.
- **Navigation:** service-led (Clubs, Membership, Classes, Personal Training, Pilates, Spa, More). Two
  persistent header CTAs at different commitment levels: *visit a club* (low) and *join* (high).
- **Copy:** short, confident, aspirational; brand line positions fitness as lifestyle.
- **Photography:** real in-club scenes (strength floor, studios), descriptive alt text, separate mobile and
  desktop crops. Image names suggest darkened/tinted treatment *(inferred)*.
- **Conversion:** time-limited join offer with stated end date and a terms link right beside the CTA; free first
  session for personal training and Pilates; cross-sell to spa/shop.
- **Classes page:** class categories as a simple text row, three featured formats with image + one-line
  description, FAQ covering booking, waitlist, walk-ins, gear and penalties. Booking lives in the app.
- **Lesson:** two-level CTA (visit vs join), editorial restraint, class catalogue as visual tiles.

### 2. Barry's — high-energy, class booking
- **Structure (home):** app banner → header with "book your first class" → promo hero → "what to expect" video
  → two workout-type cards (run / lift) with category tags → three format pillars (simple, own pace, inclusive)
  → instructors band → amenities (fuel bar, lockers, shop) → member-count stat + three short testimonials →
  multi-step newsletter form → footer.
- **Studio page:** hero with city name as H1 and **separate CTAs for first-timers vs returning clients**;
  address, phone, email and hours grouped in one block; class length stated (50 min); parking details;
  amenity icon grid; first-class offer block; no prices on the page (links to pricing).
- **Typography:** large bold display headings, often all caps *(inferred from markup)*; short paragraphs.
- **Colour:** red signature implied by brand vocabulary *(inferred)*; white logo over dark imagery *(inferred)*.
- **Lesson:** reduce first-visit anxiety ("what to expect", class length, beginner tip), split new vs returning
  users, repeat one CTA wording everywhere.

### 3. DOGPOUND — exclusive personal training
- **Structure:** image-tile navigation → full-bleed athlete hero → membership pitch with **region-specific CTAs**
  (NY / LA / worldwide) → lifestyle image → in-person and virtual training → partnerships → footer.
- **Membership:** application-based; benefits listed, **no membership price shown**; intro session packs are
  priced and sold via an external booking platform.
- **Tone:** high-energy, results-driven, exclusive. Mostly dark, "industrial-luxe" *(inferred)*.
- **Lesson:** for high-ticket training, sell an *intro pack* with a clear price and gate the main membership
  behind a consultation/application.

### 4. Solace New York — boutique strength & community
- **Structure:** hero with two CTAs → signature class format explained with benefit bullets → three benefits
  → section for trainers renting space → membership teaser → personal training "matchmaking" → photo grid
  with booking prompt → reviews → contact (email, address, social) → footer with inquiry forms.
- **Lesson:** serve two audiences (members and freelance trainers); "matchmaking" lowers the commitment of
  booking personal training; contact details in plain text near the end.

### 5. TMPL Clubs — boutique luxury, multi-location
- **Location page:** amenity cards (photo, heading, short text, "see more"), upcoming-classes module (showed an
  empty state at research time), "try us" CTA, footer with policies and social.
- **Gaps seen:** the visible location page text showed **no street address, phone or map** — a local-SEO weakness.
- **Lesson:** amenity cards work well for luxury clubs, but every location page still needs NAP
  (name, address, phone) and an empty-state message for schedules.

### 6. Orangetheory — franchise studio pages
- **Studio page:** promo strip → H1 with studio + neighbourhood → two CTAs ("try a class" free, "join") plus
  text-us → award badges → membership tier cards with big monthly price, feature bullets, "coach recommended"
  highlight, membership/class-pack toggle → workout explainer → **weekly schedule with day strip and filters
  (morning/afternoon/evening, hide full)** → referral → FAQ → long disclaimers.
- **Free trial flow:** three-step modal form.
- **Defect observed:** FAQ text still contained an unreplaced template placeholder, and a "coming soon" line
  contradicted live booking. → **Always scan templates for leftover placeholders.**
- **Lesson:** best-in-class schedule filtering and tier cards; local H1; but template hygiene matters.

### 7. Life Time — premium athletic country club
- **Membership page:** H1 with location, "starting at" price, primary "build membership" CTA, then a
  **commitment ladder**: request info → schedule a tour → buy a day pass → call concierge. Disclaimer that
  prices vary by location.
- **Navigation:** large mega-menu grouped by audience (club, classes, training & recovery, kids, pool, older adults).
- **FAQ:** grouped by topic, accordion with one H3 per question and anchor IDs.
- **Lesson:** offer several steps of commitment for undecided visitors; group navigation by audience.

### 8. Planet Fitness — high-volume commercial
- **City page (copy only):** city name in headline and section headings, count of local clubs, "show more
  clubs" list, two clear tiers (standard vs premium with guest privileges and multi-club access), repeated
  welcoming/inclusive brand promise.
- **Not accessible:** Brooklyn club list and /gyms/ locator failed to load in research.
- **Lesson:** simple two-tier pricing, inclusive tone, city landing pages for local SEO.

### 9. Big Tex Gym — independent hardcore gym (Austin)
- **Home:** bold imperative hero with two CTAs (join / see memberships) → stats band (24/7, $0 enrolment,
  veteran-owned) → athlete carousel → community section → four facility zones with photos → trainer cards
  with specialties and links → testimonials from named athletes → membership → blog → FAQ → footer.
- **Membership:** headline promises no contract/no enrolment fee; monthly plan ("most popular"), prepaid
  1/3/6/12-month plans with falling monthly rate, day and week passes, service-member discount; "every
  membership includes" list; staff sign-up hours separate from 24/7 access; what to bring (photo ID, card).
- **Clarity issue observed:** "no contract" next to a 2-month minimum, and "no annual fee" next to an annual
  maintenance fee on another plan. → **Pricing claims must match the fine print.**
- **Local SEO:** city in title/meta/alt text, full address linked to maps in footer.
- **Lesson:** transparent pricing table, facility zones, real trainer specialties, honest fine print.

### 10. Crunch Fitness — commercial, playful
- **Location page:** utility bar (login, language, free trial, join) → club name + address + phone → tabs
  (contact / hours & location / classes) → today's classes (name, time, length, instructor) → membership tiers
  (prices shown as a list) → experience cards → ~18 amenity icon tiles → long SEO copy → free one-day pass
  with intro coaching → FAQ accordion (location, hours, childcare, pricing, contract terms) → values → footer.
- **Tone:** upbeat, playful puns, inclusive.
- **Weaknesses:** tiers not in price order, no feature comparison, repeated blocks, empty team placeholder.
- **Lesson:** "today's classes" teaser, free-pass offer, FAQ answering local practical questions.

## Cross-site patterns (what the best ones share)

1. **Two CTA levels everywhere:** a low-commitment step (free class, visit, tour, day pass) beside the main
   join/book action. Same wording repeated in header, hero, mid-page and footer.
2. **First-visit reassurance:** what to expect, class length, beginner tips, what to bring.
3. **Local identity:** city/neighbourhood in title, H1 and copy; NAP visible as text; hours; parking.
4. **Schedules:** day selector + time-of-day filters; class name, time, length, coach, intensity.
5. **Pricing:** cards with big price, short feature list, one highlighted plan, fine print that matches the claims.
6. **People:** coaches with specialties; testimonials short and attributed.
7. **Photography:** real members and real spaces, action over posing, consistent grading.
8. **FAQ accordions** answering contract, cancellation, hours, guest and beginner questions.
9. **Common failures to avoid:** leftover template placeholders, missing address on location pages,
   contradictory pricing claims, empty sections, duplicated blocks.

## Sources
- https://www.equinox.com/ · https://www.equinox.com/groupfitness
- https://www.barrys.com/ · https://www.barrys.com/studio/west-hollywood
- https://www.thedogpound.com/ · https://www.thedogpound.com/membership/
- https://solacenewyork.com/
- https://www.tmplclubs.com/join-us · https://www.tmplclubs.com/locations/tmpl-hells-kitchen
- https://www.orangetheory.com/en-us/locations · https://www.orangetheory.com/en-us/locations/new-york-new-york-1402
- https://www.lifetime.life/locations/mn/eden-prairie-athletic/memberships.html · https://www.lifetime.life/faq.html
- https://www.planetfitness.com/clubs/ny/new-york (Brooklyn and /gyms/ failed)
- https://bigtexgym.com/membership · https://bigtexgym.com/
- https://www.crunch.com/locations/round-rock

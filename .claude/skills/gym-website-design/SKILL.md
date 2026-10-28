---
name: gym-website-design
description: Design and build professional websites for gyms, fitness studios, boxing/bodybuilding clubs and personal trainers. Use when the user asks for a gym or fitness website, landing page, membership/pricing page, class schedule, trainer profiles, or wants to adapt the APEX ATHLETICS starter for a new client. Covers choosing a design direction (Premium, High-Energy, Commercial), a design system, components, local SEO, accessibility and a pre-launch checklist.
---

# Gym website design

Build gym and fitness websites that convert visitors into trial sessions and memberships, rank in local
search, and stay easy to hand over to a non-technical client.

## Golden rules

1. **Never invent facts about a real business.** Prices, opening hours, addresses, trainers, testimonials,
   awards, member counts and offers must come from the client. If missing, use a clearly marked placeholder
   (`[CLIENT TO CONFIRM: ...]`) or demo content flagged as fictional — and list it in the go-live report.
2. **Never copy** code, logos, photos or exact layouts from other gyms. Learn principles only.
3. **Use licensed photography only:** the client's own photos (best), or free-licence sources such as
   Unsplash/Pexels. Record photographer credits. Never use photos from reference sites.
4. **One primary action per screen**, plus one low-commitment alternative (free trial, tour, day pass).
5. **Mobile first.** Most gym visitors arrive on a phone, often from Google Maps or Instagram.
6. **Verify, don't claim.** Only report build/test success after running the commands.

## Workflow

1. **Inspect the project.** Look for an existing framework (`package.json`, `astro.config.*`, `next.config.*`,
   WordPress, plain HTML). Preserve existing work. If the repo contains this starter (`site.config.mjs` +
   `src/build.mjs`), reuse it — do not rebuild from scratch.
2. **Collect client facts.** Use [references/client-intake.md](references/client-intake.md). Research the
   client's existing website, Google Business Profile and social media if they exist.
3. **Choose a design direction** (below) from the client's positioning, price point and audience.
   State the choice and why in one or two sentences.
4. **Set tokens** (colour, type, radius, motion) — see [references/design-system.md](references/design-system.md).
5. **Assemble pages from components** — see [references/components.md](references/components.md).
6. **Add SEO and local SEO** — see [references/seo-local.md](references/seo-local.md).
7. **Check accessibility and performance** — see [references/accessibility.md](references/accessibility.md).
8. **Run the build and tests, fix errors, screenshot mobile and desktop, critique and refine.**
9. **Report** using [references/quality-checklist.md](references/quality-checklist.md): what works, what needs
   configuration, what the client must supply.

## Choose a design direction

| | Premium Fitness | High-Energy Fitness | Commercial Gym |
|---|---|---|---|
| Fits | luxury clubs, boutique Pilates/strength, high-ticket PT | HIIT, boxing, bootcamp, CrossFit-style, class studios | budget/mid-market gyms, 24/7 clubs, family/community gyms |
| Reference examples | Equinox, TMPL, Life Time, DOGPOUND | Barry's, Solace, DOGPOUND, Big Tex | Planet Fitness, Crunch, Orangetheory studio pages |
| Typography | refined sans or restrained serif display, generous spacing, light-medium weights | heavy/expanded or condensed display, tight leading, big scale jumps | friendly, highly legible sans, medium-bold, moderate scale |
| Colour | muted, few colours, dark or stone neutrals, one quiet accent | strong contrast, one saturated accent, colour used to encode intensity | bright brand colour + white space, clear button colour |
| Photography | editorial, architectural, calm, lots of negative space | action, sweat, motion, close crops, high contrast | real members of all ages and bodies, welcoming, bright |
| Primary CTA | Book a visit / Enquire | Book your first class | Join now / Get a free day pass |
| Pricing | often "from" price or by consultation | intro offer + class packs + unlimited | transparent tier table, prices visible |
| Motion | slow fades, subtle parallax | one punchy hero moment, quick interactions | minimal; speed first |
| Copy voice | calm, assured, short | imperative, motivating, energetic | plain, friendly, reassuring |

Detailed rules per direction: [references/design-directions.md](references/design-directions.md).

If the client is between two directions, pick one as the base and borrow **one** trait from the other.

## Required page set (small gym)

- **Home:** hero + primary/secondary CTA, what you offer, schedule teaser, pricing teaser, coaches,
  testimonials, location/hours, final CTA.
- **Membership:** plans with prices, what's included, fine print that matches the claims, FAQ.
- **Classes / schedule:** filterable weekly timetable, class descriptions, intensity levels.
- **Coaches / trainers:** photo, name, specialties, certifications (as supplied), booking link.
- **Contact / free trial:** form, address, map link, phone, email, hours, parking/transport.
- **Privacy policy, 404.** Add Terms / cancellation policy if selling online.

Single-location studios may combine into one long page, but separate pages rank better for
"[service] in [city]" searches.

## Conversion patterns that work (from the research)

- Two CTA levels repeated in header, hero, mid-page and footer, **with identical wording**.
- First-visit reassurance: what to expect, class length, beginner tip, what to bring.
- Separate paths for **new vs returning** visitors (book first class vs log in / book again).
- Schedule with day selector and time-of-day filters; show length, coach and intensity.
- Pricing cards: big price, 3–6 included items, one highlighted plan, terms link beside the button.
- A commitment ladder for undecided visitors: enquire → tour → trial/day pass → join.
- FAQ accordions answering contract length, cancellation, guests, parking, beginners.

Full research notes: [references/reference-sites.md](references/reference-sites.md).

## Integrations (never fake them)

Booking (Mindbody, Glofox, PushPress, Zen Planner, TeamUp), payments/sign-up (gym software or Stripe),
forms (Formspree, Netlify Forms, Basin, own backend), maps, analytics and cookie consent all need real
accounts. Build the UI so each integration is a single config value, and show an honest demo/fallback
state when it is empty. List every unconfigured integration in the final report.

## Using the APEX starter in this repository

If `site.config.mjs` exists, it is the single source of truth. To make a new client site:

1. Copy the repository (or a branch) per client.
2. Edit `site.config.mjs`: business, `theme.direction`, colours, fonts, photos, programs, plans, trainers,
   schedule, hours, contact, social, integrations. Set `demoMode: false` only when all content is real.
3. Replace `src/assets/logo.svg` (or set `brand.logo`).
4. `npm run build` → `npm test` → `npm run serve` and review at 390px, 768px and 1440px widths.

Never leave demo content in a live client site: `npm run check` fails on `[CLIENT TO CONFIRM` markers
when `demoMode` is false.

## Final report template

1. **What works** — pages, features, test results (only what you ran).
2. **Needs configuration** — booking, forms, payments, analytics, domain, hosting, cookie consent.
3. **Client must supply** — the items from [references/client-intake.md](references/client-intake.md) still missing.

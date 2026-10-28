# Customising the demo for a paying client

Time needed: about 1–3 hours once you have the client's information.

## 0. Make a copy for the client

Never edit the demo itself. On GitHub, use this repository as a template (Settings → "Template
repository", then "Use this template"), or create a new branch named after the client.

## 1. Collect the information

Send the client the list in
[.claude/skills/gym-website-design/references/client-intake.md](../.claude/skills/gym-website-design/references/client-intake.md).
Do not invent anything that is missing.

## 2. Edit `site.config.mjs`

Open it in any text editor. Each section has comments. In order:

| Setting | What to change |
|---|---|
| `demoMode` | Keep `true` while working; set `false` only when everything is real |
| `locale`, `currency` | e.g. `"pt-PT"` + `"EUR"`, `"en-GB"` + `"GBP"`, `"en-US"` + `"USD"` |
| `siteUrl` | The client's real domain, e.g. `"https://www.clientgym.pt"` |
| `brand` | Name, short name, tagline, SEO description |
| `hero` | Headline saying what they offer and where (e.g. "Boxing gym in Braga.") |
| `timezone` | e.g. `"Europe/Lisbon"`, `"Europe/London"` |
| `theme.direction` | `"premium"`, `"energy"` or `"commercial"` (see below) |
| `theme.colors` | Optional overrides: `bg`, `surface`, `ink`, `muted`, `line`, `accent`, `onAccent`, `dark`, `onDark` |
| `theme.fonts` | Optional: `{ display: "Font Name", body: "Font Name" }` from Google Fonts |
| `cta` | Wording and links of the two main buttons |
| `integrations` | Form endpoint, booking URL, join URL, analytics, maps links, reviews link |
| `contact`, `hours`, `social` | The client's real details |
| `photos`, `programs`, `levels`, `plans`, `pricingNotes`, `trialOffer`, `trainers`, `schedule`, `testimonials`, `faq`, `facilities` | The client's real content |

**Choosing the direction:** luxury or boutique → `premium`; HIIT, boxing, class studio → `energy`;
budget, 24/7 or community gym → `commercial`. The skill explains this in more detail.

After changing colours, run `npm run check`: it fails if text contrast becomes too low to read.

## 3. Logo and photos

- Replace `src/assets/logo.svg` with the client's logo (SVG is best). A PNG also works: put it in
  `src/assets/` and set `brand.logo: "logo.png"`.
- Put the client's photos in `src/public/images/` (JPG or WebP, about 2000px wide, under 400 KB each).
  Then reference them like this:

  ```js
  hero: { src: "/images/hero.jpg", alt: "Members training on the main floor", credit: "Photo: client" },
  ```

## 4. Connect the real services

See [GO-LIVE.md](GO-LIVE.md). Each service is one value in `integrations`.

## 5. Check and preview

```bash
npm run build && npm run check   # must show 0 failed
npm run serve                     # look at it on your phone and computer
npm test                          # full browser tests
```

With `demoMode: false`, the build refuses to finish while demo details remain (example.com,
555 numbers, "Demo City", "demo"). The checker also fails if `[CLIENT TO CONFIRM` placeholders
remain, for example in the privacy policy (`src/pages.mjs`).

## 6. Adding or removing sections

Open `src/pages.mjs`. Each page lists its sections in order, e.g.
`S.pricing(config)`. Delete a line to remove a section, or move it to change the order.

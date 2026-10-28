# Gym website starter (demo: APEX ATHLETICS)

A reusable, professional website template for gyms, fitness studios, boxing clubs and personal trainers,
plus a Claude Code skill (`gym-website-design`) that teaches Claude how to design them.

> **APEX ATHLETICS is a fictional business.** All names, prices, people, reviews, addresses and phone
> numbers in the demo are invented. The site shows a "demo" banner and tells Google not to index it
> until `demoMode` is switched off.

## What's inside

| Path | What it is |
|---|---|
| `site.config.mjs` | **The only file you edit for a new client**: name, colours, photos, prices, trainers, schedule, hours, contact, integrations |
| `src/assets/logo.svg` | Logo (replace with the client's) |
| `src/public/images/` | Put the client's own photos here |
| `src/components/` | Reusable sections (hero, schedule, pricing, coaches, FAQ, form…) |
| `src/pages.mjs` | Which sections appear on which page, plus SEO titles |
| `src/theme/themes.mjs` | The three design directions: `premium`, `energy`, `commercial` |
| `src/styles/styles.css` | Styles (use the theme variables) |
| `src/scripts/main.js` | Menu, schedule filters, pricing toggle, "next class", form checks |
| `tests/` | Automatic quality checks |
| `.claude/skills/gym-website-design/` | The Claude Code skill and its research/reference files |
| `docs/` | Customisation guide and go-live checklist |

## How to use it (step by step)

You need [Node.js](https://nodejs.org) version 20 or newer. Nothing else is required to build the site.

```bash
npm run build     # creates the finished website in the dist/ folder
npm run serve     # preview it at http://localhost:4321
npm run check     # quick quality checks (SEO, links, accessibility basics, contrast)
```

For the full browser tests (they click through the site in a real browser at phone, tablet and desktop
sizes and save screenshots to `test-results/`):

```bash
npm install                        # one time: installs Playwright (testing tool only)
npx playwright install chromium    # one time: downloads the test browser
npm test                           # build + check + browser tests
```

## Why it's built this way (for beginners)

- **No framework, no dependencies.** The build is a small Node.js script that turns `site.config.mjs`
  into plain HTML pages. Nothing to update or break, and the result works on any web host.
- **Real HTML pages, not JavaScript-only pages.** Google can read every page, and the site works even if
  JavaScript is off. JavaScript only adds extras (menu, filters, toggles).
- **One config file.** Business details live in one place, so a new client means editing one file, not
  hunting through code.
- **Honest integrations.** If booking, forms or payments aren't connected, the site says so instead of
  pretending to work.

## Publishing the site

The `dist/` folder is the complete website. Upload it to any static host:

- **Netlify** or **Cloudflare Pages**: connect this GitHub repo, build command `npm run build`,
  publish directory `dist`.
- **GitHub Pages**: use a GitHub Actions workflow that runs `npm run build` and deploys `dist`.

Before publishing a real client site, follow [docs/GO-LIVE.md](docs/GO-LIVE.md).

## Guides

- [docs/CUSTOMIZE.md](docs/CUSTOMIZE.md): turn the demo into a real client's site
- [docs/GO-LIVE.md](docs/GO-LIVE.md): what must be configured and supplied before launch
- [docs/SKILL-GUIDE.md](docs/SKILL-GUIDE.md): how to use the `gym-website-design` skill with Claude Code
- [Research notes on 10 US gym websites](.claude/skills/gym-website-design/references/reference-sites.md)

## Photo credits and licence

Demo photos are free images from [Unsplash](https://unsplash.com/license), loaded from Unsplash's image
service, with credits in the site footer. For a paying client, use the client's own professional photos.

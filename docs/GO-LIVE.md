# Go-live checklist

The demo works as a portfolio piece today. A real client site needs the items below.

## What already works (tested)

- 5 main pages + privacy policy + 404, generated from one config file
- Responsive layouts for phone, tablet and desktop; mobile menu; sticky mobile call-to-action
- Weekly class schedule with day and time-of-day filters and empty states
- Live "next class" line calculated from the schedule in the gym's time zone
- Monthly / yearly pricing toggle
- FAQ accordion (works without JavaScript)
- Free-session form with validation and accessible error messages
- SEO: titles, descriptions, canonical links, Open Graph tags, `ExerciseGym` structured data, sitemap, robots.txt
- Accessibility: skip link, keyboard menu, focus styles, labels, WCAG AA colour contrast, reduced motion
- Demo safety: demo banner, fictional labels, `noindex`, and a build that refuses to go live with demo details

## Needs configuration (in `site.config.mjs` → `integrations`)

| Item | Current state | What to do |
|---|---|---|
| Form sending (`formEndpoint`) | **Not connected.** The form validates but sends nothing | Create a free form service account (Formspree, Basin, Netlify Forms) and paste its URL |
| Class booking (`bookingUrl`) | **Not connected.** "Book" buttons open the free-session form | Paste the gym's Mindbody / Glofox / PushPress / TeamUp booking link |
| Membership sign-up / payments (`joinUrl`) | **Not connected.** Plan buttons open the form | Paste the gym software's online sign-up link, or set up Stripe Payment Links |
| Analytics (`analyticsId`) | Off (no cookies) | Add a GA4 ID **and** a cookie consent banner (required in the EU/UK), or use a cookie-free tool such as Plausible |
| Map (`mapsUrl`, `mapEmbedUrl`) | Demo search link | Use the gym's Google Maps link; optional embed loads only when clicked |
| Reviews (`reviewsUrl`) | Hidden | Link to the gym's Google reviews |
| Domain and hosting | Not set | Buy/connect domain, deploy `dist/` (Netlify, Cloudflare Pages or GitHub Pages), enable HTTPS |
| `siteUrl` | `apex-athletics.example.com` | Set to the real domain (used in SEO links and sitemap) |
| Google Search Console | Not set | Verify the domain and submit `/sitemap.xml` |
| Fonts (GDPR) | Loaded from Google Fonts | For EU clients, consider self-hosting the font files |
| Photos | Loaded from Unsplash's image service | Replace with the client's own photos in `src/public/images/` |

## Information required from the client before launch

- Business name, logo files, brand colours (if any)
- Full address, phone, email, WhatsApp (optional), parking and transport notes
- Opening hours, including holiday hours
- Programmes/classes with descriptions, duration and intensity
- Weekly class schedule and coaches
- Membership plans: prices, billing, joining fee, minimum term, cancellation terms (the fine print must match the headline claims)
- Free trial / intro offer conditions
- Trainer names, roles, photos, specialties, certifications, short bios, with consent to publish
- Real testimonials with written permission (or remove the section)
- Professional photos of the real gym and members (with model releases)
- Social media links and Google Business Profile
- Booking system, sign-up/payment system and form destination
- Privacy policy details: processors, retention period, contact for data requests (`src/pages.mjs` has `[CLIENT TO CONFIRM]` markers)
- Terms and cancellation policy if memberships are sold online

## Final steps

1. Set `demoMode: false`.
2. `npm run build && npm run check && npm test`, all passing.
3. Run Google's Rich Results Test on the homepage and Lighthouse (mobile) in Chrome DevTools.
4. Test the form, booking and join links on a real phone.
5. Deploy, connect the domain, submit the sitemap.

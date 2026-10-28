# SEO and local SEO

## On every page
- Unique `<title>` (≤ 60 chars): "Page topic in City | Gym name".
- Unique meta description (≤ 155 chars) with service + location + benefit.
- One H1; logical H2/H3 order.
- Canonical URL, `lang` attribute, Open Graph and Twitter card tags with a 1200×630 image.
- Descriptive alt text on content images; empty alt on decorative ones.
- Internal links between home, membership, classes, trainers, contact.

## Local SEO
- NAP (name, address, phone) identical everywhere: site, Google Business Profile, Instagram, directories.
- City/neighbourhood in title, H1, intro copy and image alt text — naturally, no keyword stuffing.
- Opening hours in visible text and in structured data.
- Structured data JSON-LD using `ExerciseGym` (a `LocalBusiness` subtype): name, url, logo, image,
  telephone, email, address (`PostalAddress`), geo, `openingHoursSpecification`, `priceRange`, `sameAs`.
- Embed or link to Google Maps; mention landmarks, parking and transport.
- One page per location for multi-site gyms.
- Encourage Google reviews (link to the review form); never fabricate ratings or add `AggregateRating`
  without real data.

## Technical
- `sitemap.xml` and `robots.txt`; submit sitemap in Google Search Console.
- Demo or staging sites: `noindex` and `Disallow: /`.
- Fast: LCP < 2.5 s, CLS < 0.1, INP < 200 ms. Compress images (WebP/AVIF), responsive `srcset`,
  lazy-load below the fold, minimal JavaScript.
- HTTPS, clean URLs, 404 page.

## Content ideas that rank for gyms
- "[Service] in [City]" pages (personal training, boxing classes, women's strength).
- Beginner guides, "what to expect at your first class", FAQs about membership.

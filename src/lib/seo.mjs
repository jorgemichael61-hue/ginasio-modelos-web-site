// Search engine helpers: structured data (JSON-LD), sitemap and robots.txt.
import { ogImage } from "./helpers.mjs";

const DAY_URL = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
};

// Local business data for Google (type ExerciseGym = a kind of LocalBusiness).
export function structuredData(config) {
  const a = config.contact.address;
  const data = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: config.brand.name,
    description: config.brand.seoDescription,
    url: config.siteUrl + "/",
    logo: `${config.siteUrl}/assets/${config.brand.logo}`,
    image: ogImage(config.photos.hero),
    telephone: config.contact.phone,
    email: config.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region || undefined,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    areaServed: config.contact.areaServed || undefined,
    openingHoursSpecification: config.hours
      .filter((h) => !h.closed)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAY_URL[h.day], opens: h.opens, closes: h.closes })),
    sameAs: config.social.map((s) => s.url),
  };
  if (config.contact.geo) {
    data.geo = { "@type": "GeoCoordinates", latitude: config.contact.geo.lat, longitude: config.contact.geo.lng };
  }
  const prices = config.plans.map((p) => p.price).filter((n) => typeof n === "number");
  if (prices.length) {
    data.priceRange = `${Math.min(...prices)}–${Math.max(...prices)} ${config.currency}`;
  }
  // "<" escaped so the JSON can never close the <script> tag early.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function sitemap(config, paths) {
  const urls = paths
    .map((p) => `  <url><loc>${config.siteUrl}${p === "/index.html" ? "/" : p}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function robots(config) {
  if (config.demoMode) {
    return "# Demo site: keep it out of search engines.\nUser-agent: *\nDisallow: /\n";
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`;
}

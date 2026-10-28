// Page shell: <head>, demo notice, header/navigation and footer.
import { esc, html, telHref, linkAttrs, timeLabel } from "../lib/helpers.mjs";
import { themeToCss, googleFontsUrl } from "../theme/themes.mjs";
import { structuredData } from "../lib/seo.mjs";

export const NAV = [
  { href: "/classes.html", label: "Classes" },
  { href: "/membership.html", label: "Membership" },
  { href: "/coaches.html", label: "Coaches" },
  { href: "/contact.html", label: "Contact" },
];

function head({ config, theme, page }) {
  const title = page.title ? `${page.title} | ${config.brand.name}` : `${config.brand.name} | ${config.brand.tagline}`;
  const url = config.siteUrl + (page.path === "/index.html" ? "/" : page.path);
  const description = page.description || config.brand.seoDescription;
  const robots = config.demoMode || page.noindex ? `<meta name="robots" content="noindex, nofollow">` : "";
  const ga = config.integrations.analyticsId
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(config.integrations.analyticsId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(config.integrations.analyticsId)}');</script>`
    : "";
  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add("js")</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${robots}
<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="${esc(theme.colors.dark)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(config.brand.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
${page.ogImage ? `<meta property="og:image" content="${esc(page.ogImage)}">` : ""}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="stylesheet" href="${esc(googleFontsUrl(theme))}">
<style>${themeToCss(theme)}</style>
<link rel="stylesheet" href="/assets/styles.css">
${page.preload || ""}
<script type="application/ld+json">${structuredData(config)}</script>
${ga}
</head>`;
}

function demoBar(config) {
  if (!config.demoMode) return "";
  return `<div class="demo-bar" role="note">Demo website. ${esc(config.brand.name)} is a fictional gym: prices, people, reviews and contact details are invented.</div>`;
}

function header({ config, page }) {
  const links = NAV.map(
    (l) => `<li><a href="${l.href}"${page.path === l.href ? ` aria-current="page"` : ""}>${esc(l.label)}</a></li>`
  ).join("");
  const p = config.cta.primary;
  return html`<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="/" aria-label="${esc(config.brand.name)} home">
      <img src="/assets/${esc(config.brand.logo)}" alt="" width="40" height="40">
      <span>${esc(config.brand.name)}</span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="menu-icon" aria-hidden="true"></span><span class="menu-label">Menu</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul>${links}</ul>
      <a class="btn btn-primary btn-small" href="${esc(p.href)}"${linkAttrs(p.href)}>${esc(p.label)}</a>
    </nav>
  </div>
</header>`;
}

function footer({ config }) {
  const a = config.contact.address;
  const hours = config.hours
    .map((h) => `<tr><th scope="row">${esc(h.day)}</th><td>${h.closed ? "Closed" : `${esc(timeLabel(h.opens, config.locale))}–${esc(timeLabel(h.closes, config.locale))}`}</td></tr>`)
    .join("");
  const social = config.social
    .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`)
    .join("");
  const credits = collectCredits(config).map((c) => esc(c)).join(", ");
  const year = new Date().getFullYear();
  return html`<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <p class="footer-name">${esc(config.brand.name)}</p>
      <p>${esc(config.brand.tagline)}</p>
      <address>
        ${esc(a.street)}<br>${esc(a.postalCode)} ${esc(a.locality)}${a.region ? `, ${esc(a.region)}` : ""}<br>
        <a href="${esc(telHref(config.contact.phone))}">${esc(config.contact.phone)}</a><br>
        <a href="mailto:${esc(config.contact.email)}">${esc(config.contact.email)}</a>
      </address>
    </div>
    <div>
      <p class="footer-heading">Opening hours</p>
      <table class="hours-table">${hours}</table>
    </div>
    <div>
      <p class="footer-heading">Explore</p>
      <ul class="footer-links">
        ${NAV.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`)}
        <li><a href="/privacy.html">Privacy policy</a></li>
      </ul>
    </div>
    <div>
      <p class="footer-heading">Follow</p>
      <ul class="footer-links">${social}</ul>
    </div>
  </div>
  <div class="container footer-meta">
    <p>© ${year} ${esc(config.brand.name)}${config.demoMode ? " (fictional demo business)" : ""}.</p>
    <p class="credits">Photos: ${credits}.</p>
  </div>
</footer>`;
}

export function collectCredits(config) {
  const photos = [
    ...Object.values(config.photos || {}),
    ...config.programs.map((p) => p.photo),
    ...config.trainers.map((t) => t.photo),
  ].filter(Boolean);
  return [...new Set(photos.map((p) => p.credit).filter(Boolean))];
}

export function mobileCta(config) {
  const p = config.cta.primary;
  return `<div class="mobile-cta"><a class="btn btn-primary" href="${esc(p.href)}"${linkAttrs(p.href)}>${esc(p.label)}</a></div>`;
}

export function layout({ config, theme, page, body }) {
  return `<!doctype html>
<html lang="${esc(config.locale.split("-")[0])}" class="dir-${theme.direction}">
${head({ config, theme, page })}
<body>
<a class="skip-link" href="#main">Skip to content</a>
${demoBar(config)}
${header({ config, page })}
<main id="main" tabindex="-1">
${body}
</main>
${footer({ config })}
${mobileCta(config)}
<script src="/assets/main.js" defer></script>
</body>
</html>
`;
}

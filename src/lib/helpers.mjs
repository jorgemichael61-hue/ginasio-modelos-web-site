// Small helper functions shared by all components.

// Escape text so it is safe to put inside HTML (prevents broken pages and XSS).
export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Tagged template: html`...` joins arrays and skips null/false values.
export function html(strings, ...values) {
  return strings.reduce((out, str, i) => {
    let v = values[i - 1];
    if (Array.isArray(v)) v = v.join("");
    if (v === null || v === undefined || v === false) v = "";
    return out + v + str;
  });
}

export function money(amount, config) {
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

const WIDTHS = [480, 800, 1200, 1600, 2000];

function photoUrl(photo, width, height) {
  if (photo.unsplash) {
    const h = height ? `&h=${height}` : "";
    return `https://images.unsplash.com/${photo.unsplash}?auto=format&fit=crop&w=${width}${h}&q=70`;
  }
  return photo.src;
}

/**
 * Responsive <img>. ratio = width/height (e.g. 4/5). sizes = CSS sizes attribute.
 * priority = true only for the main image at the top of a page (hero).
 */
export function img(photo, { ratio = 3 / 2, sizes = "100vw", priority = false, className = "", maxWidth = 2000 } = {}) {
  if (!photo) return "";
  const base = 1200;
  const width = base;
  const height = Math.round(base / ratio);
  let srcset = "";
  let src = photo.src;
  if (photo.unsplash) {
    const widths = WIDTHS.filter((w) => w <= maxWidth);
    srcset = widths.map((w) => `${photoUrl(photo, w, Math.round(w / ratio))} ${w}w`).join(", ");
    src = photoUrl(photo, width, height);
  }
  const loading = priority ? `fetchpriority="high" loading="eager"` : `loading="lazy"`;
  return `<img src="${esc(src)}"${srcset ? ` srcset="${esc(srcset)}" sizes="${esc(sizes)}"` : ""} width="${width}" height="${height}" alt="${esc(photo.alt || "")}" ${loading} decoding="async"${className ? ` class="${className}"` : ""}>`;
}

// URL of a photo for social sharing previews (Open Graph), 1200×630.
export function ogImage(photo) {
  return photo?.unsplash ? photoUrl(photo, 1200, 630) : photo?.src || "";
}

// Phone number to a clickable tel: link value.
export function telHref(phone) {
  return "tel:" + String(phone).replace(/[^+\d]/g, "");
}

// "06:00" → "6:00" style display respecting locale.
export function timeLabel(hhmm, locale) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(Date.UTC(2000, 0, 1, h, m));
  return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(d);
}

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Resolve the link for "book" and "join" actions, falling back to the trial form.
export function bookingHref(config) {
  return config.integrations.bookingUrl || "/contact.html#trial";
}
export function joinHref(config) {
  return config.integrations.joinUrl || "/contact.html#trial";
}
export function isExternal(href) {
  return /^https?:\/\//.test(href);
}
export function linkAttrs(href) {
  return isExternal(href) ? ` target="_blank" rel="noopener"` : "";
}

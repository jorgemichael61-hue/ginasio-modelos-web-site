// Checks site.config.mjs for mistakes before building.
// Returns a list of { level: "error" | "warning", message }.
import { DAYS } from "./helpers.mjs";

export function validateConfig(c) {
  const out = [];
  const err = (m) => out.push({ level: "error", message: m });
  const warn = (m) => out.push({ level: "warning", message: m });
  const time = /^([01]\d|2[0-3]):[0-5]\d$/;

  if (!c.brand?.name) err("brand.name is missing.");
  if (!/^https?:\/\/[^/]+$/.test(c.siteUrl || "")) err('siteUrl must look like "https://www.example.com" (no trailing slash).');
  if (!["premium", "energy", "commercial"].includes(c.theme?.direction)) err('theme.direction must be "premium", "energy" or "commercial".');
  for (const [k, v] of Object.entries(c.theme?.colors || {})) {
    if (!/^#[0-9a-fA-F]{6}$/.test(v)) err(`theme.colors.${k} must be a 6-digit hex colour like #1A2B3C.`);
  }
  try {
    new Intl.NumberFormat(c.locale, { style: "currency", currency: c.currency });
  } catch {
    err(`locale "${c.locale}" or currency "${c.currency}" is not valid.`);
  }
  if (!c.contact?.phone || !c.contact?.email) err("contact.phone and contact.email are required.");
  if (!c.contact?.address?.street || !c.contact?.address?.locality) err("contact.address needs street and locality.");

  for (const h of c.hours || []) {
    if (!DAYS.includes(h.day)) err(`hours: unknown day "${h.day}". Use English day names like "Monday".`);
    if (!h.closed && (!time.test(h.opens) || !time.test(h.closes))) err(`hours: ${h.day} needs opens/closes as "HH:MM".`);
  }
  const ids = new Set((c.programs || []).map((p) => p.id));
  for (const p of c.programs || []) {
    if (![1, 2, 3, 4].includes(p.level)) err(`programs: "${p.name}" level must be 1, 2, 3 or 4.`);
    if (!p.photo?.alt) warn(`programs: "${p.name}" photo has no alt text.`);
  }
  for (const s of c.schedule || []) {
    if (!DAYS.includes(s.day)) err(`schedule: unknown day "${s.day}".`);
    if (!time.test(s.time)) err(`schedule: time "${s.time}" must be "HH:MM".`);
    if (!ids.has(s.program)) err(`schedule: program "${s.program}" does not match any programs[].id.`);
  }
  for (const p of c.plans || []) {
    if (typeof p.price !== "number") err(`plans: "${p.name}" price must be a number.`);
  }
  for (const t of c.trainers || []) {
    if (!t.photo?.alt) warn(`trainers: "${t.name}" photo has no alt text.`);
  }
  if (!c.demoMode) {
    const text = JSON.stringify(c);
    if (/example\.com|555 01\d\d|Demo City|demo/i.test(text)) {
      err("demoMode is false but demo content remains (example.com, 555-01xx numbers, 'Demo City' or 'demo'). Replace it with the client's real details.");
    }
  }
  if (!c.integrations?.formEndpoint) warn("integrations.formEndpoint is empty: the form will not send messages.");
  return out;
}

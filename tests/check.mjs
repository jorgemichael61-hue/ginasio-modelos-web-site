// Static quality checks on the built site (no extra software needed).
// Run with: npm run check
// Checks: SEO tags, headings, image alt text, links, duplicate ids, structured
// data, colour contrast of the theme, leftover placeholders, and the Claude skill.
import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import config from "../site.config.mjs";
import { resolveTheme } from "../src/theme/themes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const failures = [];
const warnings = [];
let passed = 0;
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);
const ok = () => passed++;

if (!existsSync(dist)) {
  console.error("dist/ not found. Run npm run build first.");
  process.exit(1);
}

// ---------- HTML pages ----------
const htmlFiles = (await readdir(dist)).filter((f) => f.endsWith(".html"));
const pages = {};
for (const f of htmlFiles) pages[f] = await readFile(path.join(dist, f), "utf8");

const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];

for (const [file, html] of Object.entries(pages)) {
  const where = `${file}:`;
  // Basic document structure
  /<html lang="[a-z]{2}/.test(html) ? ok() : fail(`${where} <html> is missing a lang attribute`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  title ? ok() : fail(`${where} missing <title>`);
  if (title && title.length > 70) warn(`${where} title is ${title.length} characters (aim for ≤ 60–70)`);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  desc ? ok() : fail(`${where} missing meta description`);
  if (desc && desc.length > 160) warn(`${where} meta description is ${desc.length} characters (aim for ≤ 155)`);
  /<link rel="canonical" href="https?:\/\/[^"]+"/.test(html) ? ok() : fail(`${where} missing canonical link`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  h1s === 1 ? ok() : fail(`${where} has ${h1s} <h1> elements (should be exactly 1)`);
  html.includes('href="#main"') && html.includes('id="main"') ? ok() : fail(`${where} skip link or #main missing`);

  // Heading order: never jump more than one level down (h2 → h4).
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) { fail(`${where} heading jumps from h${levels[i - 1]} to h${levels[i]}`); break; }
  }

  // Images need alt text and dimensions.
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    attr(tag, "alt") === undefined ? fail(`${where} image without alt: ${tag.slice(0, 80)}`) : ok();
    attr(tag, "width") && attr(tag, "height") ? ok() : fail(`${where} image without width/height (causes layout shift)`);
  }

  // Duplicate ids break labels and anchors.
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  dupes.length ? fail(`${where} duplicate id(s): ${[...new Set(dupes)].join(", ")}`) : ok();

  // Form fields need labels.
  for (const tag of html.match(/<(input|select|textarea)\b[^>]*>/g) || []) {
    const id = attr(tag, "id");
    if (attr(tag, "type") === "hidden") continue;
    id && html.includes(`for="${id}"`) ? ok() : fail(`${where} form field without <label for>: ${tag.slice(0, 60)}`);
  }

  // Internal links must point to existing pages and anchors.
  for (const m of html.matchAll(/href="(\/[^"]*|#[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith("//")) continue;
    const [p, hash] = href.split("#");
    const target = p === "" ? file : p === "/" ? "index.html" : p.replace(/^\//, "");
    const targetPath = path.join(dist, target);
    if (!existsSync(targetPath)) { fail(`${where} broken link ${href}`); continue; }
    if (hash && target.endsWith(".html")) {
      const targetHtml = pages[target] ?? (await readFile(targetPath, "utf8"));
      targetHtml.includes(`id="${hash}"`) ? ok() : fail(`${where} link ${href} points to a missing #${hash}`);
    } else ok();
  }

  // Structured data must be valid JSON.
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      data["@type"] === "ExerciseGym" && data.address && data.telephone ? ok() : fail(`${where} JSON-LD missing type/address/telephone`);
    } catch {
      fail(`${where} JSON-LD is not valid JSON`);
    }
  }

  // Demo safety: a live site must not contain placeholders or demo text.
  if (!config.demoMode) {
    for (const marker of ["[CLIENT TO CONFIRM", "example.com", "Demo City", "Fictional", "demo"]) {
      html.includes(marker) ? fail(`${where} contains "${marker}" but demoMode is false`) : ok();
    }
  } else {
    html.includes('name="robots" content="noindex') ? ok() : fail(`${where} demo pages must be noindex`);
  }
}

// ---------- SEO files ----------
const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
config.demoMode === robots.includes("Disallow: /") ? ok() : fail("robots.txt does not match demoMode");
const sm = await readFile(path.join(dist, "sitemap.xml"), "utf8");
sm.includes(config.siteUrl) && !sm.includes("404") ? ok() : fail("sitemap.xml is wrong (missing siteUrl or includes 404)");

// ---------- Colour contrast (WCAG AA) ----------
const t = resolveTheme(config.theme);
function lum(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const c = t.colors;
const pairs = [
  ["ink on background", c.ink, c.bg, 4.5],
  ["muted text on background", c.muted, c.bg, 4.5],
  ["muted text on surface", c.muted, c.surface, 4.5],
  ["button text on accent", c.onAccent, c.accent, 4.5],
  ["light text on dark sections", c.onDark, c.dark, 4.5],
  ["accent (links, focus) on background", c.accent, c.bg, 3],
];
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  r >= min ? ok() : fail(`contrast too low for ${name}: ${r.toFixed(2)}:1 (needs ${min}:1)`);
}

// ---------- JavaScript syntax ----------
try {
  execFileSync(process.execPath, ["--check", path.join(root, "src/scripts/main.js")]);
  ok();
} catch (e) {
  fail("src/scripts/main.js has a syntax error:\n" + e.stderr?.toString());
}

// ---------- Claude Code skill ----------
const skillDir = path.join(root, ".claude/skills/gym-website-design");
const skillFile = path.join(skillDir, "SKILL.md");
if (!existsSync(skillFile)) fail("Claude skill missing: .claude/skills/gym-website-design/SKILL.md");
else {
  const s = await readFile(skillFile, "utf8");
  s.startsWith("---\n") ? ok() : fail("SKILL.md must start with --- on the first line");
  const fm = s.split("---")[1] || "";
  const name = (fm.match(/^name:\s*(.+)$/m) || [])[1]?.trim();
  const description = (fm.match(/^description:\s*(.+)$/m) || [])[1]?.trim();
  name === "gym-website-design" ? ok() : fail(`SKILL.md name should be gym-website-design (found ${name})`);
  description && description.length <= 1536 ? ok() : fail("SKILL.md description missing or longer than 1536 characters");
  s.split("\n").length < 500 ? ok() : fail("SKILL.md should stay under 500 lines");
  for (const m of s.matchAll(/\]\((references\/[^)]+)\)/g)) {
    existsSync(path.join(skillDir, m[1])) ? ok() : fail(`SKILL.md links to missing file ${m[1]}`);
  }
}

// ---------- Page weight ----------
let bytes = 0;
for (const f of ["assets/styles.css", "assets/main.js", "index.html"]) bytes += (await stat(path.join(dist, f))).size;
bytes < 150_000 ? ok() : warn(`HTML+CSS+JS of the homepage is ${(bytes / 1024).toFixed(0)} KB (budget 150 KB)`);

// ---------- Report ----------
for (const w of warnings) console.log(`! ${w}`);
for (const f of failures) console.log(`✗ ${f}`);
console.log(`\n${passed} checks passed, ${failures.length} failed, ${warnings.length} warning(s).`);
process.exit(failures.length ? 1 : 0);

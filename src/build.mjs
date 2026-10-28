// Build script: reads site.config.mjs and writes the finished website to /dist.
// Run with: npm run build
import { mkdir, writeFile, readFile, rm, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import config from "../site.config.mjs";
import { resolveTheme } from "./theme/themes.mjs";
import { layout } from "./components/layout.mjs";
import { pages } from "./pages.mjs";
import { sitemap, robots } from "./lib/seo.mjs";
import { validateConfig } from "./lib/validate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const problems = validateConfig(config);
const errors = problems.filter((p) => p.level === "error");
for (const p of problems) console.log(`${p.level === "error" ? "✗" : "!"} ${p.message}`);
if (errors.length) {
  console.error(`\nBuild stopped: fix the ${errors.length} error(s) in site.config.mjs above.`);
  process.exit(1);
}

const theme = resolveTheme(config.theme);
await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "assets"), { recursive: true });

const pageList = pages(config);
for (const page of pageList) {
  const out = layout({ config, theme, page, body: page.body });
  await writeFile(path.join(dist, page.path), out);
}

// Static assets: CSS, JS, logo, favicon and anything in src/public.
await cp(path.join(root, "src/styles/styles.css"), path.join(dist, "assets/styles.css"));
await cp(path.join(root, "src/scripts/main.js"), path.join(dist, "assets/main.js"));
await cp(path.join(root, "src/assets"), path.join(dist, "assets"), { recursive: true });
await cp(path.join(root, "src/public"), dist, { recursive: true });

// Favicon: reuse the logo.
const logo = await readFile(path.join(root, "src/assets", config.brand.logo), "utf8");
await writeFile(path.join(dist, "favicon.svg"), logo);

const indexable = pageList.filter((p) => !p.noindex).map((p) => p.path);
await writeFile(path.join(dist, "sitemap.xml"), sitemap(config, indexable));
await writeFile(path.join(dist, "robots.txt"), robots(config));

console.log(`✓ Built ${pageList.length} pages into dist/ (direction: ${theme.direction}${config.demoMode ? ", DEMO MODE" : ""})`);

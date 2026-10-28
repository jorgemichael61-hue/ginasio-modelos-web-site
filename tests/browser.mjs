// Browser tests: opens every page in a real (headless) Chrome at phone, tablet
// and desktop sizes, clicks the interactive parts and saves screenshots.
// Run with: npm run test:browser   (first time: npm install && npx playwright install chromium)
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../scripts/serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "test-results");
await mkdir(out, { recursive: true });

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  try {
    ({ chromium } = await import(process.env.PLAYWRIGHT_PATH || "/opt/npm-tools/node_modules/playwright/index.mjs"));
  } catch {
    console.log("Playwright is not installed. Run: npm install && npx playwright install chromium");
    process.exit(1);
  }
}

const PORT = 4398;
const server = createServer().listen(PORT);
const base = `http://localhost:${PORT}`;
const browser = await chromium.launch();
const failures = [];
let passed = 0;
const check = (cond, msg) => (cond ? passed++ : failures.push(msg));

const viewports = [
  ["phone", 390, 844],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
];
const pagesToTest = ["/", "/classes.html", "/membership.html", "/coaches.html", "/contact.html", "/privacy.html", "/missing-page"];
// Set OFFLINE=1 to block photos/fonts from the internet (faster, for sandboxes without web access).
const offline = process.env.OFFLINE === "1";

for (const [vpName, width, height] of viewports) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  if (offline) await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error" && !/Failed to load resource|net::ERR/.test(m.text())) errors.push(m.text());
  });

  for (const p of pagesToTest) {
    const label = `${vpName} ${p}`;
    const res = await page.goto(base + p, { waitUntil: "domcontentloaded" });
    if (p === "/missing-page") {
      check(res.status() === 404 && (await page.textContent("h1")).includes("not found"), `${label}: 404 page not shown`);
      continue;
    }
    check(res.ok(), `${label}: page did not load`);
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(overflow <= 1, `${label}: page scrolls sideways by ${overflow}px`);

    // Every link and button needs a name screen readers can announce.
    const unnamed = await page.$$eval("a, button", (els) =>
      els.filter((el) => el.offsetParent !== null && !(el.getAttribute("aria-label") || el.textContent.trim())).length
    );
    check(unnamed === 0, `${label}: ${unnamed} link(s)/button(s) without an accessible name`);

    // Touch targets ≥ 44px tall for main controls on phones.
    if (vpName === "phone") {
      const small = await page.$$eval(".btn, .chip, .day-btn, .class-book, .menu-toggle", (els) =>
        els.filter((el) => el.offsetParent !== null && el.getBoundingClientRect().height < 43.5).map((el) => el.textContent.trim())
      );
      check(small.length === 0, `${label}: touch targets under 44px: ${small.join(", ")}`);
    }
    const shotName = (p === "/" ? "home" : p.replace(/\W|html/g, "")) + `-${vpName}.png`;
    await page.screenshot({ path: path.join(out, shotName), fullPage: true });
  }

  // ----- Mobile menu -----
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  if (width < 900) {
    const toggle = page.locator(".menu-toggle");
    check(await toggle.isVisible(), `${vpName}: menu button not visible`);
    check(!(await page.locator("#site-nav").isVisible()), `${vpName}: menu open before clicking`);
    await toggle.click();
    check((await toggle.getAttribute("aria-expanded")) === "true", `${vpName}: menu button did not set aria-expanded`);
    check(await page.locator("#site-nav a[href='/classes.html']").isVisible(), `${vpName}: menu links not visible after opening`);
    await page.keyboard.press("Escape");
    check(!(await page.locator("#site-nav").isVisible()), `${vpName}: Escape did not close the menu`);
    check(await page.evaluate(() => document.activeElement.classList.contains("menu-toggle")), `${vpName}: focus did not return to the menu button`);
  } else {
    check(await page.locator("#site-nav a[href='/classes.html']").isVisible(), `${vpName}: desktop navigation not visible`);
  }

  // ----- Next class line -----
  const next = page.locator("[data-next-class]");
  check(await next.isVisible() && (await next.textContent()).startsWith("Next class:"), `${vpName}: "next class" line missing`);

  // ----- Schedule filters -----
  await page.goto(base + "/classes.html", { waitUntil: "domcontentloaded" });
  await page.click(".day-btn[data-day='Monday']");
  const visibleRows = () => page.locator("[data-day-panel='Monday'] .class-row:visible").count();
  check((await visibleRows()) === 4, `${vpName}: Monday should show 4 classes, shows ${await visibleRows()}`);
  check((await page.locator("[data-day-panel='Tuesday']").isVisible()) === false, `${vpName}: other days should be hidden`);
  await page.click(".part-picker [data-part='evening']");
  check((await visibleRows()) === 2, `${vpName}: Monday evening should show 2 classes, shows ${await visibleRows()}`);
  await page.click(".day-btn[data-day='Sunday']");
  check(await page.locator("[data-day-panel='Sunday'] .filter-empty").isVisible(), `${vpName}: empty state not shown for Sunday evening`);
  const status = await page.textContent("[data-schedule-status]");
  check(/0 classes on Sunday/.test(status), `${vpName}: screen-reader status not updated ("${status}")`);

  // ----- Pricing toggle -----
  await page.goto(base + "/membership.html", { waitUntil: "domcontentloaded" });
  const firstPrice = page.locator(".plan .price").first();
  const before = await firstPrice.textContent();
  await page.click("[data-billing='annual']");
  const after = await firstPrice.textContent();
  check(before !== after, `${vpName}: yearly toggle did not change the price`);
  await page.click("[data-billing='monthly']");
  check((await firstPrice.textContent()) === before, `${vpName}: monthly toggle did not restore the price`);

  // ----- FAQ accordion -----
  const details = page.locator(".faq details").first();
  await details.locator("summary").click();
  check(await details.evaluate((d) => d.open), `${vpName}: FAQ item did not open`);

  // ----- Form validation -----
  await page.goto(base + "/contact.html#trial", { waitUntil: "domcontentloaded" });
  await page.click("[data-trial-form] button[type=submit]");
  check(await page.locator("#f-name-error").isVisible(), `${vpName}: empty name error not shown`);
  check((await page.getAttribute("#f-name", "aria-invalid")) === "true", `${vpName}: name not marked aria-invalid`);
  check(await page.evaluate(() => document.activeElement.id === "f-name"), `${vpName}: focus not moved to first error`);
  await page.fill("#f-name", "Test Person");
  await page.fill("#f-email", "not-an-email");
  await page.click("[data-trial-form] button[type=submit]");
  check(await page.locator("#f-email-error").isVisible(), `${vpName}: invalid email accepted`);
  await page.fill("#f-email", "test@example.com");
  await page.check("#f-consent");
  await page.click("[data-trial-form] button[type=submit]");
  const formStatus = page.locator(".form-status");
  check(await formStatus.isVisible(), `${vpName}: success/demo message not shown`);
  check(/Demo only|Thanks/.test(await formStatus.textContent()), `${vpName}: unexpected form message`);

  check(errors.length === 0, `${vpName}: JavaScript errors: ${errors.join(" | ")}`);
  await context.close();
}

// ----- Keyboard: skip link is the first Tab stop -----
{
  const page = await browser.newPage();
  if (offline) await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Tab");
  check(await page.evaluate(() => document.activeElement.classList.contains("skip-link")), "keyboard: skip link is not the first Tab stop");
  await page.close();
}

// ----- Reduced motion: no hero animation -----
{
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  if (offline) await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  const dur = await page.$eval(".hero-title", (el) => getComputedStyle(el).animationDuration);
  check(parseFloat(dur) < 0.01, `reduced motion: hero still animates (${dur})`);
  await context.close();
}

// ----- Works without JavaScript -----
{
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  if (offline) await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await page.goto(base + "/classes.html", { waitUntil: "domcontentloaded" });
  const rows = await page.locator(".class-row:visible").count();
  check(rows > 10, `no-JS: full schedule should be visible, saw ${rows} rows`);
  check(await page.locator("#site-nav a[href='/membership.html']").isVisible(), "no-JS: navigation links not reachable");
  await context.close();
}

await browser.close();
server.close();
for (const f of failures) console.log(`✗ ${f}`);
console.log(`\n${passed} browser checks passed, ${failures.length} failed. Screenshots in test-results/.`);
process.exit(failures.length ? 1 : 0);

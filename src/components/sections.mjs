// Reusable page sections. Each function receives the site config and returns HTML.
// Pages in src/pages.mjs combine these sections.
import { esc, html, img, money, telHref, timeLabel, DAYS, bookingHref, joinHref, linkAttrs } from "../lib/helpers.mjs";

const demoTag = (config, text = "Fictional demo content") =>
  config.demoMode ? `<span class="demo-tag">${esc(text)}</span>` : "";

function ctaButtons(config, { inverse = false } = {}) {
  const p = config.cta.primary;
  const s = config.cta.secondary;
  return `<div class="cta-row">
    <a class="btn btn-primary" href="${esc(p.href)}"${linkAttrs(p.href)}>${esc(p.label)}</a>
    <a class="btn ${inverse ? "btn-ghost-inverse" : "btn-ghost"}" href="${esc(s.href)}"${linkAttrs(s.href)}>${esc(s.label)}</a>
  </div>`;
}

function levelBadge(config, level) {
  return `<span class="level level-${level}"><span class="level-bars" aria-hidden="true">${[1, 2, 3, 4]
    .map((n) => `<i${n <= level ? ' class="on"' : ""}></i>`)
    .join("")}</span>${esc(config.levels[level])}</span>`;
}

// ---------------------------------------------------------------------------
// Homepage hero: full-bleed photo, big headline, two CTAs, live "next class".
// ---------------------------------------------------------------------------
export function hero(config) {
  const scheduleData = config.schedule.map((s) => {
    const prog = config.programs.find((p) => p.id === s.program);
    return { d: s.day, t: s.time, n: prog?.name || s.program, c: s.coach };
  });
  return html`<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media">${img(config.photos.hero, { ratio: 3 / 2, priority: true, sizes: "100vw" })}</div>
  <div class="container hero-content">
    <h1 id="hero-title" class="display hero-title">${esc(config.hero.title)}</h1>
    <p class="hero-text">${esc(config.hero.text)}</p>
    ${ctaButtons(config, { inverse: true })}
    <p class="next-class" data-next-class data-tz="${esc(config.timezone)}" data-locale="${esc(config.locale)}" hidden></p>
    <script type="application/json" id="schedule-data">${JSON.stringify(scheduleData).replace(/</g, "\\u003c")}</script>
  </div>
</section>`;
}

// Smaller header used at the top of inner pages.
export function pageHeader({ title, text, photo }) {
  return html`<section class="page-header${photo ? " has-photo" : ""}">
  ${photo ? `<div class="page-header-media">${img(photo, { ratio: 21 / 9, priority: true, sizes: "100vw" })}</div>` : ""}
  <div class="container">
    <h1 class="display page-title">${esc(title)}</h1>
    ${text ? `<p class="lead">${esc(text)}</p>` : ""}
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Programmes as an index: one row per programme.
// ---------------------------------------------------------------------------
export function programs(config, { heading = "What we train", intro = "", headingLevel = 2 } = {}) {
  const H = `h${headingLevel}`;
  const rows = config.programs
    .map(
      (p) => `<li class="program" id="program-${esc(p.id)}">
      <div class="program-media">${img(p.photo, { ratio: 4 / 3, sizes: "(min-width: 900px) 280px, 100vw", maxWidth: 800 })}</div>
      <div class="program-body">
        <h3 class="program-name">${esc(p.name)}</h3>
        <p>${esc(p.summary)}</p>
      </div>
      <div class="program-meta">
        <span>${esc(p.duration)} min</span>
        ${levelBadge(config, p.level)}
      </div>
    </li>`
    )
    .join("");
  return html`<section class="section" aria-labelledby="programs-title">
  <div class="container">
    <div class="section-head">
      <${H} id="programs-title" class="display section-title">${esc(heading)}</${H}>
      ${intro ? `<p class="lead">${esc(intro)}</p>` : ""}
    </div>
    <ul class="program-list">${rows}</ul>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Weekly schedule with day selector and time-of-day filter (enhanced by JS).
// Without JavaScript, every day is shown.
// ---------------------------------------------------------------------------
export function schedule(config, { heading = "Class schedule", id = "schedule" } = {}) {
  const byDay = DAYS.map((day) => ({
    day,
    items: config.schedule.filter((s) => s.day === day).sort((a, b) => a.time.localeCompare(b.time)),
  }));
  const dayButtons = byDay
    .map(
      (d, i) =>
        `<button type="button" class="day-btn" data-day="${esc(d.day)}" aria-pressed="${i === 0 ? "true" : "false"}"><span class="day-short" aria-hidden="true">${esc(d.day.slice(0, 3))}</span><span class="visually-hidden-mobile">${esc(d.day)}</span></button>`
    )
    .join("");
  const book = bookingHref(config);
  const panels = byDay
    .map((d) => {
      const rows = d.items.length
        ? d.items
            .map((s) => {
              const prog = config.programs.find((p) => p.id === s.program) || { name: s.program, duration: 60, level: 1 };
              const hour = Number(s.time.split(":")[0]);
              const part = hour < 12 ? "morning" : hour < 17 ? "midday" : "evening";
              return `<li class="class-row" data-part="${part}">
            <span class="class-time">${esc(timeLabel(s.time, config.locale))}</span>
            <span class="class-name">${esc(prog.name)}<span class="class-coach">with ${esc(s.coach)}</span></span>
            <span class="class-length">${esc(prog.duration)} min</span>
            ${levelBadge(config, prog.level)}
            <a class="class-book" href="${esc(book)}"${linkAttrs(book)} aria-label="Book ${esc(prog.name)} on ${esc(d.day)} at ${esc(s.time)}">Book</a>
          </li>`;
            })
            .join("")
        : "";
      const hours = config.hours.find((h) => h.day === d.day);
      const empty = `<p class="empty-state">No classes on ${esc(d.day)}${
        hours && !hours.closed ? `. Open gym ${esc(timeLabel(hours.opens, config.locale))}–${esc(timeLabel(hours.closes, config.locale))}` : ""
      }.</p>`;
      return `<div class="day-panel" data-day-panel="${esc(d.day)}">
        <h3 class="day-title">${esc(d.day)}</h3>
        ${rows ? `<ul class="class-list">${rows}</ul>` : empty}
        <p class="empty-state filter-empty" hidden>No ${esc(d.day)} classes at this time of day.</p>
      </div>`;
    })
    .join("");
  return html`<section class="section section-surface" id="${esc(id)}" aria-labelledby="${esc(id)}-title">
  <div class="container">
    <div class="section-head">
      <h2 id="${esc(id)}-title" class="display section-title">${esc(heading)}</h2>
      ${config.demoMode ? `<p class="muted">Demo timetable.</p>` : ""}
    </div>
    <div class="schedule" data-schedule>
      <div class="schedule-controls" hidden>
        <div class="day-picker" role="group" aria-label="Choose a day">${dayButtons}</div>
        <div class="part-picker" role="group" aria-label="Time of day">
          <button type="button" class="chip" data-part="all" aria-pressed="true">All day</button>
          <button type="button" class="chip" data-part="morning" aria-pressed="false">Morning</button>
          <button type="button" class="chip" data-part="midday" aria-pressed="false">Midday</button>
          <button type="button" class="chip" data-part="evening" aria-pressed="false">Evening</button>
        </div>
      </div>
      <p class="visually-hidden" aria-live="polite" data-schedule-status></p>
      ${panels}
      ${levelLegend(config)}
      ${!config.integrations.bookingUrl ? `<p class="muted small">Online booking is not connected yet: "Book" opens the free-session form.</p>` : ""}
    </div>
  </div>
</section>`;
}

function levelLegend(config) {
  return `<div class="level-legend"><p class="small">Intensity, coloured like competition plates:</p><ul>${[1, 2, 3, 4]
    .map((n) => `<li>${levelBadge(config, n)}</li>`)
    .join("")}</ul></div>`;
}

// ---------------------------------------------------------------------------
// Membership plans with optional monthly / annual toggle.
// ---------------------------------------------------------------------------
export function pricing(config, { heading = "Membership", showNotes = true } = {}) {
  const hasAnnual = config.plans.some((p) => typeof p.annualPrice === "number");
  const join = joinHref(config);
  const cards = config.plans
    .map((p) => {
      const annual = typeof p.annualPrice === "number";
      return `<li class="plan${p.highlight ? " plan-highlight" : ""}">
      ${p.highlight && p.highlightLabel ? `<p class="plan-flag">${esc(p.highlightLabel)}</p>` : ""}
      <h3 class="plan-name">${esc(p.name)}</h3>
      <p class="plan-desc">${esc(p.description)}</p>
      <p class="plan-price">
        <span class="price" data-monthly="${esc(money(p.price, config))}" data-annual="${esc(annual ? money(p.annualPrice, config) : money(p.price, config))}">${esc(money(p.price, config))}</span>
        <span class="per">per month</span>
      </p>
      <p class="plan-billing small" data-billing-note data-monthly-text="Billed monthly" data-annual-text="${annual ? "Billed yearly" : "Monthly billing only"}">Billed monthly</p>
      <ul class="plan-features">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <a class="btn ${p.highlight ? "btn-primary" : "btn-ghost"}" href="${esc(join)}"${linkAttrs(join)}>Choose ${esc(p.name)}</a>
    </li>`;
    })
    .join("");
  return html`<section class="section" id="plans" aria-labelledby="plans-title">
  <div class="container">
    <div class="section-head">
      <h2 id="plans-title" class="display section-title">${esc(heading)}</h2>
      ${
        hasAnnual
          ? `<div class="billing-toggle" role="group" aria-label="Billing period">
        <button type="button" class="chip" data-billing="monthly" aria-pressed="true">Pay monthly</button>
        <button type="button" class="chip" data-billing="annual" aria-pressed="false">Pay yearly</button>
      </div>`
          : ""
      }
    </div>
    <ul class="plan-grid" data-pricing>${cards}</ul>
    ${showNotes ? `<ul class="plan-notes small">${config.pricingNotes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
    ${!config.integrations.joinUrl ? `<p class="muted small">Online sign-up is not connected yet: plan buttons open the free-session form.</p>` : ""}
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Trainers / coaches.
// ---------------------------------------------------------------------------
export function trainers(config, { heading = "Your coaches", headingLevel = 2 } = {}) {
  const H = `h${headingLevel}`;
  const cards = config.trainers
    .map(
      (t) => `<li class="coach">
      <div class="coach-media">${img(t.photo, { ratio: 4 / 5, sizes: "(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw", maxWidth: 1200 })}</div>
      <h3 class="coach-name">${esc(t.name)}</h3>
      <p class="coach-role">${esc(t.role)}</p>
      <ul class="tags">${t.specialties.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      <p>${esc(t.bio)}</p>
      ${t.instagram ? `<a href="${esc(t.instagram)}" target="_blank" rel="noopener">Instagram profile of ${esc(t.name)}</a>` : ""}
    </li>`
    )
    .join("");
  return html`<section class="section" aria-labelledby="coaches-title">
  <div class="container">
    <div class="section-head">
      <${H} id="coaches-title" class="display section-title">${esc(heading)}</${H}>
      ${config.demoMode ? `<p class="muted">Fictional coaches for this demo. Photos are stock images of models.</p>` : ""}
    </div>
    <ul class="coach-grid">${cards}</ul>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Testimonials (labelled fictional in demo mode).
// ---------------------------------------------------------------------------
export function testimonials(config) {
  if (!config.testimonials?.length) return "";
  const items = config.testimonials
    .map(
      (t) => `<li><figure class="quote">
      <blockquote><p>${esc(t.quote)}</p></blockquote>
      <figcaption><strong>${esc(t.name)}</strong> ${esc(t.context)} ${demoTag(config, "Fictional review")}</figcaption>
    </figure></li>`
    )
    .join("");
  const reviews = config.integrations.reviewsUrl
    ? `<p><a href="${esc(config.integrations.reviewsUrl)}" target="_blank" rel="noopener">Read our Google reviews</a></p>`
    : "";
  return html`<section class="section section-dark" aria-labelledby="quotes-title">
  <div class="container">
    <div class="section-head">
      <h2 id="quotes-title" class="display section-title">What members say</h2>
      ${config.demoMode ? `<p>These reviews are invented for the demo.</p>` : ""}
    </div>
    <ul class="quote-grid">${items}</ul>
    ${reviews}
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Facilities: split layout with photo.
// ---------------------------------------------------------------------------
export function facilities(config) {
  return html`<section class="section split" aria-labelledby="space-title">
  <div class="container split-grid">
    <div class="split-media">${img(config.photos.floor, { ratio: 4 / 5, sizes: "(min-width: 900px) 50vw, 100vw", maxWidth: 1600 })}</div>
    <div class="split-body">
      <h2 id="space-title" class="display section-title">Built for training</h2>
      ${config.demoMode ? `<p class="muted">Demo description of a fictional space.</p>` : ""}
      <dl class="facts">
        ${config.facilities.map((f) => `<div><dt>${esc(f.title)}</dt><dd>${esc(f.text)}</dd></div>`)}
      </dl>
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// First visit: a real sequence, so numbered steps are appropriate.
// ---------------------------------------------------------------------------
export function firstVisit(config) {
  const steps = [
    ["Book a free session", "Pick a time that suits you. It takes a minute."],
    ["Meet your coach", "Tell us your goals and any injuries. We show you around."],
    ["Train in a real class", "Weights and movements are scaled to your level."],
    ["Choose a plan, or don't", "No pressure. Join only if it feels right."],
  ];
  return html`<section class="section" aria-labelledby="visit-title">
  <div class="container">
    <div class="section-head">
      <h2 id="visit-title" class="display section-title">Your first visit</h2>
      <p class="lead">${esc(config.trialOffer.text)}</p>
    </div>
    <ol class="steps">
      ${steps.map(([t, d]) => `<li><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`)}
    </ol>
    ${ctaButtons(config)}
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// FAQ accordion using native <details> (works without JavaScript).
// ---------------------------------------------------------------------------
export function faq(config) {
  return html`<section class="section" aria-labelledby="faq-title">
  <div class="container narrow">
    <h2 id="faq-title" class="display section-title">Questions</h2>
    <div class="faq">
      ${config.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)}
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Location, hours and contact details.
// ---------------------------------------------------------------------------
export function location(config, { heading = "Find us" } = {}) {
  const a = config.contact.address;
  const hours = config.hours
    .map((h) => `<tr><th scope="row">${esc(h.day)}</th><td>${h.closed ? "Closed" : `${esc(timeLabel(h.opens, config.locale))}–${esc(timeLabel(h.closes, config.locale))}`}</td></tr>`)
    .join("");
  const embed = config.integrations.mapEmbedUrl
    ? `<div class="map-embed" data-map-src="${esc(config.integrations.mapEmbedUrl)}">
        <button type="button" class="btn btn-ghost" data-load-map>Show map (loads Google Maps)</button>
      </div>`
    : "";
  return html`<section class="section section-surface" aria-labelledby="location-title">
  <div class="container location-grid">
    <div>
      <h2 id="location-title" class="display section-title">${esc(heading)}</h2>
      <address class="nap">
        <strong>${esc(config.brand.name)}</strong><br>
        ${esc(a.street)}<br>${esc(a.postalCode)} ${esc(a.locality)}${a.region ? `, ${esc(a.region)}` : ""}
      </address>
      <ul class="contact-list">
        <li><a href="${esc(telHref(config.contact.phone))}">Call ${esc(config.contact.phone)}</a></li>
        <li><a href="mailto:${esc(config.contact.email)}">Email ${esc(config.contact.email)}</a></li>
        ${config.contact.whatsapp ? `<li><a href="https://wa.me/${esc(config.contact.whatsapp.replace(/[^\d]/g, ""))}" target="_blank" rel="noopener">WhatsApp us</a></li>` : ""}
        <li><a href="${esc(config.integrations.mapsUrl)}" target="_blank" rel="noopener">Get directions in Google Maps</a></li>
      </ul>
      ${config.contact.parking ? `<p><strong>Parking.</strong> ${esc(config.contact.parking)}</p>` : ""}
      ${config.contact.transport ? `<p><strong>Getting here.</strong> ${esc(config.contact.transport)}</p>` : ""}
      ${embed}
    </div>
    <div>
      <h3 class="small-title">Opening hours</h3>
      <table class="hours-table hours-large">${hours}</table>
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Closing call-to-action band.
// ---------------------------------------------------------------------------
export function ctaBand(config) {
  return html`<section class="cta-band" aria-labelledby="cta-title">
  <div class="container cta-band-inner">
    <h2 id="cta-title" class="display cta-title">${esc(config.trialOffer.title)}</h2>
    <p>${esc(config.trialOffer.text)}</p>
    ${ctaButtons(config, { inverse: true })}
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Free-session / contact form.
// ---------------------------------------------------------------------------
export function trialForm(config) {
  const endpoint = config.integrations.formEndpoint;
  const options = config.programs.map((p) => `<option>${esc(p.name)}</option>`).join("");
  return html`<section class="section" id="trial" aria-labelledby="trial-title">
  <div class="container form-grid">
    <div class="form-intro">
      <h2 id="trial-title" class="display section-title">${esc(config.trialOffer.title)}</h2>
      <p class="lead">${esc(config.trialOffer.text)}</p>
      <div class="form-photo">${img(config.photos.trial, { ratio: 4 / 3, sizes: "(min-width: 900px) 40vw, 100vw", maxWidth: 1200 })}</div>
    </div>
    <form class="form" data-trial-form ${endpoint ? `action="${esc(endpoint)}" method="POST"` : `action="#trial" method="get"`} novalidate>
      ${!endpoint ? `<p class="form-notice" role="note">Demo form: it checks your entries but does not send them anywhere yet.</p>` : ""}
      <div class="field">
        <label for="f-name">Your name</label>
        <input id="f-name" name="name" type="text" autocomplete="name" required>
        <p class="field-error" id="f-name-error" hidden>Enter your name.</p>
      </div>
      <div class="field">
        <label for="f-email">Email</label>
        <input id="f-email" name="email" type="email" autocomplete="email" required>
        <p class="field-error" id="f-email-error" hidden>Enter an email address like name@example.com.</p>
      </div>
      <div class="field">
        <label for="f-phone">Phone <span class="optional">(optional)</span></label>
        <input id="f-phone" name="phone" type="tel" autocomplete="tel">
      </div>
      <div class="field">
        <label for="f-interest">What would you like to try?</label>
        <select id="f-interest" name="interest">${options}<option>Not sure yet</option></select>
      </div>
      <div class="field">
        <label for="f-time">Best time for you</label>
        <select id="f-time" name="preferred_time"><option>Morning</option><option>Midday</option><option>Evening</option><option>Weekend</option></select>
      </div>
      <div class="field">
        <label for="f-message">Anything we should know? <span class="optional">(optional)</span></label>
        <textarea id="f-message" name="message" rows="4"></textarea>
      </div>
      <div class="field hp" aria-hidden="true">
        <label for="f-company">Leave this field empty</label>
        <input id="f-company" name="company" type="text" tabindex="-1" autocomplete="off">
      </div>
      <div class="field field-check">
        <input id="f-consent" name="consent" type="checkbox" required>
        <label for="f-consent">I agree that ${esc(config.brand.name)} may contact me about my free session, as described in the <a href="/privacy.html">privacy policy</a>.</label>
        <p class="field-error" id="f-consent-error" hidden>Tick this box so we can contact you.</p>
      </div>
      <button class="btn btn-primary" type="submit">${esc(config.cta.primary.label)}</button>
      <p class="form-status" role="status" aria-live="polite" tabindex="-1" hidden></p>
    </form>
  </div>
</section>`;
}

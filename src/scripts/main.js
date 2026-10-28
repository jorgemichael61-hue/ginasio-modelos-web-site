// Interactive features. The site still works without JavaScript; this file
// adds the menu, schedule filters, pricing toggle, "next class", form checks
// and the click-to-load map.
(function () {
  "use strict";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Current weekday and minutes in the gym's own time zone.
  function gymNow(tz) {
    try {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "long", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      const get = (t) => parts.find((p) => p.type === t).value;
      return { day: get("weekday"), minutes: Number(get("hour")) % 24 * 60 + Number(get("minute")) };
    } catch (e) {
      const d = new Date();
      return { day: DAYS[(d.getDay() + 6) % 7], minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }
  const toMinutes = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

  // ---------- Mobile menu ----------
  const toggle = $(".menu-toggle");
  const nav = $("#site-nav");
  if (toggle && nav) {
    const close = (returnFocus) => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      if (!open) { const first = $("a", nav); if (first) first.focus(); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) close(true);
    });
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) close(false); });
    window.matchMedia("(min-width: 900px)").addEventListener("change", () => close(false));
  }

  // ---------- Next class (hero) ----------
  const nextEl = $("[data-next-class]");
  const dataEl = $("#schedule-data");
  if (nextEl && dataEl) {
    try {
      const classes = JSON.parse(dataEl.textContent);
      const now = gymNow(nextEl.dataset.tz);
      const todayIdx = DAYS.indexOf(now.day);
      let found = null;
      for (let offset = 0; offset < 7 && !found; offset++) {
        const day = DAYS[(todayIdx + offset) % 7];
        const options = classes
          .filter((c) => c.d === day && (offset > 0 || toMinutes(c.t) > now.minutes))
          .sort((a, b) => a.t.localeCompare(b.t));
        if (options.length) found = { ...options[0], offset };
      }
      if (found) {
        const when = found.offset === 0 ? "today" : found.offset === 1 ? "tomorrow" : "on " + found.d;
        const [h, m] = found.t.split(":").map(Number);
        const time = new Intl.DateTimeFormat(nextEl.dataset.locale, { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(Date.UTC(2000, 0, 1, h, m)));
        nextEl.innerHTML = "";
        const strong = document.createElement("strong");
        strong.textContent = "Next class: ";
        nextEl.append(strong, `${found.n} ${when} at ${time} with ${found.c}.`);
        nextEl.hidden = false;
      }
    } catch (e) { /* leave hidden */ }
  }

  // ---------- Schedule filters ----------
  $$("[data-schedule]").forEach((root) => {
    const controls = $(".schedule-controls", root);
    const panels = $$("[data-day-panel]", root);
    const dayBtns = $$(".day-btn", root);
    const partBtns = $$(".part-picker .chip", root);
    const status = $("[data-schedule-status]", root);
    if (!controls || !panels.length) return;
    controls.hidden = false;
    let currentDay = gymNow(document.querySelector("[data-tz]")?.dataset.tz || "UTC").day;
    if (!DAYS.includes(currentDay)) currentDay = "Monday";
    let currentPart = "all";

    function render(announce) {
      dayBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.day === currentDay)));
      partBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.part === currentPart)));
      let visible = 0;
      panels.forEach((p) => {
        const active = p.dataset.dayPanel === currentDay;
        p.hidden = !active;
        if (!active) return;
        const rows = $$(".class-row", p);
        rows.forEach((r) => {
          r.hidden = currentPart !== "all" && r.dataset.part !== currentPart;
          if (!r.hidden) visible++;
        });
        const filterEmpty = $(".filter-empty", p);
        if (filterEmpty) filterEmpty.hidden = !(rows.length && visible === 0);
      });
      if (announce && status) status.textContent = `${visible} ${visible === 1 ? "class" : "classes"} on ${currentDay}.`;
    }
    dayBtns.forEach((b) => b.addEventListener("click", () => { currentDay = b.dataset.day; render(true); }));
    partBtns.forEach((b) => b.addEventListener("click", () => { currentPart = b.dataset.part; render(true); }));
    render(false);
  });

  // ---------- Pricing: monthly / yearly ----------
  const billingBtns = $$("[data-billing]");
  if (billingBtns.length) {
    billingBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        const mode = btn.dataset.billing;
        billingBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        $$(".price[data-monthly]").forEach((el) => { el.textContent = el.dataset[mode]; });
        $$("[data-billing-note]").forEach((el) => { el.textContent = mode === "annual" ? el.dataset.annualText : el.dataset.monthlyText; });
      })
    );
  }

  // ---------- Mobile sticky CTA ----------
  const mobileCta = $(".mobile-cta");
  const top = $(".hero, .page-header");
  if (mobileCta && "IntersectionObserver" in window) {
    // Show the bar after the visitor scrolls past the top of the page,
    // and hide it again where the page already shows the same action.
    let pastTop = !top;
    const endsInView = new Set();
    const update = () => mobileCta.classList.toggle("is-visible", pastTop && endsInView.size === 0);
    if (top) new IntersectionObserver(([e]) => { pastTop = !e.isIntersecting; update(); }).observe(top);
    const endObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? endsInView.add(e.target) : endsInView.delete(e.target)));
      update();
    });
    $$(".cta-band, .site-footer, #trial").forEach((el) => endObserver.observe(el));
  }

  // ---------- Click-to-load map (no Google request until the visitor asks) ----------
  $$("[data-load-map]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const wrap = btn.closest("[data-map-src]");
      const iframe = document.createElement("iframe");
      iframe.src = wrap.dataset.mapSrc;
      iframe.title = "Map showing the gym location";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      wrap.replaceChildren(iframe);
    })
  );

  // ---------- Free-session form ----------
  $$("[data-trial-form]").forEach((form) => {
    const status = $(".form-status", form);
    const rules = [
      { el: $("#f-name", form), ok: (el) => el.value.trim().length > 1 },
      { el: $("#f-email", form), ok: (el) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) },
      { el: $("#f-consent", form), ok: (el) => el.checked },
    ].filter((r) => r.el);

    function check(rule) {
      const valid = rule.ok(rule.el);
      const msg = document.getElementById(rule.el.id + "-error");
      rule.el.setAttribute("aria-invalid", String(!valid));
      if (msg) {
        msg.hidden = valid;
        if (!valid) rule.el.setAttribute("aria-describedby", msg.id); else rule.el.removeAttribute("aria-describedby");
      }
      return valid;
    }
    // Re-check a field while the person corrects it (not on blur: hiding the
    // message on blur moves the layout under the pointer and makes clicks miss).
    rules.forEach((r) =>
      r.el.addEventListener(r.el.type === "checkbox" ? "change" : "input", () => {
        if (r.el.getAttribute("aria-invalid") === "true") check(r);
      })
    );

    function showStatus(text, isError) {
      status.textContent = text;
      status.classList.toggle("is-error", !!isError);
      status.hidden = false;
      status.focus();
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const results = rules.map(check);
      const firstBad = rules[results.indexOf(false)];
      if (firstBad) { firstBad.el.focus(); return; }
      if ($("#f-company", form)?.value) return; // spam bot filled the hidden field

      const endpoint = form.getAttribute("method") === "POST" ? form.getAttribute("action") : "";
      if (!endpoint) {
        showStatus("Demo only: your details look good, but this form is not connected yet, so nothing was sent.");
        return;
      }
      const button = $("button[type=submit]", form);
      button.disabled = true;
      try {
        const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("Bad response");
        form.reset();
        $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
        showStatus("Thanks, we've got your request. A coach will contact you within one working day.");
      } catch (err) {
        showStatus("Your request wasn't sent because of a connection problem. Try again, or call or email us instead.", true);
      } finally {
        button.disabled = false;
      }
    });
  });
})();

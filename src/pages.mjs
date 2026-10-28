// Page definitions: which sections appear on which page, plus SEO text.
// To add a page, add an entry here; the build creates the HTML file.
import * as S from "./components/sections.mjs";
import { esc, ogImage } from "./lib/helpers.mjs";

const city = (c) => c.contact.address.locality;

export function pages(config) {
  const heroPreload = (photo) =>
    photo?.unsplash
      ? `<link rel="preload" as="image" href="https://images.unsplash.com/${photo.unsplash}?auto=format&fit=crop&w=1200&h=800&q=70" imagesrcset="${[480, 800, 1200, 1600, 2000]
          .map((w) => `https://images.unsplash.com/${photo.unsplash}?auto=format&fit=crop&w=${w}&h=${Math.round(w / 1.5)}&q=70 ${w}w`)
          .join(", ")}" imagesizes="100vw" fetchpriority="high">`
      : "";

  return [
    {
      path: "/index.html",
      title: "",
      description: config.brand.seoDescription,
      ogImage: ogImage(config.photos.hero),
      preload: heroPreload(config.photos.hero),
      body: [
        S.hero(config),
        S.programs(config, { heading: "What we train", intro: "Six ways to train, all coached. Every class lists its length and intensity so you know what you're walking into." }),
        S.schedule(config, { heading: "This week's classes", id: "schedule" }),
        S.facilities(config),
        S.pricing(config, { heading: "Membership", showNotes: true }),
        S.trainers(config),
        S.testimonials(config),
        S.location(config),
        S.ctaBand(config),
      ].join("\n"),
    },
    {
      path: "/classes.html",
      title: `Classes and schedule in ${city(config)}`,
      description: `Strength, conditioning, boxing and mobility classes in ${city(config)}. See the weekly timetable and book a free first session.`,
      ogImage: ogImage(config.photos.group),
      body: [
        S.pageHeader({ title: "Classes", text: "Coached group training at four intensities. Start where you are.", photo: config.photos.group }),
        S.programs(config, { heading: "Class types" }),
        S.schedule(config, { heading: "Weekly schedule", id: "schedule" }),
        S.firstVisit(config),
        S.ctaBand(config),
      ].join("\n"),
    },
    {
      path: "/membership.html",
      title: `Gym membership prices in ${city(config)}`,
      description: `Compare ${config.brand.name} membership plans and prices, then try a free session before you join.`,
      body: [
        S.pageHeader({ title: "Membership", text: "Simple plans. Try a free session first." }),
        S.pricing(config, { heading: "Choose a plan" }),
        S.firstVisit(config),
        S.faq(config),
        S.ctaBand(config),
      ].join("\n"),
    },
    {
      path: "/coaches.html",
      title: `Personal trainers and coaches in ${city(config)}`,
      description: `Meet the ${config.brand.name} coaching team: strength, boxing and personal training specialists.`,
      body: [
        S.pageHeader({ title: "Coaches", text: "Every class and plan is led by a qualified coach." }),
        S.trainers(config, { heading: "The team" }),
        S.ctaBand(config),
      ].join("\n"),
    },
    {
      path: "/contact.html",
      title: `Contact and free session in ${city(config)}`,
      description: `Book a free session at ${config.brand.name} in ${city(config)}. Address, opening hours, phone and directions.`,
      body: [S.pageHeader({ title: "Contact", text: "Book a free session, ask a question or come and see the gym." }), S.trialForm(config), S.location(config, { heading: "Visit the gym" })].join("\n"),
    },
    {
      path: "/privacy.html",
      title: "Privacy policy",
      description: `How ${config.brand.name} handles personal data.`,
      body: privacyBody(config),
    },
    {
      path: "/404.html",
      title: "Page not found",
      noindex: true,
      body: `<section class="section"><div class="container narrow">
<h1 class="display section-title">Page not found</h1>
<p class="lead">This page doesn't exist or has moved.</p>
<div class="cta-row"><a class="btn btn-primary" href="/">Go to the homepage</a><a class="btn btn-ghost" href="/classes.html">See the class schedule</a></div>
</div></section>`,
    },
  ];
}

// Template privacy policy. Must be reviewed by the client before going live.
function privacyBody(config) {
  return `<section class="section"><div class="container narrow prose">
<h1 class="display section-title">Privacy policy</h1>
<p class="form-notice">[CLIENT TO CONFIRM: this is a starting template, not legal advice. The gym owner or their adviser must review and complete it before launch.]</p>
<h2>Who we are</h2>
<p>${esc(config.brand.name)}, ${esc(config.contact.address.street)}, ${esc(config.contact.address.locality)}. Contact: <a href="mailto:${esc(config.contact.email)}">${esc(config.contact.email)}</a>.</p>
<h2>What we collect</h2>
<p>When you use our free-session form we collect your name, email, optional phone number, the class you are interested in, your preferred time and any message you add.</p>
<h2>Why we use it</h2>
<p>Only to arrange your free session and answer your questions, based on your consent. You can withdraw consent at any time by emailing us.</p>
<h2>Who processes it</h2>
<p>[CLIENT TO CONFIRM: name the form provider, booking system, email provider and hosting company.]</p>
<h2>How long we keep it</h2>
<p>[CLIENT TO CONFIRM: retention period, for example 12 months after your last contact.]</p>
<h2>Cookies</h2>
<p>${config.integrations.analyticsId ? "[CLIENT TO CONFIRM: describe analytics cookies and the consent banner.]" : "This website does not set cookies. Fonts are loaded from Google Fonts and photos from Unsplash, which receive your IP address when pages load."}</p>
<h2>Your rights</h2>
<p>You can ask to access, correct or delete your data, and you can complain to your data protection authority.</p>
</div></section>`;
}

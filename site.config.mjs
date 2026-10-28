// =============================================================================
//  SITE CONFIGURATION — the ONLY file you need to edit for a new gym client.
// =============================================================================
//  Everything the website shows (name, colours, prices, trainers, schedule,
//  hours, contact, photos) comes from this file. After editing, run:
//
//      npm run build      (creates the website in the /dist folder)
//      npm run serve      (preview at http://localhost:4321)
//      npm test           (checks the site for errors)
//
//  ⚠️  APEX ATHLETICS IS A FICTIONAL DEMO BUSINESS.
//  All names, prices, people, reviews, addresses and phone numbers below are
//  invented for demonstration. Replace them with the client's real details
//  before publishing, then set demoMode to false.
// =============================================================================

export default {
  // When true: shows "demo" labels, marks testimonials/trainers as fictional,
  // and tells search engines NOT to index the site. Set false for a real client.
  demoMode: true,

  // Language and money formatting (e.g. "pt-PT" + "EUR", "en-GB" + "GBP").
  locale: "en-GB",
  currency: "EUR",

  // The final web address of the site (no trailing slash). Used for SEO links.
  siteUrl: "https://apex-athletics.example.com",

  // ---------------------------------------------------------------------------
  //  BRAND
  // ---------------------------------------------------------------------------
  brand: {
    name: "APEX ATHLETICS",
    shortName: "Apex",
    // Path inside src/assets/. Replace the SVG file to change the logo.
    logo: "logo.svg",
    tagline: "Strength and conditioning for people who show up.",
    // Used in the page <title> and search results.
    seoDescription:
      "Strength, conditioning and boxing classes with expert coaches. Book a free first session at APEX ATHLETICS (demo website).",
  },

  // Homepage headline. Say WHAT you offer and WHERE (good for Google too).
  hero: {
    title: "Get strong in Demo City.",
    text: "Coached strength, conditioning and boxing classes for every level, from your first squat to your next personal best.",
  },

  // Time zone of the gym, used for the live "next class" line.
  timezone: "Europe/Lisbon",

  // ---------------------------------------------------------------------------
  //  THEME — choose a design direction and override colours/fonts if needed.
  //  direction: "premium" | "energy" | "commercial"
  // ---------------------------------------------------------------------------
  theme: {
    direction: "energy",
    // Leave empty {} to use the direction's default colours.
    colors: {
      bg: "#EEF0EC", // chalk
      ink: "#1A1F26", // iron
      accent: "#2B44FF", // cobalt
    },
    // Google Fonts family names. Leave empty to use the direction's defaults.
    fonts: {},
  },

  // ---------------------------------------------------------------------------
  //  CALLS TO ACTION — the two main buttons repeated across the site.
  //  Keep the wording identical everywhere for clarity.
  // ---------------------------------------------------------------------------
  cta: {
    primary: { label: "Book a free session", href: "/contact.html#trial" },
    secondary: { label: "See memberships", href: "/membership.html" },
  },

  // ---------------------------------------------------------------------------
  //  INTEGRATIONS — leave a value empty ("") until the client provides it.
  //  The site shows an honest fallback when something is not configured.
  // ---------------------------------------------------------------------------
  integrations: {
    // Where forms are sent (e.g. a Formspree URL "https://formspree.io/f/xxxx").
    // Empty = demo mode: the form validates but does NOT send anything.
    formEndpoint: "",
    // Online class booking page (Mindbody, Glofox, PushPress, TeamUp…).
    // Empty = "Book" buttons go to the free-session form instead.
    bookingUrl: "",
    // Online membership sign-up/payment page. Empty = "Join" goes to the form.
    joinUrl: "",
    // Google Analytics 4 ID like "G-XXXXXXX". Empty = no analytics, no cookies.
    // If you add analytics in the EU/UK you also need a cookie consent banner.
    analyticsId: "",
    // Link that opens the location in Google Maps.
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Example+Street+Demo+City",
    // Optional Google Maps embed URL. Loaded only when the visitor clicks (privacy).
    mapEmbedUrl: "",
    // Link to leave/read Google reviews (empty = hidden).
    reviewsUrl: "",
  },

  // ---------------------------------------------------------------------------
  //  CONTACT AND LOCATION
  // ---------------------------------------------------------------------------
  contact: {
    // 555-01xx numbers and example.com addresses are reserved for fiction.
    phone: "+1 555 0100",
    whatsapp: "",
    email: "hello@example.com",
    address: {
      street: "1 Example Street",
      locality: "Demo City",
      region: "",
      postalCode: "0000-000",
      country: "PT",
    },
    // Coordinates for search engines (optional). Leave null if unknown.
    geo: null,
    areaServed: "Demo City",
    parking: "Free parking for members behind the building (demo text).",
    transport: "Five minutes' walk from the central station (demo text).",
  },

  // Opening hours. Use 24-hour "HH:MM". closed: true for closed days.
  hours: [
    { day: "Monday", opens: "06:00", closes: "22:00" },
    { day: "Tuesday", opens: "06:00", closes: "22:00" },
    { day: "Wednesday", opens: "06:00", closes: "22:00" },
    { day: "Thursday", opens: "06:00", closes: "22:00" },
    { day: "Friday", opens: "06:00", closes: "21:00" },
    { day: "Saturday", opens: "08:00", closes: "18:00" },
    { day: "Sunday", opens: "09:00", closes: "14:00" },
  ],

  social: [
    { name: "Instagram", url: "https://www.instagram.com/" },
    { name: "Facebook", url: "https://www.facebook.com/" },
  ],

  // ---------------------------------------------------------------------------
  //  PHOTOS
  //  Each photo is either:
  //    { unsplash: "photo-1234-abcd", alt, credit }  → free Unsplash image, or
  //    { src: "/images/my-photo.jpg", alt, credit } → your own file placed in
  //                                                   src/public/images/
  //  Best practice: replace with the client's own professional photos.
  // ---------------------------------------------------------------------------
  photos: {
    hero: {
      unsplash: "photo-1517836357463-d25dfeac3438",
      alt: "Athlete gripping a loaded barbell before a lift",
      credit: "Victor Freitas / Unsplash",
    },
    floor: {
      unsplash: "photo-1778828494354-9b717d36dc99",
      alt: "Training floor with racks and machines",
      credit: "Salman Sidheek / Unsplash",
    },
    group: {
      unsplash: "photo-1517130038641-a774d04afb3c",
      alt: "Group class training together in the gym",
      credit: "Geert Pieters / Unsplash",
    },
    trial: {
      unsplash: "photo-1521804906057-1df8fdb718b7",
      alt: "Barbell being lifted from a rubber gym floor",
      credit: "Victor Freitas / Unsplash",
    },
  },

  // ---------------------------------------------------------------------------
  //  PROGRAMMES / SERVICES
  //  level: 1 = easy … 4 = maximum intensity (shown with text + colour).
  // ---------------------------------------------------------------------------
  programs: [
    {
      id: "strength",
      name: "Strength",
      summary: "Coached barbell sessions built around squats, presses and pulls. Weights scaled to you.",
      duration: 60,
      level: 3,
      photo: { unsplash: "photo-1574680096145-d05b474e2155", alt: "Athlete lifting a barbell overhead", credit: "Sven Mieke / Unsplash" },
    },
    {
      id: "conditioning",
      name: "Conditioning",
      summary: "Intervals on ropes, rowers and sleds to build an engine that lasts.",
      duration: 45,
      level: 4,
      photo: { unsplash: "photo-1758875569612-94d5e0f1a35f", alt: "Two people training with battle ropes", credit: "Vitaly Gariev / Unsplash" },
    },
    {
      id: "boxing",
      name: "Boxing",
      summary: "Bag work, footwork and pad drills. No sparring unless you ask for it.",
      duration: 50,
      level: 3,
      photo: { unsplash: "photo-1773289338378-2d083b1e5b84", alt: "Two people training on heavy bags", credit: "Anastase Maragos / Unsplash" },
    },
    {
      id: "foundations",
      name: "Foundations",
      summary: "For your first month: learn the main lifts and movements in a small group.",
      duration: 45,
      level: 1,
      photo: { unsplash: "photo-1518310383802-640c2de311b2", alt: "Small group exercising with dumbbells", credit: "bruce mars / Unsplash" },
    },
    {
      id: "mobility",
      name: "Mobility",
      summary: "Slow, guided stretching and joint work to recover between hard days.",
      duration: 40,
      level: 1,
      photo: { unsplash: "photo-1586401426077-df67f1316076", alt: "Person holding a stretching pose on a mat", credit: "Juls P / Unsplash" },
    },
    {
      id: "personal",
      name: "Personal training",
      summary: "One-to-one coaching with a plan written for your goal, schedule and history.",
      duration: 60,
      level: 2,
      photo: { unsplash: "photo-1583454110551-21f2fa2afe61", alt: "Person training with a dumbbell", credit: "Anastase Maragos / Unsplash" },
    },
  ],

  // Names for intensity levels 1–4 (shown on classes and the schedule).
  levels: {
    1: "All levels",
    2: "Moderate",
    3: "Hard",
    4: "Maximum",
  },

  // ---------------------------------------------------------------------------
  //  MEMBERSHIP PLANS (fictional demo prices)
  //  price = monthly price. annualPrice = monthly price when paying yearly
  //  (set null if the client has no annual option — the toggle then hides).
  // ---------------------------------------------------------------------------
  plans: [
    {
      name: "Open gym",
      price: 39,
      annualPrice: 33,
      description: "Train on your own schedule.",
      features: ["Gym floor access during opening hours", "Locker rooms and showers", "Free induction session"],
      highlight: false,
    },
    {
      name: "Unlimited classes",
      price: 69,
      annualPrice: 59,
      description: "Every class on the timetable.",
      features: ["Everything in Open gym", "Unlimited Strength, Conditioning, Boxing and Mobility", "Monthly progress check with a coach", "Bring a friend once a month"],
      highlight: true,
      highlightLabel: "Most popular (demo)",
    },
    {
      name: "Coached",
      price: 189,
      annualPrice: null,
      description: "Personal training plus classes.",
      features: ["Everything in Unlimited classes", "Four 1:1 sessions per month", "Written training plan", "Nutrition check-ins"],
      highlight: false,
    },
  ],
  // Shown under the pricing table. Must match the real contract terms.
  pricingNotes: [
    "Demo prices for illustration only.",
    "Monthly plans: no minimum term, cancel with 30 days' notice (demo terms).",
  ],
  trialOffer: {
    title: "Your first session is free",
    text: "Meet a coach, tour the floor and train in a real class. No card needed.",
  },

  // ---------------------------------------------------------------------------
  //  TRAINERS (fictional people — photos are stock images of models)
  // ---------------------------------------------------------------------------
  trainers: [
    {
      name: "Marta Silva",
      role: "Head coach",
      specialties: ["Strength", "Olympic lifting"],
      bio: "Builds programmes that get beginners lifting with confidence and keep experienced lifters progressing.",
      photo: { unsplash: "photo-1541534741688-6078c6bfb5c5", alt: "Coach Marta Silva lifting weights", credit: "John Arano / Unsplash" },
      instagram: "",
    },
    {
      name: "Daniel Okafor",
      role: "Boxing coach",
      specialties: ["Boxing", "Conditioning"],
      bio: "Teaches clean technique first, then pace. Runs the evening boxing classes.",
      photo: { unsplash: "photo-1772450014551-3dae12d905ef", alt: "Coach Daniel Okafor training with dumbbells", credit: "Rodrigo Rodrigues / Unsplash" },
      instagram: "",
    },
    {
      name: "Inês Costa",
      role: "Personal trainer",
      specialties: ["Personal training", "Mobility"],
      bio: "Works one-to-one with people returning to training after a long break.",
      photo: { unsplash: "photo-1722925541142-5db2668ca492", alt: "Coach Inês Costa lifting a barbell", credit: "Tyler Raye / Unsplash" },
      instagram: "",
    },
  ],

  // ---------------------------------------------------------------------------
  //  WEEKLY CLASS SCHEDULE
  //  program must match a programs[].id above. time = 24-hour "HH:MM".
  // ---------------------------------------------------------------------------
  schedule: [
    { day: "Monday", time: "07:00", program: "strength", coach: "Marta Silva" },
    { day: "Monday", time: "12:30", program: "mobility", coach: "Inês Costa" },
    { day: "Monday", time: "18:30", program: "conditioning", coach: "Daniel Okafor" },
    { day: "Monday", time: "19:30", program: "boxing", coach: "Daniel Okafor" },
    { day: "Tuesday", time: "07:00", program: "conditioning", coach: "Daniel Okafor" },
    { day: "Tuesday", time: "18:00", program: "foundations", coach: "Marta Silva" },
    { day: "Tuesday", time: "19:00", program: "strength", coach: "Marta Silva" },
    { day: "Wednesday", time: "07:00", program: "strength", coach: "Marta Silva" },
    { day: "Wednesday", time: "12:30", program: "conditioning", coach: "Daniel Okafor" },
    { day: "Wednesday", time: "19:30", program: "boxing", coach: "Daniel Okafor" },
    { day: "Thursday", time: "07:00", program: "mobility", coach: "Inês Costa" },
    { day: "Thursday", time: "18:00", program: "foundations", coach: "Marta Silva" },
    { day: "Thursday", time: "19:00", program: "conditioning", coach: "Daniel Okafor" },
    { day: "Friday", time: "07:00", program: "strength", coach: "Marta Silva" },
    { day: "Friday", time: "18:00", program: "boxing", coach: "Daniel Okafor" },
    { day: "Saturday", time: "09:00", program: "conditioning", coach: "Daniel Okafor" },
    { day: "Saturday", time: "10:30", program: "strength", coach: "Marta Silva" },
    { day: "Sunday", time: "10:00", program: "mobility", coach: "Inês Costa" },
  ],

  // ---------------------------------------------------------------------------
  //  TESTIMONIALS — fictional in demo mode (automatically labelled).
  //  For a real client: only use real quotes with written permission.
  // ---------------------------------------------------------------------------
  testimonials: [
    { quote: "I'd never touched a barbell. Six weeks of Foundations later I'm squatting my bodyweight.", name: "Sofia R.", context: "Member for 8 months" },
    { quote: "The 6am crowd is the reason I get out of bed. Coaches remember everyone's name.", name: "Tiago M.", context: "Member for 2 years" },
    { quote: "Boxing here is hard work but never intimidating. Great for stress after the office.", name: "Leah K.", context: "Member for 1 year" },
  ],

  // ---------------------------------------------------------------------------
  //  FAQ
  // ---------------------------------------------------------------------------
  faq: [
    { q: "I'm a complete beginner. Where do I start?", a: "Book a free session. A coach will show you around and recommend starting with Foundations classes in your first month." },
    { q: "Is there a contract?", a: "In this demo, monthly plans have no minimum term and need 30 days' notice to cancel. A real gym must state its actual terms here." },
    { q: "What should I bring?", a: "Comfortable clothes, trainers, a water bottle and a towel. Lockers and showers are available." },
    { q: "Can I bring a friend?", a: "Unlimited classes members can bring a friend once a month (demo terms)." },
    { q: "Is there parking?", a: "Yes, there is free parking behind the building (demo text)." },
  ],

  // Short facts about the space (shown on the homepage). Demo values.
  facilities: [
    { title: "Lifting platforms", text: "Eight platforms with competition bars and calibrated plates." },
    { title: "Conditioning zone", text: "Rowers, air bikes, sleds and a 20-metre turf lane." },
    { title: "Boxing area", text: "Heavy bags, a speed bag station and space for pad work." },
    { title: "Recovery", text: "Mobility room, foam rollers and changing rooms with showers." },
  ],
};

// Design direction presets. Each preset defines design tokens (colours, fonts,
// shapes, motion) that become CSS custom properties (variables).
// site.config.mjs chooses one with theme.direction and can override colours/fonts.

export const themes = {
  // Premium Fitness — calm, editorial, refined.
  premium: {
    colors: {
      bg: "#F2F1EE",
      surface: "#FFFFFF",
      ink: "#22252A",
      muted: "#585D66",
      line: "#D6D4CF",
      accent: "#3F5B4E",
      onAccent: "#FFFFFF",
      dark: "#22252A",
      onDark: "#F2F1EE",
    },
    fonts: { display: "Instrument Sans", body: "Instrument Sans", displayWeight: 500, displayStretch: "100%" },
    radius: { small: "2px", control: "2px", media: "0px" },
    headingCase: "none",
    displayTracking: "-0.02em",
    displayLeading: 1.05,
  },

  // High-Energy Fitness — bold, intense, class-driven.
  energy: {
    colors: {
      bg: "#EEF0EC",
      surface: "#FFFFFF",
      ink: "#1A1F26",
      muted: "#4F5864",
      line: "#C9CEC9",
      accent: "#2B44FF",
      onAccent: "#FFFFFF",
      dark: "#1A1F26",
      onDark: "#EEF0EC",
    },
    fonts: { display: "Archivo", body: "Archivo", displayWeight: 800, displayStretch: "125%" },
    radius: { small: "2px", control: "4px", media: "0px" },
    headingCase: "none",
    displayTracking: "-0.035em",
    displayLeading: 0.92,
  },

  // Commercial Gym — friendly, clear, practical.
  commercial: {
    colors: {
      bg: "#FFFFFF",
      surface: "#F3F6FA",
      ink: "#14213D",
      muted: "#4A5568",
      line: "#D9E0EA",
      accent: "#0A6CFF",
      onAccent: "#FFFFFF",
      dark: "#14213D",
      onDark: "#FFFFFF",
    },
    fonts: { display: "Figtree", body: "Figtree", displayWeight: 800, displayStretch: "100%" },
    radius: { small: "6px", control: "999px", media: "16px" },
    headingCase: "none",
    displayTracking: "-0.02em",
    displayLeading: 1.05,
  },
};

// Intensity level colours, borrowed from competition weight plates
// (green 10 kg, yellow 15 kg, blue 20 kg, red 25 kg). Always shown with a text label.
export const levelColors = { 1: "#1E9E5A", 2: "#E8B500", 3: "#2B44FF", 4: "#D7263D" };

export function resolveTheme(themeConfig = {}) {
  const base = themes[themeConfig.direction] || themes.energy;
  const colors = { ...base.colors, ...(themeConfig.colors || {}) };
  const fonts = { ...base.fonts, ...(themeConfig.fonts || {}) };
  return { ...base, colors, fonts, direction: themes[themeConfig.direction] ? themeConfig.direction : "energy" };
}

// Turns the theme into CSS variables placed in the page <head>.
export function themeToCss(t) {
  const c = t.colors;
  const fam = (name) => `"${name}", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
  return `:root{
  --c-bg:${c.bg};--c-surface:${c.surface};--c-ink:${c.ink};--c-muted:${c.muted};--c-line:${c.line};
  --c-accent:${c.accent};--c-on-accent:${c.onAccent};--c-dark:${c.dark};--c-on-dark:${c.onDark};
  --lvl-1:${levelColors[1]};--lvl-2:${levelColors[2]};--lvl-3:${levelColors[3]};--lvl-4:${levelColors[4]};
  --f-display:${fam(t.fonts.display)};--f-body:${fam(t.fonts.body)};
  --display-weight:${t.fonts.displayWeight};--display-stretch:${t.fonts.displayStretch};
  --display-tracking:${t.displayTracking};--display-leading:${t.displayLeading};
  --heading-case:${t.headingCase};
  --r-small:${t.radius.small};--r-control:${t.radius.control};--r-media:${t.radius.media};
}`;
}

// Google Fonts stylesheet URL for the chosen fonts (variable width for Archivo).
export function googleFontsUrl(t) {
  const families = [...new Set([t.fonts.display, t.fonts.body])];
  const spec = families.map((f) => {
    const name = f.replace(/ /g, "+");
    if (f === "Archivo") return `family=${name}:wdth,wght@62..125,400..900`;
    return `family=${name}:wght@400;500;600;700;800`;
  });
  return `https://fonts.googleapis.com/css2?${spec.join("&")}&display=swap`;
}

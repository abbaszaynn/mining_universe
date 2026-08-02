import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Scroll-pinned sections need vertical room as well as width — below
        // this the pinned content overflows its own viewport box and clips.
        pin: { raw: "(min-height: 600px)" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Single-family system: `font-display` still resolves (30+ legacy call
        // sites on not-yet-redesigned pages) but now draws from the same face.
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Semantic layer — aliases onto the primitive scales below via CSS vars.
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          active: "var(--accent-active)",
        },
        // Primitive layer — "quartz & graphite": warm stone neutrals + copper.
        bone: {
          50: "#faf8f3",
          100: "#f1eee6",
          200: "#e4ded2",
          300: "#d6cebd",
        },
        sand: {
          100: "#efe3d4",
          200: "#e6d4bf",
        },
        graphite: {
          300: "#9c9488",
          400: "#7a7266",
          500: "#5c554b",
          700: "#35302a",
          900: "#1c1916",
          950: "#121010",
        },
        copper: {
          300: "#e0a87c",
          400: "#c9743e",
          500: "#b05b29",
          600: "#8e461c",
          700: "#6b3414",
        },
      },
      fontSize: {
        // Display scale — tight leading (~0.9) is the signature of this design.
        "display-xl": ["clamp(2.75rem,7.2vw,7.5rem)", { lineHeight: "0.9", fontWeight: "500" }],
        "display-lg": ["clamp(2.25rem,4.6vw,4.5rem)", { lineHeight: "0.95", fontWeight: "500" }],
        "display-md": ["clamp(2rem,3.4vw,3.25rem)", { lineHeight: "1.05", fontWeight: "500" }],
        marquee: ["clamp(3.5rem,10vw,7.5rem)", { lineHeight: "0.9", fontWeight: "500" }],
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        drawer: "var(--ease-drawer)",
      },
      transitionDuration: {
        fast: "160ms",
        base: "300ms",
        slow: "600ms",
      },
    },
  },
  plugins: [],
};
export default config;

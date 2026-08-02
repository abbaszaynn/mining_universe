/**
 * JS-side mirror of the primitive color scale in tailwind.config.ts / globals.css.
 * Needed because Three.js material/light colors can't consume CSS custom properties —
 * everything else should reference Tailwind classes or CSS vars instead of this file.
 */
export const TOKENS = {
  gold: {
    50: "#fff8e1",
    200: "#f5e6a8",
    300: "#e0c066",
    400: "#d4af37",
    600: "#b8963a",
    700: "#8a7330",
  },
  ink: {
    700: "#0f172a",
    800: "#0a1120",
    900: "#030712",
    950: "#020617",
  },
  sky: {
    300: "#c5d6ea",
    400: "#9bb7d7",
    500: "#284c7d",
  },
  cream: {
    100: "#fff6dd",
    200: "#f4f8ff",
  },
  bone: {
    50: "#faf7f1",
    100: "#f2ece0",
    200: "#e7ddc9",
  },
  graphite: {
    300: "#9a9184",
    500: "#6b6255",
    700: "#3a352e",
    900: "#1e1b17",
    950: "#14120f",
  },
  copper: {
    300: "#e3b08a",
    400: "#c97f4a",
    500: "#b5652f",
    600: "#96501f",
    700: "#6e3a14",
  },
} as const;

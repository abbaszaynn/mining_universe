/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://yourdomain.com). */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:9003";
}

export const SITE = {
  name: "GOS",
  legalName: "Game of Stones",
  title: "Game of Stones | Licensed Mining in Gilgit Baltistan",
  description:
    "Game of Stones connects global investors with licensed mining operators across Gilgit Baltistan — copper, gold, lithium, nephrite, antimony, and polymetallic assets under full regulatory compliance.",
  tagline: "Mines in the North",
  locale: "en_US",
  region: "Gilgit Baltistan, Pakistan",
  email: "abbaszayn08@gmail.com",
  phone: "+92 310 9108714",
  keywords: [
    "Game of Stones",
    "GOS mining",
    "Gilgit Baltistan mining",
    "Pakistan mining investment",
    "copper mines Pakistan",
    "gold mining Gilgit",
    "mining investors",
    "licensed mining operators",
    "Skardu mining",
    "polymetallic minerals",
    "mining due diligence",
    "investor desk mining",
  ],
  defaultOgImage: "/images/cover_photo.png",
  twitterHandle: undefined as string | undefined,
} as const;

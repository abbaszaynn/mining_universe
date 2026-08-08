/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://gbmines.com). */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:9003";
  }
  return "https://gbmines.com";
}

/**
 * Naming rule:
 * - "Durr & Zircon Consortium" is the SECP-registered entity. It carries every
 *   formal reference, all metadata, schema and keywords — it is the name that
 *   should accumulate search authority.
 * - "Game of Stones" is a brand flourish only. Keep it to the loader, the
 *   footer, the gallery and other atmospheric moments. It is deliberately NOT
 *   a keyword: nobody searches it, and it dilutes the entity signal.
 */
export const SITE = {
  /** Full legal entity — used in schema and formal copy. */
  name: "Durr & Zircon Consortium",
  /** Short suffix for page titles, so they stay under ~60 characters. */
  shortName: "Durr & Zircon",
  legalName: "Durr & Zircon Consortium",
  /** Brand flourish. Loader, footer, gallery only. */
  brandName: "Game of Stones",
  title: "Durr & Zircon Consortium | Mining & Minerals, Gilgit Baltistan",
  description:
    "SECP-registered mining consortium holding eight licensed concessions across seven districts of Gilgit Baltistan. Mineral supply and export, joint ventures, equity and outright mine sale, plus contract exploration for mine owners.",
  tagline: "Mines in the North",
  locale: "en_US",
  region: "Gilgit Baltistan, Pakistan",
  email: "abbaszayn08@gmail.com",
  phone: "+92 310 9108714",
  /** Legal predecessors — kept for entity disambiguation in schema. */
  formerNames: ["Durr Mines and Minerals (PVT) LTD", "Zircon Mines (PVT) LTD"],
  keywords: [
    // Entity
    "Durr & Zircon Consortium",
    "Durr Mines and Minerals",
    "Zircon Mines",
    // Buyer intent — traders search "concentrate", not "ore"
    "copper concentrate supplier Pakistan",
    "antimony concentrate supplier Pakistan",
    "nephrite jade supplier Pakistan",
    "placer gold Pakistan",
    "lead concentrate exporter Pakistan",
    "quartz silica supplier Pakistan",
    // Investor intent
    "mining joint venture Pakistan",
    "mining investment Gilgit Baltistan",
    "exploration licence Pakistan",
    "farm-in mining opportunity Pakistan",
    "critical minerals investment Pakistan",
    // Services for other mine owners — domestic market, low competition
    "mine exploration services Pakistan",
    "geological survey Gilgit Baltistan",
    "mineral sampling and assay Pakistan",
    "mining survey company Pakistan",
    // Outright sale — distinct intent from JV, and far less contested
    "mine for sale Pakistan",
    "mining company for sale Gilgit Baltistan",
    "mineral concession for sale Pakistan",
    "buy a mine in Pakistan",
    // Domestic investor intent
    "mining investment opportunity Pakistan",
    "invest in mines Pakistan",
    "mining business partnership Pakistan",
    // Geographic long-tail
    "Skardu mining",
    "Shigar copper",
    "Gultari antimony",
    "Kharmang polymetallic",
  ],
  defaultOgImage: "/images/cover_photo.png",
  twitterHandle: undefined as string | undefined,
} as const;

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
    "SECP-registered mining consortium holding ten licensed concessions across seven districts of Gilgit Baltistan. Mineral supply and export, joint ventures, equity and outright mine sale, plus contract exploration for mine owners.",
  tagline: "Mines in the North",
  locale: "en_US",
  region: "Gilgit Baltistan, Pakistan",
  email: "info@gbmines.com",
  phone: "+92 316 9244827",
  /**
   * Canonical NAP (name / address / phone). Every off-site listing —
   * directories, marketplaces, trade bodies, Google Business Profile —
   * should reproduce this exactly, character for character. Inconsistent
   * address formatting across citations is the most common reason a real
   * business fails to resolve as a single entity in search.
   */
  address: {
    street: "Office 5, Qasimi Market, in front of CMH Gilgit",
    city: "Gilgit",
    region: "Gilgit Baltistan",
    country: "PK",
    /** Display form for page copy. Keep in step with the fields above. */
    full: "Office 5, Qasimi Market, in front of CMH Gilgit, Gilgit Baltistan, Pakistan",
  },
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
    /**
     * "Mining company" phrasing (client keyword research, Sept 2026).
     * Note on expectations: Google has ignored the meta keywords tag since
     * 2009, so these earn nothing on their own. They are kept here as the
     * single source of truth for which phrases the *page copy, titles and
     * headings* are meant to target. The ranking work for these is on-page,
     * and the SERPs for them are currently owned by directories rather than
     * operators — see docs/SEO-PLAN.md §1 for that finding.
     */
    "private mining companies in Gilgit Baltistan",
    "mining companies in Gilgit Baltistan",
    "gold mining companies in Pakistan",
    "copper mining companies in Gilgit Baltistan",
    "investor mining opportunities in Gilgit",
    "mining lease and exploration title holders",
    // Per-commodity "companies / mines" variants, one per mineral actually
    // held under licence, in both the national and regional form.
    "copper mining company Pakistan",
    "antimony mining company Pakistan",
    "gold mining company Gilgit Baltistan",
    "lead and zinc mining company Pakistan",
    "molybdenum mining Pakistan",
    "nephrite jade mining company Pakistan",
    "ruby mining company Pakistan",
    "quartz and silica mining company Pakistan",
    "granite and marble mining company Gilgit Baltistan",
    "lithium exploration company Pakistan",
    "serpentine mining Pakistan",
    "silver mining Gilgit Baltistan",
    // Pakistan-level phrasing, Sept 2026. The site already ranks on page one
    // for Gilgit Baltistan list queries; these widen it to the national
    // searches foreign investors start with. Each maps to a Q&A article.
    "best mining investment opportunity in Pakistan",
    "mining investment opportunities for foreign investors in Pakistan",
    "can foreigners own a mine in Pakistan",
    "list of mining companies in Gilgit Baltistan",
    "mines of Gilgit Baltistan",
    "minerals of Gilgit Baltistan",
    "copper mines in Pakistan",
    "gold mining in Pakistan",
    "placer gold mining Pakistan",
    "placer gold Gilgit Baltistan",
    "silver in Gilgit Baltistan",
    "iron ore Gilgit Baltistan",
    "nephrite jade Pakistan",
    "antimony deposits Pakistan",
    "rare earth metals Pakistan",
    "rare earth elements Gilgit Baltistan",
    "critical minerals Gilgit Baltistan",
    // Buyer-country phrasing, Sept 2026. Each maps to a /markets page.
    // Australia and South Korea added this round: grounded in each
    // country's own sourced 2026 policy/demand signal (Australia's
    // critical minerals capital programme, Korea's antimony import
    // diversification target and gemstone market), not guessed.
    "critical minerals investment Pakistan Australia",
    "ASX critical minerals overseas investment",
    "antimony supplier South Korea",
    "nephrite jade Korea market",
    "Pakistan mining investment for Korean companies",
  ],
  defaultOgImage: "/images/cover_photo.jpg",
  twitterHandle: undefined as string | undefined,
} as const;

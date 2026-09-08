import { concessions } from "@/lib/concessions";

/**
 * Buyer-intent pages, Cluster A in docs/SEO-PLAN.md. Traders search
 * "concentrate", not "ore", and write in Incoterms and payment-instrument
 * language rather than marketing copy, hence the vocabulary here.
 *
 * `sourcedFrom` only lists concession slugs whose `minerals` array in
 * companies-data.ts actually names this commodity. It is checked against that
 * registry rather than maintained by hand alone: the post-exploration data
 * update in Sept 2026 silently invalidated six of these lists at once (adding
 * copper at Bagicha and Gultari, antimony at Ishkoman, lead at Shigar,
 * nephrite at both Kharmang blocks, and removing gold from Hilal Abad), and
 * nothing in the type system catches that. Re-check after any mineral change.
 *
 * Nephrite jade was the long-standing exception, marketed from the Ghizer
 * valleys without a confirming concession entry. That is now resolved: it is
 * the primary target at Hilal Abad and recorded at Mahdi Abad, so the claim
 * is pinned to real registry entries.
 *
 * Titles carry both the trade phrasing buyers use ("supplier", "exporter",
 * "concentrate") and the "mining company" phrasing that the list-intent
 * queries use, because those are two different searchers arriving at the
 * same page.
 */
export type Commodity = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  demand: string;
  sourcedFrom: string[]; // concession slugs
  image: string;
};

export const COMMODITIES: Commodity[] = [
  {
    slug: "copper-concentrate",
    name: "Copper",
    metaTitle: "Copper Mining Company & Concentrate Supplier, Pakistan",
    metaDescription:
      "Copper concentrate and ore from licensed concessions in Gilgit Baltistan. Quoted FOB Karachi or CIF, payment against L/C at sight or SBLC, third-party assay and SGS inspection available.",
    intro:
      "We supply copper ore and concentrate from our own licensed concessions in Gilgit Baltistan, quoted FOB Karachi or CIF to your discharge port. Payment is normally against an irrevocable letter of credit at sight, with SBLC available for established repeat contracts, and trial shipments are accepted before any monthly offtake commitment.",
    demand:
      "Copper is a highly conductive metal essential to electrical wiring, renewable energy infrastructure, construction and electronics. Demand is growing quickly on its role in EV batteries and solar energy systems, and Pakistan's copper exploration corridor in Gilgit Baltistan remains comparatively under-supplied against that demand.",
    sourcedFrom: [
      "kharmang-polymetallic-structure",
      "jutial-nala-gilgit-polymetallic-ores",
      "hilal-abad-polymetallic-complex",
      "shigar-copper-deposit",
      "gupis-ghizer-construction-and-precious-stones",
      "bagicha-skardu-gemstones-and-minerals",
      "gultari-polymetallic-ores",
    ],
    image: "/images/commodities/copper.webp",
  },
  {
    slug: "antimony-concentrate",
    name: "Antimony",
    metaTitle: "Antimony Mining Company & Concentrate Supplier, Pakistan",
    metaDescription:
      "Antimony concentrate from licensed exploration and mining concessions in Gilgit Baltistan. FOB Karachi or CIF, assay reports and SGS inspection on request, trial shipments accepted.",
    intro:
      "We supply antimony from concessions held under licence in Gultari and the Gojal tehsil of Hunza, quoted FOB Karachi or CIF. Payment against irrevocable L/C at sight, or SBLC for repeat contracts, and assay reports are shared with verified buyers ahead of any commitment.",
    demand:
      "Antimony demand has firmed globally on its role in flame retardants, battery chemistries and semiconductor manufacture, and it sits on most Western critical-minerals watch lists. Gilgit Baltistan's antimony occurrences, including grades reported elsewhere in the Kharmang-Gultari corridor, are still early-stage relative to that demand curve.",
    sourcedFrom: [
      "gultari-polymetallic-ores",
      "gojal-hunza-antimony-deposit",
      "ishkoman-ghizar-granite-deposit",
    ],
    image: "/images/commodities/antimony-updated.webp",
  },
  {
    slug: "placer-gold",
    name: "Placer Gold",
    metaTitle: "Gold Mining Company & Placer Gold Supplier, Pakistan",
    metaDescription:
      "Placer gold and dore from a licensed 26 km riverbed concession in Skardu, Gilgit Baltistan. FOB Karachi or CIF, assay and inspection available, trial shipments accepted.",
    intro:
      "Our placer gold comes from a licensed 26 km riverbed concession in Skardu, carried in black sand deposits at a scale that supports mechanized recovery rather than artisanal panning. Quoted FOB Karachi or CIF, with assay reports and SGS inspection arranged for verified buyers.",
    demand:
      "Gold remains a universally traded store of value, with demand spanning central banks, technology manufacturers and jewellery markets worldwide. Placer recovery is the fast end of gold mining: the metal is already liberated from its host rock, so it needs washing and concentration rather than drilling, blasting and milling. That is why this block is producing while our hard-rock gold is still at exploration stage.",
    /**
     * Scoped to the producing alluvial block only. Hilal Abad was dropped
     * because its post-exploration profile carries no gold, and the hard-rock
     * blocks (Askoli/Shigar, Gultari) moved to the `gold` page so the two
     * pages describe two genuinely different products instead of competing
     * for the same query.
     */
    sourcedFrom: ["skardu-placer-gold"],
    image: "/images/commodities/placer-gold-transparent.webp",
  },
  {
    slug: "lead-concentrate",
    name: "Lead",
    metaTitle: "Lead Mining Company & Concentrate Exporter, Pakistan",
    metaDescription:
      "Lead concentrate from licensed concessions in Gultari and Jutial Nala, Gilgit Baltistan, alongside associated silver and copper. FOB Karachi or CIF, assay reports on request.",
    intro:
      "We export lead concentrate from concessions in Gultari and Jutial Nala, where it occurs alongside silver and mineralized copper veins. Quoted FOB Karachi or CIF, payment against L/C at sight or SBLC for repeat contracts, with assay documentation shared under NDA.",
    demand:
      "Lead remains central to battery manufacture, radiation shielding and industrial alloys, and demand has stayed resilient even as some end uses have declined, largely on the back of lead-acid battery recycling and demand from grid storage. Both source concessions are polymetallic, so lead typically ships alongside associated silver and copper indications rather than as a single-mineral lot.",
    sourcedFrom: [
      "gultari-polymetallic-ores",
      "jutial-nala-gilgit-polymetallic-ores",
      "shigar-copper-deposit",
    ],
    image: "/images/commodities/lead.webp",
  },
  {
    slug: "nephrite-jade",
    name: "Nephrite Jade",
    metaTitle: "Nephrite Jade Mining Company & Supplier, Pakistan",
    metaDescription:
      "Premium nephrite jade from our own licensed Hilal Abad and Mahdi Abad blocks in Kharmang, Gilgit Baltistan, plus the Ghizer valleys. Samples approved by 20-year nephrite specialists and from China. Raw boulder or dressed stone, FOB Karachi or CIF.",
    intro:
      "Premium-grade nephrite jade is the primary target at our Hilal Abad block in Kharmang district, which is in operation and reachable by road, with serpentine and initial nephrite samples also recovered at our neighbouring Mahdi Abad block. We additionally lift nephrite from the Ghizer valleys. Everything is available as raw boulder or dressed stone direct from the licence holder rather than through an intermediary trader, quoted FOB Karachi or CIF, with sample material available ahead of any bulk commitment.",
    demand:
      "Nephrite is prized across East Asian markets for carving and ornamental work, and it is among the most culturally valued stones we bring out of the ground. Samples from Hilal Abad have been examined and approved by specialists with more than twenty years working specifically in nephrite, and sample approval has also come back from China, which is the principal market for the stone. Buyers in this category typically want to inspect physical material before committing, which we accommodate directly.",
    sourcedFrom: [
      "hilal-abad-polymetallic-complex",
      "kharmang-polymetallic-structure",
    ],
    image: "/images/commodities/nephrite.webp",
  },
  {
    slug: "quartz-silica",
    name: "Quartz & Silica",
    metaTitle: "Quartz & Silica Mining Company & Supplier, Pakistan",
    metaDescription:
      "High-purity quartz and silica from a licensed concession in Bagicha, Skardu. FOB Karachi or CIF, assay reports available for verified buyers.",
    intro:
      "We supply quartz from our licensed concession in Bagicha, Skardu, alongside that site's ruby, marble and lithium-bearing indications. Quoted FOB Karachi or CIF, with assay data shared with verified buyers ahead of a trial shipment.",
    demand:
      "High-purity quartz and silica sand feed glass manufacture, foundry work, and increasingly semiconductor and solar-panel production, where purity requirements have pushed buyers to diversify sourcing beyond a small number of traditional suppliers. Assay-verified purity is the first thing any serious buyer in this category will ask for, which is why that documentation is available on request rather than published here.",
    sourcedFrom: ["bagicha-skardu-gemstones-and-minerals"],
    image: "/images/commodities/quartz-silica-new.webp",
  },
  {
    slug: "granite-dimension-stone",
    name: "Granite",
    metaTitle: "Granite & Marble Mining Company, Gilgit Baltistan",
    metaDescription:
      "Granite and dimension stone from licensed concessions in Gupis and Ishkoman, Ghizer district, Gilgit Baltistan. Blocks and slabs quoted FOB Karachi or CIF.",
    intro:
      "We export granite blocks and dimension stone from licensed concessions in Gupis and Ishkoman, both in Ghizer district, part of a marble and granite belt that runs through much of the district. Quoted FOB Karachi or CIF, with block samples available for inspection before a bulk order.",
    demand:
      "Dimension stone of this kind is cut for construction, architectural cladding and monumental work across both domestic and export markets. Gupis also carries premium marble alongside its granite, which we quote separately depending on the finish a buyer needs.",
    sourcedFrom: [
      "gupis-ghizer-construction-and-precious-stones",
      "ishkoman-ghizar-granite-deposit",
      // Bagicha's snow white marble is dimension stone, which is what this
      // page actually sells, so it belongs here alongside the granite blocks.
      "bagicha-skardu-gemstones-and-minerals",
    ],
    image: "/images/commodities/granite.webp",
  },
  {
    /**
     * Hard-rock gold, kept deliberately distinct from `placer-gold`.
     *
     * Two gold pages only make sense if they are genuinely two products, so
     * the split is by deposit type: this page is lode gold in ore at Askoli
     * (Shigar) and Gultari, both early stage; `placer-gold` is the producing
     * alluvial operation on the 26 km Skardu riverbed. Different recovery,
     * different timeline, different buyer. If the copy on either page ever
     * drifts back into describing the other, they become near-duplicates and
     * should be merged, which is what got flagged in Search Console before.
     *
     * The original version of this entry credited gold to Hilal Abad and
     * Kharmang. The Sept 2026 exploration update removed gold from both
     * (Hilal Abad is nephrite, serpentine and copper; Kharmang is serpentine,
     * nephrite, copper, iron and silver), so those claims are gone.
     */
    slug: "gold",
    name: "Gold",
    metaTitle: "Hard-Rock Gold Mining Company & Ore Supplier, Pakistan",
    metaDescription:
      "Hard-rock gold in ore from licensed concessions at Askoli (Shigar) and Gultari, Gilgit Baltistan, both at exploration stage. Quoted FOB Karachi or CIF, assay reports for verified buyers. Producing alluvial gold is on our placer gold page.",
    intro:
      "This is our hard-rock gold: lode gold carried in ore at our Askoli block in Shigar, alongside copper, lead and lithium, and at Gultari alongside copper. Both blocks are at exploration stage rather than production, so the near-term work is confirmatory. Material is quoted FOB Karachi or CIF, with assay documentation shared with verified buyers ahead of any commitment.",
    demand:
      "Hard-rock gold is a longer-horizon proposition than alluvial recovery, and it should be evaluated on different terms. The metal is still locked in its host rock, so reaching it means drilling, confirmation and a milling decision before any tonnage moves, and it usually reports as part of a polymetallic concentrate rather than as a single-mineral lot. What that buys, in exchange for the wait, is scale: a confirmed lode system is not limited by how much riverbed you hold. Buyers who want gold we are recovering right now should start with our placer operation in Skardu instead.",
    sourcedFrom: ["shigar-copper-deposit", "gultari-polymetallic-ores"],
    image: "/images/commodities/gold.webp",
  },
];

export function getCommodity(slug: string) {
  return COMMODITIES.find((c) => c.slug === slug);
}

export function getCommoditySourceConcessions(commodity: Commodity) {
  return concessions.filter((c) => commodity.sourcedFrom.includes(c.slug));
}

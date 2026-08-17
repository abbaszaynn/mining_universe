import { concessions } from "@/lib/concessions";

/**
 * Buyer-intent pages, Cluster A in docs/SEO-PLAN.md. Traders search
 * "concentrate", not "ore", and write in Incoterms and payment-instrument
 * language rather than marketing copy, hence the vocabulary here.
 *
 * `sourcedFrom` only lists concession slugs whose `minerals` array in
 * companies-data.ts actually names this commodity. Nephrite jade is the one
 * exception: it isn't in any deposit's listed minerals, but it was already
 * being marketed on the homepage (Ghizer valleys) before this page existed,
 * so that claim is kept as-is rather than invented fresh here, just not
 * pinned to a specific concession that doesn't confirm it.
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
    metaTitle: "Copper Concentrate Supplier, Pakistan",
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
    ],
    image: "/images/commodities/copper.webp",
  },
  {
    slug: "antimony-concentrate",
    name: "Antimony",
    metaTitle: "Antimony Concentrate Supplier, Pakistan",
    metaDescription:
      "Antimony concentrate from licensed exploration and mining concessions in Gilgit Baltistan. FOB Karachi or CIF, assay reports and SGS inspection on request, trial shipments accepted.",
    intro:
      "We supply antimony from concessions held under licence in Gultari and the Gojal tehsil of Hunza, quoted FOB Karachi or CIF. Payment against irrevocable L/C at sight, or SBLC for repeat contracts, and assay reports are shared with verified buyers ahead of any commitment.",
    demand:
      "Antimony demand has firmed globally on its role in flame retardants, battery chemistries and semiconductor manufacture, and it sits on most Western critical-minerals watch lists. Gilgit Baltistan's antimony occurrences, including grades reported elsewhere in the Kharmang-Gultari corridor, are still early-stage relative to that demand curve.",
    sourcedFrom: ["gultari-polymetallic-ores", "gojal-hunza-antimony-deposit"],
    image: "/images/commodities/gold.webp",
  },
  {
    slug: "placer-gold",
    name: "Placer Gold",
    metaTitle: "Placer Gold Supplier, Pakistan",
    metaDescription:
      "Placer gold and dore from a licensed 26 km riverbed concession in Skardu, Gilgit Baltistan. FOB Karachi or CIF, assay and inspection available, trial shipments accepted.",
    intro:
      "Our placer gold comes from a licensed 26 km riverbed concession in Skardu, carried in black sand deposits at a scale that supports mechanized recovery rather than artisanal panning. Quoted FOB Karachi or CIF, with assay reports and SGS inspection arranged for verified buyers.",
    demand:
      "Gold remains a universally traded store of value, with demand spanning central banks, technology manufacturers and jewellery markets worldwide. Our Kharmang and Shigar structures also carry gold as a strong secondary indication alongside copper, which we treat as a distinct, longer-horizon opportunity from the Skardu placer operation.",
    sourcedFrom: ["skardu-placer-gold", "hilal-abad-polymetallic-complex", "shigar-copper-deposit"],
    image: "/images/commodities/gold.webp",
  },
  {
    slug: "lead-concentrate",
    name: "Lead",
    metaTitle: "Lead Concentrate Exporter, Pakistan",
    metaDescription:
      "Lead concentrate from licensed concessions in Gultari and Jutial Nala, Gilgit Baltistan, alongside associated silver and copper. FOB Karachi or CIF, assay reports on request.",
    intro:
      "We export lead concentrate from concessions in Gultari and Jutial Nala, where it occurs alongside silver and mineralized copper veins. Quoted FOB Karachi or CIF, payment against L/C at sight or SBLC for repeat contracts, with assay documentation shared under NDA.",
    demand:
      "Lead remains central to battery manufacture, radiation shielding and industrial alloys, and demand has stayed resilient even as some end uses have declined, largely on the back of lead-acid battery recycling and demand from grid storage. Both source concessions are polymetallic, so lead typically ships alongside associated silver and copper indications rather than as a single-mineral lot.",
    sourcedFrom: ["gultari-polymetallic-ores", "jutial-nala-gilgit-polymetallic-ores"],
    image: "/images/commodities/lead.webp",
  },
  {
    slug: "nephrite-jade",
    name: "Nephrite Jade",
    metaTitle: "Nephrite Jade Supplier, Pakistan",
    metaDescription:
      "Nephrite jade lifted from the Ghizer valleys of Gilgit Baltistan. Raw boulder and dressed stone available direct from source, quoted FOB Karachi or CIF.",
    intro:
      "Our nephrite jade is lifted from the Ghizer valleys of Gilgit Baltistan, available as raw boulder or dressed stone direct from source rather than through an intermediary trader. Quoted FOB Karachi or CIF, with sample material available ahead of any bulk commitment.",
    demand:
      "Nephrite is prized across East Asian markets for carving and ornamental work, and it's among the most culturally valued stones we bring out of the ground. Buyers in this category typically want to inspect physical samples before committing, which we accommodate directly.",
    sourcedFrom: [],
    image: "/images/commodities/nephrite.webp",
  },
  {
    slug: "quartz-silica",
    name: "Quartz & Silica",
    metaTitle: "Quartz & Silica Supplier, Pakistan",
    metaDescription:
      "High-purity quartz and silica from a licensed concession in Bagicha, Skardu. FOB Karachi or CIF, assay reports available for verified buyers.",
    intro:
      "We supply quartz from our licensed concession in Bagicha, Skardu, alongside that site's ruby, marble and lithium-bearing indications. Quoted FOB Karachi or CIF, with assay data shared with verified buyers ahead of a trial shipment.",
    demand:
      "High-purity quartz and silica sand feed glass manufacture, foundry work, and increasingly semiconductor and solar-panel production, where purity requirements have pushed buyers to diversify sourcing beyond a small number of traditional suppliers. Assay-verified purity is the first thing any serious buyer in this category will ask for, which is why that documentation is available on request rather than published here.",
    sourcedFrom: ["bagicha-skardu-gemstones-and-minerals"],
    image: "/images/commodities/granite.webp",
  },
  {
    slug: "granite-dimension-stone",
    name: "Granite",
    metaTitle: "Granite Exporter, Pakistan",
    metaDescription:
      "Granite and dimension stone from licensed concessions in Gupis and Ishkoman, Ghizer district, Gilgit Baltistan. Blocks and slabs quoted FOB Karachi or CIF.",
    intro:
      "We export granite blocks and dimension stone from licensed concessions in Gupis and Ishkoman, both in Ghizer district, part of a marble and granite belt that runs through much of the district. Quoted FOB Karachi or CIF, with block samples available for inspection before a bulk order.",
    demand:
      "Dimension stone of this kind is cut for construction, architectural cladding and monumental work across both domestic and export markets. Gupis also carries premium marble alongside its granite, which we quote separately depending on the finish a buyer needs.",
    sourcedFrom: ["gupis-ghizer-construction-and-precious-stones", "ishkoman-ghizar-granite-deposit"],
    image: "/images/commodities/granite.webp",
  },
];

export function getCommodity(slug: string) {
  return COMMODITIES.find((c) => c.slug === slug);
}

export function getCommoditySourceConcessions(commodity: Commodity) {
  return concessions.filter((c) => commodity.sourcedFrom.includes(c.slug));
}

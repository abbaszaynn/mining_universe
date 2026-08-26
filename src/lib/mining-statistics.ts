/**
 * Data for /guides/gilgit-baltistan-mining-statistics-2026.
 *
 * This page is built as a link magnet, so two rules apply and both are
 * deliberate:
 *
 * 1. Every figure carries a named source and a year, and every source was
 *    actually fetched rather than taken from a search snippet. Anything that
 *    could not be verified against the source document was dropped, not
 *    softened. One fabricated statistic caught by a reporter would cost more
 *    than this whole page earns.
 * 2. Sources are rendered as PLAIN TEXT, never as outbound links. A stats
 *    page exists to attract citations, so it keeps its authority rather than
 *    distributing it. Internal links to our own pages are fine.
 *
 * Where reputable sources disagree (Pakistan's mining share of GDP), both
 * figures are carried with their own attribution rather than picking the
 * flattering one.
 */

export type Stat = {
  /** The figure itself, formatted for display. */
  value: string;
  /** What the figure means, stated without embellishment. */
  claim: string;
  /** Named source plus year. Rendered as plain text, never linked. */
  source: string;
};

export type StatSection = {
  id: string;
  title: string;
  intro: string;
  /** Optional pulled-out figure for the section. */
  headline?: { value: string; label: string };
  stats: Stat[];
};

const SEC_MINERALS =
  "Shahzeb Sheikh, Secretary of Minerals, Pakistan–China Mineral Investment Forum, February 2026";
const DAWN_2026 = "Dawn, February 2026";
const TDAP = "Trade Development Authority of Pakistan, via Associated Press of Pakistan";

export const STAT_SECTIONS: StatSection[] = [
  {
    id: "licensed-area",
    title: "Licensed area and exploration status",
    intro:
      "These are the figures that define the opportunity in Gilgit Baltistan, and they were stated by the region's own Secretary of Minerals in February 2026. The headline is not how much mineral ground exists. It is how little of it anyone holds a title over.",
    headline: {
      value: "6.3%",
      label:
        "of Gilgit Baltistan's total mining area sits under any granted mineral title, exploration licence or mining lease combined",
    },
    stats: [
      {
        value: "43,494 km²",
        claim: "Total mining area in Gilgit Baltistan.",
        source: SEC_MINERALS,
      },
      {
        value: "1,840.58 km²",
        claim: "Area granted under exploration licences.",
        source: SEC_MINERALS,
      },
      {
        value: "898.37 km²",
        claim: "Area held under active mining leases.",
        source: SEC_MINERALS,
      },
      {
        value: "2,738.95 km²",
        claim:
          "Combined area under any granted mineral title, exploration licences and mining leases together.",
        source: SEC_MINERALS,
      },
      {
        value: "4,469.182 km²",
        claim: "Additional area reserved as study areas for future exploration.",
        source: SEC_MINERALS,
      },
      {
        value: "7,208.132 km²",
        claim: "Combined explored and reserved area.",
        source: SEC_MINERALS,
      },
      {
        value: "36,287.868 km²",
        claim:
          "Remaining barren and mountainous terrain outside any granted or reserved area.",
        source: SEC_MINERALS,
      },
      {
        value: "108",
        claim: "Mineral targets identified through government surveys.",
        source: SEC_MINERALS,
      },
    ],
  },
  {
    id: "mineral-profile",
    title: "What Gilgit Baltistan actually holds",
    intro:
      "The region's mineral profile is unusually broad rather than concentrated in one commodity, which is why a single licensed block here often carries three or four saleable minerals at once.",
    stats: [
      {
        value: "6 metallic minerals",
        claim:
          "Gold, copper, lead, antimony, molybdenum and iron identified across the region's valleys.",
        source: SEC_MINERALS,
      },
      {
        value: "5 non-metallic minerals",
        claim:
          "Mica, feldspar, dolomite, limestone and calcite identified across the region.",
        source: SEC_MINERALS,
      },
      {
        value: "3 named gemstones",
        claim:
          "Ruby, emerald and aquamarine identified among the region's gemstone deposits.",
        source: SEC_MINERALS,
      },
      {
        value: "5th",
        claim: "Pakistan's global ranking by size of gemstone reserves.",
        source: TDAP,
      },
      {
        value: "800,000 carats",
        claim:
          "Pakistan's assessed annual ruby export potential, alongside 87,000 carats of emerald and 5 million carats of peridot.",
        source: TDAP,
      },
      {
        value: "Over 80%",
        claim:
          "Share of Pakistan's gemstone revenue derived from unprocessed and raw stones rather than cut or finished goods.",
        source: TDAP,
      },
      {
        value: "10 concessions",
        claim:
          "Licensed blocks held by Durr & Zircon Consortium across seven districts of Gilgit Baltistan, under three registered operating companies.",
        source: "Durr & Zircon Consortium concession registry, 2026",
      },
    ],
  },
  {
    id: "national-context",
    title: "Pakistan's minerals in global context",
    intro:
      "Gilgit Baltistan sits inside a national sector that is, by any comparative measure, under-extracted relative to its geology. These figures are the honest version of that picture, including the parts that are not flattering.",
    headline: {
      value: "$8.3bn",
      label:
        "Pakistan's share of $5.5 trillion in measured world mineral output, ranking it 51st of 166 countries",
    },
    stats: [
      {
        value: "2.1%",
        claim:
          "Mining and quarrying share of Pakistan's GDP at current prices in FY25, equal to $8.6 billion of a $407 billion economy.",
        source: DAWN_2026,
      },
      {
        value: "Around 3.2%",
        claim:
          "An alternative, higher estimate of the mineral sector's share of national GDP. Reputable sources disagree on this figure and both are reported here.",
        source: "The Diplomat, January 2026",
      },
      {
        value: "2–3%",
        claim:
          "The range mining and quarrying has stayed within as a share of GDP for the last 25 years.",
        source: DAWN_2026,
      },
      {
        value: "4 consecutive years",
        claim: "Period over which the sector has declined continuously.",
        source: DAWN_2026,
      },
      {
        value: "51 of 166",
        claim: "Pakistan's rank by measured mineral output in 2023.",
        source: DAWN_2026,
      },
      {
        value: "$6.8bn (82%)",
        claim:
          "Mineral fuels as a share of Pakistan's extracted mineral value, ranking 40th of 166 countries.",
        source: DAWN_2026,
      },
      {
        value: "$605m",
        claim:
          "Value of Pakistan's industrial minerals output in 2023, ranking 28th globally.",
        source: DAWN_2026,
      },
      {
        value: "$271m",
        claim:
          "Value of Pakistan's non-ferrous metals output in 2023, ranking 58th globally.",
        source: DAWN_2026,
      },
      {
        value: "$2bn to $6–8bn",
        claim:
          "Projected growth in Pakistan's annual mining sector revenues by 2030, from current levels.",
        source: "The Nation, September 2025",
      },
    ],
  },
  {
    id: "investment-2026",
    title: "Investment and international agreements, 2025 to 2026",
    intro:
      "Three separate international commitments landed inside roughly twelve months. None of them are in Gilgit Baltistan, which matters: they establish that Pakistani mining risk is now being underwritten at scale, not that this particular region has been funded.",
    stats: [
      {
        value: "$500m",
        claim:
          "Value of the critical minerals agreement between Pakistan and US Strategic Metals, covering exploration through refining.",
        source: "Profit by Pakistan Today, October 2025",
      },
      {
        value: "2 October 2025",
        claim:
          "Date Pakistan dispatched its first consignment of enriched rare earth elements and critical minerals to the United States under that agreement.",
        source: "Profit by Pakistan Today, October 2025",
      },
      {
        value: "3 minerals",
        claim:
          "Antimony, copper concentrate and rare earth elements including neodymium and praseodymium made up that first shipment.",
        source: "Profit by Pakistan Today, October 2025",
      },
      {
        value: "September 2025",
        claim:
          "Frontier Works Organisation and US Strategic Metals signed a memorandum of understanding to establish a poly-metallic refinery in Pakistan.",
        source: "Profit by Pakistan Today, October 2025",
      },
      {
        value: "15%",
        claim:
          "Stake in Pakistan's Reko Diq copper-gold project pursued by Saudi Arabia, backed by a reported $540 million commitment.",
        source: "AGBI, January 2025",
      },
      {
        value: "Over $100m",
        claim:
          "Additional investment in Pakistani mining infrastructure signalled by the Saudi Fund for Development.",
        source: "AGBI, January 2025",
      },
      {
        value: "February 2026",
        claim:
          "Pakistan–China Mineral Investment Forum, at which Gilgit Baltistan's licensed area figures above were presented.",
        source: SEC_MINERALS,
      },
    ],
  },
  {
    id: "reko-diq",
    title: "Reko Diq as the national benchmark",
    intro:
      "Reko Diq in Balochistan is the project every conversation about Pakistani mining is measured against. It is not in Gilgit Baltistan and it is far larger than anything here, which is exactly why the numbers are useful as a reference point.",
    headline: {
      value: "37 years",
      label:
        "projected mine life under the updated feasibility study, across two phases",
    },
    stats: [
      {
        value: "13.1m tonnes",
        claim:
          "Copper expected to be produced over the life of the mine, alongside 17.9 million ounces of gold.",
        source: "Barrick Mining, feasibility study reporting, 2025",
      },
      {
        value: "15m tonnes",
        claim:
          "Proven and probable copper reserves, alongside 26 million ounces of gold.",
        source: "Barrick Mining, feasibility study reporting, 2025",
      },
      {
        value: "37 years",
        claim: "Projected mine life across two phases under the updated feasibility study.",
        source: "Barrick Mining, feasibility study reporting, 2025",
      },
      {
        value: "45m tonnes per year",
        claim:
          "Phase 1 mill feed processing capacity, planned from 2028, at an estimated capital outlay of $5.6 billion.",
        source: "The Express Tribune, 2025",
      },
      {
        value: "240,000 tonnes",
        claim:
          "Annual copper output expected from Phase 1, alongside 297,000 ounces of gold.",
        source: "The Express Tribune, 2025",
      },
      {
        value: "90m tonnes per year",
        claim: "Planned Phase 2 processing capacity by 2034, doubling Phase 1.",
        source: "The Express Tribune, 2025",
      },
      {
        value: "Over $60bn",
        claim:
          "Total yield at market prices at time of reporting, comprising roughly $54 billion of gold and $6 billion of copper.",
        source: "Dawn, 2024",
      },
    ],
  },
  {
    id: "licensing",
    title: "Licensing and regulatory framework",
    intro:
      "Mineral titles in Gilgit Baltistan run through four stages under the Gilgit-Baltistan Mining Concession Rules, 2016, amended in 2019 and 2024. Fees and procedures change periodically, so confirm current requirements with the department before filing.",
    stats: [
      {
        value: "4 stages",
        claim:
          "Reconnaissance licence, exploration licence, mineral deposit retention licence and mining lease.",
        source: "Gilgit-Baltistan Mining Concession Rules, 2016",
      },
      {
        value: "Rs 15,000",
        claim:
          "Application fee for a reconnaissance licence. An exploration licence application is Rs 25,000.",
        source: "Gilgit-Baltistan Mining Concession Rules, 2016",
      },
      {
        value: "30 days",
        claim:
          "Period within which the Mines Committee is required to review an application and forward its recommendation to the Licensing Authority.",
        source: "Gilgit-Baltistan Mining Concession Rules, 2016",
      },
      {
        value: "January 2025",
        claim:
          "Point from which all new mineral title applications are processed through the department's online portal, requiring a registered company or firm account.",
        source: "Mines and Minerals Department Gilgit Baltistan, 2025",
      },
      {
        value: "486 records",
        claim:
          "Title-holder entries listed on the Gilgit Baltistan Mines and Minerals Department public registry, counted directly from the portal.",
        source: "Mines and Minerals Department Gilgit Baltistan public registry, counted August 2026",
      },
      {
        value: "Locally incorporated only",
        claim:
          "Mineral titles can be granted only to a locally incorporated entity, so foreign investors participate through a joint venture, a farm-in agreement, or a Pakistani subsidiary.",
        source: "Gilgit-Baltistan Mining Concession Rules, 2016",
      },
    ],
  },
];

export const STATS_FAQ = [
  {
    question: "How much of Gilgit Baltistan's mining area is actually licensed?",
    answer:
      "Of a total mining area of 43,494 km², 1,840.58 km² is held under exploration licences and 898.37 km² under mining leases, a combined 2,738.95 km² or roughly 6.3 percent. A further 4,469.182 km² is reserved as study areas. These figures were presented by Gilgit Baltistan's Secretary of Minerals at the Pakistan–China Mineral Investment Forum in February 2026.",
  },
  {
    question: "What minerals are found in Gilgit Baltistan?",
    answer:
      "Government surveys identify gold, copper, lead, antimony, molybdenum and iron among metallic minerals; mica, feldspar, dolomite, limestone and calcite among non-metallic minerals; and ruby, emerald and aquamarine among gemstones. 108 mineral targets have been identified through survey work.",
  },
  {
    question: "How much does mining contribute to Pakistan's economy?",
    answer:
      "Mining and quarrying accounted for 2.1 percent of GDP at current prices in FY25, equal to $8.6 billion of a $407 billion economy, according to Dawn. Some sources put the mineral sector's share closer to 3.2 percent. The sector has stayed between 2 and 3 percent of GDP for the last 25 years and has declined for four consecutive years.",
  },
  {
    question: "Can a foreign company hold a mining licence in Gilgit Baltistan?",
    answer:
      "No. Mineral titles can only be granted to a locally incorporated entity. Foreign investors participate through a joint venture with an existing licence holder, a farm-in or earn-in agreement, or by incorporating a Pakistani subsidiary to hold the title.",
  },
  {
    question: "How large is Reko Diq compared to concessions in Gilgit Baltistan?",
    answer:
      "Substantially larger. Reko Diq is projected to produce 13.1 million tonnes of copper and 17.9 million ounces of gold over a 37-year mine life, with Phase 1 alone carrying an estimated $5.6 billion capital outlay. It is in Balochistan, not Gilgit Baltistan, and is best treated as a national benchmark rather than a comparable asset.",
  },
];

/** Total verified figures on the page, computed rather than hardcoded so it
 *  cannot drift out of step with the sections above. */
export const TOTAL_STAT_COUNT = STAT_SECTIONS.reduce(
  (sum, section) => sum + section.stats.length,
  0
);

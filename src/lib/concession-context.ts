import type { FaqItem } from "@/lib/faq-data";

/**
 * Hand-written editorial content per concession, keyed by the slug generated
 * in `concessions.ts`. Kept out of that file deliberately — `concessions.ts`
 * is derived data (rebuilds automatically from `companies-data.ts`), this is
 * prose that a person wrote and should survive that regeneration untouched.
 *
 * Sourcing discipline: regional geology (fault systems, mineral belts,
 * published survey findings) is stated as regional context with a named
 * source, never presented as a claim about this specific licensed area.
 * Deposit-specific facts are limited to what's already in `companies-data.ts`
 * (minerals, area, licence status). No reserve estimates, grades, or
 * production figures are invented — that data is exactly what's gated
 * behind the verified-investor NDA process, and stays gated here too.
 */
export type ConcessionContext = {
  narrative: string[];
  faqs: FaqItem[];
};

const licenceFaq = (name: string): FaqItem => ({
  question: `What stage is ${name} at, and what does that mean for an investor?`,
  answer:
    "Licence status is shown on this page as either Operational or Exploratory Phase. Operational means the site is held under an active mining lease; Exploratory Phase means the concession is held under an exploration or reconnaissance licence, ahead of a mining lease application. Both are transferable business relationships — through joint venture, farm-in, equity, or in some cases outright sale — not just information.",
});

const dataRoomFaq = (name: string): FaqItem => ({
  question: `Why isn't the full geological report for ${name} published on this page?`,
  answer:
    "The mineral indications listed here are public; the boundary coordinates, assay data, and full geological report are not, by design — publishing them would hand a competitor the same targeting information for free. That data room opens once an enquiry is confirmed through the investor desk, typically after an NDA. It's a filter for seriousness, not a sales tactic.",
});

export const CONCESSION_CONTEXT: Record<string, ConcessionContext> = {
  "bagicha-skardu-gemstones-and-minerals": {
    narrative: [
      "Bagicha sits inside Skardu district, in the same broad marble-and-gemstone belt that has made Baltistan one of the more closely studied mineral regions in the Karakoram. Published surveys of the area describe a dolomitic marble sequence running for tens of kilometres along the Main Karakoram Thrust, with ruby-bearing marble reported at several points along that belt and a documented history of pegmatite and gemstone recovery in the wider Shigar–Skardu corridor.",
      "The concession carries ruby gemstones, snow white marble, lithium-bearing indications, and quartz across roughly 20 sq/km — a mixed-mineral profile typical of this belt, where a single dolomitic marble body can host gem-quality corundum alongside industrial-grade stone. As with every concession on this registry, the specific assay work and boundary data behind these indications are shared with verified investors directly, not published here.",
    ],
    faqs: [licenceFaq("Bagicha"), dataRoomFaq("Bagicha")],
  },

  "gultari-polymetallic-ores": {
    narrative: [
      "Gultari lies in the eastern reaches of Baltistan, part of a district-level belt where Pakistan's mineral surveys have repeatedly logged antimony and molybdenum showings — antimony grades as high as 50–80% have been documented at other sites within this same Kharmang–Gultari corridor, and molybdenum occurrences are recorded across Hunza, Skardu, Chilas and Astore more broadly. That regional pattern is the context this concession sits inside, not a claim about this deposit's own grade.",
      "The licensed area carries molybdenum, antimony, lead, and gemstone indications across roughly 20 sq/km. Durr & Zircon holds the concession under an active operational lease. Topography mapping for the site is listed under Documents; the geological report itself is part of the data room shared with verified counterparties.",
    ],
    faqs: [licenceFaq("the Gultari concession"), dataRoomFaq("Gultari")],
  },

  "kharmang-polymetallic-structure": {
    narrative: [
      "Kharmang district is one of the more directly documented antimony sources in Gilgit-Baltistan — regional surveys list high-grade antimony occurrences in the Kharmang–Astak area specifically, at concentrations reported between 50% and over 80% at surveyed showings. That's a stronger direct link than most concessions on this registry can claim, and it's part of why this structure was brought under licence.",
      "The concession itself is described in its filings as a complex polymetallic structure carrying copper, iron, and silver across roughly 9.9 sq/km. It sits within Gilgit-Baltistan's wider Kohistan–Karakoram suture geology, where copper-iron-silver associations of this kind recur across several licensed and unlicensed showings in the district. Full assay and structural data are available to verified investors on request.",
    ],
    faqs: [licenceFaq("the Kharmang concession"), dataRoomFaq("Kharmang")],
  },

  "skardu-placer-gold": {
    narrative: [
      "Placer gold along the upper Indus and its Gilgit-Baltistan tributaries is one of the better-documented mineral occurrences in the region — published research confirms gold recovery by panning, screen-washing, and drilling along river sediments through Chilas, Gilgit, Skardu, and Chitral, and Skardu specifically sits at the confluence of the Shigar River with the Indus, a geologically favourable trap point for placer accumulation.",
      "This concession covers a 26 km stretch of riverbed carrying placer gold in black sand deposits — a scale that points toward mechanized recovery rather than artisanal panning. Placer operations of this kind are typically lower-capex and faster to cash flow than hard-rock mining, which is part of what makes this a distinct opportunity from the district's polymetallic and gemstone concessions. Riverbed access and recovery-rate data are shared with verified investors directly.",
    ],
    faqs: [licenceFaq("the Skardu placer gold concession"), dataRoomFaq("this concession")],
  },

  "hilal-abad-polymetallic-complex": {
    narrative: [
      "Hilal Abad falls within the Kharmang district mineral belt in Baltistan, an area whose polymetallic potential — copper, iron, silver and associated base metals tied to the region's Kohistan-Ladakh suture geology — has drawn repeated attention in Pakistan's mineral resource surveys. It sits close enough to the district's documented antimony and molybdenum showings that the two are frequently discussed in the same regional surveys, though they are separate licensed areas.",
      "The concession is described in its filings as a polymetallic ore structure carrying copper, iron, silver and gold across roughly 9.97 sq/km, held under an exploration licence rather than a mining lease at this stage — meaning the priority is confirmatory work ahead of any future mining lease application. Geological documentation is available to verified investors once an enquiry is confirmed.",
    ],
    faqs: [licenceFaq("Hilal Abad"), dataRoomFaq("Hilal Abad")],
  },

  "shigar-copper-deposit": {
    narrative: [
      "Shigar district carries some of the most specific published copper-gold evidence in the region. Surveys of the nearby Shigari Bala area — within a 20 sq/km catchment in Skardu district, immediately adjacent to Shigar — have reported anomalous gold, platinum, silver, bismuth, copper, lead, zinc, cobalt and molybdenum values associated with gossan and iron-oxide zones along the Karakoram (Shyok) Suture, the same structural belt this concession sits within. The Shigar valley itself runs directly along the Main Karakoram Thrust, the boundary between the Asian plate to the north and the Kohistan-Ladakh plate to the south — a structural setting regional geologists associate with base- and precious-metal mineralization.",
      "The concession carries copper ore as its primary indication, with gold alongside copper noted as a strong secondary signal, across roughly 8.87 sq/km. The site is operational under Zircon Mines' licence. This is the strongest regional geological correlation of any concession currently on this registry — full structural and assay data are shared with verified investors directly.",
    ],
    faqs: [licenceFaq("Shigar Copper Deposit"), dataRoomFaq("Shigar Copper Deposit")],
  },

  "gojal-hunza-antimony-deposit": {
    narrative: [
      "Upper Hunza and Gojal sit within the northern Karakoram block, a structural zone that regional mineral surveys describe as host to antimony, arsenic and polymetallic sulphide showings alongside gold and gemstone occurrences. Documented lead and antimony occurrences in the nearby Awreith Gol area, within the same Gojal tehsil, are part of the pattern that put antimony exploration in this corridor on the map.",
      "This concession is held under an exploration licence (Application #2024-3435), with antimony as the primary target — reflecting that exploration, not extraction, is the current stage of work. Antimony demand has firmed globally on its role in flame retardants, battery chemistries and semiconductor manufacture, which is part of the commercial case for advancing this licence toward a mining lease. Field and assay data are shared with verified investors on request.",
    ],
    faqs: [licenceFaq("the Gojal Antimony Deposit"), dataRoomFaq("this concession")],
  },

  "ishkoman-ghizar-granite-deposit": {
    narrative: [
      "Ishkoman sits at the far end of a dolomitic marble and dimension-stone belt that regional surveys trace for more than 100 km, from Hunza through to Ishkoman near the Main Karakoram Thrust — one of the more clearly mapped industrial-mineral corridors in Gilgit-Baltistan, and the reason Ghizer district in general carries some of the region's most consistent granite and marble potential.",
      "This concession is held under a reconnaissance licence (Application #2024-3122), with granite as the primary target for dimension stone — cut for construction, cladding, and monumental work rather than for gem or industrial-mineral use. Reconnaissance is the earliest licence stage in Gilgit-Baltistan's framework, ahead of exploration and mining leases; site data is shared with verified investors as the licence advances.",
    ],
    faqs: [licenceFaq("the Ishkoman Granite Deposit"), dataRoomFaq("this concession")],
  },

  "jutial-nala-gilgit-polymetallic-ores": {
    narrative: [
      "Jutial Nala has some of the most specific published mineralogy of any concession on this registry. Government geological mapping describes copper minerals and pyrite occurring in quartz veins up to two metres thick, hosted in hornblende gneiss and schist intruded by granite, roughly 5 km up the Nala from its mouth — about 8 km south of where the Gilgit and Hunza rivers meet. The Nala itself runs some 8 km with a steep gradient of around 350 m per kilometre, consistent with the vein-hosted, structurally controlled mineralization typical of this stretch of the Gilgit region.",
      "The concession carries silver, mineralized copper veins, and lead deposits across roughly 9.97 sq/km, held under Earth Lux Mines' exploration licence. Its proximity to Gilgit city — rather than the multi-hour approach roads into Baltistan or upper Hunza — is a genuine logistical advantage for site visits and future infrastructure. Vein-by-vein assay data is part of the verified-investor data room.",
    ],
    faqs: [licenceFaq("Jutial Nala"), dataRoomFaq("Jutial Nala")],
  },

  "gupis-ghizer-construction-and-precious-stones": {
    narrative: [
      "Gupis anchors the same dolomitic marble belt referenced at Ishkoman — surveys describe it as holding some of the largest independent white marble deposits in the region, of what's been assessed as international standard, within a corridor that runs over 100 km from Hunza to Ishkoman along the Main Karakoram Thrust. Ghizer district as a whole is one of Gilgit-Baltistan's more established sources of dimension stone.",
      "The concession carries granite, premium marble, and copper indications across roughly 10 sq/km, held under Earth Lux Mines' exploration licence. The mixed profile — construction-grade stone alongside a base-metal indication — reflects the geological layering common to this belt. Quarry-face and assay documentation are shared with verified investors once an enquiry is confirmed.",
    ],
    faqs: [licenceFaq("the Gupis concession"), dataRoomFaq("Gupis")],
  },
};

export function getConcessionContext(slug: string): ConcessionContext | undefined {
  return CONCESSION_CONTEXT[slug];
}

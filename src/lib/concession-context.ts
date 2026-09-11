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
 * production figures are invented; that data is exactly what's gated behind
 * the verified-investor NDA process, and stays gated here too.
 */
export type ConcessionContext = {
  narrative: string[];
  faqs: FaqItem[];
};

const licenceFaq = (name: string): FaqItem => ({
  question: `What stage is ${name} at, and what does that mean for an investor?`,
  answer:
    "Licence status is shown on this page as either Operational or Exploratory Phase. Operational means the site is held under an active mining lease. Exploratory Phase means the concession is held under an exploration or reconnaissance licence, ahead of a mining lease application. Both are transferable business relationships, through joint venture, farm-in, equity, or in some cases outright sale, not just information.",
});

const dataRoomFaq = (name: string): FaqItem => ({
  question: `Why isn't the full geological report for ${name} published on this page?`,
  answer:
    "The mineral indications listed here are public. The boundary coordinates, assay data, and full geological report are not, by design, since publishing them would hand a competitor the same targeting information for free. That data room opens once an enquiry is confirmed through the investor desk, typically after an NDA. It's a filter for seriousness, not a sales tactic.",
});

export const CONCESSION_CONTEXT: Record<string, ConcessionContext> = {
  "bagicha-skardu-gemstones-and-minerals": {
    narrative: [
      "Bagicha sits inside Skardu district, in the same broad marble-and-gemstone belt that has made Baltistan one of the more closely studied mineral regions in the Karakoram. Published surveys of the area describe a dolomitic marble sequence running for tens of kilometres along the Main Karakoram Thrust. Ruby-bearing marble has been reported at several points along that belt, and the wider Shigar-Skardu corridor has a long documented history of pegmatite and gemstone recovery.",
      "The profile here has broadened since the original filings. Alongside ruby gemstones, snow white marble, quartz and lithium indications, our own field work has identified copper with the mineralised vein exposed at surface, which is about as direct an indication as field work produces. The licensed area runs to roughly 20 sq/km alongside the Tormik valley. Bagicha is in operation and road-accessible, and our separate placer gold licence runs along the Skardu road nearby. As with every concession on this registry, the assay work and boundary data behind these indications go to verified investors directly rather than onto this page.",
    ],
    faqs: [licenceFaq("Bagicha"), dataRoomFaq("Bagicha")],
  },

  "gultari-polymetallic-ores": {
    narrative: [
      "Gultari lies in the eastern reaches of Baltistan, part of a district-level belt where Pakistan's mineral surveys have repeatedly logged antimony and molybdenum showings. Antimony grades as high as 50 to 80 percent have been documented at other sites within this same Kharmang-Gultari corridor, and molybdenum occurrences are recorded across Hunza, Skardu, Chilas and Astore more broadly. That's the regional pattern this concession sits inside; it isn't a claim about this deposit's own grade.",
      "The licensed area carries molybdenum, antimony, lead and gemstone indications across roughly 20 sq/km, and our own work has since added copper and gold to that list. Gultari is the least advanced block on this registry: it is held by Durr & Zircon at exploration stage and has not yet been properly explored, so the profile above should be read as indications rather than a delineated resource. Topography mapping for the site is listed under Documents, and the geological report itself is part of the data room shared with verified counterparties.",
    ],
    faqs: [licenceFaq("the Gultari concession"), dataRoomFaq("Gultari")],
  },

  "kharmang-polymetallic-structure": {
    narrative: [
      "Kharmang district is one of the more directly documented antimony sources in Gilgit-Baltistan. Regional surveys list high-grade antimony occurrences in the Kharmang-Astak area specifically, at concentrations reported between 50 and over 80 percent at surveyed showings. That's a stronger direct link than most concessions on this registry can claim, and it's part of why this structure was brought under licence.",
      "This block is known locally as Mahdi Abad. Its original filings described a copper-iron-silver polymetallic structure across roughly 9.9 sq/km, and that was written before we explored the ground. What our own work has recovered so far is serpentine, along with initial nephrite jade samples. Nephrite forms characteristically close to serpentinite, so serpentine appearing first is a reasonable lead rather than an unrelated result, and it is the same pairing established at our Hilal Abad block in this district. Mahdi Abad is at an earlier stage than Hilal Abad, exploration rather than production, and it is reachable by road. Full assay and structural data are available to verified investors on request.",
    ],
    faqs: [licenceFaq("the Kharmang concession"), dataRoomFaq("Kharmang")],
  },

  "skardu-placer-gold": {
    narrative: [
      "Placer gold along the upper Indus and its Gilgit-Baltistan tributaries is one of the better-documented mineral occurrences in the region. Published research confirms gold recovery by panning, screen-washing, and drilling along river sediments through Chilas, Gilgit, Skardu, and Chitral. Skardu itself sits at the confluence of the Shigar River with the Indus, a geologically favourable trap point for placer accumulation.",
      "This concession covers a 26 km stretch of riverbed carrying placer gold in black sand deposits, a scale that points toward mechanized recovery rather than artisanal panning. It is one of our producing blocks, it runs along the Skardu road, and both of those matter commercially: placer operations of this kind are typically lower-capex and faster to cash flow than hard-rock mining, and road access along the length of the workings removes the logistics premium that makes remote Karakoram projects expensive. Riverbed access and recovery-rate data are shared with verified investors directly.",
    ],
    faqs: [licenceFaq("the Skardu placer gold concession"), dataRoomFaq("this concession")],
  },

  "hilal-abad-polymetallic-complex": {
    narrative: [
      "Hilal Abad falls within the Kharmang district mineral belt in Baltistan, an area whose polymetallic potential has drawn repeated attention in Pakistan's mineral resource surveys, tied to the region's Kohistan-Ladakh suture geology. The relevant geology here is ultramafic: where water has reacted with olivine-rich rock to produce serpentinite, nephrite jade characteristically forms nearby, typically along contact zones where serpentinised rock meets something else. That association is why the two minerals are found together at this site rather than by coincidence.",
      "What this block carries has changed materially since its original filings, which were written before we had explored it. Our own work has established premium-grade nephrite jade as the primary target at Hilal Abad, alongside serpentine and copper, across roughly 9.97 sq/km. Nephrite samples recovered here have been examined and approved by specialists with more than twenty years working specifically in nephrite, and sample approval has also come back from China, which is the principal market for the stone. The block is in operation, and the deposit is reachable by road, which is not true of every licence in this district and changes the cost of everything from bulk sampling to shipment. Assay work, boundary data and the full geological report go to verified investors once an enquiry is confirmed.",
    ],
    faqs: [licenceFaq("Hilal Abad"), dataRoomFaq("Hilal Abad")],
  },

  "shigar-copper-deposit": {
    narrative: [
      "Shigar district carries some of the most specific published copper-gold evidence in the region. Surveys of the nearby Shigari Bala area, a 20 sq/km catchment in Skardu district immediately adjacent to Shigar, have reported anomalous gold, platinum, silver, bismuth, copper, lead, zinc, cobalt and molybdenum values associated with gossan and iron-oxide zones along the Karakoram (Shyok) Suture, the same structural belt this concession sits within. The Shigar valley itself runs directly along the Main Karakoram Thrust, the boundary between the Asian plate to the north and the Kohistan-Ladakh plate to the south, a structural setting regional geologists associate with base- and precious-metal mineralization.",
      "Our own exploration at Askoli, inside this licence, has identified a broader profile than the copper-led description in the original filings: gold, lead, lithium and copper together with gemstone occurrences, across roughly 8.87 sq/km. That mix is consistent with the polymetallic pattern the regional surveys above describe rather than a departure from it. The block is held by Zircon Mines and remains at exploration stage, so the near-term work is confirmatory. Of every concession on this registry, this one has the strongest regional geological correlation behind it. Full structural and assay data are shared with verified investors directly.",
    ],
    faqs: [licenceFaq("Shigar Copper Deposit"), dataRoomFaq("Shigar Copper Deposit")],
  },

  "gojal-hunza-antimony-deposit": {
    narrative: [
      "Upper Hunza and Gojal sit within the northern Karakoram block, a structural zone that regional mineral surveys describe as host to antimony, arsenic and polymetallic sulphide showings alongside gold and gemstone occurrences. Documented lead and antimony occurrences in the nearby Awreith Gol area, within the same Gojal tehsil, are part of the pattern that put antimony exploration in this corridor on the map.",
      "This concession is held under an exploration licence across roughly 10 sq/km, with antimony as the primary target and molybdenum indications also recorded by our own field work. That reflects where the work actually is: exploration, not extraction. Antimony demand has firmed globally on its role in flame retardants, battery chemistries and semiconductor manufacture, part of the commercial case for advancing this licence toward a mining lease. Field and assay data, including the application reference itself, are shared with verified investors on request.",
    ],
    faqs: [licenceFaq("the Gojal Antimony Deposit"), dataRoomFaq("this concession")],
  },

  "ishkoman-ghizar-granite-deposit": {
    narrative: [
      "Ishkoman sits at the far end of a dolomitic marble and dimension-stone belt that regional surveys trace for more than 100 km, from Hunza through to Ishkoman near the Main Karakoram Thrust. It's one of the more clearly mapped industrial-mineral corridors in Gilgit-Baltistan, and the reason Ghizer district as a whole carries some of the region's most consistent granite and marble potential.",
      "This concession is held under a reconnaissance licence across roughly 10 sq/km, with granite as the primary target for dimension stone: cut for construction, cladding, and monumental work, rather than for gem or industrial-mineral use. Our own field work has also recorded antimony here, which makes the block less purely an industrial-stone play than the original filing suggested. Reconnaissance is the earliest licence stage in Gilgit-Baltistan's framework, ahead of exploration and mining leases. Site data, including the application reference itself, is shared with verified investors as the licence advances.",
    ],
    faqs: [licenceFaq("the Ishkoman Granite Deposit"), dataRoomFaq("this concession")],
  },

  "jutial-nala-gilgit-polymetallic-ores": {
    narrative: [
      "Jutial Nala has some of the most specific published mineralogy of any concession on this registry. Government geological mapping describes copper minerals and pyrite occurring in quartz veins up to two metres thick, hosted in hornblende gneiss and schist intruded by granite, roughly 5 km up the Nala from its mouth, about 8 km south of where the Gilgit and Hunza rivers meet. The Nala itself runs some 8 km with a steep gradient of around 350 m per kilometre, consistent with the vein-hosted, structurally controlled mineralization typical of this stretch of the Gilgit region.",
      "Our own work has confirmed that mapping on the ground: mineralised copper veins and lead, with silver alongside them, across roughly 9.97 sq/km held by Earth Lux Mines. This is one of our producing blocks. Its proximity to Gilgit city, rather than the multi-hour approach roads into Baltistan or upper Hunza, is a genuine logistical advantage for site visits and future infrastructure. Vein-by-vein assay data is part of the verified-investor data room.",
    ],
    faqs: [licenceFaq("Jutial Nala"), dataRoomFaq("Jutial Nala")],
  },

  "gupis-ghizer-construction-and-precious-stones": {
    narrative: [
      "Gupis anchors the same dolomitic marble belt referenced at Ishkoman. Surveys describe it as holding some of the largest independent white marble deposits in the region, assessed as international standard, within a corridor that runs over 100 km from Hunza to Ishkoman along the Main Karakoram Thrust. Ghizer district as a whole is one of Gilgit-Baltistan's more established sources of dimension stone.",
      "The concession carries granite and premium marble across roughly 10 sq/km, held by Earth Lux Mines at exploration stage, and our own field work has now discovered copper here rather than merely indicating it. The mixed profile, construction-grade stone alongside a base metal, reflects the geological layering common to this belt. Quarry-face and assay documentation are shared with verified investors once an enquiry is confirmed.",
    ],
    faqs: [licenceFaq("the Gupis concession"), dataRoomFaq("Gupis")],
  },
};

export function getConcessionContext(slug: string): ConcessionContext | undefined {
  return CONCESSION_CONTEXT[slug];
}

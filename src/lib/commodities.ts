import { concessions } from "@/lib/concessions";
import type { FaqItem } from "@/lib/faq-data";

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
  /**
   * Questions specific to this commodity, shown before the two shared supply
   * questions and emitted as FAQPage schema. Commodity pages share a template,
   * so a page with little unique copy reads to Google as a duplicate of its
   * siblings: granite was flagged "Duplicate without user-selected canonical"
   * in Search Console (Oct 2026). Unique, specific answers are the fix.
   */
  faqs?: FaqItem[];
  /**
   * "exploration" switches the page template from supply copy (FOB, L/C,
   * trial shipments) to exploration copy (field samples, farm-in, JV). Added
   * Nov 2026 for minerals on the registry that are not yet produced: lithium,
   * molybdenum. Omit for anything actually shipped.
   */
  stage?: "producing" | "exploration";
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
      "Antimony sits on most Western critical-minerals watch lists now, driven by flame retardants, battery chemistries and semiconductor manufacture. Gilgit Baltistan's antimony occurrences, including grades reported elsewhere in the Kharmang-Gultari corridor, are still early-stage relative to that demand curve.",
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
      "Placer gold and dore from a licensed 9.5 km riverbed concession in Skardu, Gilgit Baltistan. FOB Karachi or CIF, assay and inspection available, trial shipments accepted.",
    intro:
      "Our placer gold comes from a licensed 9.5 km riverbed concession in Skardu, carried in black sand deposits at a scale that supports mechanized recovery rather than artisanal panning. Quoted FOB Karachi or CIF, with assay reports and SGS inspection arranged for verified buyers.",
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
      "Nephrite is prized across East Asian markets for carving and ornamental work, and it is among the most culturally valued stones we bring out of the ground. The Hilal Abad samples have cleared expert review and buyer approval in China itself, the detail is on the concession page. Buyers in this category typically want to inspect physical material before committing, which we accommodate directly.",
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
    metaTitle: "Granite & Dimension Stone Mining Company, Gilgit Baltistan",
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
    faqs: [
      {
        question: "Is your granite and marble available now, or still at exploration stage?",
        answer:
          "Marble is available now: Bagicha in Skardu is a producing block and carries snow white marble. The granite is earlier stage. Gupis in Ghizer is an exploratory block carrying granite alongside premium marble, and Ishkoman holds a reconnaissance licence covering granite and antimony. Every quote names the block it comes from, because a producing block can ship to a timetable and an exploratory one cannot yet.",
      },
      {
        question: "What should I test before ordering dimension stone from Gilgit Baltistan?",
        answer:
          "Ask for block samples and have them tested at a laboratory of your choice for water absorption, density and compressive strength, then compare colour and veining across more than one block. Dimension stone is judged block by block, so samples from the actual quarry face tell you far more than a single showroom slab.",
      },
      {
        question: "How does granite and marble from these valleys reach an export port?",
        answer:
          "Ghizer and Skardu are linked by road to Gilgit and the Karakoram Highway, and stone travels south by road to Karachi, which is why we quote FOB Karachi or CIF to your discharge port. Mountain weather shapes the calendar, so delivery windows are agreed per order rather than promised year-round.",
      },
    ],
  },
  {
    /**
     * Hard-rock gold, kept deliberately distinct from `placer-gold`.
     *
     * Two gold pages only make sense if they are genuinely two products, so
     * the split is by deposit type: this page is lode gold in ore at Askoli
     * (Shigar) and Gultari, both early stage; `placer-gold` is the producing
     * alluvial operation on the 9.5 km Skardu riverbed. Different recovery,
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
  /*
   * Minerals on the registry that had no page (Nov 2026). "gilgit baltistan
   * lithium" was already drawing impressions with nothing to land on, and a
   * competitor ranks for the region by selling lithium ore. Lithium and
   * molybdenum are exploration-stage and use the exploration template; the
   * rest are produced on at least one block. Every sourcedFrom slug names
   * the mineral in companies-data.ts, per the rule at the top of this file.
   */
  {
    slug: "lithium",
    name: "Lithium",
    stage: "exploration",
    metaTitle: "Lithium in Gilgit Baltistan: Pegmatite Exploration Ground",
    metaDescription:
      "Lithium-bearing pegmatite ground under licence at Shigar and Bagicha, Gilgit Baltistan, Pakistan. Exploration stage: field samples, no published grades yet. Farm-in and joint venture routes for investors.",
    intro:
      "Lithium is recorded on two of our licensed blocks: Shigar, where the Askoli pegmatites carry it alongside gold, lead and copper, and Bagicha in Skardu, where our field work has found lithium indications. Both are exploration stage. We do not sell lithium today. What we offer is licensed pegmatite ground, field samples you can hold, and a route in for investors who want to fund the sampling and assay work that turns an indication into a grade.",
    demand:
      "Lithium demand is set by batteries, for electric vehicles and grid storage. Hard-rock supply has come mainly from spodumene in Australia, with lithium micas such as lepidolite processed at scale in China. Pakistan's Geological Survey describes the Shigar and Shengus pegmatites as lepidolite and lithium-tourmaline bearing, which puts them in the mica class, and it has run mapping in Shigar Valley with an emphasis on lithium. No resource estimate has been published for any of it, by the Survey or by us.",
    sourcedFrom: ["shigar-copper-deposit", "bagicha-skardu-gemstones-and-minerals"],
    image: "/images/gallery/askoli-shigar/askoli-shigar-lithium-01.jpg",
    faqs: [
      {
        question: "Is there really lithium in Gilgit Baltistan?",
        answer:
          "Yes, in pegmatites. The Geological Survey of Pakistan has documented lithium minerals in the Shigar and Shengus pegmatites, elbaite and lepidolite among them, together with the pathfinder minerals that usually accompany lithium, and a 2026 peer-reviewed study characterised a mica-type lithium ore from Shigar Valley. Those are occurrences, not reserves: no grade or tonnage has been published for any of them.",
      },
      {
        question: "Which lithium mineral is it, and does that matter?",
        answer:
          "It matters a great deal. Shigar's lithium sits in lepidolite, a mica, and in lithium tourmaline, not in spodumene, the mineral most hard-rock lithium mines process. Mica ores typically carry less lithium per tonne and need a different processing route, which is why the first job on this ground is laboratory assay to establish the lithium oxide grade and exactly which mineral hosts it. Until that is done, nobody can honestly price the deposit.",
      },
      {
        question: "How can an investor get involved in lithium exploration with you?",
        answer:
          "Two routes. A farm-in, where you fund a defined sampling and assay programme on the Shigar or Bagicha block and earn a share of it; or a joint venture across the block as a whole. In both cases you see the licence, the field data and the physical samples first. The Askoli pegmatite samples in our gallery are the material in question, photographed where it was found.",
      },
    ],
  },
  {
    slug: "molybdenum",
    name: "Molybdenum",
    stage: "exploration",
    metaTitle: "Molybdenum in Gilgit Baltistan: Exploration Ground, Pakistan",
    metaDescription:
      "Molybdenite identified in the field at Gultari and molybdenum indications at Gojal, Hunza, on licensed exploration ground in Gilgit Baltistan. No published grade yet; farm-in and joint venture routes.",
    intro:
      "Molybdenum is recorded at Gultari, part of a polymetallic package with copper, gold, antimony and lead, and as indications at our Gojal antimony block in Hunza. Both are exploration stage. Molybdenite, the sulphide ore of molybdenum, was identified in our Gultari field work and photographed on site. It has not been assayed for grade or tonnage, and we say so rather than quote a figure.",
    demand:
      "Molybdenum goes mainly into steel: stainless, tool and high-strength alloys for pipelines, chemical plant, power generation and defence, with smaller uses in catalysts and lubricants. Most of the world's supply is recovered as a by-product of porphyry copper mines, which is why molybdenum sitting with copper at Gultari is geologically unsurprising, and why the block is best assessed as a copper-molybdenum system rather than for either metal alone.",
    sourcedFrom: ["gultari-polymetallic-ores", "gojal-hunza-antimony-deposit"],
    image: "/images/mo-1.jpg",
    faqs: [
      {
        question: "Where exactly has molybdenum been found on your ground?",
        answer:
          "At Gultari, held by Durr Mines and Minerals, where molybdenite was identified in field samples alongside copper, gold, antimony and lead; the photographs are in our gallery. And as indications at Gojal in Hunza, held by Zircon Mines, where the primary target is antimony. Both blocks are at exploration stage.",
      },
      {
        question: "Why does molybdenum occur together with copper?",
        answer:
          "Because both form in porphyry systems, where mineral-rich fluids from cooling magma deposit copper and molybdenum sulphides in the same fractured rock. The Kohistan arc that runs through Gilgit Baltistan hosts porphyry-style copper, and most of the world's molybdenum is produced as a by-product of exactly this kind of copper mine. For an investor it means Gultari's molybdenum adds to the copper case rather than standing apart from it.",
      },
      {
        question: "What would it take to put a number on it?",
        answer:
          "Systematic sampling across the mineralised zones, assay of each sample for copper, molybdenum, gold and the rest of the package, then mapping of how far the zones extend. That is a funded programme, not a desk exercise, and it is what a farm-in partner would be paying for.",
      },
    ],
  },
  {
    slug: "silver",
    name: "Silver",
    metaTitle: "Silver-Bearing Lead & Copper Concentrate, Pakistan",
    metaDescription:
      "Silver from licensed concessions in Gilgit Baltistan, Pakistan, carried in lead and copper concentrate from Jutial Nala and recorded at Kharmang. Silver content by assay, paid as a credit. FOB Karachi or CIF.",
    intro:
      "Silver on our registry travels with lead and copper. At Jutial Nala near Gilgit, a producing block, it sits in the galena and copper veins and is paid for as a credit in the concentrate rather than sold as metal; at Kharmang it is recorded alongside copper and iron at exploration stage. We quote silver-bearing lead and copper concentrate FOB Karachi or CIF, with the silver content established by assay.",
    demand:
      "Silver is both an industrial and an investment metal: photovoltaics, electronics and brazing alloys on one side, bars and coins on the other, and in recent years solar manufacturing has been the fastest-growing use. Most mined silver is recovered as a by-product of lead, zinc and copper, exactly the form it takes here, which means a buyer of our lead or copper concentrate is also a buyer of silver.",
    sourcedFrom: ["jutial-nala-gilgit-polymetallic-ores", "kharmang-polymetallic-structure"],
    image: "/images/lead-jutial-1.jpg",
    faqs: [
      {
        question: "Do you sell silver as metal or in concentrate?",
        answer:
          "In concentrate. We do not refine, so the silver leaves as part of the lead or copper concentrate from Jutial Nala and is paid for under the concentrate contract. Buyers who want silver specifically should look at our lead concentrate first, since galena is where most of it sits.",
      },
      {
        question: "How is the silver in a concentrate paid for?",
        answer:
          "The standard way: an independent laboratory assays the silver grade of each shipment, a payable percentage is agreed above a minimum deduction, and that payable silver is priced at the reference price for the quotation period. If buyer and seller assays disagree beyond a set margin, an umpire laboratory decides. The terms are written into the offtake contract before the first shipment.",
      },
      {
        question: "Which of your blocks actually carry silver?",
        answer:
          "Jutial Nala in Gilgit, held by Earth Lux Mines and Minerals, which is producing and records silver with its copper veins and lead; and Mahdi Abad in Kharmang, held by Durr Mines and Minerals, where silver is recorded with copper, iron, serpentine and nephrite at exploration stage.",
      },
    ],
  },
  {
    slug: "marble",
    name: "Marble",
    metaTitle: "Marble Supplier in Gilgit Baltistan, Pakistan",
    metaDescription:
      "Snow white marble blocks and slabs from a licensed, road-accessible quarry at Bagicha, Skardu, Gilgit Baltistan, with premium marble recorded at Gupis. Quoted FOB Karachi or CIF, block samples before bulk orders.",
    intro:
      "Snow white marble comes from our Bagicha block in Skardu, a producing concession where it sits alongside copper, ruby and quartz, and premium marble is recorded at Gupis in Ghizer at exploration stage. We quote blocks and slabs FOB Karachi or CIF, with block samples available before a bulk order. Bagicha is reachable by road, which for a stone sold by the tonne decides the economics.",
    demand:
      "Pakistan is already one of the world's larger marble exporters, with most of it quarried in Khyber Pakhtunkhwa and Balochistan, and buyers in the Gulf, China and Europe know Pakistani stone. Gilgit Baltistan's marble is far less worked. A white stone from a licensed, road-accessible quarry gives buyers a new source outside the established belts, and it is quoted separately from our granite because the finish and the market are different.",
    sourcedFrom: ["bagicha-skardu-gemstones-and-minerals", "gupis-ghizer-construction-and-precious-stones"],
    image: "/images/commodities/marble.webp",
    faqs: [
      {
        question: "What colour and grade is the Bagicha marble?",
        answer:
          "Our registry records it as snow white. Grade in marble is decided block by block rather than by a deposit-wide label, so we send sample blocks and let buyers test water absorption, density and compressive strength at a laboratory of their choice, and compare veining across more than one block before committing.",
      },
      {
        question: "How does marble get from Skardu to a port?",
        answer:
          "By road from the Bagicha quarry to Skardu, on to Gilgit and the Karakoram Highway, and south to Karachi, which is why we quote FOB Karachi or CIF to your discharge port. Mountain weather shapes the calendar, so delivery windows are agreed per order rather than promised year-round.",
      },
      {
        question: "Can I visit the quarry before ordering?",
        answer:
          "Yes. Bagicha has road access, and we arrange site visits with the permits and security clearances handled. Seeing the quarry face tells a stone buyer more than any sample, and we would rather you came.",
      },
    ],
  },
  {
    slug: "ruby-gemstones",
    name: "Ruby & Gemstones",
    metaTitle: "Ruby & Rough Gemstones from Licensed Mines, Gilgit Baltistan",
    metaDescription:
      "Rough ruby from the licensed Bagicha block in Skardu, and gemstone occurrences at Shigar and Gultari, Gilgit Baltistan, Pakistan. Sold by the parcel from registered ground, graded and photographed before dispatch.",
    intro:
      "Ruby is recorded at our Bagicha block in Skardu, a producing concession, and gemstone occurrences are listed at Gultari and in our Shigar block, whose Askoli pegmatites sit in one of Pakistan's best-known gem valleys. We sell rough stone from licensed ground by the parcel, graded and photographed before dispatch, and buyers can inspect a parcel before committing to it.",
    demand:
      "Pakistan's gem trade has run through Peshawar and Gilgit for decades, mostly on stone from informal diggings. Buyers increasingly ask where a stone came from and whether the ground was licensed, for ethical sourcing and for customs paperwork alike, and rough from a registered concession answers that question. Gilgit Baltistan is known for aquamarine, tourmaline and topaz from its pegmatites, and for ruby from its marble belts.",
    sourcedFrom: ["bagicha-skardu-gemstones-and-minerals", "gultari-polymetallic-ores", "shigar-copper-deposit"],
    image: "/images/ruby-bagicha.jpg",
    faqs: [
      {
        question: "Is the ruby from Bagicha gem quality?",
        answer:
          "Some of it. Ruby in marble-hosted deposits ranges from cabochon grade to facet grade within the same pocket, so we grade each parcel and photograph it rather than describe a deposit-wide quality. For individual stones, independent laboratory certification can be arranged at the buyer's cost before purchase.",
      },
      {
        question: "Which gemstones occur in the Shigar block?",
        answer:
          "The Shigar Valley pegmatites are documented in published geological literature for aquamarine, tourmaline and topaz, and our Shigar block lists gemstones alongside gold, lead, lithium and copper. The block is at exploration stage, so gem material from it is sampled rather than mined at present.",
      },
      {
        question: "How do I buy rough gemstones from a licensed source?",
        answer:
          "Ask through the investor desk for current parcels. Each comes with photographs, weights and a description, can be inspected in person or by a nominated agent, and ships with export paperwork from a registered Pakistani company, which is what a customs broker will ask you for.",
      },
    ],
  },
  {
    slug: "serpentine",
    name: "Serpentine",
    metaTitle: "Serpentine Stone Supplier, Kharmang, Gilgit Baltistan",
    metaDescription:
      "Serpentine rough blocks and ornamental stone from licensed concessions at Hilal Abad and Mahdi Abad, Kharmang, Gilgit Baltistan, Pakistan. Road-accessible blocks, quoted FOB Karachi or CIF.",
    intro:
      "Serpentine is recorded at both of our Kharmang blocks: Hilal Abad, a producing concession where it sits with nephrite jade and copper, and Mahdi Abad, at exploration stage with copper, iron and silver. We supply serpentine as rough blocks and ornamental stone, quoted FOB Karachi or CIF, and both blocks are reachable by road.",
    demand:
      "Serpentine is cut as a decorative and architectural stone, carved as an ornamental material, and used as a magnesium-rich industrial mineral. Its presence also matters for what it signals: serpentinite forms from altered mantle rock, and nephrite jade forms along its contacts, which is why nephrite turned up at Hilal Abad once serpentine had. The geology is set out in our article on serpentine at Kharmang.",
    sourcedFrom: ["hilal-abad-polymetallic-complex", "kharmang-polymetallic-structure"],
    image: "/images/gallery/hilal-abad-nephrite/hilal-abad-nephrite-22.jpg",
    faqs: [
      {
        question: "What is serpentine used for?",
        answer:
          "Mostly as a green decorative stone, cut into slabs and tiles or carved as ornaments, and in industry as a source of magnesium. Buyers of industrial-grade material should specify and test for fibrous varieties, since the serpentine group includes chrysotile, and we supply test samples for exactly that reason.",
      },
      {
        question: "How is the serpentine linked to the nephrite at Hilal Abad?",
        answer:
          "Nephrite forms where serpentinite meets other rock under heat and pressure, so the serpentine at Hilal Abad is the host that made the nephrite possible. Finding serpentine first was what told our field team to look for jade. The full explanation, including why the same reaction interests planetary scientists, is in our article on serpentine and nephrite at Kharmang.",
      },
      {
        question: "Can I order serpentine blocks today?",
        answer:
          "Yes, from Hilal Abad, which is producing and reachable by road. Samples are available first, and block size, finish and volume are agreed per order.",
      },
    ],
  },
];

export function getCommodity(slug: string) {
  return COMMODITIES.find((c) => c.slug === slug);
}

export function getCommoditySourceConcessions(commodity: Commodity) {
  return concessions.filter((c) => commodity.sourcedFrom.includes(c.slug));
}

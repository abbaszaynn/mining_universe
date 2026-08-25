import { COMMODITIES } from "@/lib/commodities";
import type { FaqItem } from "@/lib/faq-data";

/**
 * Cluster E in docs/SEO-PLAN.md: buyer-country pages. Client direction
 * (2026-08-17): target audience is large companies looking to invest,
 * not retail buyers, so this leans on investment framing (JV, equity,
 * farm-in) rather than the trade-vocabulary approach used on
 * /commodities. Target countries per client: Thailand, USA, China, UAE,
 * Saudi Arabia, and Pakistan (domestic).
 *
 * Every country-specific claim here is sourced and dated (deals, forums,
 * investment figures actually reported), not invented. The Pakistan
 * National Mineral Harmonization Framework's 18% target rate of return is
 * stated explicitly as national policy context, never as a promise this
 * company makes about its own concessions - that distinction matters, an
 * implied guaranteed-return claim is a different category of problem than
 * thin content.
 */
export type Market = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  context: string;
  commoditySlugs: string[];
  /**
   * Deliberately written per country rather than templated. Six pages
   * sharing one set of near-identical Q&As is exactly the near-duplicate
   * pattern that got the original news articles flagged in Search Console.
   */
  faqs: FaqItem[];
};

export const MARKETS: Market[] = [
  {
    slug: "china",
    name: "China",
    metaTitle: "Pakistan Mining Investment for Chinese Investors",
    metaDescription:
      "Copper, gold and rare earth investment opportunities in Gilgit Baltistan for Chinese investors, alongside CPEC-linked mineral cooperation and Pakistan's 2025 investor incentive framework.",
    intro:
      "Chinese investment in Pakistan's mineral sector has deepened well beyond the established Saindak copper-gold and Duddar lead-zinc joint ventures. In September 2025 alone, over 300 Pakistani companies visited China and 167 memoranda of understanding were signed at a single business-to-business conference, and Pakistan has invited China to the Pakistan Minerals Investment Forum in Islamabad in April 2026, targeting an estimated $6 to $8 billion in annual mineral export potential.",
    context:
      "The direction of travel is toward value addition, not raw extraction: processing plants, smelters, and mineral-based industrial clusters linked to CPEC and Special Economic Zones, rather than ore shipped out unprocessed. Pakistan's National Mineral Harmonization Framework, introduced in 2025, targets an 18 percent rate of return for investors nationally as part of that push, a national policy figure, not a specific claim about any single concession. Our copper and antimony concessions sit inside exactly the commodity mix this cooperation is built around.",
    commoditySlugs: ["copper-concentrate", "antimony-concentrate"],
    faqs: [
      {
        question: "Is there existing precedent for Chinese mining investment in Pakistan?",
        answer:
          "Yes, and it predates the current wave. The Saindak copper-gold project and the Duddar lead-zinc mine have both operated as long-running Chinese joint ventures. That matters for a new counterparty because the legal and operational template for a Chinese-Pakistani mining JV is already well established rather than something both sides would be inventing.",
      },
      {
        question: "Can a Chinese company hold the mineral title directly?",
        answer:
          "No. Mineral titles in Gilgit Baltistan can only be granted to a locally incorporated entity, so the practical routes are a joint venture with an existing licence holder, a farm-in agreement, or incorporating a Pakistani subsidiary. We already hold the licences, which removes the application stage from the timeline entirely.",
      },
      {
        question: "Does the value-addition push affect how a deal would be structured?",
        answer:
          "It tends to. Pakistan's current policy direction favours processing and refining inside the country over raw ore export, often tied to Special Economic Zones. If your interest is in downstream processing rather than shipping concentrate out, that aligns with where the incentives currently sit, and it is worth raising early in the conversation.",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    metaTitle: "Pakistan Critical Minerals Investment for US Companies",
    metaDescription:
      "Copper, antimony and gold investment opportunities in Gilgit Baltistan, aligned with the $500 million Pakistan-US critical minerals partnership and US supply chain diversification goals.",
    intro:
      "In September 2025, Pakistan and US Strategic Metals signed a framework covering the full mineral value chain, from exploration through refining, backing a $500 million partnership. The first shipment under that agreement went out in October 2025: antimony, copper concentrate, and rare earth elements including neodymium and praseodymium, materials the US has explicitly flagged as part of reducing dependence on a small number of existing suppliers.",
    context:
      "Copper, antimony, and gold, three of our own commodities, are named directly among the minerals this partnership is built to develop and refine domestically in Pakistan rather than export as raw ore. For a US investor, that's a live, government-backed precedent for exactly this kind of deal, not a speculative pitch.",
    commoditySlugs: ["copper-concentrate", "antimony-concentrate", "placer-gold"],
    faqs: [
      {
        question: "Which of your minerals appear on US critical minerals lists?",
        answer:
          "Antimony is the clearest one. It appears on the USGS critical minerals list and was among the materials in the first shipment under the Pakistan-US Strategic Metals agreement in October 2025. We hold antimony under licence at Gultari and in the Gojal tehsil of Hunza. Copper has also drawn increasing attention in US supply chain policy, and we hold it at Shigar, Kharmang, Hilal Abad, Jutial Nala and Gupis.",
      },
      {
        question: "Are you part of the Pakistan-US Strategic Metals partnership?",
        answer:
          "No, and it would be misleading to imply otherwise. That is a separate framework between Pakistan and US Strategic Metals. We reference it because it establishes a live, government-backed precedent for exactly this kind of arrangement, and because the minerals it targets are the minerals we hold. Our concessions are an independent opportunity at an earlier stage.",
      },
      {
        question: "What does the incorporation requirement mean for a US company?",
        answer:
          "A US entity cannot hold a Gilgit Baltistan mineral title in its own name. In practice that means a joint venture or farm-in with an existing licence holder, or incorporating a Pakistani subsidiary to hold the title. Both are routine; the choice usually comes down to how much operational control you want versus how much structure you want to set up.",
      },
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    metaTitle: "Pakistan Mining Investment for Saudi Investors",
    metaDescription:
      "Copper and gold investment opportunities in Gilgit Baltistan, in the same commodity profile as Saudi Arabia's stake pursuit in Pakistan's Reko Diq project.",
    intro:
      "Saudi Arabia's own mining sector had a record 2025, exploitation licences up 220 percent and investment reaching $11.7 billion domestically, and that appetite has extended into Pakistan directly. The Kingdom has pursued a 15 percent stake in Pakistan's Reko Diq copper-gold project (backed by a reported $540 million commitment), and the Saudi Fund for Development has signalled it may put over $100 million more into Pakistani mining infrastructure.",
    context:
      "Reko Diq is a copper-gold deposit, the same commodity pairing our Shigar and Kharmang concessions carry, at a scale that shows Saudi capital is already comfortable underwriting Pakistani mining risk at nine-figure levels. Broader estimates put combined Saudi and UAE investment interest in Pakistan at up to $50 billion over five years, mining being one part of that.",
    commoditySlugs: ["copper-concentrate", "placer-gold"],
    faqs: [
      {
        question: "How do your concessions compare to Reko Diq in scale?",
        answer:
          "They do not, and it would be dishonest to suggest they do. Reko Diq is one of the largest undeveloped copper-gold deposits in the world, with an estimated 5.9 billion tonnes of ore and a projected 40-year mine life. Our Shigar concession covers roughly 8.87 sq/km. What the two share is the commodity pairing and the geological setting type, which makes ours an early-stage position in the same category, not a comparable asset.",
      },
      {
        question: "Why would a Saudi investor look at an earlier-stage asset?",
        answer:
          "Entry cost and equity share. A minority stake in a proven deposit at Reko Diq scale is priced accordingly. An earlier-stage licensed concession trades higher geological uncertainty for a materially larger share of the upside and far more influence over how the project is developed. Whether that trade is attractive depends entirely on your risk mandate.",
      },
      {
        question: "What stage of due diligence can you support?",
        answer:
          "We hold incorporation certificates, exploration licences, geological reports and topography maps as a standing data room, shared after an NDA. We also arrange site visits with NOCs and security permissions handled, including sampling in your presence with splits sealed for your own independent assay.",
      },
    ],
  },
  {
    slug: "uae",
    name: "UAE",
    metaTitle: "Pakistan Mining Investment for UAE Investors",
    metaDescription:
      "Mining and mineral investment opportunities in Gilgit Baltistan for UAE investors, part of the Gulf's broader critical minerals push into Pakistan.",
    intro:
      "The UAE has taken a more selective approach to critical minerals than Saudi Arabia's broader build-out, but it remains one of the Gulf states most active in the region, and Pakistan features in combined Gulf investment estimates running as high as $50 billion over five years alongside Saudi commitments.",
    context:
      "For a UAE investor, the case is less about a single headline deal and more about ground-floor positioning: licensed concessions with surveyed boundaries and government permits, in a commodity mix, copper, granite, dimension stone, that maps onto UAE's own construction and industrial demand as directly as it does export.",
    commoditySlugs: ["copper-concentrate", "granite-dimension-stone"],
    faqs: [
      {
        question: "Why granite and marble alongside the metals?",
        answer:
          "Because it maps onto UAE demand more directly than the base metals do. Our Gupis and Ishkoman concessions in Ghizer district sit in a dolomitic marble and dimension-stone belt that regional surveys trace for over 100 km, and dimension stone feeds construction and architectural cladding, which is a live and continuous requirement across the Emirates rather than a speculative export market.",
      },
      {
        question: "Can a UAE entity hold the licence, or does it need a local partner?",
        answer:
          "A local partner or a locally incorporated subsidiary is required, since Gilgit Baltistan mineral titles cannot be granted to a foreign entity directly. Since we already hold the licences, the usual route is a joint venture or farm-in against the existing title rather than a fresh application.",
      },
      {
        question: "Is there a trading or re-export angle rather than direct investment?",
        answer:
          "Yes, and for some counterparties that is the more natural entry point. We supply granite, marble and copper concentrate quoted FOB Karachi or CIF to your discharge port, with assay and inspection arranged on request. That can run as a straightforward supply relationship without any equity involvement at all.",
      },
    ],
  },
  {
    slug: "thailand",
    name: "Thailand",
    metaTitle: "Nephrite Jade & Gemstone Supply for Thai Buyers",
    metaDescription:
      "Nephrite jade and quartz from licensed concessions in Gilgit Baltistan, Pakistan, a top export market for Thailand's colored gemstone and jewellery industry.",
    intro:
      "Thailand is a global hub for colored gemstones and finished jewellery, and Thai buyers are already among the primary export markets for Pakistani gems, alongside Sri Lanka, Western Europe and the US. That existing trade relationship is the practical opening for a direct relationship rather than one routed through intermediary traders.",
    context:
      "Our nephrite jade, lifted from the Ghizer valleys, and quartz from our Bagicha concession, are available as raw material direct from source. For a Thai buyer or investor already sourcing rough stone from Myanmar and South Asia, adding a direct Gilgit Baltistan relationship is a supply-diversification move, not a new category to evaluate from scratch.",
    commoditySlugs: ["nephrite-jade", "quartz-silica"],
    faqs: [
      {
        question: "Can you supply rough stone directly, without a trading intermediary?",
        answer:
          "That is the main thing we offer here. Our nephrite jade is lifted from the Ghizer valleys and available as raw boulder or dressed stone straight from the licensed source. Most Thai buyers in this category are used to working through one or more intermediary layers between the mine and the cutting floor, and removing those layers is the practical benefit.",
      },
      {
        question: "Can we inspect material before committing to a bulk order?",
        answer:
          "Yes, and we would expect you to. Sample material is available ahead of any bulk commitment, which is standard practice for rough gemstone buying where colour, clarity and inclusion patterns cannot be assessed from a spec sheet. Shipping is quoted FOB Karachi or CIF to your discharge port.",
      },
      {
        question: "Beyond jade, what else is relevant to a Thai buyer?",
        answer:
          "Our Bagicha concession in Skardu carries ruby gemstones and quartz alongside marble and lithium-bearing indications. Ruby-bearing marble is documented along the same Karakoram belt Bagicha sits in, so for a buyer already sourcing coloured stone from South Asia it is a second category from the same relationship rather than a separate supplier to vet.",
      },
    ],
  },
  {
    slug: "pakistan",
    name: "Pakistan",
    metaTitle: "Mining Investment Opportunities for Pakistani Investors",
    metaDescription:
      "Joint venture, equity and acquisition opportunities in licensed mining concessions across Gilgit Baltistan, open to Pakistani industrial groups, corporate investors and private buyers.",
    intro:
      "Domestic investors skip the one real complication foreign capital has to structure around: mineral titles in Gilgit Baltistan can only be granted to a locally incorporated entity, and a Pakistani company already is one. That removes a step, not the diligence.",
    context:
      "We actively welcome Pakistani industrial groups, corporate investors and private buyers on the same terms as international counterparties, across the same four routes: joint venture, farm-in, equity participation, or outright acquisition of Earth Lux Mines & Minerals, our third registered company, offered for complete acquisition. Local participation also simplifies the incorporation question entirely for any subsequent foreign co-investment.",
    commoditySlugs: [],
    faqs: [
      {
        question: "Do Pakistani investors get different terms to international ones?",
        answer:
          "No. Domestic industrial groups, corporate investors and private buyers are welcomed on the same terms as international counterparties, across the same four routes: joint venture, farm-in, equity participation, or outright acquisition. The difference is procedural, not commercial.",
      },
      {
        question: "What exactly is the procedural advantage?",
        answer:
          "Mineral titles in Gilgit Baltistan can only be granted to a locally incorporated entity. A Pakistani company already satisfies that, so there is no subsidiary to incorporate and no structuring step to work around before a title can sit in the right place. It removes a step from the process. It does not remove any of the due diligence.",
      },
      {
        question: "Can a Pakistani investor co-invest alongside a foreign partner?",
        answer:
          "Yes, and that structure tends to work well precisely because of the incorporation rule. A domestic partner holding the local entity alongside foreign capital resolves the title question cleanly, which is often the first obstacle a foreign investor has to solve. If you are considering this, it is worth raising at the investor desk early.",
      },
    ],
  },
];

export function getMarket(slug: string) {
  return MARKETS.find((m) => m.slug === slug);
}

export function getMarketCommodities(market: Market) {
  return COMMODITIES.filter((c) => market.commoditySlugs.includes(c.slug));
}

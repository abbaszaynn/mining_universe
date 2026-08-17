import { COMMODITIES } from "@/lib/commodities";

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
  },
];

export function getMarket(slug: string) {
  return MARKETS.find((m) => m.slug === slug);
}

export function getMarketCommodities(market: Market) {
  return COMMODITIES.filter((c) => market.commoditySlugs.includes(c.slug));
}

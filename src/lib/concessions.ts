import { companies } from "@/lib/companies-data";

/**
 * Concession pages are built exclusively from `deposits`, never from
 * `locations`. `Deposit` has no `polygon` field — it physically cannot leak a
 * coordinate, unlike `MineLocation`, which the /map page still ships to the
 * client in full. Exact coordinates are disclosed to verified counterparties
 * on request, by email or after an NDA — see docs/SEO-PLAN.md.
 */
export type Concession = {
  slug: string;
  name: string;
  district: string;
  type: string;
  minerals: string[];
  area: string | null;
  licenceNote: string | null;
  companyId: string;
  /** Parent group record. For Durr/Zircon blocks this is the consortium. */
  companyName: string;
  /** The registered entity named on this specific licence. */
  licenceHolder: string;
  companyStatus: "Operational" | "Exploratory Phase";
  /** Stage of this block specifically, not of the company holding it. */
  status: "Operational" | "Exploratory Phase";
  roadAccess: boolean;
  forSale: boolean;
  image: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Loose keyword match onto existing field photography — no new assets needed. */
const IMAGE_RULES: [RegExp, string][] = [
  [/bagicha/i, "/images/ruby-bagicha.jpg"],
  [/gultari/i, "/images/lead-gultari-1.jpg"],
  [/kharmang/i, "/images/mo-1.jpg"],
  // These four previously pointed at /blogs/*.png files that do not exist in
  // public/ (they were lost at some point, leaving four of the ten concession
  // pages rendering a broken image). Repointed at real photography already in
  // the library, matched to each site's actual commodity.
  [/skardu/i, "/images/commodities/gold.webp"],
  [/hilal ?abad/i, "/images/mo-2.jpg"],
  [/shigar/i, "/images/copper-generic-3.jpg"],
  [/gojal/i, "/images/mo-3.jpg"],
  [/ishkoman/i, "/images/nephrite-gupis-1.jpg"],
  [/jutial/i, "/images/lead-jutial-1.jpg"],
  [/gupis/i, "/images/nephrite-gupis-2.jpg"],
];

function pickImage(name: string, location: string) {
  const haystack = `${name} ${location}`;
  const hit = IMAGE_RULES.find(([re]) => re.test(haystack));
  return hit?.[1] ?? "/images/copper-generic-1.jpg";
}

/** "Earth Lux is offered for outright acquisition" — see FAQ on /services. */
const FOR_SALE_COMPANY_IDS = new Set(["earth-lux-mines"]);

const AREA_PATTERN = /^Area:/i;
const LICENCE_PATTERN = /licen[cs]e|application|reconnaissance/i;

export const concessions: Concession[] = companies.flatMap((company) =>
  company.deposits.map((deposit) => {
    const details = deposit.details ?? [];
    const area = details.find((d) => AREA_PATTERN.test(d)) ?? null;
    // Every licence-shaped line, not just the first. Some deposits carry
    // both a stage word ("Exploration License") and other licence-pattern
    // text, and taking only the first left later lines rendering in the
    // minerals list as though they were a mineral.
    const licenceLines = details.filter((d) => LICENCE_PATTERN.test(d));
    const licenceNote = licenceLines.join(", ") || null;
    const minerals = details.filter(
      (d) => d !== area && !licenceLines.includes(d)
    );
    const location = deposit.location ?? "Gilgit Baltistan";

    // The deposit name often repeats its own district ("Gojal Antimony
    // Deposit" under location "Gojal, Hunza") — de-duplicate before joining so
    // slugs read as "gojal-hunza-antimony-deposit", not "...-gojal-antimony-...".
    const locationWords = new Set(
      location.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ")
    );
    const nameWords = deposit.name
      .split(/\s+/)
      .filter((w) => !locationWords.has(w.toLowerCase()));
    const slugSuffix = (nameWords.join(" ") || deposit.name).trim();

    return {
      slug: slugify(`${location}-${slugSuffix}`),
      name: deposit.name,
      district: location,
      type: deposit.type ?? "Mineral Deposit",
      minerals,
      area,
      licenceNote,
      companyId: company.id,
      companyName: company.name,
      // The entity actually named on this licence. Durr and Zircon are merged
      // into one company record, so without this every one of their eight
      // blocks would report the consortium rather than the real holder.
      licenceHolder: deposit.licenceHolder ?? company.name,
      companyStatus: company.status,
      // Per-site stage wins over the parent company's, since one company
      // holds both producing and early-stage ground.
      status: deposit.status ?? company.status,
      roadAccess: deposit.roadAccess ?? false,
      forSale: FOR_SALE_COMPANY_IDS.has(company.id),
      image: pickImage(deposit.name, location),
    };
  })
);

/**
 * The districts our concessions actually sit in, hand-maintained.
 *
 * Not derived from `Concession.district`, because that field is really a
 * location: it holds "Gultari" (which is in Roundu district) and "Hilal Abad"
 * (Kharmang), and each of the ten blocks carries a distinct string, so
 * counting unique values gives ten "districts" rather than seven. It also
 * spells Ghizer two ways, "Ghizar" for Ishkoman and "Ghizer" for Gupis.
 *
 * Both quirks are deliberately left in place: every concession URL slug is
 * built from that string and those pages are indexed, so normalising it would
 * move live URLs to fix something cosmetic. Anything that needs a real
 * district count or list should use this instead.
 */
export const GB_DISTRICTS = [
  "Shigar",
  "Kharmang",
  "Skardu",
  "Gilgit",
  "Ghizer",
  "Hunza",
  "Roundu",
] as const;

export function getConcession(slug: string) {
  return concessions.find((c) => c.slug === slug);
}

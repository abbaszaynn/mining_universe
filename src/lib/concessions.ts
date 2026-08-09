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
  companyName: string;
  companyStatus: "Operational" | "Exploratory Phase";
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
  [/skardu/i, "/blogs/gb_placer_gold.png"],
  [/hilal ?abad/i, "/blogs/hilal_abad_geology.png"],
  [/shigar/i, "/blogs/shigar_geology.png"],
  [/gojal/i, "/blogs/gb_gemstone_mining.png"],
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
    const licenceNote = details.find((d) => LICENCE_PATTERN.test(d)) ?? null;
    const minerals = details.filter((d) => d !== area && d !== licenceNote);
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
      companyStatus: company.status,
      forSale: FOR_SALE_COMPANY_IDS.has(company.id),
      image: pickImage(deposit.name, location),
    };
  })
);

export function getConcession(slug: string) {
  return concessions.find((c) => c.slug === slug);
}

import { concessions } from "@/lib/concessions";

/**
 * The three SECP-registered companies behind GB Mines / Durr & Zircon
 * Consortium, with facts taken from their own certificates of incorporation
 * (public on /documents). Each gets a page at /companies/[slug], so a search
 * for the company's own name lands on a page about that company, and answer
 * engines get one unambiguous record per legal entity.
 *
 * `holder` must match the `licenceHolder` string in companies-data.ts, which
 * is how each company's concessions are pulled in.
 */
export type GroupCompany = {
  slug: string;
  /** Name exactly as it appears on the SECP certificate. */
  legalName: string;
  shortName: string;
  holder: string;
  cuin: string;
  incorporatedOn: string; // ISO date
  incorporatedAt: string;
  certificate: string;
  leadership: { name: string; role: string }[];
  summary: string;
  forSale?: boolean;
};

export const GROUP_COMPANIES: GroupCompany[] = [
  {
    slug: "durr-mines-and-minerals",
    legalName: "Durr Mine & Minerals (Private) Limited",
    shortName: "Durr Mines",
    holder: "Durr Mines and Minerals (PVT) LTD",
    cuin: "0297552",
    incorporatedOn: "2025-06-13",
    incorporatedAt: "Islamabad",
    certificate: "/documents/durr-mines-incorporation-letter.pdf",
    leadership: [
      { name: "Tabish Hassan", role: "Chief Executive Officer" },
      { name: "Daniyal Hassan", role: "Director" },
    ],
    summary:
      "Durr Mines holds the consortium's Baltistan blocks: the producing Bagicha copper and marble concession and the Skardu placer gold riverbed, plus the Gultari polymetallic block and Mahdi Abad in Kharmang at exploration stage.",
  },
  {
    slug: "zircon-mines",
    legalName: "Zircon Mines (Private) Limited",
    shortName: "Zircon Mines",
    holder: "Zircon Mines (PVT) LTD",
    cuin: "0324962",
    incorporatedOn: "2026-01-30",
    incorporatedAt: "Islamabad",
    certificate: "/documents/zircon-mines-incorporation-letter.pdf",
    leadership: [
      { name: "Zain Abbas", role: "Chief Executive Officer & Director" },
      { name: "Tabish Hassan", role: "Director" },
    ],
    summary:
      "Zircon Mines holds the producing Hilal Abad nephrite jade concession in Kharmang, the Shigar block at Askoli, and the antimony ground at Gojal in Hunza and Ishkoman in Ghizer.",
  },
  {
    slug: "earth-lux-mines",
    legalName: "Earth Lux Mines & Minerals (Private) Limited",
    shortName: "Earth Lux Mines",
    holder: "Earth Lux Mines & Minerals (PVT) LTD",
    cuin: "0238137",
    incorporatedOn: "2023-08-28",
    incorporatedAt: "Gilgit",
    certificate: "/documents/earth-lux-incorporation-letter.pdf",
    leadership: [
      { name: "Tabish Hassan", role: "Chief Executive Officer" },
      { name: "Sabih Uddin", role: "Director" },
      { name: "Wajid Khan", role: "Director" },
      { name: "Saqlain Alam", role: "Director" },
    ],
    summary:
      "Earth Lux Mines holds the producing Jutial Nala copper, lead and silver block beside Gilgit city and the Gupis copper, granite and marble block in Ghizer. The company is offered for outright acquisition.",
    forSale: true,
  },
];

export const secpVerifyUrl = (cuin: string) => `https://leap.secp.gov.pk/#/verify-company-info/${cuin}`;

export function getGroupCompany(slug: string) {
  return GROUP_COMPANIES.find((c) => c.slug === slug);
}

export function companyConcessions(company: GroupCompany) {
  return concessions.filter((c) => c.licenceHolder === company.holder);
}

/** Licence-holder string (as on a concession) to its company page path. */
export function companyPathForHolder(holder: string) {
  const c = GROUP_COMPANIES.find((g) => g.holder === holder);
  return c ? `/companies/${c.slug}` : null;
}

export function formatIncorporated(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

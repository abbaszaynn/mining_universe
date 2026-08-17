import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

/**
 * Copy here is deliberately written in trade vocabulary — Incoterms, payment
 * instruments, assay and inspection language — because that is how buyers and
 * JV partners actually phrase their searches. Marketing language does not
 * match those queries. See docs/SEO-PLAN.md, cluster A and B.
 */
const SERVICES = [
  {
    id: "mineral-supply",
    title: "Mineral Supply & Export",
    lead:
      "We supply copper, antimony, lead and quartz concentrates, placer gold, nephrite jade and dimension stone direct from our own concessions, with no intermediary layer between the pit and your purchase order.",
    points: [
      "Quoted FOB Karachi or CIF to your discharge port",
      "Payment against irrevocable L/C at sight, or SBLC for repeat contracts",
      "Third-party assay and SGS pre-shipment inspection arranged on request",
      "Trial shipments accepted before committing to a monthly offtake volume",
    ],
  },
  {
    id: "exploration-licensing",
    title: "Exploration & Licensing",
    lead:
      "We hold exploration licences granted by the Government of Gilgit Baltistan and manage every renewal, NOC and regulatory filing in-house, so a concession you review today is one you can act on tomorrow.",
    points: [
      "Surveyed concession boundaries with published coordinates",
      "Licence status and incorporation records available for verification",
      "Renewals, NOCs and departmental liaison handled internally",
      "New ground pegged and applied for as our survey work extends",
    ],
  },
  {
    id: "joint-ventures",
    title: "Joint Venture & Farm-In",
    lead:
      "We structure joint ventures, farm-in and earn-in arrangements with junior explorers, trading houses and strategic investors seeking early-stage exposure to Pakistani critical minerals.",
    points: [
      "Earn-in against defined exploration spend, or straight equity participation",
      "Consortium structures across our three registered operating companies",
      "Local incorporation guidance, since mineral titles require a Pakistani entity",
      "Data room access under NDA for qualified counterparties",
    ],
  },
  {
    id: "acquisition",
    title: "Outright Sale & 100% Acquisition",
    lead:
      "Partnership is not the only route. Selected concessions are available for outright purchase, including Earth Lux Mines & Minerals, our third registered company, which is offered for complete acquisition. Full positions on other blocks are open to negotiation.",
    points: [
      "Earth Lux Mines & Minerals offered for 100% acquisition",
      "Full equity positions on other concessions open to discussion",
      "Clean transfer with incorporation records and licence documentation",
      "Valuation supported by geological reports and completed work orders",
      "Enquiries welcome from Pakistani and international buyers alike",
    ],
  },
  {
    id: "exploration-for-owners",
    title: "Exploration & Survey for Mine Owners",
    lead:
      "If you already hold a licence in Gilgit Baltistan but lack the team to work it, we will explore and survey it for you. Our in-house geologists carry out the fieldwork, produce the report and deliver samples from your own ground, on contract, at agreed rates.",
    points: [
      "Field exploration and geological mapping of your concession",
      "Topographic and boundary survey with published coordinates",
      "Formal geological report suitable for lenders, buyers or JV partners",
      "Representative sampling from your site, split and sealed for assay",
      "Available to licence holders across Gilgit Baltistan and wider Pakistan",
    ],
  },
  {
    id: "due-diligence",
    title: "Due Diligence & Documentation",
    lead:
      "Every claim we make is backed by a document you can inspect. We maintain incorporation certificates, exploration licences, geological reports, topography maps and community agreements as a standing data room.",
    points: [
      "Certificates of incorporation for each operating company",
      "Government-issued exploration licences and lease documentation",
      "Geological reports and sample assay indications per concession",
      "Signed community and access agreements for every active site",
    ],
  },
  {
    id: "site-visits",
    title: "Guided Site Visits",
    lead:
      "We accompany investors and buyers to active sites across Gilgit Baltistan. Security clearance, permits, transport and accommodation are arranged by us, and your safety is our responsibility from arrival to departure.",
    points: [
      "NOCs and security permissions obtained ahead of travel",
      "Transport from Islamabad or Skardu, and on-site accommodation",
      "Sampling in your presence, with splits sealed for your own assay",
      "Meetings with local leadership and district mining officials",
    ],
  },
  {
    id: "compliance",
    title: "Regulatory & Community Compliance",
    lead:
      "We operate under formal agreement with both the provincial authority and the communities whose valleys we work in. Those are the two approvals that most often stall mining projects in this region.",
    points: [
      "Royalty and departmental reporting kept current",
      "Written community agreements covering access and local employment",
      "Environmental and restoration commitments documented per site",
      "Transparent chain of custody from pit to port",
    ],
  },
];

const FAQS = [
  {
    q: "Can a foreign company own a mining licence in Pakistan?",
    a: "Not directly. Mineral titles in Pakistan can only be granted to a locally incorporated entity, so foreign investors typically participate through a joint venture, a farm-in agreement, or by incorporating a Pakistani subsidiary. We structure and guide either route.",
  },
  {
    q: "What minerals does Durr & Zircon Consortium supply?",
    a: "Copper, antimony, lead and quartz concentrates, placer gold, nephrite jade, granite and dimension stone, with lithium indications at Bagicha. All are extracted from the eight concessions we hold under licence across Gilgit Baltistan.",
  },
  {
    q: "Do you carry out exploration for other mine owners?",
    a: "Yes. If you hold a licence but not a technical team, our geologists will explore and survey your concession on contract: field mapping, boundary survey, a formal geological report and sealed samples from your own ground, at agreed rates.",
  },
  {
    q: "How can an investor participate in your mines?",
    a: "Five routes: a joint venture on a named concession, purchase of equity in the consortium, outright acquisition of a whole mine, direct purchase of raw material or concentrate, or a standing export offtake agreement. Terms are negotiated per concession.",
  },
  {
    q: "Is a whole mine available to buy outright?",
    a: "Yes. Earth Lux Mines & Minerals, our third registered company, is offered for complete acquisition, and 100% positions on other concessions are open to negotiation. Submit an enquiry through the investor desk and we will share the documentation.",
  },
  {
    q: "Do you work with Pakistani investors?",
    a: "Yes. We actively welcome domestic partners, including Pakistani industrial groups, corporate investors and private buyers, on the same terms as international counterparties. Local participation also simplifies mineral title, which must sit with a Pakistani entity.",
  },
  {
    q: "Have you completed exploration work for other clients before?",
    a: "Yes. We hold work orders from previous exploration and survey engagements, available for review by prospective clients. Our team includes professional geologists who carry out the fieldwork, reporting and sampling directly.",
  },
  {
    q: "What payment and shipping terms do you accept?",
    a: "We quote FOB Karachi or CIF to your discharge port. Payment is normally against an irrevocable letter of credit at sight, with SBLC available for established repeat contracts. Trial shipments are accepted before a monthly offtake commitment.",
  },
  {
    q: "Can we visit the mine sites before committing?",
    a: "Yes. We arrange NOCs, security permissions, transport and accommodation, and accompany you throughout. You may take your own samples on site and seal splits for independent assay.",
  },
  {
    q: "How many concessions do you hold and where?",
    a: "Durr & Zircon Consortium holds eight licensed concessions across seven districts of Gilgit Baltistan: Shigar, Kharmang, Skardu, Gilgit, Ghizer, Hunza and Roundu. Earth Lux Mines & Minerals, our third company, holds Jutial Nala and Gupis and is offered for acquisition.",
  },
];

export function ServicesExperience() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Mining and mineral services, Durr & Zircon Consortium",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.title,
          description: s.lead,
          serviceType: s.title,
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Gilgit Baltistan, Pakistan",
          },
          provider: {
            "@type": "Organization",
            name: "Durr & Zircon Consortium",
            url: absoluteUrl("/"),
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />

      <main className="relative bg-bone-50">
        {/* Intro */}
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <Pill>Our services</Pill>
            <h1 className="mt-8 max-w-[20ch] text-display-lg tracking-[-0.035em] text-graphite-950">
              Licensed minerals, supplied and structured.
            </h1>

            {/* Direct-answer block: kept to ~55 words and placed first, which is
                the format answer engines lift as a citation. */}
            <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
              Durr & Zircon Consortium is a licensed mining group operating eight
              concessions across Gilgit Baltistan, Pakistan. We supply copper,
              antimony, lead and quartz concentrates, placer gold, nephrite jade
              and dimension stone to international buyers, and structure joint
              venture and farm-in agreements with investors seeking exposure to
              Pakistani critical minerals.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SquareButton href="/investor-desk" tone="accent">
                Speak with us
              </SquareButton>
              <SquareButton href="/documents" tone="light">
                Review our documentation
              </SquareButton>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="relative overflow-hidden bg-bone-100 py-20 md:py-28">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <ol className="border-t border-graphite-950/12">
              {SERVICES.map((service, i) => (
                <li
                  key={service.id}
                  id={service.id}
                  className="border-b border-graphite-950/12 py-10 md:py-14"
                >
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
                    <div className="flex items-start gap-4">
                      <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center bg-graphite-950 text-xs text-bone-50">
                        {i + 1}
                      </span>
                      <h2 className="text-2xl leading-tight tracking-[-0.02em] text-graphite-950 md:text-[2rem]">
                        {service.title}
                      </h2>
                    </div>

                    <div>
                      <p className="max-w-[58ch] text-base leading-[1.5] text-graphite-500 md:text-lg">
                        {service.lead}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {service.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-[1.5] text-graphite-500 md:text-base"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 bg-copper-500"
                              aria-hidden
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ — question-shaped headings, matched to FAQPage schema above */}
        <section className="relative overflow-hidden bg-bone-50 py-20 md:py-28">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <Pill>Common questions</Pill>
            <h2 className="mt-8 max-w-[22ch] text-display-md tracking-[-0.03em] text-graphite-950">
              What buyers and investors ask us first
            </h2>

            <dl className="mt-12 grid gap-x-16 gap-y-10 border-t border-graphite-950/12 pt-10 lg:grid-cols-2">
              {FAQS.map((faq) => (
                <div key={faq.q}>
                  <dt className="text-lg leading-snug tracking-[-0.01em] text-graphite-950 md:text-xl">
                    {faq.q}
                  </dt>
                  <dd className="mt-3 max-w-[58ch] text-base leading-[1.5] text-graphite-500">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Close */}
        <section className="relative overflow-hidden bg-graphite-950 py-20 md:py-28">
          <GridLines tone="dark" />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <h2 className="max-w-[24ch] text-display-md tracking-[-0.03em] text-bone-50">
              Tell us what you need and we will send the documents.
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-[1.5] text-graphite-300 md:text-lg">
              Whether you are sourcing a monthly tonnage or evaluating an
              exploration asset, the first step is the same: licences,
              geological reports and coordinates, so you can verify before you
              travel.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <SquareButton href="/investor-desk" tone="light">
                Contact the investor desk
              </SquareButton>
              <Link
                href="/map"
                className="text-sm text-graphite-300 underline underline-offset-4 transition-colors duration-base ease-out hover:text-bone-50"
              >
                See where the concessions are
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

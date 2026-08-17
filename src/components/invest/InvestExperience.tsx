import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { FaqSection } from "@/components/faq/FaqSection";
import type { FaqItem } from "@/lib/faq-data";

const ROUTES = [
  {
    title: "Joint venture",
    body: "We structure joint ventures across our three registered operating companies, combining our licence, local incorporation, and field team with your capital and technical resources. Structures are negotiated per concession.",
  },
  {
    title: "Farm-in and earn-in",
    body: "Earn a stake through defined exploration spend rather than an upfront payment. This suits junior exploration companies wanting exposure to early-stage assets without committing full capital before results are in.",
  },
  {
    title: "Equity participation",
    body: "Straight equity in the consortium, rather than a per-concession arrangement, for investors who want exposure across the portfolio instead of a single asset.",
  },
  {
    title: "Outright acquisition",
    body: "Earth Lux Mines & Minerals, our third registered company, is offered for complete acquisition. Full equity positions on other concessions are open to negotiation for the right buyer.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Can a foreign company own a mining licence in Pakistan directly?",
    answer:
      "Not directly. Mineral titles in Gilgit Baltistan, as elsewhere in Pakistan, can only be granted to a locally incorporated entity. Foreign investors typically participate through a joint venture, a farm-in agreement, or by incorporating a Pakistani subsidiary. We structure and guide either route, and this is usually the first question worth resolving before anything else.",
  },
  {
    question: "Is it safe to invest in Gilgit Baltistan?",
    answer:
      "Our concessions operate under formal agreement with both the provincial mining authority and the communities whose valleys we work in, the two approvals that most often stall mining projects in this region. We coordinate NOCs and security permissions for every site visit, and accompany investors throughout.",
  },
  {
    question: "What documentation is shared before an investor commits capital?",
    answer:
      "Incorporation certificates, exploration licences, geological reports, and topography maps are shared directly with verified investors, typically after an NDA, once an enquiry is confirmed through the investor desk. Boundary coordinates are part of that same data room rather than published on public pages.",
  },
  {
    question: "How long does it take to move from first contact to a signed agreement?",
    answer:
      "It varies by structure and by how quickly a counterparty completes their own due diligence. A guided site visit typically happens early in the process, once initial interest and scope are confirmed, so an investor can assess a concession directly before terms are finalized.",
  },
];

export function InvestExperience() {
  return (
    <main className="relative bg-bone-50">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <Pill>Investment opportunity</Pill>
          <h1 className="mt-6 max-w-[24ch] text-display-lg tracking-[-0.035em] text-graphite-950">
            Mining investment in Gilgit Baltistan
          </h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
            Foreign companies cannot hold a mineral title in Pakistan
            directly. Mineral titles can only be granted to a locally
            incorporated entity, so international investors participate
            through a joint venture, a farm-in agreement, or by
            incorporating a Pakistani subsidiary. Durr &amp; Zircon
            Consortium already holds eight licensed concessions across seven
            districts of Gilgit Baltistan, structured, permitted, and open
            to partners on any of the routes below.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <SquareButton href="/investor-desk" tone="accent">
              Speak with the investor desk
            </SquareButton>
            <SquareButton href="/concessions" tone="light">
              Browse concessions
            </SquareButton>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <h2 className="text-display-md tracking-[-0.03em] text-graphite-950">
            Four routes in
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {ROUTES.map((r) => (
              <div key={r.title} className="border-t border-graphite-950/12 pt-6">
                <h3 className="text-lg text-graphite-950">{r.title}</h3>
                <p className="mt-3 text-base leading-[1.5] text-graphite-600">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone-50 py-16 md:py-24">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <div className="max-w-[68ch]">
            <h2 className="text-display-md tracking-[-0.03em] text-graphite-950">
              Why Gilgit Baltistan
            </h2>
            <p className="mt-6 text-base leading-[1.6] text-graphite-600 md:text-lg">
              Gilgit Baltistan covers over 43,000 sq km of mining area, most
              of it still unexplored, with the government offering a
              lighter tax burden in a mine&apos;s early years and cheaper
              electricity as incentives for new entrants. It is also, by our
              own count, a market with very few licensed private operators
              publishing operator-level detail, coordinates, licence
              numbers, area, and access routes, rather than the policy-level
              overviews most public sources cover.
            </p>
            <p className="mt-4 text-base leading-[1.6] text-graphite-600 md:text-lg">
              Explore what we hold by{" "}
              <Link href="/commodities" className="text-copper-600 underline underline-offset-4">
                commodity
              </Link>{" "}
              or by{" "}
              <Link href="/concessions" className="text-copper-600 underline underline-offset-4">
                concession
              </Link>
              , then bring specific questions to the investor desk.
            </p>
          </div>
        </div>
      </section>

      <FaqSection
        items={FAQ_ITEMS}
        title="Investment FAQ"
        subtitle="The questions that come up before capital moves, answered directly."
        id="faq"
      />
    </main>
  );
}

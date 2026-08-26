import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { FaqSection } from "@/components/faq/FaqSection";
import type { FaqItem } from "@/lib/faq-data";

const LICENCE_STAGES = [
  {
    name: "Reconnaissance licence",
    body: "The entry-level title. Covers broad-area reconnaissance survey work, not extraction. Application fee is Rs 15,000 under the Gilgit-Baltistan Mining Concession Rules, 2016.",
  },
  {
    name: "Exploration licence",
    body: "Granted for a defined area once reconnaissance work identifies a target worth pursuing. Covers drilling, sampling, and detailed geological mapping. Application fee is Rs 25,000.",
  },
  {
    name: "Mineral deposit retention licence",
    body: "Holds a defined, already-explored deposit for a holder not yet ready to mine it, so the ground isn't lost while financing or a mining lease application is arranged.",
  },
  {
    name: "Mining lease",
    body: "The production title. Granted once an exploration licence holder has confirmed a workable deposit and is ready to extract. This is the licence type our operational concessions hold.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Can a foreign company hold a mining licence in Pakistan directly?",
    answer:
      "No. Mineral titles under the Gilgit-Baltistan Mining Concession Rules can only be granted to a locally incorporated entity. A foreign investor's practical routes in are a joint venture with an existing licence holder, a farm-in or earn-in agreement, or incorporating a Pakistani subsidiary and applying directly through that entity.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "Under the 2016 rules, the Mines Committee is required to review an application and forward its recommendation to the Licensing Authority within 30 days of receipt. In practice, timelines depend on application volume and whether the area applied for overlaps an existing title.",
  },
  {
    question: "Where do I actually submit an application?",
    answer:
      "As of January 2025, all new mineral title applications in Gilgit-Baltistan are processed through the department's online portal, which first requires registering a company or firm account before a mining lease application can be submitted under it.",
  },
  {
    question: "Is it safe to invest in Gilgit Baltistan?",
    answer:
      "The regulatory framework requires formal agreement with both the provincial mining authority and the local communities whose valleys a concession sits in, which are the two approvals that most often stall mining projects in this region when skipped. Licensed operators coordinate NOCs and security permissions for any field visit.",
  },
];

export function MiningLicenceGuide() {
  return (
    <main className="relative bg-bone-50">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <Pill>Guide</Pill>
          <h1 className="mt-6 max-w-[28ch] text-display-lg tracking-[-0.035em] text-graphite-950">
            How to get a mining licence in Gilgit Baltistan
          </h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
            Mineral titles in Gilgit Baltistan run through four stages,
            reconnaissance, exploration, deposit retention, and mining
            lease, under the Gilgit-Baltistan Mining Concession Rules, 2016
            (amended 2019 and 2024). Foreign companies cannot hold a title
            directly; they need a locally incorporated entity, a joint
            venture, or a farm-in agreement. Here is how the process
            actually works.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <h2 className="text-display-md tracking-[-0.03em] text-graphite-950">
            The four licence stages
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {LICENCE_STAGES.map((s, i) => (
              <div key={s.name} className="border-t border-graphite-950/12 pt-6">
                <span className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                  Stage {i + 1}
                </span>
                <h3 className="mt-2 text-lg text-graphite-950">{s.name}</h3>
                <p className="mt-3 text-base leading-[1.5] text-graphite-600">
                  {s.body}
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
              How to apply
            </h2>
            <p className="mt-6 text-base leading-[1.6] text-graphite-600 md:text-lg">
              As of January 2025, all new mineral title applications are
              processed through the Mines and Minerals Department&apos;s
              online portal. Registering a company or firm account on the
              portal comes first; a mining lease or exploration application
              is then submitted under that registered entity, not as an
              individual. Under the 2016 rules, the Mines Committee has 30
              days to review an application and forward its recommendation
              to the Licensing Authority, though real-world timelines vary
              with application volume and whether the requested area
              overlaps an existing title.
            </p>
            <p className="mt-4 text-base leading-[1.6] text-graphite-600 md:text-lg">
              Fees, exact procedures, and application priority rules change
              periodically, most recently with amendments in 2019 and 2024,
              so treat the figures above as a starting point and confirm
              current requirements directly with the department before
              filing.
            </p>
            <p className="mt-4 text-base leading-[1.6] text-graphite-600 md:text-lg">
              For a foreign investor, the more practical starting point is
              usually not a fresh application at all: it&apos;s partnering
              with an operator who already holds a licence. See our{" "}
              <Link href="/invest" className="text-copper-600 underline underline-offset-4">
                investment routes
              </Link>{" "}
              for how that works in practice.
            </p>
          </div>
          <p className="mt-4 text-base leading-[1.6] text-graphite-600 md:text-lg">
            For the numbers behind the sector, including how much of Gilgit
            Baltistan is actually under licence, see our{" "}
            <Link
              href="/guides/gilgit-baltistan-mining-statistics-2026"
              className="text-copper-600 underline underline-offset-4"
            >
              Gilgit Baltistan mining statistics
            </Link>{" "}
            page.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <SquareButton href="/invest" tone="accent">
              See investment routes
            </SquareButton>
            <SquareButton href="/investor-desk" tone="light">
              Speak with the investor desk
            </SquareButton>
          </div>
        </div>
      </section>

      <FaqSection
        items={FAQ_ITEMS}
        title="Licensing FAQ"
        subtitle="Direct answers on how mineral titles actually work in Gilgit Baltistan."
        id="faq"
      />
    </main>
  );
}

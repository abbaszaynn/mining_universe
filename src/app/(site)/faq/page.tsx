import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { FaqSection } from "@/components/faq/FaqSection";
import { GOS_FAQ_ITEMS } from "@/lib/faq-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Direct answers on Durr & Zircon Consortium's licensed mining concessions in Gilgit Baltistan: how to invest, what documentation is available, foreign ownership rules, and how due diligence and site visits work.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main className="relative bg-bone-50">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <Pill>Investor FAQ</Pill>
          <h1 className="mt-6 max-w-[26ch] text-display-lg tracking-[-0.035em] text-graphite-950">
            Frequently asked questions
          </h1>
          {/* Direct-answer block, kept short, first thing on the page. */}
          <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
            Durr & Zircon Consortium holds eight licensed mining concessions
            across seven districts of Gilgit Baltistan. Foreign investors can
            partner through joint venture, farm-in, equity, or in some cases
            outright acquisition, subject to Pakistan&apos;s mining concession
            rules. The answers below cover how due diligence, documentation,
            and site visits actually work, with more detail available per
            concession and through the investor desk.
          </p>
        </div>
      </section>

      <FaqSection
        items={GOS_FAQ_ITEMS}
        title="Investor FAQ"
        subtitle="Straight answers on licensing, documentation, and how to start a conversation."
        id="faq"
      />
    </main>
  );
}

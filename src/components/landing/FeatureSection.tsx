import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SplitReveal } from "@/components/ui/SplitReveal";

const FEATURES = [
  {
    title: "Open to global investors",
    body: "We welcome partners from every market, with transparent company profiles, verified licences, and direct access to our investor desk.",
  },
  {
    title: "Guided field visits",
    body: "We accompany you to active sites across Gilgit Baltistan. Your safety is our responsibility from arrival through departure.",
  },
  {
    title: "Government clearance handled",
    body: "NOCs, security permissions and regulatory liaison with the authorities are fully managed. You focus on the opportunity.",
  },
];

export function FeatureSection() {
  return (
    <section className="relative overflow-hidden bg-graphite-950 py-24 md:py-36">
      <GridLines tone="dark" />

      <div className="relative mx-auto max-w-[105rem] px-5 md:px-10">
        <Pill tone="onDark">Meeting investors where they are</Pill>

        <SplitReveal
          as="h2"
          lines={["Diligence that fits", "investor reality"]}
          className="mt-8 max-w-[20ch] text-display-lg tracking-[-0.03em] text-bone-50"
        />

        <div className="mt-16 grid gap-px border-t border-white/10 md:mt-24 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="border-b border-white/10 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0"
            >
              <h3 className="text-2xl leading-[1.15] tracking-[-0.02em] text-bone-50 md:text-[1.75rem]">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-base leading-[1.45] text-graphite-300">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

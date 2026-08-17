import { InvestExperience } from "@/components/invest/InvestExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Mining Investment in Gilgit Baltistan",
  description:
    "Joint venture, farm-in, equity participation, or outright acquisition. Foreign investors partner with Durr & Zircon Consortium's ten licensed mining concessions across Gilgit Baltistan, Pakistan.",
  path: "/invest",
});

export default function InvestPage() {
  return <InvestExperience />;
}

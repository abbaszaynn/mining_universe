import { ConcessionsIndex } from "@/components/concessions/ConcessionsIndex";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Licensed Mining Concessions — Gilgit Baltistan",
  description:
    "Ten licensed mining concessions across seven districts of Gilgit Baltistan, held by Durr & Zircon Consortium and Earth Lux Mines & Minerals. Copper, antimony, lead, gold, nephrite jade and granite.",
  path: "/concessions",
});

export default function ConcessionsPage() {
  return <ConcessionsIndex />;
}

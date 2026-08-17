import { CommoditiesIndex } from "@/components/commodities/CommoditiesIndex";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Commodities: Copper, Antimony, Gold, Lead & More",
  description:
    "Copper concentrate, antimony, placer gold, lead, nephrite jade, quartz and granite supplied direct from licensed concessions in Gilgit Baltistan, Pakistan. FOB Karachi or CIF.",
  path: "/commodities",
});

export default function CommoditiesPage() {
  return <CommoditiesIndex />;
}

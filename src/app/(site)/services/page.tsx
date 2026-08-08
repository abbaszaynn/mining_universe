import { ServicesExperience } from "@/components/services/ServicesExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  // Kept short so the rendered title stays inside Google's ~60-char display
  // once the " | Durr & Zircon" suffix is appended.
  title: "Mineral Supply, JV & Exploration Services",
  description:
    "Licensed mining services in Gilgit Baltistan, Pakistan. Copper, antimony, lead and quartz concentrate supply FOB Karachi or CIF, joint venture and farm-in structuring, and contract exploration, survey and sampling for mine owners.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesExperience />;
}

import { MiningCompaniesGuide } from "@/components/guides/MiningCompaniesGuide";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Mining Companies in Gilgit Baltistan: Licensed Operators & Title Holders",
  description:
    "How private mining companies in Gilgit Baltistan are licensed, how to verify a mining lease or exploration title holder, and the ten licensed concessions held by Durr & Zircon Consortium and Earth Lux Mines across seven districts.",
  path: "/guides/mining-companies-gilgit-baltistan",
});

export default function MiningCompaniesGilgitBaltistanPage() {
  return <MiningCompaniesGuide />;
}

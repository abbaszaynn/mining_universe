import { MiningCompaniesGuide } from "@/components/guides/MiningCompaniesGuide";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Mining Companies in Gilgit Baltistan & Pakistan",
  description:
    "Top mining companies in Gilgit Baltistan and Pakistan: who holds licences, the major national operators, how to verify a title holder, and the three SECP-registered companies of GB Mines.",
  path: "/guides/mining-companies-gilgit-baltistan",
});

export default function MiningCompaniesGilgitBaltistanPage() {
  return <MiningCompaniesGuide />;
}

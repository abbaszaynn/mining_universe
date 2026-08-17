import { MiningLicenceGuide } from "@/components/guides/MiningLicenceGuide";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "How to Get a Mining Licence in Gilgit Baltistan",
  description:
    "The four mineral title stages under the Gilgit-Baltistan Mining Concession Rules, how the online application process works, and how foreign investors can participate without holding a licence directly.",
  path: "/guides/mining-licence-gilgit-baltistan",
});

export default function MiningLicenceGuidePage() {
  return <MiningLicenceGuide />;
}

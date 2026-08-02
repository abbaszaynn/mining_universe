import { AboutExperience } from "@/components/about/AboutExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us | Durr & Zircon Mines Consortium",
  description:
    "A unified force in resource extraction across Gilgit Baltistan. Durr & Zircon Mines Consortium harnesses unparalleled geological expertise to bring the most sought-after minerals to the global market.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutExperience />;
}

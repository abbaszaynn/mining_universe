import { getGalleryImages } from "@/lib/data";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Specimens, landscapes and field photography from the licensed concessions of Durr & Zircon Consortium across Gilgit Baltistan — copper, antimony, gold, nephrite and polymetallic assets.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return <GalleryExperience images={images} />;
}

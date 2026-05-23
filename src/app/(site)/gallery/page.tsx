import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/data";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";

export const metadata: Metadata = {
  title: "Gallery | GOS",
  description:
    "Multimedia gallery of specimens, landscapes, and field photography from Game of Stones mining operators in Gilgit Baltistan.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return <GalleryExperience images={images} />;
}

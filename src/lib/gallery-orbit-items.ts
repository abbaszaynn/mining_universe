import { galleryImages } from "@/lib/gallery-images-data";

export type OrbitMediaItem = {
  id: string;
  kind: "image";
  src: string;
  title: string;
};

/** Five varied specimens — six tiles total with cover (matches original ring spacing) */
const ORBIT_SPECIMEN_IDS = [
  "gal-mo-1",
  "gal-ruby-bagicha",
  "gal-lithium-bagicha",
  "gal-copper-hilalabad",
  "gal-qz-3",
] as const;

function specimenToOrbitItem(id: string): OrbitMediaItem | null {
  const image = galleryImages.find((entry) => entry.id === id);
  if (!image) return null;
  return {
    id: image.id,
    kind: "image",
    src: image.url,
    title: image.mineral ?? image.title,
  };
}

/** Cover + five specimens — six tiles, evenly spaced on the ring */
export const ORBIT_GALLERY_ITEMS: OrbitMediaItem[] = [
  {
    id: "cover",
    kind: "image",
    src: "/images/cover_photo.jpg",
    title: "The Game of Stones",
  },
  ...ORBIT_SPECIMEN_IDS.map(specimenToOrbitItem).filter(
    (item): item is OrbitMediaItem => item !== null
  ),
];

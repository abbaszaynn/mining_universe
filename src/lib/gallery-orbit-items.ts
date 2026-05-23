export type OrbitMediaItem = {
  id: string;
  kind: "image";
  src: string;
  title: string;
};

/** Curated subset for the homepage circular gallery */
export const ORBIT_GALLERY_ITEMS: OrbitMediaItem[] = [
  {
    id: "cover",
    kind: "image",
    src: "/images/cover_photo.png",
    title: "The Game of Stones",
  },
  {
    id: "shigar",
    kind: "image",
    src: "/blogs/shigar_geology.png",
    title: "Shigar Valley geology",
  },
  {
    id: "hilal-abad",
    kind: "image",
    src: "/blogs/hilal_abad_geology.png",
    title: "Hilal Abad landscape",
  },
  {
    id: "copper-region",
    kind: "image",
    src: "/blogs/gb_copper_mining.png",
    title: "Copper belt, Gilgit Baltistan",
  },
  {
    id: "placer-gold",
    kind: "image",
    src: "/blogs/gb_placer_gold.png",
    title: "Placer gold rivers",
  },
  {
    id: "nephrite",
    kind: "image",
    src: "/images/nephrite-1.jpg",
    title: "Nephrite specimen",
  },
  {
    id: "ruby-bagicha",
    kind: "image",
    src: "/images/ruby-bagicha.jpg",
    title: "Ruby, Bagicha",
  },
  {
    id: "lithium",
    kind: "image",
    src: "/images/lithium-bagicha.jpg",
    title: "Lithium ore, Bagicha",
  },
];

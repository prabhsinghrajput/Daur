export interface ActiveProduct {
  id: number;
  index: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  material: string;
  color: string;
  isNew: boolean;
  isBestseller: boolean;
  heroImage: string;
  thumbImage: string;
  accentColor: string;
  gsm?: number;
  fit?: string;
}

export const activeProducts: ActiveProduct[] = [
  {
    id: 1,
    index: "01",
    category: "DAUR ACTIVE",
    name: "Architectural Shell",
    tagline: "Performance through restraint.",
    description: "A lightweight technical outer layer designed with architectural precision. Features moisture-wicking properties and a structured silhouette.",
    price: "€ 450",
    material: "Technical Silk-Poly",
    color: "Charcoal Grey",
    isNew: true,
    isBestseller: true,
    heroImage: "/images/active/hero.png",
    thumbImage: "/images/active/hero.png",
    accentColor: "#333333",
    gsm: 180,
    fit: "Structured Fit"
  },
  {
    id: 2,
    index: "02",
    category: "DAUR ACTIVE",
    name: "Quiet Luxury Hoodie",
    tagline: "Emotionally quiet, visually bold.",
    description: "An oversized essential that redefines the hoodie through premium heavyweight fabric and minimal detailing. The ultimate in understated confidence.",
    price: "€ 220",
    material: "Heavyweight Jersey",
    color: "Soft Gray",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/active/silhouette.png",
    thumbImage: "/images/active/silhouette.png",
    accentColor: "#808080",
    gsm: 450,
    fit: "Oversized Silhouette"
  },
  {
    id: 3,
    index: "03",
    category: "DAUR ACTIVE",
    name: "Performance Set",
    tagline: "Breathable luxury for movement.",
    description: "A coordinated set designed for both high performance and everyday wear. Features spacious tracking in every thread for maximum breathability.",
    price: "€ 380",
    material: "Tech Mesh Blend",
    color: "Bone White",
    isNew: false,
    isBestseller: true,
    heroImage: "/images/active/fabric.png",
    thumbImage: "/images/active/fabric.png",
    accentColor: "#f2f2f2",
    gsm: 220,
    fit: "Relaxed Performance"
  },
  {
    id: 4,
    index: "04",
    category: "DAUR ACTIVE",
    name: "Amber Essential Tee",
    tagline: "The commercial core of Active.",
    description: "A premium basic featuring our signature muted amber accent. Designed for the architectural demands of modern life.",
    price: "€ 140",
    material: "Premium Pima Cotton",
    color: "Muted Amber",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/active/hero.png",
    thumbImage: "/images/active/hero.png",
    accentColor: "#c99a5c",
    gsm: 280,
    fit: "Boxy Essentials Fit"
  }
];

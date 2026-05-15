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
  washCare?: string;
}


export const activeProducts: ActiveProduct[] = [
  {
    id: 101,
    index: "01",
    category: "DAUR ACTIVE",
    name: "Onyx Performance Shell",
    tagline: "Precision in every thread.",
    description: "A high-performance technical shell featuring water-resistant fabric and an ergonomic silhouette designed for movement.",
    price: "₹ 5999",
    material: "Technical Silk-Poly",
    color: "Onyx Black",
    isNew: true,
    isBestseller: true,
    heroImage: "/images/active/active7.png",
    thumbImage: "/images/active/active7.png",
    accentColor: "#1a1a18",
    gsm: 180,
    fit: "Athletic Fit"
  },
  {
    id: 102,
    index: "02",
    category: "DAUR ACTIVE",
    name: "Slate Utility Hood",
    tagline: "Architecture for the body.",
    description: "A heavyweight utility hoodie with reinforced seams and a structural hood, blending luxury aesthetics with athletic performance.",
    price: "₹ 5999",
    material: "Heavyweight Jersey",
    color: "Slate Grey",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/active/active2.png",
    thumbImage: "/images/active/active2.png",
    accentColor: "#4a4a4a",
    gsm: 450,
    fit: "Oversized Silhouette"
  },
  {
    id: 103,
    index: "03",
    category: "DAUR ACTIVE",
    name: "Cobalt Tech Tee",
    tagline: "Cooling tech, luxury feel.",
    description: "Engineered with breathable mesh panels and moisture-wicking technology. The ultimate base layer for high-intensity movement.",
    price: "₹ 5999",
    material: "Tech Mesh Blend",
    color: "Deep Cobalt",
    isNew: false,
    isBestseller: true,
    heroImage: "/images/active/active3.png",
    thumbImage: "/images/active/active3.png",
    accentColor: "#1e3a8a",
    gsm: 220,
    fit: "Breathable Fit"
  },
  {
    id: 104,
    index: "04",
    category: "DAUR ACTIVE",
    name: "Crimson Aero Jacket",
    tagline: "Defy the elements.",
    description: "Ultra-lightweight aerodynamic jacket designed for speed. Features laser-cut ventilation and reflective branding for visibility.",
    price: "₹ 5999",
    material: "Aero-Nylon",
    color: "Racing Red",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/active/active4.png",
    thumbImage: "/images/active/active4.png",
    accentColor: "#991b1b",
    gsm: 120,
    fit: "Aero Fit"
  },
  {
    id: 105,
    index: "05",
    category: "DAUR ACTIVE",
    name: "Sandstorm Cargo Pants",
    tagline: "Utility redefined.",
    description: "Technical cargo pants with modular pocket systems and adjustable hemlines. Built for the modern explorer.",
    price: "₹ 5999",
    material: "Ripstop Canvas",
    color: "Sandstorm Beige",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/active/active5.png",
    thumbImage: "/images/active/active5.png",
    accentColor: "#d6d3d1",
    gsm: 320,
    fit: "Modular Utility Fit"
  },
  {
    id: 106,
    index: "06",
    category: "DAUR ACTIVE",
    name: "Summit Compression",
    tagline: "Unlock your peak performance.",
    description: "High-compression base layer that improves blood flow and reduces fatigue. Designed with seamless tech for zero friction.",
    price: "₹ 5999",
    material: "Seamless Compression Knit",
    color: "Midnight Blue",
    isNew: false,
    isBestseller: true,
    heroImage: "/images/active/active6.png",
    thumbImage: "/images/active/active6.png",
    accentColor: "#1e1b4b",
    gsm: 250,
    fit: "Compression Fit"
  }
];


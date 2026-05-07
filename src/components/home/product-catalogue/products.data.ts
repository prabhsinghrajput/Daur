export interface Product {
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

export const products: Product[] = [
  {
    id: 1,
    index: "01",
    category: "T-SHIRTS",
    name: "Royal Amethyst Tee",
    tagline: "Elevated everyday essential.",
    description: "This purple t-shirt brings a touch of luxury to your daily rotation. The soft, garment-dyed finish ensures lasting color and unmatched comfort.",
    price: "€ 130",
    material: "100% Organic Cotton",
    color: "Amethyst Purple",
    isNew: true,
    isBestseller: true,
    heroImage: "/Purple.png",
    thumbImage: "/Purple.png",
    accentColor: "#5e3a8c",
    gsm: 240,
    fit: "Oversized Fit",
    washCare: "Machine wash cold, air dry recommended."
  },
  {
    id: 2,
    index: "02",
    category: "T-SHIRTS",
    name: "Ruby Sunset Tee",
    tagline: "Vibrant energy meets soft drape.",
    description: "Infuse your style with a pop of bright red. This t-shirt is designed for a flattering fit, offering both standout color and exceptional softness.",
    price: "€ 125",
    material: "100% Organic Cotton",
    color: "Ruby Red",
    isNew: false,
    isBestseller: true,
    heroImage: "/red.png",
    thumbImage: "/red.png",
    accentColor: "#b22222",
    gsm: 220,
    fit: "Relaxed Fit",
    washCare: "Hand wash preferred for longevity."
  },
  {
    id: 3,
    index: "03",
    category: "T-SHIRTS",
    name: "Golden Aura Tee",
    tagline: "Warmth and brilliance in every thread.",
    description: "A bright yellow tee that brings sunshine to your wardrobe. Perfect for casual outings, featuring a breathable knit that keeps you cool all day.",
    price: "€ 115",
    material: "Pima Cotton Blend",
    color: "Golden Yellow",
    isNew: true,
    isBestseller: false,
    heroImage: "/yellow.png",
    thumbImage: "/yellow.png",
    accentColor: "#d4af37",
    gsm: 200,
    fit: "Regular Fit",
    washCare: "Machine wash delicate."
  },
  {
    id: 4,
    index: "04",
    category: "T-SHIRTS",
    name: "Midnight Onyx Tee",
    tagline: "Timeless depth in a classic silhouette.",
    description: "The Midnight Onyx Tee is the ultimate wardrobe foundation. Crafted with a dense yet breathable weave, it offers a sharp look that never fades.",
    price: "€ 140",
    material: "100% Supima Cotton",
    color: "Onyx Black",
    isNew: true,
    isBestseller: true,
    heroImage: "/black.png",
    thumbImage: "/black.png",
    accentColor: "#1a1a1a",
    gsm: 280,
    fit: "Boxy Heavyweight Fit",
    washCare: "Cold wash only."
  },
  {
    id: 5,
    index: "05",
    category: "T-SHIRTS",
    name: "Azure Horizon Tee",
    tagline: "Serenity captured in every fiber.",
    description: "A calming shade of blue that evokes the clarity of a summer sky. This tee features a relaxed drape and a silky-smooth texture for all-day ease.",
    price: "€ 120",
    material: "Organic Cotton Jersey",
    color: "Azure Blue",
    isNew: false,
    isBestseller: false,
    heroImage: "/blue.png",
    thumbImage: "/blue.png",
    accentColor: "#0047ab",
    gsm: 210,
    fit: "Fluid Relaxed Fit",
    washCare: "Machine wash cold."
  }
];

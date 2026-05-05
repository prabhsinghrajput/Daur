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
}

export const products: Product[] = [
  {
    id: 1,
    index: "01",
    category: "OUTERWEAR",
    name: "The Siberian Cocoon Coat",
    tagline: "Enveloping warmth, reimagined.",
    description: "Cut from double-faced wool in a deliberately oversized silhouette, this coat moves with the body while commanding every room. The raw hem and dropped shoulder are a study in effortless authority.",
    price: "€ 2,450",
    material: "Double-Faced Merino Wool",
    color: "Midnight Mink",
    isNew: true,
    isBestseller: false,
    heroImage: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200",
    thumbImage: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
    accentColor: "#8b7355"
  },
  {
    id: 2,
    index: "02",
    category: "KNITWEAR",
    name: "Sculpted Rib Turtleneck",
    tagline: "Architecture you can wear.",
    description: "A tightly ribbed column of cashmere that moves from neck to hip in one unbroken intention. The weight is substantial. The feel, second-skin.",
    price: "€ 1,200",
    material: "100% Grade-A Cashmere",
    color: "Chalk",
    isNew: false,
    isBestseller: true,
    heroImage: "https://images.pexels.com/photos/2916814/pexels-photo-2916814.jpeg?auto=compress&cs=tinysrgb&w=1200",
    thumbImage: "https://images.pexels.com/photos/2916814/pexels-photo-2916814.jpeg?auto=compress&cs=tinysrgb&w=400",
    accentColor: "#c9a87c"
  },
  {
    id: 3,
    index: "03",
    category: "ACCESSORIES",
    name: "Geometric Handbag",
    tagline: "Structured elegance.",
    description: "Crafted from Italian calfskin, this handbag features sharp angles and minimalist hardware. It seamlessly transitions from day to evening wear.",
    price: "€ 1,450",
    material: "Italian Calfskin Leather",
    color: "Onyx Black",
    isNew: true,
    isBestseller: true,
    heroImage: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200",
    thumbImage: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
    accentColor: "#4a4a4a"
  },
  {
    id: 4,
    index: "04",
    category: "BOTTOMS",
    name: "High-Waisted Trousers",
    tagline: "Fluid movement, sharp tailoring.",
    description: "Wide-leg trousers with front pleats that elongate the silhouette. Designed for comfort without sacrificing sophisticated edge.",
    price: "€ 750",
    material: "Wool Crepe",
    color: "Sand",
    isNew: false,
    isBestseller: false,
    heroImage: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1200",
    thumbImage: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=400",
    accentColor: "#b5a99a"
  },
  {
    id: 5,
    index: "05",
    category: "DRESSES",
    name: "Silk Draped Dress",
    tagline: "Effortless evening wear.",
    description: "A bias-cut silk slip dress that flatters the natural curves. Features a delicate cowl neck and an alluring low back.",
    price: "€ 1,850",
    material: "100% Mulberry Silk",
    color: "Crimson",
    isNew: true,
    isBestseller: false,
    heroImage: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200",
    thumbImage: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400",
    accentColor: "#8b2a2a"
  },
  {
    id: 6,
    index: "06",
    category: "KNITWEAR",
    name: "V-Neck Cashmere",
    tagline: "The essential layer.",
    description: "A lightweight cashmere sweater designed for versatility. The perfect V-neck depth for layering or wearing on its own.",
    price: "€ 890",
    material: "Cashmere Blend",
    color: "Camel",
    isNew: false,
    isBestseller: true,
    heroImage: "https://images.pexels.com/photos/11007874/pexels-photo-11007874.jpeg?auto=compress&cs=tinysrgb&w=1200",
    thumbImage: "https://images.pexels.com/photos/11007874/pexels-photo-11007874.jpeg?auto=compress&cs=tinysrgb&w=400",
    accentColor: "#c19a6b"
  }
];

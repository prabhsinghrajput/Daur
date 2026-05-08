export interface LabsProduct {
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

export const labsProducts: LabsProduct[] = [
  {
    id: 101,
    index: "L1",
    category: "DAUR LABS",
    name: "Prototype Alpha Shell",
    tagline: "Experimental structural shell.",
    description: "A liquid-repellent prototype shell featuring modular attachments and a futuristic translucent finish. Engineered for extreme environments.",
    price: "€ 850",
    material: "Polymer-Coated Nylon",
    color: "Iridescent Silver",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/labs/hero.png",
    thumbImage: "/images/labs/hero.png",
    accentColor: "#a0a0a0"
  },
  {
    id: 102,
    index: "L2",
    category: "DAUR LABS",
    name: "Magnetic Utility Vest",
    tagline: "Modular cargo expansion.",
    description: "A laser-cut utility vest with magnetic Fidlock closures. Designed for the urban explorer who demands modularity and precision.",
    price: "€ 520",
    material: "Cordura Mesh",
    color: "Matte Black",
    isNew: true,
    isBestseller: true,
    heroImage: "/images/labs/detail.png",
    thumbImage: "/images/labs/detail.png",
    accentColor: "#1a1a1a"
  },
  {
    id: 103,
    index: "L3",
    category: "DAUR LABS",
    name: "Kinetic Trousers",
    tagline: "Articulated for movement.",
    description: "Multi-panelled trousers with articulated knee joints and hidden ventilation systems. A masterclass in ergonomic techwear design.",
    price: "€ 480",
    material: "Four-way Stretch Tech",
    color: "Obsidian",
    isNew: false,
    isBestseller: true,
    heroImage: "/images/labs/hero.png",
    thumbImage: "/images/labs/hero.png",
    accentColor: "#0c0c0c"
  },
  {
    id: 104,
    index: "L4",
    category: "DAUR LABS",
    name: "Neural Knit Pullover",
    tagline: "3D-printed texture mapping.",
    description: "A seamless pullover featuring a complex 3D-knit pattern inspired by neural networks. Provides targeted compression and heat regulation.",
    price: "€ 340",
    material: "Bionic Yarn",
    color: "Cyber Blue",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/labs/detail.png",
    thumbImage: "/images/labs/detail.png",
    accentColor: "#003366"
  }
];

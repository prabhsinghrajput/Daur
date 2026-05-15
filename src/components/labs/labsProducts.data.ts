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
  gsm?: number;
  fit?: string;
  washCare?: string;
}


export const labsProducts: LabsProduct[] = [
  {
    id: 201,
    index: "L1",
    category: "DAUR LABS",
    name: "Hyper-Textured Pullover",
    tagline: "Experimental 3D-knit topology.",
    description: "A celebration of fluidity and structure. Our latest collection explores the intersection of organic textures and architectural silhouettes.",
    price: "₹ 5999",
    material: "3D Bionic Yarn",
    color: "Shadow Grey",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/labs/lab7.png",
    thumbImage: "/images/labs/lab7.png",
    accentColor: "#4a4a4a"
  },
  {
    id: 202,
    index: "L2",
    category: "DAUR LABS",
    name: "Monolithic Outerwear",
    tagline: "Architectural construction.",
    description: "A celebration of fluidity and structure. Our latest collection explores the intersection of organic textures and architectural silhouettes.",
    price: "₹ 5999",
    material: "Nanotech Shell",
    color: "Obsidian Black",
    isNew: true,
    isBestseller: true,
    heroImage: "/images/labs/lab2.png",
    thumbImage: "/images/labs/lab2.png",
    accentColor: "#1a1a1a"
  },
  {
    id: 203,
    index: "L3",
    category: "DAUR LABS",
    name: "Fractal Cargo System",
    tagline: "Recursive pocket architecture.",
    description: "A celebration of fluidity and structure. Our latest collection explores the intersection of organic textures and architectural silhouettes.",
    price: "₹ 5999",
    material: "Reinforced Ripstop",
    color: "Graphite",
    isNew: false,
    isBestseller: true,
    heroImage: "/images/labs/lab3.png",
    thumbImage: "/images/labs/lab3.png",
    accentColor: "#2d2d2d"
  },
  {
    id: 204,
    index: "L4",
    category: "DAUR LABS",
    name: "Bionic Shell V1",
    tagline: "Kinetic articulation joints.",
    description: "A celebration of fluidity and structure. Our latest collection explores the intersection of organic textures and architectural silhouettes.",
    price: "₹ 5999",
    material: "Four-way Stretch Membrane",
    color: "Slate",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/labs/lab4.png",
    thumbImage: "/images/labs/lab4.png",
    accentColor: "#3c3c3c"
  },
  {
    id: 205,
    index: "L5",
    category: "DAUR LABS",
    name: "Neural Base Layer",
    tagline: "Biometric sensory feedback.",
    description: "A celebration of fluidity and structure. Our latest collection explores the intersection of organic textures and architectural silhouettes.",
    price: "₹ 5999",
    material: "Compressive Tech Knit",
    color: "Deep Sea",
    isNew: true,
    isBestseller: false,
    heroImage: "/images/labs/lab5.png",
    thumbImage: "/images/labs/lab5.png",
    accentColor: "#002a3d"
  },
  {
    id: 206,
    index: "L6",
    category: "DAUR LABS",
    name: "Aether Tech Jacket",
    tagline: "Atmospheric protection.",
    description: "A celebration of fluidity and structure. Our latest collection explores the intersection of organic textures and architectural silhouettes.",
    price: "₹ 5999",
    material: "Aerogel-Infused Nylon",
    color: "Arctic White",
    isNew: true,
    isBestseller: true,
    heroImage: "/images/labs/lab6.png",
    thumbImage: "/images/labs/lab6.png",
    accentColor: "#f0f0f0"
  }
];

export type ProductVariant = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  guarantee?: string;
  badge?: string;
  image?: string;
  variants?: ProductVariant[];
};

export const products: Product[] = [
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    category: "Inteligencia Artificial",
    description: "Gemini Pro — suscripción por 18 meses.",
    price: 20,
    duration: "18 meses",
    badge: "Promoción",
    image: "/gemini-pro.png",
  },
  {
    id: "canva-pro",
    name: "Canva Edu",
    category: "Diseño",
    description: "Canva Edu — suscripción por 12 meses por invitación por correo.",
    price: 8,
    duration: "12 meses",
    guarantee: "12 meses",
    badge: "Promoción",
    image: "/canva-pro-45-dias.jpg",
  },
  {
    id: "capcut-pro",
    name: "CapCut Pro",
    category: "Edición de Videos",
    description: "CapCut Pro — suscripción por 1 mes.",
    price: 18,
    duration: "1 mes",
    badge: "Promoción",
    image: "/capcut-pro.png",
  },
  {
    id: "youtube-promocion",
    name: "YOUTUBE - PROMOCIÓN",
    category: "Promoción YouTube",
    description: "Elige el paquete de promoción para YouTube que prefieras.",
    price: 20,
    duration: "Paquete de promoción",
    badge: "Promoción",
    image: "/youtube-promocion.png",
    variants: [
      { id: "100", label: "Paquete 100", price: 20 },
      { id: "200", label: "Paquete 200", price: 35 },
      { id: "300", label: "Paquete 300", price: 52 },
      { id: "500", label: "Paquete 500", price: 80 },
      { id: "1000", label: "Paquete 1000", price: 125 },
    ],
  },
  {
    id: "productividad-plus",
    name: "Productividad Plus",
    category: "Productividad",
    description: "Producto de demostración listo para ser reemplazado por una licencia autorizada real.",
    price: 24.9,
    duration: "1 mes",
  },
];

export const categories = [
  "Inteligencia Artificial",
  "Diseño",
  "Productividad",
  "Edición de Videos",
  "Promoción YouTube",
  "Educación",
  "Otros",
];

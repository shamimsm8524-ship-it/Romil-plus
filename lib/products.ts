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
  },
  {
    id: "canva-pro",
    name: "Canva Edu",
    category: "Diseño",
    description: "Canva Edu — suscripción por 12 meses.",
    price: 8,
    duration: "12 meses",
    guarantee: "12 meses",
    badge: "Promoción",
    image: "/canva-pro-45-dias.jpg",
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
  "Video",
  "Educación",
  "Otros",
];

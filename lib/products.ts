export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "gemini-advanced",
    name: "Gemini Advanced",
    category: "Inteligencia Artificial",
    description: "Acceso digital autorizado para potenciar investigación, escritura y productividad.",
    price: 39.9,
    duration: "1 mes",
    badge: "Popular",
  },
  {
    id: "canva-pro",
    name: "Canva Pro",
    category: "Diseño",
    description: "Herramientas premium para crear diseños, presentaciones y contenido visual.",
    price: 29.9,
    duration: "1 mes",
    badge: "Recomendado",
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

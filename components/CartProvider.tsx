"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

type CartContextValue = {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("romil-plus-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // Si el almacenamiento falla, el carrito sigue funcionando en memoria.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("romil-plus-cart", JSON.stringify(items));
    } catch {
      // El carrito sigue funcionando aunque el navegador bloquee localStorage.
    }
  }, [items, loaded]);

  const value = useMemo(() => ({
    items,
    add: (product: Product) => setItems((current) => [
      ...current,
      {
        ...product,
        id: `${product.id}-cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      },
    ]),
    remove: (id: string) => setItems((current) => current.filter((item) => item.id !== id)),
    clear: () => setItems([]),
    total: items.reduce((sum, item) => sum + item.price, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { supabase } from "@/lib/supabase";

type CartContextValue = {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const GUEST_CART_KEY = "romil-plus-cart-guest";
const cartKeyForUser = (userId: string) => `romil-plus-cart-user-${userId}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [storageKey, setStorageKey] = useState(GUEST_CART_KEY);
  const [loaded, setLoaded] = useState(false);

  const loadCart = (key: string) => {
    try {
      const saved = localStorage.getItem(key);
      setItems(saved ? JSON.parse(saved) : []);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      let key = GUEST_CART_KEY;
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user.id) key = cartKeyForUser(data.session.user.id);
      }

      if (!active) return;
      setStorageKey(key);
      loadCart(key);
      setLoaded(true);
    };

    initialize();

    if (!supabase) return () => { active = false; };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      const nextKey = session?.user.id
        ? cartKeyForUser(session.user.id)
        : GUEST_CART_KEY;

      setStorageKey(nextKey);
      loadCart(nextKey);
      setLoaded(true);
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // El carrito sigue funcionando aunque el navegador bloquee localStorage.
    }
  }, [items, loaded, storageKey]);

  const clear = () => {
    setItems([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // El carrito igualmente queda vacío en memoria.
    }
  };

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
    clear,
    total: items.reduce((sum, item) => sum + item.price, 0),
  }), [items, storageKey]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}

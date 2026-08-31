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

function readCart(key: string): Product[] {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function writeCart(key: string, items: Product[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // El carrito sigue funcionando en memoria si localStorage no está disponible.
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [storageKey, setStorageKey] = useState(GUEST_CART_KEY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    const switchCart = (key: string) => {
      if (!active) return;
      setStorageKey(key);
      setItems(readCart(key));
      setLoaded(true);
    };

    const initialize = async () => {
      let key = GUEST_CART_KEY;
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user.id) key = cartKeyForUser(data.session.user.id);
      }
      switchCart(key);
    };

    initialize();

    if (!supabase) return () => { active = false; };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextKey = session?.user.id
        ? cartKeyForUser(session.user.id)
        : GUEST_CART_KEY;
      switchCart(nextKey);
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const add = (product: Product) => {
    if (!loaded) return;
    setItems((current) => {
      const next = [
        ...current,
        {
          ...product,
          id: `${product.id}-cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        },
      ];
      writeCart(storageKey, next);
      return next;
    });
  };

  const remove = (id: string) => {
    if (!loaded) return;
    setItems((current) => {
      const next = current.filter((item) => item.id !== id);
      writeCart(storageKey, next);
      return next;
    });
  };

  const clear = () => {
    if (!loaded) return;
    setItems([]);
    writeCart(storageKey, []);
  };

  const value = useMemo(() => ({
    items,
    add,
    remove,
    clear,
    total: items.reduce((sum, item) => sum + item.price, 0),
  }), [items, storageKey, loaded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}

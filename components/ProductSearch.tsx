"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export function ProductSearch() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      [product.name, product.category, product.description, product.duration]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [query]);

  return (
    <>
      <div className="mx-auto mt-6 w-full max-w-[760px] md:mt-5">
        <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 shadow-[0_12px_32px_rgba(0,0,0,.2)] focus-within:border-[#d6a83f]/70">
          <Search className="h-5 w-5 shrink-0 text-[#e3b64f]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {query && (
          <p className="mt-2 text-center text-xs text-white/45">
            {filteredProducts.length} {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
          </p>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-5 md:grid-cols-4 md:gap-4 min-[760px]:[&>article]:!h-[500px] xl:gap-5 xl:[&>article]:!h-[520px]">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a0a0a] px-6 py-12 text-center">
          <p className="text-base font-bold text-white">No encontramos ese producto</p>
          <p className="mt-2 text-sm text-white/45">Prueba con otro nombre o categoría.</p>
        </div>
      )}
    </>
  );
}

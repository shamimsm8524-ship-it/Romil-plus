"use client";

import { useMemo, useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const availableCategories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((product) => product.category)))],
    []
  );

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesQuery = !term || [product.name, product.category, product.description, product.duration]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("Todos");
  };

  return (
    <>
      <style>{`
        @keyframes romilCardIn {
          from { opacity: 0; transform: translateY(18px) scale(.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes romilGlow {
          0%,100% { box-shadow: 0 0 0 rgba(227,182,79,0); }
          50% { box-shadow: 0 0 28px rgba(227,182,79,.13); }
        }
        .romil-card-in { animation: romilCardIn .48s ease both; }
        .romil-search-glow:focus-within { animation: romilGlow 1.8s ease-in-out infinite; }
      `}</style>

      <div className="mx-auto mt-6 w-full max-w-[860px] md:mt-5">
        <div className="romil-search-glow flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(90deg,#0a0a0a,#11100d,#0a0a0a)] px-4 shadow-[0_12px_32px_rgba(0,0,0,.2)] transition duration-300 focus-within:border-[#d6a83f]/80">
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
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition hover:rotate-90 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {availableCategories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition duration-200 active:scale-95 ${active ? "border-[#e3b64f] bg-[#e3b64f] text-black shadow-[0_0_18px_rgba(227,182,79,.2)]" : "border-white/10 bg-white/[0.035] text-white/60 hover:border-[#e3b64f]/45 hover:text-white"}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex min-h-6 items-center justify-center gap-2 text-center text-xs text-white/45">
          <Sparkles className="h-3.5 w-3.5 text-[#e3b64f]" />
          <span>{filteredProducts.length} {filteredProducts.length === 1 ? "producto disponible" : "productos disponibles"}</span>
          {(query || selectedCategory !== "Todos") && (
            <button type="button" onClick={clearFilters} className="ml-1 font-bold text-[#e3b64f] transition hover:text-[#ffd76b]">Ver todos</button>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-5 md:grid-cols-4 md:gap-4 min-[760px]:[&>article]:!h-[500px] xl:gap-5 xl:[&>article]:!h-[520px]">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="romil-card-in" style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a0a0a] px-6 py-12 text-center">
          <p className="text-base font-bold text-white">No encontramos ese producto</p>
          <p className="mt-2 text-sm text-white/45">Prueba con otro nombre o categoría.</p>
          <button type="button" onClick={clearFilters} className="mt-5 rounded-xl bg-[#e3b64f] px-4 py-2.5 text-sm font-black text-black transition hover:scale-[1.03] hover:bg-[#ffd76b] active:scale-95">Mostrar todo el catálogo</button>
        </div>
      )}
    </>
  );
}

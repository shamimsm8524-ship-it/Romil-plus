"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const categoryAccent: Record<string, {border:string; bg:string; text:string; glow:string; c1:string; c2:string}> = {
  "Inteligencia Artificial": { border:"border-[#6d5cff]/50", bg:"bg-[#6552ff]/12", text:"text-[#d8d1ff]", glow:"rgba(101,82,255,.24)", c1:"rgba(70,108,255,.34)", c2:"rgba(171,65,255,.30)" },
  "Diseño": { border:"border-[#dc4dff]/50", bg:"bg-[#ce49ff]/12", text:"text-[#f2c8ff]", glow:"rgba(214,73,255,.24)", c1:"rgba(53,187,255,.30)", c2:"rgba(242,67,214,.34)" },
  "Productividad": { border:"border-[#34d1ff]/50", bg:"bg-[#2dc7ff]/12", text:"text-[#c4f4ff]", glow:"rgba(45,199,255,.24)", c1:"rgba(31,204,255,.32)", c2:"rgba(70,101,255,.28)" },
  "Edición de Videos": { border:"border-[#ff4eaf]/50", bg:"bg-[#ff479f]/12", text:"text-[#ffd0e7]", glow:"rgba(255,71,159,.24)", c1:"rgba(128,64,255,.30)", c2:"rgba(255,65,174,.34)" },
  "VPN": { border:"border-[#ff5e5e]/50", bg:"bg-[#ff5353]/12", text:"text-[#ffd0d0]", glow:"rgba(255,83,83,.24)", c1:"rgba(37,112,255,.32)", c2:"rgba(255,65,86,.32)" },
  "Redes Sociales": { border:"border-[#ff8a38]/50", bg:"bg-[#ff7b28]/12", text:"text-[#ffe0c7]", glow:"rgba(255,123,40,.24)", c1:"rgba(255,77,171,.30)", c2:"rgba(255,139,44,.32)" },
  "Promoción YouTube": { border:"border-[#ff3f68]/50", bg:"bg-[#ff365d]/12", text:"text-[#ffc7d2]", glow:"rgba(255,54,93,.24)", c1:"rgba(255,54,93,.32)", c2:"rgba(173,45,255,.28)" },
  "Educación": { border:"border-[#38d37d]/50", bg:"bg-[#31ca74]/12", text:"text-[#c9ffe0]", glow:"rgba(49,202,116,.24)", c1:"rgba(44,210,107,.30)", c2:"rgba(126,230,44,.28)" },
  "Otros": { border:"border-[#f0bc45]/50", bg:"bg-[#e7ad32]/12", text:"text-[#ffe7ad]", glow:"rgba(231,173,50,.24)", c1:"rgba(245,183,54,.28)", c2:"rgba(125,62,255,.25)" },
};

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
        @keyframes rpCatalogCardIn{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes rpSearchGlow{0%,100%{box-shadow:0 0 0 rgba(42,207,255,0),0 12px 32px rgba(0,0,0,.22)}50%{box-shadow:0 0 30px rgba(42,207,255,.10),0 12px 32px rgba(0,0,0,.22)}}
        @keyframes rpCardAura{0%,100%{opacity:.30;transform:scale(.98)}50%{opacity:.56;transform:scale(1.025)}}
        .rp-catalog-card{animation:rpCatalogCardIn .5s ease both;transition:transform .24s ease,filter .24s ease;position:relative;isolation:isolate}
        .rp-catalog-card:hover{transform:translateY(-5px) scale(1.012);filter:saturate(1.08)}
        .rp-catalog-card:before{content:"";position:absolute;z-index:-1;inset:-9px;border-radius:28px;background:radial-gradient(circle at 16% 8%,var(--rp-c1),transparent 45%),radial-gradient(circle at 88% 92%,var(--rp-c2),transparent 48%);filter:blur(17px);animation:rpCardAura 3.8s ease-in-out infinite;pointer-events:none}
        .rp-catalog-card>article{border-color:rgba(255,255,255,.14)!important;background:radial-gradient(circle at 10% 0%,var(--rp-c1),transparent 34%),radial-gradient(circle at 100% 88%,var(--rp-c2),transparent 40%),linear-gradient(150deg,#11131d 0%,#090a10 50%,#0d0913 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 18px 45px rgba(0,0,0,.34)!important}
        .rp-catalog-card>article>div:first-child{box-shadow:0 0 0 1px rgba(255,255,255,.08),0 0 24px var(--rp-c1);transition:box-shadow .25s ease,transform .25s ease}
        .rp-catalog-card:hover>article>div:first-child{box-shadow:0 0 0 1px rgba(255,255,255,.14),0 0 34px var(--rp-c1);transform:translateY(-1px)}
        .rp-catalog-card>article button:not([aria-label]){box-shadow:0 7px 18px rgba(0,0,0,.18)}
        .rp-searchbox:focus-within{animation:rpSearchGlow 1.9s ease-in-out infinite;border-color:rgba(78,211,255,.65)}
        @media(prefers-reduced-motion:reduce){.rp-catalog-card,.rp-catalog-card:before,.rp-searchbox:focus-within{animation:none!important}.rp-catalog-card,.rp-catalog-card>article>div:first-child{transition:none!important}}
      `}</style>

      <div className="mx-auto mt-6 w-full max-w-[920px] md:mt-5">
        <div className="rp-searchbox relative flex h-12 items-center gap-3 overflow-hidden rounded-2xl border border-[#50ccff]/20 bg-[radial-gradient(circle_at_15%_50%,rgba(49,91,255,.15),transparent_34%),radial-gradient(circle_at_85%_50%,rgba(208,58,255,.13),transparent_34%),linear-gradient(90deg,#090b12,#0b0c12)] px-4 shadow-[0_12px_32px_rgba(0,0,0,.22)] transition duration-300">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#00d9ff,#9a45ff,#ff4fcf,transparent)] opacity-70"/>
          <Search className="relative z-10 h-5 w-5 shrink-0 text-[#67e1ff]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="relative z-10 h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition hover:rotate-90 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {availableCategories.map((category) => {
            const active = selectedCategory === category;
            const accent = categoryAccent[category];
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition duration-200 active:scale-95 ${active
                  ? category === "Todos"
                    ? "border-[#f1c44d] bg-[linear-gradient(90deg,#f4c34d,#ffb72c)] text-black shadow-[0_0_20px_rgba(255,190,45,.20)]"
                    : `${accent?.border ?? "border-[#e3b64f]"} ${accent?.bg ?? "bg-[#e3b64f]/10"} ${accent?.text ?? "text-white"}`
                  : "border-white/10 bg-white/[0.035] text-white/58 hover:border-white/25 hover:text-white"}`}
                style={active && accent ? { boxShadow:`0 0 18px ${accent.glow}` } : undefined}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex min-h-6 items-center justify-center gap-2 text-center text-xs text-white/45">
          <Sparkles className="h-3.5 w-3.5 text-[#63e0ff]" />
          <span>{filteredProducts.length} {filteredProducts.length === 1 ? "producto disponible" : "productos disponibles"}</span>
          {(query || selectedCategory !== "Todos") && (
            <button type="button" onClick={clearFilters} className="ml-1 font-bold text-[#f0c650] transition hover:text-[#ffd96c]">Ver todos</button>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-7 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_4%_0%,rgba(0,174,255,.12),transparent_26%),radial-gradient(circle_at_96%_4%,rgba(226,54,255,.11),transparent_27%),radial-gradient(circle_at_50%_100%,rgba(68,74,255,.09),transparent_32%),linear-gradient(180deg,#07080d,#050507)] p-3 shadow-[0_22px_70px_rgba(0,0,0,.42)] sm:p-4 md:mt-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-4 xl:gap-5">
            {filteredProducts.map((product, index) => {
              const accent = categoryAccent[product.category] ?? categoryAccent.Otros;
              return (
                <div
                  key={product.id}
                  className="rp-catalog-card mx-auto w-full max-w-[312px] rounded-[22px] p-[1px] md:max-w-none"
                  style={{
                    animationDelay: `${Math.min(index, 10) * 55}ms`,
                    background: `linear-gradient(135deg, ${accent.c1}, rgba(255,255,255,.09), ${accent.c2})`,
                    boxShadow: `0 0 24px ${accent.glow}`,
                    ["--rp-c1" as string]: accent.c1,
                    ["--rp-c2" as string]: accent.c2,
                  }}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-[#6bdcff]/20 bg-[radial-gradient(circle_at_20%_20%,rgba(45,92,255,.15),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(207,61,255,.12),transparent_32%),#080a0f] px-6 py-12 text-center shadow-[0_0_28px_rgba(64,163,255,.08)]">
          <p className="text-base font-bold text-white">No encontramos ese producto</p>
          <p className="mt-2 text-sm text-white/45">Prueba con otro nombre o categoría.</p>
          <button type="button" onClick={clearFilters} className="mt-5 rounded-xl bg-[linear-gradient(90deg,#f4c34d,#ffb72c)] px-4 py-2.5 text-sm font-black text-black transition hover:scale-[1.03] active:scale-95">Mostrar todo el catálogo</button>
        </div>
      )}
    </>
  );
}

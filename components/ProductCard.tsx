"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const useFullImage = product.id === "capcut-pro" || product.id === "canva-pro";

  return (
    <article className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-[#d6a83f]/40 hover:bg-white/[0.065]">
      <div className={`mb-5 flex items-center justify-center overflow-hidden rounded-2xl ${useFullImage ? "h-52 bg-white p-2" : "h-44 bg-gradient-to-br from-cyan-500/10 via-violet-500/15 to-fuchsia-500/10"}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={useFullImage ? "h-full w-full object-contain object-center" : "h-full w-full object-cover"}
          />
        ) : (
          <span className="text-4xl font-black text-white/85">{product.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span>
        )}
      </div>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#e2b44c]">{product.category}</p>
          <h3 className="mt-1 text-xl font-bold">{product.name}</h3>
        </div>
        {product.badge && <span className="rounded-full bg-[#d8aa42]/15 px-3 py-1 text-xs text-[#f0cd78]">{product.badge}</span>}
      </div>
      <p className="min-h-12 text-sm leading-6 text-white/60">{product.description}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <span className="text-2xl font-black">S/ {product.price.toFixed(2)}</span>
          <p className="text-xs text-white/45">Suscripción: {product.duration}</p>
          {product.guarantee && <p className="mt-1 text-xs font-semibold text-[#f0cd78]">Garantía: {product.guarantee}</p>}
        </div>
        <button onClick={() => add(product)} className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-[#f5df9b]"><ShoppingBag className="inline" size={16} /> Añadir</button>
      </div>
      <Link href={`/producto/${product.id}`} className="mt-4 block text-center text-sm text-white/50 hover:text-white">Ver detalles</Link>
    </article>
  );
}

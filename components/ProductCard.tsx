"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [justAdded, setJustAdded] = useState(false);
  const selectedVariant = product.variants?.find((variant) => variant.id === selectedVariantId) ?? product.variants?.[0];
  const displayedPrice = selectedVariant?.price ?? product.price;

  const playAddSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioContext = new AudioContextClass(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain();
      oscillator.type = "sine"; oscillator.frequency.setValueAtTime(620, audioContext.currentTime); oscillator.frequency.linearRampToValueAtTime(900, audioContext.currentTime + 0.13);
      gain.gain.setValueAtTime(0.28, audioContext.currentTime); gain.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.22);
      oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + 0.22);
      window.setTimeout(() => void audioContext.close(), 300);
    } catch {}
  };

  const addToCart = () => {
    const itemToAdd = selectedVariant ? { ...product, id: `${product.id}-${selectedVariant.id}`, name: `${product.name} — ${selectedVariant.label}`, price: selectedVariant.price, duration: selectedVariant.label, variants: undefined } : product;
    add(itemToAdd); playAddSound(); setJustAdded(true); window.setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <article className={`group flex h-full flex-col rounded-3xl border p-4 transition duration-200 sm:p-5 lg:p-6 ${justAdded ? "border-black bg-black shadow-2xl shadow-black/80 scale-[0.99]" : "border-white/10 bg-white/[0.045] hover:-translate-y-1 hover:border-[#d6a83f]/40 hover:bg-white/[0.065] lg:shadow-[0_18px_50px_rgba(0,0,0,.22)]"}`}>
      <div className="mx-auto mb-5 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-white lg:aspect-square lg:h-auto lg:w-full">
        {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-contain object-center lg:p-2"/> : <span className="text-4xl font-black text-slate-800 lg:text-5xl">{product.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span>}
      </div>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-[#e2b44c] lg:text-sm">{product.category}</p><h3 className="mt-1 text-xl font-bold lg:text-2xl">{product.name}</h3></div>
        {product.badge && <span className="shrink-0 rounded-full bg-[#d8aa42]/15 px-3 py-1 text-xs text-[#f0cd78]">{product.badge}</span>}
      </div>
      <p className="min-h-12 text-sm leading-6 text-white/60 lg:min-h-14 lg:text-base lg:leading-7">{product.description}</p>
      {product.variants && product.variants.length > 0 && <div className="mt-4"><label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">Elige un paquete</label><select value={selectedVariantId} onChange={(event) => setSelectedVariantId(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm font-semibold text-white outline-none focus:border-[#d6a83f]/60 lg:text-base">{product.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.label} — S/ {variant.price.toFixed(2)}</option>)}</select></div>}
      <div className="mt-auto flex items-end justify-between gap-4 pt-6"><div><span className="text-2xl font-black lg:text-3xl">S/ {displayedPrice.toFixed(2)}</span><p className="mt-1 text-xs text-white/45 lg:text-sm">{selectedVariant ? selectedVariant.label : `Suscripción: ${product.duration}`}</p>{product.guarantee && <p className="mt-1 text-xs font-semibold text-[#f0cd78] lg:text-sm">Garantía: {product.guarantee}</p>}</div><button type="button" onClick={addToCart} className={`shrink-0 rounded-xl px-3 py-2 text-sm font-bold transition duration-200 lg:px-5 lg:py-3 lg:text-base ${justAdded ? "bg-black text-white ring-2 ring-white/30" : "bg-white text-slate-950 hover:bg-[#f5df9b]"}`}><ShoppingBag className="inline" size={17}/> {justAdded ? "Añadido" : "Añadir"}</button></div>
      <Link href={`/producto/${product.id}`} className="mt-5 block text-center text-sm text-white/50 hover:text-white lg:text-base">Ver detalles</Link>
    </article>
  );
}

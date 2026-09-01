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
  const desktopScale = product.id === "canva-pro" ? "min-[900px]:scale-[1.55]" : product.id === "gemini-pro" ? "min-[900px]:scale-[1.22]" : "min-[900px]:scale-[1.04]";

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
    <article className={`group flex h-full flex-col rounded-[22px] border p-3.5 transition duration-200 sm:p-4 min-[700px]:rounded-3xl min-[900px]:p-4 xl:p-5 ${justAdded ? "border-black bg-black shadow-2xl shadow-black/80 scale-[0.99]" : "border-white/10 bg-white/[0.045] hover:-translate-y-1 hover:border-[#d6a83f]/40 hover:bg-white/[0.065] min-[900px]:shadow-[0_18px_50px_rgba(0,0,0,.22)]"}`}>
      <div className="mx-auto mb-3.5 flex h-[152px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-white sm:h-[170px] min-[700px]:mb-5 min-[900px]:aspect-square min-[900px]:h-auto min-[900px]:w-full min-[900px]:rounded-2xl">
        {product.image ? <img src={product.image} alt={product.name} className={`h-full w-full object-contain object-center transition-transform duration-200 ${desktopScale}`}/> : <span className="text-3xl font-black text-slate-800 min-[900px]:text-5xl">{product.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span>}
      </div>
      <div className="mb-2.5 flex items-start justify-between gap-2 min-[700px]:mb-3 min-[700px]:gap-3">
        <div><p className="text-[10px] font-semibold uppercase tracking-wider text-[#e2b44c] sm:text-[11px] min-[900px]:text-[11px] xl:text-sm">{product.category}</p><h3 className="mt-1 text-lg font-bold sm:text-xl min-[900px]:text-lg xl:text-2xl">{product.name}</h3></div>
        {product.badge && <span className="shrink-0 rounded-full bg-[#d8aa42]/15 px-2 py-1 text-[10px] text-[#f0cd78] sm:text-[11px] min-[900px]:text-[10px] xl:px-3 xl:text-xs">{product.badge}</span>}
      </div>
      <p className="min-h-0 text-[13px] leading-5 text-white/60 sm:text-sm min-[700px]:min-h-12 min-[900px]:min-h-16 min-[900px]:text-xs min-[900px]:leading-5 xl:min-h-14 xl:text-base xl:leading-7">{product.description}</p>
      {product.variants && product.variants.length > 0 && <div className="mt-3 min-[700px]:mt-4"><label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/50 sm:text-xs">Elige un paquete</label><select value={selectedVariantId} onChange={(event) => setSelectedVariantId(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-[13px] font-semibold text-white outline-none focus:border-[#d6a83f]/60 min-[900px]:text-xs xl:text-base">{product.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.label} — S/ {variant.price.toFixed(2)}</option>)}</select></div>}
      <div className="mt-auto flex items-end justify-between gap-2 pt-4 min-[700px]:gap-3 min-[700px]:pt-6"><div><span className="text-[22px] font-black sm:text-2xl min-[900px]:text-xl xl:text-3xl">S/ {displayedPrice.toFixed(2)}</span><p className="mt-1 text-[11px] text-white/45 sm:text-xs min-[900px]:text-[10px] xl:text-sm">{selectedVariant ? selectedVariant.label : `Suscripción: ${product.duration}`}</p>{product.guarantee && <p className="mt-1 text-[11px] font-semibold text-[#f0cd78] sm:text-xs min-[900px]:text-[10px] xl:text-sm">Garantía: {product.guarantee}</p>}</div><button type="button" onClick={addToCart} className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-bold transition duration-200 sm:text-sm min-[900px]:px-3 min-[900px]:py-2 min-[900px]:text-xs xl:px-5 xl:py-3 xl:text-base ${justAdded ? "bg-black text-white ring-2 ring-white/30" : "bg-white text-slate-950 hover:bg-[#f5df9b]"}`}><ShoppingBag className="inline" size={16}/> {justAdded ? "Añadido" : "Añadir"}</button></div>
      <Link href={`/producto/${product.id}`} className="mt-3.5 block text-center text-[13px] text-white/50 hover:text-white min-[700px]:mt-5 min-[900px]:text-xs xl:text-base">Ver detalles</Link>
    </article>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const isCapCut = product.id === "capcut-pro";
  const isYouTube = product.id === "youtube-promocion";
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [justAdded, setJustAdded] = useState(false);
  const selectedVariant = product.variants?.find((variant) => variant.id === selectedVariantId) ?? product.variants?.[0];
  const displayedPrice = selectedVariant?.price ?? product.price;

  const playAddSound = async () => {
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioContext = new AudioContextClass();
      if (audioContext.state === "suspended") await audioContext.resume();

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(920, audioContext.currentTime + 0.16);
      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.24);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.24);
    } catch {
      // El producto se añade aunque el navegador bloquee el audio.
    }
  };

  const addToCart = () => {
    if (!selectedVariant) {
      add(product);
    } else {
      add({
        ...product,
        id: `${product.id}-${selectedVariant.id}`,
        name: `${product.name} — ${selectedVariant.label}`,
        price: selectedVariant.price,
        duration: selectedVariant.label,
        variants: undefined,
      });
    }

    void playAddSound();
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <article className={`group rounded-3xl border p-5 transition duration-200 ${justAdded ? "border-black bg-black shadow-2xl shadow-black/80 scale-[0.99]" : "border-white/10 bg-white/[0.045] hover:-translate-y-1 hover:border-[#d6a83f]/40 hover:bg-white/[0.065]"}`}>
      <div className={`mb-5 flex items-center justify-center overflow-hidden rounded-2xl ${isCapCut || isYouTube ? "h-52 bg-white p-2" : "h-44 bg-gradient-to-br from-cyan-500/10 via-violet-500/15 to-fuchsia-500/10"}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={isCapCut || isYouTube ? "h-full w-full object-contain object-center" : "h-full w-full object-cover"}
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

      {product.variants && product.variants.length > 0 && (
        <div className="mt-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">Elige un paquete</label>
          <select
            value={selectedVariantId}
            onChange={(event) => setSelectedVariantId(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm font-semibold text-white outline-none focus:border-[#d6a83f]/60"
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.label} — S/ {variant.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <span className="text-2xl font-black">S/ {displayedPrice.toFixed(2)}</span>
          <p className="text-xs text-white/45">{selectedVariant ? selectedVariant.label : `Suscripción: ${product.duration}`}</p>
          {product.guarantee && <p className="mt-1 text-xs font-semibold text-[#f0cd78]">Garantía: {product.guarantee}</p>}
        </div>
        <button
          onClick={addToCart}
          className={`rounded-xl px-3 py-2 text-sm font-bold transition duration-200 ${justAdded ? "bg-black text-white ring-2 ring-white/30" : "bg-white text-slate-950 hover:bg-[#f5df9b]"}`}
        >
          <ShoppingBag className="inline" size={16} /> {justAdded ? "Añadido" : "Añadir"}
        </button>
      </div>
      <Link href={`/producto/${product.id}`} className="mt-4 block text-center text-sm text-white/50 hover:text-white">Ver detalles</Link>
    </article>
  );
}

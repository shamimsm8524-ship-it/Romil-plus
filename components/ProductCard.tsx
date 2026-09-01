"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [geminiQuantity, setGeminiQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const selectedVariant = product.variants?.find((variant) => variant.id === selectedVariantId) ?? product.variants?.[0];
  const isGemini = product.id === "gemini-pro";
  const geminiUnitPrice = geminiQuantity === 1 ? 20 : geminiQuantity === 2 ? 17 : geminiQuantity === 3 ? 14 : 10;
  const geminiTotal = geminiUnitPrice * geminiQuantity;
  const displayedPrice = isGemini ? geminiTotal : (selectedVariant?.price ?? product.price);
  const desktopScale = product.id === "canva-pro" ? "min-[900px]:scale-[1.55]" : product.id === "gemini-pro" ? "min-[900px]:scale-[1.22]" : "min-[900px]:scale-[1.04]";
  const imageFit = product.id === "netflix-vpn" ? "object-contain" : "object-cover min-[900px]:object-contain";

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
    if (isGemini) {
      const itemToAdd = { ...product, id: `${product.id}-${geminiQuantity}-${Date.now()}`, name: `${product.name} — ${geminiQuantity} ${geminiQuantity === 1 ? "cuenta" : "cuentas"}`, price: geminiTotal, duration: `${product.duration} · ${geminiQuantity} ${geminiQuantity === 1 ? "cuenta" : "cuentas"} · S/ ${geminiUnitPrice.toFixed(2)} c/u`, variants: undefined };
      add(itemToAdd);
    } else {
      const itemToAdd = selectedVariant ? { ...product, id: `${product.id}-${selectedVariant.id}`, name: `${product.name} — ${selectedVariant.label}`, price: selectedVariant.price, duration: selectedVariant.label, variants: undefined } : product;
      add(itemToAdd);
    }
    playAddSound(); setJustAdded(true); window.setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <article className={`group mx-auto flex h-[540px] w-full max-w-[310px] flex-col rounded-[18px] border-2 border-[#d6a83f] p-3 transition duration-200 min-[900px]:h-full min-[900px]:max-w-none min-[900px]:rounded-3xl min-[900px]:p-4 xl:p-5 ${justAdded ? "bg-black shadow-[0_0_0_1px_rgba(255,224,140,.35),0_0_22px_rgba(214,168,63,.24),0_22px_50px_rgba(0,0,0,.72)] scale-[0.99]" : "bg-white/[0.045] shadow-[0_0_0_1px_rgba(255,224,140,.18),0_0_18px_rgba(214,168,63,.16),0_18px_50px_rgba(0,0,0,.28)] hover:-translate-y-1 hover:border-[#efc75e] hover:bg-white/[0.065] hover:shadow-[0_0_0_1px_rgba(255,233,166,.28),0_0_24px_rgba(214,168,63,.24),0_22px_56px_rgba(0,0,0,.32)]"}`}>
      <div className="mx-auto mb-3 flex h-[210px] w-[210px] shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-white min-[900px]:mb-5 min-[900px]:h-auto min-[900px]:w-full min-[900px]:aspect-square min-[900px]:rounded-2xl">
        {product.image ? <img src={product.image} alt={product.name} className={`h-full w-full ${imageFit} object-center transition-transform duration-200 ${desktopScale}`}/> : <span className="text-3xl font-black text-slate-800 min-[900px]:text-5xl">{product.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span>}
      </div>
      <div className="mb-2 flex min-h-[48px] items-start justify-between gap-2 min-[900px]:mb-3 min-[900px]:min-h-0 min-[900px]:gap-3">
        <div className="min-w-0"><p className="text-[12px] font-semibold uppercase tracking-wider text-[#e2b44c] min-[900px]:text-[11px] xl:text-sm">{product.category}</p><h3 className="mt-0.5 text-[20px] font-bold leading-6 min-[900px]:mt-1 min-[900px]:text-lg xl:text-2xl">{product.name}</h3></div>
        {product.badge && <span className="shrink-0 rounded-full bg-[#d8aa42]/15 px-2.5 py-1 text-[12px] text-[#f0cd78] min-[900px]:text-[10px] xl:px-3 xl:text-xs">{product.badge}</span>}
      </div>
      <p className={`${product.id === "netflix-vpn" ? "h-[92px]" : "h-[68px]"} overflow-hidden text-[14px] leading-[22px] text-white/60 min-[900px]:h-auto min-[900px]:min-h-16 min-[900px]:text-xs min-[900px]:leading-5 xl:min-h-14 xl:text-base xl:leading-7`}>{product.id === "canva-pro" ? <><span>Canva Edu — suscripción por 12 meses</span><br/><span>Se envía invitación por correo</span></> : product.id === "gemini-pro" ? <><span>Gemini Pro — suscripción por 18 meses</span><br/><span>Cuenta Personal</span></> : product.id === "netflix-vpn" ? <><span>Netflix — suscripción por 1 mes</span><br/><span>Cuenta Completa</span><br/><span>Se envía correo y contraseña</span><br/><span>Uso solo con VPN</span></> : product.description}</p>
      {isGemini && <div className="mt-2 min-[900px]:mt-4"><label className="mb-1 block text-[12px] font-semibold uppercase tracking-wider text-white/50 min-[900px]:text-[9px]">Cantidad de cuentas</label><select value={geminiQuantity} onChange={(event) => setGeminiQuantity(Math.max(1, Number(event.target.value)))} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-[14px] font-semibold text-white outline-none focus:border-[#d6a83f]/60 min-[900px]:py-2.5 min-[900px]:text-xs xl:text-base">{[1,2,3,4,5,6,7,8,9,10].map((qty) => <option key={qty} value={qty}>{qty} {qty === 1 ? "cuenta" : "cuentas"} — S/ {(qty === 1 ? 20 : qty === 2 ? 17 : qty === 3 ? 14 : 10).toFixed(2)} c/u</option>)}</select></div>}
      {!isGemini && product.variants && product.variants.length > 0 && <div className="mt-2 min-[900px]:mt-4"><label className="mb-1 block text-[12px] font-semibold uppercase tracking-wider text-white/50 min-[900px]:text-[9px]">Elige un paquete</label><select value={selectedVariantId} onChange={(event) => setSelectedVariantId(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-[14px] font-semibold text-white outline-none focus:border-[#d6a83f]/60 min-[900px]:py-2.5 min-[900px]:text-xs xl:text-base">{product.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.label} — S/ {variant.price.toFixed(2)}</option>)}</select></div>}
      <div className="mt-auto flex items-end justify-between gap-2 pt-2 min-[900px]:gap-3 min-[900px]:pt-6"><div className="min-w-0"><span className="text-[25px] font-black min-[900px]:text-xl xl:text-3xl">S/ {displayedPrice.toFixed(2)}</span>{isGemini ? <><p className="mt-0.5 text-[12px] text-white/45 min-[900px]:mt-1 min-[900px]:text-[10px] xl:text-sm">{geminiQuantity} {geminiQuantity === 1 ? "cuenta" : "cuentas"} · S/ {geminiUnitPrice.toFixed(2)} c/u</p><p className="mt-0.5 text-[12px] text-white/45 min-[900px]:text-[10px] xl:text-sm">Suscripción: {product.duration}</p></> : <p className="mt-0.5 text-[12px] text-white/45 min-[900px]:mt-1 min-[900px]:text-[10px] xl:text-sm">{selectedVariant ? selectedVariant.label : `Suscripción: ${product.duration}`}</p>}{product.guarantee && <p className="mt-0.5 text-[12px] font-semibold text-[#f0cd78] min-[900px]:mt-1 min-[900px]:text-[10px] xl:text-sm">Garantía: {product.guarantee}</p>}</div><button type="button" onClick={addToCart} className={`shrink-0 rounded-xl px-3 py-2.5 text-[14px] font-bold transition duration-200 min-[900px]:px-3 min-[900px]:py-2 min-[900px]:text-xs xl:px-5 xl:py-3 xl:text-base ${justAdded ? "bg-black text-white ring-2 ring-white/30" : "bg-white text-slate-950 hover:bg-[#f5df9b]"}`}><ShoppingBag className="inline" size={16}/> {justAdded ? "Añadido" : "Añadir"}</button></div>
      <Link href={`/producto/${product.id}`} className="mt-2 block text-center text-[14px] text-white/50 hover:text-white min-[900px]:mt-5 min-[900px]:text-xs xl:text-base">Ver detalles</Link>
    </article>
  );
}

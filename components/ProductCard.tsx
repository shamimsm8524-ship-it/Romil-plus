"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, ShoppingBag, MessageCircleMore } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [geminiQuantity, setGeminiQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const selectedVariant = product.variants?.find((variant) => variant.id === selectedVariantId) ?? product.variants?.[0];
  const isGemini = product.id === "gemini-pro";
  const isSupportProduct = product.id === "seguidores-likes";
  const geminiUnitPrice = geminiQuantity === 1 ? 20 : geminiQuantity === 2 ? 17 : geminiQuantity === 3 ? 14 : 10;
  const geminiTotal = geminiUnitPrice * geminiQuantity;
  const displayedPrice = isGemini ? geminiTotal : (selectedVariant?.price ?? product.price);
  const fullBleedImage = ["netflix-vpn", "canva-pro", "chatgpt-plus"].includes(product.id);

  const playAddSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioContext = new AudioContextClass(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain();
      oscillator.type = "sine"; oscillator.frequency.setValueAtTime(620, audioContext.currentTime); oscillator.frequency.linearRampToValueAtTime(900, audioContext.currentTime + 0.13);
      gain.gain.setValueAtTime(0.28, audioContext.currentTime); gain.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.22);
      oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + 0.22); window.setTimeout(() => void audioContext.close(), 300);
    } catch {}
  };

  const addToCart = () => {
    if (isGemini) add({ ...product, id: `${product.id}-${geminiQuantity}-${Date.now()}`, name: `${product.name} — ${geminiQuantity} ${geminiQuantity === 1 ? "cuenta" : "cuentas"}`, price: geminiTotal, duration: `${product.duration} · ${geminiQuantity} ${geminiQuantity === 1 ? "cuenta" : "cuentas"} · S/ ${geminiUnitPrice.toFixed(2)} c/u`, variants: undefined });
    else add(selectedVariant ? { ...product, id: `${product.id}-${selectedVariant.id}`, name: `${product.name} — ${selectedVariant.label}`, price: selectedVariant.price, duration: selectedVariant.label, variants: undefined } : product);
    playAddSound(); setJustAdded(true); window.setTimeout(() => setJustAdded(false), 900);
  };

  if (isSupportProduct) return <>
    <article className="group mx-auto flex h-[540px] w-full max-w-[310px] flex-col rounded-[18px] border-2 border-[#d6a83f] bg-[linear-gradient(180deg,#111,#0b0b0b)] p-3 shadow-[0_0_0_1px_rgba(255,224,140,.12),0_18px_44px_rgba(0,0,0,.28)] min-[760px]:hidden">
      <div className="mx-auto mb-3 flex h-[210px] w-[210px] shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-black">{product.image && <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />}</div>
      <div className="mb-2 flex min-h-[48px] items-start justify-between gap-2"><div className="min-w-0"><p className="text-[12px] font-semibold uppercase tracking-wider text-[#e2b44c]">{product.category}</p><h3 className="mt-0.5 text-[20px] font-bold leading-6">{product.name}</h3></div><span className="shrink-0 rounded-full bg-[#d8aa42]/15 px-2.5 py-1 text-[12px] text-[#f0cd78]">Consultar</span></div>
      <p className="h-[92px] overflow-hidden text-[14px] leading-[22px] text-white/60">TikTok<br/>Facebook<br/>Instagram<br/>YouTube</p>
      <div className="mt-auto border-t border-[#d6a83f]/45 pt-3"><p className="text-[13px] font-bold leading-5 text-white"><span className="text-[#f6bf2f]">Precio:</span> ESCRIBIR A SOPORTE Y PREGUNTAR</p><p className="mt-1 text-[12px] leading-5 text-white/55">YA QUE LOS PRECIOS VARÍAN DE ACUERDO A LO REQUERIDO Y LA CANTIDAD.</p><Link href="/soporte" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f6bf2f] px-4 py-3 text-[15px] font-black text-black transition hover:bg-[#ffd052]"><MessageCircleMore size={14}/> Consultar en soporte</Link></div>
    </article>
    <article className="group mx-auto hidden h-[500px] w-full max-w-none flex-col rounded-2xl border border-[#d6a83f] bg-[linear-gradient(180deg,#111,#0b0b0b)] p-3 shadow-[0_0_0_1px_rgba(255,224,140,.12),0_18px_44px_rgba(0,0,0,.28)] transition duration-200 hover:-translate-y-1 hover:border-[#efc75e] min-[760px]:flex xl:h-[520px]">
      <div className="mx-auto mb-3 flex h-[228px] w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black xl:h-[240px]">{product.image && <img src={product.image} alt={product.name} className="h-full w-full object-contain object-center" />}</div>
      <div className="mb-2 flex items-start justify-between gap-2"><div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-wider text-[#e2b44c]">REDES SOCIALES</p><h3 className="mt-0.5 text-[19px] font-black leading-6 text-white xl:text-[20px]">SEGUIDORES Y LIKES</h3></div><span className="shrink-0 rounded-full bg-[#d8aa42]/15 px-2.5 py-1 text-[10px] font-semibold text-[#f0cd78]">Consultar</span></div>
      <p className="text-[14px] font-medium leading-[20px] text-white/75 xl:text-[15px] xl:leading-[21px]">TikTok<br/>Facebook<br/>Instagram<br/>YouTube</p>
      <div className="mt-auto border-t border-[#d6a83f]/45 pt-2.5"><p className="text-[12px] font-black leading-[16px] text-white xl:text-[13px]"><span className="text-[#f6bf2f]">Precio:</span> ESCRIBIR A SOPORTE Y PREGUNTAR</p><p className="mt-1 text-[11px] font-medium leading-[15px] text-white/65 xl:text-[12px]">YA QUE LOS PRECIOS VARÍAN DE ACUERDO A LO REQUERIDO Y LA CANTIDAD.</p><Link href="/soporte" className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#f6bf2f] px-3 py-2.5 text-[12px] font-black text-black transition hover:bg-[#ffd052] xl:text-[13px]"><MessageCircleMore size={16}/> Consultar en soporte</Link></div>
    </article>
  </>;

  return <article className={`group mx-auto flex h-[540px] w-full max-w-[310px] flex-col rounded-[18px] border-2 border-[#d6a83f] p-3 transition duration-200 min-[760px]:h-[500px] min-[760px]:max-w-none min-[760px]:rounded-2xl min-[760px]:border min-[760px]:p-3 xl:h-[520px] ${justAdded ? "bg-black shadow-[0_0_0_1px_rgba(255,224,140,.35),0_0_22px_rgba(214,168,63,.24),0_22px_50px_rgba(0,0,0,.72)] scale-[0.99]" : "bg-[linear-gradient(180deg,#111,#0b0b0b)] shadow-[0_0_0_1px_rgba(255,224,140,.12),0_18px_44px_rgba(0,0,0,.28)] hover:-translate-y-1 hover:border-[#efc75e]"}`}>
    <div className={`mx-auto mb-3 flex h-[210px] w-[210px] shrink-0 items-center justify-center overflow-hidden rounded-[15px] ${fullBleedImage ? "bg-black" : "bg-white"} min-[760px]:h-[228px] min-[760px]:w-full min-[760px]:rounded-xl xl:h-[240px]`}>{product.image ? <img src={product.image} alt={product.name} className={`h-full w-full ${fullBleedImage ? "object-cover" : "object-contain"} object-center`}/> : <span className="text-3xl font-black text-slate-800">{product.name.split(" ").map((word) => word[0]).join("").slice(0,2)}</span>}</div>
    <div className="mb-2 flex min-h-[48px] items-start justify-between gap-2 min-[760px]:min-h-0"><div className="min-w-0"><p className="text-[12px] font-semibold uppercase tracking-wider text-[#e2b44c] min-[760px]:text-[11px]">{product.category}</p><h3 className="mt-0.5 text-[20px] font-bold leading-6 min-[760px]:text-[19px] min-[760px]:font-black min-[760px]:leading-6 xl:text-[20px]">{product.name}</h3></div>{product.badge && <span className="shrink-0 rounded-full bg-[#d8aa42]/15 px-2.5 py-1 text-[12px] text-[#f0cd78] min-[760px]:text-[10px]">{product.badge}</span>}</div>
    <p className={`${product.id === "netflix-vpn" ? "h-[92px]" : "h-[68px]"} overflow-hidden text-[14px] leading-[22px] text-white/60 min-[760px]:h-auto min-[760px]:text-[12px] min-[760px]:leading-[17px]`}>{product.id === "canva-pro" ? <><span>Canva Edu — suscripción por 12 meses</span><br/><span>Se envía invitación por correo</span></> : product.id === "gemini-pro" ? <><span>Gemini Pro — suscripción por 18 meses</span><br/><span>Cuenta Personal</span></> : product.id === "netflix-vpn" ? <><span>Netflix — suscripción por 1 mes</span><br/><span>Cuenta Completa</span><br/><span>Se envía correo y contraseña</span><br/><span>Uso solo con VPN</span></> : product.description}</p>
    {isGemini && <div className="mt-2"><label className="mb-1 block text-[12px] font-semibold uppercase tracking-wider text-white/50 min-[760px]:text-[10px]">Cantidad de cuentas</label><select value={geminiQuantity} onChange={(e)=>setGeminiQuantity(Math.max(1,Number(e.target.value)))} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-[14px] font-semibold text-white outline-none focus:border-[#d6a83f]/60 min-[760px]:text-[11px]">{[1,2,3,4,5,6,7,8,9,10].map(q=><option key={q} value={q}>{q} {q===1?"cuenta":"cuentas"} — S/ {(q===1?20:q===2?17:q===3?14:10).toFixed(2)} c/u</option>)}</select></div>}
    {!isGemini && product.variants && product.variants.length>0 && <div className="mt-2"><label className="mb-1 block text-[12px] font-semibold uppercase tracking-wider text-white/50 min-[760px]:text-[10px]">Elige un paquete</label><select value={selectedVariantId} onChange={(e)=>setSelectedVariantId(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-[14px] font-semibold text-white outline-none focus:border-[#d6a83f]/60 min-[760px]:text-[11px]">{product.variants.map(v=><option key={v.id} value={v.id}>{v.label} — S/ {v.price.toFixed(2)}</option>)}</select></div>}
    <div className="mt-auto flex items-end justify-between gap-2 pt-2"><div className="min-w-0"><span className="inline-flex whitespace-nowrap rounded-md border border-[#d6a83f]/70 px-2 py-1 text-[16px] font-black leading-none xl:text-[17px]">S/ {displayedPrice.toFixed(2)}</span>{isGemini ? <><p className="mt-0.5 text-[12px] text-white/45 min-[760px]:text-[10px]">{geminiQuantity} {geminiQuantity===1?"cuenta":"cuentas"} · S/ {geminiUnitPrice.toFixed(2)} c/u</p><p className="mt-0.5 text-[12px] text-white/45 min-[760px]:text-[10px]">Suscripción: {product.duration}</p></> : <p className="mt-0.5 text-[12px] text-white/45 min-[760px]:text-[10px]">{selectedVariant ? selectedVariant.label : `Suscripción: ${product.duration}`}</p>}{product.guarantee && <p className="mt-1 inline-flex items-center gap-1 rounded-lg border border-[#d6a83f]/35 px-2 py-1 text-[11px] font-semibold text-[#f0cd78] min-[760px]:text-[9px]"><ShieldCheck className="h-3 w-3"/> Garantía: {product.guarantee}</p>}</div><button type="button" onClick={addToCart} className={`shrink-0 rounded-xl px-3 py-2.5 text-[14px] font-bold transition min-[760px]:px-4 min-[760px]:py-2.5 min-[760px]:text-[12px] ${justAdded ? "bg-black text-white ring-2 ring-white/30" : "bg-[#f6bf2f] text-black hover:bg-[#ffd052]"}`}><ShoppingBag className="inline" size={14}/> {justAdded?"Añadido":"Añadir"}</button></div>
    <Link href={`/producto/${product.id}`} className="mt-2 block text-center text-[14px] text-white/50 hover:text-white min-[760px]:text-[10px]">Ver detalles</Link>
  </article>;
}

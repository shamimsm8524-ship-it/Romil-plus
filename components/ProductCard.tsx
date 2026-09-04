"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, ShoppingBag, MessageCircleMore } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

function ProductMedia({product,imageClassName="object-contain"}:{product:Product;imageClassName?:string}) {
  if(product.video) {
    return <video
      src={product.video}
      poster={product.image}
      controls
      playsInline
      preload="metadata"
      aria-label={`Video de ${product.name}`}
      className="h-full w-full bg-black object-contain object-center"
    />;
  }
  if(product.image) return <img src={product.image} alt={product.name} className={`h-full w-full ${imageClassName} object-center`}/>;
  return <span className="text-3xl font-black text-slate-800">{product.name.split(" ").map((word) => word[0]).join("").slice(0,2)}</span>;
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [geminiQuantity, setGeminiQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const selectedVariant = product.variants?.find((variant) => variant.id === selectedVariantId) ?? product.variants?.[0];
  const isGemini = product.id === "gemini-pro";
  const isSupportProduct = product.id === "seguidores-likes";
  const isInvitation = product.id === "invitaciones-digitales";
  const geminiUnitPrice = geminiQuantity === 1 ? 20 : geminiQuantity === 2 ? 17 : geminiQuantity === 3 ? 14 : 10;
  const geminiTotal = geminiUnitPrice * geminiQuantity;
  const displayedPrice = isGemini ? geminiTotal : (selectedVariant?.price ?? product.price);
  const fullBleedImage = ["netflix-vpn", "canva-pro", "chatgpt-plus"].includes(product.id);

  const playAddSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(620, audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(900, audioContext.currentTime + 0.13);
      gain.gain.setValueAtTime(0.28, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.22);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.22);
      window.setTimeout(() => void audioContext.close(), 300);
    } catch {}
  };

  const addToCart = () => {
    if (isGemini) {
      add({ ...product, id: `${product.id}-${geminiQuantity}-${Date.now()}`, name: `${product.name} — ${geminiQuantity} ${geminiQuantity === 1 ? "cuenta" : "cuentas"}`, price: geminiTotal, duration: `${product.duration} · ${geminiQuantity} ${geminiQuantity === 1 ? "cuenta" : "cuentas"} · S/ ${geminiUnitPrice.toFixed(2)} c/u`, variants: undefined });
    } else {
      add(selectedVariant ? { ...product, id: `${product.id}-${selectedVariant.id}`, name: `${product.name} — ${selectedVariant.label}`, price: selectedVariant.price, duration: selectedVariant.label, variants: undefined } : product);
    }
    playAddSound();
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  if (isSupportProduct) return (
    <article className="group mx-auto flex h-[540px] w-full max-w-[310px] flex-col rounded-[18px] border-2 border-[#d6a83f] bg-[linear-gradient(180deg,#111,#0b0b0b)] p-3 shadow-[0_0_0_1px_rgba(255,224,140,.12),0_18px_44px_rgba(0,0,0,.28)] min-[760px]:h-[500px] min-[760px]:max-w-none min-[760px]:rounded-2xl min-[760px]:border xl:h-[520px]">
      <div className="mx-auto mb-3 flex h-[210px] w-[210px] shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-black min-[760px]:h-[228px] min-[760px]:w-full min-[760px]:rounded-xl xl:h-[240px]"><ProductMedia product={product} imageClassName="object-cover"/></div>
      <div className="mb-2 flex items-start justify-between gap-2"><div className="min-w-0"><p className="text-[12px] font-semibold uppercase tracking-wider text-[#e2b44c] min-[760px]:text-[11px]">REDES SOCIALES</p><h3 className="mt-0.5 text-[20px] font-bold leading-6 min-[760px]:text-[19px] min-[760px]:font-black">SEGUIDORES Y LIKES</h3></div><span className="shrink-0 rounded-full bg-[#d8aa42]/15 px-2.5 py-1 text-[12px] text-[#f0cd78] min-[760px]:text-[10px]">Consultar</span></div>
      <p className="whitespace-pre-line text-[14px] leading-[22px] text-white/65 min-[760px]:text-[12px] min-[760px]:leading-[18px]">{product.description}</p>
      <div className="mt-auto border-t border-[#d6a83f]/45 pt-3"><p className="text-[13px] font-bold leading-5 text-white min-[760px]:text-[12px]"><span className="text-[#f6bf2f]">Precio:</span> escribir a soporte y consultar</p><p className="mt-1 text-[12px] leading-5 text-white/55 min-[760px]:text-[11px]">El precio depende del servicio y la cantidad requerida.</p><Link href="/soporte" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f6bf2f] px-4 py-3 text-[14px] font-black text-black transition hover:bg-[#ffd052] min-[760px]:py-2.5 min-[760px]:text-[12px]"><MessageCircleMore size={15}/> Consultar en soporte</Link></div>
    </article>
  );

  const cardHeight = isInvitation
    ? "h-[570px] min-[760px]:h-[530px] xl:h-[540px]"
    : "h-[540px] min-[760px]:h-[500px] xl:h-[520px]";

  const mediaSize = isInvitation
    ? "h-[190px] w-[210px] min-[760px]:h-[190px] min-[760px]:w-full xl:h-[205px]"
    : "h-[210px] w-[210px] min-[760px]:h-[228px] min-[760px]:w-full xl:h-[240px]";

  const titleStyle = isInvitation
    ? "text-[20px] leading-6 min-[760px]:text-[17px] min-[760px]:leading-5 xl:text-[18px]"
    : "text-[20px] leading-6 min-[760px]:text-[19px] min-[760px]:leading-6 xl:text-[20px]";

  const descriptionHeight = isInvitation
    ? "h-[66px] min-[760px]:h-[54px]"
    : product.id === "netflix-vpn"
      ? "h-[92px] min-[760px]:h-auto"
      : "h-[68px] min-[760px]:h-auto";

  return <article className={`group mx-auto flex w-full max-w-[310px] flex-col rounded-[18px] border-2 border-[#d6a83f] p-3 transition duration-200 min-[760px]:max-w-none min-[760px]:rounded-2xl min-[760px]:border min-[760px]:p-3 ${cardHeight} ${justAdded ? "scale-[0.99] bg-black shadow-[0_0_0_1px_rgba(255,224,140,.35),0_0_22px_rgba(214,168,63,.24),0_22px_50px_rgba(0,0,0,.72)]" : "bg-[linear-gradient(180deg,#111,#0b0b0b)] shadow-[0_0_0_1px_rgba(255,224,140,.12),0_18px_44px_rgba(0,0,0,.28)] hover:-translate-y-1 hover:border-[#efc75e]"}`}>
    <div className={`mx-auto mb-3 flex shrink-0 items-center justify-center overflow-hidden rounded-[15px] ${mediaSize} ${product.video || fullBleedImage ? "bg-black" : "bg-white"} min-[760px]:rounded-xl`}><ProductMedia product={product} imageClassName={fullBleedImage ? "object-cover" : "object-contain"}/></div>

    <div className="mb-2 flex min-h-[48px] items-start justify-between gap-2 min-[760px]:min-h-0">
      <div className="min-w-0 pr-1">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#e2b44c] min-[760px]:text-[11px]">{product.category}</p>
        <h3 className={`mt-0.5 font-bold text-white min-[760px]:font-black ${titleStyle}`}>{product.name}</h3>
      </div>
      {product.badge && <span className="shrink-0 rounded-full bg-[#d8aa42]/15 px-2.5 py-1 text-[12px] text-[#f0cd78] min-[760px]:text-[10px]">{product.badge}</span>}
    </div>

    <p className={`${descriptionHeight} overflow-hidden whitespace-pre-line text-[14px] leading-[22px] text-white/60 min-[760px]:text-[12px] min-[760px]:leading-[17px]`}>
      {product.id === "canva-pro" ? <><span>Canva Edu — suscripción por 12 meses</span><br/><span>Se envía invitación por correo</span></>
      : product.id === "gemini-pro" ? <><span>Gemini Pro — suscripción por 18 meses</span><br/><span>Cuenta Personal</span></>
      : product.id === "netflix-vpn" ? <><span>Netflix — suscripción por 1 mes</span><br/><span>Cuenta Completa</span><br/><span>Se envía correo y contraseña</span><br/><span>Uso solo con VPN</span></>
      : isInvitation ? <><span>Invitación personalizada en imagen o video de 15 a 20 segundos.</span><br/><span>Incluye ubicación y confirmación para asistentes.</span></>
      : product.description}
    </p>

    {isGemini && <div className="mt-2"><label className="mb-1 block text-[12px] font-semibold uppercase tracking-wider text-white/50 min-[760px]:text-[10px]">Cantidad de cuentas</label><select value={geminiQuantity} onChange={(e)=>setGeminiQuantity(Math.max(1,Number(e.target.value)))} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-[14px] font-semibold text-white outline-none focus:border-[#d6a83f]/60 min-[760px]:text-[11px]">{[1,2,3,4,5,6,7,8,9,10].map(q=><option key={q} value={q}>{q} {q===1?"cuenta":"cuentas"} — S/ {(q===1?20:q===2?17:q===3?14:10).toFixed(2)} c/u</option>)}</select></div>}

    {!isGemini && product.variants && product.variants.length>0 && <div className="mt-2"><label className="mb-1 block text-[12px] font-semibold uppercase tracking-wider text-white/50 min-[760px]:text-[10px]">Elige un paquete</label><select value={selectedVariantId} onChange={(e)=>setSelectedVariantId(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-[14px] font-semibold text-white outline-none focus:border-[#d6a83f]/60 min-[760px]:text-[11px]">{product.variants.map(v=><option key={v.id} value={v.id}>{v.label} — S/ {v.price.toFixed(2)}</option>)}</select></div>}

    <div className="mt-auto flex items-end justify-between gap-2 pt-3">
      <div className="min-w-0">
        <span className="inline-flex whitespace-nowrap rounded-md border border-[#d6a83f]/70 px-2 py-1 text-[16px] font-black leading-none xl:text-[17px]">S/ {displayedPrice.toFixed(2)}</span>
        {isGemini ? <><p className="mt-0.5 text-[12px] text-white/45 min-[760px]:text-[10px]">{geminiQuantity} {geminiQuantity===1?"cuenta":"cuentas"} · S/ {geminiUnitPrice.toFixed(2)} c/u</p><p className="mt-0.5 text-[12px] text-white/45 min-[760px]:text-[10px]">Suscripción: {product.duration}</p></> : <p className="mt-0.5 text-[12px] text-white/45 min-[760px]:text-[10px]">{selectedVariant ? selectedVariant.label : `Suscripción: ${product.duration}`}</p>}
        {product.guarantee && <p className="mt-1 inline-flex items-center gap-1 rounded-lg border border-[#d6a83f]/35 px-2 py-1 text-[11px] font-semibold text-[#f0cd78] min-[760px]:text-[9px]"><ShieldCheck className="h-3 w-3"/> Garantía: {product.guarantee}</p>}
      </div>
      <button type="button" onClick={addToCart} className={`shrink-0 rounded-xl px-3 py-2.5 text-[14px] font-bold transition min-[760px]:px-4 min-[760px]:py-2.5 min-[760px]:text-[12px] ${justAdded ? "bg-black text-white ring-2 ring-white/30" : "bg-[#f6bf2f] text-black hover:bg-[#ffd052]"}`}><ShoppingBag className="inline" size={14}/> {justAdded?"Añadido":"Añadir"}</button>
    </div>

    <Link href={`/producto/${product.id}`} className="mt-2 block text-center text-[14px] text-white/50 hover:text-white min-[760px]:text-[10px]">Ver detalles</Link>
  </article>;
}

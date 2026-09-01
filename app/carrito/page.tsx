"use client";

import Link from "next/link";
import { Mail, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { supabase } from "@/lib/supabase";

export default function CarritoPage() {
  const { items, remove, total } = useCart();
  const [email,setEmail]=useState<string|null>(null);
  useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>setEmail(data.session?.user.email??null));const{data:listener}=supabase.auth.onAuthStateChange((_event,session)=>setEmail(session?.user.email??null));return()=>listener.subscription.unsubscribe();},[]);
  return (
    <main className="mx-auto min-h-[75vh] max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black sm:text-5xl">Tu carrito</h1>
      <p className="mt-2 text-white/50 sm:text-lg">Revisa tu selección antes de continuar.</p>
      {email&&<div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#d5a536]/30 bg-[#d5a536]/[0.08] px-4 py-3.5 sm:max-w-xl"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#d5a536]/15 text-[#e4b94e]"><Mail size={19}/></div><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wider text-[#d8b65e]">Cuenta de compra</p><p className="truncate text-sm font-bold text-white sm:text-base" title={email}>{email}</p></div></div>}
      {items.length === 0 ? (
        <section className="relative mx-auto mt-10 w-full max-w-[940px] overflow-hidden rounded-[30px] border border-[#b98a25]/90 bg-gradient-to-b from-[#121212] to-[#090909] px-4 pb-8 pt-4 text-center shadow-[0_24px_80px_rgba(0,0,0,.58)] sm:px-8 sm:pb-10 sm:pt-6">
          <svg viewBox="0 0 900 315" className="mx-auto block w-full max-w-[820px]" aria-hidden="true">
            <defs>
              <radialGradient id="halo" cx="50%" cy="48%" r="50%"><stop offset="0%" stopColor="#D7A936" stopOpacity=".34"/><stop offset="100%" stopColor="#D7A936" stopOpacity="0"/></radialGradient>
              <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#FFE7A0"/><stop offset="45%" stopColor="#F0C85D"/><stop offset="100%" stopColor="#B98518"/></linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <ellipse cx="450" cy="160" rx="225" ry="145" fill="url(#halo)"/>
            <path d="M138 248 C220 218 282 263 354 244 C431 224 495 257 566 241 C648 222 698 190 770 153" stroke="#D7A83C" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="10 13" opacity=".92"/>
            <circle cx="450" cy="145" r="105" fill="#111" stroke="#C49731" strokeWidth="2"/>
            <circle cx="450" cy="145" r="90" fill="url(#halo)" opacity=".72"/>
            <ellipse cx="450" cy="252" rx="112" ry="9" fill="#E5B43D" opacity=".3" filter="url(#glow)"/>
            <g stroke="url(#gold)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
              <path d="M400 101H421L435 180H512L531 120H427"/>
              <path d="M442 143H511"/>
              <circle cx="448" cy="201" r="10"/>
              <circle cx="504" cy="201" r="10"/>
            </g>
            <g stroke="#F1C65A" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"><path d="M716 115L786 86L750 154L741 122L716 115Z"/><path d="M741 122L770 97"/></g>
            <g fill="#F2CA63"><path d="M304 63L310 76L323 82L310 88L304 101L298 88L285 82L298 76L304 63Z"/><path d="M603 44L610 60L626 67L610 74L603 90L596 74L580 67L596 60L603 44Z"/><circle cx="211" cy="139" r="7" fill="none" stroke="#E4B83E" strokeWidth="3"/><circle cx="343" cy="195" r="3.5"/><circle cx="661" cy="109" r="3.5"/></g>
          </svg>
          <div className="relative z-10 mx-auto max-w-2xl -mt-1 sm:-mt-3">
            <h2 className="text-[29px] font-black tracking-tight text-white sm:text-4xl lg:text-[42px]">Tu carrito está vacío</h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] leading-7 text-white/60 sm:text-xl sm:leading-8 lg:text-[21px]">Agrega productos desde nuestro catálogo<br className="hidden sm:block"/> y vuelve cuando quieras.</p>
            <Link href="/catalogo" className="mx-auto mt-7 flex w-full max-w-[390px] items-center justify-center gap-4 rounded-[20px] border border-[#ffe59b]/70 bg-gradient-to-r from-[#f7da7b] via-[#e8b43a] to-[#f4cc62] px-5 py-4 text-[20px] font-black text-black shadow-[0_14px_38px_rgba(219,171,56,.34),inset_0_1px_0_rgba(255,255,255,.6)] transition hover:-translate-y-0.5 hover:brightness-105 sm:max-w-[470px] sm:py-5 sm:text-2xl lg:text-[28px]">
              <span aria-hidden="true" className="text-[24px] leading-none">▣</span><span>Ver catálogo</span><span aria-hidden="true" className="text-[30px] leading-none">›</span>
            </Link>
          </div>
        </section>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">{items.map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div><p className="font-bold">{item.name}</p><p className="text-sm text-white/45">{item.duration}</p></div><div className="flex items-center gap-4"><span className="font-black">S/ {item.price.toFixed(2)}</span><button onClick={() => remove(item.id)} className="rounded-lg border border-white/10 p-2 text-white/50 hover:text-red-300" aria-label="Eliminar"><Trash2 size={17}/></button></div></div>)}</div>
          <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.05] p-6"><p className="text-sm text-white/50">Total</p><p className="mt-1 text-3xl font-black">S/ {total.toFixed(2)}</p><Link href="/checkout" className="mt-6 block rounded-xl bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 px-4 py-3 text-center font-black text-slate-950">Continuar al pago</Link></aside>
        </div>
      )}
    </main>
  );
}

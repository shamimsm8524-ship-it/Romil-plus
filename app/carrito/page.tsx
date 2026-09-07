"use client";

import Link from "next/link";
import { Mail, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { supabase } from "@/lib/supabase";

export default function CarritoPage() {
  const { items, remove, total } = useCart();
  const [email,setEmail]=useState<string|null>(null);
  useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>setEmail(data.session?.user.email??null));const{data:listener}=supabase.auth.onAuthStateChange((_event,session)=>setEmail(session?.user.email??null));return()=>listener.subscription.unsubscribe();},[]);
  return (
    <main className="relative mx-auto min-h-[75vh] max-w-5xl overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_8%,rgba(34,211,238,.16),transparent_27%),radial-gradient(circle_at_92%_10%,rgba(217,70,239,.17),transparent_27%),radial-gradient(circle_at_50%_95%,rgba(99,102,241,.14),transparent_34%)]"/>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#61ddff]/20 bg-[#61ddff]/[.07] px-3 py-1.5 text-[11px] font-black uppercase tracking-[.13em] text-[#c3f3ff]"><Sparkles size={13}/> Tu selección</div>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">TU <span className="text-[#e3b64f]">CARRITO</span></h1>
      <p className="mt-2 text-white/50 sm:text-lg">Revisa tu selección antes de continuar.</p>
      {email&&<div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#59dcff]/20 bg-[linear-gradient(90deg,rgba(39,180,255,.10),rgba(158,83,255,.09))] px-4 py-3.5 shadow-[0_0_25px_rgba(44,194,255,.07)] sm:max-w-xl"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(47,209,255,.22),rgba(166,89,255,.20))] text-[#c8f7ff]"><Mail size={19}/></div><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wider text-[#bfefff]">Cuenta de compra</p><p className="truncate text-sm font-bold text-white sm:text-base" title={email}>{email}</p></div></div>}
      {items.length === 0 ? (
        <section className="relative mx-auto mt-10 w-full max-w-[940px] overflow-hidden rounded-[30px] border border-[#7d7cff]/30 bg-[radial-gradient(circle_at_20%_15%,rgba(31,181,255,.16),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(225,66,255,.16),transparent_32%),linear-gradient(180deg,#10111a,#08090f)] px-4 pb-8 pt-4 text-center shadow-[0_24px_80px_rgba(0,0,0,.58),0_0_40px_rgba(91,121,255,.08)] sm:px-8 sm:pb-10 sm:pt-6">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#51dcff,#a66cff,#ff63c7,transparent)] opacity-80"/>
          <svg viewBox="0 0 900 315" className="mx-auto block w-full max-w-[820px]" aria-hidden="true">
            <defs>
              <radialGradient id="halo" cx="50%" cy="48%" r="50%"><stop offset="0%" stopColor="#6D5CFF" stopOpacity=".34"/><stop offset="55%" stopColor="#2CCBFF" stopOpacity=".14"/><stop offset="100%" stopColor="#D94DFF" stopOpacity="0"/></radialGradient>
              <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7EEBFF"/><stop offset="45%" stopColor="#B87BFF"/><stop offset="100%" stopColor="#FF74C8"/></linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <ellipse cx="450" cy="160" rx="225" ry="145" fill="url(#halo)"/>
            <path d="M138 248 C220 218 282 263 354 244 C431 224 495 257 566 241 C648 222 698 190 770 153" stroke="#64DFFF" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="10 13" opacity=".82"/>
            <circle cx="450" cy="145" r="105" fill="#11131c" stroke="#8D72FF" strokeWidth="2"/>
            <circle cx="450" cy="145" r="90" fill="url(#halo)" opacity=".72"/>
            <ellipse cx="450" cy="252" rx="112" ry="9" fill="#FF66C6" opacity=".25" filter="url(#glow)"/>
            <g stroke="url(#gold)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"><path d="M400 101H421L435 180H512L531 120H427"/><path d="M442 143H511"/><circle cx="448" cy="201" r="10"/><circle cx="504" cy="201" r="10"/></g>
            <g stroke="#73E8FF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"><path d="M716 115L786 86L750 154L741 122L716 115Z"/><path d="M741 122L770 97"/></g>
            <g fill="#FF78CA"><path d="M304 63L310 76L323 82L310 88L304 101L298 88L285 82L298 76L304 63Z"/><path d="M603 44L610 60L626 67L610 74L603 90L596 74L580 67L596 60L603 44Z"/><circle cx="211" cy="139" r="7" fill="none" stroke="#6FE6FF" strokeWidth="3"/><circle cx="343" cy="195" r="3.5"/><circle cx="661" cy="109" r="3.5"/></g>
          </svg>
          <div className="relative z-10 mx-auto max-w-2xl -mt-1 sm:-mt-3">
            <h2 className="text-[29px] font-black tracking-tight text-white sm:text-4xl lg:text-[42px]">Tu carrito está vacío</h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] leading-7 text-white/60 sm:text-xl sm:leading-8 lg:text-[21px]">Agrega productos desde nuestro catálogo<br className="hidden sm:block"/> y vuelve cuando quieras.</p>
            <Link href="/catalogo" className="mx-auto mt-7 flex w-full max-w-[390px] items-center justify-center gap-4 rounded-[20px] border border-white/20 bg-[linear-gradient(90deg,#51dcff,#8c72ff,#ff68c9,#ffd15d)] px-5 py-4 text-[20px] font-black text-slate-950 shadow-[0_14px_38px_rgba(111,105,255,.28),0_0_32px_rgba(255,86,199,.14),inset_0_1px_0_rgba(255,255,255,.7)] transition hover:-translate-y-0.5 hover:brightness-110 sm:max-w-[470px] sm:py-5 sm:text-2xl lg:text-[28px]"><span aria-hidden="true" className="text-[24px] leading-none">▣</span><span>Ver catálogo</span><span aria-hidden="true" className="text-[30px] leading-none">›</span></Link>
          </div>
        </section>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">{items.map((item,index) => <div key={item.id} className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(14,28,48,.78),rgba(29,12,43,.72))] p-5 shadow-[0_14px_36px_rgba(0,0,0,.28)]"><div className={`absolute left-0 top-0 h-full w-1 ${index%3===0?"bg-[#54ddff]":index%3===1?"bg-[#a56dff]":"bg-[#ff63c8]"}`}/><div><p className="font-bold">{item.name}</p><p className="text-sm text-white/45">{item.duration}</p></div><div className="flex items-center gap-4"><span className="rounded-xl border border-[#ffd55d]/25 bg-[#ffd55d]/[.06] px-3 py-2 font-black text-[#ffe27e]">S/ {item.price.toFixed(2)}</span><button onClick={() => remove(item.id)} className="rounded-lg border border-red-400/20 bg-red-400/[.06] p-2 text-red-200/70 transition hover:border-red-400/50 hover:bg-red-400/10 hover:text-red-200" aria-label="Eliminar"><Trash2 size={17}/></button></div></div>)}</div>
          <aside className="h-fit rounded-3xl border border-[#aa70ff]/20 bg-[radial-gradient(circle_at_top_right,rgba(220,66,255,.15),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(45,210,255,.12),transparent_38%),rgba(10,10,18,.9)] p-6 shadow-[0_18px_48px_rgba(0,0,0,.34),0_0_30px_rgba(157,92,255,.08)]"><p className="text-sm text-white/50">Total</p><p className="mt-1 text-3xl font-black text-[#ffe27c]">S/ {total.toFixed(2)}</p><Link href="/checkout" className="mt-6 block rounded-xl bg-[linear-gradient(90deg,#52ddff,#8c72ff,#ff63c7)] px-4 py-3 text-center font-black text-slate-950 shadow-[0_0_26px_rgba(123,106,255,.16)] transition hover:brightness-110">Continuar al pago</Link></aside>
        </div>
      )}
    </main>
  );
}

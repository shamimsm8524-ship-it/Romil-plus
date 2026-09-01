"use client";

import Link from "next/link";
import { BookOpen, ChevronRight, Mail, Send, ShoppingCart, Sparkles, Trash2 } from "lucide-react";
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
        <section className="relative mt-10 overflow-hidden rounded-[28px] border border-[#d6a83f]/45 bg-[radial-gradient(circle_at_top,rgba(214,168,63,.11),transparent_38%),linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.018))] px-5 py-8 text-center shadow-[0_20px_70px_rgba(0,0,0,.35)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute inset-x-[12%] top-[33%] h-px bg-gradient-to-r from-transparent via-[#e1b349]/60 to-transparent shadow-[0_0_18px_rgba(225,179,73,.9)]"/>
          <div className="relative mx-auto flex min-h-[150px] max-w-2xl items-center justify-center sm:min-h-[175px]">
            <Sparkles className="absolute left-[10%] top-[22%] h-5 w-5 text-[#f2c65b] sm:h-6 sm:w-6"/>
            <Sparkles className="absolute right-[16%] top-[12%] h-6 w-6 text-[#f2c65b] sm:h-7 sm:w-7"/>
            <span className="absolute left-[19%] bottom-[18%] h-2.5 w-2.5 rounded-full border border-[#d8aa42]"/>
            <div className="absolute left-[15%] right-[16%] bottom-[27%] border-t-2 border-dashed border-[#d8aa42]/80"/>
            <Send className="absolute right-[8%] bottom-[17%] h-10 w-10 rotate-[-8deg] text-[#efc45f] sm:h-12 sm:w-12" strokeWidth={1.7}/>
            <div className="relative z-10 grid h-28 w-28 place-items-center rounded-full border border-[#d6a83f]/40 bg-black/45 shadow-[0_0_35px_rgba(214,168,63,.18)] sm:h-32 sm:w-32 lg:h-36 lg:w-36">
              <ShoppingCart className="h-14 w-14 text-[#f1cf78] drop-shadow-[0_0_12px_rgba(241,207,120,.38)] sm:h-16 sm:w-16 lg:h-20 lg:w-20" strokeWidth={1.9}/>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">Tu carrito está vacío</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/58 sm:text-base sm:leading-7 lg:text-lg">Agrega productos desde nuestro catálogo y vuelve cuando quieras.</p>
            <Link href="/catalogo" className="mx-auto mt-6 flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border border-[#f6d77b]/50 bg-gradient-to-r from-[#f5cf69] via-[#e8b942] to-[#f2c75f] px-5 py-4 text-base font-black text-black shadow-[0_10px_32px_rgba(219,171,56,.28),inset_0_1px_0_rgba(255,255,255,.45)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 sm:text-lg lg:max-w-md lg:py-5 lg:text-xl">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6"/>
              Ver catálogo
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.6}/>
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

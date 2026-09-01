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
        <section className="relative mt-10 overflow-hidden rounded-[30px] border border-[#d8aa42]/55 bg-[radial-gradient(circle_at_50%_16%,rgba(224,178,72,.14),transparent_28%),linear-gradient(180deg,#121212_0%,#0b0b0b_100%)] px-5 pb-8 pt-7 text-center shadow-[0_26px_80px_rgba(0,0,0,.5),inset_0_0_0_1px_rgba(255,255,255,.015)] sm:px-9 sm:pb-10 sm:pt-9 lg:px-14 lg:pb-12 lg:pt-11">
          <div className="relative mx-auto h-[205px] max-w-3xl sm:h-[235px] lg:h-[260px]">
            <div className="absolute inset-x-[16%] bottom-[38px] h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#dcae3c] to-transparent shadow-[0_0_26px_rgba(231,182,61,.95)]"/>
            <div className="absolute left-[13%] right-[17%] bottom-[68px] border-t-2 border-dashed border-[#d8aa42]/75"/>
            <Sparkles className="absolute left-[24%] top-[26%] h-5 w-5 text-[#f2c65b] sm:h-6 sm:w-6"/>
            <Sparkles className="absolute right-[26%] top-[19%] h-6 w-6 text-[#f2c65b] sm:h-7 sm:w-7"/>
            <span className="absolute left-[17%] top-[54%] h-3 w-3 rounded-full border border-[#d8aa42]"/>
            <span className="absolute left-[31%] top-[63%] h-1.5 w-1.5 rounded-full bg-[#d8aa42]"/>
            <Send className="absolute right-[10%] bottom-[58px] h-12 w-12 rotate-[-10deg] text-[#efc45f] sm:h-14 sm:w-14 lg:h-16 lg:w-16" strokeWidth={1.7}/>
            <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-[46%] place-items-center rounded-full border border-[#d6a83f]/50 bg-[radial-gradient(circle,rgba(214,168,63,.11),rgba(0,0,0,.7)_70%)] shadow-[0_0_42px_rgba(214,168,63,.22)] sm:h-36 sm:w-36 lg:h-40 lg:w-40">
              <ShoppingCart className="h-16 w-16 text-[#f3d17d] drop-shadow-[0_0_14px_rgba(243,209,125,.5)] sm:h-20 sm:w-20 lg:h-24 lg:w-24" strokeWidth={1.8}/>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-[27px] font-black tracking-tight text-white sm:text-3xl lg:text-4xl">Tu carrito está vacío</h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-6 text-white/60 sm:text-lg sm:leading-7">Agrega productos desde nuestro catálogo<br className="hidden sm:block"/> y vuelve cuando quieras.</p>
            <Link href="/catalogo" className="mx-auto mt-7 flex w-full max-w-[360px] items-center justify-center gap-3 rounded-2xl border border-[#ffe396]/60 bg-gradient-to-r from-[#f6d779] via-[#e9b63e] to-[#f4ce67] px-5 py-4 text-[18px] font-black text-black shadow-[0_12px_34px_rgba(219,171,56,.32),inset_0_1px_0_rgba(255,255,255,.55)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 sm:max-w-[430px] sm:py-5 sm:text-xl lg:text-2xl">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2}/>
              Ver catálogo
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.8}/>
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

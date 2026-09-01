"use client";

import Link from "next/link";
import { BookOpen, ChevronRight, Mail, Trash2 } from "lucide-react";
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
        <section className="relative mt-10 overflow-hidden rounded-[30px] border border-[#c99a2c]/70 bg-[radial-gradient(circle_at_50%_18%,rgba(222,173,49,.10),transparent_34%),linear-gradient(180deg,#101010_0%,#080808_100%)] px-4 pb-8 pt-5 text-center shadow-[0_24px_80px_rgba(0,0,0,.58),inset_0_0_0_1px_rgba(255,255,255,.02)] sm:px-8 sm:pb-10 sm:pt-7 lg:px-12 lg:pb-12 lg:pt-9">
          <div className="mx-auto w-full max-w-[760px]">
            <img src="/empty-cart-premium.svg" alt="Carrito vacío" className="mx-auto w-full max-w-[700px] select-none" draggable={false}/>
          </div>
          <div className="relative z-10 mx-auto -mt-3 max-w-2xl sm:-mt-5">
            <h2 className="text-[29px] font-black tracking-tight text-white sm:text-4xl lg:text-[42px]">Tu carrito está vacío</h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] leading-7 text-white/60 sm:text-xl sm:leading-8 lg:text-[21px]">Agrega productos desde nuestro catálogo<br className="hidden sm:block"/> y vuelve cuando quieras.</p>
            <Link href="/catalogo" className="mx-auto mt-7 flex w-full max-w-[390px] items-center justify-center gap-3 rounded-[20px] border border-[#ffe59b]/70 bg-gradient-to-r from-[#f7da7b] via-[#e8b43a] to-[#f4cc62] px-5 py-4 text-[20px] font-black text-black shadow-[0_14px_38px_rgba(219,171,56,.34),inset_0_1px_0_rgba(255,255,255,.6)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 sm:max-w-[470px] sm:py-5 sm:text-2xl lg:text-[28px]">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" strokeWidth={2.1}/>
              Ver catálogo
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" strokeWidth={2.8}/>
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

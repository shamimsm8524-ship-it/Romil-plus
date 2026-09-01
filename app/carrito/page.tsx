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
        <section className="relative mx-auto mt-10 w-full max-w-[900px]">
          <img src="/empty-cart-card.svg" alt="Tu carrito está vacío. Agrega productos desde nuestro catálogo y vuelve cuando quieras. Ver catálogo." className="block h-auto w-full select-none" draggable={false}/>
          <Link href="/catalogo" aria-label="Ver catálogo" className="absolute left-[24.5%] top-[75.1%] h-[15.9%] w-[51.1%] rounded-[20px] focus:outline-none focus:ring-4 focus:ring-[#f0c65b]/60"/>
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

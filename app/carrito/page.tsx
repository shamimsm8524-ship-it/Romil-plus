"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CarritoPage() {
  const { items, remove, total } = useCart();
  return (
    <main className="mx-auto min-h-[75vh] max-w-5xl px-4 py-14">
      <h1 className="text-4xl font-black">Tu carrito</h1>
      <p className="mt-2 text-white/50">Revisa tu selección antes de continuar.</p>
      {items.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center"><p className="text-xl font-bold">Tu carrito está vacío</p><Link href="/catalogo" className="mt-5 inline-block rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Ir al catálogo</Link></div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">{items.map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div><p className="font-bold">{item.name}</p><p className="text-sm text-white/45">{item.duration}</p></div><div className="flex items-center gap-4"><span className="font-black">S/ {item.price.toFixed(2)}</span><button onClick={() => remove(item.id)} className="rounded-lg border border-white/10 p-2 text-white/50 hover:text-red-300" aria-label="Eliminar"><Trash2 size={17}/></button></div></div>)}</div>
          <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.05] p-6"><p className="text-sm text-white/50">Total</p><p className="mt-1 text-3xl font-black">S/ {total.toFixed(2)}</p><Link href="/checkout" className="mt-6 block rounded-xl bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 px-4 py-3 text-center font-black text-slate-950">Continuar al pago</Link></aside>
        </div>
      )}
    </main>
  );
}

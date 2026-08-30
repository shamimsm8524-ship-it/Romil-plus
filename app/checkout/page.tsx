"use client";

import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const { items, total } = useCart();
  return (
    <main className="mx-auto min-h-[75vh] max-w-4xl px-4 py-14">
      <h1 className="text-4xl font-black">Checkout</h1>
      <p className="mt-2 text-white/50">Base preparada para integrar pagos reales y confirmación de pedidos.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold">Datos del comprador</h2>
          <div className="mt-5 space-y-3"><input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="Nombre completo"/><input type="email" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="Correo electrónico"/><input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="WhatsApp"/></div>
          <p className="mt-5 text-xs leading-5 text-amber-200/70">La integración de Yape/Plin o una pasarela como Culqi/Mercado Pago se realizará después de configurar las credenciales comerciales.</p>
        </section>
        <aside className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
          <h2 className="text-xl font-bold">Resumen</h2>
          <div className="mt-5 space-y-3">{items.map((item) => <div key={item.id} className="flex justify-between text-sm"><span className="text-white/60">{item.name}</span><span>S/ {item.price.toFixed(2)}</span></div>)}</div>
          <div className="mt-6 border-t border-white/10 pt-5"><div className="flex justify-between"><span className="font-bold">Total</span><span className="text-2xl font-black">S/ {total.toFixed(2)}</span></div></div>
          <button disabled className="mt-6 w-full cursor-not-allowed rounded-xl bg-white/15 px-4 py-3 font-bold text-white/50">Pago pendiente de integración</button>
        </aside>
      </div>
    </main>
  );
}

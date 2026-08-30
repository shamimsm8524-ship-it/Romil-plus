import Link from "next/link";
import { Bolt, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

const benefits = [
  { icon: ShieldCheck, title: "Compra segura", text: "Productos y accesos gestionados con trazabilidad." },
  { icon: Bolt, title: "Entrega rápida", text: "Flujo preparado para automatizar entregas digitales." },
  { icon: Headphones, title: "Soporte", text: "Atención para incidencias, renovación y activación." },
  { icon: Sparkles, title: "Todo en un lugar", text: "IA, diseño, productividad, video y educación." },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid min-h-[72vh] max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-200">ROMIL PLUS</span>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.95] tracking-tight sm:text-7xl">Todas tus herramientas digitales <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">en un solo lugar.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">Una tienda digital moderna para descubrir, comprar y administrar suscripciones y licencias autorizadas.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalogo" className="rounded-2xl bg-white px-6 py-3 font-bold text-slate-950 hover:bg-cyan-100">Explorar catálogo</Link>
            <Link href="/mis-compras" className="rounded-2xl border border-white/15 px-6 py-3 font-bold hover:bg-white/5">Mis compras</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-violet-950/40">
          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/15 to-fuchsia-500/10 p-8">
            <p className="text-sm text-white/50">Experiencia ROMIL+</p>
            <p className="mt-3 text-3xl font-black">Compra. Activa. Administra.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {categories.slice(0, 4).map((category) => <div key={category} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-white/70">{category}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-4">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><Icon className="text-cyan-300" size={22}/><h2 className="mt-4 font-bold">{title}</h2><p className="mt-1 text-sm leading-6 text-white/50">{text}</p></div>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-wider text-violet-300">Catálogo</p><h2 className="mt-2 text-3xl font-black">Productos destacados</h2></div><Link href="/catalogo" className="text-sm text-white/60 hover:text-white">Ver todos →</Link></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </main>
  );
}

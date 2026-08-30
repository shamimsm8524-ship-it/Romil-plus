import Link from "next/link";
import { Bolt, Headphones, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

const benefits = [
  { icon: ShieldCheck, title: "100% Seguras", text: "Licencias originales y verificadas" },
  { icon: Bolt, title: "Entrega Instantánea", text: "Acceso inmediato tras la compra" },
  { icon: Headphones, title: "Soporte Dedicado", text: "Estamos aquí para ayudarte" },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto grid min-h-[72vh] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
        <div className="pointer-events-none absolute inset-y-0 right-[-18%] w-[70%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,.24),transparent_55%)] blur-2xl" />
        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-cyan-400/70 bg-slate-950/40 px-5 py-2 text-xs font-black uppercase tracking-[.28em]">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">ROMIL</span>
            <span className="ml-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">PLUS</span>
          </span>

          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[.95] tracking-tight sm:text-7xl">
            Todas tus herramientas digitales <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">en un solo lugar.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">
            Una tienda digital moderna para descubrir, comprar y administrar suscripciones y licencias autorizadas.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/catalogo" className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-500 px-6 py-3 font-bold text-white shadow-lg shadow-violet-950/40 hover:opacity-90">
              Explorar catálogo
            </Link>
            <Link href="/mis-compras" className="rounded-2xl border border-white/20 bg-slate-950/20 px-6 py-3 font-bold hover:bg-white/5">
              Mis compras
            </Link>
          </div>
        </div>

        <div className="relative z-10 hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-violet-950/40 lg:block">
          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/15 to-fuchsia-500/10 p-8">
            <p className="text-sm text-white/50">Experiencia ROMIL+</p>
            <p className="mt-3 text-3xl font-black">Compra. Activa. Administra.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {categories.slice(0, 4).map((category) => (
                <div key={category} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-white/70">{category}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className={`flex gap-4 p-6 ${index < benefits.length - 1 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""}`}>
              <Icon className={index === 1 ? "text-violet-400" : "text-cyan-400"} size={34} strokeWidth={2} />
              <div>
                <h2 className="font-bold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-white/50">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-violet-300">Catálogo</p>
            <h2 className="mt-2 text-3xl font-black">Productos destacados</h2>
          </div>
          <Link href="/catalogo" className="text-sm text-white/60 hover:text-white">Ver todos →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { ArrowRight, Bolt, ClipboardList, Headphones, ShieldCheck, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const benefits = [
  { icon: ShieldCheck, title: "100% Seguras", text: "Licencias originales y verificadas" },
  { icon: Bolt, title: "Entrega Instantánea", text: "Acceso inmediato tras la compra" },
  { icon: Headphones, title: "Soporte Dedicado", text: "Estamos aquí para ayudarte" },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#050505] text-[#f7f2e8]">
      <section className="relative mx-auto min-h-[76vh] max-w-7xl px-4 py-14 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-6 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#c9a64f]/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-[-14%] top-24 h-[520px] w-[520px] rounded-full border border-[#d7b257]/30 shadow-[0_0_90px_rgba(215,178,87,.12)]" />
        <div className="pointer-events-none absolute right-[-9%] top-36 h-[420px] w-[420px] rounded-full border border-[#f0cf71]/20" />

        <div className="relative z-10 mx-auto max-w-5xl text-center lg:text-left">
          <span className="inline-flex rounded-full border border-[#d7b257]/60 bg-[#d7b257]/[0.035] px-6 py-2.5 text-[11px] font-black uppercase tracking-[.34em] text-[#e5c56d] shadow-[0_0_30px_rgba(215,178,87,.08)]">
            ROMIL PLUS
          </span>

          <h1 className="mt-8 text-5xl font-black leading-[.96] tracking-[-0.05em] text-[#fbf8f1] sm:text-6xl lg:max-w-4xl lg:text-7xl">
            Todas tus herramientas digitales <span className="bg-gradient-to-r from-[#f7e3a1] via-[#d9ad4b] to-[#b88124] bg-clip-text text-transparent">en un solo lugar.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#b2aa9d] sm:text-lg lg:mx-0">
            Una experiencia digital elegante para descubrir, comprar y administrar suscripciones y licencias autorizadas.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href="/catalogo" className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#f4df95] via-[#d7b153] to-[#b8862b] px-7 py-3.5 font-black text-[#080705] shadow-[0_14px_45px_rgba(190,145,45,.24)] transition hover:brightness-105">
              <ShoppingBag size={19} />
              Explorar catálogo
              <ArrowRight size={18} />
            </Link>
            <Link href="/mis-compras" className="inline-flex items-center gap-3 rounded-2xl border border-[#d7b257]/45 bg-white/[0.015] px-7 py-3.5 font-bold text-[#f7f2e8] transition hover:border-[#d7b257]/70 hover:bg-[#d7b257]/[0.06]">
              <ClipboardList size={19} className="text-[#e5c56d]" />
              Mis compras
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid overflow-hidden rounded-[2rem] border border-[#d7b257]/30 bg-gradient-to-b from-[#11100d] to-[#090908] shadow-[0_24px_80px_rgba(0,0,0,.45)] md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className={`flex gap-4 p-6 sm:p-7 ${index < benefits.length - 1 ? "border-b border-[#d7b257]/20 md:border-b-0 md:border-r" : ""}`}>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#d7b257]/25 bg-[#d7b257]/[0.05]">
                <Icon className="text-[#e3bd5f]" size={26} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="font-extrabold text-[#f7f2e8]">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-[#9d9588]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#d7b257]">Catálogo</p>
            <h2 className="mt-2 text-3xl font-black text-[#f7f2e8]">Productos destacados</h2>
          </div>
          <Link href="/catalogo" className="text-sm font-semibold text-[#b8af9e] transition hover:text-[#e5c56d]">Ver todos →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}

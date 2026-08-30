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
      <section className="relative mx-auto min-h-[78vh] max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-35%] top-24 h-[560px] w-[560px] rounded-full border border-[#d5aa43]/45 shadow-[0_0_110px_rgba(213,170,67,.10)] sm:right-[-22%]" />
        <div className="pointer-events-none absolute right-[-26%] top-40 h-[430px] w-[430px] rounded-full border border-[#efcc6a]/18" />
        <div className="pointer-events-none absolute left-[-18%] bottom-[-12%] h-[280px] w-[280px] rounded-full bg-[#d4aa43]/8 blur-[90px]" />

        <div className="relative z-10 max-w-[760px] text-left">
          <div className="flex items-center gap-4">
            <span className="hidden h-px w-16 bg-[#d7b257]/70 sm:block" />
            <span className="inline-flex rounded-full border border-[#d7b257]/65 bg-[#d7b257]/[0.025] px-6 py-2.5 text-[11px] font-black uppercase tracking-[.34em] text-[#e6c362] shadow-[0_0_30px_rgba(215,178,87,.06)]">
              ROMIL PLUS
            </span>
            <span className="hidden h-px w-16 bg-[#d7b257]/70 sm:block" />
          </div>

          <h1 className="mt-9 max-w-[720px] text-[48px] font-black leading-[.94] tracking-[-0.055em] text-[#fbf9f4] sm:text-6xl lg:text-7xl">
            Todas tus herramientas digitales <span className="bg-gradient-to-r from-[#f3d989] via-[#d4a941] to-[#a9781f] bg-clip-text text-transparent">en un solo lugar.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-[17px] leading-8 text-[#bcb4a8] sm:text-lg">
            Una experiencia digital elegante para descubrir, comprar y administrar suscripciones y licencias autorizadas.
          </p>

          <div className="mt-9 grid max-w-[680px] grid-cols-2 gap-3">
            <Link href="/catalogo" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f4dc8c] via-[#d8b04e] to-[#b67e22] px-4 py-3.5 text-center text-sm font-black text-[#080705] shadow-[0_14px_45px_rgba(190,145,45,.20)] transition hover:brightness-105 sm:gap-3 sm:px-7 sm:text-base">
              <ShoppingBag size={19} />
              <span>Explorar catálogo</span>
              <ArrowRight size={18} className="hidden sm:block" />
            </Link>
            <Link href="/mis-compras" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-[#d7b257]/55 bg-white/[0.01] px-4 py-3.5 text-center text-sm font-bold text-[#f7f2e8] transition hover:border-[#d7b257]/75 hover:bg-[#d7b257]/[0.05] sm:gap-3 sm:px-7 sm:text-base">
              <ClipboardList size={19} className="text-[#e5c56d]" />
              <span>Mis compras</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6">
        <div className="grid overflow-hidden rounded-[28px] border border-[#d7b257]/35 bg-gradient-to-b from-[#11100d] to-[#090908] shadow-[0_24px_80px_rgba(0,0,0,.45)] md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className={`flex items-center gap-4 p-6 sm:p-7 ${index < benefits.length - 1 ? "border-b border-[#d7b257]/20 md:border-b-0 md:border-r" : ""}`}>
              <Icon className="shrink-0 text-[#e1bd62]" size={34} strokeWidth={1.75} />
              <div>
                <h2 className="font-extrabold text-[#f7f2e8]">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-[#a69e92]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6">
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

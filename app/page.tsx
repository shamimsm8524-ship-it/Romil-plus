import Link from "next/link";
import { Bolt, ClipboardList, Headphones, ShieldCheck, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const benefits = [
  { icon: ShieldCheck, title: "100% Seguras", text: "Licencias originales y verificadas" },
  { icon: Bolt, title: "Entrega Instantánea", text: "Acceso inmediato tras la compra" },
  { icon: Headphones, title: "Soporte Dedicado", text: "Estamos aquí para ayudarte" },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#050505] text-white">
      <section className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:pt-20">
        <div className="pointer-events-none absolute right-[-32%] top-[28%] h-[420px] w-[420px] rounded-full bg-[#d6a33b]/[0.07] blur-[100px]" />

        <div className="relative z-10 max-w-[760px]">
          <span className="inline-flex rounded-full border border-[#d5aa43]/70 px-6 py-2.5 text-[11px] font-black uppercase tracking-[.32em] text-[#e7c263]">ROMIL PLUS</span>

          <h1 className="mt-9 max-w-[720px] text-[46px] font-black leading-[0.98] tracking-[-0.045em] text-[#fbfaf6] sm:text-6xl lg:text-7xl">
            Todas tus herramientas digitales <span className="bg-gradient-to-r from-[#f4dc8a] via-[#d8aa43] to-[#b67b20] bg-clip-text text-transparent">en un solo lugar.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-[16px] leading-7 text-[#b7b0a5] sm:text-lg sm:leading-8">
            Una experiencia digital elegante para descubrir, comprar y administrar suscripciones y licencias autorizadas.
          </p>

          <div className="mt-9 grid grid-cols-1 gap-3 sm:max-w-[680px] sm:grid-cols-2">
            <Link href="/catalogo" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#f5df92] via-[#d9b04d] to-[#b98226] px-6 py-3.5 font-black text-[#080705] shadow-[0_14px_40px_rgba(190,145,45,.20)]">
              <ShoppingBag size={19} /> Explorar catálogo
            </Link>
            <Link href="/mis-compras" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-[#d5aa43]/55 px-6 py-3.5 font-bold text-white">
              <ClipboardList size={19} className="text-[#e4be5e]" /> Mis compras
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6">
        <div className="grid overflow-hidden rounded-[28px] border border-[#d5aa43]/30 bg-[#0a0a09] md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className={`flex items-center gap-4 p-6 ${index < benefits.length - 1 ? "border-b border-[#d5aa43]/20 md:border-b-0 md:border-r" : ""}`}>
              <Icon className="shrink-0 text-[#e1b957]" size={32} strokeWidth={1.7} />
              <div><h2 className="font-extrabold">{title}</h2><p className="mt-1 text-sm leading-6 text-[#a49d92]">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><p className="text-sm font-black uppercase tracking-[.2em] text-[#d7b257]">Catálogo</p><h2 className="mt-2 text-3xl font-black">Productos destacados</h2></div>
          <Link href="/catalogo" className="text-sm text-[#b8af9e]">Ver todos →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </main>
  );
}

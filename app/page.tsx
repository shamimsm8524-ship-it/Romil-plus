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
    <main className="overflow-hidden bg-black text-white">
      <section className="relative mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
        <div className="pointer-events-none absolute -right-[46%] top-[14%] h-[760px] w-[760px] rounded-full border border-[#d9aa42]/60 shadow-[-8px_0_28px_rgba(240,184,62,.28),inset_10px_0_35px_rgba(215,158,43,.08)] sm:-right-[30%]" />
        <div className="pointer-events-none absolute right-[-18%] top-[24%] h-[430px] w-[180px] rounded-full bg-[#d79b2b]/10 blur-[70px]" />

        <div className="relative z-10 max-w-[720px]">
          <span className="inline-flex rounded-full border border-[#d8aa3d]/75 px-6 py-2.5 text-[11px] font-black uppercase tracking-[.30em] text-[#e9bf55]">ROMIL PLUS</span>
          <h1 className="mt-9 text-[46px] font-black leading-[1.01] tracking-[-.045em] text-[#fbfaf7] sm:text-6xl lg:text-7xl">
            Todas tus<br className="sm:hidden"/> herramientas<br className="sm:hidden"/> digitales <span className="bg-gradient-to-r from-[#f4d979] via-[#dda942] to-[#bd7e22] bg-clip-text text-transparent">en un<br className="sm:hidden"/> solo lugar.</span>
          </h1>
          <p className="mt-7 max-w-[620px] text-[16px] leading-8 text-[#bdb8b0] sm:text-lg">Una tienda digital elegante para descubrir, comprar y administrar suscripciones y licencias autorizadas.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-[700px]">
            <Link href="/catalogo" className="inline-flex min-h-[64px] items-center justify-center gap-3 rounded-[16px] bg-gradient-to-r from-[#ffe187] via-[#e1b64e] to-[#bd8429] px-4 font-black text-black shadow-[0_10px_35px_rgba(201,151,45,.18)]"><ShoppingBag size={21}/> <span>Explorar catálogo</span></Link>
            <Link href="/mis-compras" className="inline-flex min-h-[64px] items-center justify-center gap-3 rounded-[16px] border border-[#d4a43b]/65 bg-black/70 px-4 font-bold text-white"><ClipboardList size={21}/> <span>Mis compras</span></Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-7 sm:px-8">
        <div className="grid overflow-hidden rounded-[28px] border border-[#c99b35]/45 bg-[#090909]/95 sm:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className={`flex flex-col items-center px-5 py-7 text-center ${index < 2 ? "border-b border-[#b98a2e]/20 sm:border-b-0 sm:border-r" : ""}`}>
              <Icon size={42} strokeWidth={1.7} className="mb-4 text-[#e5b84f]"/>
              <h2 className="text-[16px] font-extrabold">{title}</h2>
              <p className="mt-2 max-w-[190px] text-sm leading-6 text-[#aaa39a]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[.2em] text-[#d7b257]">Catálogo</p><h2 className="mt-2 text-3xl font-black">Productos destacados</h2></div><Link href="/catalogo" className="text-sm text-[#b8af9e]">Ver todos →</Link></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product}/>)}</div>
      </section>
    </main>
  );
}

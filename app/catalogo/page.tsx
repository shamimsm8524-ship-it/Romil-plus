import type { Metadata } from "next";
import { Headphones, ShieldCheck, Zap, Star, Grid2X2, Brain, Palette, Video, Users, Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo de suscripciones y herramientas digitales",
  description: "Explora el catálogo de ROMIL PLUS: herramientas digitales, diseño, edición de video, inteligencia artificial y productividad con atención en Perú.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo digital | ROMIL PLUS",
    description: "Explora las opciones digitales disponibles en ROMIL PLUS.",
    url: "/catalogo",
    type: "website",
    images: ["/logo-romil-plus.png"],
  },
};

const desktopCategories = [
  { label: "Todos los productos", icon: Grid2X2 },
  { label: "Inteligencia Artificial", icon: Brain },
  { label: "Diseño", icon: Palette },
  { label: "Edición de Videos", icon: Video },
  { label: "Redes Sociales", icon: Users },
];

export default function CatalogoPage() {
  return (
    <main className="mx-auto min-h-[75vh] w-full max-w-[1540px] px-4 py-8 sm:px-6 md:px-6 md:py-6 min-[1100px]:px-8 min-[1100px]:py-7 2xl:px-10">
      <section className="mx-auto w-full">
        {/* Móvil y tablet: se conserva el diseño actual */}
        <div className="min-[1100px]:hidden">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.16em] text-[#e2b44c]">ROMIL+ STORE</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Catálogo digital</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55 sm:text-base">Los productos mostrados son una base editable. Publica únicamente licencias o accesos que estés autorizado a comercializar.</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <span key={category} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">{category}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] sm:grid sm:grid-cols-3">
            <div className="flex min-h-[68px] items-center justify-center gap-3 border-b border-white/10 px-4 sm:border-b-0 sm:border-r">
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#e3b64f]"/>
              <div><p className="text-xs font-black uppercase">Garantía</p><p className="mt-0.5 text-[11px] font-bold text-[#e3b64f]">Hasta 12 meses</p></div>
            </div>
            <div className="flex min-h-[68px] items-center justify-center gap-3 border-b border-white/10 px-4 sm:border-b-0 sm:border-r">
              <Zap className="h-6 w-6 shrink-0 text-[#e3b64f]"/>
              <div><p className="text-xs font-black uppercase">Entrega</p><p className="mt-0.5 text-[11px] font-bold">Inmediata</p></div>
            </div>
            <div className="flex min-h-[68px] items-center justify-center gap-3 px-4">
              <Headphones className="h-6 w-6 shrink-0 text-[#e3b64f]"/>
              <div><p className="text-xs font-black uppercase">Soporte</p><p className="mt-0.5 text-[11px] font-bold">24/7</p></div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">PRODUCTOS <span className="text-[#e3b64f]">DESTACADOS</span></h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#e3b64f]"/>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>

        {/* Escritorio: nuevo diseño amplio y profesional */}
        <div className="hidden min-[1100px]:block">
          <div className="relative overflow-hidden rounded-[26px] border border-[#d6a83f]/30 bg-[radial-gradient(circle_at_82%_20%,rgba(214,168,63,.20),transparent_28%),linear-gradient(115deg,#11100c_0%,#080808_50%,#0c0b08_100%)] px-9 py-8 shadow-[0_22px_70px_rgba(0,0,0,.35)] xl:px-11 xl:py-9">
            <div className="absolute -right-20 -top-40 h-[430px] w-[430px] rounded-full border border-[#d6a83f]/15"/>
            <div className="absolute -right-5 -top-24 h-[300px] w-[300px] rounded-full border border-[#d6a83f]/10"/>
            <div className="relative z-10 flex items-center justify-between gap-10">
              <div className="max-w-[880px]">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#d6a83f]/60 bg-[#d6a83f]/10 px-3 py-2 text-[11px] font-black uppercase tracking-[.15em] text-[#f0c75f]">
                  <ShieldCheck className="h-4 w-4"/> Productos digitales
                </div>
                <h1 className="mt-4 text-[42px] font-black leading-none tracking-tight xl:text-[48px]">Catálogo de <span className="text-[#f4be31]">Productos</span></h1>
                <p className="mt-4 max-w-[780px] text-[16px] leading-7 text-white/62 xl:text-[17px]">Encuentra tus herramientas digitales en un catálogo más ordenado, amplio y fácil de revisar desde computadora.</p>
                <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[13px] font-semibold text-white/72">
                  <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#f4be31]"/> Compra segura</span>
                  <span className="flex items-center gap-2"><Zap className="h-5 w-5 text-[#f4be31]"/> Entrega rápida</span>
                  <span className="flex items-center gap-2"><Headphones className="h-5 w-5 text-[#f4be31]"/> Soporte disponible</span>
                  <span className="flex items-center gap-2"><Star className="h-5 w-5 text-[#f4be31]"/> Atención personalizada</span>
                </div>
              </div>
              <div className="flex h-[150px] w-[265px] shrink-0 items-center justify-center rounded-[24px] border border-[#d6a83f]/20 bg-black/25 xl:w-[300px]">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d6a83f]/15 text-[#f4be31]"><Grid2X2 className="h-7 w-7"/></div>
                  <p className="mt-3 text-sm font-black">ROMIL PLUS</p>
                  <p className="mt-1 text-xs text-white/45">Tu mundo digital en un solo lugar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[245px_minmax(0,1fr)] gap-5 xl:grid-cols-[265px_minmax(0,1fr)] xl:gap-6">
            <aside className="self-start rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,#0e1215,#091015)] p-4 shadow-[0_16px_45px_rgba(0,0,0,.28)]">
              <p className="px-2 pb-3 text-[11px] font-black uppercase tracking-[.16em] text-white/35">Categorías</p>
              <div className="space-y-2">
                {desktopCategories.map(({label, icon: Icon}, index) => (
                  <div key={label} className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-[13px] font-bold ${index===0 ? "bg-[#f4be31] text-black" : "border border-transparent text-white/72 hover:border-white/10 hover:bg-white/[.04]"}`}>
                    <span className="flex items-center gap-3"><Icon className="h-[18px] w-[18px]"/>{label}</span>
                    <span className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] ${index===0 ? "bg-black/15" : "border border-white/15 bg-white/[.04] text-white/65"}`}>{index===0 ? products.length : 1}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6a83f]/40 bg-[#d6a83f]/10 text-[#f4be31]"><Headphones className="h-5 w-5"/></div>
                <p className="mt-3 text-sm font-black">¿Necesitas ayuda?</p>
                <p className="mt-1 text-xs leading-5 text-white/50">Estamos aquí para ayudarte con tu compra.</p>
                <a href="/soporte" className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#f4be31] px-3 py-3 text-xs font-black text-black transition hover:bg-[#ffd35b]">Ir a soporte</a>
              </div>
            </aside>

            <div className="min-w-0 rounded-[22px] border border-white/10 bg-[#080b0e]/65 p-4 shadow-[0_16px_45px_rgba(0,0,0,.24)] xl:p-5">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-[22px] font-black tracking-tight">Productos disponibles</h2>
                  <p className="mt-1 text-[12px] text-white/40">{products.length} productos encontrados</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-[230px] items-center gap-2 rounded-xl border border-white/10 bg-black/25 px-3 text-white/45">
                    <Search className="h-4 w-4"/><span className="text-xs">Buscar productos...</span>
                  </div>
                  <div className="flex h-10 items-center rounded-xl border border-white/10 bg-black/25 px-4 text-xs font-semibold text-white/70">Más populares</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 xl:gap-4 [&>article]:!h-[565px] [&>article]:!max-w-none 2xl:[&>article]:!h-[585px]">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 overflow-hidden rounded-[20px] border border-white/10 bg-[#090c0f]">
            {[
              {icon:<ShieldCheck className="h-6 w-6"/>,title:"100% SEGURO",text:"Tus datos están protegidos"},
              {icon:<Zap className="h-6 w-6"/>,title:"ENTREGA RÁPIDA",text:"Recibe tu producto sin demoras"},
              {icon:<Headphones className="h-6 w-6"/>,title:"SOPORTE",text:"Estamos para ayudarte"},
              {icon:<Star className="h-6 w-6"/>,title:"CLIENTES SATISFECHOS",text:"Tu confianza nos impulsa"},
            ].map((item,index)=>(
              <div key={item.title} className={`flex min-h-[88px] items-center justify-center gap-3 px-5 ${index<3?"border-r border-white/10":""}`}>
                <span className="text-[#f4be31]">{item.icon}</span>
                <div><p className="text-[12px] font-black">{item.title}</p><p className="mt-1 text-[11px] text-white/45">{item.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

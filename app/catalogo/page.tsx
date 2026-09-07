import type { Metadata } from "next";
import { Headphones, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import { ProductSearch } from "@/components/ProductSearch";
import { categories } from "@/lib/products";

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

export default function CatalogoPage() {
  return (
    <>
      <style>{`
        @keyframes catalogFade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes catalogGlow{0%,100%{opacity:.35;transform:scale(.95)}50%{opacity:.8;transform:scale(1.05)}}
        .catalog-fade{animation:catalogFade .58s ease-out both}
        .catalog-chip{transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}
        .catalog-chip:hover{transform:translateY(-2px);box-shadow:0 0 20px rgba(87,194,255,.10)}
        @media(prefers-reduced-motion:reduce){.catalog-fade{animation:none!important}.catalog-chip{transition:none!important}}
      `}</style>

      <main className="relative mx-auto min-h-[75vh] w-full max-w-[1240px] overflow-hidden px-4 py-7 sm:px-6 md:px-6 md:py-6 xl:px-8">
        <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[#1c62ff]/10 blur-3xl" style={{animation:"catalogGlow 4s ease-in-out infinite"}}/>
        <div className="pointer-events-none absolute -right-20 top-44 h-72 w-72 rounded-full bg-[#d33cff]/10 blur-3xl" style={{animation:"catalogGlow 4.8s ease-in-out infinite"}}/>

        <section className="relative z-10 mx-auto w-full">
          <div className="catalog-fade relative overflow-hidden rounded-[26px] border border-[#44cfff]/35 bg-[radial-gradient(circle_at_15%_20%,rgba(27,94,255,.28),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(218,51,255,.25),transparent_34%),linear-gradient(135deg,#080d1b,#11091b_55%,#07101a)] px-5 py-6 shadow-[0_0_0_1px_rgba(255,77,228,.12),0_0_38px_rgba(0,190,255,.10)] sm:px-7 sm:py-7">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#00d9ff,#9a45ff,#ff4fcf,transparent)]"/>
            <div className="relative z-10 grid items-center gap-5 md:grid-cols-[1.2fr_.8fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#69dcff]/35 bg-[linear-gradient(90deg,rgba(71,83,255,.22),rgba(211,64,255,.20))] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em] text-white/85"><Sparkles size={13}/> Catálogo Romil Plus</div>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-[36px] xl:text-[40px]">Todo tu mundo digital en <span className="bg-[linear-gradient(90deg,#ffd04a,#ffb52b)] bg-clip-text text-transparent">un solo lugar</span></h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-base">Explora nuestras herramientas digitales por categoría, compara precios y encuentra la opción que necesitas.</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {categories.slice(0,8).map((category,index) => {
                    const styles = [
                      "border-[#5d6cff]/35 bg-[#4a55ff]/10 text-[#c9ceff]",
                      "border-[#c64cff]/35 bg-[#bb45ff]/10 text-[#efc5ff]",
                      "border-[#00cfff]/35 bg-[#00b8ff]/10 text-[#b8efff]",
                      "border-[#ff4da9]/35 bg-[#ff3f9f]/10 text-[#ffc4df]",
                      "border-[#31d7b0]/35 bg-[#24c6a3]/10 text-[#b9ffef]",
                      "border-[#f1bd43]/35 bg-[#e9ad2d]/10 text-[#ffe6a1]",
                      "border-[#8e62ff]/35 bg-[#8056ff]/10 text-[#d9cdff]",
                      "border-[#ff6c5f]/35 bg-[#ff665a]/10 text-[#ffd0cc]",
                    ];
                    return <span key={category} className={`catalog-chip rounded-full border px-3 py-1.5 text-[10px] font-bold sm:text-xs ${styles[index % styles.length]}`}>{category}</span>;
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <div className="rounded-2xl border border-[#f1bd43]/25 bg-black/25 px-3 py-4 text-center backdrop-blur"><ShieldCheck className="mx-auto h-6 w-6 text-[#f3c84e]"/><p className="mt-2 text-[10px] font-black uppercase">Garantía</p><p className="mt-1 text-[10px] font-bold text-[#f3c84e]">Hasta 12 meses</p></div>
                <div className="rounded-2xl border border-[#28cfff]/25 bg-black/25 px-3 py-4 text-center backdrop-blur"><Zap className="mx-auto h-6 w-6 text-[#57dcff]"/><p className="mt-2 text-[10px] font-black uppercase">Entrega</p><p className="mt-1 text-[10px] font-bold text-[#9deaff]">Inmediata</p></div>
                <div className="rounded-2xl border border-[#d14cff]/25 bg-black/25 px-3 py-4 text-center backdrop-blur"><Headphones className="mx-auto h-6 w-6 text-[#dd76ff]"/><p className="mt-2 text-[10px] font-black uppercase">Soporte</p><p className="mt-1 text-[10px] font-bold text-[#edbcff]">24/7</p></div>
              </div>
            </div>
          </div>

          <div className="catalog-fade mt-7 text-center" style={{animationDelay:".08s"}}>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white/55"><Star size={12} className="text-[#ffd04a]"/> Explora, filtra y elige</div>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl md:text-[30px] xl:text-[34px]">PRODUCTOS <span className="bg-[linear-gradient(90deg,#ffd04a,#ffb830)] bg-clip-text text-transparent">DESTACADOS</span></h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#00d9ff,#8d49ff,#ff48d7)] shadow-[0_0_14px_rgba(85,198,255,.38)]"/>
          </div>

          <ProductSearch />

          <div className="catalog-fade mt-8 hidden overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(90deg,#090a0d,#0b0d13,#090a0d)] md:grid md:grid-cols-4" style={{animationDelay:".16s"}}>
            {[{icon:<ShieldCheck className="h-5 w-5"/>,title:"PAGO SEGURO",text:"Tus pagos están protegidos",c:"text-[#f3c84e]"},{icon:<Zap className="h-5 w-5"/>,title:"ENTREGA INMEDIATA",text:"Acceso enviado al instante",c:"text-[#5de0ff]"},{icon:<Headphones className="h-5 w-5"/>,title:"SOPORTE 24/7",text:"Estamos para ayudarte",c:"text-[#d778ff]"},{icon:<Star className="h-5 w-5"/>,title:"CALIDAD PREMIUM",text:"Atención y servicio premium",c:"text-[#ff70c4]"}].map((item,index)=>(
              <div key={item.title} className={`flex min-h-[78px] items-center justify-center gap-3 px-4 ${index<3?"border-r border-white/10":""}`}>
                <span className={item.c}>{item.icon}</span><div><p className="text-[11px] font-black">{item.title}</p><p className="mt-1 text-[10px] text-white/55">{item.text}</p></div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

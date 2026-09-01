import { Headphones, ShieldCheck, Zap, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export default function CatalogoPage() {
  return (
    <main className="mx-auto min-h-[75vh] w-full max-w-[1240px] px-4 py-8 sm:px-6 md:px-6 md:py-6 xl:px-8">
      <section className="mx-auto w-full">
        <div className="md:hidden">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#e2b44c]">ROMIL+ STORE</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Catálogo digital</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55 sm:text-base">Los productos mostrados son una base editable. Publica únicamente licencias o accesos que estés autorizado a comercializar.</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">{category}</span>
            ))}
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] md:grid md:grid-cols-3">
          <div className="flex min-h-[68px] items-center justify-center gap-3 border-r border-white/10 px-4">
            <ShieldCheck className="h-6 w-6 shrink-0 text-[#e3b64f]"/>
            <div><p className="text-xs font-black uppercase">Garantía</p><p className="mt-0.5 text-[11px] font-bold text-[#e3b64f]">Hasta 12 meses</p></div>
          </div>
          <div className="flex min-h-[68px] items-center justify-center gap-3 border-r border-white/10 px-4">
            <Zap className="h-6 w-6 shrink-0 text-[#e3b64f]"/>
            <div><p className="text-xs font-black uppercase">Entrega</p><p className="mt-0.5 text-[11px] font-bold">Inmediata</p></div>
          </div>
          <div className="flex min-h-[68px] items-center justify-center gap-3 px-4">
            <Headphones className="h-6 w-6 shrink-0 text-[#e3b64f]"/>
            <div><p className="text-xs font-black uppercase">Soporte</p><p className="mt-0.5 text-[11px] font-bold">24/7</p></div>
          </div>
        </div>

        <div className="mt-10 text-center md:mt-7">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-[26px] xl:text-[30px]">PRODUCTOS <span className="text-[#e3b64f]">DESTACADOS</span></h1>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#e3b64f] md:mt-2"/>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-5 md:grid-cols-4 md:gap-4 xl:gap-5">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] md:grid md:grid-cols-4">
          {[{icon:<ShieldCheck className="h-5 w-5"/>,title:"PAGO SEGURO",text:"Tus pagos están protegidos"},{icon:<Zap className="h-5 w-5"/>,title:"ENTREGA INMEDIATA",text:"Acceso enviado al instante"},{icon:<Headphones className="h-5 w-5"/>,title:"SOPORTE 24/7",text:"Estamos para ayudarte"},{icon:<Star className="h-5 w-5"/>,title:"CALIDAD PREMIUM",text:"Atención y servicio premium"}].map((item,index)=>(
            <div key={item.title} className={`flex min-h-[74px] items-center justify-center gap-3 px-4 ${index<3?"border-r border-white/10":""}`}>
              <span className="text-[#e3b64f]">{item.icon}</span><div><p className="text-[11px] font-black">{item.title}</p><p className="mt-1 text-[10px] text-white/55">{item.text}</p></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

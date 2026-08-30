import Link from "next/link";
import { Bolt, ClipboardList, Headphones, ShieldCheck, ShoppingBag, ShoppingCart, User } from "lucide-react";

const benefits = [
  { icon: ShieldCheck, title: "100% Seguras", text: "Licencias originales y verificadas" },
  { icon: Bolt, title: "Entrega Instantánea", text: "Acceso inmediato tras la compra" },
  { icon: Headphones, title: "Soporte Dedicado", text: "Estamos aquí para ayudarte" },
];

export default function Home() {
  return (
    <>
      <style>{`header,footer{display:none!important}`}</style>
      <main className="min-h-screen overflow-hidden bg-black text-white">
        <header className="!flex border-b border-[#b88624]/30 bg-black">
          <div className="mx-auto flex w-full max-w-[1024px] items-center justify-between px-7 py-6">
            <div className="flex items-center gap-5"><div className="text-[54px] font-black italic tracking-[-.18em] text-[#e7b943]">RP</div><div className="text-[18px] font-extrabold tracking-wide">ROMIL PLUS</div></div>
            <div className="flex gap-3"><Link href="/login" className="grid h-14 w-14 place-items-center rounded-2xl border border-[#d5a536]/60"><User/></Link><Link href="/carrito" className="grid h-14 w-14 place-items-center rounded-2xl border border-[#d5a536]/60"><ShoppingCart/></Link></div>
          </div>
        </header>

        <section className="relative mx-auto max-w-[1024px] px-7 pb-10 pt-12">
          <div className="pointer-events-none absolute -right-[47%] top-[13%] h-[760px] w-[760px] rounded-full border-[2px] border-[#f0b83e] shadow-[-12px_0_28px_rgba(255,187,54,.8),-30px_0_80px_rgba(218,150,27,.22)]" />
          <div className="relative z-10 max-w-[700px]">
            <div className="inline-flex rounded-full border border-[#e2ad37] px-7 py-3 text-xs font-black tracking-[.32em] text-[#efc25a]">ROMIL PLUS</div>
            <h1 className="mt-10 text-[47px] font-black leading-[1.03] tracking-[-.045em] sm:text-7xl">Todas tus<br/>herramientas<br/>digitales <span className="text-[#e0ad43]">en un<br/>solo lugar.</span></h1>
            <p className="mt-8 max-w-[590px] text-[17px] leading-8 text-[#c2bdb5]">Una tienda digital elegante para descubrir,<br className="hidden sm:block"/> comprar y administrar suscripciones y<br className="hidden sm:block"/> licencias autorizadas.</p>
            <div className="mt-9 grid grid-cols-2 gap-4 sm:max-w-[700px]">
              <Link href="/catalogo" className="flex min-h-[68px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#ffe58d] to-[#d39b2d] px-4 font-black text-black"><ShoppingBag/>Explorar catálogo</Link>
              <Link href="/mis-compras" className="flex min-h-[68px] items-center justify-center gap-3 rounded-2xl border border-[#d5a536] bg-black px-4 font-bold"><ClipboardList/>Mis compras</Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-[1024px] px-7 pb-16">
          <div className="grid grid-cols-3 rounded-[28px] border border-[#a97b22]/60 bg-[#080808] px-2 py-8">
            {benefits.map(({icon:Icon,title,text},i)=><div key={title} className={`flex flex-col items-center px-2 text-center ${i<2?'border-r border-[#6d572c]/50':''}`}><Icon size={42} className="text-[#e8b84a]"/><div className="mt-4 text-[14px] font-extrabold sm:text-lg">{title}</div><div className="mt-2 text-[12px] leading-5 text-[#aaa49c] sm:text-base">{text}</div></div>)}
          </div>
        </section>
      </main>
    </>
  );
}

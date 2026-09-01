import Link from "next/link";
import { ArrowRight, Bolt, ClipboardList, Headphones, ShieldCheck, ShoppingBag, ShoppingCart, User } from "lucide-react";

const benefits = [
  { icon: ShieldCheck, title: "100% Seguras", text: "Licencias originales y verificadas" },
  { icon: Bolt, title: "Entrega Instantánea", text: "Acceso inmediato tras la compra" },
  { icon: Headphones, title: "Soporte Dedicado", text: "Estamos aquí para ayudarte" },
];

function RomilLogo() {
  return (
    <img
      src="/logo-romil-plus.png"
      alt="ROMIL PLUS"
      className="h-[74px] w-[92px] shrink-0 rounded-xl object-contain sm:h-[88px] sm:w-[110px]"
    />
  );
}

export default function Home() {
  return (
    <>
      <style>{`body>div>header,body>div>footer{display:none!important}`}</style>
      <main className="min-h-screen overflow-hidden bg-[#020202] text-white">
        <header className="border-b border-[#8f6927]/35 bg-[#020202]">
          <div className="mx-auto flex w-full max-w-[1024px] items-center justify-between px-5 py-3 sm:px-7 sm:py-4">
            <Link href="/" aria-label="ROMIL PLUS" className="flex min-w-0 items-center">
              <RomilLogo />
            </Link>
            <div className="ml-2 flex gap-2 sm:gap-3">
              <Link href="/login" aria-label="Cuenta" className="grid h-12 w-12 place-items-center rounded-xl border border-[#d5a536]/55 sm:h-14 sm:w-14 sm:rounded-2xl"><User size={21}/></Link>
              <Link href="/carrito" aria-label="Carrito" className="grid h-12 w-12 place-items-center rounded-xl border border-[#d5a536]/55 sm:h-14 sm:w-14 sm:rounded-2xl"><ShoppingCart size={21}/></Link>
            </div>
          </div>
        </header>

        <section className="relative mx-auto max-w-[1024px] px-5 pb-9 pt-9 sm:px-7 sm:pb-12 sm:pt-14">
          <div className="pointer-events-none absolute -right-[360px] top-[170px] h-[650px] w-[650px] rounded-full border-[2px] border-[#eab13c] shadow-[-7px_0_18px_rgba(255,190,60,.72),-24px_0_65px_rgba(215,145,25,.22)] sm:-right-[390px] sm:top-[120px] sm:h-[780px] sm:w-[780px]" />
          <div className="relative z-10 max-w-[690px]">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-5 bg-[#d8a53a]" />
              <div className="rounded-full border border-[#dba83b] px-6 py-2.5 text-[10px] font-black tracking-[.30em] text-[#edc35f] sm:text-xs">ROMIL PLUS</div>
              <span className="h-px w-5 bg-[#d8a53a]" />
            </div>

            <h1 className="mt-8 text-[45px] font-black leading-[1.01] tracking-[-.045em] sm:mt-10 sm:text-7xl">
              Todas tus<br/>herramientas<br/>digitales <span className="bg-gradient-to-r from-[#f2cf70] via-[#dfa93e] to-[#b77922] bg-clip-text text-transparent">en un<br/>solo lugar.</span>
            </h1>

            <p className="mt-7 max-w-[610px] text-[16px] leading-7 text-[#b9b3aa] sm:mt-8 sm:text-[18px] sm:leading-8">Una experiencia digital elegante para descubrir, comprar y administrar suscripciones y licencias autorizadas.</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-9 sm:max-w-[700px] sm:gap-4">
              <Link href="/catalogo" className="flex min-h-[62px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f7dc80] via-[#e2b64f] to-[#bd8128] px-3 text-[14px] font-black text-black shadow-[0_10px_30px_rgba(204,151,47,.18)] sm:min-h-[68px] sm:rounded-2xl sm:text-base"><ShoppingBag size={19}/>Explorar catálogo<ArrowRight size={18}/></Link>
              <Link href="/mis-compras" className="flex min-h-[62px] items-center justify-center gap-2 rounded-xl border border-[#d5a536]/75 bg-[#050505] px-3 text-[14px] font-bold sm:min-h-[68px] sm:rounded-2xl sm:text-base"><ClipboardList size={19} className="text-[#dfb14b]"/>Mis compras</Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-[1024px] px-5 pb-14 sm:px-7 sm:pb-16">
          <div className="grid grid-cols-3 overflow-hidden rounded-[22px] border border-[#9f772b]/55 bg-[#080807]/95 sm:rounded-[28px]">
            {benefits.map(({icon:Icon,title,text},i)=><div key={title} className={`flex min-h-[160px] flex-col items-center justify-center px-2 py-5 text-center sm:min-h-[190px] sm:px-5 ${i<2?'border-r border-[#6d572c]/45':''}`}><Icon size={34} strokeWidth={1.7} className="text-[#e4b54b] sm:h-[42px] sm:w-[42px]"/><div className="mt-3 text-[12px] font-extrabold leading-4 sm:mt-4 sm:text-lg">{title}</div><div className="mt-2 text-[10px] leading-4 text-[#99938b] sm:text-sm sm:leading-5">{text}</div></div>)}
          </div>
        </section>
      </main>
    </>
  );
}

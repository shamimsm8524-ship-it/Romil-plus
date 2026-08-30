import Link from "next/link";

export default function Home() {
  return (
    <>
      <style>{`footer{display:none}`}</style>
      <main className="min-h-screen bg-black">
        <section className="mx-auto w-full max-w-[1023px] bg-black">
          <div className="relative w-full">
            <img
              src="/romil-home.svg"
              alt="ROMIL PLUS - Todas tus herramientas digitales en un solo lugar"
              className="block h-auto w-full select-none"
              draggable={false}
            />

            <Link href="/login" aria-label="Cuenta" className="absolute left-[67.2%] top-[2.1%] h-[7.2%] w-[10.8%] rounded-[18%]" />
            <Link href="/carrito" aria-label="Carrito" className="absolute left-[81.7%] top-[2.1%] h-[7.2%] w-[10.8%] rounded-[18%]" />
            <Link href="/catalogo" aria-label="Explorar catálogo" className="absolute left-[4.1%] top-[63.4%] h-[7.3%] w-[36.6%] rounded-[12%]" />
            <Link href="/mis-compras" aria-label="Mis compras" className="absolute left-[43.0%] top-[63.4%] h-[7.3%] w-[31.7%] rounded-[12%]" />
          </div>
        </section>
      </main>
    </>
  );
}

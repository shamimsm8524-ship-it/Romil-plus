import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export default function CatalogoPage() {
  return (
    <main className="mx-auto min-h-[75vh] w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10 lg:py-16 xl:px-12">
      <section className="mx-auto max-w-[1380px]">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#e2b44c] lg:text-base">ROMIL+ STORE</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Catálogo digital</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55 sm:text-base lg:text-lg lg:leading-8">Los productos mostrados son una base editable. Publica únicamente licencias o accesos que estés autorizado a comercializar.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5 lg:mt-10 lg:gap-3">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 lg:px-5 lg:py-2.5 lg:text-[15px]">{category}</span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-7 xl:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}

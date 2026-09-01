import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export default function CatalogoPage() {
  return (
    <main className="mx-auto min-h-[75vh] w-full max-w-[1600px] px-4 py-10 sm:px-6 min-[900px]:max-w-[1050px] min-[900px]:px-6 min-[900px]:py-6 xl:max-w-[1180px] xl:px-8 xl:py-8">
      <section className="mx-auto w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#e2b44c] min-[900px]:text-xs xl:text-sm">ROMIL+ STORE</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl min-[900px]:mt-2 min-[900px]:text-3xl xl:text-4xl">Catálogo digital</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55 sm:text-base min-[900px]:mt-2 min-[900px]:text-xs min-[900px]:leading-5 xl:text-sm xl:leading-6">Los productos mostrados son una base editable. Publica únicamente licencias o accesos que estés autorizado a comercializar.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5 min-[900px]:mt-5 min-[900px]:gap-2 xl:mt-6">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 min-[900px]:px-3 min-[900px]:py-1.5 min-[900px]:text-xs xl:px-4 xl:py-2">{category}</span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 min-[900px]:mt-6 min-[900px]:grid-cols-4 min-[900px]:gap-3 xl:mt-8 xl:gap-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}

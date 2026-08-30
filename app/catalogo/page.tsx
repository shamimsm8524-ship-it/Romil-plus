import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export default function CatalogoPage() {
  return (
    <main className="mx-auto min-h-[75vh] max-w-7xl px-4 py-14">
      <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">ROMIL+ Store</p>
      <h1 className="mt-2 text-4xl font-black">Catálogo digital</h1>
      <p className="mt-3 max-w-2xl text-white/55">Los productos mostrados son una base editable. Publica únicamente licencias o accesos que estés autorizado a comercializar.</p>
      <div className="mt-8 flex flex-wrap gap-2">{categories.map((category) => <span key={category} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">{category}</span>)}</div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </main>
  );
}

import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const whatsappNumber = "51970825741";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  const whatsappMessage = encodeURIComponent(`Hola, quiero consultar por ${product.name}.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="mx-auto min-h-[75vh] max-w-5xl px-4 py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">{product.category}</p>
          <h1 className="mt-3 text-4xl font-black">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-white/60">{product.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/40">Duración</p><p className="mt-1 font-bold">{product.duration}</p></div>
            <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/40">Garantía</p><p className="mt-1 font-bold">{product.guarantee ?? "Consultar"}</p></div>
            <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/40">Entrega</p><p className="mt-1 font-bold">Por WhatsApp</p></div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-400"
          >
            <MessageCircle size={20} />
            Contactar por WhatsApp
          </a>

          <p className="mt-8 text-xs leading-5 text-white/35">La entrega y coordinación del producto se realiza directamente por WhatsApp.</p>
        </section>
        <ProductCard product={product} />
      </div>
    </main>
  );
}

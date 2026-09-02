import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const siteUrl = "https://romilplus.me";

function cleanDescription(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return {
      title: "Producto no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const description = `${product.name} en ROMIL PLUS. ${cleanDescription(product.description)} Duración: ${product.duration}.`;
  const canonical = `/producto/${product.id}`;

  return {
    title: `${product.name} | Suscripción digital`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${product.name} | ROMIL PLUS`,
      description,
      images: [product.image || "/logo-romil-plus.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ROMIL PLUS`,
      description,
      images: [product.image || "/logo-romil-plus.png"],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: cleanDescription(product.description),
    image: product.image ? `${siteUrl}${product.image}` : `${siteUrl}/logo-romil-plus.png`,
    category: product.category,
    url: `${siteUrl}/producto/${product.id}`,
    brand: {
      "@type": "Brand",
      name: "ROMIL PLUS",
    },
    ...(product.price > 0
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "PEN",
            price: product.price,
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/producto/${product.id}`,
          },
        }
      : {}),
  };

  return (
    <main className="mx-auto min-h-[75vh] max-w-5xl px-4 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">{product.category}</p>
          <h1 className="mt-3 text-4xl font-black">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-white/60">{product.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/40">Duración</p><p className="mt-1 font-bold">{product.duration}</p></div>
            <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/40">Garantía</p><p className="mt-1 font-bold">{product.guarantee ?? "Consultar"}</p></div>
            <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/40">Entrega</p><p className="mt-1 font-bold">Inmediata tras confirmar el pago</p></div>
          </div>

          <a
            href="/soporte"
            aria-label={`Abrir chat de atención al cliente para consultar por ${product.name}`}
            className="mt-6 flex w-full items-center justify-between gap-4 rounded-2xl border border-sky-500/70 bg-[#0b0d0f] px-5 py-4 text-left transition hover:border-sky-400 hover:bg-sky-500/[0.06]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <MessageCircle className="shrink-0 text-sky-400" size={30} strokeWidth={2.2} />
              <span className="text-base font-black leading-tight text-white sm:text-lg">Chat de atención al cliente</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sky-500/50 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              En línea
            </span>
          </a>

          <p className="mt-8 text-xs leading-5 text-white/35">La entrega se realiza inmediatamente después de confirmar el pago.</p>
        </section>
        <ProductCard product={product} />
      </div>
    </main>
  );
}

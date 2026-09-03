import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { SupportFloatingButton } from "@/components/SupportFloatingButton";

const siteUrl = "https://romilplus.me";
const siteDescription = "ROMIL PLUS es una tienda digital en Perú con suscripciones y herramientas digitales, entrega rápida, soporte y opciones para productividad, diseño, edición e inteligencia artificial.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ROMIL PLUS | Suscripciones y herramientas digitales en Perú",
    template: "%s | ROMIL PLUS",
  },
  description: siteDescription,
  applicationName: "ROMIL PLUS",
  creator: "ROMIL PLUS",
  publisher: "ROMIL PLUS",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/logo-romil-plus.png", type: "image/png", sizes: "1254x1254" },
    ],
    shortcut: "/logo-romil-plus.png",
    apple: [{ url: "/logo-romil-plus.png", type: "image/png", sizes: "1254x1254" }],
  },
  keywords: [
    "ROMIL PLUS",
    "suscripciones digitales Perú",
    "herramientas digitales",
    "software digital",
    "inteligencia artificial",
    "diseño digital",
    "edición de video",
    "productividad",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName: "ROMIL PLUS",
    title: "ROMIL PLUS | Suscripciones y herramientas digitales en Perú",
    description: siteDescription,
    images: [
      {
        url: "/logo-romil-plus.png",
        width: 1200,
        height: 630,
        alt: "ROMIL PLUS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ROMIL PLUS | Suscripciones y herramientas digitales en Perú",
    description: siteDescription,
    images: ["/logo-romil-plus.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
};

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "ROMIL PLUS",
  url: siteUrl,
  logo: `${siteUrl}/logo-romil-plus.png`,
  description: siteDescription,
  areaServed: "PE",
  currenciesAccepted: "PEN",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <CartProvider>
          <Header />
          {children}
          <SupportFloatingButton />
          <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/40">
            ROMIL PLUS · Tus herramientas digitales, en un solo lugar.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

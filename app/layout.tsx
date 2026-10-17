import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SupportFloatingButton } from "@/components/SupportFloatingButton";

const siteUrl = "https://www.romilplus.me";
const siteDescription = "ROMIL PLUS reúne convocatorias de trabajo y becas verificadas para peruanos, enlaza a fuentes oficiales y publica guías prácticas para postular con más seguridad.";
const socialImage = `${siteUrl}/logo-romil-plus.png?v=20261017`;
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ROMIL PLUS | Trabajo y becas verificadas en Perú",
    template: "%s | ROMIL PLUS",
  },
  description: siteDescription,
  applicationName: "ROMIL PLUS",
  creator: "ROMIL PLUS",
  publisher: "ROMIL PLUS",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [{ url: "/logo-romil-plus.png", type: "image/png", sizes: "1254x1254" }],
    shortcut: "/logo-romil-plus.png",
    apple: [{ url: "/logo-romil-plus.png", type: "image/png", sizes: "1254x1254" }],
  },
  keywords: ["convocatorias de trabajo Perú", "empleos Perú", "convocatorias CAS", "becas Perú", "Beca 18", "becas para peruanos", "becas internacionales", "PRONABEC", "oportunidades de estudio", "ROMIL PLUS"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: `${siteUrl}/`,
    siteName: "ROMIL PLUS",
    title: "ROMIL PLUS | Trabajo y becas verificadas en Perú",
    description: siteDescription,
    images: [{ url: socialImage, width: 1254, height: 1254, type: "image/png", alt: "ROMIL PLUS - Trabajo y becas verificadas" }],
  },
  twitter: { card: "summary_large_image", title: "ROMIL PLUS | Trabajo y becas verificadas", description: siteDescription, images: [socialImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  category: "jobs and education",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ROMIL PLUS",
  url: siteUrl,
  description: siteDescription,
  inLanguage: "es-PE",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/convocatorias?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <body>
        {adsenseClient ? <Script id="adsense-loader" async strategy="beforeInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} /> : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <CartProvider>
          <Header />
          {children}
          <SiteFooter />
          <SupportFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}

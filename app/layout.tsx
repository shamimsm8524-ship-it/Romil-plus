import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SupportFloatingButton } from "@/components/SupportFloatingButton";

const siteUrl = "https://www.romilplus.me";
const siteDescription = "Ofertas laborales en Perú y Lima, trabajos en minería, convocatorias CAS y becas. Consulta requisitos, fechas de revisión y enlaces para postular en ROMIL PLUS.";
const socialImage = `${siteUrl}/logo-romil-plus.png?v=20261017`;
const configuredPublisher = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || process.env.ADSENSE_PUBLISHER_ID || "ca-pub-2650122036214146";
const adsenseClient = /^(?:ca-)?pub-\d{16}$/.test(configuredPublisher) ? configuredPublisher.replace(/^(?:ca-)?pub-/, "ca-pub-") : undefined;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Romilplus | Ofertas laborales en Perú y becas",
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
    title: "Romilplus | Ofertas laborales en Perú y becas",
    description: siteDescription,
    images: [{ url: socialImage, width: 1254, height: 1254, type: "image/png", alt: "ROMIL PLUS - Trabajo y becas verificadas" }],
  },
  twitter: { card: "summary_large_image", title: "Romilplus | Ofertas laborales en Perú y becas", description: siteDescription, images: [socialImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  other: adsenseClient ? { "google-adsense-account": adsenseClient } : undefined,
  category: "jobs and education",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ROMIL PLUS",
  alternateName: ["Romilplus", "Romil Plus", "romilplus.me"],
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

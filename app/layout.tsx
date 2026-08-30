import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "ROMIL PLUS",
  description: "Tus herramientas digitales, en un solo lugar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          {children}
          <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/40">
            ROMIL PLUS · Tus herramientas digitales, en un solo lugar.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

export default function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="rp-cart-title-theme">
      {children}
      <style>{`
        .rp-cart-title-theme h1 { color: #ffffff !important; }
        .rp-cart-title-theme h1 span {
          color: #e3b64f !important;
          -webkit-text-fill-color: #e3b64f !important;
          background: none !important;
          text-shadow: 0 0 18px rgba(227,182,79,.18);
        }
      `}</style>
    </div>
  );
}

import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="rp-profile-title-theme">
      {children}
      <style>{`
        .rp-profile-title-theme h1 { color: #ffffff !important; }
        .rp-profile-title-theme h1 span {
          color: #e3b64f !important;
          -webkit-text-fill-color: #e3b64f !important;
          background: none !important;
          text-shadow: 0 0 18px rgba(227,182,79,.18);
        }
      `}</style>
    </div>
  );
}

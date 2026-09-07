import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

export default function PurchasesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="rp-purchases-profile-bg">
      {children}
      <style>{`
        .rp-purchases-profile-bg > main {
          background:
            radial-gradient(circle at 12% 10%, rgba(0,190,255,.18), transparent 26%),
            radial-gradient(circle at 88% 14%, rgba(217,70,239,.17), transparent 28%),
            radial-gradient(circle at 50% 92%, rgba(139,92,246,.15), transparent 34%),
            #030308 !important;
        }
        .rp-purchases-profile-bg > main > div:first-child {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

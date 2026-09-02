import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

export default function CheckoutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

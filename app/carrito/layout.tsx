import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

export default function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

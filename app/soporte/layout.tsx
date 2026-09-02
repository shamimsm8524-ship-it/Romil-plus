import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

export default function SupportLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

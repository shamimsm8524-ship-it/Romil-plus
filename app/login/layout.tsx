import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

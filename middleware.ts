import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname.startsWith("/politica-de-privacidad")) {
    url.pathname = "/privacidad";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = "/convocatorias";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/catalogo/:path*",
    "/producto/:path*",
    "/carrito/:path*",
    "/checkout/:path*",
    "/mis-compras/:path*",
    "/politica-de-privacidad/:path*",
  ],
};

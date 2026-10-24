export const dynamic = "force-dynamic";

export async function GET() {
  const configuredPublisher = process.env.ADSENSE_PUBLISHER_ID || process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "pub-2650122036214146";
  const publisherId = /^(?:ca-)?pub-\d{16}$/.test(configuredPublisher) ? configuredPublisher.replace(/^ca-/, "") : undefined;
  if (!publisherId) {
    return new Response("AdSense publisher ID not configured.\n", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}

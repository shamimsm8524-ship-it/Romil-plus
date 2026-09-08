import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN_SHA256 = "933ad5e22ca2c7376701f3c29282f24dbc015ddd043d43fbd696a4dc7088eb72";

function isValidVerifyToken(token: string | null) {
  if (!token) return false;
  const digest = createHash("sha256").update(token).digest("hex");
  return digest === VERIFY_TOKEN_SHA256;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && challenge && isValidVerifyToken(token)) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Webhook verification failed" }, { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    // Bootstrap endpoint: acknowledge Meta webhooks without persisting data yet.
    // Message persistence and signature validation are wired in the next setup step.
    console.info("WhatsApp webhook received", {
      object: payload?.object ?? null,
      entries: Array.isArray(payload?.entry) ? payload.entry.length : 0,
    });
    return NextResponse.json({ received: true }, { status: 200 });
  } catch {
    return NextResponse.json({ received: false }, { status: 400 });
  }
}

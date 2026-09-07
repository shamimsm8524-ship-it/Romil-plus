import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050509",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            left: -130,
            top: -170,
            background: "rgba(0, 200, 255, 0.22)",
            filter: "blur(65px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            right: -120,
            top: -160,
            background: "rgba(217, 70, 239, 0.20)",
            filter: "blur(70px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 360,
            borderRadius: 999,
            bottom: -220,
            left: 290,
            background: "rgba(139, 92, 246, 0.18)",
            filter: "blur(75px)",
          }}
        />

        <div
          style={{
            width: 1080,
            height: 510,
            display: "flex",
            alignItems: "center",
            padding: "54px 68px",
            borderRadius: 42,
            border: "2px solid rgba(214,178,94,.45)",
            background: "rgba(3,3,8,.88)",
            boxShadow: "0 28px 90px rgba(0,0,0,.55)",
          }}
        >
          <div
            style={{
              width: 330,
              height: 330,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 36,
              border: "2px solid rgba(214,178,94,.35)",
              background: "#000",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src="https://www.romilplus.me/logo-romil-plus.png"
              width="300"
              height="300"
              style={{ objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              marginLeft: 58,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              color: "white",
              maxWidth: 590,
            }}
          >
            <div style={{ fontSize: 72, fontWeight: 900, color: "#d6b25e", letterSpacing: -2 }}>
              ROMIL PLUS
            </div>
            <div style={{ marginTop: 18, fontSize: 36, fontWeight: 800, lineHeight: 1.18 }}>
              Suscripciones y herramientas digitales
            </div>
            <div style={{ marginTop: 22, fontSize: 26, color: "rgba(255,255,255,.72)" }}>
              Entrega rápida y soporte en Perú
            </div>
            <div style={{ marginTop: 34, fontSize: 25, fontWeight: 700, color: "#6ae6ff" }}>
              www.romilplus.me
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}

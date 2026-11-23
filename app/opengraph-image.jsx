import { ImageResponse } from "next/og";

export const alt = "Wihogora Florissa — Full Stack Developer & UI/UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card (LinkedIn, WhatsApp, Slack, X). Generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          backgroundColor: "#0a0806",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(255,138,61,0.35), rgba(10,8,6,0))",
          color: "#f5efe6",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#ff8a3d",
          }}
        >
          Portfolio · Kigali, Rwanda
        </div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 800, marginTop: 28, lineHeight: 1 }}>
          Wihogora
        </div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 800, color: "#ff8a3d", lineHeight: 1.05 }}>
          Florissa
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 36, color: "#cbbfae" }}>
          Full Stack Developer · UI/UX Designer · Embedded Systems
        </div>
      </div>
    ),
    size
  );
}

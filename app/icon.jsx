import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Browser-tab icon: "WF" monogram on the brand's dark background.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0806",
          color: "#ff8a3d",
          fontSize: 34,
          fontWeight: 800,
          borderRadius: 14,
        }}
      >
        WF
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#1B6B6B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#1A1A1A" }}>
              {site.name}
            </div>
            <div style={{ fontSize: 20, color: "#6E6E73" }}>
              {`Since ${site.foundingYear}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {"India's most trusted"}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#1B6B6B",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            acrylic manufacturer.
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#6E6E73" }}>
          35+ years · 500+ brands · 13+ industries
        </div>
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/brand/logo-wordmark-cropped.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#f8f9fe",
          backgroundImage:
            "radial-gradient(circle at 84% 16%, rgba(4,74,254,0.18), rgba(4,74,254,0) 55%)",
        }}
      >
        <img src={logoSrc} width={240} height={66} alt={SITE_NAME} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              color: "#0f0e17",
              lineHeight: 1.15,
              maxWidth: 940,
            }}
          >
            Compliance built into the architecture, not configured on top.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#044afe", fontWeight: 600 }}>
            factro.io
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

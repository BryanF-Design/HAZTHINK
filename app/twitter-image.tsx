import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "HAZTHINK — Diseño, impresión y publicidad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const lotus = await readFile(join(process.cwd(), "public/brand/lotus.png"));
  const src = `data:image/png;base64,${lotus.toString("base64")}`;
  const colors = ["#1f8ae2", "#4cb85a", "#dfe04a", "#f39230", "#9b2ab3"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fff6ee", position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, display: "flex" }}>
          {colors.map((c) => (
            <div key={c} style={{ flex: 1, background: c }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 680 }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, color: "#d40f5b" }}>DISEÑO · IMPRESIÓN · PUBLICIDAD</div>
          <div style={{ fontSize: 112, fontWeight: 900, letterSpacing: -5, lineHeight: 0.95, color: "#170a12", marginTop: 24 }}>Ideas que se ven.</div>
          <div style={{ fontSize: 34, color: "#5b4652", marginTop: 28 }}>Estudio creativo en México · hazthink.com</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={440} height={346} alt="" />
        </div>
      </div>
    ),
    size,
  );
}

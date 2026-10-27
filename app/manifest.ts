import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HAZTHINK — Diseño, impresión y publicidad",
    short_name: "HAZTHINK",
    description: "Estudio creativo en México: redes sociales, lonas, identidad corporativa, publicidad e invitaciones.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff6ee",
    theme_color: "#fff6ee",
    lang: "es-MX",
    icons: [{ src: "/assets/hazthink-favicon.png", sizes: "512x512", type: "image/png", purpose: "any" }],
  };
}

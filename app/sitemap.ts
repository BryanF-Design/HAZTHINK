import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
  { path: "/proyectos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contacto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/terminos", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacidad", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({ url: `${site.url}${r.path}`, lastModified, changeFrequency: r.changeFrequency, priority: r.priority }));
}

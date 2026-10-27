import Projects from "@/components/pages/Projects";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/proyectos",
  title: "Proyectos y muestras",
  description: "Muestras de diseño para redes sociales, lonas de gran formato, identidad corporativa, publicidad e invitaciones creadas por HAZTHINK.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Proyectos", "/proyectos")} />
      <Projects />
    </>
  );
}

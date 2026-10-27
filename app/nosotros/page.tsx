import About from "@/components/pages/About";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/nosotros",
  title: "Nosotros",
  description: "Conoce a HAZTHINK: el estudio que une diseño gráfico, impresión y publicidad en un solo lugar para que tu marca se vea, se toque y se recuerde.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Nosotros", "/nosotros")} />
      <About />
    </>
  );
}

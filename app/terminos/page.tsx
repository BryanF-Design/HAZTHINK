import Legal from "@/components/pages/Legal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/terminos",
  title: "Términos y Condiciones",
  description: "Términos y condiciones de los servicios de diseño, impresión y publicidad de HAZTHINK.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Términos y Condiciones", "/terminos")} />
      <Legal doc="terms" />
    </>
  );
}

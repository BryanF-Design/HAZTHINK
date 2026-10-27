import Contact from "@/components/pages/Contact";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, faqLd } from "@/lib/seo";
import { pageMeta } from "@/lib/seo";
import { dictionaries } from "@/lib/dictionaries";

export const metadata = pageMeta({
  path: "/contacto",
  title: "Contacto y cotizaciones",
  description: "Cotiza tu proyecto de diseño, impresión o publicidad con HAZTHINK por WhatsApp (729) 455 0094, correo hazthink@gmail.com o Facebook.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Contacto", "/contacto")} />
      <JsonLd data={faqLd(dictionaries.mx.faq.items)} />
      <Contact />
    </>
  );
}

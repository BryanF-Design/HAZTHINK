import Legal from "@/components/pages/Legal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/privacidad",
  title: "Política de Privacidad",
  description: "Aviso de privacidad de HAZTHINK: qué datos recopilamos, cómo usamos Google Analytics con tu consentimiento y cómo ejercer tus derechos ARCO.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Política de Privacidad", "/privacidad")} />
      <Legal doc="privacy" />
    </>
  );
}

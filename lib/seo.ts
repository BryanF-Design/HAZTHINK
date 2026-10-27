import type { Metadata } from "next";
import { site } from "./site";

export const keywords = [
  "HAZTHINK",
  "estudio de diseño",
  "diseño gráfico México",
  "agencia de diseño",
  "diseño de logotipos",
  "identidad corporativa",
  "branding",
  "diseño para redes sociales",
  "impresión de lonas",
  "lonas gran formato",
  "publicidad",
  "invitaciones digitales",
  "invitaciones impresas",
];

export function pageMeta({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | HAZTHINK`, description, url: `${site.url}${path}` },
    twitter: { title: `${title} | HAZTHINK`, description },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "HAZTHINK",
      url: site.url,
      logo: `${site.url}/brand/logo.png`,
      email: site.email,
      telephone: "+52 729 455 0094",
      slogan: site.slogan,
      sameAs: [site.facebook],
      contactPoint: [
        { "@type": "ContactPoint", telephone: "+52 729 455 0094", contactType: "customer service", areaServed: "MX", availableLanguage: ["Spanish", "English"] },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "HAZTHINK",
      inLanguage: "es-MX",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: "HAZTHINK — Diseño, impresión y publicidad",
      url: site.url,
      image: `${site.url}/brand/logo.png`,
      telephone: "+52 729 455 0094",
      email: site.email,
      areaServed: { "@type": "Country", name: "México" },
      address: { "@type": "PostalAddress", addressCountry: "MX" },
      parentOrganization: { "@id": `${site.url}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios HAZTHINK",
        itemListElement: [
          "Diseño para redes sociales",
          "Impresión de lonas y gran formato",
          "Identidad corporativa y logotipos",
          "Publicidad",
          "Invitaciones digitales e impresas",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
  ],
};

export function breadcrumbLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

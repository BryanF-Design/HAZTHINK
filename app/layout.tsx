import type { Metadata, Viewport } from "next";
import { body, display, readable, serif } from "./fonts";
import { site } from "@/lib/site";
import { keywords, organizationLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { LangProvider } from "@/lib/i18n";
import { A11yProvider, a11yBootScript } from "@/lib/a11y";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollAnimations from "@/components/ScrollAnimations";
import A11yPanel from "@/components/A11yPanel";
import SkipLink from "@/components/SkipLink";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "HAZTHINK — Estudio de diseño, impresión y publicidad en México",
    template: "%s | HAZTHINK",
  },
  description:
    "HAZTHINK es un estudio creativo en México: diseño para redes sociales, impresión de lonas, identidad corporativa y logotipos, publicidad e invitaciones digitales e impresas. Cotiza por WhatsApp.",
  applicationName: "HAZTHINK",
  keywords,
  authors: [{ name: "HAZTHINK" }],
  creator: "BryanF Design",
  publisher: "HAZTHINK",
  category: "design",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: false },
  icons: { icon: "/assets/hazthink-favicon.png", apple: "/assets/hazthink-favicon.png" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: site.url,
    siteName: "HAZTHINK",
    title: "HAZTHINK — Ideas que se ven, marcas que se mueven",
    description: "Diseño, impresión y publicidad para convertir ideas en marcas que se ven, se tocan y se recuerdan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAZTHINK — Ideas que se ven, marcas que se mueven",
    description: "Diseño, impresión y publicidad para convertir ideas en marcas que se ven, se tocan y se recuerdan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff6ee",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`is-loading ${display.variable} ${serif.variable} ${body.variable} ${readable.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
        <noscript>
          <style>{`.preloader{display:none!important}html.is-loading{overflow:auto!important}[data-reveal],[data-stagger]>*{opacity:1!important;visibility:visible!important;transform:none!important}[data-split] .c{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <JsonLd data={organizationLd} />
        <LangProvider>
          <A11yProvider>
            <SkipLink />
            <Preloader />
            <SmoothScroll>
              <Header />
              <PageTransition />
              <ScrollAnimations />
              <main id="contenido" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </SmoothScroll>
            <WhatsAppFloat />
            <A11yPanel />
            <Cursor />
            <Analytics />
          </A11yProvider>
        </LangProvider>
      </body>
    </html>
  );
}

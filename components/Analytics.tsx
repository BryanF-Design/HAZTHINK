"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useT } from "@/lib/i18n";
import TransitionLink from "./TransitionLink";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "hz-consent";
type Consent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(value: "granted" | "denied") {
  window.gtag?.("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/**
 * Google Analytics 4 with Consent Mode v2: nothing is stored until the visitor accepts.
 * Set NEXT_PUBLIC_GA_ID (G-XXXXXXX) in Vercel to switch it on.
 */
export default function Analytics() {
  const t = useT();
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>("denied");
  const [show, setShow] = useState(false);

  useEffect(() => {
    let saved: Consent = null;
    try {
      saved = localStorage.getItem(KEY) as Consent;
    } catch {}
    setConsent(saved);
    if (!saved && GA_ID) {
      const id = window.setTimeout(() => setShow(true), 2600);
      return () => window.clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    const reopen = () => setShow(true);
    window.addEventListener("hz:cookies", reopen);
    return () => window.removeEventListener("hz:cookies", reopen);
  }, []);

  // SPA page views (GA's own history tracking is disabled to avoid duplicates).
  useEffect(() => {
    if (!GA_ID || consent !== "granted") return;
    window.gtag?.("event", "page_view", { page_path: pathname, page_location: window.location.href, page_title: document.title });
  }, [pathname, consent]);

  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setConsent(value);
    updateConsent(value);
    setShow(false);
  };

  return (
    <>
      {GA_ID && (
        <>
          <Script id="ga-consent" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
var c=null;try{c=localStorage.getItem("${KEY}")}catch(e){}
gtag("consent","default",{analytics_storage:c==="granted"?"granted":"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",wait_for_update:500});
gtag("js",new Date());gtag("config","${GA_ID}",{send_page_view:false,anonymize_ip:true});`}
          </Script>
          <Script id="ga-src" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      )}
      <VercelAnalytics />
      <SpeedInsights />

      {GA_ID && show && (
        <div className="consent" role="dialog" aria-live="polite" aria-labelledby="consent-title" aria-describedby="consent-text">
          <p id="consent-title" className="consent-title">
            {t.consent.title}
          </p>
          <p id="consent-text" className="consent-text">
            {t.consent.text}{" "}
            <TransitionLink href="/privacidad" className="consent-link">
              {t.consent.more}
            </TransitionLink>
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => decide("denied")}>
              <span>{t.consent.reject}</span>
            </button>
            <button type="button" className="btn btn-pink btn-sm" onClick={() => decide("granted")}>
              <span>{t.consent.accept}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

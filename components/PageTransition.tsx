"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/loader";
import { useT } from "@/lib/i18n";

const cols = ["var(--pink)", "var(--blue)", "var(--green)", "var(--yellow)", "var(--orange)", "var(--purple)"];
const routeKeys = { "/": "home", "/nosotros": "about", "/proyectos": "projects", "/contacto": "contact", "/terminos": "terms", "/privacidad": "privacy" } as const;

export default function PageTransition() {
  const t = useT();
  const labels = useRef(t.nav);
  labels.current = t.nav;
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef(false);

  useEffect(() => {
    const onNavigate = (event: Event) => {
      const href = (event as CustomEvent<string>).detail;
      if (prefersReducedMotion() || !root.current) {
        router.push(href);
        return;
      }
      if (pending.current) return;
      pending.current = true;
      if (label.current) label.current.textContent = labels.current[routeKeys[href as keyof typeof routeKeys]] ?? "HAZTHINK";
      const q = gsap.utils.selector(root.current);
      window.__lenis?.stop();
      gsap
        .timeline()
        .set(root.current, { visibility: "visible" })
        .fromTo(q(".pt-col"), { yPercent: 100 }, { yPercent: 0, duration: 0.6, stagger: 0.05, ease: "expo.inOut" })
        .fromTo(q(".pt-label"), { yPercent: 120 }, { yPercent: 0, duration: 0.5, ease: "expo.out" }, "-=0.25")
        .add(() => router.push(href));
    };
    window.addEventListener("hz:navigate", onNavigate);
    return () => window.removeEventListener("hz:navigate", onNavigate);
  }, [router]);

  useEffect(() => {
    if (!pending.current || !root.current) return;
    const q = gsap.utils.selector(root.current);
    gsap
      .timeline({ delay: 0.15 })
      .to(q(".pt-label"), { yPercent: -120, duration: 0.4, ease: "expo.in" })
      .to(q(".pt-col"), { yPercent: -100, duration: 0.7, stagger: 0.05, ease: "expo.inOut" }, "-=0.1")
      .add(() => {
        pending.current = false;
        window.__lenis?.start();
      }, "-=0.35")
      .set(root.current, { visibility: "hidden" });
  }, [pathname]);

  return (
    <div ref={root} className="page-transition" aria-hidden="true">
      {cols.map((c) => (
        <i key={c} className="pt-col" style={{ background: c }} />
      ))}
      <span className="pt-label-mask">
        <span ref={label} className="pt-label">
          HAZTHINK
        </span>
      </span>
    </div>
  );
}

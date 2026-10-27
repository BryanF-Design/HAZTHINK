"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onSiteReady, prefersReducedMotion } from "@/lib/loader";

/**
 * Declarative scroll motion for every page:
 *  data-reveal          → fade + rise
 *  data-split           → masked chars/words rise (uses <Split/>)
 *  data-speed="0.15"    → parallax drift (fraction of element height)
 *  data-clip            → image wipes open
 *  data-stagger         → children fade + rise in sequence
 */
export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduced");
      return;
    }
    let ctx: gsap.Context | undefined;
    const off = onSiteReady(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 60 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.1,
              ease: "expo.out",
              delay: Number(el.dataset.delay ?? 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const chars = el.querySelectorAll(".c");
          gsap.fromTo(
            chars,
            { yPercent: 115, rotate: 6 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 1.1,
              ease: "expo.out",
              stagger: chars.length > 40 ? 0.008 : 0.022,
              delay: Number(el.dataset.delay ?? 0),
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { autoAlpha: 0, y: 50 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(18% 12% 18% 12% round 32px)", scale: 1.08 },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.6 },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = Number(el.dataset.speed);
          gsap.fromTo(
            el,
            { yPercent: speed * 100 },
            {
              yPercent: -speed * 100,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-rotate]").forEach((el) => {
          gsap.to(el, {
            rotate: Number(el.dataset.rotate),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        ScrollTrigger.refresh();
      });
    });
    return () => {
      off();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}

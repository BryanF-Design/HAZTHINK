"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { onSiteReady, prefersReducedMotion, whenRevealed } from "@/lib/loader";
import Split from "../Split";

type Props = { eyebrow: string; title: string; lead: string; color?: string; word?: string };

export default function PageHero({ eyebrow, title, lead, color = "var(--pink)", word = "HAZTHINK" }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    let offReveal = () => {};
    const off = onSiteReady(() => {
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "expo.out" } })
          .fromTo(q(".ph-title .c"), { yPercent: 120, rotate: 6 }, { yPercent: 0, rotate: 0, stagger: 0.022, duration: 1.3 })
          .fromTo(q(".ph-fade"), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 1 }, 0.3)
          .fromTo(q(".ph-lotus"), { scale: 0.3, rotate: -60, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.6, ease: "elastic.out(1, 0.6)" }, 0.2);
        // Starts as the columns lift, so the title rises into view instead of finishing hidden.
        offReveal = whenRevealed(() => intro.play());
        gsap.to(q(".ph-word"), { xPercent: -25, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(q(".ph-lotus"), { yPercent: 40, rotate: 50, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      }, el);
    });
    return () => {
      off();
      offReveal();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="ph" style={{ ["--c" as string]: color }}>
      <p className="ph-word" aria-hidden="true">
        {word} {word}
      </p>
      <div className="ph-inner container">
        <p className="eyebrow ph-fade">
          <span className="dot" />
          {eyebrow}
        </p>
        <h1 className="ph-title">
          <Split text={title} />
        </h1>
        <p className="ph-lead ph-fade">{lead}</p>
      </div>
      <Image className="ph-lotus" src="/brand/lotus.png" alt="" width={724} height={570} priority />
    </section>
  );
}

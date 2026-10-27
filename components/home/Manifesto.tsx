"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { onSiteReady, prefersReducedMotion } from "@/lib/loader";
import { useT } from "@/lib/i18n";

const hl = ["var(--blue)", "var(--green)", "var(--purple)"];

/** Sticky statement whose words light up as you scroll. */
export default function Manifesto() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const words = t.manifesto.text.split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const off = onSiteReady(() => {
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.5 } });
        tl.fromTo(q(".mf-word"), { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: "none" }, 0)
          .fromTo(q(".mf-hl"), { "--hl": "0%" }, { "--hl": "100%", stagger: 0.35, ease: "none" }, 0.2)
          .fromTo(q(".mf-sticker"), { y: (i) => 160 + i * 60, rotate: (i) => -40 + i * 30 }, { y: (i) => -160 - i * 80, rotate: (i) => 40 - i * 25, ease: "none" }, 0);
      }, el);
    });
    return () => {
      off();
      ctx?.revert();
    };
  }, [t.manifesto.text]);

  let h = 0;
  return (
    <section ref={root} className="mf" aria-labelledby="mf-title">
      <div className="mf-sticky">
        <p className="eyebrow">
          <span className="dot" />
          {t.manifesto.eyebrow}
        </p>
        <h2 id="mf-title" className="mf-text" key={t.manifesto.text}>
          {words.map((w, i) => {
            const isHl = t.manifesto.highlight.includes(w);
            const color = isHl ? hl[h++ % hl.length] : undefined;
            return (
              <span key={i} className={`mf-word${isHl ? " mf-hl" : ""}`} style={color ? { ["--c" as string]: color } : undefined}>
                {w}{" "}
              </span>
            );
          })}
        </h2>
        <p className="mf-aside">{t.manifesto.aside}</p>
        <div className="mf-stickers" aria-hidden="true">
          <Image className="mf-sticker" src="/brand/lotus.png" alt="" width={180} height={142} />
          <span className="mf-sticker mf-sticker-pill">{t.common.tagline}</span>
          <span className="mf-sticker mf-sticker-star">✺</span>
        </div>
      </div>
    </section>
  );
}

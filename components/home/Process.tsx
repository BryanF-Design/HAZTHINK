"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onSiteReady, prefersReducedMotion } from "@/lib/loader";
import { useT } from "@/lib/i18n";
import Split from "../Split";

const colors = ["var(--blue)", "var(--green)", "var(--orange)", "var(--purple)"];

/** Pinned horizontal scroll on desktop, vertical cards on phones. */
export default function Process() {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const off = onSiteReady(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 900px)", () => {
          const track = el.querySelector<HTMLElement>(".pr-track")!;
          const distance = () => track.scrollWidth - window.innerWidth;
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: el.querySelector(".pr-pin"),
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.8,
              pin: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          gsap.utils.toArray<HTMLElement>(".pr-card", el).forEach((card) => {
            gsap.fromTo(
              card.querySelector(".pr-glyph"),
              { rotate: -90, scale: 0.4 },
              { rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "center center", scrub: true } },
            );
          });
          gsap.to(el.querySelector(".pr-progress i"), {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: el.querySelector(".pr-pin"), start: "top top", end: () => `+=${distance()}`, scrub: true },
          });
        });
      }, el);
    });
    return () => {
      off();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="pr" aria-labelledby="pr-title">
      <div className="pr-pin">
        <div className="pr-track">
          <div className="pr-intro">
            <p className="eyebrow eyebrow-light">
              <span className="dot" />
              {t.process.eyebrow}
            </p>
            <h2 id="pr-title" className="h2" data-split>
              <Split text={t.process.title} />
            </h2>
            <p className="section-lead">{t.process.lead}</p>
            <span className="pr-arrow" aria-hidden="true">
              →
            </span>
          </div>
          {t.process.steps.map((s, i) => (
            <article key={i} className="pr-card" style={{ ["--c" as string]: colors[i] }}>
              <span className="pr-num">0{i + 1}</span>
              <div className={`pr-glyph pr-glyph-${i}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <div className="pr-progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}

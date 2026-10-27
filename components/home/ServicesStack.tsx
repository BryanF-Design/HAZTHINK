"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onSiteReady, prefersReducedMotion } from "@/lib/loader";
import { useT } from "@/lib/i18n";
import { serviceStyles, wa } from "@/lib/site";
import ServiceArt from "../ui/ServiceArt";
import Split from "../Split";

/** Sticky stacking service cards: each one pins, the next slides over it. */
export default function ServicesStack() {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  // Cards taller than the viewport stick with a negative top, so their whole
  // content scrolls into view before the next card covers them.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".svc-card"));
    const place = () => {
      const header = window.innerWidth < 900 ? 68 : 84;
      cards.forEach((card, i) => {
        const ideal = header + 12 + i * 14;
        const fit = window.innerHeight - card.offsetHeight - 16;
        card.style.top = `${Math.min(ideal, fit)}px`;
      });
    };
    place();
    const ro = new ResizeObserver(place);
    cards.forEach((c) => ro.observe(c));
    window.addEventListener("resize", place);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const off = onSiteReady(() => {
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".svc-card", el);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (next) {
            gsap.to(card.querySelector(".svc-inner"), {
              scale: 0.9,
              rotate: i % 2 ? 1.5 : -1.5,
              filter: "brightness(0.7)",
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: () => `top ${Math.max(10, parseFloat(next.style.top) || 100)}px`, scrub: true },
            });
          }
          gsap.fromTo(
            card.querySelector(".art"),
            { y: 80, rotate: i % 2 ? 6 : -6 },
            { y: -20, rotate: 0, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true } },
          );
        });
      }, el);
    });
    return () => {
      off();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} id="servicios" className="svc" aria-labelledby="svc-title">
      <div className="section-head container">
        <p className="eyebrow" data-reveal>
          <span className="dot" />
          {t.services.eyebrow}
        </p>
        <h2 id="svc-title" className="h2" data-split>
          <Split text={t.services.title} />
        </h2>
        <p className="section-lead" data-reveal>
          {t.services.lead}
        </p>
      </div>

      <div className="svc-list">
        {t.services.list.map((s, i) => {
          const st = serviceStyles[i];
          return (
            <article
              key={i}
              className="svc-card"
              style={{ ["--bg" as string]: st.color, ["--fg" as string]: st.ink, ["--i" as string]: i }}
              aria-labelledby={`svc-${i}`}
            >
              <div className="svc-inner">
                <div className="svc-copy">
                  <div className="svc-meta">
                    <span className="svc-num">0{i + 1}</span>
                    <span className="svc-medium">{s.medium}</span>
                  </div>
                  <h3 id={`svc-${i}`} className="svc-title">
                    {s.title}
                  </h3>
                  <p className="svc-lead">{s.lead}</p>
                  <p className="svc-label">{t.services.deliverables}</p>
                  <ul className="svc-items">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <a className="btn btn-ink svc-cta" href={wa(`${t.common.waDefault} (${s.title})`)} target="_blank" rel="noopener noreferrer">
                    <span>{t.services.cta}</span>
                    <i aria-hidden="true">↗</i>
                  </a>
                </div>
                <div className="svc-art">
                  <ServiceArt kind={st.art} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

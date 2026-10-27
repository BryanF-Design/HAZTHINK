"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onSiteReady, prefersReducedMotion } from "@/lib/loader";
import { useT } from "@/lib/i18n";

const colors = ["var(--blue)", "var(--green)", "var(--yellow)", "var(--orange)", "var(--purple)"];

/** Two tilted bands that run in opposite directions and react to scroll velocity. */
export default function Marquee() {
  const t = useT();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const off = onSiteReady(() => {
      ctx = gsap.context(() => {
        const tracks = gsap.utils.toArray<HTMLElement>(".mq-track", el);
        const loops = tracks.map((tr, i) =>
          gsap.fromTo(tr, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 28, ease: "none", repeat: -1 }),
        );
        let dir = 1;
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            if (self.direction !== dir) dir = self.direction;
            const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 500);
            loops.forEach((l) => {
              gsap.to(l, { timeScale: boost * dir, duration: 0.25, overwrite: true });
              gsap.to(l, { timeScale: dir, duration: 1.4, delay: 0.25 });
            });
          },
        });
        gsap.fromTo(el.querySelectorAll(".mq-band"), { rotate: (i) => (i ? 2 : -4) }, { rotate: (i) => (i ? -1 : -1.5), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      }, el);
    });
    return () => {
      off();
      ctx?.revert();
    };
  }, []);

  const row = (k: number) =>
    [0, 1].map((dup) => (
      <span key={`${k}-${dup}`} className="mq-group" aria-hidden={dup === 1 || k === 1}>
        {t.marquee.map((m, i) => (
          <span key={m} className="mq-item">
            {m}
            <i className="mq-dot" style={{ background: colors[(i + k) % colors.length] }} />
          </span>
        ))}
      </span>
    ));

  return (
    <div ref={root} className="mq" aria-label={t.services.eyebrow}>
      <div className="mq-band mq-band-pink">
        <div className="mq-track">{row(0)}</div>
      </div>
      <div className="mq-band mq-band-ink" aria-hidden="true">
        <div className="mq-track">
          {[0, 1].map((dup) => (
            <span key={dup} className="mq-group">
              {t.marquee.map((m) => (
                <span key={m} className="mq-item mq-item-outline">
                  {m}
                  <Image src="/brand/lotus-light.png" alt="" width={56} height={44} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

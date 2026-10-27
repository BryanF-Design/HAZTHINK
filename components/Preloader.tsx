"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markSiteReady, prefersReducedMotion } from "@/lib/loader";
import { useT } from "@/lib/i18n";

const bars = ["var(--blue)", "var(--green)", "var(--yellow)", "var(--orange)", "var(--purple)"];
const word = "HAZTHINK".split("");

export default function Preloader() {
  const t = useT();
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const finish = () => {
      html.classList.remove("is-loading");
      window.__lenis?.start();
      markSiteReady();
    };

    if (prefersReducedMotion()) {
      finish();
      setDone(true);
      return;
    }

    const repeat = sessionStorage.getItem("hz-loaded") === "1";
    const speed = repeat ? 0.55 : 1;
    html.classList.add("is-loading");
    window.__lenis?.stop();

    const q = gsap.utils.selector(el);
    const counter = { v: 0 };
    const countEl = q(".pl-count-num")[0] as HTMLElement;

    const fontsReady = (document.fonts?.ready ?? Promise.resolve()).catch(() => undefined);
    const pageReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));
    // Never hold the visitor longer than ~4.5s even if a resource stalls.
    const safety = new Promise<void>((r) => window.setTimeout(r, 4500));
    let loaded = false;
    Promise.race([Promise.all([fontsReady, pageReady]), safety]).then(() => {
      loaded = true;
    });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.set(el, { autoAlpha: 1 })
      .from(q(".pl-ghost"), { scale: 0.86, autoAlpha: 0, duration: 1 * speed }, 0)
      .from(q(".pl-char"), { yPercent: 115, rotate: 8, stagger: 0.045 * speed, duration: 0.9 * speed }, 0.15)
      .from(q(".pl-meta > *"), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.7 * speed }, 0.25)
      .to(
        counter,
        {
          v: 100,
          duration: 1.6 * speed,
          ease: "power2.inOut",
          onUpdate() {
            const v = Math.round(counter.v);
            if (countEl) countEl.textContent = String(v).padStart(3, "0");
            el.style.setProperty("--p", String(counter.v / 100));
          },
        },
        0.2,
      )
      .add(() => {
        if (!loaded) {
          tl.pause();
          const resume = () => (loaded ? tl.resume() : window.setTimeout(resume, 80));
          resume();
        }
      })
      .to(q(".pl-lotus"), { scale: 1.08, duration: 0.5 * speed, ease: "back.out(3)" })
      .to(q(".pl-petal-drop"), { scale: 1, autoAlpha: 1, stagger: 0.06, duration: 0.5 * speed, ease: "back.out(2.5)" }, "<")
      .to(q(".pl-char"), { yPercent: -115, stagger: 0.03 * speed, duration: 0.6 * speed, ease: "expo.in" }, "+=0.15")
      .to(q(".pl-meta > *"), { y: -20, autoAlpha: 0, duration: 0.4 * speed, ease: "power2.in" }, "<")
      .to(q(".pl-stage"), { scale: 0.7, autoAlpha: 0, duration: 0.6 * speed, ease: "expo.in" }, "<0.1")
      .fromTo(
        q(".pl-col"),
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.06, duration: 0.55 * speed, ease: "expo.inOut" },
        "<0.15",
      )
      .set(q(".pl-bg"), { autoAlpha: 0 })
      .add(finish)
      .to(q(".pl-col"), { yPercent: -100, stagger: 0.06, duration: 0.75 * speed, ease: "expo.inOut" })
      .add(() => {
        sessionStorage.setItem("hz-loaded", "1");
        setDone(true);
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" role="status" aria-label={t.common.loading}>
      <div className="pl-bg" />
      <div className="pl-stage">
        <div className="pl-lotus" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pl-ghost" src="/brand/lotus-light.png" alt="" width={724} height={570} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pl-fill" src="/brand/lotus-light.png" alt="" width={724} height={570} />
          <span className="pl-scan" />
          {bars.map((c, i) => (
            <i key={c} className="pl-petal-drop" style={{ background: c, ["--i" as string]: i }} />
          ))}
        </div>
        <p className="pl-word" aria-hidden="true">
          {word.map((ch, i) => (
            <span key={i} className="pl-char-mask">
              <span className="pl-char">{ch}</span>
            </span>
          ))}
        </p>
        <div className="pl-meta">
          <span>{t.common.tagline}</span>
          <span className="pl-count">
            <span className="pl-count-num">000</span>
            <small>%</small>
          </span>
        </div>
        <div className="pl-bars" aria-hidden="true">
          {bars.map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </div>
      </div>
      <div className="pl-cols" aria-hidden="true">
        {["var(--pink)", ...bars].map((c) => (
          <i key={c} className="pl-col" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

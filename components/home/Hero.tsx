"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isTransitioning, onSiteReady, prefersReducedMotion, whenRevealed } from "@/lib/loader";
import { lotusState } from "@/lib/lotus-state";
import { useT } from "@/lib/i18n";
import { wa } from "@/lib/site";
import Split from "../Split";
import Magnetic from "../Magnetic";
import Badge from "../ui/Badge";

const LotusScene = dynamic(() => import("../three/LotusScene"), { ssr: false });

function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const [three, setThree] = useState(false);

  // WebGL start-up is heavy: after a page wipe, wait for the columns to clear before compiling shaders.
  useEffect(() => {
    const afterWipe = isTransitioning();
    let id = 0;
    const off = whenRevealed(() => {
      id = window.setTimeout(() => setThree(!prefersReducedMotion() && canWebGL()), afterWipe ? 950 : 0);
    });
    return () => {
      off();
      window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      lotusState.intro = 1;
      return;
    }
    let ctx: gsap.Context | undefined;
    let offReveal = () => {};
    const off = onSiteReady(() => {
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        lotusState.intro = 0;
        lotusState.progress = 0;
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "expo.out" } })
          .fromTo(q(".hero-title .c"), { yPercent: 120, rotate: 8 }, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.025 }, 0)
          .fromTo(lotusState, { intro: 0 }, { intro: 1, duration: 2.2, ease: "elastic.out(1, 0.6)" }, 0.1)
          .fromTo(q(".hero-fade"), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08 }, 0.5)
          .fromTo(q(".hero-badge"), { scale: 0, rotate: -120 }, { scale: 1, rotate: 0, duration: 1.4, ease: "back.out(1.8)" }, 0.6);
        offReveal = whenRevealed(() => intro.play());

        const mm = gsap.matchMedia();
        mm.add("(min-width: 900px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "+=110%", scrub: 0.8, pin: true, anticipatePin: 1 },
          });
          tl.to(lotusState, { progress: 1, ease: "none" }, 0)
            .to(q(".hero-copy"), { yPercent: -18, autoAlpha: 0, ease: "power1.in" }, 0)
            .to(q(".hero-stage"), { xPercent: -22, scale: 1.12, ease: "power1.inOut" }, 0)
            .to(q(".hero-bg-word"), { xPercent: -30, ease: "none" }, 0)
            .to(q(".hero-badge"), { rotate: 260, ease: "none" }, 0);
        });
        mm.add("(max-width: 899px)", () => {
          gsap.to(lotusState, {
            progress: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
          });
          gsap.to(q(".hero-bg-word"), { xPercent: -40, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        });
        ScrollTrigger.refresh();
      }, el);
    });
    return () => {
      off();
      offReveal();
      ctx?.revert();
      lotusState.progress = 0;
    };
  }, []);

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <p className="hero-bg-word" aria-hidden="true">
        HAZTHINK HAZTHINK
      </p>

      <div className="hero-stage" data-cursor={t.common.drag}>
        {three ? (
          <LotusScene className="hero-canvas" label={t.common.lotusAria} />
        ) : (
          <Image className="hero-fallback" src="/brand/lotus.png" alt="" width={724} height={570} priority />
        )}
      </div>

      <div className="hero-copy">
        <p className="eyebrow hero-fade">
          <span className="dot" />
          {t.hero.eyebrow}
        </p>
        <h1 id="hero-title" className="hero-title" key={t.hero.title1}>
          <span className="hero-line">
            <Split text={t.hero.title1} />
          </span>
          <span className="hero-line">
            <Split text={t.hero.title2} />
          </span>
          <span className="hero-line hero-line-sm">
            <Split text={t.hero.title3} /> <Split text={t.hero.accent} className="serif-accent" />
          </span>
        </h1>
        <p className="hero-lead hero-fade">{t.hero.lead}</p>
        <div className="hero-actions hero-fade">
          <Magnetic>
            <a className="btn btn-ink" href={wa(t.common.waDefault)} target="_blank" rel="noopener noreferrer">
              <span>{t.hero.cta}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </Magnetic>
          <a className="btn btn-ghost" href="#servicios">
            <span>{t.hero.secondary}</span>
            <i aria-hidden="true">↓</i>
          </a>
        </div>
      </div>

      <div className="hero-foot hero-fade">
        <ul className="hero-signals">
          {t.hero.signals.map((s, i) => (
            <li key={s}>
              <i style={{ background: ["var(--blue)", "var(--green)", "var(--orange)"][i] }} />
              {s}
            </li>
          ))}
        </ul>
        <span className="hero-hint">
          <span className="hero-mouse" aria-hidden="true" />
          {t.hero.scroll}
        </span>
      </div>

      <Badge className="hero-badge" text={`${t.common.tagline} • `} />
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onSiteReady, prefersReducedMotion } from "@/lib/loader";
import { nav, site, wa } from "@/lib/site";
import { useT } from "@/lib/i18n";
import TransitionLink from "./TransitionLink";
import Magnetic from "./Magnetic";
import WhatsAppIcon from "./WhatsAppIcon";

const letters = "HAZTHINK".split("");
const letterColors = ["var(--blue)", "var(--green)", "var(--yellow)", "var(--orange)", "var(--purple)", "var(--pink)", "var(--blue)", "var(--green)"];
const petals = [
  { c: "var(--blue)", x: "6%", y: "18%", r: -30, s: 1 },
  { c: "var(--green)", x: "88%", y: "10%", r: 40, s: 0.8 },
  { c: "var(--yellow)", x: "70%", y: "46%", r: -12, s: 0.6 },
  { c: "var(--orange)", x: "18%", y: "58%", r: 64, s: 0.7 },
  { c: "var(--purple)", x: "48%", y: "8%", r: 110, s: 0.55 },
  { c: "var(--pink)", x: "94%", y: "62%", r: -70, s: 0.9 },
];

function useMexicoTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "America/Mexico_City" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const time = useMexicoTime();
  const year = new Date().getFullYear();

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const off = onSiteReady(() => {
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);

        // Curtain: the footer rises from under the page.
        gsap.fromTo(
          q(".footer-inner"),
          { yPercent: -35 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } },
        );

        // Giant wordmark letters jump into place one by one.
        gsap.fromTo(
          q(".fw-letter"),
          { yPercent: 120, rotate: (i) => (i % 2 ? 18 : -18), scale: 0.6 },
          {
            yPercent: 0,
            rotate: 0,
            scale: 1,
            ease: "back.out(1.6)",
            stagger: 0.06,
            scrollTrigger: { trigger: q(".footer-word")[0], start: "top bottom", end: "bottom bottom", scrub: 1 },
          },
        );

        gsap.fromTo(
          q(".footer-cta-line .c"),
          { yPercent: 115 },
          { yPercent: 0, stagger: 0.02, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 75%", once: true } },
        );
        gsap.fromTo(
          q(".footer-col"),
          { y: 60, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 65%", once: true } },
        );

        // Floating petals drift with scroll, then follow the pointer.
        q(".footer-petal").forEach((p, i) => {
          gsap.to(p, { rotate: `+=${i % 2 ? 180 : -180}`, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 1.5 } });
          gsap.to(p, { y: "+=24", duration: 2.4 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });
        const layers = q(".footer-petals")[0] as HTMLElement;
        const xTo = gsap.quickTo(layers, "x", { duration: 1.2, ease: "power3" });
        const yTo = gsap.quickTo(layers, "y", { duration: 1.2, ease: "power3" });
        const move = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * -60);
          yTo((e.clientY / window.innerHeight - 0.5) * -40);
        };
        el.addEventListener("pointermove", move);

        // Footer marquee speeds up with scroll velocity.
        const track = q(".footer-marquee-track")[0];
        const loop = gsap.to(track, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-4, 4, self.getVelocity() / 400);
            gsap.to(loop, { timeScale: 1 + Math.abs(v), duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
          },
        });

        return () => el.removeEventListener("pointermove", move);
      }, el);
    });
    return () => {
      off();
      ctx?.revert();
    };
  }, []);

  const jump = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      e.currentTarget,
      { yPercent: 0 },
      { yPercent: -22, rotate: gsap.utils.random(-12, 12), duration: 0.28, ease: "power2.out", yoyo: true, repeat: 1, overwrite: true },
    );
  };

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 2.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={root} className="site-footer">
      <div className="footer-inner">
        <div className="footer-petals" aria-hidden="true">
          {petals.map((p, i) => (
            <svg
              key={i}
              className="footer-petal"
              viewBox="0 0 60 100"
              style={{ left: p.x, top: p.y, color: p.c, ["--s" as string]: p.s, rotate: `${p.r}deg` }}
            >
              <path d="M30 2C52 26 56 64 30 98 4 64 8 26 30 2Z" fill="currentColor" />
              <path d="M30 2C52 26 56 64 30 98" fill="none" stroke="#fff6ee" strokeWidth="2.5" opacity=".7" />
            </svg>
          ))}
        </div>

        <div className="footer-marquee" aria-hidden="true">
          <div className="footer-marquee-track">
            {[0, 1].map((k) => (
              <span key={k}>
                {t.footer.slogan.map((part, i) => (
                  <span key={i}>
                    {part}
                    <Image src="/brand/lotus-light.png" alt="" width={72} height={57} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="footer-top">
          <div className="footer-cta">
            <p className="eyebrow eyebrow-light">{t.footer.eyebrow}</p>
            <h2 className="footer-cta-line" key={t.footer.line1}>
              <span className="w">
                {t.footer.line1.split("").map((c, i) => (
                  <span className="c" key={i}>
                    {c}
                  </span>
                ))}
              </span>{" "}
              <span className="w serif-accent">
                {t.footer.line2.split("").map((c, i) => (
                  <span className="c" key={i}>
                    {c}
                  </span>
                ))}
              </span>
            </h2>
            <a className="footer-mail" href={`mailto:${site.email}`} data-cursor="Escribir">
              <span>{site.email}</span>
            </a>
          </div>

          <Magnetic strength={0.5}>
            <a className="footer-orb" href={wa(t.common.waDefault)} aria-label={t.common.waAria} target="_blank" rel="noopener noreferrer" data-cursor="Hablemos">
              <svg className="footer-orb-ring" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path id="orbPath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text>
                  <textPath href="#orbPath">{t.footer.orb}</textPath>
                </text>
              </svg>
              <span className="footer-orb-core">
                <WhatsAppIcon />
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h3>{t.footer.navigate}</h3>
            {nav.map((n) => (
              <TransitionLink key={n.href} href={n.href} className="footer-link">
                <span className="roll"><span data-text={t.nav[n.key]}>{t.nav[n.key]}</span></span>
              </TransitionLink>
            ))}
          </div>
          <div className="footer-col">
            <h3>{t.footer.contact}</h3>
            <a className="footer-link" href={`tel:${site.phone}`}>
              <span className="roll"><span data-text={site.phoneLabel}>{site.phoneLabel}</span></span>
            </a>
            <a className="footer-link" href={wa(t.common.waDefault)} target="_blank" rel="noopener noreferrer">
              <span data-text="WhatsApp">WhatsApp</span>
            </a>
            <a className="footer-link" href={site.facebook} target="_blank" rel="noopener noreferrer">
              <span data-text="Facebook">Facebook</span>
            </a>
          </div>
          <div className="footer-col">
            <h3>{t.footer.studio}</h3>
            {t.footer.studioLines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p className="footer-clock">
              <i aria-hidden="true" /> CDMX <span suppressHydrationWarning>{time || "--:--:--"}</span>
            </p>
          </div>
          <div className="footer-col">
            <h3>{t.footer.legal}</h3>
            <TransitionLink href="/terminos" className="footer-link">
              <span className="roll"><span data-text={t.nav.terms}>{t.nav.terms}</span></span>
            </TransitionLink>
            <TransitionLink href="/privacidad" className="footer-link">
              <span className="roll"><span data-text={t.nav.privacy}>{t.nav.privacy}</span></span>
            </TransitionLink>
            {process.env.NEXT_PUBLIC_GA_ID && (
              <button type="button" className="footer-link footer-cookie-btn" onClick={() => window.dispatchEvent(new Event("hz:cookies"))}>
                <span className="roll"><span data-text={t.consent.manage}>{t.consent.manage}</span></span>
              </button>
            )}
            <button type="button" className="footer-top-btn" onClick={toTop} data-cursor="Arriba">
              <span aria-hidden="true">↑</span> {t.footer.top}
            </button>
          </div>
        </div>

        <div className="footer-word" aria-label="HAZTHINK">
          {letters.map((l, i) => (
            <span key={i} className="fw-mask" aria-hidden="true">
              <span className="fw-letter" style={{ ["--c" as string]: letterColors[i] }} onPointerEnter={jump}>
                {l}
              </span>
            </span>
          ))}
        </div>

        <div className="footer-bottom">
          <span>
            © {year} HAZTHINK. {t.footer.rights}
          </span>
          <span>
            {t.footer.by}{" "}
            <a href="https://www.bryanfdesign.com.mx" target="_blank" rel="noopener noreferrer">
              BryanF Design
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { nav, site, wa } from "@/lib/site";
import { useT } from "@/lib/i18n";
import LangSwitcher from "./LangSwitcher";
import TransitionLink from "./TransitionLink";
import Logo from "./Logo";
import Magnetic from "./Magnetic";

const menuColors = ["var(--blue)", "var(--green)", "var(--orange)", "var(--purple)"];

export default function Header() {
  const pathname = usePathname();
  const t = useT();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const el = header.current;
      if (!el) return;
      el.classList.toggle("is-scrolled", y > 40);
      if (!open) el.classList.toggle("is-hidden", y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    tl.current = gsap
      .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
      .set(el, { visibility: "visible" })
      .fromTo(q(".menu-bg i"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 0.7, stagger: 0.05 })
      .fromTo(q(".menu-link-inner"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" }, "-=0.3")
      .fromTo(q(".menu-foot > *"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power3.out" }, "-=0.5");
    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (open) {
      tl.current?.timeScale(1).play();
      window.__lenis?.stop();
    } else {
      tl.current?.timeScale(1.6).reverse();
      if (!document.documentElement.classList.contains("is-loading")) window.__lenis?.start();
    }
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header ref={header} className={`site-header${open ? " menu-open" : ""}`}>
        <TransitionLink href="/" className="header-logo" aria-label={t.common.home}>
          <Logo light={open} />
        </TransitionLink>

        <nav className="header-nav" aria-label="Navegación principal">
          {nav.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              className={`nav-link${pathname === item.href ? " is-current" : ""}`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span className="roll">
                <span data-text={t.nav[item.key]}>{t.nav[item.key]}</span>
              </span>
            </TransitionLink>
          ))}
        </nav>

        <div className="header-actions">
          <LangSwitcher />
          <Magnetic>
            <a className="btn btn-pink btn-sm header-cta" href={wa(t.common.waDefault)} target="_blank" rel="noopener noreferrer">
              <span>{t.common.quote}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </Magnetic>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t.common.menuClose : t.common.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div ref={menu} id="site-menu" className="site-menu" aria-hidden={!open} inert={!open}>
        <div className="menu-bg" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <nav className="menu-links" aria-label={t.common.menu}>
          {nav.map((item, i) => (
            <TransitionLink key={item.href} href={item.href} className="menu-link" style={{ ["--c" as string]: menuColors[i] }}>
              <span className="menu-link-inner">
                <small>0{i + 1}</small>
                {t.nav[item.key]}
              </span>
            </TransitionLink>
          ))}
        </nav>
        <div className="menu-foot">
          <LangSwitcher variant="segmented" />
          <a href={wa(t.common.waDefault)} target="_blank" rel="noopener noreferrer">
            WhatsApp {site.phoneLabel}
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </>
  );
}

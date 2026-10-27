"use client";

import { useEffect, useRef, useState } from "react";
import { useA11y, type A11yPrefs } from "@/lib/a11y";
import { useT } from "@/lib/i18n";
import LangSwitcher from "./LangSwitcher";

const sizes = [
  { v: 1, label: "A" },
  { v: 1.15, label: "A+" },
  { v: 1.3, label: "A++" },
  { v: 1.5, label: "A+++" },
];

type ToggleKey = Exclude<keyof A11yPrefs, "scale">;

export default function A11yPanel() {
  const t = useT();
  const { prefs, update, reset } = useA11y();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const toggles: { key: ToggleKey; label: string; hint: string }[] = [
    { key: "contrast", label: t.a11y.contrast, hint: t.a11y.contrastHint },
    { key: "motion", label: t.a11y.motion, hint: t.a11y.motionHint },
    { key: "links", label: t.a11y.links, hint: t.a11y.linksHint },
    { key: "font", label: t.a11y.font, hint: t.a11y.fontHint },
    { key: "spacing", label: t.a11y.spacing, hint: t.a11y.spacingHint },
    { key: "cursor", label: t.a11y.cursor, hint: t.a11y.cursorHint },
  ];

  useEffect(() => {
    if (!open) return;
    const el = panel.current;
    el?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab" && el) {
        const items = el.querySelectorAll<HTMLElement>("button, [href], input");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      if (!document.documentElement.classList.contains("is-loading")) window.__lenis?.start();
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="a11y-fab"
        aria-label={t.a11y.open}
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((v) => !v)}
        data-cursor={t.a11y.title}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="4.2" r="2" />
          <path d="M4 8.2c2.6.8 5.3 1.2 8 1.2s5.4-.4 8-1.2M12 9.4V15m0 0-3.2 6.2M12 15l3.2 6.2" />
        </svg>
      </button>

      <div className={`a11y-scrim${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <div
        ref={panel}
        id="a11y-panel"
        className={`a11y-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-title"
        inert={!open}
        data-lenis-prevent
      >
        <div className="a11y-head">
          <h2 id="a11y-title">{t.a11y.title}</h2>
          <button type="button" className="a11y-close" onClick={() => setOpen(false)} aria-label={t.a11y.close}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <p className="a11y-lead">{t.a11y.lead}</p>

        <div className="a11y-group">
          <h3>{t.common.language}</h3>
          <LangSwitcher variant="segmented" />
        </div>

        <div className="a11y-group">
          <h3 id="a11y-size">{t.a11y.textSize}</h3>
          <div className="a11y-sizes" role="radiogroup" aria-labelledby="a11y-size">
            {sizes.map((s) => (
              <button
                key={s.v}
                type="button"
                role="radio"
                aria-checked={prefs.scale === s.v}
                className={prefs.scale === s.v ? "is-active" : ""}
                onClick={() => update({ scale: s.v })}
                style={{ fontSize: `${0.85 + (s.v - 1) * 1.1}rem` }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="a11y-toggles">
          {toggles.map((o) => (
            <li key={o.key}>
              <button type="button" role="switch" aria-checked={prefs[o.key]} onClick={() => update({ [o.key]: !prefs[o.key] })}>
                <span className="a11y-text">
                  <strong>{o.label}</strong>
                  <small>{o.hint}</small>
                </span>
                <span className="a11y-switch" aria-hidden="true">
                  <i />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className="a11y-reset" onClick={reset}>
          ↺ {t.a11y.reset}
        </button>
      </div>
    </>
  );
}

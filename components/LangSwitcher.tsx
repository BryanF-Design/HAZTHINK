"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LANGS } from "@/lib/dictionaries";
import { useLang } from "@/lib/i18n";

/** Dropdown language picker (header) or segmented control (mobile menu). */
export default function LangSwitcher({ variant = "dropdown" }: { variant?: "dropdown" | "segmented" }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  if (variant === "segmented") {
    return (
      <div className="lang-seg" role="radiogroup" aria-label={t.common.language}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={l.code === lang}
            aria-label={l.name}
            className={l.code === lang ? "is-active" : ""}
            onClick={() => setLang(l.code)}
          >
            {l.short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={root} className={`lang-dd${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="lang-dd-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.common.language}: ${current.name}`}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
        </svg>
        <span>{current.short}</span>
        <i aria-hidden="true" />
      </button>
      <ul id={listId} role="listbox" aria-label={t.common.language} className="lang-dd-list">
        {LANGS.map((l) => (
          <li key={l.code}>
            <button
              type="button"
              role="option"
              aria-selected={l.code === lang}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              <b>{l.short}</b>
              <span>{l.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

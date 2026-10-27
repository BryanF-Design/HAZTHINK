"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type A11yPrefs = {
  scale: number; // 1, 1.15, 1.3, 1.5
  contrast: boolean;
  motion: boolean; // reduce motion
  links: boolean;
  font: boolean;
  cursor: boolean; // system cursor
  spacing: boolean;
};

export const DEFAULT_PREFS: A11yPrefs = { scale: 1, contrast: false, motion: false, links: false, font: false, cursor: false, spacing: false };
const KEY = "hz-a11y";

export function readPrefs(): A11yPrefs {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return DEFAULT_PREFS;
  }
}

/** Applied before paint by the inline script in <head> and on every change. */
export function applyPrefs(p: A11yPrefs) {
  const h = document.documentElement;
  h.style.setProperty("--a11y-scale", String(p.scale));
  h.classList.toggle("a11y-contrast", p.contrast);
  h.classList.toggle("reduced", p.motion || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  h.classList.toggle("a11y-links", p.links);
  h.classList.toggle("a11y-font", p.font);
  h.classList.toggle("a11y-cursor", p.cursor);
  h.classList.toggle("a11y-spacing", p.spacing);
}

export const a11yBootScript = `try{var p=JSON.parse(localStorage.getItem("${KEY}")||"{}"),h=document.documentElement;if(p.scale)h.style.setProperty("--a11y-scale",p.scale);if(p.contrast)h.classList.add("a11y-contrast");if(p.motion||matchMedia("(prefers-reduced-motion: reduce)").matches)h.classList.add("reduced");if(p.links)h.classList.add("a11y-links");if(p.font)h.classList.add("a11y-font");if(p.cursor)h.classList.add("a11y-cursor");if(p.spacing)h.classList.add("a11y-spacing");var l=localStorage.getItem("hz-lang");if(l)h.dataset.lang=l}catch(e){}`;

type Ctx = { prefs: A11yPrefs; update: (p: Partial<A11yPrefs>) => void; reset: () => void };
const A11yContext = createContext<Ctx>({ prefs: DEFAULT_PREFS, update: () => {}, reset: () => {} });

export function A11yProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_PREFS);

  useEffect(() => setPrefs(readPrefs()), []);

  const commit = useCallback((next: A11yPrefs) => {
    const motionChanged = next.motion !== readPrefs().motion;
    setPrefs(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    applyPrefs(next);
    window.dispatchEvent(new Event("resize"));
    // Smooth scroll, pinned sections and WebGL are set up once; a reload rebuilds them cleanly.
    if (motionChanged) window.setTimeout(() => window.location.reload(), 250);
  }, []);

  const update = useCallback((p: Partial<A11yPrefs>) => commit({ ...readPrefs(), ...p }), [commit]);
  const reset = useCallback(() => commit(DEFAULT_PREFS), [commit]);

  return <A11yContext.Provider value={{ prefs, update, reset }}>{children}</A11yContext.Provider>;
}

export const useA11y = () => useContext(A11yContext);

"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ScrollTrigger } from "./gsap";
import { dictionaries, detectLang, LANGS, type Dict, type Lang } from "./dictionaries";

const KEY = "hz-lang";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "mx", t: dictionaries.mx, setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("mx");

  useEffect(() => {
    let initial: Lang | null = null;
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved && saved in dictionaries) initial = saved;
    } catch {}
    setLangState(initial ?? detectLang());
  }, []);

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang)!;
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dataset.lang = lang;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "ko";
export type L = { en: string; ko: string };

const STORAGE_KEY = "diap-lang";

// Saved choice first; otherwise Korean for Korean-language browsers or a Seoul timezone, English for everyone else.
function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ko") return saved;
  } catch {
    /* storage unavailable */
  }
  // Search crawlers (Googlebot, Naver Yeti, ...) get the Korean site so snippets match Korean queries.
  if (/bot|crawl|spider|yeti|slurp/i.test(navigator.userAgent)) return "ko";
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  if (langs.some((l) => l?.toLowerCase().startsWith("ko"))) return "ko";
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Seoul") return "ko";
  } catch {
    /* ignore */
  }
  return "en";
}

interface Ctx {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: L) => string;
}

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (text) => text[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

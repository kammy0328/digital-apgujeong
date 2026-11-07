import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
export type Lang = "en" | "ko";
export type L = { en: string; ko: string };
export function basePath(path: string) {
  return path.replace(/^\/en(?=\/|$)/, "").replace(/\/$/, "") || "/";
}
export function localizedPath(path: string, lang: Lang) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const plain = path.replace(/^\/en(?=\/|$)/, "") || "/";
  return lang === "en" ? `/en${plain === "/" ? "" : plain}` : plain;
}
interface Ctx {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: L) => string;
}
const LangContext = createContext<Ctx | null>(null);
export function LangProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  // Each URL always represents the same language for visitors and crawlers.
  const lang: Lang = /^\/en(?:\/|$)/.test(location.pathname) ? "en" : "ko";
  const setLang = useCallback(
    (next: Lang) => {
      if (next !== lang)
        navigate(
          localizedPath(basePath(location.pathname), next) +
            location.search +
            location.hash,
        );
    },
    [lang, location, navigate],
  );
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (text) => text[lang] }),
    [lang, setLang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error("LangProvider is required");
  return value;
}

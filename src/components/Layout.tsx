import { NavLink, Link, useLocation, useOutlet } from "react-router-dom";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import WebGLBackground from "./WebGLBackground";
import { useLang, type L, type Lang } from "../i18n";
import seo from "../data/seo.json";

const NAV = [
  { to: "/work", label: "work" },
  { to: "/service", label: "service" },
  { to: "/contact", label: "contact" },
];

const META = seo as Record<string, { title: L; description: L }>;
const SITE = "https://digital-apgujeong.vercel.app";

const UI = {
  home: { en: "diap home", ko: "디지털 압구정 홈" } as L,
  mainMenu: { en: "Main menu", ko: "주 메뉴" } as L,
  mobileMenu: { en: "Mobile menu", ko: "모바일 메뉴" } as L,
  openMenu: { en: "Open menu", ko: "메뉴 열기" } as L,
  closeMenu: { en: "Close menu", ko: "메뉴 닫기" } as L,
  studioName: { en: "Digital Apgujeong", ko: "디지털 압구정" } as L,
  switchLang: { en: "Switch language", ko: "언어 전환" } as L,
};

function LangToggle() {
  const { lang, setLang, t } = useLang();
  const options: { value: Lang; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ko", label: "KR" },
  ];
  return (
    <div className="lang-toggle" role="group" aria-label={t(UI.switchLang)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={lang === o.value ? "is-active" : ""}
          aria-pressed={lang === o.value}
          onClick={() => setLang(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const { t, lang } = useLang();
  const glassRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    setOpen(false);
    const meta = META[pathname] ?? META["/"];
    const title = meta.title[lang];
    const description = meta.description[lang];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    const url = `${SITE}${pathname === "/" ? "/" : pathname}`;
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
  }, [pathname, lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Specular highlight on the glass bar follows the pointer.
  const onGlassMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = glassRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--hx", `${e.clientX - rect.left}px`);
  };

  return (
    <MotionConfig reducedMotion="user">
      <WebGLBackground />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="site-shell">
        <header className={`site-header${scrolled || open ? " is-glass" : ""}`}>
          <motion.div
            ref={glassRef}
            className="header-glass"
            onPointerMove={onGlassMove}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <Link to="/" className="brand" aria-label={t(UI.home)}>
              <Logo className="brand-logo" />
              <span className="brand-caption">
                digital
                <br />
                apgujeong
              </span>
            </Link>
            <div className="header-right">
            <nav className="desktop-nav" aria-label={t(UI.mainMenu)}>
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="nav-pill"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="nav-label">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
            <LangToggle />
            <button
              className="menu-toggle"
              aria-label={open ? t(UI.closeMenu) : t(UI.openMenu)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
            </div>
          </motion.div>
        </header>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label={t(UI.mobileMenu)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.55, delay: 0.06 * i + 0.05, ease }}
                >
                  <NavLink to={item.to} end={item.to === "/"} onClick={() => setOpen(false)}>
                    <span className="mobile-index">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                digitalapgujeong@gmail.com
                <br />
                <a href="https://www.instagram.com/digital_apgujeong" target="_blank" rel="noopener noreferrer">
                  @digital_apgujeong
                </a>
              </motion.p>
            </motion.nav>
          )}
        </AnimatePresence>

        <main id="main-content">
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.14 } }}
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="site-footer">
          <div className="footer-top">
            <div className="footer-col">
              <span className="eyebrow">studio</span>
              <p>
                {t(UI.studioName)}
                <br />
                beauty & cleanup
              </p>
            </div>
            <div className="footer-col">
              <span className="eyebrow">contact</span>
              <a href="mailto:digitalapgujeong@gmail.com">digitalapgujeong@gmail.com</a>
              <a href="https://www.instagram.com/digital_apgujeong" target="_blank" rel="noopener noreferrer">
                @digital_apgujeong
              </a>
            </div>
            <div className="footer-col footer-copy">
              <span className="eyebrow">© {new Date().getFullYear()}</span>
              <p>diap — digital apgujeong</p>
            </div>
          </div>
          <motion.div
            className="footer-mark"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease }}
          >
            <Logo />
          </motion.div>
        </footer>
      </div>
    </MotionConfig>
  );
}

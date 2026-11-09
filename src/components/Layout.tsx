import { useLocation, useOutlet } from "react-router-dom";
import { Link, NavLink } from "./LocalizedLink";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import Logo from "./Logo";
import WebGLBackground from "./WebGLBackground";
import { basePath, localizedPath, useLang, type L, type Lang } from "../i18n";
import seo from "../data/seo.json";
import { ease } from "../motion";

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
    <div
      className="lang-toggle"
      lang="en"
      translate="no"
      role="group"
      aria-label={t(UI.switchLang)}
    >
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

// Route changes must not inherit CSS smooth scrolling or a browser-restored position.
function resetPageScroll() {
  if (!window.location.hash)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = basePath(location.pathname);
  const outlet = useOutlet();
  const { t, lang } = useLang();
  const glassRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  useLayoutEffect(() => {
    resetPageScroll();
    window.addEventListener("pageshow", resetPageScroll);
    return () => window.removeEventListener("pageshow", resetPageScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const meta = META[pathname] ?? {
      title: { ko: "페이지 없음 — diap", en: "Page not found — diap" },
      description: {
        ko: "요청한 페이지를 찾을 수 없습니다.",
        en: "The requested page could not be found.",
      },
    };
    const title = meta.title[lang];
    const description = meta.description[lang];
    document.title = title;
    document.querySelector('meta[property="og:site_name"]')?.setAttribute("content", lang === "en" ? "diap" : "디지털 압구정");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    const url = `${SITE}${localizedPath(pathname, lang)}`;
    const known = Boolean(META[pathname]);
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute("content", known ? "index, follow" : "noindex, follow");
    if (known) {
      let canonical = document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
      for (const code of ["ko", "en", "x-default"]) {
        let link = document.querySelector<HTMLLinkElement>(
          `link[hreflang="${code}"]`,
        );
        if (!link) {
          link = document.createElement("link");
          link.rel = "alternate";
          link.hreflang = code;
          document.head.appendChild(link);
        }
        link.href = SITE + localizedPath(pathname, code === "en" ? "en" : "ko");
      }
    } else {
      document
        .querySelectorAll('link[rel="canonical"], link[hreflang]')
        .forEach((link) => link.remove());
    }
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", lang === "en" ? "en_US" : "ko_KR");
    document
      .querySelector('meta[property="og:locale:alternate"]')
      ?.setAttribute("content", lang === "en" ? "ko_KR" : "en_US");
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", description);
  }, [pathname, lang]);

  useEffect(() => {
    const onScroll = () => {
      if (!document.body.classList.contains("menu-open"))
        setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const hadMenuClass = body.classList.contains("menu-open");
    body.classList.add("menu-open");
    const savedY = window.scrollY;
    const savedX = window.scrollX;
    const savedPath = basePath(window.location.pathname);
    const properties = [
      "position",
      "top",
      "left",
      "width",
      "overflow",
    ] as const;
    const previous = properties.map((property) => body.style[property]);
    // Fixed-body locking also prevents Safari from scrolling behind the menu.
    body.style.position = "fixed";
    body.style.top = `${-savedY}px`;
    body.style.left = `${-savedX}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    const syncViewport = () => {
      menuRef.current?.style.setProperty(
        "--menu-height",
        `${window.visualViewport?.height ?? window.innerHeight}px`,
      );
    };
    syncViewport();
    window.visualViewport?.addEventListener("resize", syncViewport);
    const roots = [
      document.querySelector("main"),
      document.querySelector("footer"),
      document.querySelector(".brand"),
      document.querySelector(".desktop-nav"),
      document.querySelector(".header-language"),
    ].filter(Boolean) as HTMLElement[];
    const wasInert = roots.map((el) => el.inert);
    roots.forEach((el) => {
      el.inert = true;
    });
    const items = () =>
      [
        menuToggleRef.current!,
        ...Array.from(
          menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ??
            [],
        ),
      ].filter((el) => el && !el.hasAttribute("disabled"));
    items()[1]?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const list = items(),
        first = list[0],
        last = list[list.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !list.includes(document.activeElement as HTMLElement))
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !list.includes(document.activeElement as HTMLElement))
      ) {
        event.preventDefault();
        first?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", resize);
    return () => {
      properties.forEach((property, index) => {
        body.style[property] = previous[index];
      });
      const samePage = basePath(window.location.pathname) === savedPath;
      window.scrollTo({
        left: samePage ? savedX : 0,
        top: samePage ? savedY : 0,
        behavior: "instant",
      });
      if (!hadMenuClass) body.classList.remove("menu-open");
      setScrolled(samePage && savedY > 24);
      window.visualViewport?.removeEventListener("resize", syncViewport);
      roots.forEach((el, i) => {
        el.inert = wasInert[i];
      });
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      menuToggleRef.current?.focus({ preventScroll: true });
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
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
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
                            transition={{
                              type: "spring",
                              stiffness: 420,
                              damping: 34,
                            }}
                          />
                        )}
                        <span className="nav-label" lang="en" translate="no">
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
              <div className="header-language">
                <LangToggle />
              </div>
              <button
                ref={menuToggleRef}
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

        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {open && (
                <motion.nav
                  ref={menuRef}
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
                      transition={{
                        duration: 0.55,
                        delay: 0.06 * i + 0.05,
                        ease,
                      }}
                    >
                      <NavLink
                        to={item.to}
                        lang="en"
                        translate="no"
                        end={item.to === "/"}
                        onClick={() => setOpen(false)}
                      >
                        <span className="mobile-index">0{i + 1}</span>
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}
                  <motion.div
                    className="mobile-menu-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <p>
                      digitalapgujeong@gmail.com
                      <br />
                      <a
                        href="https://www.instagram.com/digital_apgujeong"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @digital_apgujeong
                      </a>
                    </p>
                    <LangToggle />
                  </motion.div>
                </motion.nav>
              )}
            </AnimatePresence>,
            document.body,
          )}

        <main id="main-content">
          <AnimatePresence mode="wait" onExitComplete={resetPageScroll}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.25, ease } }}
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
              <a href="mailto:digitalapgujeong@gmail.com">
                digitalapgujeong@gmail.com
              </a>
              <a
                href="https://www.instagram.com/digital_apgujeong"
                target="_blank"
                rel="noopener noreferrer"
              >
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

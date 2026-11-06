import { NavLink, Link, useLocation, useOutlet } from "react-router-dom";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import WebGLBackground from "./WebGLBackground";

const NAV = [
  { to: "/", label: "work" },
  { to: "/beauty", label: "beauty" },
  { to: "/cleanup", label: "cleanup" },
  { to: "/contact", label: "contact" },
];

const META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "work — 디지털 압구정 / diap",
    description:
      "디지털 압구정(diap)의 영상 뷰티 리터칭·오브젝트 클리닝 포트폴리오. 뮤직비디오, 광고, 영화 작업을 확인하세요.",
  },
  "/beauty": {
    title: "beauty — 영상 뷰티 리터칭 | 디지털 압구정",
    description:
      "피부 질감은 살리고 시선을 방해하는 요소만 덜어내는 영상 뷰티 리터칭. 프레임 단위로 자연스럽게 이어지는 보정.",
  },
  "/cleanup": {
    title: "cleanup — 오브젝트 클리닝 | 디지털 압구정",
    description:
      "장비, 로고, 반사, 배경 잡물 등 화면 속 불필요한 요소를 지우고 원래 있던 것처럼 복원하는 오브젝트 클리닝.",
  },
  "/contact": {
    title: "contact — 프로젝트 문의 | 디지털 압구정",
    description:
      "디지털 압구정 프로젝트 문의. 영상 링크, 분량, 희망 납기일을 보내주시면 빠르게 안내드립니다.",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    const meta = META[pathname] ?? META["/"];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", `https://digital-apgujeong.vercel.app${pathname}`);
  }, [pathname]);

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
            <Link to="/" className="brand" aria-label="디지털 압구정 홈">
              <Logo className="brand-logo" />
              <span className="brand-caption">
                digital
                <br />
                apgujeong
              </span>
            </Link>
            <nav className="desktop-nav" aria-label="주 메뉴">
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
            <button
              className="menu-toggle"
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </motion.div>
        </header>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="모바일 메뉴"
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
                010.2892.0328
              </motion.p>
            </motion.nav>
          )}
        </AnimatePresence>

        <main id="main-content">
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease }}
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
                디지털 압구정
                <br />
                beauty & cleanup
              </p>
            </div>
            <div className="footer-col">
              <span className="eyebrow">contact</span>
              <a href="mailto:digitalapgujeong@gmail.com">digitalapgujeong@gmail.com</a>
              <a href="tel:01028920328">010.2892.0328</a>
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

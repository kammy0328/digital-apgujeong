import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    const title =
      pathname === "/"
        ? "영상 뷰티 리터칭 & 오브젝트 클리닝"
        : pathname === "/consultation"
          ? "프로젝트 문의"
          : "스튜디오 소개";
    document.title = `${title} — 디지털 압구정 / DIAP`;
    const description =
      "장면의 본질은 그대로, 완성도는 더 높게. 디지털 압구정은 영상 뷰티 리터칭과 오브젝트 클리닝을 전문으로 하는 포스트 프로덕션 스튜디오입니다.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute(
        "content",
        `https://digital-apgujeong.vercel.app${pathname}`,
      );
  }, [pathname]);
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
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="디지털 압구정 홈">
          diap
          <span className="brand-caption">
            DIGITAL
            <br />
            APGUJEONG
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="주 메뉴">
          <NavLink to="/" end>
            Work
          </NavLink>
          <NavLink to="/about/company">Studio</NavLink>
          <NavLink to="/consultation" className="nav-contact">
            Contact <ArrowUpRight size={17} />
          </NavLink>
        </nav>
        <button
          className="menu-toggle"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="모바일 메뉴"
        >
          <NavLink to="/" onClick={() => setOpen(false)}>
            Work ↗
          </NavLink>
          <NavLink to="/about/company" onClick={() => setOpen(false)}>
            Studio ↗
          </NavLink>
          <NavLink to="/consultation" onClick={() => setOpen(false)}>
            Contact ↗
          </NavLink>
          <p>영상의 마지막 디테일을 만듭니다.</p>
        </nav>
      )}
      <main id="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <span className="eyebrow">PROJECT ENQUIRIES</span>
          <Link to="/consultation" className="footer-title">
            Let’s work
            <br />
            together. <ArrowUpRight />
          </Link>
          <a className="email-link" href="mailto:digitalapgujeong@gmail.com">
            digitalapgujeong@gmail.com <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <Link to="/" className="footer-wordmark">
            diap
          </Link>
          <span>
            디지털 압구정
            <br />
            POST-PRODUCTION / SEOUL
          </span>
          <a href="tel:01058231350">010.5823.1350</a>
          <span>© {new Date().getFullYear()} DIAP</span>
        </div>
      </footer>
    </div>
  );
}

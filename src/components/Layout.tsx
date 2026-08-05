import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);

    // Update document title and meta description per page
    const pageMeta: { [key: string]: { title: string; description: string } } = {
      '/': {
        title: '포트폴리오 | 디지털 압구정 : DIAP',
        description: '디지털 압구정(DIAP)의 뮤직비디오·광고 영상 스킨 리터칭·피부보정 포트폴리오. 티 나지 않는 완벽한 디지털 뷰티 리터칭 작업물을 확인하세요.',
      },
      '/about/company': {
        title: '회사 소개 | 디지털 압구정 — 스킨 리터칭·뷰티 리터칭 스튜디오',
        description: '디지털 압구정의 철학과 연혁, 보유 기술을 소개합니다. 전문 스킨 리터칭 소프트웨어와 숙련된 아티스트로 최고의 피부보정 결과물을 제공합니다.',
      },
      '/about/director': {
        title: '병원장 인사말 | 디지털 압구정',
        description: '디지털 압구정 대표의 인사말과 스킨 리터칭·피부보정 서비스 철학을 확인하세요.',
      },
      '/about/staff': {
        title: '의료진 소개 | 디지털 압구정',
        description: '디지털 압구정의 전문 스킨 리터칭·뷰티 리터칭 아티스트를 소개합니다. 각 분야별 전문가가 최고의 피부보정 결과물을 만들어 드립니다.',
      },
      '/commercial/guidelines': {
        title: '시술 규정 | 디지털 압구정',
        description: '상업 영상 스킨 리터칭·뷰티 리터칭 서비스 규정, 데이터 전달 방법, 수정 횟수 및 파일 사양을 안내합니다.',
      },
      '/consultation': {
        title: '문의 | 디지털 압구정',
        description: '디지털 압구정 스킨 리터칭·피부보정 문의. 전화, 이메일, 카카오톡으로 편리하게 상담받으세요. 평일 10:00~19:00 운영.',
      },
    };

    const meta = pageMeta[location.pathname] || { title: '디지털 압구정', description: '' };
    document.title = meta.title;

    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      (descEl as HTMLMetaElement).name = 'description';
      document.head.appendChild(descEl);
    }
    (descEl as HTMLMetaElement).content = meta.description;

    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) (ogTitleEl as HTMLMetaElement).content = meta.title;
    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) (ogDescEl as HTMLMetaElement).content = meta.description;
    let ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) (ogUrlEl as HTMLMetaElement).content = `https://digital-apgujeong.com${location.pathname}`;
  }, [location.pathname]);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 7000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 's' || e.key === 'u')) ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLVideoElement) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-paper bg-ink">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 text-paper bg-ink/95 backdrop-blur-md border-b border-neutral-800 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-baseline gap-2 font-logo tracking-widest font-bold">
            <span className="text-2xl">디지털 압구정</span>
            <span className="text-xs font-sans font-light tracking-[0.15em] text-neutral-400">: DIAP</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10 text-sm tracking-widest font-medium">
            <Link to="/" className="hover:opacity-70 transition-opacity py-2">포트폴리오</Link>

            <div className="relative group">
              <button
                onClick={() => toggleDropdown('about')}
                className="flex items-center space-x-1 hover:opacity-70 transition-opacity py-2"
              >
                <span>ABOUT</span>
                <ChevronDown size={14} />
              </button>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${activeDropdown === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="bg-neutral-950 text-paper shadow-xl shadow-black/50 border border-neutral-800 py-2 min-w-[160px] flex flex-col text-center">
                  <Link to="/about/company" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-900 transition-colors">회사 소개</Link>
                  <Link to="/about/director" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-900 transition-colors">병원장 인사말</Link>
                  <Link to="/about/staff" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-900 transition-colors">의료진 소개</Link>
                </div>
              </div>
            </div>

            <Link to="/commercial/guidelines" className="hover:opacity-70 transition-opacity py-2">시술 규정</Link>
            <Link to="/consultation" className="hover:opacity-70 transition-opacity py-2">문의</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ink pt-24 px-6 md:hidden flex flex-col space-y-6 text-xl text-paper overflow-y-auto pb-12"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6">
                <X size={24} />
              </button>
            </div>
            <Link to="/" className="border-b border-neutral-800 pb-4">포트폴리오</Link>

            <div className="flex flex-col space-y-4">
              <div className="text-sm text-neutral-500 tracking-widest mb-2 font-sans">ABOUT</div>
              <Link to="/about/company" className="pl-4 border-l border-neutral-800">회사 소개</Link>
              <Link to="/about/director" className="pl-4 border-l border-neutral-800">병원장 인사말</Link>
              <Link to="/about/staff" className="pl-4 border-l border-neutral-800">의료진 소개</Link>
            </div>

            <Link to="/commercial/guidelines" className="border-b border-neutral-800 pb-4">시술 규정</Link>
            <Link to="/consultation" className="border-b border-neutral-800 pb-4">문의</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Floating KakaoTalk Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-4">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-neutral-900 text-paper px-4 py-2 rounded-xl shadow-lg shadow-black/50 text-xs font-medium border border-neutral-700 relative mb-2 cursor-pointer"
              onClick={() => setShowTooltip(false)}
            >
              실시간 상담이 가능합니다
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-neutral-900 border-r border-b border-neutral-700 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.a
          href="https://pf.kakao.com/_xxxx" // Replace with actual Kakao channel link
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTooltip(false)}
          className="bg-[#FEE500] text-[#191919] p-3 md:p-4 rounded-full shadow-xl flex items-center justify-center border border-ink/5"
        >
          <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054l-1.085 3.98c-.06.22.2.4.38.27l4.703-3.112c.24.02.48.03.732.03 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
            </svg>
          </div>
        </motion.a>
      </div>

      <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 py-16 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-paper text-2xl font-logo tracking-widest mb-6">
              디지털 압구정
            </h2>
            <p className="mb-2 font-light">디지털 뷰티 리터칭 전문 스튜디오</p>
            <p className="font-light leading-relaxed">완벽함을 넘어선 자연스러움,<br/>당신의 가장 아름다운 장면을 완성합니다.</p>
          </div>
          <div className="md:text-right font-light">
            <p className="mb-2 text-paper tracking-widest text-xs">CONTACT US</p>
            <p className="mb-2">T. 010-5823-1350</p>
            <p className="mb-4">E. <a href="mailto:digitalapgujeong@gmail.com" className="hover:text-paper transition-colors">digitalapgujeong@gmail.com</a></p>
            <p>KakaoTalk. <a href="https://pf.kakao.com/_xxxx" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors">@디지털압구정</a></p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-900 text-center text-xs font-light tracking-widest">
          &copy; {new Date().getFullYear()} DIGITAL APGUJEONG. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}

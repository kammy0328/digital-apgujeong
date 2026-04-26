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
        title: '디지털 압구정 | 영상 스킨 리터칭·피부보정 전문 스튜디오',
        description: '뮤직비디오·광고·웨딩 영상 스킨 리터칭, 피부보정, 뷰티 리터칭 전문. 티 나지 않는 완벽한 디지털 뷰티 리터칭 스튜디오.',
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
      '/commercial/procedures': {
        title: '상업 영상 스킨 리터칭 안내 | 디지털 압구정',
        description: '광고, 뮤직비디오, 드라마, 영화 등 상업 영상 스킨 리터칭·피부보정 서비스 안내. 가격표, 작업 프로세스, 납기 일정을 확인하세요.',
      },
      '/commercial/guidelines': {
        title: '리터칭 규정 | 디지털 압구정',
        description: '상업 영상 스킨 리터칭·뷰티 리터칭 서비스 규정, 데이터 전달 방법, 수정 횟수 및 파일 사양을 안내합니다.',
      },
      '/commercial/reviews': {
        title: '상업 영상 스킨 리터칭 후기 | 디지털 압구정',
        description: '디지털 압구정의 상업 영상 스킨 리터칭·피부보정 포트폴리오. 뮤직비디오, 광고 등 실제 뷰티 리터칭 결과물을 확인하세요.',
      },
      '/wedding/procedures': {
        title: '웨딩 영상 피부보정·스킨 리터칭 안내 | 디지털 압구정',
        description: '웨딩 영상 피부보정·스킨 리터칭 패키지 안내. 기본 보정부터 프리미엄 뷰티 리터칭까지, 소중한 순간을 더욱 아름답게.',
      },
      '/wedding/reviews': {
        title: '웨딩 피부보정 후기 | 디지털 압구정',
        description: '디지털 압구정 웨딩 영상 피부보정·스킨 리터칭 고객 후기. 실제 신랑신부들의 생생한 뷰티 리터칭 리뷰를 확인하세요.',
      },
      '/event': {
        title: '스킨 리터칭·피부보정 이벤트 | 디지털 압구정',
        description: '디지털 압구정 스킨 리터칭·뷰티 리터칭 특별 할인 이벤트. 한정 기간 특가 혜택을 지금 확인하세요.',
      },
      '/consultation': {
        title: '스킨 리터칭·피부보정 상담 문의 | 디지털 압구정',
        description: '디지털 압구정 스킨 리터칭·피부보정 상담 문의. 전화, 이메일, 카카오톡으로 편리하게 상담받으세요. 평일 10:00~19:00 운영.',
      },
      '/careers': {
        title: '인재 채용 | 디지털 압구정',
        description: '디지털 압구정 채용 공고. 영상 스킨 리터칭·피부보정 전문가를 모집합니다. 지원 자격 및 방법을 확인하세요.',
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

  const isHome = location.pathname === '/';

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
    <div className="min-h-screen flex flex-col font-sans text-neutral-900 bg-neutral-50">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 py-4 text-neutral-900' : 'bg-transparent py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif tracking-widest font-bold">
            디지털 압구정
          </Link>
 
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10 text-sm tracking-widest font-medium">
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('about')}
                className="flex items-center space-x-1 hover:opacity-70 transition-opacity py-2"
              >
                <span>ABOUT</span>
                <ChevronDown size={14} />
              </button>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${activeDropdown === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="bg-white text-neutral-900 shadow-xl border border-neutral-100 py-2 min-w-[160px] flex flex-col text-center">
                  <Link to="/about/company" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">회사 소개</Link>
                  <Link to="/about/director" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">병원장 인사말</Link>
                  <Link to="/about/staff" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">의료진 소개</Link>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('commercial')}
                className="flex items-center space-x-1 hover:opacity-70 transition-opacity py-2"
              >
                <span>상업 영상</span>
                <ChevronDown size={14} />
              </button>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${activeDropdown === 'commercial' ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="bg-white text-neutral-900 shadow-xl border border-neutral-100 py-2 min-w-[160px] flex flex-col text-center">
                  <Link to="/commercial/procedures" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">시술 안내</Link>
                  <Link to="/commercial/guidelines" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">시술 규정</Link>
                  <Link to="/commercial/reviews" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">후기</Link>
                </div>
              </div>
            </div>
 
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('wedding')}
                className="flex items-center space-x-1 hover:opacity-70 transition-opacity py-2"
              >
                <span>웨딩</span>
                <ChevronDown size={14} />
              </button>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${activeDropdown === 'wedding' ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="bg-white text-neutral-900 shadow-xl border border-neutral-100 py-2 min-w-[160px] flex flex-col text-center">
                  <Link to="/wedding/procedures" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">시술 안내</Link>
                  <Link to="/wedding/reviews" onClick={() => setActiveDropdown(null)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">후기</Link>
                </div>
              </div>
            </div>
            
            <Link to="/event" className="hover:opacity-70 transition-opacity py-2">EVENT</Link>
            <Link to="/consultation" className="hover:opacity-70 transition-opacity py-2">상담 안내</Link>
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
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col space-y-6 text-xl font-serif text-neutral-900 overflow-y-auto pb-12"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="text-sm text-neutral-400 tracking-widest mb-2 font-sans">ABOUT</div>
              <Link to="/about/company" className="pl-4 border-l border-neutral-200">회사 소개</Link>
              <Link to="/about/director" className="pl-4 border-l border-neutral-200">병원장 인사말</Link>
              <Link to="/about/staff" className="pl-4 border-l border-neutral-200">의료진 소개</Link>
            </div>
            
            <div className="flex flex-col space-y-4 border-b border-neutral-100 pb-4">
              <div className="text-sm text-neutral-400 tracking-widest font-sans">상업 영상</div>
              <Link to="/commercial/procedures" className="pl-4 border-l border-neutral-200">시술 안내</Link>
              <Link to="/commercial/guidelines" className="pl-4 border-l border-neutral-200">시술 규정</Link>
              <Link to="/commercial/reviews" className="pl-4 border-l border-neutral-200">후기</Link>
            </div>
 
            <div className="flex flex-col space-y-4 border-b border-neutral-100 pb-4">
              <div className="text-sm text-neutral-400 tracking-widest font-sans">웨딩</div>
              <Link to="/wedding/procedures" className="pl-4 border-l border-neutral-200">시술 안내</Link>
              <Link to="/wedding/reviews" className="pl-4 border-l border-neutral-200">후기</Link>
            </div>
            
            <Link to="/event" className="border-b border-neutral-100 pb-4">EVENT</Link>
            <Link to="/consultation" className="border-b border-neutral-100 pb-4">상담 안내</Link>
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
              className="bg-white text-neutral-800 px-4 py-2 rounded-xl shadow-lg text-xs font-medium border border-neutral-100 relative mb-2 cursor-pointer"
              onClick={() => setShowTooltip(false)}
            >
              실시간 상담이 가능합니다
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-neutral-100 rotate-45" />
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
          className="bg-[#FEE500] text-[#191919] p-3 md:p-4 rounded-full shadow-xl flex items-center justify-center border border-black/5"
        >
          <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054l-1.085 3.98c-.06.22.2.4.38.27l4.703-3.112c.24.02.48.03.732.03 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
            </svg>
          </div>
        </motion.a>
      </div>

      <footer className="bg-neutral-900 text-neutral-400 py-16 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-white text-2xl font-serif tracking-widest mb-6">
              디지털 압구정
            </h2>
            <p className="mb-2 font-light">디지털 뷰티 리터칭 전문 스튜디오</p>
            <p className="font-light leading-relaxed">완벽함을 넘어선 자연스러움,<br/>당신의 가장 아름다운 장면을 완성합니다.</p>
          </div>
          <div className="md:text-right font-light">
            <p className="mb-2 text-white tracking-widest text-xs">CONTACT US</p>
            <p className="mb-2">T. 010-5823-1350</p>
            <p className="mb-4">E. <a href="mailto:digitalapgujeong@gmail.com" className="hover:text-white transition-colors">digitalapgujeong@gmail.com</a></p>
            <p className="mb-4">KakaoTalk. <a href="https://pf.kakao.com/_xxxx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@디지털압구정</a></p>
            <Link to="/careers" className="inline-block mt-2 text-neutral-400 hover:text-white transition-colors border-b border-neutral-600 hover:border-white pb-0.5">
              인재 채용
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-800 text-center text-xs font-light tracking-widest">
          &copy; {new Date().getFullYear()} DIGITAL APGUJEONG. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}

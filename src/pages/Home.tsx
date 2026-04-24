import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900">
          <div className="absolute inset-0 z-0">
            <iframe
              className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50"
              src="https://www.youtube.com/embed/RxFkGHPyJj8?autoplay=1&mute=1&loop=1&playlist=RxFkGHPyJj8&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="relative z-10 text-center text-white px-6 mt-16">
          <motion.p 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.3em] mb-6 font-light text-neutral-300"
          >
            DIAP &bull; DIGITAL BEAUTY RETOUCHING
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight mb-8 leading-tight break-keep"
          >
            완벽한 피부, 완성된 영상<br/>디지털로 조각하다.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm sm:text-lg md:text-xl font-light tracking-wide mb-12 text-neutral-200 break-keep whitespace-nowrap sm:whitespace-normal"
          >
            프리미엄 영상 뷰티 리터칭 전문, 디지털 압구정 DIAP
          </motion.p>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/commercial/procedures" 
              className="inline-flex items-center justify-center space-x-3 border border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 hover:bg-white hover:text-neutral-900 transition-all duration-500 tracking-widest text-sm w-full sm:w-auto"
            >
              <span>상업 영상</span>
              <ArrowRight size={16} />
            </Link>
            <Link 
              to="/wedding/procedures" 
              className="inline-flex items-center justify-center space-x-3 border border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 hover:bg-white hover:text-neutral-900 transition-all duration-500 tracking-widest text-sm w-full sm:w-auto"
            >
              <span>웨딩 / 퍼스널</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div 
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: [0, 15, 0] }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 0.5 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-[11px] tracking-[0.4em] text-white font-medium mb-3 uppercase drop-shadow-md">Scroll</span>
              <div className="w-0.5 h-8 sm:h-14 bg-gradient-to-b from-white via-white to-transparent shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Before & After Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4 break-keep">BEFORE & AFTER</h2>
            <p className="text-neutral-500 font-light tracking-wide break-keep">디지털 압구정만의 섬세한 터치로 완성된 변화를 확인하세요.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-5xl mx-auto"
          >
            <BeforeAfterSlider
              beforeImage="https://placehold.co/1920x1080?text=준비+중+(원본)"
              afterImage="https://placehold.co/1920x1080?text=준비+중+(리터칭)"
            />
            <div className="mt-12 text-center">
              <p className="text-neutral-600 mb-8 font-light">피부결 정돈, 모공 및 잡티 제거, 미세 윤곽 교정</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Brief - Redesigned for dual targeting */}
      <section className="py-32 bg-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-[0.3em] text-neutral-400 mb-4 uppercase">Our Expertise</p>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 break-keep">하이엔드 리터칭, 모든 영상의 기준이 되다</h2>
            <p className="text-neutral-500 font-light max-w-2xl mx-auto break-keep">
              영상 제작의 최상위 솔루션을 통해 상업 영상의 완성도를 높이고,
              개인의 소중한 순간을 영원히 아름답게 기록합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Commercial Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              className="bg-white p-10 md:p-16 border border-neutral-100 shadow-sm flex flex-col h-full"
            >
              <div className="mb-12">
                <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase block mb-4">For Professional</span>
                <h3 className="text-2xl md:text-3xl font-serif mb-6">상업 영상 솔루션</h3>
                <p className="text-neutral-600 font-light leading-relaxed mb-8 break-keep">
                  광고, 뮤직비디오, 드라마, 영화 등 고도의 정밀함이 요구되는 프로페셔널 프로젝트를 위한 최상의 리터칭 서비스를 제공합니다.
                  Nuke 및 After Effects 기반의 하이엔드 파이프라인으로 압도적인 퀄리티를 보장합니다.
                </p>
                <ul className="space-y-4 mb-12">
                  {['광고 및 브랜드 필름', '뮤직비디오 아티스트 리터칭', '드라마/영화 캐릭터 룩 구현', '프레임 단위 정밀 트래킹'].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                      className="flex items-center text-sm text-neutral-500"
                    >
                      <span className="w-1 h-1 bg-neutral-900 rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <Link to="/commercial/procedures" className="mt-auto inline-flex items-center space-x-3 text-sm font-medium tracking-widest border-b border-neutral-900 pb-1 w-fit hover:text-neutral-500 hover:border-neutral-500 transition-all group">
                <span>상업 영상 서비스 보기</span>
                <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>

            {/* Personal Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              className="bg-neutral-50 text-neutral-900 p-10 md:p-16 border border-neutral-200 flex flex-col h-full"
            >
              <div className="mb-12">
                <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase block mb-4">For Individual</span>
                <h3 className="text-2xl md:text-3xl font-serif mb-6">퍼스널 메모리 케어</h3>
                <p className="text-neutral-600 font-light leading-relaxed mb-8 break-keep">
                  웨딩, 프로필, 브이로그 등 일상의 소중한 기록들을 화보처럼 아름답게 다듬어 드립니다.
                  사진을 보정하듯 영상 속 내 모습도 가장 예쁘고 자연스럽게 간직하세요.
                </p>
                <ul className="space-y-4 mb-12">
                  {['웨딩 시네마 뷰티 리터칭', '개인 프로필 및 인터뷰 영상', '유튜브 및 SNS 콘텐츠 최적화', '자연스러운 체형 및 피부 보정'].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex items-center text-sm text-neutral-500"
                    >
                      <span className="w-1 h-1 bg-neutral-900 rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <Link to="/wedding/procedures" className="mt-auto inline-flex items-center space-x-3 text-sm font-medium tracking-widest border-b border-neutral-900 pb-1 w-fit hover:text-neutral-500 hover:border-neutral-500 transition-all group">
                <span>웨딩/퍼스널 서비스 보기</span>
                <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img src="https://placehold.co/1200x1500?text=DIAP+Technology" alt="Technology" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute -bottom-10 -right-10 bg-neutral-900 text-white p-12 hidden md:block max-w-xs">
                <p className="text-2xl font-serif mb-4 whitespace-nowrap">"티 나지 않는 완벽함"</p>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  우리는 기술을 자랑하지 않습니다. 결과물에 녹아든 자연스러움이 우리의 자부심입니다.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="lg:pl-10"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-10 leading-tight break-keep">압도적인 기술력이 만드는<br/>가장 자연스러운 아름다움</h2>
              <div className="space-y-12">
                {[
                  {
                    title: '전문가용 하이엔드 솔루션',
                    desc: '영화나 광고 제작에 쓰이는 전문가용 소프트웨어를 사용하여, 어색한 어플 필터가 아닌 진짜 내 피부처럼 자연스럽고 완벽한 보정 결과를 만들어냅니다.',
                  },
                  {
                    title: '한 장면 한 장면 꼼꼼하게',
                    desc: '영상이 재생되는 내내 보정이 풀리거나 어색해지지 않도록, 전문가가 직접 한 장면씩 꼼꼼하게 확인하고 다듬어 드립니다.',
                  },
                  {
                    title: '철저한 프라이버시 보호',
                    desc: '고객님의 소중한 영상은 철저한 보안 속에 관리되며, 작업이 끝난 후에는 안전하게 폐기되니 안심하고 맡겨주세요.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <span className="w-8 h-[1px] bg-neutral-900 mr-4 flex-shrink-0"></span>
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 font-light leading-relaxed break-keep">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="py-24 bg-neutral-900 text-white text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm tracking-[0.3em] text-neutral-400 mb-6 uppercase"
        >
          Ready to start?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl font-serif mb-10 break-keep"
        >
          지금 바로 문의하세요
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/consultation"
            className="inline-flex items-center space-x-3 border border-white/40 px-10 py-4 text-sm tracking-widest hover:bg-white hover:text-neutral-900 transition-all duration-500"
          >
            <span>견적 문의하기</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

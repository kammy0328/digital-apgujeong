import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Layers, Monitor, PlayCircle, ArrowRight } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const services = [
  {
    category: "기본 뷰티 리터칭",
    billing: "영상 전체 길이 기준 견적",
    price: "2,000,000원 ~",
    priceNote: "(프로젝트 난이도에 따라 협의)",
    description: "영상의 전반적인 퀄리티를 높이는 필수적인 피부 보정 작업입니다. 자연스럽고 깨끗한 인상을 완성합니다.",
    items: [
      "눈에 띄는 모공 및 요철 완화",
      "여드름, 흉터, 기미 등 잡티 제거",
      "다크서클 및 잔주름 완화",
      "전체적인 피부결 매끄럽게 정돈",
      "원본 영상의 질감을 살리는 리터칭"
    ]
  },
  {
    category: "Lite 패키지",
    billing: "숏폼/티저 전용",
    price: "300,000원 ~",
    priceNote: "(러닝타임 1분 이내, 세로형 또는 가로형)",
    description: "숏폼 콘텐츠 및 티저 영상에 최적화된 컴팩트한 리터칭 패키지입니다.",
    items: [
      "기본 뷰티 리터칭 포함",
      "빠른 턴어라운드 타임",
      "숏폼 콘텐츠에 최적화된 임팩트 있는 룩 앤 필 적용"
    ]
  },
  {
    category: "부분 보정 및 정밀 교정",
    billing: "1컷 당 비용 견적",
    price: "50,000원 ~ / 1컷",
    priceNote: "(난이도 및 길이에 따라 차등, 최소 청구 금액 200,000원~)",
    description: "프레임 단위의 트래킹 기술이 요구되는 고난이도 디지털 성형 시술입니다. 원하는 부위를 선택하여 집중적으로 진행합니다.",
    items: [
      "안면 윤곽: V라인 턱선 교정, 광대 축소, 비대칭 개선",
      "이목구비: 눈 크기 확대, 코끝 교정, 입술 볼륨 추가",
      "바디 라인: 허리 라인 슬림화, 골반 볼륨업",
      "비율 교정: 다리 길이 연장, 승모근 축소, 직각 어깨 연출",
      "헤어 라인: 빈 곳 채움, 잔머리 정리, 볼륨 추가"
    ]
  }
];

const workflow = [
  { step: "01", title: "상담 및 영상 전달", desc: "프로젝트의 성격과 보정 범위를 상담하고 원본 영상을 전달받습니다." },
  { step: "02", title: "테스트 컷 진행", desc: "주요 컷에 대한 샘플 보정을 진행하여 작업 방향성을 확정합니다." },
  { step: "03", title: "본 작업 진행", desc: "확정된 가이드에 따라 전 프레임 정밀 리터칭 및 트래킹 작업을 수행합니다." },
  { step: "04", title: "시사 및 수정", desc: "완성된 가편집본을 확인하고 세부 사항을 수정 보완합니다." },
  { step: "05", title: "최종 납품", desc: "마스터링 포맷에 맞춰 최종 결과물을 안전하게 전달합니다." }
];

export default function CommercialProcedures() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-white min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">상업 영상 시술 안내</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm uppercase">Commercial Video Procedures & Services</p>
        </div>

        {/* Before & After Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif mb-6 break-keep leading-tight">광고, 뮤직비디오, 드라마, 영화<br/>정밀 리터칭</h2>
              <div className="text-neutral-500 font-light leading-relaxed mb-8 break-keep">
                <p className="mb-4">
                  단순한 필터 효과가 아닙니다. 프레임 단위의 정밀한 트래킹과 마스킹 기술을 통해, 피사체의 움직임에 완벽하게 대응하는 하이엔드 리터칭을 제공합니다.
                </p>
                <p>
                  TV 광고, 아이돌 뮤직비디오, 드라마 및 영화 등 최상급 퀄리티가 요구되는 프로젝트를 전문으로 합니다.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-neutral-800">
                  <ShieldCheck className="w-5 h-5 text-neutral-400" />
                  <span className="text-sm font-medium break-keep">프레임 단위 정밀 작업</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-800">
                  <Zap className="w-5 h-5 text-neutral-400" />
                  <span className="text-sm font-medium break-keep">실시간 피드백 및 빠른 대응</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-800">
                  <Layers className="w-5 h-5 text-neutral-400" />
                  <span className="text-sm font-medium break-keep">주말 작업 대응 및 긴급 작업 대응</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <BeforeAfterSlider 
                beforeImage="https://placehold.co/1920x1080?text=준비+중+(원본)" 
                afterImage="https://placehold.co/1920x1080?text=준비+중+(리터칭)"
                beforeLabel="원본 영상"
                afterLabel="리터칭 후"
              />
            </div>
          </div>
        </motion.div>

        {/* Long Project Highlight Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 bg-neutral-50 border-l-4 border-neutral-900 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-serif mb-4">드라마 및 영화 프로젝트 안내</h3>
            <p className="text-neutral-600 font-light leading-relaxed break-keep">
              드라마나 영화와 같이 분량이 길고 컷 수가 많은 프로젝트는 일반적인 상업 영상과 다른 견적 체계가 적용됩니다. 
              작업 범위와 일정에 따라 최적화된 상세 견적 산정이 가능하오니 별도로 문의해 주시기 바랍니다.
            </p>
          </div>
          <Link 
            to="/consultation" 
            className="flex-shrink-0 bg-neutral-900 text-white px-8 py-4 text-sm tracking-widest hover:bg-neutral-800 transition-colors"
          >
            상세 견적 문의하기
          </Link>
        </motion.div>

        {/* Regular Contract Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32 bg-neutral-50 border-l-4 border-neutral-400 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-serif mb-4">정기 콘텐츠 월 계약 안내</h3>
            <div className="text-neutral-600 font-light leading-relaxed break-keep">
              <p className="mb-2">유튜브 정기 콘텐츠, 자체 예능 등 뷰티 리터칭이 꾸준히 필요한 프로젝트의 경우,</p>
              <p>월 단위 계약을 통해 할인된 견적을 적용받으실 수 있습니다.</p>
            </div>
          </div>
          <Link 
            to="/consultation" 
            className="flex-shrink-0 bg-white border border-neutral-300 text-neutral-900 px-8 py-4 text-sm tracking-widest hover:bg-neutral-100 transition-colors"
          >
            월 계약 문의하기
          </Link>
        </motion.div>

        {/* Service Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          {services.map((service, index) => (
            <div key={index} className="bg-neutral-50 p-10 hover:shadow-md transition-shadow duration-300 border border-neutral-100 flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-serif mb-3">{service.category}</h2>
                <span className="inline-block bg-white border border-neutral-200 text-neutral-600 px-3 py-1 text-[10px] tracking-widest mb-6 uppercase">
                  {service.billing}
                </span>
                <div className="mb-6">
                  <p className="text-2xl font-bold text-neutral-900 mb-1">{service.price}</p>
                  <p className="text-xs text-neutral-500 font-light">{service.priceNote}</p>
                </div>
                <p className="text-sm text-neutral-500 font-light leading-relaxed break-keep">
                  {service.description}
                </p>
              </div>
              
              <ul className="space-y-4 border-t border-neutral-200 pt-6 mt-auto">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start text-neutral-700 font-light text-sm">
                    <span className="text-neutral-400 mr-3 font-serif italic">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Work Periods */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32 grid md:grid-cols-3 gap-8"
        >
          <div className="p-8 border border-neutral-100 bg-neutral-50 text-center">
            <h4 className="text-sm font-bold tracking-[0.2em] mb-4 text-neutral-400 uppercase">Music Video</h4>
            <p className="text-xl font-serif mb-2">평균 5일</p>
            <p className="text-xs text-neutral-500 font-light">영업일 기준</p>
          </div>
          <div className="p-8 border border-neutral-100 bg-neutral-50 text-center">
            <h4 className="text-sm font-bold tracking-[0.2em] mb-4 text-neutral-400 uppercase">Commercial</h4>
            <p className="text-xl font-serif mb-2">평균 3일</p>
            <p className="text-xs text-neutral-500 font-light">영업일 기준</p>
          </div>
          <div className="p-8 border border-neutral-100 bg-neutral-50 text-center">
            <h4 className="text-sm font-bold tracking-[0.2em] mb-4 text-neutral-400 uppercase">Film & Drama</h4>
            <p className="text-xl font-serif mb-2">별도 협의</p>
            <p className="text-xs text-neutral-500 font-light">프로젝트 규모에 따라 상이</p>
          </div>
        </motion.div>

        {/* Workflow Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">작업 프로세스 및 결과 확인</h2>
            <p className="text-neutral-500 font-light tracking-widest text-xs uppercase">Process & Results</p>
          </div>
          
          {/* Vimeo Video Section */}
          <div className="mb-20 aspect-video bg-neutral-100 relative group overflow-hidden">
            <iframe 
              src="https://player.vimeo.com/video/100000000?h=0000000000&title=0&byline=0&portrait=0" 
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflow.map((item, i) => (
              <div key={i} className="relative p-8 border border-neutral-100 bg-white group hover:border-neutral-900 transition-all duration-300">
                <span className="block text-4xl font-serif text-neutral-100 group-hover:text-neutral-200 transition-colors mb-6">{item.step}</span>
                <h4 className="text-lg font-bold mb-4 group-hover:text-neutral-900 transition-colors">{item.title}</h4>
                <p className="text-sm text-neutral-500 font-light leading-relaxed break-keep">
                  {item.desc}
                </p>
                {i < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                    <ArrowRight className="text-neutral-200 w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technical Specs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          <div className="p-10 border border-neutral-200 text-center">
            <Monitor className="w-8 h-8 mx-auto mb-6 text-neutral-400" strokeWidth={1} />
            <h4 className="text-lg font-bold mb-4">포스트 프로덕션 연계</h4>
            <p className="text-sm text-neutral-500 font-light break-keep">국내외 유수의 포스트 프로덕션과의 협업 경험을 바탕으로 원활한 워크플로우를 제공합니다.</p>
          </div>
          <div className="p-10 border border-neutral-200 text-center">
            <PlayCircle className="w-8 h-8 mx-auto mb-6 text-neutral-400" strokeWidth={1} />
            <h4 className="text-lg font-bold mb-4">색손실 없는 작업</h4>
            <p className="text-sm text-neutral-500 font-light break-keep">원본의 색상과 계조를 완벽하게 보존하며 리터칭을 진행하여 마스터링 퀄리티를 보장합니다.</p>
          </div>
          <div className="p-10 border border-neutral-900 bg-neutral-50 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-neutral-900 text-white text-[10px] px-3 py-1 tracking-widest uppercase">Special</div>
            <Zap className="w-8 h-8 mx-auto mb-6 text-neutral-900" strokeWidth={1} />
            <h4 className="text-lg font-bold mb-4">긴급 및 주말 작업 대응</h4>
            <p className="text-sm text-neutral-800 font-medium mb-2 break-keep">온에어 일정이 촉박한 프로젝트를 위한 익스프레스 서비스</p>
            <p className="text-xs text-neutral-500 font-light italic break-keep">* 긴급/주말 작업 시 추가 비용이 발생할 수 있습니다.</p>
          </div>
        </motion.div>

        {/* Project Types & Confidentiality */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 mb-32"
        >
          <div className="border border-neutral-200 bg-neutral-50 p-12">
            <h3 className="text-2xl font-serif mb-8 text-neutral-900">주요 작업 영역</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex flex-col">
                <span className="text-neutral-400 text-[10px] tracking-[0.2em] mb-1 uppercase">Advertising</span>
                <p className="font-medium text-neutral-800 whitespace-nowrap">광고 / 디지털 캠페인</p>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-400 text-[10px] tracking-[0.2em] mb-1 uppercase">Music</span>
                <p className="font-medium text-neutral-800 whitespace-nowrap">뮤직비디오 / 티저 / 라이브 클립</p>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-400 text-[10px] tracking-[0.2em] mb-1 uppercase">Drama & Film</span>
                <p className="font-medium text-neutral-800 whitespace-nowrap">드라마 시리즈 / 장편 및 독립 영화</p>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-400 text-[10px] tracking-[0.2em] mb-1 uppercase">Contents</span>
                <p className="font-medium text-neutral-800 whitespace-nowrap">아이돌 자체 컨텐츠 / 브이로그</p>
              </div>
            </div>
          </div>
          <div className="border border-neutral-200 p-12 flex flex-col justify-center">
            <ShieldCheck className="w-10 h-10 text-neutral-800 mb-6" strokeWidth={1} />
            <h3 className="text-2xl font-serif mb-4">보안 및 기밀 유지</h3>
            <p className="text-neutral-500 font-light leading-relaxed break-keep">
              상업 영상의 특성상 온에어 전 보안 유지는 필수입니다. 디지털 압구정은 모든 프로젝트에 대해 엄격한 NDA(비밀유지계약)를 준수하며, 독립된 로컬 서버 망을 통해 데이터를 안전하게 관리합니다.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-900 text-white p-16 text-center"
        >
          <h3 className="text-2xl font-serif mb-6">맞춤형 견적 상담</h3>
          <p className="text-neutral-300 font-light mb-10 leading-relaxed break-keep">
            영상의 해상도, 길이, 피사체의 움직임 정도에 따라 정확한 견적이 달라질 수 있습니다.<br className="hidden md:block" />
            샘플 영상과 함께 문의해주시면 상세히 안내해 드립니다.
          </p>
          <Link to="/consultation" className="inline-block border border-white px-10 py-4 text-sm tracking-widest hover:bg-white hover:text-neutral-900 transition-colors">
            상담 페이지로 이동
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

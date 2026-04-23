import { motion } from 'motion/react';
import { Calendar, Info } from 'lucide-react';

export default function Event() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-white min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 break-keep">EVENT</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">DIAP PROMOTIONS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MV Event Card */}
          <div className="border border-neutral-200 p-8 flex flex-col h-full hover:border-neutral-400 transition-colors duration-300">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-medium tracking-wider mb-4">
                첫 방문 이벤트
              </span>
              <h3 className="text-2xl font-serif mb-2">MV (뮤직비디오)</h3>
              <p className="text-neutral-500 text-sm">기본 뷰티 리터칭 패키지</p>
            </div>
            
            {/* Benefits Section */}
            <div className="flex-grow">
              <ul className="space-y-4 text-neutral-600 font-light text-sm break-keep">
                <li className="flex items-start">
                  <span className="mr-2 text-neutral-300">•</span>
                  <span>MV 1편 당 기본 뷰티 리터칭</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-neutral-300">•</span>
                  <span>정밀 윤곽 및 체형 교정 및 클리닝 <strong>5컷 포함</strong></span>
                </li>
              </ul>
            </div>

            {/* Footer Section */}
            <div className="mt-12 pt-8 border-t border-neutral-100">
              {/* Price Block - Fixed Height for Alignment */}
              <div className="h-[72px] mb-8 flex flex-col justify-between">
                <span className="block text-neutral-400 text-[10px] tracking-widest uppercase">Event Price</span>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-serif text-neutral-900">2,000,000</span>
                    <span className="text-neutral-500 ml-1.5 text-xs">KRW</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-light">부가세 별도</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Deadline Row */}
                <div className="flex items-center justify-between text-neutral-400 text-[11px] h-5">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2" />
                    <span>기한</span>
                  </div>
                  <span className="text-neutral-500">~ 2026년 8월까지</span>
                </div>
                {/* Info Box */}
                <div className="flex items-start text-neutral-400 text-[11px] bg-neutral-50 p-4 rounded-sm break-keep leading-relaxed h-[84px] overflow-hidden">
                  <Info className="w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    단, 정밀 윤곽 및 체형 교정 및 클리닝은 컷의 길이나 복잡도에 따라서 달라질 수 있습니다.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Event Card */}
          <div className="border border-neutral-200 p-8 flex flex-col h-full hover:border-neutral-400 transition-colors duration-300">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-medium tracking-wider mb-4">
                첫 방문 이벤트
              </span>
              <h3 className="text-2xl font-serif mb-2">웨딩 영상</h3>
              <p className="text-neutral-500 text-sm">웨딩 뷰티 리터칭</p>
            </div>
            
            {/* Benefits Section */}
            <div className="flex-grow">
              <ul className="space-y-4 text-neutral-600 font-light text-sm break-keep">
                <li className="flex items-start">
                  <span className="mr-2 text-neutral-300">•</span>
                  <span>웨딩 영상 1편 당 뷰티 리터칭 작업</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-neutral-300">•</span>
                  <span>피부 보정 및 잡티 제거</span>
                </li>
              </ul>
            </div>

            {/* Footer Section */}
            <div className="mt-12 pt-8 border-t border-neutral-100">
              {/* Price Block - Fixed Height for Alignment */}
              <div className="h-[72px] mb-8 flex flex-col justify-between">
                <span className="block text-neutral-400 text-[10px] tracking-widest uppercase">Event Price</span>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-serif text-neutral-900">190,000</span>
                    <span className="text-neutral-500 ml-1.5 text-xs">KRW</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-light">부가세 별도</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Deadline Row */}
                <div className="flex items-center justify-between text-neutral-400 text-[11px] h-5">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2" />
                    <span>기한</span>
                  </div>
                  <span className="text-neutral-500">~ 2026년 8월까지</span>
                </div>
                {/* Info Box */}
                <div className="flex items-start text-neutral-400 text-[11px] bg-neutral-50 p-4 rounded-sm break-keep leading-relaxed h-[84px] overflow-hidden">
                  <Info className="w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    체형 보정 등은 추가 비용이 발생할 수 있습니다.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Event Card */}
          <div className="border border-neutral-200 p-8 flex flex-col h-full hover:border-neutral-400 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-neutral-900 text-white text-[10px] px-3 py-1 tracking-widest uppercase font-bold">Special</div>
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-medium tracking-wider mb-4">
                지인 소개 이벤트
              </span>
              <h3 className="text-2xl font-serif mb-2">소개 이벤트</h3>
              <p className="text-neutral-500 text-sm">함께 나누는 아름다움</p>
            </div>
            
            {/* Benefits Section */}
            <div className="flex-grow">
              <ul className="space-y-4 text-neutral-600 font-light text-sm break-keep">
                <li className="flex items-start">
                  <span className="mr-2 text-neutral-300">•</span>
                  <span>지인 소개 시 두 분 모두 혜택 제공</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-neutral-300">•</span>
                  <span>영상 종류 관계 없이 <strong>전체 비용 10% 할인</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-neutral-300">•</span>
                  <span>소개받으신 분의 첫 작업 확정 시 적용</span>
                </li>
              </ul>
            </div>

            {/* Footer Section */}
            <div className="mt-12 pt-8 border-t border-neutral-100">
              {/* Price Block - Fixed Height for Alignment */}
              <div className="h-[72px] mb-8 flex flex-col justify-between">
                <span className="block text-neutral-400 text-[10px] tracking-widest uppercase">Discount</span>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-serif text-neutral-900">10%</span>
                    <span className="text-neutral-500 ml-1.5 text-xs">OFF</span>
                  </div>
                  <span className="text-[10px] text-transparent font-light select-none">Spacer</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Deadline Row */}
                <div className="flex items-center justify-between text-neutral-400 text-[11px] h-5">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2" />
                    <span>기한</span>
                  </div>
                  <span className="text-neutral-500">상시 진행</span>
                </div>
                {/* Info Box */}
                <div className="flex items-start text-neutral-400 text-[11px] bg-neutral-50 p-4 rounded-sm break-keep leading-relaxed h-[84px] overflow-hidden">
                  <Info className="w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    본 이벤트 혜택은 1인당 1회에 한하여 적용 가능합니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

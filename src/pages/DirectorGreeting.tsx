import { motion } from 'motion/react';

export default function DirectorGreeting() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">병원장 인사말</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">DIRECTOR'S GREETING</p>
        </div>

        <div className="space-y-32">
          <section className="text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-10 leading-tight break-keep">
              "평생의 뷰티 주치의가 희망을 채워주는 디지털압구정이<br/>당신의 영상과 함께합니다"
            </h2>
          </section>

          <section className="bg-neutral-50 p-12 md:p-16 border border-neutral-100">
            <div className="text-center mb-16">
              <h3 className="text-2xl font-serif inline-block border-b border-neutral-300 pb-4 px-8 break-keep">
                DIAP의 약속
              </h3>
            </div>
            
            <div className="space-y-16">
              <div className="text-center">
                <p className="text-neutral-800 font-medium mb-4 text-lg break-keep">디지털 압구정은 고객 만족을 최우선으로 생각합니다</p>
                <p className="text-neutral-600 font-light leading-relaxed break-keep">
                  각 영상에 맞는 뷰티 솔루션을 제공해 고객 행복에 기여하고자 하는 마음, 
                  안전성과 전문성을 바탕으로 신뢰와 믿음에 보답하겠습니다
                </p>
              </div>

              <div className="text-center">
                <p className="text-neutral-800 font-medium mb-4 text-lg break-keep">디지털 압구정의 의료진은 최고의 실력으로 승부합니다</p>
                <p className="text-neutral-600 font-light leading-relaxed break-keep">
                  풍부한 임상 경험과 학술 지식을 갖춘 리터처를 배치, 전문의가 영상 트렌드와 니즈, 
                  인물의 특성을 반영한 최상의 결과를 보장하겠습니다
                </p>
              </div>

              <div className="text-center">
                <p className="text-neutral-800 font-medium mb-4 text-lg break-keep">디지털 압구정은 비디오별 최상의 토탈 맞춤 뷰티 솔루션을 제공합니다</p>
                <p className="text-neutral-600 font-light leading-relaxed break-keep">
                  항상 같은 자리에서 평생 영상의 미(美)를 책임지며 
                  뷰티 원더랜드의 임무를 다하겠습니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

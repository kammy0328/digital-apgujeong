import { motion } from 'motion/react';

export default function CompanyIntro() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">회사 소개</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">ABOUT DIGITAL APGUJEONG DIAP</p>
        </div>

        <div className="space-y-32">
          <section className="text-center">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-serif mb-10 leading-tight break-keep whitespace-nowrap sm:whitespace-normal">"영상 속 당신의 아름다움을 재창조합니다"</h2>
            <p className="text-neutral-600 font-light leading-loose text-base md:text-lg break-keep mb-6">
              디지털 압구정은 대한민국 뷰티의 중심,<br className="block md:hidden" /> 압구정의 미학을 디지털 세계로 옮겨왔습니다. 
            </p>
            <div className="text-neutral-600 font-light leading-loose text-lg break-keep">
              <p className="mb-4">
                단순한 색상 보정이나 필터 적용을 넘어, 프레임 단위의 정밀한 분석과 리터칭을 통해
              </p>
              <p>
                마치 실제 성형외과에서 시술을 받은 듯한 자연스럽고 완벽한 결과를 제공합니다.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-16 items-center">
            <img 
              src="https://placehold.co/800x1000?text=준비+중" 
              alt="Studio" 
              className="w-full aspect-[4/5] object-cover"
            />
            <div>
              <div className="mb-16">
                <h3 className="text-sm font-bold tracking-[0.2em] mb-4 text-neutral-400">PHILOSOPHY</h3>
                <h4 className="text-xl md:text-2xl font-serif mb-6 break-keep">티 나지 않는 완벽함</h4>
                <div className="text-neutral-600 font-light leading-relaxed break-keep">
                  <p className="mb-4">우리의 철학은 '티 나지 않는 완벽함'입니다.</p>
                  <p>
                    과도한 보정으로 본연의 매력을 잃는 것이 아니라, 단점을 섬세하게 커버하고 장점을 극대화하여 가장 나다운 아름다움을 영상 속에 담아냅니다.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold tracking-[0.2em] mb-4 text-neutral-400">TECHNOLOGY</h3>
                <h4 className="text-xl md:text-2xl font-serif mb-6 break-keep">하이엔드 시술 도구 및 작업 공정</h4>
                <p className="text-neutral-600 font-light leading-relaxed mb-4 break-keep">
                  수년간 숙련된 전문 리터처의 수작업이 결합된 독자적인 작업 공정을 구축했습니다. 
                  움직임이 많은 영상에서도 흔들림 없는 완벽한 보정 퀄리티를 유지합니다.
                </p>
                <p className="text-neutral-600 font-light leading-relaxed break-keep">
                  특히 수백만원을 호가하는 고사양 하이엔드 합성 소프트웨어인 <strong>Nuke</strong>를 비롯하여, <strong>After Effects</strong>, <strong>DaVinci Resolve</strong> 등 세계적인 영화 및 광고 산업에서 사용되는 최고급 툴만을 시술 도구로 채택하여 압도적인 결과물을 완성합니다.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-16 border-t border-neutral-100">
            <h3 className="text-sm font-bold tracking-[0.2em] mb-12 text-neutral-400 text-center uppercase">History</h3>
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-8 md:gap-16 items-start">
                <div className="text-2xl font-serif text-neutral-900 flex-shrink-0 w-24 md:w-32">2026. 04</div>
                <div className="pt-1.5 pb-8 border-l border-neutral-200 pl-8 md:pl-16 relative">
                  <div className="absolute w-2 h-2 bg-neutral-900 rounded-full -left-[5px] top-3" />
                  <h4 className="text-lg font-medium mb-2">디지털 압구정(DIAP) 설립</h4>
                  <p className="text-neutral-500 font-light text-sm break-keep">
                    압구정 본점 개업 및 하이엔드 영상 뷰티 리터칭 전문 서비스 런칭
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

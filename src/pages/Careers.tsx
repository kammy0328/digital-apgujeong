import { motion } from 'motion/react';
import { Mail, Briefcase } from 'lucide-react';

export default function Careers() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">인재 채용</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">JOIN DIAP</p>
        </div>

        <div className="space-y-20">
          <section className="text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 leading-tight break-keep">
              "대한민국 최고의 리터처가 되기 위한 문은 항상 열려있습니다"
            </h2>
            <p className="text-neutral-600 font-light leading-relaxed text-lg break-keep">
              디지털 압구정은 완벽함을 추구하는 열정적인 아티스트를 기다립니다.<br/>
              최고의 환경에서 하이엔드 뷰티 리터칭의 기준을 함께 만들어갈 인재들의 많은 지원 바랍니다.
            </p>
          </section>

          <div className="bg-neutral-50 p-12 border border-neutral-100">
            <div className="flex items-center justify-center mb-10">
              <Briefcase size={32} className="text-neutral-800" />
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-bold tracking-widest mb-4 text-neutral-900 border-b border-neutral-200 pb-3">지원 자격</h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-neutral-700 font-light">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                    <span><strong>학력:</strong> 무관</span>
                  </li>
                  <li className="flex items-start text-neutral-700 font-light">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                    <span><strong>경력:</strong> 신입 / 경력 (영상 편집 및 리터칭 관련 경력자 우대)</span>
                  </li>
                  <li className="flex items-start text-neutral-700 font-light">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                    <span><strong>필수 역량:</strong> 영상 편집 툴 활용 능력 및 꼼꼼하고 디테일한 시각적 감각</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold tracking-widest mb-4 text-neutral-900 border-b border-neutral-200 pb-3">우대 사항</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-neutral-700 font-light">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mr-4 flex-shrink-0"></span>
                    Nuke 활용 능력 우수자
                  </li>
                  <li className="flex items-center text-neutral-700 font-light">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mr-4 flex-shrink-0"></span>
                    After Effects 활용 능력 우수자
                  </li>
                  <li className="flex items-center text-neutral-700 font-light">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mr-4 flex-shrink-0"></span>
                    Davinci Resolve 활용 능력 우수자
                  </li>
                  <li className="flex items-center text-neutral-700 font-light">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mr-4 flex-shrink-0"></span>
                    뷰티, 패션, 뮤직비디오 리터칭 실무 경험자
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold tracking-widest mb-4 text-neutral-900 border-b border-neutral-200 pb-3">지원 방법</h3>
                <div className="flex items-start text-neutral-700 font-light bg-white p-6 border border-neutral-100">
                  <Mail size={20} className="mr-4 mt-0.5 text-neutral-500 flex-shrink-0" />
                  <div>
                    <p className="mb-2">자유 양식의 이력서 및 포트폴리오를 아래 이메일로 제출해 주세요.</p>
                    <a href="mailto:digitalapgujeong@gmail.com" className="text-lg font-medium text-neutral-900 hover:opacity-70 transition-opacity">
                      digitalapgujeong@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, FileCheck, Clock, ShieldAlert, FileVideo } from 'lucide-react';

type Genre = 'AD' | 'MV' | 'DRAMA' | 'FILM';

export default function CommercialGuidelines() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>('AD');

  const genres = [
    { id: 'AD', label: '광고' },
    { id: 'MV', label: '뮤직비디오' },
    { id: 'DRAMA', label: '드라마' },
    { id: 'FILM', label: '영화' },
  ];

  const getContent = (genre: Genre) => {
    switch (genre) {
      case 'AD':
        return {
          unit: "컷당 단가 산정",
          duration: "15초, 30초, 60초 등 광고 규격 기준",
          note: "제품의 특성과 모델의 이미지를 고려한 극강의 디테일 리터칭을 제공합니다."
        };
      case 'MV':
        return {
          unit: "메인 MV 1편 기준",
          duration: "곡 전체 러닝타임 기준 (보통 4분 내외)",
          note: "아티스트 맞춤형 예술적 감각의 뷰티 리터칭과 톤앤매너 유지를 보장합니다."
        };
      case 'DRAMA':
        return {
          unit: "회차별",
          duration: "방영 회차 및 캐릭터 노출 시간 기준",
          note: "장기 프로젝트의 특성을 고려하여 전 회차에 걸친 일관된 캐릭터 룩을 유지합니다."
        };
      case 'FILM':
        return {
          unit: "전체 러닝타임 및 주요 시퀀스별 작업 범위 협의",
          duration: "장편/단편 영화 전체 분량 기준",
          note: "대형 스크린 상영을 전제로 한 최고 해상도의 정밀 합성 및 리터칭 기술을 적용합니다."
        };
    }
  };

  const content = getContent(selectedGenre);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">시술 규정</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm uppercase">Procedures & Guidelines</p>
        </div>

        {/* Genre Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id as Genre)}
              className={`px-8 py-3 text-sm tracking-widest transition-all duration-300 border ${
                selectedGenre === genre.id 
                  ? 'bg-neutral-900 text-white border-neutral-900' 
                  : 'bg-white text-neutral-400 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGenre}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-16"
          >
            {/* 1. 서비스 구성 및 기준 */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <FileCheck className="w-6 h-6 text-neutral-800" />
                <h2 className="text-2xl font-serif">1. 서비스 구성 및 기준</h2>
              </div>
              <div className="bg-neutral-50 p-8 border border-neutral-100 space-y-4 text-neutral-600 font-light leading-relaxed break-keep">
                <p><strong className="font-medium text-neutral-900">작업 단위:</strong> {content.unit}</p>
                <p><strong className="font-medium text-neutral-900">기준 분량:</strong> {content.duration}</p>
                <p><strong className="font-medium text-neutral-900">특이 사항:</strong> {content.note}</p>
              </div>
            </section>

            {/* 2. 데이터 접수 및 검수 규정 */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <FileVideo className="w-6 h-6 text-neutral-800" />
                <h2 className="text-2xl font-serif">2. 데이터 접수 및 검수 규정</h2>
              </div>
              <div className="bg-neutral-50 p-8 border border-neutral-100 space-y-6 text-neutral-600 font-light leading-relaxed break-keep">
                <p className="text-neutral-800 font-medium mb-2">
                  정확한 견적 산출과 일관된 품질 유지를 위해 프로젝트 시작 전 다음 사항을 반드시 준수해 주시기 바랍니다.
                </p>
                
                <div className="space-y-6 pl-4 border-l-2 border-neutral-200">
                  <div>
                    <strong className="font-medium text-neutral-900 block mb-1">전체 편집본 제출 필수</strong>
                    <p>작업 의뢰 시 전체 편집본을 전달해 주셔야 합니다.</p>
                    <p className="text-sm mt-1 text-neutral-500">* 이는 영상 간의 컷 중복 여부를 확인하고, 전체 프로젝트 물량을 정확히 파악하여 합리적인 견적을 제시하기 위함입니다.</p>
                  </div>

                  <div>
                    <strong className="font-medium text-neutral-900 block mb-1">작업 단위의 정의</strong>
                    <p>여러 편의 영상을 한 편으로 구성하여 작업 범위를 축소 보고하는 경우, 추후 확인 시 해당 분량만큼의 추가 비용이 소급 적용됩니다.</p>
                    <p className="text-sm mt-1 text-neutral-500">* 최종 납품 파일의 개수와 실제 작업 시간을 기준으로 정산하는 것을 원칙으로 합니다.</p>
                  </div>

                  <div>
                    <strong className="font-medium text-neutral-900 block mb-1">픽쳐락(Picture Lock) 기준</strong>
                    <p>모든 리터칭 작업은 컷 편집이 100% 확정된 상태에서 시작됩니다. 데이터 전달 후 편집점이 변경될 경우, 기존 작업 무효화에 따른 재작업 비용이 발생합니다.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. 작업 일정 및 수정 규정 */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-neutral-800" />
                <h2 className="text-2xl font-serif">3. 작업 일정 및 수정 규정</h2>
              </div>
              <div className="bg-neutral-50 p-8 border border-neutral-100 space-y-4 text-neutral-600 font-light leading-relaxed break-keep">
                <p><strong className="font-medium text-neutral-900">무료 수정:</strong> 1차 시안 전달 후 최대 2회까지 가능합니다.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>수정 요청은 명확한 타임코드와 함께 통합된 피드백으로 전달해 주셔야 합니다.</li>
                  <li>보정 강도의 전면적인 변경이나 이목구비 형태의 재수정 등 작업 범위의 50%를 초과하는 과도한 수정은 추가 비용이 발생할 수 있습니다.</li>
                </ul>
              </div>
            </section>

            {/* 4. 긴급 작업 안내 */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="w-6 h-6 text-neutral-800" />
                <h2 className="text-2xl font-serif">4. 긴급 작업 안내</h2>
              </div>
              <div className="bg-neutral-50 p-8 border border-neutral-100 space-y-4 text-neutral-600 font-light leading-relaxed break-keep">
                <ul className="list-disc pl-5 space-y-2">
                  <li>48시간 이내 긴급 납품이 필요한 경우, 기본 견적의 50%~100% 할증 비용이 발생합니다.</li>
                  <li>긴급 작업은 스튜디오 내부 스케줄 상황에 따라 진행이 불가할 수 있으므로 사전 문의가 필수입니다.</li>
                </ul>
              </div>
            </section>

            {/* 5. 보안 및 저작권 */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <ShieldAlert className="w-6 h-6 text-neutral-800" />
                <h2 className="text-2xl font-serif">5. 보안 및 저작권</h2>
              </div>
              <div className="bg-neutral-50 p-8 border border-neutral-100 space-y-4 text-neutral-600 font-light leading-relaxed break-keep">
                <ul className="list-disc pl-5 space-y-2">
                  <li>공개되지 않은 음원 및 영상 소스는 철저히 보안을 유지하며, 작업 완료 후 30일 이내에 영구 파기합니다.</li>
                  <li>완성된 작업물은 추후 당사의 포트폴리오로 활용될 수 있습니다. (비공개 요청 시 사전 협의 필요)</li>
                </ul>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { Sparkles, Heart, Video, MessageCircle, Instagram, Quote, Star } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function WeddingProcedures() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">시술 안내</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">WEDDING PROCEDURES</p>
        </div>

        {/* Before & After Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif mb-4">보정 효과 확인하기</h3>
            <p className="text-neutral-500 font-light">슬라이더를 움직여 디지털 압구정의 정교한 리터칭 기술을 확인해보세요.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider 
              beforeImage="https://placehold.co/1920x1080?text=준비+중+(원본)" 
              afterImage="https://placehold.co/1920x1080?text=준비+중+(리터칭)"
              beforeLabel="원본 영상"
              afterLabel="리터칭 후"
            />
            <p className="mt-4 text-center text-xs text-neutral-400 font-light italic">
              * 실제 작업물은 영상으로 제공되며, 위 이미지는 이해를 돕기 위한 예시입니다.
            </p>
          </div>
        </div>

        {/* Wedding Video Banner Moved from Event.tsx */}
        <div className="mb-20 bg-neutral-900 text-white p-10 md:p-16 text-center rounded-sm">
          <h2 className="text-2xl md:text-3xl font-serif mb-6 leading-tight break-keep">
            웨딩 영상의 피부도 보정할 수 있다는 사실을 아시나요?
          </h2>
          <div className="text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto break-keep">
            <p className="mb-2">실제 아이돌 뮤직비디오와 TV 광고를 작업하는 최상급 전문가들이</p>
            <p>당신의 가장 소중한 순간을 영화처럼 아름답게 완성해 드립니다.</p>
          </div>
        </div>

        {/* General Public Friendly Content */}
        <div className="space-y-16">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl font-serif mb-6 break-keep">사진처럼, 영상도 예쁘게 다듬을 수 있어요</h3>
            <div className="text-neutral-600 font-light leading-relaxed text-lg max-w-2xl mx-auto break-keep">
              <p className="mb-4">결혼식 날 찍은 영상, 혹시 피부 트러블이나 어두운 조명 때문에 아쉬우셨나요?</p>
              <p>
                수많은 셀럽들의 영상을 담당해온 전문가들이 사진을 보정하는 것처럼 영상 속의 모습도 정성스럽게 보정해 드립니다.
              </p>
            </div>
          </motion.section>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            <div className="bg-neutral-50 p-8 text-center border border-neutral-200 relative mt-4 md:mt-0">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-4 py-1 text-xs tracking-widest font-medium">기본 포함</div>
              <div className="flex justify-center mb-6 mt-2">
                <Sparkles className="w-10 h-10 text-neutral-800" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-bold mb-4">깨끗한 피부 표현</h4>
              <p className="text-neutral-600 font-light text-sm leading-relaxed break-keep">
                갑자기 생긴 뾰루지, 잡티, 잔주름 등을 영상 내내 자연스럽게 지워드립니다. 화장이 뭉친 부분도 매끄럽게 정리해 드려요.
              </p>
            </div>

            <div className="bg-neutral-50 p-8 text-center border border-neutral-100 relative mt-4 md:mt-0">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-200 text-neutral-600 px-4 py-1 text-xs tracking-widest font-medium">선택 옵션</div>
              <div className="flex justify-center mb-6 mt-2">
                <Heart className="w-10 h-10 text-neutral-800" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-bold mb-4">자연스러운 체형 보정</h4>
              <p className="text-neutral-600 font-light text-sm leading-relaxed break-keep">
                얼굴형이나 팔뚝 라인 등 신경 쓰이는 부분을 과하지 않고 자연스럽게 다듬어, 가장 아름다운 모습으로 남겨드립니다.
              </p>
            </div>

            <div className="bg-neutral-50 p-8 text-center border border-neutral-100 relative mt-4 md:mt-0">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-200 text-neutral-600 px-4 py-1 text-xs tracking-widest font-medium">선택 옵션</div>
              <div className="flex justify-center mb-6 mt-2">
                <Video className="w-10 h-10 text-neutral-800" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-bold mb-4">화사한 색감과 톤</h4>
              <p className="text-neutral-600 font-light text-sm leading-relaxed break-keep">
                어두운 웨딩홀 조명 아래에서도 신부님의 피부가 화사하고 맑게 빛날 수 있도록 전체적인 영상의 색감과 톤을 맞춰드립니다.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 p-8 border border-neutral-200 text-center"
          >
            <h4 className="text-xl font-serif mb-8">작업 과정 및 결과 확인</h4>
            
            {/* Vimeo Video Section */}
            <div className="mb-12 aspect-video bg-neutral-100 relative group overflow-hidden max-w-3xl mx-auto">
              <iframe 
                src="https://player.vimeo.com/video/100000000?h=0000000000&title=0&byline=0&portrait=0" 
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            <h4 className="text-xl font-serif mb-4">어떻게 진행되나요?</h4>
            <p className="text-neutral-600 font-light mb-6 break-keep">
              복잡한 과정은 저희가 알아서 꼼꼼하게 챙겨드립니다. 원하시는 보정 방향만 편하게 말씀해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 text-sm font-medium text-neutral-500">
              <span>상담 신청</span>
              <span className="w-[1px] h-4 sm:w-4 sm:h-[1px] bg-neutral-300 block"></span>
              <span>영상 전달</span>
              <span className="w-[1px] h-4 sm:w-4 sm:h-[1px] bg-neutral-300 block"></span>
              <span>맞춤 보정 진행</span>
              <span className="w-[1px] h-4 sm:w-4 sm:h-[1px] bg-neutral-300 block"></span>
              <span className="text-neutral-900">완성본 확인</span>
            </div>
          </motion.div>

          {/* Packages & Pricing */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif mb-4">패키지 / 가격</h3>
              <p className="text-neutral-500 font-light whitespace-nowrap sm:whitespace-normal text-[13px] sm:text-base">투명하고 합리적인 가격으로 최고의 결과물을 약속드립니다.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="border border-neutral-200 p-8 bg-white relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold tracking-wider">EVENT</div>
                <h4 className="text-xl font-bold mb-2">베이직 뷰티 리터칭</h4>
                <p className="text-neutral-500 text-sm mb-6">가장 자연스럽고 깨끗한 피부 표현</p>
                <div className="text-3xl font-serif mb-6">₩190,000 <span className="text-sm font-sans text-neutral-400 line-through ml-2">₩400,000</span></div>
                <ul className="space-y-3 text-sm text-neutral-600 font-light mb-8">
                  <li className="flex items-center"><span className="w-1 h-1 bg-neutral-900 rounded-full mr-3"></span>영상 1편 기준 (최대 3분)</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-neutral-900 rounded-full mr-3"></span>전반적인 피부 트러블 및 잡티 제거</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-neutral-900 rounded-full mr-3"></span>자연스러운 피부결 보정</li>
                  <li className="flex items-center text-red-500"><span className="w-1 h-1 bg-red-500 rounded-full mr-3"></span>첫 방문 이벤트 특가 (~26년 8월)</li>
                </ul>
              </div>

              <div className="border border-neutral-900 p-8 bg-neutral-900 text-white">
                <h4 className="text-xl font-bold mb-2">프리미엄 올인원</h4>
                <p className="text-neutral-400 text-sm mb-6">피부부터 체형까지 완벽한 보정</p>
                <div className="text-3xl font-serif mb-6">상담 후 결정</div>
                <ul className="space-y-3 text-sm text-neutral-300 font-light mb-8">
                  <li className="flex items-center"><span className="w-1 h-1 bg-white rounded-full mr-3"></span>베이직 뷰티 리터칭 포함</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-white rounded-full mr-3"></span>정밀 윤곽 및 바디 라인 교정</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-white rounded-full mr-3"></span>컷의 길이나 복잡도에 따라 변동</li>
                  <li className="flex items-center text-neutral-400"><span className="w-1 h-1 bg-neutral-400 rounded-full mr-3"></span>체형 보정 등은 추가 비용이 발생할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif mb-4 break-keep">자주 묻는 질문</h3>
              <p className="text-neutral-500 font-light break-keep">웨딩 보정에 대해 궁금하신 점을 확인해보세요.</p>
            </div>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: "작업 기간은 얼마나 걸리나요?",
                  a: "일반적으로 영상 전달 후 영업일 기준 평균 2일 정도 소요됩니다. 예식 일정에 맞춰 급하게 필요하신 경우 상담 시 미리 말씀해 주시면 조율이 가능합니다."
                },
                {
                  q: "원본 영상은 어떤 포맷으로 전달해야 하나요?",
                  a: "MP4, MOV 등 대부분의 영상 포맷을 지원합니다. 가장 좋은 화질의 원본 파일을 구글 드라이브나 대용량 메일로 전달해 주시면 됩니다."
                },
                {
                  q: "수정은 몇 번까지 가능한가요?",
                  a: "완성본 전달 후 1회에 한해 무료 수정이 가능합니다. 단, 처음 요청하신 보정 방향과 완전히 다른 새로운 요청의 경우 추가 비용이 발생할 수 있습니다."
                },
                {
                  q: "너무 부자연스럽게 보정될까봐 걱정돼요.",
                  a: "디지털 압구정은 '원래 내 피부가 좋았던 것처럼' 자연스러운 보정을 추구합니다. 과도한 보정보다는 장점을 살리고 단점을 부드럽게 커버하는 방식으로 작업합니다."
                }
              ].map((faq, i) => (
                <div key={i} className="border border-neutral-200 p-6 bg-white">
                  <h5 className="font-bold text-neutral-900 mb-3 flex items-start break-keep">
                    <span className="text-neutral-400 mr-3 font-serif">Q.</span>
                    {faq.q}
                  </h5>
                  <p className="text-neutral-600 font-light text-sm leading-relaxed flex items-start break-keep">
                    <span className="text-neutral-400 mr-3 font-serif">A.</span>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Customer Reviews */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-32"
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl font-serif mb-4 break-keep">고객 후기</h3>
              <p className="text-neutral-500 font-light break-keep">디지털 압구정을 경험하신 신부님들의 진솔한 이야기입니다.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "김*희 신부님",
                  date: "2024.03",
                  text: "결혼식 날 피부 컨디션이 안 좋아서 걱정했는데, 영상에서 너무 깨끗하게 나와서 감동했어요. 과하지 않고 정말 자연스러워서 만족합니다!",
                  stars: 5
                },
                {
                  name: "이*영 신부님",
                  date: "2024.02",
                  text: "팔뚝 라인이랑 얼굴형 보정을 부탁드렸는데, 배경 왜곡 없이 정말 감쪽같아요. 역시 전문가의 손길은 다르네요. 강력 추천합니다."
                }
              ].map((review, i) => (
                <div key={i} className="bg-neutral-50 p-8 border border-neutral-100 relative">
                  <Quote className="absolute top-6 right-8 w-10 h-10 text-neutral-200" />
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-neutral-800 fill-neutral-800 mr-0.5" />
                    ))}
                  </div>
                  <p className="text-neutral-700 font-light leading-relaxed mb-6 italic break-keep">
                    "{review.text}"
                  </p>
                  <div className="flex justify-between items-center text-xs text-neutral-400">
                    <span className="font-medium text-neutral-600">{review.name}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 bg-neutral-50 p-8 text-center border border-neutral-100"
          >
            <h4 className="text-xl font-serif mb-6">상담 문의</h4>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
              <div className="flex items-center space-x-3 text-neutral-700">
                <MessageCircle size={20} />
                <a 
                  href="https://pf.kakao.com/_xxxx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-light hover:text-neutral-500 transition-colors"
                >
                  카카오톡 채널 <strong>@디지털압구정</strong>
                </a>
              </div>
              <div className="flex items-center space-x-3 text-neutral-700">
                <Instagram size={20} />
                <a 
                  href="https://www.instagram.com/digital_apgujeong/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-light hover:text-neutral-500 transition-colors"
                >
                  인스타그램 <strong>@digital_apgujeong</strong>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

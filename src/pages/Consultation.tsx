import { motion } from 'motion/react';
import { Phone, Mail, Clock, MessageCircle, Instagram } from 'lucide-react';

export default function Consultation() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 min-h-screen flex flex-col bg-white"
    >
      <div className="max-w-4xl mx-auto px-6 w-full flex-grow">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">상담 안내</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">CONSULTATION</p>
        </div>

        <div className="bg-neutral-50 p-12 md:p-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-6 break-keep">디지털 압구정 DIAP 고객센터</h2>
            <p className="text-neutral-500 font-light leading-relaxed break-keep mb-2">
              영상 리터칭에 대한 모든 문의를 환영합니다.
            </p>
            <p className="text-neutral-500 font-light leading-relaxed break-keep">
              원하시는 보정 방향과 영상의 길이를 알려주시면 빠르고 정확하게 상담해 드립니다.
            </p>
            <div className="mt-6 text-red-500 text-sm font-medium break-keep bg-red-50 py-3 px-6 inline-block text-left">
              <p className="mb-1">* 현재 사이트 점검으로 인해 이메일을 제외한 다른 연락 수단은 이용이 원활하지 않습니다.</p>
              <p>문의사항은 이메일로 보내주시면 순차적으로 답변 드리겠습니다.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex items-start opacity-60 grayscale relative group">
                <div className="absolute -top-4 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold rounded-sm z-10">점검 중</div>
                <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-full mr-6 flex-shrink-0">
                  <Phone size={24} className="text-neutral-700" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">PHONE</h3>
                  <p className="text-lg text-neutral-900 font-light">02-1234-5678</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-full mr-6 flex-shrink-0">
                  <Mail size={24} className="text-neutral-700" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">EMAIL</h3>
                  <a 
                    href="mailto:digitalapgujeong@gmail.com" 
                    className="text-lg text-neutral-900 font-light hover:text-neutral-500 transition-colors"
                  >
                    digitalapgujeong@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="flex items-start">
                <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-full mr-6 flex-shrink-0">
                  <Clock size={24} className="text-neutral-700" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">HOURS</h3>
                  <p className="text-neutral-900 font-light text-lg">평일 10:00 - 19:00</p>
                  <p className="text-neutral-500 text-sm mt-2 font-light">주말 및 공휴일 휴무</p>
                  <p className="text-red-500 text-xs mt-3 font-medium break-keep">
                    * 긴급 작업 및 주말 작업의 경우 카카오톡 채널로 문의해 주시면 확인 후 답변 드립니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start opacity-60 grayscale relative group">
                <div className="absolute -top-4 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold rounded-sm z-10">점검 중</div>
                <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-full mr-6 flex-shrink-0">
                  <MessageCircle size={24} className="text-neutral-700" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">KAKAOTALK</h3>
                  <a 
                    href="https://pf.kakao.com/_xxxx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg text-neutral-900 font-light hover:text-neutral-500 transition-colors"
                  >
                    @디지털압구정
                  </a>
                </div>
              </div>

              <div className="flex items-start opacity-60 grayscale relative group">
                <div className="absolute -top-4 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold rounded-sm z-10">점검 중</div>
                <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-full mr-6 flex-shrink-0">
                  <Instagram size={24} className="text-neutral-700" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">INSTAGRAM</h3>
                  <a 
                    href="https://www.instagram.com/digital_apgujeong/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg text-neutral-900 font-light hover:text-neutral-500 transition-colors"
                  >
                    @digital_apgujeong
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

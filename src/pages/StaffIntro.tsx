import { motion } from 'motion/react';

const staffMembers = [
  {
    name: "이원장",
    title: "Lead Retoucher",
    gender: "male",
    image: "https://placehold.co/800x800/141414/525252?text=준비+중",
    specialty: "모공 정밀 케어, 스킨 텍스쳐 및 주름 보정",
    bio: "대형 MV 영상 전담 리터처 출신. 뼈를 깎는 고통 없이 디지털로 완벽한 피부결을 완성합니다.",
    portfolios: [
      "A 아이돌 그룹 뮤직비디오 멤버 전원 피부 텍스쳐 보정",
      "B 뷰티 브랜드 CF 메인 모델 모공/주름 정밀 리터칭",
      "C 배우 드라마 타이틀 영상 정밀 보정"
    ]
  },
  {
    name: "김실장",
    title: "Drama & Film Retoucher",
    gender: "female",
    image: "https://placehold.co/800x800/141414/525252?text=준비+중",
    specialty: "자연스러운 피부톤 보정, 디지털 메이크업, 드라마 및 영화 전문",
    bio: "드라마 및 영화 전문 리터처로서, 영상의 톤앤매너를 유지하면서도 인물의 매력을 극대화하는 작업을 전문으로 합니다. 트렌디한 감각과 꼼꼼한 작업으로 최상의 결과물을 만들어냅니다.",
    portfolios: [
      "드라마: 당신의 맛 / 폭군의 셰프 / 경도를 기다리며",
      "영화: 만약에 우리",
      "Music Video Skin Retouching"
    ]
  }
];

export default function StaffIntro() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-black min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 break-keep">의료진 소개</h1>
          <p className="text-neutral-500 tracking-[0.2em] text-sm">DIAP SPECIALISTS</p>
          <p className="mt-8 text-neutral-400 font-light text-lg break-keep">디지털 압구정 DIAP의 리터처들은 '디지털 성형외과 의사'라는 자부심으로 작업합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {staffMembers.map((staff, index) => (
            <div key={index} className="flex flex-col bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-colors duration-300">
              <div className="aspect-square bg-neutral-900 relative flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-baseline gap-2 mb-2">
                  <h2 className="text-2xl font-serif text-white">{staff.name}</h2>
                  <span className="text-[10px] font-sans font-light text-neutral-500 tracking-widest uppercase">{staff.title}</span>
                </div>
                <p className="text-neutral-300 text-xs font-medium mb-4 break-keep">{staff.specialty}</p>
                <p className="text-neutral-400 font-light leading-relaxed mb-6 text-sm break-keep">
                  "{staff.bio}"
                </p>
                <div className="mt-auto">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] mb-3 text-neutral-500 border-b border-neutral-800 pb-1 uppercase">Major Portfolio</h3>
                  <ul className="space-y-2">
                    {staff.portfolios.map((item, i) => (
                      <li key={i} className="flex items-start text-neutral-400 font-light text-[11px] leading-snug break-keep">
                        <span className="w-1 h-1 bg-white rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

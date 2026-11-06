import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Key, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface ServiceContent {
  title: string;
  kicker: string;
  lead: string;
  items: { en: string; ko: string; text: string }[];
  approachTitle: string;
  approach: { title: string; text: string }[];
}

const PROCESS = [
  { title: "원본 전달", text: "영상 링크와 작업 범위, 희망 납기를 공유해 주세요." },
  { title: "테스트 컷", text: "대표 컷을 먼저 작업해 보정의 강도와 방향을 맞춥니다." },
  { title: "본 작업", text: "확정된 방향으로 전 프레임을 트래킹하며 작업합니다." },
  { title: "수정 · 납품", text: "피드백을 반영한 뒤 요청하신 포맷으로 전달합니다." },
];

const BEAUTY: ServiceContent = {
  title: "Beauty",
  kicker: "영상 뷰티 리터칭",
  lead: "피부의 질감과 인물의 개성은 살리고, 시선을 방해하는 것만 덜어냅니다. 움직임과 조명이 바뀌어도 프레임 단위로 자연스럽게 이어지는 보정을 합니다.",
  items: [
    { en: "Skin texture", ko: "피부 결 정돈", text: "모공과 요철을 완화하되 원본의 질감은 남겨, 클로즈업에서도 매끈하게 뭉개지지 않도록 정돈합니다." },
    { en: "Blemish", ko: "잡티 · 트러블", text: "여드름, 흉터, 붉은 기처럼 그날만 있던 요소를 움직임에 맞춰 추적하며 지웁니다." },
    { en: "Tone", ko: "톤 · 혈색", text: "조명에 따라 달라지는 피부 톤과 혈색을 컷과 컷 사이에서 일관되게 맞춥니다." },
    { en: "Under-eye", ko: "다크서클 · 잔주름", text: "피로감이 드러나는 부분을 표정의 생기를 해치지 않는 선에서 완화합니다." },
    { en: "Contour", ko: "윤곽 · 라인", text: "얼굴 윤곽과 바디 라인을 배경 왜곡 없이, 티 나지 않는 범위에서 다듬습니다." },
    { en: "Hair", ko: "헤어 라인", text: "잔머리와 비어 보이는 헤어 라인을 정리해 화면 전체의 완성도를 높입니다." },
  ],
  approachTitle: "티 나지 않는 완벽함",
  approach: [
    { title: "질감 보존", text: "필터처럼 덮지 않고, 피부가 원래 좋았던 것처럼 보이게 합니다." },
    { title: "프레임 단위 트래킹", text: "고개를 돌리고 표정이 바뀌어도 보정이 미끄러지지 않습니다." },
    { title: "톤 앤 매너 유지", text: "작품의 룩과 인물의 캐릭터를 해치지 않는 강도로 작업합니다." },
  ],
};

const CLEANUP: ServiceContent = {
  title: "Cleanup",
  kicker: "오브젝트 클리닝",
  lead: "화면 속 불필요한 요소를 지우고, 그 자리를 원래 있던 것처럼 복원합니다. 촬영 현장에서 피할 수 없었던 흔적을 후반에서 정리합니다.",
  items: [
    { en: "Rig removal", ko: "장비 · 리그", text: "마이크, 와이어, 스탠드, 리그처럼 화면에 걸린 촬영 장비를 지웁니다." },
    { en: "Logo", ko: "로고 · 텍스트", text: "노출되면 안 되는 브랜드 로고, 간판, 텍스트를 제거하거나 정리합니다." },
    { en: "Background", ko: "배경 정리", text: "배경의 잡물, 쓰레기, 지나가는 사람처럼 시선을 흩뜨리는 요소를 정리합니다." },
    { en: "Reflection", ko: "반사 · 그림자", text: "거울, 유리, 차체에 비친 스태프와 장비의 반사를 지웁니다." },
    { en: "Marks", ko: "타투 · 상처", text: "일시적으로 드러난 타투, 상처, 밴드를 장면에 맞게 지웁니다." },
    { en: "Defects", ko: "먼지 · 데드픽셀", text: "센서 먼지, 데드픽셀, 깜빡임 같은 이미지 결함을 정리합니다." },
  ],
  approachTitle: "지운 자리가 보이지 않게",
  approach: [
    { title: "배경 복원", text: "가려졌던 배경을 앞뒤 프레임에서 재구성해 빈자리를 채웁니다." },
    { title: "카메라 트래킹", text: "카메라 움직임을 따라 복원한 면이 장면에 붙어 있도록 합니다." },
    { title: "그레인 매칭", text: "노이즈와 질감을 원본과 맞춰 수정한 부분이 드러나지 않게 합니다." },
  ],
};

function Reveal({ children, delay = 0, className }: { key?: Key; children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function ServicePage({ content }: { content: ServiceContent }) {
  return (
    <div className="service-page page-pad">
      <section className="service-hero">
        <h1 className="reveal-line">
          <motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.1 }}>
            {content.title}
          </motion.span>
        </h1>
        <Reveal delay={0.35} className="service-lead">
          <p>{content.lead}</p>
        </Reveal>
      </section>

      <section className="service-section">
        <Reveal className="service-section-head">
          <span className="eyebrow">what we do</span>
        </Reveal>
        <div className="service-items">
          {content.items.map((item, i) => (
            <Reveal key={item.en} delay={(i % 3) * 0.08} className="service-item glass-card">
              <span className="service-item-index">{String(i + 1).padStart(2, "0")}</span>
              <h3>
                {item.ko}
                <small>{item.en}</small>
              </h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="service-section service-approach">
        <Reveal className="service-section-head">
          <span className="eyebrow">approach</span>
          <h2>{content.approachTitle}</h2>
        </Reveal>
        <div className="approach-list">
          {content.approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1} className="approach-row">
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="service-section">
        <Reveal className="service-section-head">
          <span className="eyebrow">process</span>
        </Reveal>
        <div className="process-list">
          {PROCESS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="process-step">
              <span className="process-index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="service-cta">
        <p>{content.kicker}가 필요한 영상이 있다면</p>
        <Link to="/contact" className="glass-button">
          프로젝트 문의 <ArrowUpRight size={18} />
        </Link>
      </Reveal>
    </div>
  );
}

export function Beauty() {
  return <ServicePage content={BEAUTY} />;
}

export function Cleanup() {
  return <ServicePage content={CLEANUP} />;
}

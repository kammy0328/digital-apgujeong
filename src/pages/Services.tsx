import { motion } from "motion/react";
import type { Key, ReactNode } from "react";
import { useLang, type L } from "../i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export interface ServiceContent {
  title: string;
  cta: L;
  lead: L;
  items: { name: L; text: L }[];
  approachTitle: L;
  approach: { title: L; text: L }[];
}

export const LABELS = {
  what: { en: "what we do", ko: "what we do" } as L,
  approach: { en: "approach", ko: "approach" } as L,
  process: { en: "process", ko: "process" } as L,
  inquiry: { en: "Project inquiry", ko: "프로젝트 문의" } as L,
};

export const PROCESS: { title: L; text: L }[] = [
  {
    title: { en: "Send footage", ko: "원본 전달" },
    text: { en: "Share your video link, scope of work and preferred deadline.", ko: "영상 링크와 작업 범위, 희망 납기를 공유해 주세요." },
  },
  {
    title: { en: "Test cut", ko: "테스트 컷" },
    text: { en: "We work a representative shot first to agree on strength and direction.", ko: "대표 컷을 먼저 작업해 보정의 강도와 방향을 맞춥니다." },
  },
  {
    title: { en: "Full work", ko: "본 작업" },
    text: { en: "Every frame is tracked and finished in the agreed direction.", ko: "확정된 방향으로 전 프레임을 트래킹하며 작업합니다." },
  },
  {
    title: { en: "Revisions & delivery", ko: "수정 · 납품" },
    text: { en: "We apply your feedback and deliver in the format you need.", ko: "피드백을 반영한 뒤 요청하신 포맷으로 전달합니다." },
  },
];

export const BEAUTY: ServiceContent = {
  title: "Beauty",
  cta: { en: "Need beauty retouching for your video?", ko: "영상 뷰티 리터칭이 필요한 영상이 있다면" },
  lead: {
    en: "We keep skin texture and personality, and remove only what pulls the eye away. The retouch holds frame by frame, through movement and changing light.",
    ko: "피부의 질감과 인물의 개성은 살리고, 시선을 방해하는 것만 덜어냅니다. 움직임과 조명이 바뀌어도 프레임 단위로 자연스럽게 이어지는 보정을 합니다.",
  },
  items: [
    { name: { en: "Skin texture", ko: "피부 결 정돈" }, text: { en: "Pores and unevenness are softened while the original texture stays, so close-ups never turn plastic.", ko: "모공과 요철을 완화하되 원본의 질감은 남겨, 클로즈업에서도 매끈하게 뭉개지지 않도록 정돈합니다." } },
    { name: { en: "Blemishes", ko: "잡티 · 트러블" }, text: { en: "Acne, scars and redness that were only there that day are tracked through motion and removed.", ko: "여드름, 흉터, 붉은 기처럼 그날만 있던 요소를 움직임에 맞춰 추적하며 지웁니다." } },
    { name: { en: "Tone", ko: "톤 · 혈색" }, text: { en: "Skin tone and colour that shift with the lighting are matched consistently from cut to cut.", ko: "조명에 따라 달라지는 피부 톤과 혈색을 컷과 컷 사이에서 일관되게 맞춥니다." } },
    { name: { en: "Under-eye & lines", ko: "다크서클 · 잔주름" }, text: { en: "Signs of fatigue are softened without taking the life out of the expression.", ko: "피로감이 드러나는 부분을 표정의 생기를 해치지 않는 선에서 완화합니다." } },
    { name: { en: "Contour", ko: "윤곽 · 라인" }, text: { en: "Face and body lines are refined without bending the background, and only as far as stays invisible.", ko: "얼굴 윤곽과 바디 라인을 배경 왜곡 없이, 티 나지 않는 범위에서 다듬습니다." } },
    { name: { en: "Hairline", ko: "헤어 라인" }, text: { en: "Flyaways and thin hairlines are tidied to lift the polish of the whole frame.", ko: "잔머리와 비어 보이는 헤어 라인을 정리해 화면 전체의 완성도를 높입니다." } },
  ],
  approachTitle: { en: "Perfection you can't see", ko: "티 나지 않는 완벽함" },
  approach: [
    { title: { en: "Texture preserved", ko: "질감 보존" }, text: { en: "Never a filter laid on top. The skin looks like it was always this good.", ko: "필터처럼 덮지 않고, 피부가 원래 좋았던 것처럼 보이게 합니다." } },
    { title: { en: "Frame-by-frame tracking", ko: "프레임 단위 트래킹" }, text: { en: "The retouch stays put as heads turn and expressions change.", ko: "고개를 돌리고 표정이 바뀌어도 보정이 미끄러지지 않습니다." } },
    { title: { en: "True to the look", ko: "톤 앤 매너 유지" }, text: { en: "Worked at a strength that respects the film's look and the character.", ko: "작품의 룩과 인물의 캐릭터를 해치지 않는 강도로 작업합니다." } },
  ],
};

export const CLEANUP: ServiceContent = {
  title: "Cleanup",
  cta: { en: "Need object cleanup for your video?", ko: "오브젝트 클리닝이 필요한 영상이 있다면" },
  lead: {
    en: "We remove what shouldn't be in the frame and rebuild the space as if it were never there. Traces that couldn't be avoided on set are cleaned up in post.",
    ko: "화면 속 불필요한 요소를 지우고, 그 자리를 원래 있던 것처럼 복원합니다. 촬영 현장에서 피할 수 없었던 흔적을 후반에서 정리합니다.",
  },
  items: [
    { name: { en: "Rigs & gear", ko: "장비 · 리그" }, text: { en: "Mics, wires, stands and rigs caught in frame are removed.", ko: "마이크, 와이어, 스탠드, 리그처럼 화면에 걸린 촬영 장비를 지웁니다." } },
    { name: { en: "Logos & text", ko: "로고 · 텍스트" }, text: { en: "Brand logos, signs and text that can't be shown are removed or cleaned up.", ko: "노출되면 안 되는 브랜드 로고, 간판, 텍스트를 제거하거나 정리합니다." } },
    { name: { en: "Background", ko: "배경 정리" }, text: { en: "Clutter, litter and passers-by that scatter the viewer's attention are cleared.", ko: "배경의 잡물, 쓰레기, 지나가는 사람처럼 시선을 흩뜨리는 요소를 정리합니다." } },
    { name: { en: "Reflections", ko: "반사 · 그림자" }, text: { en: "Crew and gear reflected in mirrors, glass and car bodies are removed.", ko: "거울, 유리, 차체에 비친 스태프와 장비의 반사를 지웁니다." } },
    { name: { en: "Tattoos & marks", ko: "타투 · 상처" }, text: { en: "Tattoos, wounds and bandages that showed up by accident are removed to suit the scene.", ko: "일시적으로 드러난 타투, 상처, 밴드를 장면에 맞게 지웁니다." } },
    { name: { en: "Dust & dead pixels", ko: "먼지 · 데드픽셀" }, text: { en: "Sensor dust, dead pixels and flicker are cleaned out of the image.", ko: "센서 먼지, 데드픽셀, 깜빡임 같은 이미지 결함을 정리합니다." } },
  ],
  approachTitle: { en: "No trace of the fix", ko: "지운 자리가 보이지 않게" },
  approach: [
    { title: { en: "Background rebuild", ko: "배경 복원" }, text: { en: "Hidden background is reconstructed from neighbouring frames to fill the gap.", ko: "가려졌던 배경을 앞뒤 프레임에서 재구성해 빈자리를 채웁니다." } },
    { title: { en: "Camera tracking", ko: "카메라 트래킹" }, text: { en: "The restored area follows the camera so it stays attached to the scene.", ko: "카메라 움직임을 따라 복원한 면이 장면에 붙어 있도록 합니다." } },
    { title: { en: "Grain matching", ko: "그레인 매칭" }, text: { en: "Noise and texture are matched to the original so the repair doesn't show.", ko: "노이즈와 질감을 원본과 맞춰 수정한 부분이 드러나지 않게 합니다." } },
  ],
};

export function Reveal({ children, delay = 0, className }: { key?: Key; children: ReactNode; delay?: number; className?: string }) {
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

export function ServiceBlock({ id, index, content }: { id: string; index: string; content: ServiceContent }) {
  const { t } = useLang();
  return (
    <section id={id} className="service-section service-block">
      <Reveal className="service-section-head">
        <span className="eyebrow">{index}</span>
        <h2>{content.title}</h2>
      </Reveal>
      <div className="service-block-body">
        <Reveal className="service-lead">
          <p>{t(content.lead)}</p>
        </Reveal>
        <div className="service-items">
          {content.items.map((item, i) => (
            <Reveal key={item.name.en} delay={(i % 3) * 0.08} className="service-item glass-card">
              <span className="service-item-index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(item.name)}</h3>
              <p>{t(item.text)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="approach-title">
          <h3>{t(content.approachTitle)}</h3>
        </Reveal>
        <div className="approach-list">
          {content.approach.map((a, i) => (
            <Reveal key={a.title.en} delay={i * 0.1} className="approach-row">
              <h3>{t(a.title)}</h3>
              <p>{t(a.text)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useLang();
  return (
    <section className="service-section">
      <Reveal className="service-section-head">
        <span className="eyebrow">{t(LABELS.process)}</span>
      </Reveal>
      <div className="process-list">
        {PROCESS.map((step, i) => (
          <Reveal key={step.title.en} delay={i * 0.08} className="process-step">
            <span className="process-index">{String(i + 1).padStart(2, "0")}</span>
            <h3>{t(step.title)}</h3>
            <p>{t(step.text)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

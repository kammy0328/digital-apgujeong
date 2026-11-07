import { motion } from "motion/react";
import { useLang, type L } from "../i18n";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Reveal, ServiceBlock, Process, BEAUTY, CLEANUP } from "./Services";

const ease = [0.22, 1, 0.36, 1] as const;

const T = {
  lead: {
    en: "Digital Apgujeong is a post-production studio specialised in video beauty retouching and object cleanup. Supervisors, leads and artists work as one pipeline, so even a tight schedule never costs the quality.",
    ko: "디지털 압구정은 영상 뷰티 리터칭과 오브젝트 클리닝을 전문으로 하는 후반 작업 스튜디오입니다. 슈퍼바이저, 리드, 작업자가 하나의 파이프라인으로 움직여, 촉박한 일정에서도 결과물의 완성도를 지킵니다.",
  } as L,
  teamLabel: { en: "team", ko: "team" } as L,
  teamTitle: { en: "One team, from direction to delivery", ko: "디렉션부터 납품까지, 하나의 팀" } as L,
  fastLabel: { en: "why us", ko: "why us" } as L,
  fastTitle: { en: "High quality, even on a tight deadline", ko: "촉박한 납기에도 높은 퀄리티" } as L,
};

const TEAM: { role: L; text: L }[] = [
  {
    role: { en: "Project Supervisor", ko: "프로젝트 수퍼바이저" },
    text: {
      en: "Owns the project end to end: schedule, quality standard, client communication and final sign-off.",
      ko: "일정, 퀄리티 기준, 클라이언트 커뮤니케이션과 최종 승인까지 프로젝트 전체를 책임집니다.",
    },
  },
  {
    role: { en: "Project Lead", ko: "프로젝트 리드" },
    text: {
      en: "Breaks the work down by shot, assigns it, sets the direction and reviews every delivery before it moves on.",
      ko: "작업을 샷 단위로 나눠 배분하고, 방향을 정하며, 전달되는 모든 결과물을 단계마다 검수합니다.",
    },
  },
  {
    role: { en: "Core Beauty", ko: "베이스 뷰티" },
    text: {
      en: "The in-house retouchers who carry the studio's look: skin, tone and contour that hold frame by frame.",
      ko: "스튜디오의 룩을 지키는 상주 리터처. 피부, 톤, 윤곽이 프레임 단위로 일관되게 이어지도록 작업합니다.",
    },
  },
  {
    role: { en: "Cleanup", ko: "클린업" },
    text: {
      en: "A cleanup team of around 30 available artists. Volume and deadlines scale up without waiting on a single desk.",
      ko: "약 30명의 가용 인원. 물량과 납기에 맞춰 한 사람의 속도에 묶이지 않고 규모를 키웁니다.",
    },
  },
];

const FAST: { title: L; text: L }[] = [
  {
    title: { en: "Work in parallel", ko: "병렬 작업" },
    text: {
      en: "Shots are split across the team and worked at the same time, so a large volume doesn't turn into a long wait.",
      ko: "샷을 팀 전체에 나눠 동시에 작업하므로, 물량이 많아도 기다리는 시간이 길어지지 않습니다.",
    },
  },
  {
    title: { en: "One look across every artist", ko: "작업자가 달라도 하나의 룩" },
    text: {
      en: "A test cut fixes the strength and direction first, and the lead keeps every artist inside it.",
      ko: "테스트 컷으로 강도와 방향을 먼저 확정하고, 리드가 모든 작업자를 그 기준 안에 맞춥니다.",
    },
  },
  {
    title: { en: "Review before delivery", ko: "납품 전 이중 검수" },
    text: {
      en: "Lead review and supervisor sign-off sit between the artist and you, however fast the schedule runs.",
      ko: "일정이 아무리 빨라도 작업자와 납품 사이에는 리드 검수와 수퍼바이저 승인이 있습니다.",
    },
  },
];

export default function Company() {
  const { t } = useLang();
  const { hash } = useLocation();
  // Jump to #beauty / #cleanup once the page has mounted (links from the landing page and old URLs).
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 450);
    return () => window.clearTimeout(timer);
  }, [hash]);
  return (
    <div className="service-page page-pad">
      <section className="service-hero">
        <h1 className="reveal-line">
          <motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.1 }}>
            Service
          </motion.span>
        </h1>
        <Reveal delay={0.35} className="service-lead">
          <p>{t(T.lead)}</p>
        </Reveal>
      </section>

      <section className="service-section">
        <Reveal className="service-section-head">
          <span className="eyebrow">{t(T.teamLabel)}</span>
          <h2>{t(T.teamTitle)}</h2>
        </Reveal>
        <div className="team-list">
          {TEAM.map((m, i) => (
            <Reveal key={m.role.en} delay={i * 0.08} className="team-row">
              <span className="process-index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{t(m.role)}</h3>
              </div>
              <p>{t(m.text)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="service-section service-approach">
        <Reveal className="service-section-head">
          <span className="eyebrow">{t(T.fastLabel)}</span>
          <h2>{t(T.fastTitle)}</h2>
        </Reveal>
        <div className="approach-list">
          {FAST.map((a, i) => (
            <Reveal key={a.title.en} delay={i * 0.1} className="approach-row">
              <h3>{t(a.title)}</h3>
              <p>{t(a.text)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ServiceBlock id="beauty" index="01 — beauty" content={BEAUTY} />
      <ServiceBlock id="cleanup" index="02 — cleanup" content={CLEANUP} />
      <Process />
    </div>
  );
}

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLang, type L } from "../i18n";
import Magnetic from "../components/Magnetic";
import { Reveal } from "./Services";
import { portfolioVideos, getVideoThumb } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

const T = {
  eyebrow: { en: "video beauty retouching & object cleanup", ko: "video beauty retouching & object cleanup" } as L,
  lines: {
    en: ["Perfection", "you can't see"],
    ko: ["티 나지 않는", "완벽함"],
  },
  lead: {
    en: "We refine skin and clear the frame so the work looks as if nothing was ever done. Natural, frame-accurate finishing for music videos, commercials and film.",
    ko: "피부는 다듬고 화면은 비워, 처음부터 아무것도 하지 않은 것처럼 보이게 합니다. 뮤직비디오, 광고, 영화를 위한 자연스럽고 프레임 단위로 정확한 마무리.",
  } as L,
  viewWork: { en: "View work", ko: "작업 보기" } as L,
  inquiry: { en: "Project inquiry", ko: "프로젝트 문의" } as L,
  servicesLabel: { en: "what we do", ko: "what we do" } as L,
  beautyText: {
    en: "Skin texture, blemishes, tone and contour, retouched to hold through every frame.",
    ko: "피부 결, 잡티, 톤, 윤곽을 모든 프레임에서 흔들리지 않게 보정합니다.",
  } as L,
  cleanupText: {
    en: "Rigs, logos, reflections and clutter removed, and the space rebuilt as if never touched.",
    ko: "장비, 로고, 반사, 잡물을 지우고 그 자리를 원래 그랬던 것처럼 복원합니다.",
  } as L,
  workLabel: { en: "selected work", ko: "selected work" } as L,
  all: { en: "All work", ko: "전체 보기" } as L,
  teamTitle: {
    en: "A supervised team that holds quality under tight deadlines.",
    ko: "촉박한 납기에서도 퀄리티를 지키는, 수퍼바이저가 이끄는 팀.",
  } as L,
  teamLink: { en: "About our service", ko: "서비스 소개" } as L,
  cta: { en: "Have a video to work on?", ko: "작업할 영상이 있다면" } as L,
};

export default function Landing() {
  const { lang, t } = useLang();
  const reduced = useReducedMotion();
  const lines = T.lines[lang];
  const featured = portfolioVideos.slice(0, 4);
  return (
    <div className="landing page-pad">
      <section className="landing-hero">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {t(T.eyebrow)}
        </motion.span>
        <h1>
          {lines.map((line, i) => (
            <span className="reveal-line" key={line}>
              <motion.span
                initial={{ y: reduced ? 0 : "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: reduced ? 0 : 1.1, ease, delay: reduced ? 0 : 0.15 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <Reveal delay={0.4} className="service-lead">
          <p>{t(T.lead)}</p>
        </Reveal>
        <Reveal delay={0.5} className="landing-actions">
          <Magnetic>
            <Link to="/work" className="glass-button">
              {t(T.viewWork)} <ArrowUpRight size={18} />
            </Link>
          </Magnetic>
          <Link to="/contact" className="landing-link">
            {t(T.inquiry)}
          </Link>
        </Reveal>
      </section>

      <section className="service-section">
        <Reveal className="service-section-head">
          <span className="eyebrow">{t(T.servicesLabel)}</span>
        </Reveal>
        <div className="landing-services">
          {[
            { to: "/beauty", name: "Beauty", text: T.beautyText },
            { to: "/cleanup", name: "Cleanup", text: T.cleanupText },
          ].map((s, i) => (
            <Reveal key={s.to} delay={i * 0.1}>
              <Link to={s.to} className="landing-service glass-card">
                <h2>{s.name}</h2>
                <p>{t(s.text)}</p>
                <ArrowUpRight size={22} />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="landing-work">
        <Reveal className="landing-work-head">
          <span className="eyebrow">{t(T.workLabel)}</span>
          <Link to="/work" className="landing-link">
            {t(T.all)} <ArrowUpRight size={14} />
          </Link>
        </Reveal>
        <div className="landing-thumbs">
          {featured.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.07}>
              <Link to="/work" className="landing-thumb" aria-label={v.title[lang]}>
                <img src={getVideoThumb(v)} alt="" loading="lazy" decoding="async" />
                <span>{v.title[lang]}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="landing-team">
        <p>{t(T.teamTitle)}</p>
        <Link to="/service" className="landing-link">
          {t(T.teamLink)} <ArrowUpRight size={14} />
        </Link>
      </Reveal>

      <Reveal className="service-cta">
        <p>{t(T.cta)}</p>
        <Magnetic>
          <Link to="/contact" className="glass-button">
            {t(T.inquiry)} <ArrowUpRight size={18} />
          </Link>
        </Magnetic>
      </Reveal>
    </div>
  );
}

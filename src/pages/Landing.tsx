import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import Logo from "../components/Logo";
import { ArrowUpRight } from "lucide-react";
import { useLang, type L } from "../i18n";
import { Reveal } from "./Services";
import { portfolioVideos, getVideoThumb } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

const T = {
  eyebrow: { en: "video beauty retouching & object cleanup", ko: "영상 뷰티 리터칭 · 오브젝트 클리닝" } as L,
  viewWork: { en: "View work", ko: "작업 보기" } as L,
  disciplines: { en: "two disciplines", ko: "two disciplines" } as L,
  beautyText: {
    en: "Skin texture, blemishes, tone and contour, held through every frame.",
    ko: "피부 결, 잡티, 톤, 윤곽을 모든 프레임에서 흔들리지 않게.",
  } as L,
  cleanupText: {
    en: "Rigs, logos, reflections and clutter removed, the space rebuilt.",
    ko: "장비, 로고, 반사, 잡물을 지우고 그 자리를 복원.",
  } as L,
  stats: [
    { value: 30, prefix: "~", label: { en: "partner cleanup artists available", ko: "파트너 Cleanup 가용 인원" } as L },
    { value: portfolioVideos.length, prefix: "", label: { en: "selected projects", ko: "선별 작업" } as L },
    { value: 4, prefix: "", label: { en: "layers from supervisor to artist", ko: "수퍼바이저부터 작업자까지 단계" } as L },
  ],
  workLabel: { en: "selected work", ko: "selected work" } as L,
  all: { en: "All work", ko: "전체 보기" } as L,
  team: {
    en: "Supervisor, lead, core beauty and a partner cleanup team. One pipeline that holds quality on tight deadlines.",
    ko: "수퍼바이저, 리드, 베이스 Beauty, 파트너 Cleanup 팀. 촉박한 납기에서도 퀄리티를 지키는 하나의 파이프라인.",
  } as L,
  teamLink: { en: "About our service", ko: "서비스 소개" } as L,
};

const ROLES: L[] = [
  { en: "Supervisor", ko: "수퍼바이저" },
  { en: "Lead", ko: "리드" },
  { en: "Beauty", ko: "Beauty" },
  { en: "Cleanup ×30", ko: "Cleanup ×30" },
];

// A wall of work drifting in opposite directions behind the wordmark.
const COLUMNS = 4;
function Wall() {
  const cols = Array.from({ length: COLUMNS }, (_, c) => {
    const items = portfolioVideos.filter((_, i) => i % COLUMNS === c);
    return items.length ? items : portfolioVideos.slice(0, 2);
  });
  return (
    <div className="wall" aria-hidden="true">
      {cols.map((items, c) => (
        <div className={`wall-col${c % 2 ? " is-up" : ""}`} key={c} style={{ animationDuration: `${46 + c * 7}s` }}>
          {[...items, ...items, ...items, ...items].map((v, i) => (
            <img key={i} src={getVideoThumb(v)} alt="" decoding="async" loading={i < 3 ? "eager" : "lazy"} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section className="landing-hero">
      <Wall />
      <div className="hero-center">
        <h1 className="sr-only">diap — Digital Apgujeong</h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
        >
          <Logo className="hero-logo" />
        </motion.div>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
        >
          {t(T.eyebrow)}
        </motion.p>
        <Reveal delay={0.6}>
          <Link to="/work" className="glass-button">
            {t(T.viewWork)} <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Count({ value, prefix }: { value: number; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);
  useEffect(() => {
    if (!inView || reduced) return;
    const c = animate(0, value, { duration: 1.4, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduced]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
    </span>
  );
}

export default function Landing() {
  const { lang, t } = useLang();
  const featured = portfolioVideos.slice(0, 7);
  return (
    <div className="landing">
      <div className="page-pad">
        <Hero />

        <section className="landing-index">
          <Reveal>
            <span className="eyebrow">{t(T.disciplines)}</span>
          </Reveal>
          {[
            { to: "/beauty", n: "01", name: "Beauty", text: T.beautyText },
            { to: "/cleanup", n: "02", name: "Cleanup", text: T.cleanupText },
          ].map((s, i) => (
            <Reveal key={s.to} delay={i * 0.08}>
              <Link to={s.to} className="index-row">
                <span className="index-n">{s.n}</span>
                <span className="index-name">{s.name}</span>
                <span className="index-text">{t(s.text)}</span>
                <ArrowUpRight className="index-arrow" size={28} />
              </Link>
            </Reveal>
          ))}
        </section>

        <section className="landing-stats">
          {T.stats.map((s, i) => (
            <Reveal key={s.label.en} delay={i * 0.1} className="stat">
              <strong>
                <Count value={s.value} prefix={s.prefix} />
              </strong>
              <span>{t(s.label)}</span>
            </Reveal>
          ))}
        </section>
      </div>

      <section className="landing-work">
        <Reveal className="landing-work-head page-pad">
          <span className="eyebrow">{t(T.workLabel)}</span>
          <Link to="/work" className="landing-link">
            {t(T.all)} <ArrowUpRight size={14} />
          </Link>
        </Reveal>
        <div className="landing-rail page-pad">
          {featured.map((v, i) => (
            <Link to="/work" className="rail-card" key={v.id} aria-label={v.title[lang]}>
              <span className="rail-img">
                <img src={getVideoThumb(v)} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="rail-meta">
                <em>{String(i + 1).padStart(2, "0")}</em>
                {v.title[lang]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-team page-pad">
        <Reveal className="team-flow" aria-hidden="true">
          {ROLES.map((r, i) => (
            <span key={r.en} className="team-node">
              {i > 0 && <i />}
              <b>{t(r)}</b>
            </span>
          ))}
        </Reveal>
        <Reveal>
          <p>{t(T.team)}</p>
          <Link to="/service" className="landing-link">
            {t(T.teamLink)} <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useLang, type L } from "../i18n";
import { Reveal } from "./Services";
import { ease, TITLE } from "../motion";
import Logo from "../components/Logo";

const T = {
  lead: {
    en: "DIAP is an app for retouching skin in video. It was built around K-pop music videos, where performers move hard and the camera rarely holds still, and Digital Apgujeong uses it on its own productions.",
    ko: "DIAP은 영상 속 인물의 피부를 보정하는 앱입니다. 인물이 크게 움직이고 카메라가 흔들리는 K-pop 뮤직비디오를 기준으로 만들었고, 디지털 압구정이 실제 작업에 쓰고 있습니다.",
  } as L,
  chips: [
    { en: "Public release in the first half of 2027", ko: "2027 상반기 공개 예정" },
    { en: "Windows · macOS", ko: "Windows · macOS" },
    { en: "In use at Digital Apgujeong", ko: "디지털 압구정 제작에 사용 중" },
  ] as L[],
  source: { en: "Source", ko: "원본" } as L,
  result: { en: "Result", ko: "결과" } as L,
  note: {
    en: "Illustration, not the actual interface",
    ko: "도식입니다. 실제 화면과 다릅니다",
  } as L,
  featuresLabel: { en: "what it does", ko: "what it does" } as L,
  featuresTitle: { en: "What DIAP does today", ko: "지금 DIAP이 하는 일" } as L,
  flowLabel: { en: "workflow", ko: "workflow" } as L,
  roadLabel: { en: "roadmap", ko: "roadmap" } as L,
  roadTitle: { en: "The road to release", ko: "공개까지의 계획" } as L,
};

const FEATURES: { key: string; name: L; text: L }[] = [
  {
    key: "track",
    name: { en: "Tracking", ko: "추적" },
    text: {
      en: "Follows faces through hard choreography and a moving camera. In group shots, people who cross paths or turn away come back as the same person.",
      ko: "격한 안무와 흔들리는 카메라에서도 얼굴을 따라갑니다. 군무에서 사람이 엇갈리거나 뒤돌았다 돌아와도 같은 사람으로 이어집니다.",
    },
  },
  {
    key: "skin",
    name: { en: "Skin retouching", ko: "피부 보정" },
    text: {
      en: "Texture, blemishes, lines, under-eye shadows, shine, redness and tone, set per person. Skin texture stays, and frames are computed in sequence so nothing flickers.",
      ko: "피부결, 잡티, 주름, 다크서클, 번들거림, 홍조, 톤을 인물마다 따로 조절합니다. 결은 남기고, 프레임 사이에 깜빡이지 않게 이어서 계산합니다.",
    },
  },
  {
    key: "color",
    name: { en: "Colour management", ko: "색 관리" },
    text: {
      en: "Built on OpenColorIO, so log footage loads as it is: S-Log3, LogC3/4, V-Log, DaVinci Wide Gamut. The colour transform applies to the viewer only and never to the render.",
      ko: "OpenColorIO 기반이라 Log 소스를 그대로 불러옵니다. S-Log3, LogC3/4, V-Log, DaVinci Wide Gamut에서 동작하고, 색 변환은 화면에만 적용되며 렌더에는 들어가지 않습니다.",
    },
  },
  {
    key: "delivery",
    name: { en: "Delivery", ko: "납품" },
    text: {
      en: "Renders to ProRes 422 HQ, 4444, 4444 XQ and OpenEXR. Pixels outside the retouched area keep their source values, timecode and colour tags are preserved, and an edit file (XML or EDL) brings in a whole music video at once.",
      ko: "ProRes 422 HQ · 4444 · 4444 XQ와 OpenEXR로 출력합니다. 보정한 곳 밖의 픽셀은 원본 값 그대로이고 타임코드와 색 태그를 유지하며, 편집 파일(XML · EDL)로 뮤직비디오 전체를 한 번에 불러옵니다.",
    },
  },
];

const FLOW: { title: L; text: L }[] = [
  {
    title: { en: "Add shots", ko: "컷 추가" },
    text: { en: "Drop in footage or an edit file.", ko: "영상 파일이나 편집 파일을 끌어다 놓습니다." },
  },
  {
    title: { en: "Analyse", ko: "분석" },
    text: {
      en: "People are found, and their faces and skin are tracked on every frame.",
      ko: "인물을 찾아 얼굴과 피부 영역을 프레임마다 추적합니다.",
    },
  },
  {
    title: { en: "Retouch", ko: "보정" },
    text: {
      en: "Set values per person with sliders and compare before and after straight away.",
      ko: "슬라이더로 인물마다 값을 정하고 전후를 바로 비교합니다.",
    },
  },
  {
    title: { en: "Render", ko: "렌더" },
    text: { en: "Export to ProRes or OpenEXR.", ko: "ProRes나 OpenEXR로 내보냅니다." },
  },
];

const ROAD: { status: L; now?: boolean; title: L; text: L }[] = [
  {
    status: { en: "Now", ko: "지금" },
    now: true,
    title: { en: "Skin retouching", ko: "피부 보정" },
    text: {
      en: "Working today, and used on Digital Apgujeong's own productions.",
      ko: "지금 동작하며, 디지털 압구정의 실제 작업에 쓰고 있습니다.",
    },
  },
  {
    status: { en: "Planned", ko: "예정" },
    title: { en: "Body retouching", ko: "몸매 보정" },
    text: {
      en: "Retouching for body lines is in preparation.",
      ko: "몸 라인을 다듬는 몸매 보정을 준비하고 있습니다.",
    },
  },
  {
    status: { en: "H1 2027", ko: "2027 상반기" },
    title: { en: "Public release", ko: "일반 공개" },
    text: {
      en: "Opening to everyone on Windows and macOS.",
      ko: "Windows와 macOS에서 누구나 쓸 수 있게 공개할 예정입니다.",
    },
  },
];

// ---------- schematic viewer (an illustration, deliberately not a screenshot) ----------
const CX = 480;
const CY = 212;
const RX = 104;
const RY = 138;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
const inFace = (x: number, y: number, k = 0.86) => ((x - CX) / RX) ** 2 + ((y - CY) / RY) ** 2 < k;
const nearFeature = (x: number, y: number) =>
  ((x - 438) / 30) ** 2 + ((y - 190) / 20) ** 2 < 1 ||
  ((x - 522) / 30) ** 2 + ((y - 190) / 20) ** 2 < 1 ||
  ((x - 480) / 40) ** 2 + ((y - 284) / 20) ** 2 < 1;

function scatter(seed: number, count: number, test: (x: number, y: number) => boolean) {
  const next = seeded(seed);
  const points: { x: number; y: number; r: number }[] = [];
  let guard = 0;
  while (points.length < count && guard++ < count * 40) {
    const x = CX - RX + next() * RX * 2;
    const y = CY - RY + next() * RY * 2;
    const r = next();
    if (test(x, y)) points.push({ x, y, r });
  }
  return points;
}
// Three people in frame (a group shot): the centre one large, the others smaller and slightly turned.
const FIGURES = [
  { id: "01", x: 480, y: 212, sx: 1, sy: 1, seed: 7, side: false },
  { id: "02", x: 214, y: 236, sx: 0.5, sy: 0.6, seed: 19, side: true },
  { id: "03", x: 752, y: 196, sx: 0.6, sy: 0.7, seed: 43, side: true },
].map((f) => ({
  ...f,
  pores: scatter(f.seed, f.side ? 120 : 230, (x, y) => inFace(x, y)),
  blemishes: scatter(f.seed + 24, f.side ? 14 : 22, (x, y) => inFace(x, y, 0.72) && !nearFeature(x, y)),
  transform: `translate(${f.x} ${f.y}) scale(${f.sx} ${f.sy}) translate(${-CX} ${-CY})`,
}));

const ring = (cx: number, cy: number, rx: number, ry: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as [number, number];
  });
// An egg-shaped outline: the lower half narrows toward the chin.
const CONTOUR = Array.from({ length: 34 }, (_, i) => {
  const a = (i / 34) * Math.PI * 2;
  const s = Math.sin(a);
  return [CX + RX * Math.cos(a) * (s > 0 ? 1 - 0.2 * s * s : 1), CY + RY * s] as [number, number];
});
const arc = (x0: number, x1: number, y: number, lift: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return [x0 + (x1 - x0) * t, y - lift * Math.sin(t * Math.PI)] as [number, number];
  });
const LANDMARKS: { points: [number, number][]; closed?: boolean }[] = [
  { points: CONTOUR, closed: true },
  { points: arc(408, 462, 166, 9, 5) },
  { points: arc(498, 552, 166, 9, 5) },
  { points: ring(438, 192, 20, 8, 8), closed: true },
  { points: ring(522, 192, 20, 8, 8), closed: true },
  { points: arc(480, 480, 198, 0, 4).map(([x], i) => [x, 198 + i * 14] as [number, number]) },
  { points: arc(461, 499, 248, -7, 5) },
  { points: ring(480, 284, 30, 10, 10), closed: true },
];
const path = (points: [number, number][], closed?: boolean) =>
  points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + (closed ? " Z" : "");

export function AppViewer() {
  const { t } = useLang();
  return (
    <figure className="app-figure">
      <div className="app-viewer" aria-hidden="true">
      <svg viewBox="0 0 960 420" preserveAspectRatio="xMidYMid slice">
        {FIGURES.map((f) => (
          <g key={f.id} transform={f.transform} className={f.side ? "viewer-side" : undefined}>
            <g className="viewer-pores">
              {f.pores.map((p, i) => (
                <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={(0.6 + p.r * 0.7).toFixed(2)} />
              ))}
            </g>
            <g className="viewer-mesh">
              {LANDMARKS.map((l, i) => (
                <path key={i} d={path(l.points, l.closed)} />
              ))}
            </g>
            <g className="viewer-points">
              {LANDMARKS.flatMap((l, i) =>
                l.points.map(([x, y], j) => (
                  <circle key={`${i}-${j}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.1" />
                )),
              )}
            </g>
            <g className="viewer-box">
              <path d="M352 68V52h16M592 52h16v16M608 356v16h-16M368 372h-16v-16" />
              <text x="352" y="40">{f.id}</text>
            </g>
          </g>
        ))}
      </svg>
      <svg className="viewer-before" viewBox="0 0 960 420" preserveAspectRatio="xMidYMid slice">
        {FIGURES.map((f) => (
          <g key={f.id} transform={f.transform} className={f.side ? "viewer-side" : undefined}>
            <g className="viewer-shine">
              <ellipse cx="480" cy="116" rx="38" ry="13" />
              <ellipse cx="480" cy="236" rx="9" ry="12" />
            </g>
            <g className="viewer-lines">
              <path d="M457 252c-5 8-7 16-6 24M503 252c5 8 7 16 6 24" />
              <path d="M420 208c11 6 25 6 36 1M504 209c11 5 25 5 36-1" />
              <path d="M440 132c26-5 54-5 80 0M448 144c21-4 43-4 64 0" />
            </g>
            <g className="viewer-blemishes">
              {f.blemishes.map((p, i) =>
                i % 4 === 0 ? (
                  <circle
                    key={i}
                    className="is-ring"
                    cx={p.x.toFixed(1)}
                    cy={p.y.toFixed(1)}
                    r={(3.2 + p.r * 2).toFixed(1)}
                  />
                ) : (
                  <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={(1.6 + p.r * 2.2).toFixed(1)} />
                ),
              )}
            </g>
          </g>
        ))}
      </svg>
        <span className="viewer-wipe" />
        <span className="viewer-tag is-a">{t(T.source)}</span>
        <span className="viewer-tag is-b">{t(T.result)}</span>
      </div>
      <figcaption>{t(T.note)}</figcaption>
    </figure>
  );
}

const DIAGRAMS: Record<string, ReactNode> = {
  track: (
    <svg viewBox="0 0 120 64">
      <path d="M10 14c34 0 66 36 100 36" />
      <path d="M10 50c34 0 66-36 100-36" strokeDasharray="3 4" />
      <circle cx="10" cy="14" r="4" className="is-fill" />
      <circle cx="110" cy="50" r="4" className="is-fill" />
      <circle cx="10" cy="50" r="4" />
      <circle cx="110" cy="14" r="4" />
    </svg>
  ),
  skin: (
    <svg viewBox="0 0 120 64">
      <rect x="18" y="8" width="84" height="48" rx="8" />
      <path d="M60 4v56" />
      <g className="is-fill">
        <circle cx="30" cy="22" r="2.6" />
        <circle cx="44" cy="40" r="3.4" />
        <circle cx="36" cy="46" r="1.8" />
        <circle cx="50" cy="20" r="2" />
        <circle cx="27" cy="36" r="1.6" />
      </g>
      <g className="is-dot">
        <circle cx="70" cy="20" r="0.9" />
        <circle cx="82" cy="30" r="0.9" />
        <circle cx="74" cy="42" r="0.9" />
        <circle cx="90" cy="46" r="0.9" />
        <circle cx="92" cy="18" r="0.9" />
        <circle cx="38" cy="30" r="0.9" />
        <circle cx="48" cy="48" r="0.9" />
      </g>
    </svg>
  ),
  color: (
    <svg viewBox="0 0 120 64">
      <path d="M16 6v50h92" />
      <path d="M16 46c26-16 54-24 92-28" strokeDasharray="3 4" />
      <path d="M16 56c34-2 40-44 92-48" />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 120 64">
      <rect x="8" y="10" width="22" height="30" rx="3" />
      <rect x="36" y="10" width="22" height="30" rx="3" />
      <rect x="64" y="10" width="22" height="30" rx="3" />
      <rect x="92" y="10" width="22" height="30" rx="3" className="is-fill" />
      <path d="M8 52h106M8 48v8M36 50v4M64 50v4M92 50v4M114 48v8" />
    </svg>
  ),
};

export default function AppPage() {
  const { t } = useLang();
  return (
    <div className="service-page app-page page-pad">
      <section className="service-hero app-hero">
        <h1 className="reveal-line" lang="en" translate="no">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: TITLE.duration, ease, delay: TITLE.delay }}
          >
            <Logo className="app-wordmark" />
          </motion.span>
        </h1>
        <Reveal delay={0.35} className="service-lead">
          <p>{t(T.lead)}</p>
        </Reveal>
        <Reveal delay={0.45}>
          <ul className="app-chips">
            {T.chips.map((chip, i) => (
              <li key={chip.en} className={i === 0 ? "is-strong" : undefined}>
                {t(chip)}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.55} className="app-hero-visual">
          <AppViewer />
        </Reveal>
      </section>

      <section className="service-section">
        <Reveal className="service-section-head">
          <span className="eyebrow">{t(T.featuresLabel)}</span>
          <h2>{t(T.featuresTitle)}</h2>
        </Reveal>
        <div className="app-features">
          {FEATURES.map((f, i) => (
            <Reveal key={f.key} delay={(i % 2) * 0.08} className="app-feature glass-card">
              <span className="app-diagram" aria-hidden="true">
                {DIAGRAMS[f.key]}
              </span>
              <h3>{t(f.name)}</h3>
              <p>{t(f.text)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="service-section">
        <Reveal className="service-section-head">
          <span className="eyebrow">{t(T.flowLabel)}</span>
        </Reveal>
        <div className="process-list">
          {FLOW.map((step, i) => (
            <Reveal key={step.title.en} delay={i * 0.08} className="process-step">
              <span className="process-index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="service-section app-road">
        <Reveal className="service-section-head">
          <span className="eyebrow">{t(T.roadLabel)}</span>
          <h2>{t(T.roadTitle)}</h2>
        </Reveal>
        <div className="app-road-list">
          {ROAD.map((r, i) => (
            <Reveal key={r.title.en} delay={i * 0.08} className="app-road-row">
              <span className={`app-status${r.now ? " is-now" : ""}`}>{t(r.status)}</span>
              <h3>{t(r.title)}</h3>
              <p>{t(r.text)}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

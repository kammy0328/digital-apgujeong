import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { portfolioVideos } from "../data/portfolio";

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight")
        setSelected((i) =>
          i === null ? null : (i + 1) % portfolioVideos.length,
        );
      if (e.key === "ArrowLeft")
        setSelected((i) =>
          i === null
            ? null
            : (i - 1 + portfolioVideos.length) % portfolioVideos.length,
        );
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
      lastTrigger.current?.focus();
    };
  }, [selected === null]);
  const openVideo = (index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setSelected(index);
  };
  return (
    <>
      <section className="hero page-pad">
        <div className="hero-kicker">
          <span>
            <i className="status-dot" /> DIGITAL POST-PRODUCTION STUDIO
          </span>
          <span>SEOUL, KR ↗</span>
        </div>
        <h1>
          Beyond the
          <br />
          <span className="hero-second">
            ordinary<span className="hero-asterisk">✳︎</span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p>
            장면의 본질은 그대로.
            <br />
            디테일은, 그 이상으로.
          </p>
          <p className="hero-description">
            영상 뷰티 리터칭부터 오브젝트 클리닝까지.
            <br />
            당신의 크리에이티브에 마지막 완성도를 더합니다.
          </p>
          <a href="#work" className="round-link" aria-label="작업 영상 보기">
            <ArrowDown />
          </a>
        </div>
      </section>
      <section className="featured-film page-pad" aria-label="대표 작업 영상">
        <button
          className="feature-button"
          onClick={(e) => openVideo(1, e.currentTarget)}
          aria-label="BLACKPINK - 뛰어 영상 재생"
        >
          <img
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
            src="https://img.youtube.com/vi/CgCVZdcKcqY/maxresdefault.jpg"
            alt="BLACKPINK 뛰어 뮤직비디오"
            fetchPriority="high"
          />
          <span className="film-shade" />
          <span className="film-fallback" aria-hidden="true">
            BLACKPINK
            <br />
            <em>뛰어.</em>
          </span>
          <span className="film-label">
            IN THE DETAILS,
            <br />
            WE MAKE A DIFFERENCE.
          </span>
          <span className="film-play">
            <Play fill="currentColor" size={20} />
          </span>
          <span className="film-caption">
            <span>FEATURED PROJECT — BLACKPINK</span>
            <span>WATCH FILM ↗</span>
          </span>
        </button>
        <div className="film-footnote">
          <span>INVISIBLE WORK. VISIBLE DIFFERENCE.</span>
          <span>BEAUTY RETOUCHING / OBJECT CLEANUP</span>
        </div>
      </section>
      <section id="work" className="work-section page-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2>
              Made to
              <br />
              <em>look effortless.</em>
            </h2>
          </div>
          <p>
            가장 자연스러운 순간 뒤에,
            <br />
            우리의 섬세한 작업이 있습니다.
          </p>
        </div>
        <div className="work-toolbar">
          <span className="active-filter">
            전체 작업{" "}
            <span>{String(portfolioVideos.length).padStart(2, "0")}</span>
          </span>
          <span>MUSIC VIDEO & VISUAL</span>
        </div>
        <div className="work-grid">
          {portfolioVideos
            .slice(0, expanded ? undefined : 4)
            .map((video, index) => (
              <button
                className="work-card"
                key={video.id}
                onClick={(e) => openVideo(index, e.currentTarget)}
              >
                <div className="work-image">
                  <span className="thumbnail-fallback" aria-hidden="true">
                    {video.title.split(" - ")[0]}
                    <span>PLAY THE FILM ↗</span>
                  </span>
                  <img
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                    loading="lazy"
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={`${video.title} 영상 스틸`}
                  />
                  <span className="work-number">
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="work-play">
                    <Play size={20} fill="currentColor" />
                  </span>
                </div>
                <div className="work-info">
                  <h3>{video.title}</h3>
                  <ArrowUpRight size={21} />
                </div>
                <p>
                  MUSIC VIDEO <span>POST-PRODUCTION</span>
                </p>
              </button>
            ))}
        </div>
        <button className="more-work" onClick={() => setExpanded(!expanded)}>
          {expanded ? "간략히 보기" : "모든 작업 보기"}{" "}
          <span>{expanded ? "−" : "+"}</span>
        </button>
      </section>
      <section className="services-section page-pad">
        <div className="services-intro">
          <span className="eyebrow">02 / WHAT WE DO</span>
          <h2>
            A little less.
            <br />
            <em>A lot better.</em>
          </h2>
          <p>
            덜어낼 것은 덜어내고,
            <br />
            남겨야 할 아름다움은 더 선명하게.
          </p>
          <Link to="/about/company" className="text-link">
            스튜디오 알아보기 <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="service-list">
          <article>
            <span>01</span>
            <div>
              <h3>Beauty retouching</h3>
              <h4>영상 뷰티 리터칭</h4>
              <p>
                피부 본연의 질감과 표정은 살리고, 조명과 움직임에 맞춰
                자연스러운 아름다움을 완성합니다.
              </p>
              <div className="service-tags">
                <span>SKIN</span>
                <span>FACE & BODY</span>
                <span>FRAME BY FRAME</span>
              </div>
            </div>
            <ArrowUpRight />
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Object cleanup</h3>
              <h4>오브젝트 클리닝</h4>
              <p>
                화면 속 불필요한 요소를 지우고 배경을 복원해, 시선이 머물러야 할
                곳에 집중하게 합니다.
              </p>
              <div className="service-tags">
                <span>REMOVAL</span>
                <span>BACKGROUND</span>
                <span>DETAIL</span>
              </div>
            </div>
            <ArrowUpRight />
          </article>
        </div>
      </section>
      <div className="statement-strip" aria-hidden="true">
        <span>EVERY FRAME MATTERS. ✳︎ EVERY DETAIL COUNTS. ✳︎</span>
      </div>
      {selected !== null && (
        <div className="video-overlay" onClick={() => setSelected(null)}>
          <div
            className="video-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={portfolioVideos[selected].title}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                const nodes = Array.from(
                  e.currentTarget.querySelectorAll("button, iframe"),
                ) as HTMLElement[];
                const first = nodes[0],
                  last = nodes[nodes.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <div className="video-top">
              <span>
                SELECTED WORK / {String(selected + 1).padStart(2, "0")}
              </span>
              <button
                ref={closeRef}
                aria-label="영상 닫기"
                onClick={() => setSelected(null)}
              >
                <X />
              </button>
            </div>
            <iframe
              key={portfolioVideos[selected].id}
              src={`https://www.youtube.com/embed/${portfolioVideos[selected].id}?autoplay=1&rel=0`}
              title={portfolioVideos[selected].title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <div className="video-bottom">
              <h2>{portfolioVideos[selected].title}</h2>
              <div>
                <button
                  aria-label="이전 영상"
                  onClick={() =>
                    setSelected(
                      (selected - 1 + portfolioVideos.length) %
                        portfolioVideos.length,
                    )
                  }
                >
                  <ChevronLeft />
                </button>
                <button
                  aria-label="다음 영상"
                  onClick={() =>
                    setSelected((selected + 1) % portfolioVideos.length)
                  }
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play, X } from "lucide-react";
import {
  portfolioVideos,
  getVideoEmbedUrl,
  getVideoPoster,
} from "../data/portfolio";

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      trigger.current?.focus();
    };
  }, [selected]);
  return (
    <>
      <section className="work-intro page-pad">
        <div>
          <span className="eyebrow">DIGITAL APGUJEONG</span>
          <h1>
            Post-production.
            <br />
            Invisible by design.
          </h1>
        </div>
        <div className="intro-note">
          <p>
            Beauty retouching & object cleanup.
            <br />
            Film, commercial, music video.
          </p>
          <a href="#work">Selected work ↓</a>
        </div>
      </section>
      <section
        id="work"
        className="work-section page-pad"
        aria-label="포트폴리오"
      >
        <div className="section-bar">
          <h2>Selected work</h2>
          <span>
            {String(portfolioVideos.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
        <div className="work-grid">
          {portfolioVideos.map((video, index) => (
            <button
              key={video.id}
              className="work-card"
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setSelected(index);
              }}
              aria-label={`${video.title} 영상 재생`}
            >
              <div className="work-image">
                <span className="image-fallback" aria-hidden="true">
                  {video.title.split(" - ")[0]}
                </span>
                {getVideoPoster(video) && (
                  <img
                    loading={index === 0 ? "eager" : "lazy"}
                    src={getVideoPoster(video)}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.style.opacity = "0";
                    }}
                  />
                )}
                <span className="work-play">
                  <Play size={18} fill="currentColor" />
                </span>
                <span className="frame-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="work-info">
                <h3>{video.title}</h3>
                <span>{video.category}</span>
                <ArrowUpRight size={16} />
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="studio-summary page-pad">
        <span className="eyebrow">THE FINISHING DETAILS</span>
        <div>
          <h2>
            장면에 집중하고,
            <br />
            흔적은 남기지 않습니다.
          </h2>
          <p>
            피부의 질감과 인물의 개성을 살리는 뷰티 리터칭.
            <br />
            불필요한 요소를 지우고 장면을 복원하는 오브젝트 클리닝.
            <br />
            디지털 압구정은 프레임마다 필요한 디테일을 완성합니다.
          </p>
          <Link to="/about/company" className="text-link">
            About the studio <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="service-index">
          <span>01 — Beauty retouching</span>
          <span>02 — Object cleanup</span>
        </div>
      </section>
      {selected !== null && (
        <div className="video-overlay" onClick={() => setSelected(null)}>
          <div
            className="video-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={portfolioVideos[selected].title}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const nodes = Array.from(
                event.currentTarget.querySelectorAll("button, iframe"),
              ) as HTMLElement[];
              const first = nodes[0],
                last = nodes[nodes.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
              }
            }}
          >
            <div className="video-top">
              <span>{portfolioVideos[selected].title}</span>
              <button
                ref={closeButton}
                onClick={() => setSelected(null)}
                aria-label="영상 닫기"
              >
                <X />
              </button>
            </div>
            <iframe
              src={getVideoEmbedUrl(portfolioVideos[selected])}
              title={portfolioVideos[selected].title}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

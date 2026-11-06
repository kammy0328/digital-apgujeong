import { useEffect, useRef, useState } from "react";
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
        <h1>
          Beauty <span>&</span> Cleanup
        </h1>
        <p>Film / Commercial / Music video</p>
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
                    loading={index < 3 ? "eager" : "lazy"}
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

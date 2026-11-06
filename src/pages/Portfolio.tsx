import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { portfolioVideos, getVideoEmbedUrl, getVideoPoster } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

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

  const video = selected !== null ? portfolioVideos[selected] : null;

  return (
    <>
      <section className="work-intro page-pad">
        <h1 className="reveal-line">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
          >
            Beauty <em>&</em> Cleanup
          </motion.span>
        </h1>
      </section>

      <section className="work-grid" aria-label="포트폴리오">
        {portfolioVideos.map((item, index) => {
          const poster = getVideoPoster(item);
          return (
            <motion.button
              key={item.id}
              className="work-card"
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setSelected(index);
              }}
              aria-label={`${item.title} 영상 재생`}
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, ease, delay: (index % 4) * 0.07 }}
            >
              <span className="work-image">
                <span className="image-fallback" aria-hidden="true">
                  {item.title.split(" - ")[0]}
                </span>
                {poster && (
                  <img
                    loading={index < 4 ? "eager" : "lazy"}
                    src={poster}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.style.opacity = "0";
                    }}
                  />
                )}
                <span className="work-overlay" aria-hidden="true">
                  <span className="work-title">
                    {item.title.split(" ").map((word, i) => (
                      <span className="word" key={i}>
                        <span style={{ "--i": i } as CSSProperties}>{word}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </motion.button>
          );
        })}
      </section>

      <AnimatePresence>
        {video && (
          <motion.div
            className="video-overlay"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="video-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={video.title}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
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
                <span>{video.title}</span>
                <button ref={closeButton} onClick={() => setSelected(null)} aria-label="영상 닫기">
                  <X size={20} />
                </button>
              </div>
              <iframe
                src={getVideoEmbedUrl(video)}
                title={video.title}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { createPortal, flushSync } from "react-dom";
import { useLang } from "../i18n";
import {
  portfolioVideos,
  getVideoEmbedUrl,
  getVideoPoster,
} from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;
type Frame = { left: number; top: number; width: number; height: number };
function playerFrame(): Frame {
  const width = Math.min(
    1200,
    window.innerWidth - 28,
    ((window.innerHeight - 140) * 16) / 9,
  );
  const height = (width * 9) / 16;
  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2 + 12,
    width,
    height,
  };
}

export default function Portfolio() {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [origin, setOrigin] = useState<Frame | null>(null);
  const [target, setTarget] = useState<Frame | null>(null);
  const playbackAllowed = useRef(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const close = () => {
    playbackAllowed.current = false;
    const rect = trigger.current
      ?.querySelector(".work-image")
      ?.getBoundingClientRect();
    if (rect)
      setOrigin({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    // Unmount the player before AnimatePresence retains the exiting frame.
    flushSync(() => setReady(false));
    setOpen(false);
  };

  useEffect(() => {
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const resize = () => setTarget(playerFrame());
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      trigger.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  const video = selected !== null ? portfolioVideos[selected] : null;
  const poster = video ? getVideoPoster(video) : undefined;
  const duration = reduced ? 0 : 0.46;
  return (
    <>
      <section className="work-intro page-pad">
        <h1 className="reveal-line">
          <motion.span
            initial={{ y: reduced ? 0 : "105%" }}
            animate={{ y: 0 }}
            transition={{
              duration: reduced ? 0 : 1,
              ease,
              delay: reduced ? 0 : 0.1,
            }}
          >
            Beauty <em>&</em> Cleanup
          </motion.span>
        </h1>
      </section>
      <section
        className="work-grid"
        aria-label={lang === "ko" ? "포트폴리오" : "Portfolio"}
      >
        {portfolioVideos.map((item, index) => (
          <motion.button
            key={item.id}
            className="work-card"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              const rect = event.currentTarget
                .querySelector(".work-image")!
                .getBoundingClientRect();
              setOrigin({
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
              });
              playbackAllowed.current = true;
              setTarget(playerFrame());
              setReady(false);
              setSelected(index);
              setOpen(true);
            }}
            aria-label={
              lang === "ko" ? `${item.title} 영상 재생` : `Play ${item.title}`
            }
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: reduced ? 0 : 0.6,
              ease,
              delay: reduced ? 0 : (index % 4) * 0.05,
            }}
          >
            <span className="work-image">
              <span className="image-fallback" aria-hidden="true">
                {item.title.split(" - ")[0]}
              </span>
              {getVideoPoster(item) && (
                <img
                  loading={index < 4 ? "eager" : "lazy"}
                  src={getVideoPoster(item)}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.style.opacity = "0";
                  }}
                />
              )}
              <span className="work-overlay" aria-hidden="true">
                <span className="work-title">{item.title}</span>
              </span>
            </span>
          </motion.button>
        ))}
      </section>
      {createPortal(
        <AnimatePresence onExitComplete={() => setSelected(null)}>
          {open && video && origin && target && (
            <motion.div
              className="video-overlay"
              onClick={close}
              initial={{
                backgroundColor: "rgba(6,6,6,0)",
                backdropFilter: "blur(0px)",
              }}
              animate={{
                backgroundColor: "rgba(6,6,6,0.86)",
                backdropFilter: "blur(12px)",
              }}
              exit={{
                backgroundColor: "rgba(6,6,6,0)",
                backdropFilter: "blur(0px)",
              }}
              transition={{ duration }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={video.title}
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
                  } else if (
                    !event.shiftKey &&
                    document.activeElement === last
                  ) {
                    event.preventDefault();
                    first.focus();
                  }
                }}
              >
                <motion.div
                  className="video-top video-morph-top"
                  style={{
                    left: target.left,
                    top: target.top - 52,
                    width: target.width,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <span>{video.title}</span>
                  <button
                    ref={closeButton}
                    onClick={close}
                    aria-label={lang === "ko" ? "영상 닫기" : "Close video"}
                  >
                    <X size={20} />
                  </button>
                </motion.div>
                <motion.div
                  className="video-morph-frame"
                  initial={{ ...origin, borderRadius: 10 }}
                  animate={{ ...target, borderRadius: 8 }}
                  exit={{ ...origin, borderRadius: 10 }}
                  transition={{ duration, ease }}
                  onAnimationComplete={() => {
                    if (playbackAllowed.current) setReady(true);
                  }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <span className="image-fallback" aria-hidden="true">
                    {video.title.split(" - ")[0]}
                  </span>
                  {poster && (
                    <img
                      className="video-poster"
                      src={poster}
                      alt=""
                      onError={(event) => {
                        event.currentTarget.style.opacity = "0";
                      }}
                    />
                  )}
                  {ready && (
                    <iframe
                      className="video-player"
                      src={getVideoEmbedUrl(video)}
                      title={video.title}
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { createPortal, flushSync } from "react-dom";
import { useLang } from "../i18n";
import {
  portfolioVideos,
  getVideoEmbedUrl,
  getVideoPoster,
  getVideoThumb,
  getVideoTiny,
  type PortfolioVideo,
} from "../data/portfolio";
import { ease, TITLE } from "../motion";
import EmbeddedVideo from "../components/EmbeddedVideo";

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

// Animate the player with transforms only (no per-frame layout): it is laid out at its final size
// and starts scaled down onto the clicked card.
function flip(origin: Frame, target: Frame) {
  const scale = origin.width / target.width;
  return {
    x: origin.left - target.left,
    y: origin.top - target.top,
    scale,
    borderRadius: 10 / scale,
  };
}

const preloaded = new Set<string>();
function preloadPoster(video: Parameters<typeof getVideoPoster>[0]) {
  const url = getVideoPoster(video);
  if (!url || preloaded.has(url)) return;
  preloaded.add(url);
  new Image().src = url;
}

// Cards wait (up to 1.5s) for the first screen's tiny blurred previews, then ripple in; each card
// then sharpens by cross-fading from its blurred preview to the full image. Only opacity animates.
const FIRST_SCREEN = 8;
const WAVE_STEP = 0.08;
const WAVE_TIMEOUT = 1500;
let waveDone = false;

function loadImage(url?: string) {
  return new Promise<void>((resolve) => {
    if (!url) return resolve();
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = url;
  });
}

function WorkThumb({
  item,
  index,
  lang,
  wave,
  reduced,
}: {
  item: PortfolioVideo;
  index: number;
  lang: "en" | "ko";
  wave: boolean;
  reduced: boolean | null;
}) {
  const sharpImg = useRef<HTMLImageElement>(null);
  const [sharp, setSharp] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (sharpImg.current?.complete && sharpImg.current.naturalWidth) setSharp(true);
  }, []);

  // Diagonal stagger (column + row), capped so late rows don't lag.
  const delay = reduced ? 0 : Math.min((index % 4) + Math.floor(index / 4), 6) * WAVE_STEP;
  const tiny = getVideoTiny(item);
  const full = getVideoThumb(item);
  return (
    <span className={`work-image${wave && sharp ? " is-sharp" : ""}`}>
      {failed && (
        <span className="image-fallback" aria-hidden="true">
          {item.title[lang].split(" - ")[0]}
        </span>
      )}
      {tiny && (
        <img
          className="work-tiny"
          src={tiny}
          alt=""
          aria-hidden="true"
          decoding="async"
          style={{
            opacity: wave ? 1 : undefined,
            // opacity first, then the blur and zoom ease out together with the sharp image's fade-in
            transitionDelay: `${delay}s, ${delay + 0.3}s, ${delay + 0.3}s`,
          }}
        />
      )}
      {full && (
        <img
          ref={sharpImg}
          className="work-sharp"
          loading={index < FIRST_SCREEN ? "eager" : "lazy"}
          decoding="async"
          src={full}
          alt={item.title[lang]}
          onLoad={() => setSharp(true)}
          onError={() => setFailed(true)}
          style={{ opacity: wave && sharp ? 1 : undefined, transitionDelay: `${delay + 0.3}s` }}
        />
      )}
      <span className="work-overlay" aria-hidden="true">
        <span className="work-title">{item.title[lang]}</span>
      </span>
    </span>
  );
}

export default function Portfolio() {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [hd, setHd] = useState(false);
  const [origin, setOrigin] = useState<Frame | null>(null);
  const [target, setTarget] = useState<Frame | null>(null);
  const [wave, setWave] = useState(waveDone);
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
    if (waveDone) return;
    let live = true;
    const previews = Promise.all(
      portfolioVideos.slice(0, FIRST_SCREEN).map((v) => loadImage(getVideoTiny(v))),
    );
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, WAVE_TIMEOUT));
    Promise.race([previews, timeout]).then(() => {
      waveDone = true;
      if (live) setWave(true);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("player-open");
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const resize = () => setTarget(playerFrame());
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove("player-open");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      trigger.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  const video = selected !== null ? portfolioVideos[selected] : null;
  const poster = video ? getVideoPoster(video) : undefined;
  const thumb = video ? getVideoThumb(video) : undefined;
  const duration = reduced ? 0 : 0.46;
  return (
    <>
      <section className="work-intro page-pad">
        <h1 className="reveal-line" lang="en" translate="no">
          <motion.span
            initial={{ y: reduced ? 0 : "105%" }}
            animate={{ y: 0 }}
            transition={{
              duration: reduced ? 0 : TITLE.duration,
              ease,
              delay: reduced ? 0 : TITLE.delay,
            }}
          >
            WORK
          </motion.span>
        </h1>
      </section>
      <section
        className="work-grid"
        aria-label={lang === "ko" ? "포트폴리오" : "Portfolio"}
      >
        {portfolioVideos.map((item, index) => (
          <button
            key={item.id}
            className="work-card"
            onPointerEnter={() => preloadPoster(item)}
            onFocus={() => preloadPoster(item)}
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
              setHd(false);
              setSelected(index);
              setOpen(true);
            }}
            aria-label={
              lang === "ko"
                ? `${item.title.ko} 영상 재생`
                : `Play ${item.title.en}`
            }
          >
            <WorkThumb item={item} index={index} lang={lang} wave={wave} reduced={reduced} />
          </button>
        ))}
      </section>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence onExitComplete={() => setSelected(null)}>
            {open && video && origin && target && (
              <div className="video-overlay" onClick={close}>
                <motion.div
                  className="video-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration }}
                />
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-label={video.title[lang]}
                  onKeyDown={(event) => {
                    if (event.key !== "Tab") return;
                    const nodes = Array.from(
                      event.currentTarget.querySelectorAll(
                        'button, a[href], iframe:not([tabindex="-1"])',
                      ),
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
                    <span>{video.title[lang]}</span>
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
                    style={{
                      left: target.left,
                      top: target.top,
                      width: target.width,
                      height: target.height,
                      transformOrigin: "0 0",
                    }}
                    initial={flip(origin, target)}
                    animate={{ x: 0, y: 0, scale: 1, borderRadius: 8 }}
                    exit={flip(origin, target)}
                    transition={{ duration, ease }}
                    onAnimationComplete={() => {
                      if (playbackAllowed.current) setReady(true);
                    }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <span className="image-fallback" aria-hidden="true">
                      {video.title[lang].split(" - ")[0]}
                    </span>
                    {thumb && (
                      <img className="video-poster" src={thumb} alt="" />
                    )}
                    {poster && (
                      <img
                        className="video-poster video-poster-hd"
                        src={poster}
                        alt=""
                        decoding="async"
                        style={{ opacity: hd ? 1 : 0 }}
                        onLoad={() => setHd(true)}
                      />
                    )}
                    {ready && (
                      <EmbeddedVideo
                        src={getVideoEmbedUrl(video)}
                        title={video.title[lang]}
                        watchUrl={
                          video.vimeoUrl ||
                          `https://www.youtube.com/watch?v=${video.youtubeId}`
                        }
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../i18n";

// Keep the poster visible until the cross-origin player has actually initialized.
export default function EmbeddedVideo({
  src,
  title,
  watchUrl,
}: {
  src: string;
  title: string;
  watchUrl: string;
}) {
  const { t } = useLang();
  const frame = useRef<HTMLIFrameElement>(null);
  const documentLoaded = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const url = useMemo(() => {
    const value = new URL(src);
    if (value.hostname === "www.youtube.com")
      value.searchParams.set("origin", window.location.origin);
    return value;
  }, [src]);
  const ping = () => {
    const target = frame.current?.contentWindow;
    if (!target || !documentLoaded.current) return;
    target.postMessage(
      JSON.stringify(
        url.hostname === "player.vimeo.com"
          ? { method: "ping" }
          : { event: "listening", id: "diap-player", channel: "widget" },
      ),
      url.origin,
    );
  };
  useEffect(() => {
    let settled = false;
    let firstPaint = 0,
      secondPaint = 0;
    const accept = (event: MessageEvent) => {
      if (
        settled ||
        event.origin !== url.origin ||
        event.source !== frame.current?.contentWindow
      )
        return;
      let data = event.data;
      try {
        if (typeof data === "string") data = JSON.parse(data);
      } catch {
        return;
      }
      if (!data || typeof data !== "object") return;
      const vimeo = url.hostname === "player.vimeo.com";
      const ready = vimeo
        ? data.event === "ready" ||
          data.event === "loaded" ||
          data.method === "ping"
        : data.event === "onReady" || data.event === "initialDelivery";
      const error = vimeo ? data.event === "error" : data.event === "onError";
      if (!ready && !error) return;
      settled = true;
      clearInterval(interval);
      clearTimeout(timeout);
      if (error) {
        setFailed(true);
        return;
      }
      firstPaint = requestAnimationFrame(() => {
        secondPaint = requestAnimationFrame(() => setLoaded(true));
      });
    };
    window.addEventListener("message", accept);
    const interval = window.setInterval(ping, 250);
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      clearInterval(interval);
      setFailed(true);
    }, 12000);
    ping();
    return () => {
      window.removeEventListener("message", accept);
      clearInterval(interval);
      clearTimeout(timeout);
      cancelAnimationFrame(firstPaint);
      cancelAnimationFrame(secondPaint);
    };
  }, [url]);
  return (
    <>
      {!failed && (
        <iframe
          ref={frame}
          className={`video-player${loaded ? " is-ready" : ""}`}
          src={url.toString()}
          title={title}
          onLoad={() => {
            documentLoaded.current = true;
            ping();
          }}
          tabIndex={loaded ? 0 : -1}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
      {!loaded && !failed && (
        <span className="video-loading" role="status">
          {t({ ko: "영상을 불러오는 중", en: "Loading video" })}
        </span>
      )}
      {failed && (
        <div className="video-load-error" role="alert">
          <p>
            {t({
              ko: "영상을 불러오지 못했습니다.",
              en: "The video could not be loaded.",
            })}
          </p>
          <a href={watchUrl} target="_blank" rel="noopener noreferrer">
            {t({ ko: "원본 영상 보기 ↗", en: "Watch original video ↗" })}
          </a>
        </div>
      )}
    </>
  );
}

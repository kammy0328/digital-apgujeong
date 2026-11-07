import type { L } from "../i18n";

export interface PortfolioVideo {
  id: string;
  title: L;
  /** Upload/release date (YYYY-MM-DD). Newest first; videos without a date go last until it is known. */
  date?: string;
  youtubeId?: string;
  /** Full Vimeo link, including the privacy hash for unlisted videos. */
  vimeoUrl?: string;
  /** Local still image or an approved image URL. */
  poster?: string;
}

const videos: PortfolioVideo[] = [
  { id: "beomgyu", youtubeId: "3y743h28quI", title: { ko: "TXT 범규 - I Love You", en: "TXT Beomgyu - I Love You" } },
  { id: "blackpink", youtubeId: "CgCVZdcKcqY", title: { ko: "블랙핑크 - 뛰어", en: "BLACKPINK - JUMP" } },
  { id: "xiaoting", youtubeId: "61mQuZDp450", title: { ko: "케플러 샤오팅 - LEGEND", en: "Kep1er Xiaoting - LEGEND" } },
  { id: "memi", youtubeId: "i_-pZiZJ7MQ", date: "2026-04-29", title: { ko: "매미 - BADidea", en: "MEMI - BADidea" } },
  { id: "matthew", youtubeId: "nZS9J20OWog", date: "2026-05-28", title: { ko: "제로베이스원 석매튜 - Love Ain't Easy", en: "ZEROBASEONE Seok Matthew - Love Ain't Easy" } },
  { id: "hanbin", youtubeId: "AkP6v3sMyh8", date: "2026-06-13", title: { ko: "제로베이스원 성한빈 - Pretender", en: "ZEROBASEONE Han Bin - Pretender" } },
  { id: "dragonpony", youtubeId: "oKzPAN7JXVo", date: "2026-11-05", title: { ko: "드래곤포니 - Calling back", en: "Dragon Pony - Calling back" } },
  { id: "rescene", youtubeId: "pey3E47eSc8", date: "2026-11-03", title: { ko: "리센느 - With", en: "RESCENE - With" } },
  { id: "illit", youtubeId: "V2V9-9VhYJo", date: "2026-10-26", title: { ko: "아일릿 - 체포하겠어", en: "ILLIT - You’re Under Arrest" } },
  { id: "leechangsub", youtubeId: "9lNp4h06dpc", date: "2026-09-18", title: { ko: "이창섭 - 사계, 그리고 너", en: "LEECHANGSUB - 사계, 그리고 너" } },
  { id: "keyveatz", youtubeId: "rt7fIlko0CM", title: { ko: "키비츠 - A1ㄱ", en: "Keyveatz - A1ㄱ" } },
];

// Newest first; undated videos keep their relative order after the dated ones.
export const portfolioVideos: PortfolioVideo[] = videos
  .map((video, index) => ({ video, index }))
  .sort((a, b) => {
    if (a.video.date && b.video.date) return b.video.date.localeCompare(a.video.date);
    if (a.video.date) return -1;
    if (b.video.date) return 1;
    return a.index - b.index;
  })
  .map(({ video }) => video);

export function getVideoEmbedUrl(video: PortfolioVideo): string {
  if (video.vimeoUrl) {
    const url = new URL(video.vimeoUrl);
    if (
      !["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)
    )
      throw new Error("Unsupported Vimeo host");
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[0] === "video" ? parts[1] : parts[0];
    if (!/^\d+$/.test(id || "")) throw new Error("Invalid Vimeo video ID");
    const embed = new URL(`https://player.vimeo.com/video/${id}`);
    const hash =
      url.searchParams.get("h") ||
      (parts[0] !== "video" ? parts[1] : undefined);
    if (hash) embed.searchParams.set("h", hash);
    embed.searchParams.set("autoplay", "1");
    embed.searchParams.set("dnt", "1");
    return embed.toString();
  }
  return `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
}

/** Card-sized still (640px WebP). YouTube bakes 4:3 letterbox bars into it; the card's object-fit: cover crops them off. */
export function getVideoThumb(video: PortfolioVideo): string | undefined {
  return (
    video.poster ||
    (video.youtubeId
      ? `https://i.ytimg.com/vi_webp/${video.youtubeId}/sddefault.webp`
      : undefined)
  );
}

export function getVideoPoster(video: PortfolioVideo): string | undefined {
  return (
    video.poster ||
    (video.youtubeId
      ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
      : undefined)
  );
}

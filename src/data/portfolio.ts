export interface PortfolioVideo {
  id: string;
  title: string;
  youtubeId?: string;
  /** Full Vimeo link, including the privacy hash for unlisted videos. */
  vimeoUrl?: string;
  /** Local still image or an approved image URL. */
  poster?: string;
}

// Retain existing films until their Vimeo replacements and stills are supplied.
export const portfolioVideos: PortfolioVideo[] = [
  {
    id: "beomgyu",
    youtubeId: "3y743h28quI",
    title: "TXT 범규 - I Love You",
  },
  {
    id: "blackpink",
    youtubeId: "CgCVZdcKcqY",
    title: "BLACKPINK - 뛰어",
  },
  {
    id: "xiaoting",
    youtubeId: "61mQuZDp450",
    title: "Kep1er 샤오팅 - LEGEND",
  },
  {
    id: "memi",
    youtubeId: "i_-pZiZJ7MQ",
    title: "MEMI - BADidea",
  },
  {
    id: "matthew",
    youtubeId: "nZS9J20OWog",
    title: "ZEROBASEONE 석매튜 - Love Ain't Easy",
  },
  {
    id: "hanbin",
    youtubeId: "AkP6v3sMyh8",
    title: "ZEROBASEONE 성한빈 - Pretender",
  },
  {
    id: "keyveatz",
    youtubeId: "rt7fIlko0CM",
    title: "Keyveatz(키비츠) - A1ㄱ",
  },
];

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

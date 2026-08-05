export interface PortfolioVideo {
  id: string;
  title: string;
  category: string;
}

// Using placeholder YouTube video IDs
export const portfolioVideos: PortfolioVideo[] = [
  { id: "3y743h28quI", title: "TXT 범규 - I Love You", category: "뮤직비디오" },
  { id: "CgCVZdcKcqY", title: "BLACKPINK - 뛰어", category: "뮤직비디오" },
  { id: "61mQuZDp450", title: "Kep1er 샤오팅 - LEGEND", category: "뮤직비디오" },
];

export const categories = ["전체", "광고", "드라마", "뮤직비디오"];

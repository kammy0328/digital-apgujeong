import React, { useState } from 'react';

const titleClass = "text-white font-sans font-medium text-lg md:text-xl tracking-widest";

export default function YouTubeCard({ videoId, title, onClick }: { key?: React.Key, videoId: string, title: string, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative aspect-video bg-neutral-950 border border-neutral-800 hover:border-neutral-600 overflow-hidden group cursor-pointer transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0`}
        className={`absolute inset-0 w-full h-full pointer-events-none scale-[1.15] transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={title}
      />
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <div className={titleClass}>{title}</div>
      </div>
    </div>
  );
}

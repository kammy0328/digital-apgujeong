import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Using placeholder YouTube video IDs
const portfolioVideos = [
  { id: "3y743h28quI", title: "TXT 범규 - I Love You", category: "뮤직비디오" },
  { id: "CgCVZdcKcqY", title: "BLACKPINK - 뛰어", category: "뮤직비디오" },
];

const categories = ["전체", "광고", "드라마", "뮤직비디오"];

const titleClass = "text-white font-sans font-medium text-base tracking-widest";

const YouTubeCard = ({ videoId, title, onClick }: { key?: React.Key, videoId: string, title: string, onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative aspect-video bg-black overflow-hidden group cursor-pointer"
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
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <div className={titleClass}>{title}</div>
      </div>
    </div>
  );
};

export default function CommercialReviews() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredVideos = activeCategory === "전체" 
    ? portfolioVideos 
    : portfolioVideos.filter(v => v.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? filteredVideos.length - 1 : prev - 1) : null));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev === filteredVideos.length - 1 ? 0 : prev + 1) : null));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-neutral-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 break-keep">후기</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">COMMERCIAL REVIEWS</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm tracking-widest transition-colors duration-300 ${
                activeCategory === category 
                  ? 'bg-neutral-900 text-white' 
                  : 'bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <YouTubeCard 
              key={index} 
              videoId={video.id} 
              title={video.title} 
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X size={32} />
            </button>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-2 md:left-4 text-white/30 hover:text-white transition-all duration-300 z-[110] p-4 group"
            >
              <ChevronLeft size={48} strokeWidth={1} className="group-hover:-translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 md:right-4 text-white/30 hover:text-white transition-all duration-300 z-[110] p-4 group"
            >
              <ChevronRight size={48} strokeWidth={1} className="group-hover:translate-x-2 transition-transform" />
            </button>

            <motion.div 
              key={filteredVideos[selectedIndex].id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-6xl aspect-video relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${filteredVideos[selectedIndex].id}?autoplay=1&controls=1&modestbranding=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Video Player"
              />
              <div className={`absolute -bottom-12 left-0 ${titleClass}`}>
                {filteredVideos[selectedIndex].title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

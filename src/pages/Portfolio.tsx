import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import YouTubeCard from '../components/YouTubeCard';
import { portfolioVideos, categories } from '../data/portfolio';

const titleClass = "text-paper font-sans font-medium text-base tracking-widest";

export default function Portfolio() {
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
      className="pt-40 pb-32 bg-ink min-h-screen"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 break-keep">포트폴리오</h1>
          <p className="text-neutral-500 tracking-[0.2em] text-sm">PORTFOLIO</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm tracking-widest transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-paper text-ink'
                  : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:border-neutral-500 hover:text-paper'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-paper/50 hover:text-paper transition-colors z-[110]"
            >
              <X size={32} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 text-paper/30 hover:text-paper transition-all duration-300 z-[110] p-4 group"
            >
              <ChevronLeft size={48} strokeWidth={1} className="group-hover:-translate-x-2 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 text-paper/30 hover:text-paper transition-all duration-300 z-[110] p-4 group"
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

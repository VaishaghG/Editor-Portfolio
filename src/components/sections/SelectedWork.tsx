import React, { useState } from 'react';
import { Project } from '@/data/projects';
import { Play, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { CinematicVideoPlayer } from '@/components/common/CinematicVideoPlayer';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onSelectProject,
  onMouseEnterProject,
  onMouseLeave,
  playClick,
  playHover,
}) => {
  const { projects, isLoading } = usePortfolio();
  const [filter, setFilter] = useState<string>('ALL');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const categories = ['ALL', 'SHOWREEL', 'COMMERCIAL', 'MOTION', 'SHORT-FORM', 'NARRATIVE'];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'SHOWREEL') return p.category.includes('SHOWREEL');
    if (filter === 'COMMERCIAL') return p.category.includes('COMMERCIAL');
    if (filter === 'MOTION') return p.category.includes('MOTION');
    if (filter === 'SHORT-FORM') return p.category.includes('SHORT') || p.category.includes('INSTAGRAM');
    if (filter === 'NARRATIVE') return p.category.includes('NARRATIVE');
    return true;
  });

  return (
    <section id="work" className="relative py-10 sm:py-16 md:py-24 lg:py-32 editorial-border-b bg-[#080808]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6 pb-4 sm:pb-8 editorial-border-b">
          <div>
            <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
              ARCHIVE // 01 &mdash; 06
            </div>
            <h2 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-tight text-[#F2F0EC]">
              SELECTED <span className="text-[#E50914]">CUTS</span>
            </h2>
            <p className="font-space text-xs sm:text-base text-[#9E9B93] max-w-lg mt-1 sm:mt-2">
              A curated selection of high-retention commercial edits, motion typography pieces, and narrative stories.
            </p>
          </div>

          {/* Horizontally scrollable filter pills for mobile */}
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClick?.();
                    setFilter(cat);
                  }}
                  onMouseEnter={playHover}
                  className={`min-h-[38px] sm:min-h-[40px] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-mono-code text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 ${
                    filter === cat
                      ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.5)] font-bold'
                      : 'bg-[#141414] text-[#9E9B93] hover:text-white border border-white/10 hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 lg:gap-10 pt-6 sm:pt-10">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => {
              const isWide = index === 0 || index === 3;
              return (
                <div
                  key={`skeleton-${index}`}
                  className={`bg-[#0e0e0e] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between animate-pulse ${
                    isWide ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div className={`w-full bg-[#161616] ${isWide ? 'aspect-[16/10] sm:aspect-[21/9]' : 'aspect-[16/10]'}`} />
                  <div className="p-3.5 sm:p-6 bg-[#0f0f0f] flex flex-col gap-3">
                    <div className="w-2/3 h-8 bg-white/5 rounded" />
                    <div className="w-1/3 h-3 bg-white/5 rounded" />
                    <div className="w-full h-4 bg-white/5 rounded mt-2" />
                    <div className="w-4/5 h-4 bg-white/5 rounded" />
                  </div>
                </div>
              );
            })
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-1 md:col-span-2 py-12 sm:py-20 text-center flex flex-col items-center justify-center border border-white/5 rounded-xl bg-[#0a0a0a]">
              <span className="font-mono-code text-[#6B6862] text-xs uppercase mb-3">SYSTEM UPDATE</span>
              <p className="font-space text-base sm:text-lg text-[#F2F0EC]">Projects are currently being updated from the database.</p>
            </div>
          ) : (
            filteredProjects.map((project, index) => {
            const isHovered = hoveredProjectId === project.id;
            const isWide = index === 0 || index === 3; // Asymmetrical editorial magazine rhythm on desktop

            return (
              <div
                key={project.id}
                onClick={() => {
                  playClick?.();
                  onSelectProject(project);
                }}
                onMouseEnter={() => {
                  playHover?.();
                  setHoveredProjectId(project.id);
                  onMouseEnterProject?.('VIEW CUT');
                }}
                onMouseLeave={() => {
                  setHoveredProjectId(null);
                  onMouseLeave?.();
                }}
                className={`group relative bg-[#0e0e0e] border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#E50914] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col justify-between active:scale-[0.99] ${
                  isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Preview Container */}
                <div
                  className={`relative w-full overflow-hidden bg-black ${
                    isWide ? 'aspect-[16/10] sm:aspect-[21/9]' : 'aspect-[16/10]'
                  }`}
                >
                  <CinematicVideoPlayer
                    src={isHovered ? project.videoUrl : null}
                    poster={project.thumbnailUrl}
                    alt={project.title}
                    aspectRatioClass="w-full h-full"
                    hoverScale={true}
                  />

                  {/* Editorial Film Frame Overlay */}
                  <div className="absolute inset-0 p-2.5 sm:p-6 flex flex-col justify-between pointer-events-none">
                    
                    {/* Top row stamps */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-white/10 font-mono-code text-[9px] sm:text-[11px] text-[#F2F0EC]">
                        <span className="text-[#E50914] font-bold">PROJECT {project.number}</span>
                        <span className="text-white/20">|</span>
                        <span className="truncate max-w-[110px] sm:max-w-none">{project.category}</span>
                      </div>

                      <div className="bg-black/70 backdrop-blur-md px-2 py-0.5 sm:py-1 rounded border border-white/10 font-mono-code text-[10px] sm:text-[11px] text-[#9E9B93] hidden sm:block">
                        {project.aspectRatio} // {project.fps}
                      </div>
                    </div>

                    {/* Center "VIEW CUT" overlay on desktop hover / mobile tap indicator */}
                    <div className="self-center flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E50914] text-white font-bebas text-sm sm:text-lg tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_25px_rgba(229,9,20,0.6)]">
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      <span>WATCH FULL CUT</span>
                    </div>

                    {/* Bottom row stamps */}
                    <div className="flex justify-between items-end font-mono-code text-[9px] sm:text-[11px] text-white/90">
                      <div className="bg-black/70 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-white/10">
                        DURATION: {project.duration}
                      </div>

                      {project.metrics && (
                        <div className="bg-[#E50914]/20 border border-[#E50914]/40 px-2 py-0.5 sm:py-1 rounded text-[#E50914] font-bold hidden sm:block">
                          {project.metrics}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Red bottom accent line */}
                  <div
                    className={`absolute bottom-0 inset-x-0 h-[2px] bg-[#E50914] transition-all duration-500 ${
                      isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />
                </div>

                {/* Project Info Block */}
                <div className="p-3.5 sm:p-6 bg-[#0f0f0f] flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1 sm:mb-2">
                      <h3 className="font-bebas text-xl sm:text-4xl tracking-wide text-[#F2F0EC] group-hover:text-[#E50914] transition-colors">
                        {project.title}
                      </h3>
                      <div className="p-1.5 sm:p-2 rounded-full bg-white/5 group-hover:bg-[#E50914] text-white transition-colors shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    <p className="font-space text-[10px] sm:text-xs uppercase tracking-wider text-[#E50914] mb-1.5 sm:mb-2 font-medium">
                      {project.subtitle}
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-[#9E9B93] line-clamp-2 leading-relaxed mb-3 sm:mb-4">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Tags & Mobile Tap CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 sm:pt-4 border-t border-white/5 font-mono-code text-xs">
                    <div className="flex flex-wrap gap-1">
                      {project.software.map((sw, idx) => (
                        <span
                          key={idx}
                          className="bg-white/5 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] text-[#9E9B93]"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[#6B6862] text-[9px] sm:text-[11px]">{project.year}</span>
                      <span className="sm:hidden text-[#E50914] font-bold text-[9px] flex items-center">
                        OPEN &rarr;
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
            })
          )}
        </div>

      </div>
    </section>
  );
};

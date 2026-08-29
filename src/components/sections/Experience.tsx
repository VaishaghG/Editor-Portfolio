import React from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface ExperienceProps {
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  playHover,
}) => {
  const { timeline } = usePortfolio();

  return (
    <section id="experience" className="relative py-10 sm:py-16 md:py-24 lg:py-32 editorial-border-b bg-[#080808]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="pb-4 sm:pb-8 editorial-border-b flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
              BACKGROUND // CHRONOLOGY
            </div>
            <h2 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-tight text-[#F2F0EC]">
              TRACK <span className="text-[#E50914]">RECORD</span>
            </h2>
          </div>
          <p className="font-space text-xs sm:text-sm text-[#9E9B93] max-w-sm">
            Proven professional track record in commercial video post-production combined with academic computer science grounding.
          </p>
        </div>

        {/* Chronological Editorial Timeline Grid */}
        <div className="grid grid-cols-1 divide-y divide-white/10 border-t border-b border-white/10 mt-6 sm:mt-10">
          {timeline.map((item) => {
            const isEducation = item.type === 'EDUCATION';

            return (
              <div
                key={item.id}
                onMouseEnter={playHover}
                className="py-4 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-start hover:bg-white/[0.015] transition-colors px-1 sm:px-4"
              >
                {/* Col 1: Period & Type (3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-0.5 sm:gap-1.5 font-mono-code">
                  <div className="flex items-center gap-2">
                    {item.status ? (
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ) : (
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/20" />
                    )}
                    <span className="text-[#F2F0EC] font-bold text-[11px] sm:text-sm">{item.period}</span>
                  </div>
                  <span className="text-[#E50914] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    {item.type}
                  </span>
                  <span className="text-[#6B6862] text-[9px] sm:text-[11px] uppercase">{item.location}</span>
                </div>

                {/* Col 2: Role & Organization (4 cols) */}
                <div className="lg:col-span-4 mt-0.5 lg:mt-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                    {isEducation ? (
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E50914] shrink-0" />
                    ) : (
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E50914] shrink-0" />
                    )}
                    <h3 className="font-bebas text-lg sm:text-2xl md:text-3xl text-[#F2F0EC] tracking-wide">
                      {item.role}
                    </h3>
                  </div>
                  <span className="font-space text-[10px] sm:text-xs text-[#9E9B93] uppercase tracking-wider block">
                    {item.organization}
                  </span>
                </div>

                {/* Col 3: Highlights & Tools (5 cols) */}
                <div className="lg:col-span-5 space-y-1.5 sm:space-y-3 mt-1 lg:mt-0">
                  <ul className="space-y-1 sm:space-y-2 font-sans text-xs sm:text-sm text-[#9E9B93] leading-relaxed">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-[#E50914] mt-0.5 shrink-0">&bull;</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 sm:pt-2 font-mono-code text-[9px] sm:text-[11px]">
                    {item.toolsUsed.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-[#141414] border border-white/10 px-1.5 sm:px-2 py-0.5 rounded text-[#F2F0EC]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

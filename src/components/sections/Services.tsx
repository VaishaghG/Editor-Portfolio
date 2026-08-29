import React, { useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface ServicesProps {
  onOpenContact: (serviceTitle?: string) => void;
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const Services: React.FC<ServicesProps> = ({
  onOpenContact,
  playClick,
  playHover,
}) => {
  const { services } = usePortfolio();
  const [activeService, setActiveService] = useState<number>(0);

  return (
    <section id="services" className="relative py-10 sm:py-16 md:py-24 lg:py-32 editorial-border-b bg-[#060606]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="pb-4 sm:pb-8 editorial-border-b flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
              CAPABILITIES &bull; POST-PRODUCTION
            </div>
            <h2 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-tight text-[#F2F0EC]">
              WHAT <span className="text-[#E50914]">I DO</span>
            </h2>
          </div>
          <p className="font-space text-xs sm:text-sm text-[#9E9B93] max-w-sm">
            End-to-end post-production capabilities tailored for commercial brands, creator ecosystems, and cinematic films.
          </p>
        </div>

        {/* Main Services Stage: Accordion List + Dynamic Preview Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pt-6 sm:pt-10 items-start">
          
          {/* Left: Interactive Hover Accordion (7 cols) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {services.map((service, index) => {
              const isSelected = activeService === index;

              return (
                <div
                  key={service.number}
                  onMouseEnter={() => {
                    playHover?.();
                    setActiveService(index);
                  }}
                  onClick={() => {
                    playClick?.();
                    setActiveService(index);
                  }}
                  className={`group py-3.5 sm:py-6 lg:py-8 px-2 sm:px-4 transition-all duration-500 cursor-pointer relative overflow-hidden active:bg-white/[0.03] ${
                    isSelected ? 'bg-[#0f0f0f]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Active Red Left Indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-[#E50914] transition-all duration-300 ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Header Row: Number + Title + Arrow */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4 min-h-[40px] sm:min-h-[44px]">
                    <div className="flex items-center gap-2.5 sm:gap-6">
                      <span
                        className={`font-mono-code text-[11px] sm:text-sm font-bold transition-colors ${
                          isSelected ? 'text-[#E50914]' : 'text-[#6B6862] group-hover:text-white'
                        }`}
                      >
                        {service.number}
                      </span>
                      <h3
                        className={`font-bebas text-lg sm:text-3xl lg:text-4xl tracking-wide transition-colors ${
                          isSelected ? 'text-[#F2F0EC]' : 'text-[#9E9B93] group-hover:text-[#F2F0EC]'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <div
                      className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 shrink-0 ${
                        isSelected
                          ? 'bg-[#E50914] text-white rotate-45'
                          : 'bg-white/5 text-[#6B6862] group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Expanded Content (when active) */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isSelected ? 'grid-rows-[1fr] opacity-100 mt-2 sm:mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden pl-5 sm:pl-12">
                      <p className="font-space text-[10px] sm:text-xs text-[#E50914] uppercase tracking-wider mb-1.5 font-medium">
                        {service.tagline}
                      </p>
                      <p className="font-sans text-xs sm:text-sm text-[#9E9B93] leading-relaxed mb-3">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-1 sm:gap-2 pt-0.5 mb-3">
                        {service.deliverables.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-[#181818] border border-white/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-mono-code text-[#F2F0EC]"
                          >
                            &bull; {item}
                          </span>
                        ))}
                      </div>

                      {/* Mobile-only Quick Book CTA */}
                      <div className="lg:hidden pt-1 pb-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playClick?.();
                            onOpenContact(service.title);
                          }}
                          className="w-full min-h-[42px] py-2 bg-[#E50914] active:bg-[#FF2A2A] text-white font-bebas text-base tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>BOOK THIS SERVICE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Interactive Preview Visual Card (5 cols - Desktop only) */}
          <div className="lg:col-span-5 sticky top-28 hidden lg:block">
            {services[activeService] && (
              <div className="bg-[#0e0e0e] border border-white/15 rounded-xl overflow-hidden shadow-2xl p-5 transition-all duration-500 animate-fade-in">
                
                {/* Visual Preview Image */}
                <div className="aspect-[16/10] rounded-lg overflow-hidden relative mb-5 bg-black">
                  <img
                    src={services[activeService].previewImage}
                    alt={services[activeService].title}
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 font-mono-code text-[11px] text-[#E50914] font-bold">
                    SERVICE {services[activeService].number}
                  </div>
                </div>

                {/* Service Specs Breakdown */}
                <div className="space-y-4 font-mono-code text-xs">
                  <div>
                    <span className="text-[#6B6862] block text-[10px] uppercase">ESTIMATED TURNAROUND</span>
                    <span className="text-[#F2F0EC] font-medium flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#E50914]" />
                      {services[activeService].turnaround}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#6B6862] block text-[10px] uppercase">IDEAL CLIENT USE-CASE</span>
                    <span className="text-[#9E9B93] block mt-0.5">{services[activeService].idealFor}</span>
                  </div>

                  <div>
                    <span className="text-[#6B6862] block text-[10px] uppercase mb-1.5">SOFTWARE STACK</span>
                    <div className="flex flex-wrap gap-1.5">
                      {services[activeService].software.map((sw, idx) => (
                        <span key={idx} className="bg-white/5 px-2 py-0.5 rounded text-[11px] text-[#F2F0EC]">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playClick?.();
                      onOpenContact(services[activeService].title);
                    }}
                    onMouseEnter={playHover}
                    className="w-full min-h-[48px] mt-4 py-3 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-bebas text-lg tracking-wider rounded transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>BOOK THIS SERVICE</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

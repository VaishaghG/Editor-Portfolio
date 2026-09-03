import React, { useState, useEffect } from 'react';
import { ToolItem } from '@/data/tools';
import { Terminal, Command, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface ToolsProps {
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const Tools: React.FC<ToolsProps> = ({
  playClick,
  playHover,
}) => {
  const { tools } = usePortfolio();
  const [selectedTool, setSelectedTool] = useState<ToolItem>(tools[0]);

  useEffect(() => {
    if (tools.length > 0) {
      setSelectedTool((prev) => {
        const found = tools.find((t) => t.id === prev?.id);
        return found || tools[0];
      });
    }
  }, [tools]);

  return (
    <section id="tools" className="relative py-10 sm:py-16 md:py-24 lg:py-32 editorial-border-b bg-[#060606]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="pb-4 sm:pb-8 editorial-border-b flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
              SOFTWARE STACK &bull; HARDWARE
            </div>
            <h2 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-tight text-[#F2F0EC]">
              TOOLS <span className="text-[#E50914]">OF THE TRADE</span>
            </h2>
          </div>
          <p className="font-space text-xs sm:text-sm text-[#9E9B93] max-w-sm">
            High-speed production toolkit optimized for lightning turnarounds, color science, and dynamic visual compositing.
          </p>
        </div>

        {/* Minimal Kinetic Typography Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 pt-6 sm:pt-10 items-start">
          
          {/* Left: Giant Typography Interactive Stack (7 cols) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {tools.length === 0 ? (
              <div className="py-8 px-4 text-[#9E9B93] font-mono-code text-xs text-center">
                LOADING TOOLS...
              </div>
            ) : tools.map((tool) => {
              const isSelected = selectedTool?.id === tool.id;

              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    playClick?.();
                    setSelectedTool(tool);
                  }}
                  onMouseEnter={() => {
                    playHover?.();
                    setSelectedTool(tool);
                  }}
                  className={`group py-3 sm:py-5 px-2 sm:px-3 transition-all duration-300 cursor-pointer flex items-center justify-between active:bg-white/[0.04] ${
                    isSelected ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    <span
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all shrink-0 ${
                        isSelected ? 'bg-[#E50914] scale-125' : 'bg-white/20'
                      }`}
                    />
                    <h3
                      className={`font-bebas text-xl sm:text-4xl md:text-5xl tracking-wide transition-all ${
                        isSelected
                          ? 'text-[#F2F0EC] translate-x-1 sm:translate-x-2'
                          : 'text-[#6B6862] group-hover:text-[#9E9B93]'
                      }`}
                    >
                      {tool.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 font-mono-code text-[9px] sm:text-xs shrink-0">
                    <span className="hidden sm:inline-block text-[#9E9B93]">{tool.category}</span>
                    <span className="text-[#E50914] font-bold">[{tool.level.split('/')[0].trim()}]</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Technical Inspector HUD (5 cols) */}
          <div className="lg:col-span-5">
            {selectedTool && (
              <div className="bg-[#0e0e0e] border border-white/15 rounded-xl p-4 sm:p-8 shadow-2xl relative overflow-hidden font-mono-code text-xs sticky top-28">
                
                {/* Top Inspector Bar */}
                <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-white/10 text-[#6B6862]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E50914]" />
                    <span>INSPECTOR // {selectedTool.id.toUpperCase()}</span>
                  </div>
                  <span className="text-[#E50914]">PRO PIPELINE</span>
                </div>

                {/* Tool Header */}
                <div className="py-3 sm:py-6 border-b border-white/10">
                  <span className="text-[9px] sm:text-[10px] text-[#6B6862] uppercase block">SOFTWARE SUITE</span>
                  <h4 className="font-bebas text-xl sm:text-3xl text-[#F2F0EC] tracking-wider mt-0.5 sm:mt-1">
                    {selectedTool.name}
                  </h4>
                  <p className="font-space text-[10px] sm:text-xs text-[#E50914] uppercase mt-0.5 sm:mt-1 font-medium">
                    {selectedTool.role}
                  </p>
                  <p className="font-sans text-xs text-[#9E9B93] leading-relaxed mt-2 sm:mt-3">
                    {selectedTool.description}
                  </p>
                </div>

                {/* Shortcuts & Core Features */}
                <div className="pt-3 sm:pt-5 space-y-2.5 sm:space-y-4">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#6B6862] uppercase block mb-1 sm:mb-1.5 flex items-center gap-1.5">
                      <Command className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E50914]" />
                      KEY MUSCLE-MEMORY SHORTCUTS
                    </span>
                    <div className="bg-[#161616] p-2 rounded border border-white/5 text-[#F2F0EC] font-bold tracking-widest text-[10px] sm:text-xs">
                      {selectedTool.shortcut}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#6B6862] uppercase block mb-0.5 sm:mb-1">
                      KEY CAPABILITY FOCUS
                    </span>
                    <div className="flex items-center gap-2 text-[#9E9B93] text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span>{selectedTool.featuredFeature}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

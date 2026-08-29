import React, { useState, useRef } from 'react';
import { Play, Layers, Scissors, Palette, Sparkles } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface ProcessProps {
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const Process: React.FC<ProcessProps> = ({
  playClick,
  playHover,
}) => {
  const { processSteps } = usePortfolio();
  const [activeStep, setActiveStep] = useState<number>(2); // Default on "03 EDIT"
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const stepIcons = [Scissors, Layers, Play, Sparkles, Palette];

  // Track active horizontal slide on mobile touch scroll
  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.8;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < processSteps.length && newIndex !== activeStep) {
      setActiveStep(newIndex);
    }
  };

  const scrollToStep = (idx: number) => {
    playClick?.();
    setActiveStep(idx);
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardEl = el.children[idx] as HTMLElement;
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <section id="process" className="relative py-10 sm:py-16 md:py-24 lg:py-32 editorial-border-b bg-[#080808]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="pb-4 sm:pb-8 editorial-border-b flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
              THE WORKFLOW // NLE TIMELINE
            </div>
            <h2 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-tight text-[#F2F0EC]">
              FROM RAW <span className="text-[#E50914]">TO FINAL CUT</span>
            </h2>
          </div>
          <p className="font-space text-xs sm:text-sm text-[#9E9B93] max-w-sm">
            A battle-tested 5-stage post-production pipeline built to deliver maximum storytelling impact with zero wasted time.
          </p>
        </div>

        {/* Premiere / DaVinci Simulated Timeline Track Visualizer */}
        <div className="my-4 sm:my-8 p-3 sm:p-5 bg-[#0e0e0e] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center pb-2 sm:pb-3 border-b border-white/10 font-mono-code text-[9px] sm:text-[11px] text-[#6B6862]">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E50914]" />
              <span className="text-[#F2F0EC]">NLE TIMELINE // SEQUENCE 01</span>
            </div>
            <span>24.00 FPS &bull; 00:01:24:00</span>
          </div>

          {/* Interactive Timeline Track Scrubber */}
          <div className="py-2.5 sm:py-4 space-y-1.5 sm:space-y-2">
            {/* Track V2 */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono-code">
              <span className="w-6 sm:w-8 text-[#6B6862] text-[9px] sm:text-[10px]">V2</span>
              <div className="flex-1 h-4 sm:h-6 bg-[#161616] rounded flex overflow-hidden border border-white/5">
                <div
                  className="h-full bg-purple-600/60 border-r border-purple-400/50 flex items-center px-1.5 sm:px-2 text-[8px] sm:text-[10px] text-white truncate"
                  style={{ width: '35%', marginLeft: '50%' }}
                >
                  MOGRT &bull; KINETIC TITLES
                </div>
              </div>
            </div>

            {/* Track V1 (Main Footage) */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono-code">
              <span className="w-6 sm:w-8 text-[#6B6862] text-[9px] sm:text-[10px]">V1</span>
              <div className="flex-1 h-6 sm:h-8 bg-[#181818] rounded flex overflow-hidden border border-white/5">
                {processSteps.map((step, idx) => {
                  const isCur = activeStep === idx;
                  return (
                    <div
                      key={step.number}
                      onClick={() => scrollToStep(idx)}
                      onMouseEnter={playHover}
                      className={`h-full border-r border-black/40 flex items-center px-1 sm:px-2 text-[8px] sm:text-[10px] cursor-pointer transition-all ${
                        isCur
                          ? 'bg-[#E50914] text-white font-bold shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]'
                          : 'bg-[#222222] text-[#9E9B93] hover:bg-[#2c2c2c]'
                      }`}
                      style={{ width: `${step.durationPercent * 2}%` }}
                      title={step.title}
                    >
                      <span className="truncate">{step.number} {step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Track A1 (Dialogue & Voice) */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono-code">
              <span className="w-6 sm:w-8 text-[#6B6862] text-[9px] sm:text-[10px]">A1</span>
              <div className="flex-1 h-3.5 sm:h-5 bg-[#161616] rounded flex overflow-hidden border border-white/5">
                <div className="h-full bg-emerald-600/50 flex items-center px-1.5 sm:px-2 text-[8px] sm:text-[9px] text-white truncate" style={{ width: '85%' }}>
                  DIALOGUE STEM // DE-NOISED
                </div>
              </div>
            </div>

            {/* Track A2 (SFX & Music) */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono-code">
              <span className="w-6 sm:w-8 text-[#6B6862] text-[9px] sm:text-[10px]">A2</span>
              <div className="flex-1 h-3.5 sm:h-5 bg-[#161616] rounded flex overflow-hidden border border-white/5">
                <div className="h-full bg-amber-600/50 flex items-center px-1.5 sm:px-2 text-[8px] sm:text-[9px] text-white truncate" style={{ width: '100%' }}>
                  SOUND DESIGN RISERS &bull; SUB IMPACTS &bull; SCORE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* DESKTOP VIEW (1024px+) - 100% LOCKED & UNCHANGED 5-COLUMN GRID */}
        {/* ======================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 pt-4">
          {processSteps.map((step, index) => {
            const isSelected = activeStep === index;
            const Icon = stepIcons[index % stepIcons.length] || Scissors;

            return (
              <div
                key={`desktop-${step.number}`}
                onClick={() => {
                  playClick?.();
                  setActiveStep(index);
                }}
                onMouseEnter={playHover}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#121212] border-[#E50914] shadow-[0_0_30px_rgba(229,9,20,0.2)]'
                    : 'bg-[#0d0d0d] border-white/10 hover:border-white/30'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`font-mono-code text-xs font-bold ${
                        isSelected ? 'text-[#E50914]' : 'text-[#6B6862]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <Icon
                      className={`w-5 h-5 ${
                        isSelected ? 'text-[#E50914]' : 'text-[#6B6862]'
                      }`}
                    />
                  </div>

                  <h3 className="font-bebas text-3xl tracking-wide text-[#F2F0EC] mb-2">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs text-[#9E9B93] leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 font-mono-code text-[10px] text-[#6B6862]">
                  <span className="block text-[#E50914] font-bold">OUTPUT:</span>
                  <span className="text-[#F2F0EC] truncate block">{step.output}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================================= */}
        {/* MOBILE & TABLET VIEW (< 1024px) - COMPACT HORIZONTAL SWIPEABLE CAROUSEL */}
        {/* NATIVE TOUCH SWIPE &bull; PEEK CARDS &bull; REALTIME INDICATOR DOTS */}
        {/* ======================================================================= */}
        <div className="block lg:hidden">
          
          {/* Top Indicator Header */}
          <div className="flex items-center justify-between pb-2 mb-2 font-mono-code text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-[#E50914] font-bold">
                0{activeStep + 1} / 0{processSteps.length}
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="text-[#F2F0EC] uppercase font-bold">
                {processSteps[activeStep]?.title}
              </span>
            </div>
            <span className="text-[#6B6862] text-[10px] uppercase tracking-wider">
              &larr; SWIPE TO EXPLORE &rarr;
            </span>
          </div>

          {/* Native Horizontal Touch Track with Peek Effect */}
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {processSteps.map((step, index) => {
              const isSelected = activeStep === index;
              const Icon = stepIcons[index % stepIcons.length] || Scissors;

              return (
                <div
                  key={`mobile-${step.number}`}
                  onClick={() => scrollToStep(index)}
                  className={`w-[78vw] sm:w-[48vw] shrink-0 p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between active:scale-[0.99] ${
                    isSelected
                      ? 'bg-[#121212] border-[#E50914] shadow-[0_0_25px_rgba(229,9,20,0.2)]'
                      : 'bg-[#0d0d0d] border-white/10 hover:border-white/25'
                  }`}
                  style={{
                    scrollSnapAlign: 'center',
                    minHeight: '230px',
                    maxHeight: '290px',
                  }}
                >
                  <div>
                    {/* Card Header: Number + Icon */}
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`font-mono-code text-xs font-bold ${
                          isSelected ? 'text-[#E50914]' : 'text-[#6B6862]'
                        }`}
                      >
                        {step.number}
                      </span>
                      <Icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          isSelected ? 'text-[#E50914]' : 'text-[#6B6862]'
                        }`}
                      />
                    </div>

                    {/* Step Title */}
                    <h3 className="font-bebas text-2xl sm:text-3xl tracking-wide text-[#F2F0EC] mb-1.5">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="font-sans text-[11px] sm:text-xs text-[#9E9B93] leading-relaxed line-clamp-3 mb-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Output */}
                  <div className="pt-2 border-t border-white/5 font-mono-code text-[9px] sm:text-[10px] text-[#6B6862]">
                    <span className="block text-[#E50914] font-bold">OUTPUT:</span>
                    <span className="text-[#F2F0EC] truncate block">{step.output}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex items-center justify-between pt-3 mt-1 editorial-border-t font-mono-code text-xs text-[#6B6862]">
            <div className="flex items-center gap-1.5">
              {processSteps.map((_, dotIdx) => (
                <button
                  key={`process-dot-${dotIdx}`}
                  onClick={() => scrollToStep(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStep === dotIdx
                      ? 'w-5 bg-[#E50914]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to process step 0${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-[#9E9B93]">
              <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full" />
              <span>5-PHASE PIPELINE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

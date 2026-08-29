import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/data/projects';
import { Play, ArrowUpRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  onSelectProject,
  onMouseEnterProject,
  onMouseLeave,
  playClick,
  playHover,
}) => {
  const { projects } = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopTriggerRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const featured = projects.filter((p) => p.featured);
  const showcaseProjects = featured.length >= 2 ? featured.slice(0, 4) : projects.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =======================================================================
      // 1. DESKTOP BREAKPOINT (min-width: 1024px) - PINNED HORIZONTAL REEL
      // =======================================================================
      mm.add('(min-width: 1024px)', () => {
        const track = desktopTrackRef.current;
        const trigger = desktopTriggerRef.current;
        if (!track || !trigger) return;

        const totalSlides = showcaseProjects.length;
        if (totalSlides <= 1) return;

        // Exact horizontal travel distance
        const getScrollDistance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'showcase-desktop-st',
            trigger: trigger,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${Math.max(getScrollDistance(), window.innerHeight * 2.5)}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                totalSlides - 1,
                Math.max(0, Math.round(self.progress * (totalSlides - 1)))
              );
              setActiveDesktopIndex(idx);
            },
          },
        });

        gsap.to('.showcase-bg-text-desktop', {
          x: -350,
          scrollTrigger: {
            trigger: trigger,
            scrub: 0.5,
          },
        });

        return () => {
          tween.kill();
        };
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [showcaseProjects.length]);

  // Jump to specific slide on desktop via click/keyboard
  const scrollToDesktopSlide = (idx: number) => {
    playClick?.();
    const st = ScrollTrigger.getById('showcase-desktop-st');
    if (st) {
      const total = showcaseProjects.length;
      const progress = total > 1 ? idx / (total - 1) : 0;
      const targetY = st.start + progress * (st.end - st.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handlePrevDesktop = () => {
    const prev = Math.max(0, activeDesktopIndex - 1);
    scrollToDesktopSlide(prev);
  };

  const handleNextDesktop = () => {
    const next = Math.min(showcaseProjects.length - 1, activeDesktopIndex + 1);
    scrollToDesktopSlide(next);
  };

  // Track active horizontal slide on mobile touch scroll
  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex >= 0 && newIndex < showcaseProjects.length && newIndex !== activeMobileIndex) {
      setActiveMobileIndex(newIndex);
    }
  };

  const scrollToMobileProject = (idx: number) => {
    playClick?.();
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardEl = el.children[idx] as HTMLElement;
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveMobileIndex(idx);
    }
  };

  return (
    <section id="showcase" ref={sectionRef} className="relative bg-[#060606] overflow-hidden editorial-border-b">
      
      {/* ======================================================================= */}
      {/* DESKTOP SHOWCASE (min-width: 1024px) */}
      {/* ======================================================================= */}
      <div className="hidden lg:block">
        {/* Background Kinetic Marquee Typography on Desktop */}
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 pointer-events-none opacity-5 select-none overflow-hidden whitespace-nowrap">
          <span className="showcase-bg-text-desktop font-bebas text-[20vw] text-[#F2F0EC] tracking-tighter inline-block">
            THE LAST CUT &bull; FRAME BY FRAME &bull; CINEMATIC RHYTHM &bull; AUDIO-VISUAL SYNTHESIS
          </span>
        </div>

        {/* Pinned Showcase Container for Desktop */}
        <div ref={desktopTriggerRef} className="w-full h-screen flex flex-col justify-between py-8 lg:py-12 overflow-hidden relative">
          
          {/* Section Header */}
          <div className="max-w-7xl mx-auto w-full px-8 z-10">
            <div className="flex justify-between items-end pb-4 editorial-border-b">
              <div>
                <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-xs tracking-widest uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
                  MOTION ARCHIVE // HORIZONTAL REEL
                </div>
                <h2 className="font-bebas text-6xl lg:text-7xl tracking-tight text-[#F2F0EC]">
                  CINEMATIC <span className="text-[#E50914]">EXPERIENCES</span>
                </h2>
              </div>
              <div className="flex items-center gap-4 font-mono-code text-xs text-[#9E9B93]">
                {/* Desktop Prev / Next Fast Navigation */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevDesktop}
                    disabled={activeDesktopIndex === 0}
                    onMouseEnter={playHover}
                    className="p-2 rounded bg-[#141414] hover:bg-[#E50914] hover:text-white text-[#9E9B93] border border-white/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                    title="Previous Project"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextDesktop}
                    disabled={activeDesktopIndex === showcaseProjects.length - 1}
                    onMouseEnter={playHover}
                    className="p-2 rounded bg-[#141414] hover:bg-[#E50914] hover:text-white text-[#9E9B93] border border-white/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                    title="Next Project"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[11px]">[ SCROLL TO EXPLORE &bull; 0{activeDesktopIndex + 1}/0{showcaseProjects.length} ]</span>
              </div>
            </div>
          </div>

          {/* Horizontal Slides Reel on Desktop */}
          <div
            ref={desktopTrackRef}
            className="flex flex-nowrap items-center z-10 my-auto will-change-transform"
            style={{ width: `${showcaseProjects.length * 100}vw` }}
          >
            {showcaseProjects.map((project, idx) => (
              <div
                key={`desktop-${project.id}`}
                className="showcase-slide-desktop w-screen shrink-0 h-[64vh] max-h-[580px] flex items-center justify-center px-10 lg:px-20"
              >
                <div className="w-full max-w-5xl grid grid-cols-12 gap-8 items-center bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
                  
                  {/* Huge Background Project Number */}
                  <span className="absolute right-4 bottom-2 font-bebas text-[14rem] text-white/[0.03] select-none pointer-events-none leading-none">
                    {project.number}
                  </span>

                  {/* Left Side: Overlapping Video Player Stage */}
                  <div
                    onClick={() => {
                      playClick?.();
                      onSelectProject(project);
                    }}
                    onMouseEnter={() => {
                      playHover?.();
                      onMouseEnterProject?.('EXPAND');
                    }}
                    onMouseLeave={onMouseLeave}
                    className="col-span-7 relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/15 group-hover:border-[#E50914] transition-all duration-500 shadow-2xl bg-black"
                  >
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-30"
                    />
                    <video
                      src={project.videoUrl}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Stamp overlays */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                      <div className="flex justify-between items-start font-mono-code text-[10px] text-white/90">
                        <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                          <span>REEL {project.number} / 04</span>
                        </div>
                        <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                          {project.fps}
                        </div>
                      </div>

                      <div className="self-center p-3 rounded-full bg-[#E50914] text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)]">
                        <Play className="w-5 h-5 fill-current" />
                      </div>

                      <div className="font-mono-code text-[10px] text-white/80 bg-black/80 backdrop-blur-md px-2 py-1 rounded self-start border border-white/10">
                        TC: 00:00:{project.duration}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Editorial Metadata & Typography */}
                  <div className="col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 font-mono-code text-xs text-[#E50914] mb-2 font-bold">
                        <span>PROJECT 0{idx + 1}</span>
                        <span className="text-white/20">&bull;</span>
                        <span className="text-[#9E9B93] uppercase font-normal">{project.category}</span>
                      </div>

                      <h3 className="font-bebas text-4xl lg:text-5xl text-[#F2F0EC] tracking-wide mb-1.5">
                        {project.title}
                      </h3>
                      <p className="font-space text-xs uppercase text-[#E50914] tracking-wider mb-3">
                        {project.subtitle}
                      </p>

                      <p className="font-sans text-xs lg:text-sm text-[#9E9B93] leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technical Pipeline Tags */}
                      <div className="space-y-1.5 mb-5">
                        <div className="text-[10px] font-mono-code text-[#6B6862] uppercase tracking-wider">
                          PIPELINE BREAKDOWN:
                        </div>
                        <div className="flex flex-wrap gap-1.5 font-mono-code text-xs">
                          {project.deliverables.slice(0, 3).map((item, dIdx) => (
                            <span
                              key={dIdx}
                              className="bg-[#181818] border border-white/10 px-2 py-0.5 rounded text-[11px] text-[#F2F0EC]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playClick?.();
                        onSelectProject(project);
                      }}
                      onMouseEnter={playHover}
                      className="w-full py-3 bg-[#181818] hover:bg-[#E50914] text-[#F2F0EC] hover:text-white border border-white/10 hover:border-[#E50914] rounded font-bebas text-lg tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                    >
                      <span>OPEN PROJECT CINEMA</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Bottom Film Strip Indicator */}
          <div className="max-w-7xl mx-auto w-full px-8 z-10">
            <div className="flex justify-between items-center pt-3 editorial-border-t font-mono-code text-xs text-[#6B6862]">
              <span>MOTION SHOWCASE &bull; 2026 EDITION</span>

              {/* Realtime Interactive Slide Dots */}
              <div className="flex items-center gap-2">
                {showcaseProjects.map((_, dIdx) => (
                  <button
                    key={`desktop-dot-${dIdx}`}
                    onClick={() => scrollToDesktopSlide(dIdx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeDesktopIndex === dIdx
                        ? 'w-7 bg-[#E50914]'
                        : 'w-2 bg-white/20 hover:bg-white/50'
                    }`}
                    title={`Jump to project 0${dIdx + 1}`}
                    aria-label={`Jump to project 0${dIdx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#E50914] rounded-full animate-pulse-red" />
                <span className="text-[#F2F0EC]">{showcaseProjects.length} PINNED PIECES</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================================= */}
      {/* MOBILE & TABLET SHOWCASE (< 1024px) - COMPACT HORIZONTAL SWIPE REEL */}
      {/* NATIVE TOUCH SWIPE &bull; PEEK CARDS &bull; REALTIME PROGRESS DOTS */}
      {/* ======================================================================= */}
      <div className="block lg:hidden py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header with Touch Hints */}
          <div className="flex items-end justify-between gap-2 pb-4 editorial-border-b mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] tracking-widest uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
                MOTION ARCHIVE // SWIPE REEL
              </div>
              <h2 className="font-bebas text-4xl sm:text-5xl tracking-tight text-[#F2F0EC]">
                CINEMATIC <span className="text-[#E50914]">EXPERIENCES</span>
              </h2>
            </div>
            
            {/* Realtime Counter Badge */}
            <div className="flex flex-col items-end gap-1 font-mono-code text-[10px]">
              <span className="text-[#E50914] font-bold">
                0{activeMobileIndex + 1} / 0{showcaseProjects.length}
              </span>
              <span className="text-[#6B6862] text-[9px] uppercase tracking-wider">
                &larr; SWIPE &rarr;
              </span>
            </div>
          </div>

          {/* Native Horizontal Touch Reel with Peek Effect */}
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {showcaseProjects.map((project, idx) => (
              <div
                key={`mobile-reel-${project.id}`}
                className="w-[84vw] sm:w-[72vw] shrink-0 bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                style={{ scrollSnapAlign: 'center' }}
              >
                {/* Background Large Project Number */}
                <span className="absolute right-3 bottom-0 font-bebas text-7xl sm:text-8xl text-white/[0.03] select-none pointer-events-none leading-none">
                  {project.number}
                </span>

                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 font-mono-code text-[11px] text-[#E50914] mb-1.5 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>PROJECT 0{idx + 1}</span>
                      <span className="text-white/20">&bull;</span>
                      <span className="text-[#9E9B93] uppercase font-normal text-[10px] truncate max-w-[130px]">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-[#6B6862] text-[10px]">{project.year}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-bebas text-2xl sm:text-3xl text-[#F2F0EC] tracking-wide mb-0.5 truncate">
                    {project.title}
                  </h3>
                  <p className="font-space text-[10px] sm:text-[11px] uppercase text-[#E50914] tracking-wider mb-3 font-medium truncate">
                    {project.subtitle}
                  </p>

                  {/* Video Stage with Direct Tap Action */}
                  <div
                    onClick={() => {
                      playClick?.();
                      onSelectProject(project);
                    }}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/15 bg-black mb-3 active:scale-[0.99] transition-transform"
                  >
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80"
                      loading="lazy"
                    />
                    <video
                      src={project.videoUrl}
                      poster={project.thumbnailUrl}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />

                    {/* Compact HUD Stamps */}
                    <div className="absolute inset-0 p-2.5 flex flex-col justify-between pointer-events-none font-mono-code text-[9px] text-white/90">
                      <div className="flex justify-between items-start">
                        <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                          <span>CUT {project.number}</span>
                        </div>
                        <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
                          {project.fps}
                        </div>
                      </div>

                      <div className="self-center p-2.5 rounded-full bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
                          TC {project.duration}
                        </div>
                        <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-[#E50914] font-bold">
                          TAP TO PLAY
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="font-sans text-[11px] sm:text-xs text-[#9E9B93] leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Deliverables Tags */}
                  <div className="flex flex-wrap gap-1 font-mono-code text-[9px] mb-4">
                    {project.deliverables.slice(0, 2).map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="bg-[#181818] border border-white/10 px-2 py-0.5 rounded text-[#F2F0EC]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Touch-Friendly Action Button */}
                <button
                  onClick={() => {
                    playClick?.();
                    onSelectProject(project);
                  }}
                  className="w-full min-h-[44px] py-2.5 bg-[#181818] active:bg-[#E50914] text-[#F2F0EC] active:text-white border border-white/10 active:border-[#E50914] rounded font-bebas text-base tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>OPEN PROJECT CINEMA</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

              </div>
            ))}
          </div>

          {/* Reel Navigation Dots & Counter */}
          <div className="flex items-center justify-between pt-4 mt-2 editorial-border-t font-mono-code text-xs text-[#6B6862]">
            <div className="flex items-center gap-2">
              {showcaseProjects.map((_, dotIdx) => (
                <button
                  key={`dot-${dotIdx}`}
                  onClick={() => scrollToMobileProject(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeMobileIndex === dotIdx
                      ? 'w-6 bg-[#E50914]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to project 0${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[#9E9B93]">
              <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full" />
              <span>SWIPE HORIZONTALLY</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

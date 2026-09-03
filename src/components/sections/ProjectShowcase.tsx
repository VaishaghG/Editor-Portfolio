import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/data/projects';
import { Play, ArrowUpRight, ChevronRight, ChevronLeft, Film, Sparkles } from 'lucide-react';
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
  const { projects, isLoading } = usePortfolio();
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
      
      {isLoading || showcaseProjects.length === 0 ? (
        <div className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
             <div className="flex justify-between items-end pb-4 editorial-border-b mb-10">
                <div>
                  <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] sm:text-xs tracking-widest uppercase mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
                    VERTICAL ARCHIVE // 9:16 REELS
                  </div>
                  <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#F2F0EC]">
                    CINEMATIC <span className="text-[#E50914]">EXPERIENCES</span>
                  </h2>
                </div>
             </div>

             {isLoading ? (
               <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 opacity-50 animate-pulse">
                  <div className="w-full lg:w-[300px] h-[400px] lg:h-[500px] bg-[#121212] rounded-xl border border-white/5" />
                  <div className="flex-1 flex flex-col gap-4 justify-center">
                     <div className="w-3/4 lg:w-1/2 h-10 lg:h-12 bg-[#121212] rounded border border-white/5" />
                     <div className="w-full lg:w-3/4 h-6 bg-[#121212] rounded border border-white/5" />
                     <div className="w-1/2 lg:w-1/4 h-6 bg-[#121212] rounded border border-white/5" />
                  </div>
               </div>
             ) : (
               <div className="w-full py-16 sm:py-20 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-[#0a0a0a]">
                 <span className="font-mono-code text-[#6B6862] text-[10px] sm:text-xs uppercase mb-3">SYSTEM UPDATE</span>
                 <p className="font-space text-sm sm:text-lg text-[#F2F0EC]">Experiences are being loaded from the database.</p>
               </div>
             )}
          </div>
        </div>
      ) : (
        <>
          {/* ======================================================================= */}
          {/* DESKTOP SHOWCASE (min-width: 1024px) - 9:16 VERTICAL REELS FOCUS */}
      {/* ======================================================================= */}
      <div className="hidden lg:block">
        {/* Background Kinetic Marquee Typography on Desktop */}
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 pointer-events-none opacity-5 select-none overflow-hidden whitespace-nowrap">
          <span className="showcase-bg-text-desktop font-bebas text-[20vw] text-[#F2F0EC] tracking-tighter inline-block">
            9:16 VERTICAL CINEMA &bull; SHORT-FORM REELS &bull; HIGH-RETENTION CUTS &bull; COLOR GRADE
          </span>
        </div>

        {/* Pinned Showcase Container for Desktop */}
        <div ref={desktopTriggerRef} className="w-full h-screen flex flex-col justify-between py-8 lg:py-10 overflow-hidden relative">
          
          {/* Section Header */}
          <div className="max-w-7xl mx-auto w-full px-8 z-10">
            <div className="flex justify-between items-end pb-4 editorial-border-b">
              <div>
                <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-xs tracking-widest uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
                  VERTICAL ARCHIVE // 9:16 REELS
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
                <span className="text-[11px] font-mono-code">[ 0{activeDesktopIndex + 1} / 0{showcaseProjects.length} &bull; SCROLL TO EXPLORE ]</span>
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
                className="showcase-slide-desktop w-screen shrink-0 h-[68vh] max-h-[620px] flex items-center justify-center px-8 lg:px-16"
              >
                {/* 9:16 Vertical Video Focused Cinematic Card */}
                <div className="w-full max-w-4xl bg-[#0d0d0d] border border-white/10 hover:border-[#E50914]/40 transition-colors duration-500 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden group flex flex-col md:flex-row items-center gap-6 lg:gap-10">
                  
                  {/* Huge Background Project Number */}
                  <span className="absolute right-4 bottom-0 font-bebas text-[12rem] text-white/[0.025] select-none pointer-events-none leading-none">
                    {project.number}
                  </span>

                  {/* Left: 9:16 Vertical Video Player Stage */}
                  <div className="shrink-0 flex justify-center">
                    <div
                      onClick={() => {
                        playClick?.();
                        onSelectProject(project);
                      }}
                      onMouseEnter={() => {
                        playHover?.();
                        onMouseEnterProject?.('PLAY 9:16');
                      }}
                      onMouseLeave={onMouseLeave}
                      className="relative aspect-[9/16] h-[52vh] max-h-[480px] w-auto rounded-xl overflow-hidden cursor-pointer border-2 border-white/15 group-hover:border-[#E50914] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_30px_rgba(229,9,20,0.3)] bg-black"
                    >
                      {/* Video Poster Image Fallback */}
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-40"
                      />

                      {/* Video Element */}
                      {project.videoUrl && (
                        <video
                          src={project.videoUrl}
                          poster={project.thumbnailUrl}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      )}

                      {/* 9:16 Cinematic HUD Overlays */}
                      <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none">
                        {/* Top HUD stamps */}
                        <div className="flex justify-between items-start font-mono-code text-[9px] text-white/90">
                          <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse-red" />
                            <span>9:16 REEL {project.number}</span>
                          </div>
                          <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-[#E50914] font-bold">
                            {project.fps || '60 FPS'}
                          </div>
                        </div>

                        {/* Center Hover Play Button */}
                        <div className="self-center p-3 rounded-full bg-[#E50914] text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_25px_rgba(229,9,20,0.8)]">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>

                        {/* Bottom HUD stamps */}
                        <div className="flex justify-between items-end font-mono-code text-[9px] text-white/80">
                          <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
                            TC: 00:00:{project.duration || '00:15'}
                          </div>
                          <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-emerald-400 font-bold flex items-center gap-1">
                            <span>4K MASTER</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Project Information & Details */}
                  <div className="flex-1 flex flex-col justify-between py-1 z-10">
                    <div>
                      {/* Top Category Badge */}
                      <div className="flex items-center gap-2 font-mono-code text-xs text-[#E50914] mb-2 font-bold">
                        <span>PROJECT 0{idx + 1}</span>
                        <span className="text-white/20">&bull;</span>
                        <span className="text-[#9E9B93] uppercase font-normal">{project.category}</span>
                        <span className="text-white/20">&bull;</span>
                        <span className="text-[#6B6862] text-[11px]">{project.year || '2026'}</span>
                      </div>

                      {/* Main Title */}
                      <h3 className="font-bebas text-4xl lg:text-5xl text-[#F2F0EC] tracking-wide mb-1">
                        {project.title}
                      </h3>

                      {/* Subtitle / Format */}
                      <p className="font-space text-xs uppercase text-[#E50914] tracking-wider mb-3.5 font-medium">
                        {project.subtitle}
                      </p>

                      {/* Project Description */}
                      <p className="font-sans text-xs lg:text-sm text-[#9E9B93] leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Deliverable / Pipeline Breakdown Tags */}
                      <div className="space-y-1.5 mb-5">
                        <div className="text-[10px] font-mono-code text-[#6B6862] uppercase tracking-wider">
                          PIPELINE & FORMAT SPECS:
                        </div>
                        <div className="flex flex-wrap gap-1.5 font-mono-code text-xs">
                          {project.deliverables.slice(0, 4).map((item, dIdx) => (
                            <span
                              key={dIdx}
                              className="bg-[#161616] border border-white/10 px-2.5 py-1 rounded text-[11px] text-[#F2F0EC]"
                            >
                              {item}
                            </span>
                          ))}
                          <span className="bg-[#E50914]/10 border border-[#E50914]/30 px-2 py-0.5 rounded text-[10px] text-[#E50914] font-bold">
                            9:16 VERTICAL
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
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
              <span>MOTION ARCHIVE &bull; 9:16 VERTICAL REELS</span>

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
                <span className="text-[#F2F0EC]">{showcaseProjects.length} VERTICAL PIECES</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================================= */}
      {/* MOBILE & TABLET SHOWCASE (< 1024px) - 9:16 VERTICAL SWIPE REEL */}
      {/* ======================================================================= */}
      <div className="block lg:hidden py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header with Touch Hints */}
          <div className="flex items-end justify-between gap-2 pb-4 editorial-border-b mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] tracking-widest uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
                VERTICAL ARCHIVE // 9:16 REELS
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

          {/* Native Horizontal Touch Reel with 9:16 Vertical Cards */}
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
                className="w-[84vw] sm:w-[70vw] max-w-[340px] shrink-0 bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                style={{ scrollSnapAlign: 'center' }}
              >
                {/* Background Project Number */}
                <span className="absolute right-3 bottom-0 font-bebas text-7xl sm:text-8xl text-white/[0.03] select-none pointer-events-none leading-none">
                  {project.number}
                </span>

                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 font-mono-code text-[11px] text-[#E50914] mb-2 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>PROJECT 0{idx + 1}</span>
                      <span className="text-white/20">&bull;</span>
                      <span className="text-[#9E9B93] uppercase font-normal text-[10px] truncate max-w-[120px]">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-[#6B6862] text-[10px]">{project.year || '2026'}</span>
                  </div>

                  {/* 9:16 Vertical Video Stage */}
                  <div
                    onClick={() => {
                      playClick?.();
                      onSelectProject(project);
                    }}
                    className="relative aspect-[9/16] max-h-[44vh] sm:max-h-[48vh] w-auto mx-auto rounded-xl overflow-hidden cursor-pointer border border-white/15 bg-black mb-3 active:scale-[0.99] transition-transform shadow-lg"
                  >
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90"
                      loading="lazy"
                    />
                    {project.videoUrl && (
                      <video
                        src={project.videoUrl}
                        poster={project.thumbnailUrl}
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                      />
                    )}

                    {/* Compact HUD Stamps */}
                    <div className="absolute inset-0 p-2.5 flex flex-col justify-between pointer-events-none font-mono-code text-[9px] text-white/90">
                      <div className="flex justify-between items-start">
                        <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                          <span>9:16 REEL</span>
                        </div>
                        <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-[#E50914]">
                          {project.fps || '60 FPS'}
                        </div>
                      </div>

                      <div className="self-center p-2.5 rounded-full bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
                          TC {project.duration || '00:15'}
                        </div>
                        <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-[#E50914] font-bold">
                          TAP TO PLAY
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-bebas text-2xl sm:text-3xl text-[#F2F0EC] tracking-wide mb-0.5 truncate">
                    {project.title}
                  </h3>
                  <p className="font-space text-[10px] sm:text-[11px] uppercase text-[#E50914] tracking-wider mb-2 font-medium truncate">
                    {project.subtitle}
                  </p>

                  {/* Deliverables Tags */}
                  <div className="flex flex-wrap gap-1 font-mono-code text-[9px] mb-3">
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
              <span>9:16 VERTICAL REELS</span>
            </div>
          </div>

        </div>
      </div>
      </>
      )}

    </section>
  );
};


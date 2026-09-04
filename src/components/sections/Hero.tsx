import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Play, ArrowDown, Disc3 } from 'lucide-react';
import { TimecodeHUD } from '@/components/common/TimecodeHUD';
import { usePortfolio } from '@/context/PortfolioContext';
import { CinematicVideoPlayer } from '@/components/common/CinematicVideoPlayer';

interface HeroProps {
  onOpenReel: () => void;
  onExploreWork: () => void;
  onOpenContact?: () => void;
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReel,
  onExploreWork,
  onOpenContact,
  onMouseEnterProject,
  onMouseLeave,
  playClick,
  playHover,
}) => {
  const { settings, profile, projects, isLoading } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run animations if we are not loading
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(['.hero-title-line', '.hero-badge', '.hero-desc', '.hero-cta', '.hero-footer-item'], {
        y: 40,
        opacity: 0,
      });

      // Animate in sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('.hero-title-line', {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.1,
      })
      .to('.hero-desc', {
        y: 0,
        opacity: 1,
        duration: 0.7,
      }, '-=0.5')
      .to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4')
      .to('.hero-footer-item', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
      }, '-=0.3');

      // Video card entrance
      if (videoCardRef.current) {
        gsap.fromTo(
          videoCardRef.current,
          { scale: 0.95, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
        );
      }

      // Small floating animation for subtle depth
      gsap.to('.hero-badge-anim', {
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.7,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  // Single Source of Truth: Use CMS site_settings or first CMS project (never mixkit template videos)
  const videoUrl = settings?.hero_video_url || (projects.length > 0 ? projects[0]?.videoUrl : null);
  const posterUrl = settings?.hero_poster_url || (projects.length > 0 ? projects[0]?.thumbnailUrl : null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen pt-16 sm:pt-20 lg:pt-28 pb-6 sm:pb-10 lg:pb-16 flex flex-col justify-between overflow-hidden editorial-border-b"
    >
      {/* Background Decorative Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 pointer-events-none opacity-20">
        <div className="editorial-border-r h-full" />
        <div className="editorial-border-r h-full hidden md:block" />
        <div className="editorial-border-r h-full hidden md:block" />
        <div className="h-full" />
      </div>

      {/* Top Editorial HUD & Metadata */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 mb-2 sm:mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 py-2 sm:py-3 editorial-border-b border-white/10 hero-badge-anim">
          
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-mono-code text-[10px] sm:text-[11px] text-[#E50914] font-bold">
              {settings?.hero_tagline ? settings.hero_tagline.split(']')[0] + ']' : '[ 2026 REEL ]'}
            </span>
            <span className="text-white/20 hidden xs:inline">•</span>
            <span className="font-mono-code text-[10px] sm:text-[11px] text-[#9E9B93] uppercase truncate max-w-[200px] sm:max-w-none">
              {settings?.hero_tagline?.includes(']') ? settings.hero_tagline.split(']')[1].trim() : 'POST-PRODUCTION • MOTION • COLOR'}
            </span>
          </div>

          <TimecodeHUD showFps={true} showLocation={true} showRec={true} />
        </div>
      </div>

      {/* Main Asymmetrical Hero Stage */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left / Center: Giant Condensed Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-4 hero-badge-anim flex-wrap">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#181818] border border-white/10 rounded font-mono-code text-[9px] sm:text-[10px] text-[#F2F0EC] uppercase tracking-wider">
                {profile?.name || 'VAISHAGH G.'} // FREELANCE
              </span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#E50914]/10 border border-[#E50914]/30 rounded font-mono-code text-[9px] sm:text-[10px] text-[#E50914] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                {settings?.hero_badge_text || 'AVAILABLE FOR HIRE'}
              </span>
            </div>

            <h1
              ref={heroTextRef}
              className="font-bebas text-[clamp(3.4rem,13.5vw,10rem)] leading-[0.85] tracking-tight text-[#F2F0EC] uppercase select-none"
            >
              <div className="overflow-hidden">
                <span className="hero-title-line block">{settings?.hero_heading_line1 || 'I CUT'}</span>
              </div>
              <div className="overflow-hidden flex items-center gap-2 sm:gap-4 flex-wrap">
                <span className="hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-[#F2F0EC] via-[#F2F0EC] to-[#9E9B93]">
                  {settings?.hero_heading_line2 || 'MOMENTS'}
                </span>
                <span className="hidden xl:inline-block font-mono-code text-xs text-[#E50914] tracking-widest uppercase border border-[#E50914]/30 px-3 py-1 rounded-full">
                  // 24.00 FPS
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-title-line block text-[#E50914]">{settings?.hero_heading_line3 || 'INTO'}</span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-title-line block">{settings?.hero_heading_line4 || 'STORIES.'}</span>
              </div>
            </h1>

            {/* Editorial Supporting Manifesto */}
            <div className="mt-3 sm:mt-6 max-w-xl hero-meta-anim">
              <p className="font-space text-xs sm:text-base md:text-xl text-[#9E9B93] leading-relaxed">
                "{settings?.hero_manifesto || 'Turning raw, chaotic footage into high-retention stories that leave an indelible mark on the screen.'}"
              </p>

              {/* Quick Action Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 mt-4 sm:mt-6">
                <button
                  onClick={() => {
                    playClick?.();
                    onOpenReel();
                  }}
                  onMouseEnter={() => {
                    playHover?.();
                    onMouseEnterProject?.('PLAY REEL');
                  }}
                  onMouseLeave={onMouseLeave}
                  className="min-h-[46px] px-5 sm:px-6 py-3 sm:py-3.5 bg-[#E50914] hover:bg-[#FF2A2A] active:scale-98 text-white font-bebas text-lg sm:text-xl tracking-wider rounded flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(229,9,20,0.5)] cursor-pointer group"
                >
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                  <span>{settings?.hero_cta_text || 'WATCH 2026 SHOWREEL'}</span>
                </button>

                <button
                  onClick={() => {
                    playClick?.();
                    onExploreWork();
                  }}
                  onMouseEnter={playHover}
                  className="min-h-[46px] px-5 sm:px-6 py-3 sm:py-3.5 bg-[#141414] hover:bg-white/10 border border-white/10 text-[#F2F0EC] font-space text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  <span>VIEW SELECTED WORK</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right: Featured Cinematic Visual / Overlapping Video Stage */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            
            {/* Showreel Card Frame */}
            <div
              ref={videoCardRef}
              onClick={() => {
                playClick?.();
                onOpenReel();
              }}
              onMouseEnter={() => {
                playHover?.();
                onMouseEnterProject?.('PLAY REEL');
              }}
              onMouseLeave={onMouseLeave}
              className="group relative bg-[#121212] border border-white/20 hover:border-white/50 rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 active:scale-[0.99]"
            >
              {/* Aspect Ratio Box */}
              <div className="aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/5] relative overflow-hidden bg-[#161616]">
                {isLoading ? (
                  <div className="absolute inset-0 w-full h-full bg-[#161616] animate-pulse flex items-center justify-center">
                    <span className="font-mono-code text-xs text-[#6B6862]">LOADING SHOWREEL...</span>
                  </div>
                ) : (
                  <CinematicVideoPlayer
                    src={videoUrl}
                    poster={posterUrl}
                    alt="2026 Showreel Preview"
                    aspectRatioClass="w-full h-full"
                    priority={true}
                    hoverScale={true}
                  />
                )}

                {/* Film HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none p-3.5 sm:p-4 flex flex-col justify-between z-10">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start font-mono-code text-[10px] text-white">
                    <div className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20 flex items-center gap-1.5 shadow">
                      <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
                      <span className="font-bold">2026 SHOWREEL</span>
                    </div>
                    <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded border border-white/20 text-[#9E9B93]">
                      4K // 60 FPS
                    </div>
                  </div>

                  {/* Center Play Button */}
                  <div className="self-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/80 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#E50914] group-hover:border-[#E50914] transition-all duration-300 shadow-xl">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex justify-between items-end font-mono-code text-[10px] text-white">
                    <div className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20 text-[#9E9B93]">
                      01:24
                    </div>
                    <div className="bg-[#E50914] text-white font-bold px-3 py-1 rounded text-[11px] shadow-lg flex items-center gap-1">
                      <span>WATCH REEL</span>
                      <span>&rarr;</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Card Strip */}
              <div className="p-3.5 sm:p-4 bg-[#141414] border-t border-white/10 flex items-center justify-between font-mono-code text-xs">
                <div>
                  <span className="text-white font-bold block text-[11px] sm:text-xs">
                    FEATURED SHOWREEL
                  </span>
                  <span className="text-[#9E9B93] text-[10px]">
                    Commercials • Motion Design • Color
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#E50914] font-bold text-xs">
                  <span>CLICK TO PLAY</span>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Editorial Tag */}
            <div className="absolute -bottom-5 -left-3 sm:-left-6 hidden sm:flex items-center gap-3 bg-[#0a0a0a] border border-white/20 px-4 py-2.5 rounded-xl shadow-2xl z-20">
              <Disc3 className="w-5 h-5 text-[#E50914] animate-spin" style={{ animationDuration: '4s' }} />
              <div>
                <span className="font-mono-code text-[9px] text-[#6B6862] uppercase block font-bold">SPECIALIZATION</span>
                <span className="font-space text-xs text-white font-bold tracking-wide">High-Retention Video Editing</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Editorial Ticker & Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 mt-4 sm:mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 pt-3 sm:pt-4 editorial-border-t border-white/10 font-mono-code text-xs text-[#9E9B93]">
          
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center sm:justify-start text-[9px] sm:text-xs">
            <span>&bull; BASED IN {profile?.location?.split('(')[0]?.trim() || 'INDIA'}</span>
            <span>&bull; {profile?.availability || 'AVAILABLE FOR COMMISSIONS'}</span>
            <span className="hidden md:inline-block">&bull; 100% TIMELINE PRECISION</span>
          </div>

          <button
            onClick={onExploreWork}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 sm:gap-2 text-[#F2F0EC] hover:text-[#E50914] transition-colors cursor-pointer group min-h-[40px]"
          >
            <span className="text-[10px] sm:text-[11px] tracking-widest uppercase">EXPLORE WORK</span>
            <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
          </button>

        </div>
      </div>

    </section>
  );
};

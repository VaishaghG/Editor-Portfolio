import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowUpRight, Disc3, Film } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface AboutProps {
  onOpenContact: () => void;
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const About: React.FC<AboutProps> = ({
  onOpenContact,
  playClick,
  playHover,
}) => {
  const { profile, isLoading } = usePortfolio();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = profile?.profile_image_url?.trim() || '';

  // Reset load state if profile image URL changes
  useEffect(() => {
    if (imageUrl) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [imageUrl]);

  const isBuffering = isLoading || (Boolean(imageUrl) && !imageLoaded && !imageError);

  const specializations = Array.isArray(profile?.specializations) && profile.specializations.length > 0
    ? profile.specializations
    : [
        'Instagram & High-Retention Short-Form Reels',
        'Commercial Brand Films & Product Spots',
        'Corporate Storytelling & Conference Recaps',
        'Kinetic Typography & Motion Graphics (After Effects)',
        'Adobe Premiere Pro & Lightroom Color Polish',
      ];

  return (
    <section id="about" className="relative py-10 sm:py-16 md:py-24 lg:py-32 editorial-border-b bg-[#080808] overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="pb-4 sm:pb-8 editorial-border-b">
          <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
            BIOGRAPHY // PHILOSOPHY
          </div>
          <h2 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-tight text-[#F2F0EC]">
            ABOUT <span className="text-[#E50914]">THE EDITOR</span>
          </h2>
        </div>

        {/* Editorial Magazine Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-6 sm:pt-10 items-center">
          
          {/* Left: Magazine Portrait Frame with Overlapping Cutouts */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative z-10 bg-[#121212] border border-white/15 rounded-xl overflow-hidden shadow-2xl p-1.5 sm:p-2 group">
              <div className="aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/5] relative rounded-lg overflow-hidden bg-black flex items-center justify-center">
                
                {/* Buffering Animation State */}
                {isBuffering && (
                  <div className="absolute inset-0 bg-[#0c0c0c] flex flex-col items-center justify-center p-6 z-10 select-none overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute w-44 h-44 bg-[#E50914]/15 rounded-full blur-2xl animate-pulse pointer-events-none" />
                    
                    {/* Grid texture overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#E50914_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                    {/* Animated HUD Spinner */}
                    <div className="relative mb-5 flex items-center justify-center">
                      {/* Outer dashed spinning ring */}
                      <div className="w-20 h-20 rounded-full border border-dashed border-[#E50914]/40 animate-[spin_8s_linear_infinite]" />
                      
                      {/* Inner fast glowing arc */}
                      <div className="absolute w-14 h-14 rounded-full border-2 border-transparent border-t-[#E50914] border-r-[#E50914]/50 animate-[spin_1.2s_linear_infinite]" />
                      
                      {/* Counter-rotating subtle ring */}
                      <div className="absolute w-16 h-16 rounded-full border border-white/10 border-b-white/40 animate-[spin_3s_linear_infinite_reverse]" />

                      {/* Center Disc Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Disc3 className="w-6 h-6 text-[#E50914] animate-pulse" />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-2.5 z-10">
                      <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
                      <span className="font-mono-code text-[11px] sm:text-xs font-bold tracking-widest text-[#F2F0EC] uppercase">
                        BUFFERING FEED...
                      </span>
                    </div>

                    {/* Audio / Video Waveform Equalizer */}
                    <div className="flex items-center gap-1.5 h-4 mb-2.5 z-10">
                      <span className="w-1 bg-[#E50914] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                      <span className="w-1 bg-[#E50914]/80 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.15s] h-4" />
                      <span className="w-1 bg-[#E50914] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s] h-2" />
                      <span className="w-1 bg-[#E50914]/90 rounded-full animate-[pulse_1s_ease-in-out_infinite_0.1s] h-3.5" />
                      <span className="w-1 bg-[#E50914]/70 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.25s] h-2.5" />
                    </div>

                    {/* Sub-label */}
                    <span className="font-mono-code text-[9px] text-[#9E9B93] tracking-widest uppercase z-10">
                      SYNCING PROFILE // 4K PRORES
                    </span>

                    {/* Corner Crosshairs */}
                    <div className="absolute top-3 left-3 text-[10px] font-mono-code text-white/30">+</div>
                    <div className="absolute top-3 right-3 text-[10px] font-mono-code text-white/30">+</div>
                    <div className="absolute bottom-3 left-3 text-[10px] font-mono-code text-white/30">+</div>
                    <div className="absolute bottom-3 right-3 text-[10px] font-mono-code text-white/30">+</div>
                  </div>
                )}

                {/* Standby State when database has no image */}
                {!isBuffering && (!imageUrl || imageError) && (
                  <div className="absolute inset-0 bg-[#0e0e0e] flex flex-col items-center justify-center p-6 select-none z-10">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                      <Film className="w-7 h-7 text-[#E50914]/80" />
                    </div>
                    <span className="font-bebas text-2xl tracking-wider text-[#F2F0EC]">
                      {profile?.name || 'VAISH.'}
                    </span>
                    <span className="font-mono-code text-[10px] text-[#9E9B93] tracking-widest uppercase mt-1">
                      NO FEED DETECTED // STANDBY
                    </span>
                  </div>
                )}

                {/* Portrait from Database */}
                {imageUrl && !imageError && (
                  <img
                    src={imageUrl}
                    alt={`${profile?.name || 'Vaish.'} - Video Editor`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    className={`w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-all duration-700 ${
                      imageLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
                    }`}
                  />
                )}

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none z-10" />

                {/* Overlaid Timecode & HUD stamp */}
                <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between pointer-events-none font-mono-code text-xs text-white z-20">
                  <div className="flex justify-between items-start">
                    <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 sm:py-1 rounded border border-white/10 text-[9px] sm:text-[10px]">
                      EDITOR ID: {profile?.editor_id || 'VG-2026'}
                    </span>
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E50914] animate-pulse" />
                  </div>

                  <div>
                    <span className="font-bebas text-xl sm:text-3xl tracking-wider text-white block drop-shadow-md">
                      {profile?.name || 'VAISH.'}
                    </span>
                    <span className="text-[#E50914] text-[10px] sm:text-xs font-mono-code block drop-shadow-sm">
                      {profile?.role_subtitle || 'POST-PRODUCTION LEAD'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Overlapping Badge - Location */}
            <div className="absolute -bottom-3 -right-2 sm:-bottom-8 sm:-right-6 bg-[#161616] border border-white/15 p-2.5 sm:p-4 rounded-lg shadow-2xl z-20 font-mono-code text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 font-bold mb-0.5 text-[10px] sm:text-xs">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{profile?.availability || 'AVAILABLE WORLDWIDE'}</span>
              </div>
              <span className="text-[#9E9B93] block text-[9px] sm:text-[11px]">BASED IN {profile?.location || 'INDIA (IST / REMOTE)'}</span>
            </div>

            {/* Overlapping Background Red Border Accent */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#E50914]/30 rounded-xl pointer-events-none hidden sm:block" />

          </div>

          {/* Right: Bio & Manifesto & Specializations */}
          <div className="lg:col-span-7 flex flex-col justify-center mt-3 lg:mt-0">
            
            <div className="inline-block font-mono-code text-[10px] sm:text-xs text-[#E50914] uppercase tracking-widest mb-1.5 sm:mb-2 font-bold">
              // TURNING RAW CLIPS INTO STORIES THAT HIT
            </div>

            <h3 className="font-space text-lg sm:text-2xl md:text-3xl font-bold text-[#F2F0EC] mb-3 sm:mb-5 leading-snug">
              "{profile?.philosophy_quote || 'Pacing is emotion. Every millisecond between cuts dictates how the viewer feels, remembers, and reacts.'}"
            </h3>

            <div className="space-y-2 sm:space-y-4 font-sans text-[#9E9B93] text-xs sm:text-base leading-relaxed mb-4 sm:mb-6">
              <p>
                {profile?.short_bio || 'I am a freelance video editor and motion designer obsessed with the craft of visual storytelling. Whether it\'s cutting a high-octane 30-second commercial reel that converts, or editing a nuanced brand documentary, I treat every frame with mathematical precision.'}
              </p>
              {profile?.long_bio && (
                <p className="hidden sm:block">
                  {profile.long_bio}
                </p>
              )}
            </div>

            {/* Core Specialization Checklist */}
            <div className="mb-4 sm:mb-6">
              <span className="font-mono-code text-[10px] sm:text-xs text-[#6B6862] uppercase tracking-wider block mb-1.5 sm:mb-2">
                AREAS OF EXPERTISE:
              </span>
              <div className="space-y-1.5 sm:space-y-2">
                {(specializations || []).slice(0, 4).map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 rounded bg-[#101010] border border-white/5 font-mono-code text-[11px] sm:text-xs text-[#F2F0EC]"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  playClick?.();
                  onOpenContact();
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto min-h-[46px] px-6 sm:px-8 py-3 sm:py-4 bg-[#E50914] hover:bg-[#FF2A2A] active:scale-98 text-white font-bebas text-lg sm:text-xl tracking-wider rounded transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>LET'S DISCUSS YOUR VISION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* The Editor's Edge - 4 Key Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-10 editorial-border-t">
          {[
            {
              number: "03+",
              title: "YEARS EDITING",
              description: "Hands-on experience with video editing and creative post-production."
            },
            {
              number: "03",
              title: "CREATIVE TOOLS",
              description: "Adobe Premiere Pro, After Effects and Lightroom."
            },
            {
              number: "9:16",
              title: "VERTICAL-FIRST",
              description: "Built for reels, short-form content and social-first storytelling."
            },
            {
              number: "4K",
              title: "DELIVERY READY",
              description: "High-resolution exports with attention to quality and detail."
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-[#0f0f0f] border border-white/10 hover:border-[#E50914]/40 transition-colors p-4 sm:p-6 rounded-xl flex flex-col justify-between group"
            >
              <span className="font-bebas text-3xl sm:text-5xl md:text-6xl text-[#F2F0EC] tracking-tight mb-1 group-hover:text-[#E50914] transition-colors">
                {card.number}
              </span>
              <div>
                <span className="font-mono-code text-[10px] sm:text-xs text-[#E50914] font-bold block uppercase tracking-wider">
                  {card.title}
                </span>
                <p className="font-space text-xs text-[#9E9B93] block mt-1 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

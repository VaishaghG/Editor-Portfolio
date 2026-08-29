import React from 'react';
import { ArrowUp, Mail, ExternalLink } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/common/Icons';
import { TimecodeHUD } from '@/components/common/TimecodeHUD';
import { usePortfolio } from '@/context/PortfolioContext';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenContact: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onOpenContact,
  playClick,
  playHover,
}) => {
  const { profile, settings } = usePortfolio();

  const instaUrl = profile?.instagram_url || `https://instagram.com/${profile?.instagram_handle?.replace('@', '') || 'vaishagh.edits'}`;
  const linkedinUrl = profile?.linkedin_url || `https://linkedin.com/in/${profile?.linkedin_handle || 'vaishagh'}`;
  const youtubeUrl = profile?.youtube_url || `https://youtube.com/${profile?.youtube_handle || '@vaishaghedits'}`;
  const emailUrl = `mailto:${profile?.email || 'vaishagh.cut@gmail.com'}`;

  const socialLinks = [
    { name: 'Instagram', handle: profile?.instagram_handle || '@vaishagh.edits', url: instaUrl, icon: InstagramIcon },
    { name: 'LinkedIn', handle: profile?.linkedin_handle || profile?.name || 'Vaishagh G.', url: linkedinUrl, icon: LinkedinIcon },
    { name: 'YouTube', handle: profile?.youtube_handle || '@vaishaghedits', url: youtubeUrl, icon: YoutubeIcon },
    { name: 'Email Direct', handle: profile?.email || 'vaishagh.cut@gmail.com', url: emailUrl, icon: Mail },
  ];

  return (
    <footer className="relative bg-[#060606] text-[#F2F0EC] border-t border-white/10 pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-10 lg:pb-12 overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Giant Editorial Brand Banner */}
        <div className="border-b border-white/10 pb-6 sm:pb-12 mb-6 sm:mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#E50914] font-mono-code text-[9px] sm:text-xs tracking-widest uppercase mb-1.5 sm:mb-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E50914] rounded-full animate-pulse-red" />
              POST-PRODUCTION &bull; MOTION DESIGN &bull; COLOR
            </div>
            <h2 className="font-bebas text-3xl sm:text-7xl md:text-8xl tracking-tight leading-none text-[#F2F0EC]">
              {settings?.footer_headline || profile?.name || 'VAISHAGH G.'}
            </h2>
            <p className="font-space text-xs sm:text-base text-[#9E9B93] mt-1.5 max-w-lg">
              {settings?.footer_manifesto || 'Turning raw, unstructured footage into cinematic visual experiences that captivate audiences and drive action.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full lg:w-auto">
            <button
              onClick={() => {
                playClick?.();
                onOpenContact();
              }}
              onMouseEnter={playHover}
              className="min-h-[44px] sm:min-h-[48px] px-5 sm:px-8 py-3 sm:py-4 bg-[#E50914] hover:bg-[#FF2A2A] active:scale-98 text-white font-bebas text-lg sm:text-2xl tracking-wider rounded transition-all shadow-[0_0_25px_rgba(229,9,20,0.4)] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>LET'S CUT YOUR NEXT FILM</span>
              <span>→</span>
            </button>

            <button
              onClick={() => {
                playClick?.();
                onScrollToTop();
              }}
              onMouseEnter={playHover}
              className="min-h-[44px] sm:min-h-[48px] p-3 sm:p-4 bg-[#141414] hover:bg-white/10 border border-white/10 text-white rounded transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-98"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform" />
              <span className="font-mono-code text-[11px] sm:hidden">BACK TO TOP</span>
            </button>
          </div>
        </div>

        {/* Middle Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pb-6 sm:pb-12 border-b border-white/10 text-xs font-mono-code">
          {/* Col 1: Location & Availability */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="text-[#6B6862] uppercase tracking-widest text-[9px] sm:text-[10px]">LOCATION</span>
            <span className="text-[#F2F0EC]">BANGALORE &bull; INDIA</span>
            <span className="text-[#9E9B93] text-[11px]">Available Worldwide (Remote)</span>
          </div>

          {/* Col 2: Current Status */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="text-[#6B6862] uppercase tracking-widest text-[9px] sm:text-[10px]">COMMISSIONS</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-bold">ACCEPTING PROJECTS</span>
            </div>
            <span className="text-[#9E9B93] text-[11px]">Turnaround: 24h – 7 Days</span>
          </div>

          {/* Col 3: Social Links */}
          <div className="flex flex-col gap-1 sm:gap-2 sm:col-span-2">
            <span className="text-[#6B6862] uppercase tracking-widest text-[9px] sm:text-[10px]">CONNECT / SOCIAL</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    className="min-h-[40px] sm:min-h-[44px] flex items-center justify-between p-2 sm:p-2.5 rounded bg-[#121212] hover:bg-[#1c1c1c] border border-white/5 hover:border-[#E50914]/40 transition-all text-[#9E9B93] hover:text-white group active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E50914] shrink-0" />
                      <span className="truncate text-[11px] sm:text-xs">{social.name}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-2.5 sm:gap-4 text-xs font-mono-code text-[#6B6862]">
          <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap justify-center">
            <TimecodeHUD showLocation={false} showRec={false} />
            <span className="hidden sm:inline-block">|</span>
            <span className="text-[#9E9B93] tracking-widest font-space uppercase text-[9px] sm:text-xs">
              EDITED WITH INTENTION.
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-xs">
            <span>&copy; {new Date().getFullYear()} VAISHAGH G.</span>
            <span>&bull;</span>
            <span className="text-[#F2F0EC]">CINEMATIC PORTFOLIO</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

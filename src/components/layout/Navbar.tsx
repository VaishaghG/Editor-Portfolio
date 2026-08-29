import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SoundToggle } from '@/components/common/SoundToggle';

interface NavbarProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleSound,
  onNavigate,
  onOpenContact,
  playClick,
  playHover,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section spy
      const sections = ['hero', 'work', 'showcase', 'about', 'services', 'process', 'tools', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'WORK', id: 'work' },
    { label: 'SHOWCASE', id: 'showcase' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'PROCESS', id: 'process' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    playClick?.();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[500] transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#080808]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 md:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          
          {/* Brand Signature */}
          <button
            onClick={() => handleLinkClick('hero')}
            onMouseEnter={playHover}
            className="group flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer min-h-[44px]"
          >
            <div className="w-2.5 h-2.5 bg-[#E50914] rounded-sm group-hover:rotate-45 transition-transform duration-300 shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
            <div>
              <span className="font-bebas text-xl sm:text-2xl tracking-wider text-[#F2F0EC] group-hover:text-[#E50914] transition-colors block leading-none">
                VAISHAGH G.
              </span>
              <span className="font-mono-code text-[8px] sm:text-[9px] tracking-widest text-[#9E9B93] block uppercase mt-0.5">
                VIDEO EDITOR &bull; MOTION
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Untouched) */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={playHover}
                  className="group relative font-space text-xs tracking-widest uppercase py-1 text-[#9E9B93] hover:text-[#F2F0EC] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                    )}
                    {link.label}
                  </span>
                  {/* Subtle red indicator underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#E50914] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Desktop Header Actions (Untouched) */}
          <div className="hidden sm:flex items-center gap-4">
            <SoundToggle isMuted={isMuted} onToggle={onToggleSound} onHover={playHover} />

            <button
              onClick={() => {
                playClick?.();
                onOpenContact();
              }}
              onMouseEnter={playHover}
              className="relative group overflow-hidden bg-[#F2F0EC] hover:bg-[#E50914] text-black hover:text-white px-4 py-1.5 rounded-full text-xs font-mono-code uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Actions: Sound Toggle + Dedicated MENU button */}
          <div className="flex md:hidden items-center gap-2">
            <div className="scale-90 origin-right">
              <SoundToggle isMuted={isMuted} onToggle={onToggleSound} onHover={playHover} />
            </div>

            <button
              onClick={() => {
                playClick?.();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] text-white hover:text-[#E50914] transition-all cursor-pointer border border-white/15 flex items-center gap-1.5 font-mono-code text-xs active:scale-95"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-[#E50914]" />
                  <span className="text-[#E50914] font-bold">CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4" />
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Dedicated Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[490] bg-[#060606]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24 pb-8 overflow-y-auto animate-fade-in safe-padding-bottom">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between font-mono-code text-[11px] text-[#6B6862] tracking-widest uppercase border-b border-white/10 pb-3">
              <span>SELECT DESTINATION</span>
              <span className="text-[#E50914] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                ONLINE
              </span>
            </div>

            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="flex items-center justify-between text-left py-3 border-b border-white/5 cursor-pointer min-h-[52px] group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono-code text-xs text-[#E50914] font-bold">0{idx + 1}</span>
                    <span
                      className={`font-bebas text-4xl tracking-wider transition-colors ${
                        isActive ? 'text-[#E50914]' : 'text-[#F2F0EC] group-hover:text-[#E50914]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#E50914] text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 mt-6">
            <button
              onClick={() => {
                playClick?.();
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full min-h-[52px] py-4 bg-[#E50914] text-white font-bebas text-2xl tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(229,9,20,0.6)] active:scale-98 transition-transform"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between font-mono-code text-[10px] text-[#6B6862] px-1">
              <span>VAISHAGH G. &bull; INDIA</span>
              <span>2026 EDITION</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    // 1.2s rapid counter animation
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });

      setFrame((prev) => (prev >= 24 ? 24 : prev + 1));
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent >= 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to('.preloader-content', {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
      }).to('.preloader-curtain-top', {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
      }, '-=0.1')
      .to('.preloader-curtain-bottom', {
        yPercent: 100,
        duration: 0.6,
        ease: 'power4.inOut',
      }, '<');
    }
  }, [percent, onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center overflow-hidden">
      {/* Top Split Curtain */}
      <div className="preloader-curtain-top absolute top-0 inset-x-0 h-1/2 bg-[#060606] border-b border-white/5" />
      
      {/* Bottom Split Curtain */}
      <div className="preloader-curtain-bottom absolute bottom-0 inset-x-0 h-1/2 bg-[#060606] border-t border-white/5" />

      {/* Center Cinematic Loading Sequence */}
      <div className="preloader-content relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        
        {/* Rec Indicator & Editorial Stamp */}
        <div className="flex items-center gap-3 mb-4 font-mono-code text-[11px] text-[#9E9B93]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse-red" />
          <span className="tracking-widest uppercase">INITIALIZING TIMELINE...</span>
          <span className="text-white/20">|</span>
          <span className="text-[#E50914] font-bold">FPS: 24.00</span>
        </div>

        {/* Big Name Reveal */}
        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#F2F0EC] mb-1">
          VAISHAGH G.
        </h1>
        
        <p className="font-space text-xs sm:text-sm tracking-[0.3em] uppercase text-[#E50914] font-medium mb-8">
          FREELANCE VIDEO EDITOR &bull; MOTION
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-[#E50914] shadow-[0_0_10px_#E50914] transition-all duration-75"
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>

        {/* Percentage & Timecode Readout */}
        <div className="flex items-center justify-between w-64 sm:w-80 font-mono-code text-[11px] text-[#6B6862]">
          <span>LOADING CUT</span>
          <span className="text-[#F2F0EC] font-bold">{Math.min(percent, 100)}%</span>
          <span>FRAME {frame.toString().padStart(3, '0')}</span>
        </div>

      </div>
    </div>
  );
};

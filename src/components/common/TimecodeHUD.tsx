import React from 'react';
import { useTimecode } from '@/hooks/useTimecode';

interface TimecodeHUDProps {
  className?: string;
  showLocation?: boolean;
  showFps?: boolean;
  showRec?: boolean;
}

export const TimecodeHUD: React.FC<TimecodeHUDProps> = ({
  className = '',
  showLocation = true,
  showFps = true,
  showRec = true,
}) => {
  const { timecode, frame, istTime, fps } = useTimecode();

  return (
    <div className={`flex flex-wrap items-center gap-3 md:gap-5 font-mono-code text-[11px] text-[#9E9B93] ${className}`}>
      {showRec && (
        <div className="flex items-center gap-1.5 bg-[#E50914]/10 border border-[#E50914]/30 px-2 py-0.5 rounded text-[#E50914] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse-red" />
          <span className="tracking-wider">REC</span>
        </div>
      )}

      {/* Live Timecode */}
      <div className="flex items-center gap-1.5">
        <span className="text-[#6B6862]">TC:</span>
        <span className="text-[#F2F0EC] tracking-widest font-medium">{timecode}</span>
      </div>

      {/* Frame Counter */}
      <div className="hidden sm:flex items-center gap-1.5">
        <span className="text-[#6B6862]">FR:</span>
        <span className="text-[#F2F0EC]">{frame.toString().padStart(4, '0')}</span>
      </div>

      {/* Frame Rate */}
      {showFps && (
        <div className="hidden md:flex items-center gap-1.5">
          <span className="text-[#6B6862]">FPS:</span>
          <span className="text-[#F2F0EC]">{fps}.00</span>
        </div>
      )}

      {/* Live IST Time */}
      {showLocation && (
        <div className="hidden lg:flex items-center gap-1.5 border-l border-white/10 pl-3">
          <span className="text-[#6B6862]">BLR / IST:</span>
          <span className="text-[#F2F0EC]">{istTime}</span>
        </div>
      )}
    </div>
  );
};

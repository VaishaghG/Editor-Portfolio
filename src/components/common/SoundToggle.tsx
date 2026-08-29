import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  onHover?: () => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ isMuted, onToggle, onHover }) => {
  return (
    <button
      onClick={onToggle}
      onMouseEnter={onHover}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#121212]/80 backdrop-blur-md hover:border-[#E50914] transition-all duration-300 cursor-pointer"
      title={isMuted ? 'Enable tactile sound FX' : 'Mute sound FX'}
      aria-label="Toggle sound FX"
    >
      {/* Visual equalizer animated bars */}
      <div className="flex items-end gap-[3px] h-3.5 w-3.5">
        <span
          className={`w-[2px] bg-[#E50914] rounded-full transition-all duration-300 ${
            !isMuted ? 'h-3 animate-pulse' : 'h-1 bg-white/40'
          }`}
        />
        <span
          className={`w-[2px] bg-[#E50914] rounded-full transition-all duration-300 ${
            !isMuted ? 'h-2 animate-bounce' : 'h-2 bg-white/40'
          }`}
        />
        <span
          className={`w-[2px] bg-[#E50914] rounded-full transition-all duration-300 ${
            !isMuted ? 'h-3.5 animate-pulse' : 'h-1.5 bg-white/40'
          }`}
        />
      </div>

      <span className="font-mono-code text-[10px] uppercase tracking-wider text-[#9E9B93] group-hover:text-[#F2F0EC] transition-colors">
        {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
      </span>

      {isMuted ? (
        <VolumeX className="w-3 h-3 text-[#6B6862] group-hover:text-[#E50914] transition-colors" />
      ) : (
        <Volume2 className="w-3 h-3 text-[#E50914]" />
      )}
    </button>
  );
};

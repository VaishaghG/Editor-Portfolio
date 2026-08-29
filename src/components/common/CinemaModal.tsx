import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, CheckCircle2 } from 'lucide-react';
import { Project } from '@/data/projects';

interface CinemaModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: (projectTitle: string) => void;
  playClick?: () => void;
}

export const CinemaModal: React.FC<CinemaModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenContact,
  playClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === ' ' && isOpen) {
        e.preventDefault();
        togglePlay();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setIsPlaying(true);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const togglePlay = () => {
    playClick?.();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    playClick?.();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const f = Math.floor((sec % 1) * 24);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${f.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    playClick?.();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-xl animate-fade-in">
      {/* Background click overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Cinema Box */}
      <div className="relative z-10 w-full max-w-6xl max-h-[96vh] sm:max-h-[92vh] bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 bg-[#121212]/90 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse-red" />
            <span className="font-mono-code text-[10px] sm:text-[11px] uppercase tracking-widest text-[#9E9B93] truncate max-w-[180px] sm:max-w-none">
              PROJECT {project.number} // {project.category}
            </span>
            <span className="hidden md:inline-block text-white/20">|</span>
            <span className="hidden md:inline-block font-mono-code text-[11px] text-[#E50914]">
              {project.aspectRatio} // {project.fps}
            </span>
          </div>

          <button
            onClick={() => {
              playClick?.();
              onClose();
            }}
            className="min-h-[40px] min-w-[40px] flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#E50914] text-white transition-all text-xs font-mono-code cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player & Stage */}
        <div className="relative bg-black w-full aspect-video max-h-[38vh] sm:max-h-[52vh] flex items-center justify-center overflow-hidden group shrink-0">
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.thumbnailUrl}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            className="w-full h-full object-contain"
            onClick={togglePlay}
          />

          {/* Center Play Button Overlay on Hover/Pause */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E50914]/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(229,9,20,0.6)] cursor-pointer hover:scale-110 transition-transform"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            </button>
          )}

          {/* On-screen Timecode Stamp */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/70 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-white/10 font-mono-code text-[10px] sm:text-xs text-[#F2F0EC]">
            TC {formatSeconds(currentTime)}
          </div>

          {/* Color LUT stamp */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-white/10 font-mono-code text-[9px] sm:text-[10px] text-[#9E9B93] hidden sm:block">
            GRADE: {project.colorGrade}
          </div>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2 sm:p-3 pt-6 flex flex-col gap-1.5 sm:gap-2 opacity-95 group-hover:opacity-100 transition-opacity">
            {/* Scrubber track */}
            <div className="relative w-full h-2 sm:h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#E50914] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between text-white text-xs font-mono-code pt-0.5">
              <div className="flex items-center gap-3 sm:gap-4">
                <button onClick={togglePlay} className="p-1 hover:text-[#E50914] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button onClick={toggleMute} className="p-1 hover:text-[#E50914] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center">
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[#9E9B93] text-[10px] sm:text-xs">
                  {formatSeconds(currentTime)} / {formatSeconds(duration || 60)}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-white/10 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] text-[#9E9B93]">4K PRORES</span>
                <button onClick={handleFullscreen} className="p-1 hover:text-[#E50914] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Case Study Content & Tabs */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0c0c0c] border-t border-white/10">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
            
            {/* Left: Title & Descriptions */}
            <div className="flex-1">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                <span className="text-[#E50914] font-mono-code text-xs font-bold">{project.number}</span>
                <span className="text-[#9E9B93] text-[11px] sm:text-xs uppercase font-mono-code">{project.client}</span>
                <span className="text-white/20">•</span>
                <span className="text-[#9E9B93] text-[11px] sm:text-xs font-mono-code">{project.year}</span>
              </div>

              <h2 className="font-bebas text-2xl sm:text-4xl tracking-wide text-[#F2F0EC] mb-1 sm:mb-2">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-space text-[#E50914] uppercase tracking-wider mb-3 sm:mb-4 font-medium">
                {project.subtitle}
              </p>

              <p className="text-[#9E9B93] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {project.description}
              </p>

              {/* Deliverables tags */}
              <div className="mb-4">
                <span className="text-[10px] sm:text-xs font-mono-code text-[#6B6862] uppercase tracking-wider block mb-2">
                  DELIVERABLES:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 bg-[#181818] border border-white/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs text-[#F2F0EC]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#E50914] shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Sidebar & Inquire CTA */}
            <div className="w-full lg:w-80 bg-[#141414] border border-white/10 p-4 sm:p-5 rounded-lg flex flex-col gap-3.5 sm:gap-4">
              <span className="font-mono-code text-[10px] text-[#6B6862] uppercase tracking-widest border-b border-white/10 pb-2">
                TECHNICAL SPECS
              </span>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs font-mono-code">
                <div>
                  <span className="text-[#6B6862] block text-[9px] sm:text-[10px]">TIMELINE</span>
                  <span className="text-[#F2F0EC]">{project.duration}</span>
                </div>
                <div>
                  <span className="text-[#6B6862] block text-[9px] sm:text-[10px]">FRAME RATE</span>
                  <span className="text-[#F2F0EC]">{project.fps}</span>
                </div>
                <div>
                  <span className="text-[#6B6862] block text-[9px] sm:text-[10px]">ASPECT RATIO</span>
                  <span className="text-[#F2F0EC]">{project.aspectRatio}</span>
                </div>
                <div>
                  <span className="text-[#6B6862] block text-[9px] sm:text-[10px]">COLOR GRADE</span>
                  <span className="text-[#F2F0EC] text-[10px] sm:text-[11px] truncate">{project.colorGrade}</span>
                </div>
              </div>

              <div>
                <span className="text-[#6B6862] block text-[9px] sm:text-[10px] font-mono-code mb-1 sm:mb-1.5">SOFTWARE PIPELINE</span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.software.map((sw, idx) => (
                    <span key={idx} className="bg-white/5 px-2 py-0.5 rounded text-[10px] sm:text-[11px] text-[#9E9B93] font-mono-code">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              {project.metrics && (
                <div className="bg-[#E50914]/10 border border-[#E50914]/30 p-2.5 sm:p-3 rounded">
                  <span className="text-[#E50914] text-[9px] sm:text-[10px] font-mono-code block font-bold">IMPACT METRIC</span>
                  <span className="text-white text-xs font-medium">{project.metrics}</span>
                </div>
              )}

              <button
                onClick={() => {
                  playClick?.();
                  onClose();
                  onOpenContact(project.title);
                }}
                className="w-full min-h-[48px] mt-1 sm:mt-2 py-3 bg-[#E50914] hover:bg-[#FF2A2A] active:scale-98 text-white font-bebas text-lg tracking-wider rounded transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REQUEST SIMILAR EDIT</span>
                <span>→</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

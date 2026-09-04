import React, { useState, useRef, useEffect } from 'react';

interface CinematicVideoPlayerProps {
  src?: string | null;
  poster?: string | null;
  alt?: string;
  className?: string;
  aspectRatioClass?: string;
  objectFit?: 'cover' | 'contain';
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  priority?: boolean;
  hoverScale?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  src,
  poster,
  alt = 'Project Visual',
  className = '',
  aspectRatioClass = 'aspect-[9/16]',
  objectFit = 'cover',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  priority = false,
  hoverScale = true,
  videoRef: externalVideoRef,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const videoElement = externalVideoRef || internalVideoRef;

  // Reset states when src changes
  useEffect(() => {
    setIsVideoReady(false);
    setIsBuffering(false);
    setHasError(false);
  }, [src]);

  // Attempt to play if autoPlay is requested
  useEffect(() => {
    if (src && autoPlay && videoElement.current && isVideoReady) {
      videoElement.current.play().catch(() => {
        // Autoplay restrictions handle silently
      });
    }
  }, [src, autoPlay, isVideoReady, videoElement]);

  const handleCanPlay = () => {
    setIsVideoReady(true);
    setIsBuffering(false);
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsVideoReady(true);
    setIsBuffering(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsBuffering(false);
  };

  const hasMedia = Boolean(src || poster);

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden bg-[#0a0a0a] ${aspectRatioClass} ${className}`}
    >
      {/* 1. Empty / Loading Skeleton if neither poster nor video is available yet */}
      {!hasMedia && (
        <div className="absolute inset-0 w-full h-full bg-[#121212] flex items-center justify-center animate-pulse border border-white/5">
          <div className="flex items-center gap-2 font-mono-code text-[10px] text-[#6B6862]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
            <span>CONNECTING MEDIA...</span>
          </div>
        </div>
      )}

      {/* 2. Real Supabase Thumbnail Image (Rendered immediately as base layer) */}
      {poster && (
        <img
          src={poster}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`absolute inset-0 w-full h-full ${
            objectFit === 'contain' ? 'object-contain' : 'object-cover'
          } transition-transform duration-700 ${
            hoverScale ? 'group-hover:scale-105' : ''
          } ${
            !isVideoReady && src
              ? 'filter blur-[1.5px] scale-[1.01] opacity-95'
              : 'opacity-90 group-hover:opacity-100'
          }`}
        />
      )}

      {/* 3. Real Supabase Video Element (Smoothly fades in once loaded) */}
      {src && !hasError && (
        <video
          ref={videoElement}
          src={src}
          poster={poster || undefined}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          preload={priority ? 'auto' : 'metadata'}
          onLoadedData={handleCanPlay}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onError={handleError}
          className={`absolute inset-0 w-full h-full ${
            objectFit === 'contain' ? 'object-contain' : 'object-cover'
          } transition-opacity duration-700 ${
            isVideoReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}

      {/* 4. Premium Cinematic Buffering / Loading Overlay while video is preparing */}
      {src && (!isVideoReady || isBuffering) && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[1px] pointer-events-none z-10 transition-opacity duration-500">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
            <span className="font-mono-code text-[9px] sm:text-[10px] text-white/90 tracking-widest uppercase">
              {isBuffering ? 'BUFFERING' : 'LOADING STREAM'}
            </span>
          </div>
        </div>
      )}

      {/* 5. Custom HUD / Controls Overlays pass-through */}
      {children}
    </div>
  );
};

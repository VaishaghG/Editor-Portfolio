import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <>
      {/* Dynamic Animated Film Grain */}
      <div className="grain-layer" aria-hidden="true" />
      
      {/* Subtle CRT / Film Scanlines for retro-futuristic texture */}
      <div className="fixed inset-0 scanlines pointer-events-none z-[990] opacity-25" aria-hidden="true" />
    </>
  );
};

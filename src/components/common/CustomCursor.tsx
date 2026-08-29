import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export interface CursorState {
  text: string;
  variant: 'default' | 'pointer' | 'project' | 'play' | 'close' | 'drag';
  visible: boolean;
}

interface CustomCursorProps {
  cursorState: CursorState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const touchDetected = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
      setIsTouch(touchDetected);
      return touchDetected;
    };

    if (checkTouch()) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.28,
        ease: 'power3.out',
      });
    };

    const onResize = () => {
      checkTouch();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (isTouch) return null;

  const isProject = cursorState.variant === 'project';
  const isPlay = cursorState.variant === 'play';
  const isClose = cursorState.variant === 'close';
  const isPointer = cursorState.variant === 'pointer';
  const isDrag = cursorState.variant === 'drag';
  const hasText = Boolean(cursorState.text);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#E50914] rounded-full pointer-events-none z-[9999] transition-opacity duration-200"
        style={{
          opacity: cursorState.visible ? (isProject || isPlay ? 0 : 1) : 0,
        }}
      />

      {/* Trailing Responsive Ring / Morphing Capsule */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] flex items-center justify-center transition-all duration-300 ${
          isProject
            ? 'w-24 h-24 bg-[#E50914] text-white rounded-full shadow-[0_0_30px_rgba(229,9,20,0.5)]'
            : isPlay
            ? 'w-20 h-20 bg-[#F2F0EC] text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]'
            : isClose
            ? 'w-14 h-14 bg-[#E50914] text-white rounded-full'
            : isDrag
            ? 'w-18 h-18 bg-[#181818] border border-[#E50914] text-white rounded-full'
            : isPointer
            ? 'w-10 h-10 border border-[#E50914] bg-[#E50914]/10 rounded-full scale-110'
            : 'w-7 h-7 border border-[#F2F0EC]/40 rounded-full'
        }`}
        style={{
          opacity: cursorState.visible ? 1 : 0,
        }}
      >
        {hasText && (
          <span className="font-bebas tracking-widest text-xs uppercase font-bold select-none text-center px-1">
            {cursorState.text}
          </span>
        )}
      </div>
    </>
  );
};

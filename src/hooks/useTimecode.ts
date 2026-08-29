import { useState, useEffect } from 'react';

export function useTimecode() {
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [frame, setFrame] = useState(0);
  const [istTime, setIstTime] = useState('');
  const [fps] = useState(24);

  useEffect(() => {
    let frameCount = 0;
    const interval = setInterval(() => {
      frameCount++;
      const currentFrame = frameCount % fps;
      const totalSeconds = Math.floor(frameCount / fps);
      const seconds = totalSeconds % 60;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const hours = Math.floor(totalSeconds / 3600);

      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimecode(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(currentFrame)}`);
      setFrame(frameCount);

      // India Standard Time (IST)
      const now = new Date();
      const istString = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setIstTime(istString);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [fps]);

  return { timecode, frame, istTime, fps };
}

'use client';

import React, { useRef, useEffect } from 'react';

const SIZE = 512;
const FRAME_COUNT = 6;
const FRAME_INTERVAL = 42; // ~24fps

export const Noise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = SIZE;
    canvas.height = SIZE;

    // Generate a few noise frames once and cycle through them, instead of
    // computing 262k random pixels on every tick.
    const frames = Array.from({ length: FRAME_COUNT }, () => {
      const imageData = ctx.createImageData(SIZE, SIZE);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 15;
      }
      return imageData;
    });

    let frame = 0;
    ctx.putImageData(frames[0], 0, 0);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      if (document.hidden) return;
      frame = (frame + 1) % FRAME_COUNT;
      ctx.putImageData(frames[frame], 0, 0);
    }, FRAME_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 w-full h-full z-[9998] mix-blend-difference"
      style={{ imageRendering: 'pixelated', willChange: 'transform, opacity' }}
    />
  );
};


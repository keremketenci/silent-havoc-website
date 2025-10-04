'use client';

import React, { useRef, useEffect, useState } from 'react';

const Noise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 512;
    canvas.width = size;
    canvas.height = size;

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    const draw = () => {
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 15;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const interval = setInterval(draw, 42); // ~24fps
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 w-full h-full z-[9998] mix-blend-difference"
      style={{ imageRendering: 'pixelated', willChange: 'transform, opacity' }}
    />
  );
};

export default Noise;

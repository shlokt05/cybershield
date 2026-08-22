import React, { useEffect, useRef } from 'react';

export const CyberCodeRainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const charSet = '01CYBERSHIELDNMAPAES256SQLiXSSOWASPSHA256SIEMEDRCTFSOC01010101';
    const characters = charSet.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 10, 18, 0.08)'; // Smooth tail fade out
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Alternating glowing Cyan and Emerald code text
        if (i % 3 === 0) {
          ctx.fillStyle = '#06b6d4'; // Cyan 500
        } else if (i % 5 === 0) {
          ctx.fillStyle = '#a855f7'; // Purple 500
        } else {
          ctx.fillStyle = '#10b981'; // Emerald 500
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20 filter blur-[0.3px]"
    />
  );
};

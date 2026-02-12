"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  gravity: number;
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const colors = ["#c8102e", "#d4a853", "#e8274a", "#f0cc7a", "#fce4ec", "#ff6b6b"];

  const burst = (x: number, y: number) => {
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = 2 + Math.random() * 5;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 4,
        gravity: 0.08 + Math.random() * 0.05,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Auto bursts on page load
    let count = 0;
    const autoInterval = setInterval(() => {
      if (count > 6) {
        clearInterval(autoInterval);
        return;
      }
      burst(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.6
      );
      count++;
    }, 400);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.alpha > 0.01);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.alpha -= 0.015;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    const handleClick = (e: MouseEvent) => {
      burst(e.clientX, e.clientY);
    };
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", handleClick);
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(autoInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-container"
      style={{ pointerEvents: "none" }}
    />
  );
}

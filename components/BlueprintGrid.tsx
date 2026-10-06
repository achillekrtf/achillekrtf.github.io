"use client";

import { useEffect, useRef } from "react";

/**
 * A slow, technical background: a fine grid, and lines that fan out from two
 * focal points and drift. Drawn on a
 * canvas, paused when off screen, and static for reduced-motion users.
 */
export default function BlueprintGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lines = 26;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // Grid.
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      const step = 28;
      ctx.beginPath();
      for (let x = (width % step) / 2; x < width; x += step) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = (height % step) / 2; y < height; y += step) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      // Fanning lines between two focal points, gently breathing.
      const cx = width * 0.62;
      const cy = height * 0.5;
      const pinch = 18 + 10 * Math.sin(t / 2600);
      for (let i = 0; i < lines; i++) {
        const f = i / (lines - 1);
        const spread = (f - 0.5) * width * 0.9;
        const wobble = Math.sin(t / 3000 + i * 0.4) * 6;
        const alpha = 0.05 + 0.12 * Math.exp(-((f - 0.5) ** 2) / 0.06);
        ctx.strokeStyle = `rgba(242,166,90,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(cx + spread + wobble, 0);
        ctx.bezierCurveTo(cx + spread * 0.25, cy * 0.6, cx + (f - 0.5) * pinch, cy * 0.9, cx + (f - 0.5) * pinch, cy);
        ctx.bezierCurveTo(cx + (f - 0.5) * pinch, cy * 1.1, cx + spread * 0.25, height - cy * 0.6, cx + spread - wobble, height);
        ctx.stroke();
      }

      // A few nodes drifting along the lines.
      for (let k = 0; k < 5; k++) {
        const p = ((t / 9000 + k / 5) % 1) * 2 - 1;
        const y = cy + p * cy;
        const x = cx + Math.sin(k * 1.7 + t / 4000) * Math.abs(p) * width * 0.25;
        ctx.fillStyle = "rgba(242,166,90,0.55)";
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    io.observe(canvas);
    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: a chain of blocks drifting left on a fine grid. Transactions
 * stream in as dots towards the block being mined, which fills up, seals with a
 * short flash and joins the chain; a few dots carry value back along the links.
 * Drawn on a canvas, faded on the left behind the text, paused when off screen,
 * and static for reduced-motion users.
 */
export default function ChainFlow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let visible = true;
    let W = 0;
    let H = 0;


    const clamp = (a: number) => Math.max(0, Math.min(1, a)).toFixed(3);
    const blue = (a: number) => `rgba(79,155,255,${clamp(a)})`;      // chain and transactions
    const amber = (a: number) => `rgba(242,166,90,${clamp(a)})`;     // sealing flash and value
    const slate = (a: number) => `rgba(148,170,200,${clamp(a)})`;    // grid
    // Blue to amber, u in [0, 1].
    const glow = (u: number, a: number) =>
      `rgba(${Math.round(79 + 163 * u)},${Math.round(155 + 11 * u)},${Math.round(255 - 165 * u)},${clamp(a)})`;
    const frac = (x: number) => x - Math.floor(x);
    // Deterministic pseudo-random in [0, 1) from two integers.
    const hash = (a: number, b: number) => frac(Math.sin(a * 127.1 + b * 311.7) * 43758.5453);
    const smooth = (e0: number, e1: number, x: number) => {
      const u = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
      return u * u * (3 - 2 * u);
    };

    const draw = (t: number) => {
      const s = t / 1000;
      ctx.clearRect(0, 0, W, H);
      const narrow = W < 768;
      const global = narrow ? 0.55 : 1;
      // Fade everything towards the left, where the hero text sits.
      const fade = (x: number) => global * (narrow ? 1 : 0.15 + 0.85 * smooth(W * 0.3, W * 0.62, x));

      // Grid.
      ctx.strokeStyle = slate(0.06);
      ctx.lineWidth = 1;
      const step = 28;
      ctx.beginPath();
      for (let x = (W % step) / 2; x < W; x += step) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H);
      }
      for (let y = (H % step) / 2; y < H; y += step) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
      }
      ctx.stroke();

      // Chain geometry.
      const B = Math.max(26, Math.min(46, W / 30));        // block size
      const S = B * 2.3;                                    // spacing between block centres
      const v = B * 0.45;                                   // drift speed, px/s
      const depth = B * 0.28;
      const chainY = (x: number) => H * (narrow ? 0.78 : 0.56) - (x - W * 0.5) * 0.07 + Math.sin(x / (W * 0.35) + 0.8) * H * 0.025;
      const mineX = W * (narrow ? 0.86 : 0.8);
      const enterX = W + S * 0.6;
      const shift = v * s;
      const kMin = Math.ceil((-S + shift) / S);
      const kMax = Math.floor((W + S + shift) / S);
      const blocks: { x: number; y: number; fill: number; flash: number; seal: number }[] = [];
      for (let k = kMin; k <= kMax; k++) {
        const x = k * S - shift;
        const fill = Math.max(0, Math.min(1, (enterX - x) / (enterX - mineX)));
        // The flash rises quickly once the block passes the mining point, then decays.
        const d = mineX - x;
        const flash = d > 0 ? (1 - Math.exp(-d / (S * 0.06))) * Math.exp(-d / (S * 0.4)) : 0;
        // How sealed the block looks, eased in over the last stretch before the mining point.
        const seal = smooth(-S * 0.25, S * 0.05, d);
        blocks.push({ x, y: chainY(x), fill, flash, seal });
      }

      // Links between consecutive blocks, with a small hash node in the middle.
      for (let i = 0; i < blocks.length - 1; i++) {
        const a = blocks[i];
        const b = blocks[i + 1];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const al = fade(mx) * (0.12 + 0.16 * b.seal);
        ctx.strokeStyle = blue(al);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x + B / 2, a.y - 3);
        ctx.lineTo(b.x - B / 2, b.y - 3);
        ctx.moveTo(a.x + B / 2, a.y + 3);
        ctx.lineTo(b.x - B / 2, b.y + 3);
        ctx.stroke();
        ctx.fillStyle = blue(al * 1.6);
        ctx.beginPath();
        ctx.arc(mx, my, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Blocks: a front face with a hint of depth, transaction lines filling up inside.
      for (const b of blocks) {
        const f = fade(b.x);
        const edge = 0.2 + 0.22 * b.seal + 0.5 * b.flash;
        const x0 = b.x - B / 2;
        const y0 = b.y - B / 2;
        // depth faces
        ctx.strokeStyle = blue(f * edge * 0.45);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0 + depth, y0 - depth);
        ctx.lineTo(x0 + B + depth, y0 - depth);
        ctx.lineTo(x0 + B + depth, y0 + B - depth);
        ctx.lineTo(x0 + B, y0 + B);
        ctx.moveTo(x0 + B, y0);
        ctx.lineTo(x0 + B + depth, y0 - depth);
        ctx.stroke();
        // front face
        ctx.fillStyle = `rgba(16,22,30,${(0.9 * f).toFixed(3)})`;
        ctx.fillRect(x0, y0, B, B);
        ctx.strokeStyle = glow(Math.min(1, b.flash * 1.4), f * edge);
        ctx.lineWidth = 1 + b.flash;
        ctx.strokeRect(x0 + 0.5, y0 + 0.5, B, B);
        ctx.lineWidth = 1;
        // transactions
        const rows = 4;
        const filled = b.fill * rows;
        for (let r = 0; r < rows; r++) {
          const w = Math.max(0, Math.min(1, filled - r)) * (B * 0.62) * (0.7 + 0.3 * hash(Math.round(b.x / S + shift / S), r));
          if (w <= 0) continue;
          ctx.strokeStyle = blue(f * (0.46 + 0.14 * b.seal));
          ctx.beginPath();
          const ly = y0 + B * (0.26 + r * 0.16);
          ctx.moveTo(x0 + B * 0.19, ly);
          ctx.lineTo(x0 + B * 0.19 + w, ly);
          ctx.stroke();
        }
        if (b.flash > 0.05) {
          ctx.strokeStyle = amber(f * b.flash * 0.35);
          ctx.strokeRect(x0 - 4 * b.flash - 0.5, y0 - 4 * b.flash - 0.5, B + 8 * b.flash + 1, B + 8 * b.flash + 1);
        }
      }

      // Transactions streaming in. Each dot aims for the block that will still be
      // pending when it lands and follows that block as it drifts, so no dot ever
      // jumps to a new target mid-flight.
      {
        const N = narrow ? 14 : 26;
        for (let j = 0; j < N; j++) {
          const period = 2.4 + 1.6 * hash(j, 1);
          const phase = s / period + hash(j, 2);
          const cycle = Math.floor(phase);
          const u = frac(phase);
          const landAt = (cycle + 1 - hash(j, 2)) * period;
          const k = Math.ceil((mineX + v * landAt) / S);
          const fromTop = hash(j, cycle) < 0.5;
          const sx = W * (0.42 + 0.6 * hash(cycle, j + 7));
          const sy = fromTop ? -10 : H + 10;
          const tx = k * S - shift;
          const ty = chainY(tx);
          const cx = (sx + tx) / 2 + (hash(j, cycle + 3) - 0.5) * W * 0.25;
          const cy = fromTop ? ty - H * 0.2 : ty + H * 0.2;
          const e = u * u * (3 - 2 * u);
          for (let tail = 0; tail < 4; tail++) {
            const q = Math.max(0, e - tail * 0.025);
            const px = (1 - q) * (1 - q) * sx + 2 * (1 - q) * q * cx + q * q * tx;
            const py = (1 - q) * (1 - q) * sy + 2 * (1 - q) * q * cy + q * q * ty;
            const a = fade(px) * (0.6 - tail * 0.14) * Math.min(1, (1 - u) * 6) * Math.min(1, u * 8);
            ctx.fillStyle = blue(a);
            ctx.beginPath();
            ctx.arc(px, py, tail === 0 ? 1.7 : 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Value moving back along the sealed chain.
      for (let m = 0; m < 4; m++) {
        const u = frac(s / (7 + m * 1.3) + hash(m, 9));
        const x = mineX - u * (mineX + S);
        const y = chainY(x);
        ctx.fillStyle = amber(fade(x) * 0.7 * Math.min(1, (1 - u) * 5));
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(12000);
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
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

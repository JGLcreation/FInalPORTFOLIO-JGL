"use client";

import React, { useEffect, useRef } from "react";

interface LightningBolt {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  segments: { x: number; y: number }[];
  life: number;
  maxLife: number;
  width: number;
  color: string;
  glowColor: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface LightningCursorProps {
  color?: string;
  glowColor?: string;
  sparkColor?: string;
  intensity?: number;
  maxBolts?: number;
}

export const LightningCursor: React.FC<LightningCursorProps> = ({
  color = "#38bdf8",
  glowColor = "#60a5fa",
  sparkColor = "#93c5fd",
  intensity = 1,
  maxBolts = 6,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; px: number; py: number }>({
    x: -100,
    y: -100,
    px: -100,
    py: -100,
  });
  const isMovingRef = useRef(false);
  const moveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const bolts: LightningBolt[] = [];
    const particles: Particle[] = [];

    const createLightningSegments = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      roughness = 1.2
    ) => {
      const segments: { x: number; y: number }[] = [{ x: x1, y: y1 }];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.hypot(dx, dy);
      const steps = Math.max(3, Math.floor(distance / 12));

      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        // Normal vector
        const nx = -dy / (distance || 1);
        const ny = dx / (distance || 1);
        // Random offset that peaks in the middle
        const sway = Math.sin(t * Math.PI);
        const offset = (Math.random() - 0.5) * 28 * roughness * sway;

        segments.push({
          x: x1 + dx * t + nx * offset,
          y: y1 + dy * t + ny * offset,
        });
      }
      segments.push({ x: x2, y: y2 });
      return segments;
    };

    const addArc = (x: number, y: number, px: number, py: number) => {
      const dx = x - px;
      const dy = y - py;
      const dist = Math.hypot(dx, dy);

      // Trailing main discharge bolt
      if (dist > 3) {
        bolts.push({
          startX: px,
          startY: py,
          endX: x,
          endY: y,
          segments: createLightningSegments(px, py, x, y, 1.4),
          life: 0,
          maxLife: 8 + Math.random() * 6,
          width: 1.5 + Math.random() * 2,
          color: color,
          glowColor: glowColor,
        });
      }

      // Micro branch discharge arcing outward
      const angle = Math.random() * Math.PI * 2;
      const branchDist = 12 + Math.random() * 28 * intensity;
      const bx = x + Math.cos(angle) * branchDist;
      const by = y + Math.sin(angle) * branchDist;

      bolts.push({
        startX: x,
        startY: y,
        endX: bx,
        endY: by,
        segments: createLightningSegments(x, y, bx, by, 1.8),
        life: 0,
        maxLife: 6 + Math.random() * 4,
        width: 1 + Math.random() * 1.5,
        color: "#ffffff",
        glowColor: glowColor,
      });

      // Sparks
      for (let i = 0; i < 3; i++) {
        const spAngle = Math.random() * Math.PI * 2;
        const spSpeed = 0.8 + Math.random() * 2.8;
        particles.push({
          x,
          y,
          vx: Math.cos(spAngle) * spSpeed,
          vy: Math.sin(spAngle) * spSpeed,
          life: 0,
          maxLife: 14 + Math.random() * 10,
          size: 1 + Math.random() * 2,
          color: sparkColor,
        });
      }

      // Limit array sizes
      if (bolts.length > maxBolts * 3) bolts.splice(0, bolts.length - maxBolts * 3);
      if (particles.length > 50) particles.splice(0, particles.length - 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const prevX = mouseRef.current.x === -100 ? currentX : mouseRef.current.x;
      const prevY = mouseRef.current.y === -100 ? currentY : mouseRef.current.y;

      mouseRef.current = {
        x: currentX,
        y: currentY,
        px: prevX,
        py: prevY,
      };

      isMovingRef.current = true;
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
      moveTimerRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 70);

      addArc(currentX, currentY, prevX, prevY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Idle ambient electric crackle around cursor
      if (mouseRef.current.x > 0 && Math.random() < 0.35 * intensity) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const angle = Math.random() * Math.PI * 2;
        const r = 8 + Math.random() * 18;
        const tx = mx + Math.cos(angle) * r;
        const ty = my + Math.sin(angle) * r;

        bolts.push({
          startX: mx,
          startY: my,
          endX: tx,
          endY: ty,
          segments: createLightningSegments(mx, my, tx, ty, 2),
          life: 0,
          maxLife: 5 + Math.random() * 4,
          width: 0.8 + Math.random(),
          color: "#ffffff",
          glowColor: glowColor,
        });
      }

      // Draw lightning bolts
      ctx.save();
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life++;
        const progress = b.life / b.maxLife;

        if (progress >= 1) {
          bolts.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, 1 - progress);

        // Glow pass
        ctx.strokeStyle = b.glowColor;
        ctx.lineWidth = b.width * 3.5;
        ctx.globalAlpha = alpha * 0.45;
        ctx.shadowColor = b.glowColor;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        b.segments.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Core stroke pass
        ctx.strokeStyle = b.color;
        ctx.lineWidth = b.width;
        ctx.globalAlpha = alpha * 0.95;
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        b.segments.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }
      ctx.restore();

      // Draw sparks
      ctx.save();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        const progress = p.life / p.maxLife;

        if (progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;

        const alpha = Math.max(0, 1 - progress);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Central plasma core at cursor point
      if (mouseRef.current.x > 0) {
        ctx.save();
        const cx = mouseRef.current.x;
        const cy = mouseRef.current.y;

        // Plasma halo
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.7)");
        gradient.addColorStop(0.7, "rgba(96, 165, 250, 0.3)");
        gradient.addColorStop(1, "rgba(96, 165, 250, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fill();

        // Tiny brilliant electric nucleus
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    };
  }, [color, glowColor, sparkColor, intensity, maxBolts]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{ display: "block" }}
    />
  );
};

export default LightningCursor;

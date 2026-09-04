"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Facebook, Mail } from "lucide-react";
import { cn } from "../../lib/utils";

interface Bolt {
  points: { x: number; y: number }[];
  branches: { points: { x: number; y: number }[]; life: number; maxLife: number }[];
  life: number;
  maxLife: number;
  color: string;
  glowColor: string;
  width: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/JGLcreation",
    color: "#38bdf8",
    glowColor: "#0284c7",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/share/18BLpYXmsQ/",
    color: "#60a5fa",
    glowColor: "#3b82f6",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:jaysongeronlozada@gmail.com",
    color: "#a855f7",
    glowColor: "#8b5cf6",
  },
];

export const LightningSocialIcons: React.FC<{ className?: string }> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeShockIdx, setActiveShockIdx] = useState<number | null>(null);

  // References for animation loop state
  const boltsRef = useRef<Bolt[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const hoveredIdxRef = useRef<number | null>(null);
  hoveredIdxRef.current = hoveredIdx;

  // Generate jagged lightning path between two points
  const createLightningBolt = useCallback(
    (x1: number, y1: number, x2: number, y2: number, color = "#38bdf8", glowColor = "#60a5fa", width = 1.6): Bolt => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(4, Math.floor(dist / 8));
      const points: { x: number; y: number }[] = [{ x: x1, y: y1 }];

      // Normal perpendicular unit vector
      const nx = -dy / (dist || 1);
      const ny = dx / (dist || 1);

      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const envelope = Math.sin(t * Math.PI);
        const offset = (Math.random() - 0.5) * 22 * envelope;
        points.push({
          x: x1 + dx * t + nx * offset,
          y: y1 + dy * t + ny * offset,
        });
      }
      points.push({ x: x2, y: y2 });

      // Generate 1-2 small random lightning branches
      const branches: { points: { x: number; y: number }[]; life: number; maxLife: number }[] = [];
      if (dist > 15 && Math.random() < 0.6) {
        const branchStartIdx = Math.floor(1 + Math.random() * (points.length - 2));
        const startPt = points[branchStartIdx];
        if (startPt) {
          const branchAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.5;
          const branchLen = 8 + Math.random() * 18;
          const bx = startPt.x + Math.cos(branchAngle) * branchLen;
          const by = startPt.y + Math.sin(branchAngle) * branchLen;

          const bSteps = 3;
          const bPoints: { x: number; y: number }[] = [{ x: startPt.x, y: startPt.y }];
          for (let j = 1; j < bSteps; j++) {
            const bt = j / bSteps;
            bPoints.push({
              x: startPt.x + (bx - startPt.x) * bt + (Math.random() - 0.5) * 10,
              y: startPt.y + (by - startPt.y) * bt + (Math.random() - 0.5) * 10,
            });
          }
          bPoints.push({ x: bx, y: by });
          branches.push({ points: bPoints, life: 0, maxLife: 5 });
        }
      }

      return {
        points,
        branches,
        life: 0,
        maxLife: 4 + Math.floor(Math.random() * 4),
        color,
        glowColor,
        width,
      };
    },
    []
  );

  // Emit small electric sparks
  const emitSparks = useCallback((x: number, y: number, count = 3, color = "#93c5fd") => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3.5;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 10 + Math.floor(Math.random() * 12),
        color,
        size: 1.2 + Math.random() * 1.8,
      });
    }
  }, []);

  // Trigger lightning around a specific button's perimeter
  const spawnPerimeterLightning = useCallback(
    (btnIndex: number, intensity = 1) => {
      const container = containerRef.current;
      const btn = buttonRefs.current[btnIndex];
      if (!container || !btn) return;

      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();

      const bx = bRect.left - cRect.left;
      const by = bRect.top - cRect.top;
      const bw = bRect.width;
      const bh = bRect.height;

      const conf = SOCIAL_LINKS[btnIndex];

      const getPerimeterPoint = () => {
        const side = Math.floor(Math.random() * 4);
        switch (side) {
          case 0:
            return { x: bx + Math.random() * bw, y: by };
          case 1:
            return { x: bx + bw, y: by + Math.random() * bh };
          case 2:
            return { x: bx + Math.random() * bw, y: by + bh };
          default:
            return { x: bx, y: by + Math.random() * bh };
        }
      };

      const count = intensity > 1 ? 3 : 1;
      for (let i = 0; i < count; i++) {
        const p1 = getPerimeterPoint();
        const p2 = getPerimeterPoint();
        boltsRef.current.push(createLightningBolt(p1.x, p1.y, p2.x, p2.y, "#ffffff", conf.color, 1.8));
        emitSparks((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, 2, conf.color);
      }
    },
    [createLightningBolt, emitSparks]
  );

  // Trigger an electric arc jumping between two buttons
  const spawnInterButtonArc = useCallback(
    (idxA: number, idxB: number) => {
      const container = containerRef.current;
      const btnA = buttonRefs.current[idxA];
      const btnB = buttonRefs.current[idxB];
      if (!container || !btnA || !btnB) return;

      const cRect = container.getBoundingClientRect();
      const bRectA = btnA.getBoundingClientRect();
      const bRectB = btnB.getBoundingClientRect();

      const x1 = bRectA.right - cRect.left - 4;
      const y1 = bRectA.top - cRect.top + bRectA.height / 2 + (Math.random() - 0.5) * 12;

      const x2 = bRectB.left - cRect.left + 4;
      const y2 = bRectB.top - cRect.top + bRectB.height / 2 + (Math.random() - 0.5) * 12;

      boltsRef.current.push(createLightningBolt(x1, y1, x2, y2, "#ffffff", "#38bdf8", 2.2));
      emitSparks(x1, y1, 3, "#38bdf8");
      emitSparks(x2, y2, 3, "#60a5fa");

      setActiveShockIdx(idxB);
      setTimeout(() => setActiveShockIdx(null), 180);
    },
    [createLightningBolt, emitSparks]
  );

  // Main Canvas Render and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frameCount = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(rect.width * dpr, 200 * dpr);
      canvas.height = Math.max(rect.height * dpr, 60 * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    const render = () => {
      frameCount++;
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Hover continuous surge
      if (hoveredIdxRef.current !== null && frameCount % 3 === 0) {
        spawnPerimeterLightning(hoveredIdxRef.current, 2);
      }

      // Idle spontaneous lightning discharges
      if (hoveredIdxRef.current === null && frameCount % 70 === 0) {
        if (Math.random() < 0.55) {
          const randIdx = Math.floor(Math.random() * SOCIAL_LINKS.length);
          spawnPerimeterLightning(randIdx, 1);
          setActiveShockIdx(randIdx);
          setTimeout(() => setActiveShockIdx(null), 160);
        } else {
          const bridgeStart = Math.random() < 0.5 ? 0 : 1;
          spawnInterButtonArc(bridgeStart, bridgeStart + 1);
        }
      }

      // Update and Draw Lightning Bolts
      for (let b = boltsRef.current.length - 1; b >= 0; b--) {
        const bolt = boltsRef.current[b];
        bolt.life++;
        if (bolt.life >= bolt.maxLife) {
          boltsRef.current.splice(b, 1);
          continue;
        }

        const alpha = 1 - bolt.life / bolt.maxLife;

        // Outer glow stroke
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < bolt.points.length; i++) {
          const pt = bolt.points[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = bolt.glowColor;
        ctx.shadowColor = bolt.glowColor;
        ctx.shadowBlur = 12;
        ctx.lineWidth = bolt.width + 2.5;
        ctx.globalAlpha = alpha * 0.7;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Hot white core stroke
        ctx.beginPath();
        for (let i = 0; i < bolt.points.length; i++) {
          const pt = bolt.points[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 5;
        ctx.lineWidth = bolt.width;
        ctx.globalAlpha = alpha;
        ctx.stroke();

        // Micro branches
        for (const branch of bolt.branches) {
          branch.life++;
          if (branch.life < branch.maxLife) {
            ctx.beginPath();
            for (let j = 0; j < branch.points.length; j++) {
              const bpt = branch.points[j];
              if (j === 0) ctx.moveTo(bpt.x, bpt.y);
              else ctx.lineTo(bpt.x, bpt.y);
            }
            ctx.strokeStyle = bolt.glowColor;
            ctx.shadowColor = bolt.glowColor;
            ctx.shadowBlur = 8;
            ctx.lineWidth = 1;
            ctx.globalAlpha = alpha * 0.8;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Update and Draw Sparks
      for (let s = sparksRef.current.length - 1; s >= 0; s--) {
        const spark = sparksRef.current[s];
        spark.life++;
        if (spark.life >= spark.maxLife) {
          sparksRef.current.splice(s, 1);
          continue;
        }

        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.94;
        spark.vy *= 0.94;

        const sAlpha = 1 - spark.life / spark.maxLife;

        ctx.save();
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = sAlpha;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [spawnPerimeterLightning, spawnInterButtonArc]);

  // Click shock burst handler
  const handleButtonClick = (index: number) => {
    spawnPerimeterLightning(index, 3);
    const btn = buttonRefs.current[index];
    const container = containerRef.current;
    if (btn && container) {
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      const cx = bRect.left - cRect.left + bRect.width / 2;
      const cy = bRect.top - cRect.top + bRect.height / 2;
      emitSparks(cx, cy, 14, SOCIAL_LINKS[index].color);
    }
    setActiveShockIdx(index);
    setTimeout(() => setActiveShockIdx(null), 250);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center gap-4 select-none py-1.5", className)}
    >
      {/* Interactive Lightning & Spark Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute -inset-4 pointer-events-none z-30"
      />

      {SOCIAL_LINKS.map((item, idx) => {
        const IconComponent = item.icon;
        const isHovered = hoveredIdx === idx;
        const isShocked = activeShockIdx === idx;

        return (
          <motion.a
            key={item.name}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            href={item.href}
            target={item.name !== "Email" ? "_blank" : undefined}
            rel={item.name !== "Email" ? "noreferrer" : undefined}
            aria-label={item.name}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => handleButtonClick(idx)}
            animate={
              isShocked
                ? {
                    x: [-2, 2, -1, 1, 0],
                    y: [1, -2, 2, -1, 0],
                    scale: [1, 1.08, 0.96, 1.03, 1],
                  }
                : isHovered
                ? {
                    y: -3,
                    scale: 1.06,
                  }
                : {
                    y: 0,
                    scale: 1,
                  }
            }
            transition={{
              duration: isShocked ? 0.2 : 0.25,
              ease: "easeOut",
            }}
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-card/60 dark:bg-card/40 border border-primary/20 dark:border-white/10 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-[0_0_22px_rgba(56,189,248,0.5)] hover:border-sky-400/80 cursor-pointer overflow-visible"
          >
            {/* Ambient Electric Aura Glow behind the button */}
            <div
              className={cn(
                "absolute -inset-1.5 rounded-xl blur-md pointer-events-none transition-all duration-300",
                isHovered || isShocked
                  ? "opacity-90 scale-110"
                  : "opacity-0 group-hover:opacity-60"
              )}
              style={{
                background: `radial-gradient(circle, ${item.color} 0%, rgba(139, 92, 246, 0.3) 70%, transparent 100%)`,
              }}
            />

            {/* Electric Neon Circuit Ring */}
            <div
              className={cn(
                "absolute inset-0 rounded-xl pointer-events-none transition-all duration-200",
                isHovered
                  ? "border border-sky-400 shadow-[inset_0_0_10px_rgba(56,189,248,0.4)]"
                  : isShocked
                  ? "border-2 border-white shadow-[0_0_15px_#fff]"
                  : "border border-transparent"
              )}
            />

            {/* Electric strike flash overlay */}
            <div
              className={cn(
                "absolute inset-0 rounded-xl bg-sky-300/30 dark:bg-sky-400/20 pointer-events-none transition-opacity duration-150",
                isShocked ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Icon itself */}
            <IconComponent
              className={cn(
                "w-4.5 h-4.5 transition-all duration-300 relative z-10",
                isHovered || isShocked
                  ? "text-sky-400 dark:text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.95)] scale-110"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            />
          </motion.a>
        );
      })}
    </div>
  );
};

export default LightningSocialIcons;


"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface Bolt {
  points: { x: number; y: number }[];
  branches: { points: { x: number; y: number }[]; life: number; maxLife: number }[];
  life: number;
  maxLife: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export interface LightningContactIconProps {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  sparkColor: string;
  hoverColorClass: string;
  textColorClass: string;
  isParentHovered?: boolean;
  className?: string;
}

export const LightningContactIcon: React.FC<LightningContactIconProps> = ({
  icon: Icon,
  color,
  glowColor,
  sparkColor,
  hoverColorClass,
  textColorClass,
  isParentHovered = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isHoveredSelf, setIsHoveredSelf] = useState(false);
  const [isShocked, setIsShocked] = useState(false);

  const isEnergized = isParentHovered || isHoveredSelf;
  const isEnergizedRef = useRef(isEnergized);
  isEnergizedRef.current = isEnergized;

  const boltsRef = useRef<Bolt[]>([]);
  const sparksRef = useRef<Spark[]>([]);

  // Generate jagged lightning path along a circular arc
  const createArcBolt = useCallback((cx: number, cy: number, radius: number): Bolt => {
    const startAngle = Math.random() * Math.PI * 2;
    const arcSpan = (Math.PI / 3) + Math.random() * (Math.PI * 0.7); // 60 to 125 degrees
    const endAngle = startAngle + (Math.random() < 0.5 ? arcSpan : -arcSpan);

    const steps = 6 + Math.floor(Math.random() * 4);
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = startAngle + (endAngle - startAngle) * t;
      // Normal radial displacement (jaggedness)
      const radialOffset = (Math.random() - 0.5) * 9 * Math.sin(t * Math.PI);
      const r = radius + radialOffset;

      points.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      });
    }

    // 1 small branching bolt arcing outward
    const branches: { points: { x: number; y: number }[]; life: number; maxLife: number }[] = [];
    if (Math.random() < 0.7) {
      const midIdx = Math.floor(points.length / 2);
      const midPt = points[midIdx];
      if (midPt) {
        const outAngle = Math.atan2(midPt.y - cy, midPt.x - cx) + (Math.random() - 0.5) * 0.8;
        const branchLen = 6 + Math.random() * 10;
        const bx = midPt.x + Math.cos(outAngle) * branchLen;
        const by = midPt.y + Math.sin(outAngle) * branchLen;

        branches.push({
          points: [
            { x: midPt.x, y: midPt.y },
            {
              x: (midPt.x + bx) / 2 + (Math.random() - 0.5) * 5,
              y: (midPt.y + by) / 2 + (Math.random() - 0.5) * 5,
            },
            { x: bx, y: by },
          ],
          life: 0,
          maxLife: 4,
        });
      }
    }

    return {
      points,
      branches,
      life: 0,
      maxLife: 4 + Math.floor(Math.random() * 4),
    };
  }, []);

  // Emit small sparks
  const emitSparks = useCallback((cx: number, cy: number, radius: number, count = 3) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 2.5;
      const dist = radius + (Math.random() - 0.5) * 6;
      sparksRef.current.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 10 + Math.floor(Math.random() * 8),
        size: 1 + Math.random() * 1.5,
      });
    }
  }, []);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frameCount = Math.floor(Math.random() * 50); // Stagger initial idle phase

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 68; // Render canvas with padding around the 48px button
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 23; // Matches rounded-full perimeter

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, size, size);

      // High voltage on hover / energized
      if (isEnergizedRef.current && frameCount % 3 === 0) {
        boltsRef.current.push(createArcBolt(cx, cy, radius));
        emitSparks(cx, cy, radius, 2);
      }

      // Idle spontaneous electrical discharge
      if (!isEnergizedRef.current && frameCount % 65 === 0) {
        if (Math.random() < 0.65) {
          boltsRef.current.push(createArcBolt(cx, cy, radius));
          emitSparks(cx, cy, radius, 1);
          setIsShocked(true);
          setTimeout(() => setIsShocked(false), 160);
        }
      }

      // Render lightning bolts
      for (let b = boltsRef.current.length - 1; b >= 0; b--) {
        const bolt = boltsRef.current[b];
        bolt.life++;
        if (bolt.life >= bolt.maxLife) {
          boltsRef.current.splice(b, 1);
          continue;
        }

        const alpha = 1 - bolt.life / bolt.maxLife;

        // Outer glow
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < bolt.points.length; i++) {
          const pt = bolt.points[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = glowColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10;
        ctx.lineWidth = 2.8;
        ctx.globalAlpha = alpha * 0.75;
        ctx.lineCap = "round";
        ctx.stroke();

        // Hot white core
        ctx.beginPath();
        for (let i = 0; i < bolt.points.length; i++) {
          const pt = bolt.points[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 4;
        ctx.lineWidth = 1.3;
        ctx.globalAlpha = alpha;
        ctx.stroke();

        // Branches
        for (const branch of bolt.branches) {
          branch.life++;
          if (branch.life < branch.maxLife) {
            ctx.beginPath();
            for (let j = 0; j < branch.points.length; j++) {
              const bpt = branch.points[j];
              if (j === 0) ctx.moveTo(bpt.x, bpt.y);
              else ctx.lineTo(bpt.x, bpt.y);
            }
            ctx.strokeStyle = glowColor;
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 6;
            ctx.lineWidth = 1;
            ctx.globalAlpha = alpha * 0.7;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Render sparks
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
        ctx.fillStyle = sparkColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 5;
        ctx.globalAlpha = sAlpha;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [createArcBolt, emitSparks, glowColor, sparkColor]);

  // Click shockwave
  const handleClick = () => {
    const size = 68;
    const cx = size / 2;
    const cy = size / 2;
    for (let i = 0; i < 3; i++) {
      boltsRef.current.push(createArcBolt(cx, cy, 23));
    }
    emitSparks(cx, cy, 23, 10);
    setIsShocked(true);
    setTimeout(() => setIsShocked(false), 240);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHoveredSelf(true)}
      onMouseLeave={() => setIsHoveredSelf(false)}
      onClick={handleClick}
      className={cn("relative flex items-center justify-center shrink-0 select-none", className)}
    >
      {/* Interactive Lightning & Spark Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none z-30"
        style={{
          width: 68,
          height: 68,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Ambient Neon Glow Aura behind the button */}
      <div
        className={cn(
          "absolute -inset-1.5 rounded-full blur-md pointer-events-none transition-all duration-300",
          isEnergized || isShocked ? "opacity-90 scale-110" : "opacity-20"
        )}
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${glowColor} 60%, transparent 100%)`,
        }}
      />

      {/* Main Icon Button Container */}
      <motion.div
        animate={
          isShocked
            ? {
                x: [-1.5, 1.5, -1, 1, 0],
                y: [1, -1.5, 1.5, -1, 0],
                scale: [1, 1.08, 0.96, 1.03, 1],
              }
            : isEnergized
            ? {
                scale: 1.08,
              }
            : {
                scale: 1,
              }
        }
        transition={{ duration: isShocked ? 0.2 : 0.25, ease: "easeOut" }}
        className={cn(
          "w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center relative z-10 transition-all duration-300 border",
          isEnergized
            ? hoverColorClass
            : "border-foreground/10 hover:border-foreground/20"
        )}
        style={{
          boxShadow: isEnergized
            ? `0 0 20px ${color}66, inset 0 0 10px ${color}33`
            : undefined,
        }}
      >
        {/* Flash overlay */}
        <div
          className={cn(
            "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-150",
            isShocked ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundColor: `${color}40` }}
        />

        {/* Icon Component */}
        <span
          className="relative z-20 flex items-center justify-center"
          style={{
            filter: isEnergized ? `drop-shadow(0 0 6px ${color})` : undefined,
          }}
        >
          <Icon
            className={cn(
              "w-5 h-5 transition-all duration-300",
              isEnergized || isShocked
                ? `${textColorClass} scale-110`
                : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        </span>
      </motion.div>
    </div>
  );
};

export default LightningContactIcon;

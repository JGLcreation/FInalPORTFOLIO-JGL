"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface MeteorImpactBorderProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  borderWidth?: number;
  duration?: number;
  size?: number;
  meteorColor?: string;
  glowColor?: string;
  impactGlow?: boolean;
}

export const MeteorImpactBorder: React.FC<MeteorImpactBorderProps> = ({
  children,
  className,
  containerClassName,
  borderRadius = "1.5rem",
  borderWidth = 1.5,
  duration = 7,
  size = 140,
  meteorColor = "#60a5fa",
  glowColor = "#3b82f6",
  impactGlow = true,
}) => {
  return (
    <div
      className={cn(
        "relative rounded-[inherit] p-[1px] overflow-hidden group/meteor",
        containerClassName
      )}
      style={{
        borderRadius,
      }}
    >
      {/* Meteor Orbiting Border Track */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
        style={{
          border: `${borderWidth}px solid rgba(255, 255, 255, 0.08)`,
        }}
      >
        {/* Meteor Head & Blazing Comet Tail */}
        <motion.div
          className="absolute aspect-square pointer-events-none"
          style={{
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${borderRadius})`,
            background: `radial-gradient(circle, #ffffff 0%, ${meteorColor} 30%, ${glowColor} 65%, transparent 100%)`,
            filter: impactGlow ? "blur(2px)" : undefined,
            boxShadow: `0 0 25px 5px ${glowColor}`,
          }}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration,
          }}
        />

        {/* Second Counter-Pulse Spark Meteor */}
        <motion.div
          className="absolute aspect-square pointer-events-none"
          style={{
            width: size * 0.6,
            offsetPath: `rect(0 auto auto 0 round ${borderRadius})`,
            background: `radial-gradient(circle, #ffffff 0%, ${meteorColor} 50%, transparent 100%)`,
            boxShadow: `0 0 16px 2px ${meteorColor}`,
          }}
          initial={{ offsetDistance: "50%" }}
          animate={{ offsetDistance: "150%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration,
          }}
        />
      </div>

      {/* Internal Content Frame */}
      <div
        className={cn(
          "relative z-10 w-full h-full bg-card rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MeteorImpactBorder;

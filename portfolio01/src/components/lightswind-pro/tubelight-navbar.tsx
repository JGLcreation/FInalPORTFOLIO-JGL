"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TubelightNavbarProps {
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (item: NavItem) => void;
  className?: string;
  lightColor?: string;
}

export const TubelightNavbar: React.FC<TubelightNavbarProps> = ({
  items,
  activeItem: controlledActive,
  onItemClick,
  className,
  lightColor = "#3b82f6",
}) => {
  const [activeTab, setActiveTab] = useState(controlledActive || items[0]?.name);

  const active = controlledActive !== undefined ? controlledActive : activeTab;

  return (
    <nav
      className={cn(
        "relative flex items-center gap-1 p-1.5 rounded-full bg-background/50 border border-foreground/10 backdrop-blur-xl shadow-lg",
        className
      )}
    >
      {items.map((item) => {
        const isActive = active === item.name;
        const Icon = item.icon;

        return (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.name);
              onItemClick?.(item);
            }}
            className={cn(
              "relative cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-colors duration-300 select-none flex items-center gap-1.5",
              isActive
                ? "text-blue-400 font-extrabold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{item.name}</span>

            {/* Tubelight Glow Effect on Active Tab */}
            {isActive && (
              <motion.div
                layoutId="tubelight-glow"
                className="absolute inset-0 rounded-full bg-blue-500/10 border border-blue-500/30 -z-10"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              >
                {/* Horizontal Top Beam Tube */}
                <div
                  className="absolute -top-px left-2 right-2 h-0.5 rounded-full"
                  style={{
                    backgroundColor: lightColor,
                    boxShadow: `0 0 12px 2px ${lightColor}, 0 0 20px 4px ${lightColor}`,
                  }}
                />

                {/* Vertical Soft Flare Projection */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 rounded-full opacity-60 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top, ${lightColor} 0%, transparent 70%)`,
                    filter: "blur(4px)",
                  }}
                />
              </motion.div>
            )}
          </a>
        );
      })}
    </nav>
  );
};

export default TubelightNavbar;

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "../lib/utils";

export interface StackingCardItem {
  id?: string | number;
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  image: string;
  tags?: string[];
  gradient?: string;
  accentColor?: string;
}

export type StackingCard = StackingCardItem;

export interface StackingCardsProps {
  cards?: StackingCardItem[];
  items?: StackingCardItem[];
  className?: string;
  topOffset?: number;
  stackOffset?: number;
}

interface AnimatedCardProps {
  item: StackingCardItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  topOffset: number;
  stackOffset: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  item,
  index,
  total,
  progress,
  topOffset,
  stackOffset,
}) => {
  const Icon = item.icon;

  // Lightswind scroll-driven stacking:
  // Each card starts progressively scaling down as subsequent cards stack over it
  const step = 1 / Math.max(1, total - 1);
  const startProgress = index * step;
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [startProgress, 1], [1, targetScale]);

  return (
    <div
      className="sticky w-full flex justify-center"
      style={{
        top: `${topOffset + index * stackOffset}px`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl rounded-[2.5rem] p-8 md:p-12 border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors duration-300"
      >
        {/* Subtle ambient light gradient */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity"
          style={{
            background: item.accentColor || "#38bdf8",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content Area */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Header with Icon and Index */}
              <div className="flex items-center justify-between gap-4 mb-4">
                {Icon && (
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border"
                    style={{
                      backgroundColor: `${item.accentColor || "#38bdf8"}15`,
                      borderColor: `${item.accentColor || "#38bdf8"}35`,
                      color: item.accentColor || "#38bdf8",
                    }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                )}
                <span className="font-mono text-2xl md:text-3xl font-black text-muted-foreground/30">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Technology Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Visual Image Preview Area */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-neutral-950 shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const StackingCards: React.FC<StackingCardsProps> = ({
  cards,
  items,
  className,
  topOffset = 90,
  stackOffset = 24,
}) => {
  const cardList = cards || items || [];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("w-full relative flex flex-col gap-10 py-10", className)}
    >
      {cardList.map((item, index) => (
        <AnimatedCard
          key={item.id ?? index}
          item={item}
          index={index}
          total={cardList.length}
          progress={scrollYProgress}
          topOffset={topOffset}
          stackOffset={stackOffset}
        />
      ))}
    </div>
  );
};

export default StackingCards;

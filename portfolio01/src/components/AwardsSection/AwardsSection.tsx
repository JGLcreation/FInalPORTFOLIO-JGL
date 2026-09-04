import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Trophy, Star, Award, Compass, Zap } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";

interface AwardItem {
  year: string;
  title: string;
  description: string;
  scope: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const awards: AwardItem[] = [
  {
    year: "2026",
    title: "COIL Global Web Design Participation",
    description: "Completed the prestigious Collaborative Online International Learning (COIL) program in Global Web Design, working with international peers.",
    scope: "International",
    icon: Compass,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/30",
  },
  {
    year: "2024",
    title: "Online Startup Pitching Competition",
    description: "Provincial Level, South Cotabato, recognized for conceptualizing and pitching an innovative, market-viable tech project idea.",
    scope: "Provincial Level",
    icon: Zap,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
  {
    year: "2026",
    title: "Academic Engagement Recognition",
    description: "Honored for consistent contribution, dedication, and collaborative problem solving within Information Technology academia.",
    scope: "Institutional",
    icon: Star,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
  {
    year: "2026",
    title: "Outstanding Technical Support",
    description: "Recognized for resolving technical and user issues quickly, maintaining dependable quality and dependable assistance.",
    scope: "Service Honor",
    icon: Award,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
];

interface AnimatedAwardCardProps {
  award: AwardItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  topOffset?: number;
  stackOffset?: number;
}

const AnimatedAwardCard: React.FC<AnimatedAwardCardProps> = ({
  award,
  index,
  total,
  progress,
  topOffset = 90,
  stackOffset = 24,
}) => {
  const Icon = award.icon;

  // Stacking scroll animation:
  // Each card progressively scales down as subsequent cards stack over it
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        className="w-full max-w-4xl group"
      >
        <div className="relative rounded-[2rem]">
          {/* Green Light Night Card Aura */}
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full blur-[70px] pointer-events-none bg-emerald-500/15 group-hover:bg-emerald-400/30 transition-all duration-500" />

          <MagicCard
            className="p-6 sm:p-8 rounded-[2rem] border-2 border-emerald-500/40 dark:border-emerald-400/40 hover:border-emerald-400 bg-card/95 backdrop-blur-2xl shadow-[0_0_25px_rgba(16,185,129,0.18)] hover:shadow-[0_0_40px_rgba(52,211,153,0.38)] h-full flex flex-col justify-between transition-all duration-500"
            gradientSize={280}
            gradientColor="rgba(52, 211, 153, 0.22)"
            gradientFrom="#10b981"
            gradientTo="#34d399"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border ${award.color}`}>
                    {award.scope}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    {award.year}
                  </span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2">
                {award.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {award.description}
              </p>
            </div>
          </MagicCard>
        </div>
      </motion.div>
    </div>
  );
};

export const AwardsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="awards" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative overflow-hidden">
      {/* Green Light Night Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-14 text-center md:text-left relative z-10"
      >
        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold">
            005 — Honors &amp; Recognitions
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Awards &amp; <span className="text-gradient-primary">Achievements</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mt-3">
          Recognitions received across startup competitions, global academic initiatives, and technical contributions.
        </p>
      </motion.div>

      {/* Stacking Cards Scroll Animation */}
      <div ref={containerRef} className="w-full relative flex flex-col gap-10 py-6 z-10">
        {awards.map((award, index) => (
          <AnimatedAwardCard
            key={index}
            award={award}
            index={index}
            total={awards.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;

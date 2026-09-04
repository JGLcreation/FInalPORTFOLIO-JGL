"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "../lib/utils";

/* ────────────────────────────────────────────────
   Types
──────────────────────────────────────────────── */
export interface HorizontalScrollItem {
  id?: string | number;
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  category?: string;
}

export interface HorizontalScrollProps {
  items: HorizontalScrollItem[];
  className?: string;
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  onItemClick?: (index: number, item: HorizontalScrollItem) => void;
}

/* ────────────────────────────────────────────────
   Individual Card
──────────────────────────────────────────────── */
const HCard: React.FC<{
  item: HorizontalScrollItem;
  index: number;
  cardWidth: number;
  cardHeight: number;
  onClick: () => void;
}> = ({ item, cardWidth, cardHeight, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer select-none border border-white/10 shadow-2xl"
      style={{ width: cardWidth, height: cardHeight }}
      whileHover={{ scale: 1.04, y: -8 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Image */}
      <img
        src={item.src}
        alt={item.alt ?? item.title ?? "certificate"}
        className="w-full h-full object-cover"
        draggable={false}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category badge */}
      {item.category && (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-primary/40 shadow">
          {item.category}
        </div>
      )}

      {/* Hover: click hint */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="px-4 py-2 rounded-full bg-white/90 text-black text-xs font-bold shadow-xl flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          View Full
        </span>
      </motion.div>

      {/* Bottom text */}
      {(item.title || item.subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {item.title && (
            <p className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow">
              {item.title}
            </p>
          )}
          {item.subtitle && (
            <p className="text-white/60 text-xs mt-0.5 drop-shadow">{item.subtitle}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

/* ────────────────────────────────────────────────
   Main HorizontalScroll
──────────────────────────────────────────────── */
const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  items,
  className,
  cardWidth = 340,
  cardHeight = 260,
  gap = 20,
  onItemClick,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 32 });

  const [maxDrag, setMaxDrag] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [effectiveWidth, setEffectiveWidth] = useState(cardWidth);
  const [effectiveHeight, setEffectiveHeight] = useState(cardHeight);

  // Dynamically adapt card size to mobile screen width
  useEffect(() => {
    const handleResize = () => {
      const sw = window.innerWidth;
      if (sw < 640) {
        const w = Math.min(cardWidth, Math.max(260, sw - 48));
        setEffectiveWidth(w);
        setEffectiveHeight(Math.round(w * (cardHeight / cardWidth)));
      } else {
        setEffectiveWidth(cardWidth);
        setEffectiveHeight(cardHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardWidth, cardHeight]);

  /* Total scrollable width */
  useEffect(() => {
    if (trackRef.current) {
      const totalW = items.length * (effectiveWidth + gap) - gap;
      const containerW = trackRef.current.parentElement?.clientWidth ?? 0;
      setMaxDrag(Math.max(0, totalW - containerW));
    }
  }, [items.length, effectiveWidth, gap]);

  const clamp = useCallback(
    (val: number) => Math.min(0, Math.max(-maxDrag, val)),
    [maxDrag]
  );

  /* ── Mouse drag ── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = x.get();
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = e.pageX - startX.current;
      x.set(clamp(scrollLeft.current + delta));
    };
    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
      snapToNearest();
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  /* ── Touch drag ── */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].pageX;
    scrollLeft.current = x.get();
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].pageX - startX.current;
    x.set(clamp(scrollLeft.current + delta));
  };
  const onTouchEnd = () => snapToNearest();

  /* ── Snap to nearest card ── */
  const snapToNearest = () => {
    const current = x.get();
    const step = effectiveWidth + gap;
    const idx = Math.round(-current / step);
    const clamped = Math.min(Math.max(0, idx), items.length - 1);
    setActiveIndex(clamped);
    animate(x, clamp(-clamped * step), { type: "spring", stiffness: 300, damping: 30 });
  };

  /* ── Dot navigation ── */
  const goTo = (idx: number) => {
    const step = effectiveWidth + gap;
    setActiveIndex(idx);
    animate(x, clamp(-idx * step), { type: "spring", stiffness: 300, damping: 30 });
  };

  /* ── Arrow nav ── */
  const prev = () => goTo(Math.max(0, activeIndex - 1));
  const next = () => goTo(Math.min(items.length - 1, activeIndex + 1));

  /* ── Click guard (don't fire click when dragging) ── */
  const downPos = useRef({ x: 0, y: 0 });
  const isDraggingDist = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    downPos.current = { x: e.clientX, y: e.clientY };
    isDraggingDist.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const dist = Math.hypot(e.clientX - downPos.current.x, e.clientY - downPos.current.y);
    if (dist > 6) {
      isDraggingDist.current = true;
    }
  };
  const handleItemClick = (idx: number, item: HorizontalScrollItem) => {
    if (isDraggingDist.current) return;
    onItemClick?.(idx, item);
  };

  return (
    <div className={cn("w-full select-none", className)}>
      {/* Track wrapper — clips overflow */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: effectiveHeight + 32 }}
      >
        <motion.div
          ref={trackRef}
          className="absolute top-0 left-0 flex items-center"
          style={{ x: springX, gap, paddingLeft: 8, paddingRight: 8, paddingTop: 16, paddingBottom: 16 }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          drag={false}
        >
          {items.map((item, i) => (
            <HCard
              key={item.id ?? i}
              item={item}
              index={i}
              cardWidth={effectiveWidth}
              cardHeight={effectiveHeight}
              onClick={() => handleItemClick(i, item)}
            />
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-5">
        {/* Prev */}
        <button
          type="button"
          onClick={prev}
          disabled={activeIndex === 0}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-border/80 bg-card/80 backdrop-blur hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                background: i === activeIndex ? "var(--color-primary, #38bdf8)" : "rgba(148,163,184,0.4)",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={next}
          disabled={activeIndex === items.length - 1}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-border/80 bg-card/80 backdrop-blur hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow"
          aria-label="Next"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-xs font-mono text-muted-foreground mt-2">
        {activeIndex + 1} / {items.length}
      </p>
    </div>
  );
};

export default HorizontalScroll;

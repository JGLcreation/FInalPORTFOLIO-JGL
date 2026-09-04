import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X, ZoomIn, ShieldCheck, Sparkles, LayoutGrid, Eye } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";
import HorizontalScroll, { type HorizontalScrollItem } from "@/components/lightswind-pro/horizontal-scroll";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  category: string;
}

const certificates: Certificate[] = [
  {
    id: "awards1",
    title: "COIL Global Web Design Participation",
    issuer: "Collaborative Online International Learning",
    date: "2026",
    image: "/awards1.png",
    description: "Completed the international collaborative program in Global Web Design, applying modern web technologies, cross-border teamwork, and responsive interfaces.",
    category: "International Program",
  },
  {
    id: "awards2",
    title: "Orientation Caravan — NRCP",
    issuer: "National Research Council of the Philippines (NRCP)",
    date: "2025",
    image: "/awards2.png",
    description: "Active engagement and participation in the NRCP Orientation Caravan, advancing scientific and technological research knowledge.",
    category: "Seminar / Training",
  },
  {
    id: "awards3",
    title: "Academic Engagement Recognition",
    issuer: "Davao del Sur State College",
    date: "2026",
    image: "/awards3.png",
    description: "Honored for consistent academic engagement, collaborative problem solving, and exemplary contribution in Information Technology coursework.",
    category: "Academic Honor",
  },
];

export const CertificatesSection: React.FC = () => {
  const [activeModalImg, setActiveModalImg] = useState<Certificate | null>(null);
  const [viewMode, setViewMode] = useState<"horizontal" | "grid">("horizontal");

  // Format certificates for HorizontalScroll
  const scrollItems: HorizontalScrollItem[] = certificates.map((cert) => ({
    id: cert.id,
    src: cert.image,
    title: cert.title,
    subtitle: `${cert.issuer} • ${cert.date}`,
    category: cert.category,
    alt: cert.title,
  }));

  const handleSlideClick = (index: number) => {
    const cert = certificates[index];
    if (cert) {
      setActiveModalImg(cert);
    }
  };

  return (
    <section id="certificates" className="max-w-7xl mx-auto px-6 py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header & View Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono tracking-widest text-primary uppercase font-bold">
              006 — Credentials &amp; Certifications
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Certificates &amp; <span className="text-gradient-primary">Accomplishments</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mt-3">
            Official certifications and seminar achievements. Click any certificate image to inspect it in high-resolution front modal.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-full bg-card/80 border border-border/80 backdrop-blur-md shadow-md self-center md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("horizontal")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              viewMode === "horizontal"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Horizontal Scroll</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </motion.div>

      {/* Horizontal Scroll View */}
      {viewMode === "horizontal" && (
        <motion.div
          key="horizontal-mode"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center justify-center py-8 px-4 bg-foreground/[0.015] border border-border/60 rounded-[3rem] shadow-xl relative"
        >
          {/* Instruction Pill */}
          <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Drag or click arrows to browse • Click certificate image to show in front</span>
          </div>

          <div className="w-full max-w-6xl">
            <HorizontalScroll
              items={scrollItems}
              cardWidth={420}
              cardHeight={310}
              gap={24}
              onItemClick={handleSlideClick}
            />
          </div>
        </motion.div>
      )}

      {/* Standard Grid View */}
      {viewMode === "grid" && (
        <motion.div
          key="grid-mode"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="cursor-pointer group"
              onClick={() => setActiveModalImg(cert)}
            >
              <MagicCard
                className="h-full rounded-[2rem] border border-border/80 bg-card/80 overflow-hidden shadow-xl flex flex-col justify-between"
                gradientSize={280}
                gradientColor="rgba(139, 92, 246, 0.15)"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[1.8rem] bg-neutral-950 border-b border-border/60">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/80 backdrop-blur-md border border-border/60 text-primary flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {cert.category}
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md">
                        <ZoomIn className="w-3.5 h-3.5" /> View Certificate
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                      <span className="text-primary font-bold">{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Verified Credential</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* High-Res Fullscreen Modal when Clicked */}
      <AnimatePresence>
        {activeModalImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveModalImg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full bg-card rounded-2xl border border-border overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-center justify-between border-b border-border/60 bg-muted/40">
                <div>
                  <h3 className="text-base font-bold text-foreground">{activeModalImg.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {activeModalImg.issuer} • {activeModalImg.date} • {activeModalImg.category}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalImg(null)}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-2 sm:p-4 max-h-[75vh] overflow-auto flex items-center justify-center bg-black/50">
                <img
                  src={activeModalImg.image}
                  alt={activeModalImg.title}
                  className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-md"
                />
              </div>

              <div className="p-4 border-t border-border/60 bg-card/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
                <p className="flex-1">{activeModalImg.description}</p>
                <button
                  type="button"
                  onClick={() => setActiveModalImg(null)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;

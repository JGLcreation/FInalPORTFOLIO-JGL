import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, BookOpen, Grid, ZoomIn, X, Sparkles } from "lucide-react";
import ThreeDImagePageflip, { type PageFlipLeaf } from "../lightswind/3d-image-pageflip";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  span: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "pic1",
    image: "/galary1.png",
    title: "WereChat Platform",
    subtitle: "COIL Global Web Project",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "pic2",
    image: "/galary15.png",
    title: "CineVerse Hub",
    subtitle: "Movie Discovery & Streaming UI",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "pic3",
    image: "/galary3.png",
    title: "Re-Syn T-H System",
    subtitle: "Full-Stack Web Application",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "pic4",
    image: "/galary4.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: "add1",
    image: "/galary5.png",
    title: "System Showcase",
    subtitle: "Development Milestones & Highlights",
    span: "md:col-span-2 md:row-span-1",
  },
   {
    id: "pic4",
    image: "/galary6.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
   {
    id: "pic4",
    image: "/galary7.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
   {
    id: "pic4",
    image: "/galary8.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
   {
    id: "pic4",
    image: "/galary9.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
    {
    id: "pic4",
    image: "/galary10.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
    {
    id: "pic4",
    image: "/galary11.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
    {
    id: "pic4",
    image: "/galary12.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
    {
    id: "pic4",
    image: "/galary13.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
    {
    id: "pic4",
    image: "/galary14.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
    {
    id: "pic4",
    image: "/galary2.png",
    title: "Hiram Hub System",
    subtitle: "Academic Borrowing Management",
    span: "md:col-span-2 md:row-span-1",
  },
  
];

const pageFlipLeaves: PageFlipLeaf[] = [
  {
    id: "leaf-1",
    frontImage: "/galary1.png",
    backImage: "/galary3.png",
    frontTitle: "WereChat Platform",
    frontSubtitle: "COIL Global Web Design Program",
    frontBadge: "Project 01",
    backTitle: "CineVerse Hub",
    backSubtitle: "Remix & Supabase Cinema App",
    backBadge: "Project 02",
  },
  {
    id: "leaf-2",
    frontImage: "/galary4.png",
    backImage: "/galary5.png",
    frontTitle: "Re-Syn T-H System",
    frontSubtitle: "Academic Client Full-Stack Project",
    frontBadge: "Project 03",
    backTitle: "Hiram Hub System",
    backSubtitle: "Equipment Borrowing Management",
    backBadge: "Project 04",
  },
  {
    id: "leaf-3",
    frontImage: "/galary6.png",
    backImage: "/galary7.png",
    frontTitle: "COIL Certificate",
    frontSubtitle: "Global Web Design Program Award",
    frontBadge: "Award 01",
    backTitle: "NRCP Orientation",
    backSubtitle: "Science & Technology Caravan",
    backBadge: "Award 02",
  },
  {
    id: "leaf-4",
    frontImage: "/galary8.png",
    backImage: "/galary9.png",
    frontTitle: "Academic Engagement",
    frontSubtitle: "Davao del Sur State College Recognition",
    frontBadge: "Award 03",
    backTitle: "Portfolio Milestones",
    backSubtitle: "Continuous Learning & Development",
    backBadge: "Finale",
  },
   {
    id: "leaf-4",
    frontImage: "/galary10.png",
    backImage: "/galary11.png",
    frontTitle: "Academic Engagement",
    frontSubtitle: "Davao del Sur State College Recognition",
    frontBadge: "Award 03",
    backTitle: "Portfolio Milestones",
    backSubtitle: "Continuous Learning & Development",
    backBadge: "Finale",
  },
   {
    id: "leaf-4",
    frontImage: "/galary12.png",
    backImage: "/galary13.png",
    frontTitle: "Academic Engagement",
    frontSubtitle: "Davao del Sur State College Recognition",
    frontBadge: "Award 03",
    backTitle: "Portfolio Milestones",
    backSubtitle: "Continuous Learning & Development",
    backBadge: "Finale",
  },
   {
    id: "leaf-4",
    frontImage: "/galary16.png",
    backImage: "/galary14.png",
    frontTitle: "Academic Engagement",
    frontSubtitle: "Davao del Sur State College Recognition",
    frontBadge: "Award 03",
    backTitle: "Portfolio Milestones",
    backSubtitle: "Continuous Learning & Development",
    backBadge: "Finale",
  },
   {
    id: "leaf-4",
    frontImage: "/galary15.png",
    backImage: "/galary2.png",
    frontTitle: "Academic Engagement",
    frontSubtitle: "Davao del Sur State College Recognition",
    frontBadge: "Award 03",
    backTitle: "Portfolio Milestones",
    backSubtitle: "Continuous Learning & Development",
    backBadge: "Finale",
  },
];

export const GallerySection: React.FC = () => {
  const [viewMode, setViewMode] = useState<"book" | "grid">("book");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [pageDimensions, setPageDimensions] = useState({ width: 280, height: 400 });

  // Responsive book spread sizing for mobile & tablet
  useEffect(() => {
    const updateDimensions = () => {
      const screenW = window.innerWidth;
      if (screenW < 480) {
        // Mobile small: book spread fits within phone viewport with margins
        const w = Math.max(140, Math.min(185, Math.floor((screenW - 48) / 2)));
        setPageDimensions({ width: w, height: Math.floor(w * 1.38) });
      } else if (screenW < 768) {
        // Tablet / larger phone
        const w = Math.max(180, Math.min(235, Math.floor((screenW - 64) / 2)));
        setPageDimensions({ width: w, height: Math.floor(w * 1.4) });
      } else {
        // Desktop
        setPageDimensions({ width: 280, height: 400 });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative overflow-hidden">
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
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono tracking-widest text-primary uppercase font-bold">
              007 — Visual Highlights
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Portfolio <span className="text-gradient-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mt-3">
            Interact with the 3D page flip album or switch to the grid view to inspect all systems, certificates, and snapshots.
          </p>
        </div>

        {/* View Mode Toggle Pill */}
        <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-full bg-card/80 border border-border/80 backdrop-blur-md shadow-md self-center md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("book")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              viewMode === "book"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3D Page Flip</span>
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
            <Grid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </motion.div>

      {/* 3D Page Flip View */}
      {viewMode === "book" && (
        <motion.div
          key="book-mode"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center justify-center py-6 sm:py-10 px-2 min-h-[440px] sm:min-h-[580px] bg-foreground/[0.015] border border-border/60 rounded-[2rem] sm:rounded-[3rem] shadow-xl relative overflow-hidden"
        >
          {/* Ambient background glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Interactive Hint */}
          <div className="mb-6 sm:mb-8 flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] sm:text-xs font-mono font-medium shadow-sm text-center">
            <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span>Click page edges or use Next/Prev to flip in 3D</span>
          </div>

          <div className="w-full flex justify-center overflow-x-auto py-2 sm:py-4">
            <ThreeDImagePageflip
              pages={pageFlipLeaves}
              pageWidth={pageDimensions.width}
              pageHeight={pageDimensions.height}
              perspective={1400}
              turnAngle={180}
              duration={0.7}
              shadowIntensity={0.5}
              accentColor="#3b82f6"
              showControls={true}
              showPageNumbers={true}
              showSpineBinding={true}
              radius="18px"
            />
          </div>
        </motion.div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <motion.div
          key="grid-mode"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`relative rounded-[2rem] overflow-hidden border border-border/80 bg-neutral-950 shadow-lg group cursor-pointer ${item.span}`}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                <div className="flex items-end justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Image Modal for Grid View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-card rounded-2xl border border-border overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-center justify-between border-b border-border/60 bg-muted/40">
                <div>
                  <h3 className="text-base font-bold text-foreground">{selectedImage.title}</h3>
                  <p className="text-xs text-muted-foreground">{selectedImage.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-2 sm:p-4 max-h-[75vh] overflow-auto flex items-center justify-center bg-black/50">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-md"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Quote, X, Star, Sparkles, ExternalLink } from "lucide-react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "../lightswind/3d-scroll-trigger";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  project: string;
  content: string;
  highlight: string;
  image: string;
  rating: number;
  tags: string[];
}

const testimonials: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Hazel & Academic Project Team",
    role: "System Client & Academic Collaborator",
    affiliation: "Hiram Hub System Project",
    project: "Hiram Hub System",
    content:
      "Jayson built our Hiram Hub System with both front-end and back-end integration in PHP and Supabase. The system streamlined our borrowing workflows, and his attention to responsive design made it intuitive for everyone to use.",
    highlight: "Delivered a complete, reliable borrowing system ahead of our defense.",
    image: "/profile.jpg",
    rating: 5,
    tags: ["PHP", "Supabase", "Full-Stack"],
  },
  {
    id: "test-2",
    name: "COIL Global Partner Peer",
    role: "International Program Collaborator",
    affiliation: "COIL Global Web Design Program",
    project: "WereChat Platform",
    content:
      "Collaborating with Jayson on WereChat for the COIL program showed his ability to communicate and build across global time zones. His modern React.js and Next.js skills helped us produce an award-recognized platform.",
    highlight: "Exceptional cross-cultural collaboration and frontend execution.",
    image: "/awards1.png",
    rating: 5,
    tags: ["React.js", "Next.js", "COIL Global"],
  },
  {
    id: "test-3",
    name: "Christian M. & Classmate",
    role: "Academic Project Partner",
    affiliation: "Re-Syn T-H Academic System",
    project: "Re-Syn T-H System",
    content:
      "Jayson took on the technical heavy lifting as a Junior Full Stack Developer for our classmate project. He built the entire database structure, user views, and deployment on Vercel with zero friction.",
    highlight: "Hardworking, patient, and solved every technical blocker we encountered.",
    image: "/pic3.png",
    rating: 5,
    tags: ["Full-Stack", "JavaScript", "Vercel"],
  },
  {
    id: "test-4",
    name: "BSIT Faculty & Laboratory Peer",
    role: "Academic Fellow",
    affiliation: "Davao del Sur State College",
    project: "BSIT Academic Projects",
    content:
      "Jayson stands out for his dedication and perseverance. Even while balancing work outside school, he consistently turns in top-quality IT deliverables and actively helps peers troubleshoot programming tasks.",
    highlight: "Outstanding work ethic and commitment to continuous learning.",
    image: "/awards3.png",
    rating: 5,
    tags: ["BSIT", "DavSu", "Continuous Learning"],
  },
  {
    id: "test-5",
    name: "Night Market Business Partner",
    role: "Retail & Operations Associate",
    affiliation: "Shoe Selling Enterprise",
    project: "Customer Service & Sales",
    content:
      "Working alongside Jayson in shoe selling taught me how resilient and customer-focused he is. He communicates with high patience, handles transactions accurately, and never complains during peak rush hours.",
    highlight: "Incredible people skills, honesty, and dependable responsibility.",
    image: "/profile.jpg",
    rating: 5,
    tags: ["Customer Service", "Work Ethic", "Resilience"],
  },
  {
    id: "test-6",
    name: "SPES Supervisor & LGU Colleague",
    role: "Government Program Officer",
    affiliation: "Local Government Office (SPES)",
    project: "Records & Data Management",
    content:
      "During the SPES program, Jayson was tasked with encoding OFW and scholar data into our official system. He showed remarkable accuracy, speed, and integrity when dealing with sensitive student documentation.",
    highlight: "Accurate, responsible, and detail-oriented data encoder.",
    image: "/awards2.png",
    rating: 5,
    tags: ["Data Management", "Government", "SPES"],
  },
];

export const TestimonialsSection: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItem | null>(null);

  // Split into two alternating rows for dynamic 3D scroll direction
  const rowOne = testimonials.slice(0, 3);
  const rowTwo = testimonials.slice(3, 6);

  const renderCard = (t: TestimonialItem) => (
    <div
      key={t.id}
      onClick={() => setSelectedTestimonial(t)}
      className="mx-2 sm:mx-3.5 w-[280px] sm:w-[350px] md:w-[380px] p-5 sm:p-6 rounded-[1.6rem] sm:rounded-[2rem] bg-card/85 backdrop-blur-xl border border-border/80 hover:border-primary/50 transition-all duration-300 shadow-xl cursor-pointer group flex flex-col justify-between select-none hover:-translate-y-1.5 transform-gpu shrink-0"
    >
      <div>
        {/* Rating and Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Quote className="w-4 h-4" />
          </div>
        </div>

        {/* Content excerpt */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic line-clamp-3 mb-4 group-hover:text-foreground/90 transition-colors">
          "{t.content}"
        </p>

        {/* Highlight badge */}
        <div className="mb-4 px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/15 text-[11px] font-semibold text-primary/90 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="line-clamp-1">{t.highlight}</span>
        </div>
      </div>

      {/* Author details */}
      <div className="pt-3 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-border/80 shrink-0 bg-muted">
            <img
              src={t.image}
              alt={t.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {t.name}
            </h4>
            <p className="text-[10px] text-muted-foreground line-clamp-1">
              {t.role}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          Read <ExternalLink className="w-2.5 h-2.5" />
        </span>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="w-full py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>008 — Social Proof &amp; Client Feedback</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Client &amp; Peer <span className="text-gradient-primary">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-3">
            Real feedback from academic clients, international COIL peers, and supervisors. Scroll smoothly to experience the 3D velocity tilt effect, and click any card to inspect in front.
          </p>
        </motion.div>
      </div>

      {/* 3D Scroll Trigger Container */}
      <div className="w-full relative py-6">
        {/* Gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 md:w-44 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 md:w-44 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

        <ThreeDScrollTriggerContainer className="space-y-6">
          {/* Row 1 - Forward velocity tilt */}
          <ThreeDScrollTriggerRow baseVelocity={3.5} direction={1} tiltEffect={true}>
            <div className="flex items-center py-2">
              {rowOne.map(renderCard)}
              {rowOne.map(renderCard)}
            </div>
          </ThreeDScrollTriggerRow>

          {/* Row 2 - Reverse velocity tilt */}
          <ThreeDScrollTriggerRow baseVelocity={3.5} direction={-1} tiltEffect={true}>
            <div className="flex items-center py-2">
              {rowTwo.map(renderCard)}
              {rowTwo.map(renderCard)}
            </div>
          </ThreeDScrollTriggerRow>
        </ThreeDScrollTriggerContainer>
      </div>

      {/* Interactive Modal to show in front when clicked */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-xl w-full bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 bg-muted shadow-md">
                    <img
                      src={selectedTestimonial.image}
                      alt={selectedTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {selectedTestimonial.name}
                    </h3>
                    <p className="text-xs text-primary font-semibold">
                      {selectedTestimonial.role}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {selectedTestimonial.affiliation}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTestimonial(null)}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stars & Tag Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border/60">
                <div className="flex items-center gap-1">
                  {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-mono font-bold text-muted-foreground ml-1.5">
                    5.0 / 5.0
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTestimonial.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Testimonial Content */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-primary/15 absolute -top-3 -left-2 -z-0" />
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed italic relative z-10 pl-4 border-l-2 border-primary/40">
                  "{selectedTestimonial.content}"
                </p>
              </div>

              {/* Key Takeaway Box */}
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/60 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-foreground block mb-0.5 uppercase tracking-wide">
                    Key Highlight
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {selectedTestimonial.highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;

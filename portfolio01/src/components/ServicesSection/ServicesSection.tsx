import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Database, Layers, Sparkles } from "lucide-react";
import StackingCards, { type StackingCardItem } from "../lightswind-pro/stacking-cards";

const services: StackingCardItem[] = [
  {
    id: "service-1",
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "Architecting and building scalable, high-performance web applications from end to end. Handling responsive frontend interfaces in React and Next.js paired with robust backend APIs, secure authentication, and seamless server integrations.",
    image: "/pic1.png",
    tags: ["React.js", "Next.js", "PHP", "JavaScript", "Supabase", "Vercel"],
    accentColor: "#38bdf8",
  },
  {
    id: "service-2",
    icon: Palette,
    title: "UI/UX Design & Implementation",
    description:
      "Crafting intuitive, accessible, and user-centric interfaces. Transforming ideas from wireframes and interactive prototypes in Figma and Canva into responsive, modern code with smooth micro-interactions and design systems.",
    image: "/pic2.png",
    tags: ["Figma", "Canva", "Responsive UI", "Tailwind CSS", "Micro-Interactions"],
    accentColor: "#a855f7",
  },
  {
    id: "service-3",
    icon: Database,
    title: "Database Design & Management",
    description:
      "Structuring, maintaining, and optimizing relational databases with MySQL, Supabase, and Cloud SQL Server. Specializing in efficient schema design, indexing, CRUD pipelines, and query optimization for high availability.",
    image: "/add2.png",
    tags: ["MySQL", "Supabase", "Cloud SQL", "Query Optimization", "CRUD"],
    accentColor: "#f59e0b",
  },
  {
    id: "service-4",
    icon: Layers,
    title: "Academic & Enterprise System Development",
    description:
      "Developing end-to-end management systems for academic and client requirements. Delivering user management, borrowing and inventory workflows, live status tracking, and dependable deployment.",
    image: "/add3.png",
    tags: ["System Architecture", "Client Deliverables", "Full Lifecycle", "PHP & Supabase"],
    accentColor: "#10b981",
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-24 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Capabilities &amp; Expertise</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-gradient-primary">
          What I Do
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Delivering comprehensive digital solutions with modern web engineering, aesthetic user interfaces, and robust database architectures.
        </p>
      </motion.div>

      {/* Lightswind Pro Stacking Cards Animation */}
      <StackingCards items={services} topOffset={100} />
    </section>
  );
};

export default ServicesSection;

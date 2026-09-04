import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { AboutSection } from "./components/AboutSection/AboutSection";
import { EducationSection } from "./components/EducationSection/EducationSection";
import { CareerTimeline } from "./components/CareerSection/CareerTimeline";
import { ServicesSection } from "./components/ServicesSection/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection/ProjectsSection";
import { AwardsSection } from "./components/AwardsSection/AwardsSection";
import { CertificatesSection } from "./components/CertificatesSection/CertificatesSection";
import { GallerySection } from "./components/GallerySection/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import { ContactSection } from "./components/ContactSection/ContactSection";
import { Footer } from "./components/Footer/Footer";
import { AiAssistant } from "./components/AiAssistant/AiAssistant";
import ReactLenis from "lenis/react";
import { Home, User, GraduationCap, Briefcase, FolderKanban, Send, Award, Image as ImageIcon, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Dock from "./components/lightswind/dock";
import LightningCursor from "./components/lightswind/lightning-cursor";
import BeamGridBackground from "./components/lightswind/beam-grid-background";

function App() {
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldShow = currentScrollY > lastScrollY && currentScrollY > window.innerHeight * 0.5;
      const isTop = currentScrollY < window.innerHeight * 0.5;

      if (shouldShow) {
        setShowDock(true);
      } else if (isTop) {
        setShowDock(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const dockItems = [
    { icon: <Home size={20} />, label: "Home", onClick: () => scrollToSection("hero") },
    { icon: <User size={20} />, label: "About", onClick: () => scrollToSection("about") },
    { icon: <GraduationCap size={20} />, label: "Education", onClick: () => scrollToSection("education") },
    { icon: <Briefcase size={20} />, label: "Experience", onClick: () => scrollToSection("career") },
    { icon: <Cpu size={20} />, label: "Skills", onClick: () => scrollToSection("skills") },
    { icon: <FolderKanban size={20} />, label: "Projects", onClick: () => scrollToSection("projects") },
    { icon: <Award size={20} />, label: "Awards", onClick: () => scrollToSection("awards") },
    { icon: <Award size={20} />, label: "Certificates", onClick: () => scrollToSection("certificates") },
    { icon: <ImageIcon size={20} />, label: "Gallery", onClick: () => scrollToSection("gallery") },
    { icon: <Send size={20} />, label: "Contact", onClick: () => scrollToSection("contact") },
  ];

  return (
    <div className="bg-transparent min-h-screen relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Global Interactive Beam Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BeamGridBackground
          gridSize={48}
          gridColor="rgba(0, 0, 0, 0.04)"
          darkGridColor="rgba(255, 255, 255, 0.04)"
          beamColor="rgba(59, 130, 246, 0.7)"
          darkBeamColor="rgba(96, 165, 250, 0.75)"
          beamSpeed={0.15}
          beamThickness={2.5}
          beamGlow={true}
          glowIntensity={40}
          beamCount={10}
          extraBeamCount={4}
          idleSpeed={1.0}
          showFade={true}
          fadeIntensity={30}
          asBackground={true}
          className="w-full h-full opacity-70 dark:opacity-85"
        />
      </div>

      <LightningCursor color="#38bdf8" glowColor="#60a5fa" sparkColor="#93c5fd" intensity={1.2} />
      <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
        <Header />

        <main className="w-full flex flex-col pt-10 border-none relative z-10">
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <CareerTimeline />
          <ServicesSection />
          <ProjectsSection />
          <AwardsSection />
          <CertificatesSection />
          <GallerySection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Dock */}
        <AnimatePresence>
          {showDock && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed bottom-2 left-0 right-0 z-[999] hidden md:block"
            >
              <Dock
                items={dockItems}
                panelHeight={56}
                baseItemSize={44}
                magnification={66}
                distance={180}
                multiBorder
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive AI Assistant Widget */}
        <AiAssistant />
      </ReactLenis>
    </div>
  );
}

export default App;

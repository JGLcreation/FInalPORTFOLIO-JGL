import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants, type MotionProps } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";

import { ThemeToggle } from "../lightswind/theme-toggle";
import TubelightNavbar from "../lightswind-pro/tubelight-navbar";

const navItems = [
  { name: "ABOUT", href: "#about" },
  { name: "EDUCATION", href: "#education" },
  { name: "EXPERIENCE", href: "#career" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "AWARDS", href: "#awards" },
  { name: "CERTIFICATES", href: "#certificates" },
  { name: "GALLERY", href: "#gallery" },
  { name: "CONTACT", href: "#contact" },
];

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("ABOUT");
  const lenis = useLenis();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up
      }
      lastScrollY = currentScrollY;

      // Track active section based on scroll position
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            const found = navItems.find((n) => n.href === `#${sectionId}`);
            if (found) setActiveNav(found.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(id);
    } else {
      const el = document.getElementById(id.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    const found = navItems.find((n) => n.href === id);
    if (found) setActiveNav(found.name);
    setIsMobileMenuOpen(false);
  };

  const menuVariants: Variants = {
    open: {
      clipPath: "circle(1500px at 90% 5%)",
      transition: { type: "spring", stiffness: 20, restDelta: 2 },
    },
    closed: {
      clipPath: "circle(0px at 90% 5%)",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const listVariants: Variants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div className="glass-panel w-full max-w-7xl rounded-[2.5rem] flex items-center justify-between px-6 py-3.5 shadow-2xl border border-foreground/10 backdrop-blur-2xl">
            {/* Logo */}
            <a
              onClick={() => handleScrollTo("#hero")}
              className="cursor-pointer font-extrabold text-lg flex items-center gap-3 group select-none shrink-0"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                  <span className="font-extrabold text-xs tracking-tighter bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-transparent">
                    JGL
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-tight text-foreground text-sm leading-none group-hover:text-primary transition-colors">
                  Jayson Gerona Lozada
                </span>
                <span className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                  Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation with TubelightNavbar Glow Beam */}
            <div className="hidden lg:flex flex-1 justify-center px-4">
              <TubelightNavbar
                items={navItems}
                activeItem={activeNav}
                onItemClick={(item) => handleScrollTo(item.href)}
                lightColor="#38bdf8"
                className="bg-background/40 border-border/50 shadow-inner"
              />
            </div>

            {/* Actions: Theme & Mobile Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-foreground hover:text-primary transition-colors p-2"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                {...({
                  initial: "closed",
                  animate: "open",
                  exit: "closed",
                  variants: menuVariants,
                } as MotionProps)}
                className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center"
              >
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-8 right-8 text-foreground p-2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  aria-label="Close menu"
                >
                  <X size={32} />
                </motion.button>

                <motion.ul
                  {...({ variants: listVariants } as MotionProps)}
                  className="flex flex-col items-center justify-center h-full space-y-6"
                >
                  {navItems.map((item) => (
                    <motion.li key={item.name} {...({ variants: itemVariants } as MotionProps)}>
                      <a
                        onClick={() => handleScrollTo(item.href)}
                        className={`text-2xl font-mono font-bold transition-all cursor-pointer ${
                          activeNav === item.name
                            ? "text-blue-400 scale-105 tracking-wider"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/content";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Shield,
  FolderOpen,
  Terminal,
  Mail,
  Menu,
  X,
} from "lucide-react";

const navIcons: Record<string, React.ReactNode> = {
  HOME: <Home size={18} />,
  ABOUT: <User size={18} />,
  EXPERIENCE: <Briefcase size={18} />,
  EDUCATION: <GraduationCap size={18} />,
  SKILLS: <Shield size={18} />,
  PROJECTS: <FolderOpen size={18} />,
  CTF: <Terminal size={18} />,
  CONTACT: <Mail size={18} />,
};

export default function ScrollMorphNav() {
  const [activeSection, setActiveSection] = useState<string>("/#home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (pathname !== "/") {
      const match = navItems.find((item) => item.href === pathname);
      if (match) setActiveSection(match.href);
      return;
    }

    const sections = navItems
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => ({
        id: item.href.substring(2),
        href: item.href,
      }));

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id, href }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveSection(href);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: [0, 0.3, 0.5, 1],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const handleNavClick = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        const hash = href.substring(2);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(href);
        } else if (pathname !== "/") {
          router.push(`/#${hash}`);
        }
      } else {
        router.push(href);
        setActiveSection(href);
      }
      setIsMobileMenuOpen(false);
    },
    [pathname, router]
  );

  const isActive = (href: string) => activeSection === href;

  // --- Mobile Navigation ---
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-[60] w-11 h-11 rounded-lg bg-background/90 backdrop-blur-md border border-accent/20 flex items-center justify-center text-gray-light hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[55]"
              />
              <motion.nav
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 w-64 bg-background/95 backdrop-blur-md border-r border-accent/10 z-[58] flex flex-col pt-20 px-6"
                aria-label="Main navigation"
              >
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium tracking-wide transition-colors duration-150 ${
                          isActive(item.href)
                            ? "text-accent bg-accent/5"
                            : "text-gray-light/70 hover:text-gray-light hover:bg-white/[0.03]"
                        }`}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        <span className={isActive(item.href) ? "text-accent" : "text-gray-light/40"}>
                          {navIcons[item.name]}
                        </span>
                        {item.name}
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="mobileActive"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // --- Desktop Navigation Rail ---
  return (
    <motion.nav
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
      animate={{ width: isExpanded ? 220 : 56 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed left-0 top-0 bottom-0 z-50 bg-background/80 backdrop-blur-md border-r border-accent/10 flex flex-col items-start justify-center overflow-hidden"
      aria-label="Main navigation"
    >
      <ul className="flex flex-col gap-1 w-full px-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => handleNavClick(item.href)}
              className={`relative w-full flex items-center gap-3 rounded-lg transition-colors duration-150 group ${
                isExpanded ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"
              } ${
                isActive(item.href)
                  ? "text-accent"
                  : "text-gray-light/50 hover:text-gray-light"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
              title={!isExpanded ? item.name : undefined}
            >
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeRail"
                  className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-accent"
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                />
              )}

              <span className={`flex-shrink-0 ${isExpanded ? "" : "mx-auto"}`}>
                {navIcons[item.name]}
              </span>

              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm font-medium tracking-wide whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

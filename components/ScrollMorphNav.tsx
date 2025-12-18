"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const navItems = [
  { name: "HOME", href: "/#home" },
  { name: "ABOUT ME", href: "/#about" },
  { name: "PROFESSIONAL", href: "/#experience" },
  { name: "EDUCATION", href: "/#education" },
  { name: "SKILLS", href: "/#skills" },
  { name: "PROJECTS", href: "/#projects" },
  { name: "CTF", href: "/ctf" },
  { name: "CONTACT", href: "/contact" },
];

export default function ScrollMorphNav() {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = HOME (right menu), 1 = ABOUT+ (left sidebar)
  const [activeSection, setActiveSection] = useState<string>("/#home");
  const pathname = usePathname();
  const router = useRouter();
  const rafRef = useRef<number>();
  const isHomePage = pathname === "/";

  // Smooth scroll progress value for animations
  const smoothProgress = useMotionValue(0);
  const springProgress = useSpring(smoothProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // Transform progress to opacity and translate values
  const rightMenuOpacity = useTransform(springProgress, [0, 0.5], [1, 0]);
  const rightMenuX = useTransform(springProgress, [0, 1], ["0%", "-100%"]);
  const sidebarOpacity = useTransform(springProgress, [0.5, 1], [0, 1]);
  const sidebarX = useTransform(springProgress, [0, 1], ["-100%", "0%"]);

  // Calculate scroll progress between HOME and ABOUT sections
  const calculateScrollProgress = useCallback(() => {
    if (!isHomePage) {
      setScrollProgress(1); // Always sidebar mode on other pages
      smoothProgress.set(1);
      return;
    }

    const homeSection = document.getElementById("home");
    const aboutSection = document.getElementById("about");

    if (!homeSection || !aboutSection) {
      return;
    }

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const aboutTop = aboutSection.offsetTop;
    
    // Start transition when HOME is near top, end when ABOUT reaches threshold (20% viewport)
    const startThreshold = 0;
    const endThreshold = aboutTop - viewportHeight * 0.2;
    const transitionRange = endThreshold - startThreshold;

    if (transitionRange <= 0) {
      setScrollProgress(0);
      smoothProgress.set(0);
      return;
    }

    // Calculate progress: 0 at start, 1 at end
    let progress = (scrollY - startThreshold) / transitionRange;
    progress = Math.max(0, Math.min(1, progress)); // Clamp to [0, 1]

    setScrollProgress(progress);
    smoothProgress.set(progress);
  }, [isHomePage, smoothProgress]);

  // Scroll listener with requestAnimationFrame for performance
  useEffect(() => {
    if (!isHomePage) {
      setScrollProgress(1);
      smoothProgress.set(1);
      return;
    }

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        calculateScrollProgress();
      });
    };

    // Initial calculation
    calculateScrollProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isHomePage, calculateScrollProgress, smoothProgress]);

  // IntersectionObserver for active section detection
  useEffect(() => {
    if (!isHomePage) {
      // On other pages, set active based on pathname
      setActiveSection(pathname);
      return;
    }

    const sections = navItems
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => ({
        id: item.href.substring(2), // Remove "/#"
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
          rootMargin: "-20% 0px -60% 0px", // Trigger when section is in upper portion of viewport
          threshold: [0, 0.3, 0.5, 1],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isHomePage, pathname]);

  // Handle navigation clicks
  const handleNavClick = useCallback((href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.substring(2); // Remove "/#"
      const element = document.getElementById(hash);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(href);
      } else if (pathname !== "/") {
        // Navigate to home then scroll
        router.push(`/#${hash}`);
      }
    } else {
      router.push(href);
      setActiveSection(href);
    }
  }, [pathname, router]);

  const isActive = (href: string) => {
    return activeSection === href;
  };

  // Determine if we're in sidebar mode (progress >= 0.5 or not on home page)
  const isSidebarMode = scrollProgress >= 0.5 || !isHomePage;

  // Set body attribute for content offset when sidebar is active
  useEffect(() => {
    if (isSidebarMode) {
      document.body.setAttribute("data-sidebar-active", "true");
    } else {
      document.body.removeAttribute("data-sidebar-active");
    }
  }, [isSidebarMode]);

  return (
    <>
      {/* Right Menu (HOME state) - morphs to left as scroll progresses */}
      {isHomePage && (
        <motion.nav
          style={{
            opacity: rightMenuOpacity,
            x: rightMenuX,
            pointerEvents: scrollProgress < 0.5 ? "auto" : "none",
          }}
          className="fixed inset-0 z-50 flex items-center justify-end pr-8 md:pr-16 lg:pr-24"
          aria-label="Main navigation"
        >
          {/* Menu Items - Vertical list centered-right */}
          <motion.ul
            className="flex flex-col gap-8 md:gap-10 text-right"
            style={{ opacity: rightMenuOpacity }}
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              >
                <button
                  onClick={() => handleNavClick(item.href)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className={`relative text-2xl md:text-3xl lg:text-4xl font-light tracking-wider uppercase text-gray-light transition-colors duration-300 pb-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded ${
                    isActive(item.href)
                      ? "text-accent"
                      : "hover:text-purple-accent"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                  {/* Underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-current"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive(item.href) ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      )}

      {/* Left Sidebar - appears as scroll progresses */}
      <motion.nav
        style={{
          x: isHomePage ? sidebarX : 0,
          opacity: isHomePage ? sidebarOpacity : 1,
          pointerEvents: isSidebarMode ? "auto" : "none",
        }}
        className="fixed left-0 top-0 bottom-0 w-full md:w-64 lg:w-80 bg-background/95 backdrop-blur-sm border-r border-accent/20 z-50 flex flex-col items-center justify-center py-12"
        aria-label="Main navigation"
      >
        {/* Menu Items - Vertical list */}
        <ul className="flex flex-col gap-6 md:gap-8 w-full px-8">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isSidebarMode ? 1 : 0, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
            >
              <button
                onClick={() => handleNavClick(item.href)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className={`relative w-full text-left text-lg md:text-xl font-light tracking-wider uppercase text-gray-light transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded ${
                  isActive(item.href)
                    ? "text-accent"
                    : "hover:text-purple-accent"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                {/* Active indicator */}
                {isActive(item.href) && (
                  <motion.span
                    className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
                {/* Underline */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-px bg-current"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive(item.href) ? 1 : 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}

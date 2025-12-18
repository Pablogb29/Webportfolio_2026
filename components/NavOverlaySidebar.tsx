"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type NavMode = "overlay" | "sidebar";

// Context to share sidebar state with layout
const NavContext = createContext<{
  mode: NavMode;
  setMode: (mode: NavMode) => void;
}>({
  mode: "overlay",
  setMode: () => {},
});

export const useNavContext = () => useContext(NavContext);

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT ME", href: "/#about" },
  { name: "PROFESSIONAL", href: "/#experience" },
  { name: "EDUCATION", href: "/#education" },
  { name: "SKILLS", href: "/#skills" },
  { name: "PROJECTS", href: "/projects" },
  { name: "CONTACT", href: "/contact" },
];

export default function NavOverlaySidebar() {
  const [mode, setMode] = useState<NavMode>("overlay");
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("/");
  const pathname = usePathname();
  const router = useRouter();

  // Update active section based on pathname
  useEffect(() => {
    if (pathname === "/") {
      // Check if we're on a hash section
      const hash = window.location.hash;
      if (hash) {
        setActiveSection(`/#${hash.substring(1)}`);
      } else {
        setActiveSection("/");
      }
    } else {
      setActiveSection(pathname);
    }
  }, [pathname]);

  // Handle hash changes for sections on home page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && pathname === "/") {
        setActiveSection(`/#${hash.substring(1)}`);
      }
    };

    // Check initial hash on mount
    if (typeof window !== "undefined" && pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        setActiveSection(`/#${hash.substring(1)}`);
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  // Set data attribute on body for CSS-based layout offset
  useEffect(() => {
    if (mode === "sidebar") {
      document.body.setAttribute("data-sidebar-active", "true");
    } else {
      document.body.removeAttribute("data-sidebar-active");
    }
  }, [mode]);

  const handleNavClick = (href: string) => {
    if (mode === "overlay") {
      setIsAnimating(true);
      setActiveSection(href);
      
      // Trigger animation
      setTimeout(() => {
        setMode("sidebar");
        setIsAnimating(false);
      }, 500); // Match animation duration
    } else {
      setActiveSection(href);
    }

    // Handle navigation
    if (href.startsWith("/#")) {
      // Handle hash navigation
      const hash = href.substring(2); // Remove "/#"
      if (pathname === "/") {
        // Already on home, just scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        // Update URL hash without scrolling again
        window.history.pushState(null, "", `/#${hash}`);
      } else {
        // Navigate to home then scroll
        router.push(`/#${hash}`);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      router.push(href);
    }
  };

  const handleClose = () => {
    if (mode === "sidebar") {
      setIsAnimating(true);
      setTimeout(() => {
        setMode("overlay");
        setIsAnimating(false);
      }, 500);
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.substring(2); // Remove "/#"
      return activeSection === href || (pathname === "/" && window.location.hash === `#${hash}`);
    }
    return activeSection === href || pathname === href;
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close sidebar
      if (e.key === "Escape" && mode === "sidebar") {
        handleClose();
      }
      // Arrow keys for navigation (when sidebar is active)
      if (mode === "sidebar" && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        const currentIndex = navItems.findIndex((item) => isActive(item.href));
        let nextIndex = currentIndex;
        
        if (e.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % navItems.length;
        } else {
          nextIndex = (currentIndex - 1 + navItems.length) % navItems.length;
        }
        
        handleNavClick(navItems[nextIndex].href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, activeSection, pathname]);

  return (
    <NavContext.Provider value={{ mode, setMode }}>
      {/* Overlay Mode */}
      <AnimatePresence>
        {mode === "overlay" && (
          <motion.nav
            initial={{ opacity: 1, x: 0 }}
            exit={{ 
              opacity: 0,
              x: "-100%",
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-end pr-8 md:pr-16 lg:pr-24"
            aria-label="Main navigation"
          >
            {/* Close button - top right */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleClose}
              className="absolute top-8 right-8 md:top-12 md:right-12 text-gray-light hover:text-accent transition-colors z-10"
              aria-label="Close navigation"
            >
              <X size={24} />
            </motion.button>

            {/* Menu Items - Vertical list centered-right */}
            <motion.ul
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-8 md:gap-10 text-right"
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
      </AnimatePresence>

      {/* Sidebar Mode */}
      <AnimatePresence>
        {mode === "sidebar" && (
          <>
            {/* Fixed Left Sidebar */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1], // Premium easing
              }}
              className="fixed left-0 top-0 bottom-0 w-full md:w-64 lg:w-80 bg-background/95 backdrop-blur-sm border-r border-accent/20 z-50 flex flex-col items-center justify-center py-12"
              aria-label="Main navigation"
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={handleClose}
                className="absolute top-6 right-6 text-gray-light hover:text-accent transition-colors"
                aria-label="Close navigation"
              >
                <X size={24} />
              </motion.button>

              {/* Menu Items - Vertical list */}
              <ul className="flex flex-col gap-6 md:gap-8 w-full px-8">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
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
        )}
      </AnimatePresence>

      {/* Mobile: Hamburger button - always visible on mobile when sidebar is closed */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: mode === "overlay" ? 1 : 0 }}
        className="fixed top-6 right-6 z-50 md:hidden w-12 h-12 flex items-center justify-center text-gray-light hover:text-accent transition-colors"
        onClick={() => {
          // On mobile, clicking hamburger opens sidebar directly
          if (mode === "overlay") {
            setMode("sidebar");
          }
        }}
        aria-label="Open navigation"
        style={{ pointerEvents: mode === "overlay" ? "auto" : "none" }}
      >
        <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
          <motion.span
            className="w-full h-0.5 bg-current rounded"
            animate={{ rotate: 0 }}
          />
          <motion.span
            className="w-full h-0.5 bg-current rounded"
            animate={{ opacity: 1 }}
          />
          <motion.span
            className="w-full h-0.5 bg-current rounded"
            animate={{ rotate: 0 }}
          />
        </div>
      </motion.button>
    </NavContext.Provider>
  );
}


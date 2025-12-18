"use client";

import { useState, useEffect, useRef } from "react";
import { Home, User, Code, FolderKanban, Terminal, Mail, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import TypewriterText from "./TypewriterText";

const navItems = [
  { name: "Home", href: "/", icon: Home, color: "from-cyber-purple to-purple-accent" },
  { name: "About", href: "#about", icon: User, color: "from-purple-accent to-accent-secondary" },
  { name: "Experience", href: "#experience", icon: Briefcase, color: "from-accent-secondary to-accent" },
  { name: "Education", href: "#education", icon: GraduationCap, color: "from-accent to-cyber-purple" },
  { name: "Skills", href: "#skills", icon: Code, color: "from-cyber-purple to-accent-secondary" },
  { name: "Projects", href: "/projects", icon: FolderKanban, color: "from-purple-accent to-accent" },
  { name: "Labs", href: "/labs", icon: Terminal, color: "from-accent-secondary to-purple-accent" },
  { name: "Contact", href: "/contact", icon: Mail, color: "from-accent-secondary to-purple-accent" },
];

interface NodePosition {
  x: number;
  y: number;
}

// Node component with integrated tooltip
function NodeWithTooltip({ 
  item, 
  active, 
  index,
  totalItems 
}: { 
  item: typeof navItems[0]; 
  active: boolean;
  index: number;
  totalItems: number;
}) {
  const [typewriterKey, setTypewriterKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;
  
  // Calculate tooltip position based on node position in semicircle
  // Top nodes: northeast (top-right), Bottom nodes: southeast (bottom-right), Middle: right
  let tooltipPosition = {
    left: "auto",
    right: "auto",
    top: "auto",
    bottom: "auto",
    transform: "",
    marginLeft: "",
    marginRight: "",
    marginTop: "",
    marginBottom: "",
    arrowPosition: "" as "top" | "bottom" | "right" | "left" | "top-right" | "bottom-right",
  };
  
  // Get item name to determine specific positioning
  const itemName = item.name.toLowerCase();
  
  if (index === 0) {
    // First node (top of semicircle) - tooltip northeast (top-right)
    tooltipPosition = {
      left: "100%",
      right: "auto",
      top: "auto",
      bottom: "100%",
      transform: "translateY(0)",
      marginLeft: "12px",
      marginRight: "",
      marginTop: "",
      marginBottom: "4px",
      arrowPosition: "bottom-right",
    };
  } else if (itemName === "projects") {
    // Projects - tooltip east (right, vertically centered)
    tooltipPosition = {
      left: "calc(100% + 16px)",
      right: "auto",
      top: "50%",
      bottom: "auto",
      transform: "translateY(-50%)",
      marginLeft: "0",
      marginRight: "",
      marginTop: "",
      marginBottom: "",
      arrowPosition: "right",
    };
  } else if (itemName === "labs") {
    // Labs - tooltip southeast (bottom-right)
    tooltipPosition = {
      left: "100%",
      right: "auto",
      top: "100%",
      bottom: "auto",
      transform: "translateY(0)",
      marginLeft: "12px",
      marginRight: "",
      marginTop: "4px",
      marginBottom: "",
      arrowPosition: "top-right",
    };
  } else if (index === totalItems - 1) {
    // Last node (bottom of semicircle) - tooltip southeast (bottom-right)
    tooltipPosition = {
      left: "100%",
      right: "auto",
      top: "100%",
      bottom: "auto",
      transform: "translateY(0)",
      marginLeft: "12px",
      marginRight: "",
      marginTop: "4px",
      marginBottom: "",
      arrowPosition: "top-right",
    };
  } else {
    // All other middle nodes - tooltip northeast (top-right)
    tooltipPosition = {
      left: "100%",
      right: "auto",
      top: "auto",
      bottom: "100%",
      transform: "translateY(0)",
      marginLeft: "12px",
      marginRight: "",
      marginTop: "",
      marginBottom: "4px",
      arrowPosition: "bottom-right",
    };
  }

  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => {
        setIsHovered(true);
        setTypewriterKey(prev => prev + 1);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
    >
      {/* Node Circle */}
      <motion.div
        className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center relative shadow-lg ${
          active ? "ring-4 ring-purple-accent/50" : ""
        }`}
        animate={{
          boxShadow: active
            ? [
                "0_0_20px_rgba(147,51,234,0.5)",
                "0_0_30px_rgba(168,85,247,0.7)",
                "0_0_20px_rgba(147,51,234,0.5)",
              ]
            : "0_4px_20px_rgba(147,51,234,0.3)",
        }}
        transition={{
          duration: 2,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* Icon */}
        <Icon
          size={24}
          className="text-background relative z-10"
        />

        {/* Pulsing ring for active */}
        {active && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-accent"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </motion.div>

      {/* Label Tooltip with Typewriter Effect - Dynamic positioning */}
      <motion.div
        className="absolute whitespace-nowrap px-3 py-1.5 bg-background/95 backdrop-blur-sm border border-cyber-purple/30 rounded-lg pointer-events-none min-w-[80px] z-50"
        style={{
          left: tooltipPosition.left,
          right: tooltipPosition.right,
          top: tooltipPosition.top,
          bottom: tooltipPosition.bottom,
          transform: tooltipPosition.transform,
          marginLeft: tooltipPosition.marginLeft,
          marginRight: tooltipPosition.marginRight,
          marginTop: tooltipPosition.marginTop,
          marginBottom: tooltipPosition.marginBottom,
          overflow: "visible",
          whiteSpace: "nowrap",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.9 
        }}
        transition={{ duration: 0.2 }}
      >
        <span className={`text-sm font-medium ${
          active ? "text-purple-accent" : "text-gray-light"
        }`}>
          <TypewriterText 
            key={typewriterKey}
            text={item.name} 
            isVisible={typewriterKey > 0}
            speed={40}
          />
        </span>
        {/* Tooltip arrow - position based on tooltip location */}
        {tooltipPosition.arrowPosition === "right" && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-cyber-purple/30" />
        )}
        {tooltipPosition.arrowPosition === "top-right" && (
          <div className="absolute bottom-full right-0 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-cyber-purple/30" />
        )}
        {tooltipPosition.arrowPosition === "bottom-right" && (
          <div className="absolute top-full right-0 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyber-purple/30" />
        )}
      </motion.div>

      {/* Connection point indicator */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-purple-accent/30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Calculate node positions in a fan/semicircle layout from center "P"
  const getNodePositions = (): NodePosition[] => {
    const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
    const centerX = 40; // Position of central "P" node (left-6 = 24px + 16px for node radius)
    const radius = 180; // Distance from center to nodes
    const startAngle = -90; // Start from top (degrees)
    const endAngle = 90; // End at bottom (degrees)
    const totalAngle = endAngle - startAngle; // 180 degrees (semicircle)

    return navItems.map((_, index) => {
      // Distribute nodes evenly across semicircle
      const angle = startAngle + (index / (navItems.length - 1)) * totalAngle;
      const angleRad = (angle * Math.PI) / 180;
      
      return {
        x: centerX + Math.cos(angleRad) * radius,
        y: centerY + Math.sin(angleRad) * radius,
      };
    });
  };

  const nodePositions = getNodePositions();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Detect proximity to left edge (within 80px)
      if (e.clientX < 80 && !isExpanded) {
        setIsHovered(true);
      } else if (e.clientX > 400 && isExpanded) {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (isHovered) {
      setIsExpanded(true);
    } else {
      const timer = setTimeout(() => {
        if (!sidebarRef.current?.matches(":hover")) {
          setIsExpanded(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Visible Indicator - Pulsing dots only */}
      <motion.div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50"
        animate={{
          x: isExpanded ? -20 : 0,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Pulsing indicator */}
        <motion.div
          className="relative w-12 h-32 flex flex-col items-center justify-center gap-2"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
        >
          {/* Pulsing dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-accent rounded-full"
              style={{
                left: "50%",
                top: `${33.33 * (i + 1)}%`,
                x: "-50%",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Arrow hint */}
          <motion.div
            className="absolute -right-2 top-1/2 -translate-y-1/2"
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-purple-accent opacity-60" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Trigger Zone */}
      <motion.div
        className="fixed left-0 top-0 bottom-0 w-20 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
      />

      {/* Floating Graph Navbar */}
      <motion.div
        ref={sidebarRef}
        initial={false}
        animate={{
          x: isExpanded ? 0 : -350,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTimeout(() => setIsExpanded(false), 300);
        }}
        className="fixed left-0 top-0 bottom-0 z-50 w-96 pointer-events-auto"
        style={{ overflow: "visible" }}
      >
        <div className="relative h-full w-full">
          {/* Background removed - completely floating */}
          <motion.div
            className="absolute inset-0 bg-transparent border-r-0"
            style={{
              clipPath: isExpanded
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 0 0, 0 100%, 0 100%)",
            }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Gradient overlay - removed for transparency */}

            {/* Connection Lines (Graph Edges) - Fan from center */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
              {nodePositions.map((node, index) => {
                const centerX = 40; // Position of central "P" node
                const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
                
                return (
                  <motion.line
                    key={`edge-center-${index}`}
                    x1={centerX}
                    y1={centerY}
                    x2={node.x}
                    y2={node.y}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: isExpanded ? 1 : 0,
                      opacity: isExpanded ? 0.3 : 0,
                    }}
                    transition={{
                      delay: index * 0.08 + 0.2,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    strokeDasharray="5,5"
                  />
                );
              })}
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333EA" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#A855F7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating Nodes (Bubbles) */}
            <div className="relative h-full w-full" style={{ overflow: "visible" }}>
              {navItems.map((item, index) => {
                const active = isActive(item.href);
                const position = nodePositions[index];

                return (
                  <motion.div
                    key={item.name}
                    initial={false}
                    animate={{
                      x: isExpanded ? position.x : 40, // Start from center "P" position
                      y: isExpanded ? position.y : (typeof window !== "undefined" ? window.innerHeight / 2 : 400),
                      scale: isExpanded ? 1 : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 18,
                      delay: index * 0.08,
                    }}
                    className="absolute"
                    style={{
                      x: position.x,
                      y: position.y,
                    }}
                  >
                    <Link href={item.href}>
                      <NodeWithTooltip 
                        item={item} 
                        active={active} 
                        index={index}
                        totalItems={navItems.length}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Central Hub Node (Logo) */}
            <motion.div
              className="absolute left-6 top-1/2 -translate-y-1/2"
              animate={{
                scale: isExpanded ? 1 : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Link href="/">
                <motion.div
                  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyber-purple via-purple-accent to-accent flex items-center justify-center cursor-pointer shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-background font-bold font-mono text-2xl relative z-10">
                    P
                  </span>
                  
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-accent/50"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Pulsing rings */}
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-purple-accent/30"
                      animate={{
                        scale: [1, 1 + i * 0.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.div
        className="fixed top-6 left-6 z-50 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-full bg-transparent border-0 flex items-center justify-center text-gray-light hover:text-purple-accent transition-colors shadow-lg"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <motion.div
                className="w-full h-0.5 bg-current rounded"
                animate={{
                  rotate: isExpanded ? 45 : 0,
                  y: isExpanded ? 4 : 0,
                }}
              />
              <motion.div
                className="w-full h-0.5 bg-current rounded"
                animate={{ opacity: isExpanded ? 0 : 1 }}
              />
              <motion.div
                className="w-full h-0.5 bg-current rounded"
                animate={{
                  rotate: isExpanded ? -45 : 0,
                  y: isExpanded ? -4 : 0,
                }}
              />
            </div>
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
}

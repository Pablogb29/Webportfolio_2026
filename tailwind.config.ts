import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Certification tooltip positioning classes
    "absolute",
    "left-1/2",
    "-translate-x-1/2",
    "top-full",
    "mt-3",
    "z-50",
    "pointer-events-none",
    "opacity-0",
    "translate-y-1",
    "group-hover:opacity-100",
    "group-hover:translate-y-0",
    "group-focus-within:opacity-100",
    "group-focus-within:translate-y-0",
    "transition-all",
    "duration-200",
    "ease-out",
    // Tooltip arrow
    "-top-2",
    "w-4",
    "h-4",
    "border-l",
    "border-t",
    "transform",
    "rotate-45",
    // Certification card conditional classes
    "md:scale-105",
    "border-accent",
    "border-green-500/50",
    "border-cyber-purple/30",
    "group-hover:border-opacity-80",
    "group-hover:shadow-lg",
    "group-focus-within:border-opacity-80",
    "group-focus-within:shadow-lg",
    "text-accent",
    "text-cyber-purple/60",
    "text-gray-light/40",
    "text-green-400",
    "text-gray-light",
    "bg-accent/10",
    "border-accent/40",
    "bg-green-500/10",
    "border-green-500/40",
    "bg-cyber-purple/10",
    "border-cyber-purple/30",
    // CTF page dynamic classes
    "bg-container-alt",
    "border-accent/20",
    "border-accent/10",
    "border-accent/40",
    "text-gray-light",
    "text-gray-light/40",
    "hover:border-accent/40",
    "cursor-not-allowed",
    // Projects page classes
    "group-hover:text-purple-accent",
    // Overflow visible for tooltips
    "overflow-visible",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        container: "#111827",
        "container-alt": "#1E1E2E",
        accent: "#00D9FF", // Cyan brillante del vórtice
        "accent-secondary": "#E91E63", // Magenta/rosa de los brazos del vórtice
        "cyber-purple": "#9333EA", // Púrpura cibernético principal
        "cyber-blue": "#6366F1", // Azul-púrpura mezcla (indigo)
        "purple-accent": "#A855F7", // Púrpura más brillante para acentos
        "gray-light": "#D1D5DB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 217, 255, 0.4), 0 0 10px rgba(147, 51, 234, 0.3)" },
          "100%": { boxShadow: "0 0 10px rgba(0, 217, 255, 0.5), 0 0 20px rgba(147, 51, 234, 0.4), 0 0 30px rgba(233, 30, 99, 0.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;


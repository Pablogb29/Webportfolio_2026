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
    "bg-accent/10",
    "border-accent/40",
    "bg-green-500/10",
    "border-green-500/40",
    "bg-cyber-purple/10",
    "border-cyber-purple/30",
    "text-accent",
    "text-green-400",
    "text-gray-light",
    "text-gray-light/40",
    "text-cyber-purple/60",
    "border-green-500/50",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        container: "#111827",
        "container-alt": "#1E1E2E",
        accent: "#00D9FF",
        "accent-secondary": "#E91E63",
        "cyber-purple": "#9333EA",
        "cyber-blue": "#6366F1",
        "purple-accent": "#A855F7",
        "gray-light": "#D1D5DB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
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
      },
    },
  },
  plugins: [],
};
export default config;

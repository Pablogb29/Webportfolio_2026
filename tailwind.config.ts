import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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


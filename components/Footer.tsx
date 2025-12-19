"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [cssLoaded, setCssLoaded] = useState<boolean | null>(null);

  // Debug CSS loading in production
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // Check if Tailwind classes are applied by testing a known class
      const testElement = document.createElement("div");
      testElement.className = "bg-container";
      testElement.style.position = "absolute";
      testElement.style.visibility = "hidden";
      document.body.appendChild(testElement);

      const computedStyle = window.getComputedStyle(testElement);
      const bgColor = computedStyle.backgroundColor;
      
      // bg-container should be rgb(17, 24, 39) - check if it's applied
      const isLoaded = bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent" && bgColor !== "";
      
      setCssLoaded(isLoaded);
      
      // Log to console for debugging
      if (!isLoaded) {
        console.error("[CSS Debug] Tailwind CSS not loaded properly. Background color:", bgColor);
        console.error("[CSS Debug] Check that /_next/static/css/*.css is accessible");
      } else {
        console.log("[CSS Debug] Tailwind CSS loaded successfully");
      }

      document.body.removeChild(testElement);
    }
  }, []);

  return (
    <footer className="bg-container border-t border-accent/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-light text-sm">
            © {currentYear} Pablo. All rights reserved.
            {/* CSS Loading Debug - Only visible in production if CSS fails */}
            {process.env.NODE_ENV === "production" && cssLoaded === false && (
              <span className="block text-red-400 text-xs mt-2">
                ⚠️ CSS not loaded - Check /_next/static/ assets
              </span>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-light hover:text-accent transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-light hover:text-accent transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-gray-light hover:text-accent transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,154,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          >
            <span className="text-gray-light">Pablo</span>
            <br />
            <span className="text-accent cyber-glow">Offensive Security Engineer</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-light font-mono"
          >
            Red Team • Pentesting • OSCP Preparation • Exploit Development
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-light/80 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Specializing in offensive security research, penetration testing, and red team operations.
            Focused on Active Directory exploitation, web application security, and exploit development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link
              href="/projects"
              className="group relative px-8 py-3 bg-accent text-background font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,154,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowDown className="group-hover:translate-y-1 transition-transform" size={18} />
              </span>
            </Link>

            <a
              href="/resume.pdf"
              download
              className="group px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(0,255,154,0.3)]"
            >
              <span className="flex items-center gap-2">
                <Download size={18} />
                Download Resume
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-accent/60"
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}


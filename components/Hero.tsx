"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // If not on home page, navigate to home and then scroll
      router.push("/");
      setTimeout(() => {
        const section = document.getElementById("projects");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24">

      {/* Centered content container */}
      <div className="w-full max-w-[62.5rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold px-2"
            >
              <span className="text-gray-light">Pablo Gutiérrez</span>
              <br />
              <span className="text-cyber-purple purple-glow">Cybersecurity & IAM Engineer</span>
              <br />
              <span className="text-accent text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 block">
                Transitioning to Pentester
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-light font-mono px-4"
            >
              Blue Team → Red Team • OSCP Preparation • HTB Practice • Active Directory Security
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-gray-light/80 text-xs sm:text-sm md:text-base px-4 sm:px-6 max-w-3xl"
            >
              Currently a Cybersecurity & IAM Engineer specializing in Blue Team operations, actively transitioning to offensive security. Preparing for OSCP certification while maintaining rigorous practice through Hack The Box and developing security automation tools. My extensive IAM background provides a unique perspective on defensive postures—understanding access controls, user management, and data protection—which strengthens my offensive security capabilities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-8 w-full sm:w-auto px-4"
            >
              <button
                onClick={scrollToProjects}
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-accent text-background font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,217,255,0.4),0_0_30px_rgba(147,51,234,0.3),0_0_40px_rgba(233,30,99,0.2)] text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Projects
                  <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </span>
              </button>

              <a
                href="/Pablo_Gutierrez_CV.pdf"
                download="Pablo_Gutierrez_CV.pdf"
                className="group w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-accent text-accent font-semibold rounded-lg transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.3),0_0_30px_rgba(147,51,234,0.25),0_0_40px_rgba(233,30,99,0.15)] text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Download Resume
                </span>
              </a>
            </motion.div>
        </div>
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

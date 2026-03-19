"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Hero() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const performScroll = () => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        const offset = 100;
        const elementPosition = projectsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      } else {
        setTimeout(performScroll, 200);
      }
    };

    if (pathname !== "/") {
      router.push("/");
      setTimeout(performScroll, 500);
    } else {
      setTimeout(performScroll, 100);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#projects") {
      setTimeout(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          const offset = 100;
          const elementPosition = projectsSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24">
      <div className="w-full max-w-[62.5rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold px-2"
            >
              <span className="text-gray-light">Pablo Guti&eacute;rrez</span>
              <br />
              <span className="text-cyber-purple">Cybersecurity Engineer</span>
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
              Blue Team &rarr; Red Team &bull; OSCP Preparation &bull; HTB Practice &bull; Active Directory Security
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-gray-light/80 text-xs sm:text-sm md:text-base px-4 sm:px-6 max-w-3xl"
            >
              Currently a Cybersecurity &amp; IAM Engineer specializing in Blue Team operations, actively transitioning to offensive security. Preparing for OSCP certification while maintaining rigorous practice through Hack The Box and developing security automation tools. My extensive IAM background provides a unique perspective on defensive postures&mdash;understanding access controls, user management, and data protection&mdash;which strengthens my offensive security capabilities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-8 w-full sm:w-auto px-4"
            >
              <button
                type="button"
                onClick={scrollToProjects}
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-accent text-background font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 text-sm sm:text-base cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Projects
                  <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </span>
              </button>

              <a
                href="/Pablo_Gutierrez_CV.pdf"
                download="Pablo_Gutierrez_CV.pdf"
                className="group w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-accent text-accent font-semibold rounded-lg transition-all duration-300 hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/10 text-sm sm:text-base cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Download Resume
                </span>
              </a>
            </motion.div>
        </div>
      </div>

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

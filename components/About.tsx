"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const coreAreas = [
  "Security Engineering & IAM",
  "Offensive Security & Penetration Testing",
  "Active Directory Attack & Defense",
  "Security Automation (Python, Bash, PowerShell)",
];

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-light mb-3 sm:mb-4 px-2">
            About <span className="text-cyber-purple">Me</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-cyber-purple mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-gray-light/90 text-sm sm:text-base leading-relaxed px-2 sm:px-0">
              With a foundation in <span className="text-purple-accent font-semibold">Telecommunications Engineering</span> and two Master&apos;s degrees in Cybersecurity and AI, I currently work as a Cybersecurity Engineer at Indra | Minsait Cyber, where I manage identity lifecycle, automate access governance, and build security tooling for large-scale data platforms.
            </p>
            <p className="text-gray-light/90 leading-relaxed">
              I am actively transitioning toward <span className="text-purple-accent font-semibold">offensive security</span>. My Master&apos;s thesis involved designing, building, and comprehensively auditing a full Active Directory lab environment from scratch, deepening my expertise in attack methodologies like Kerberoasting, AS-REP roasting, and various privilege escalation vectors.
            </p>
            <p className="text-gray-light/90 leading-relaxed">
              I maintain consistent hands-on practice through Hack The Box (33 machines solved with OSCP-oriented write-ups) and am working toward CJCA, CPTS, and OSCP certifications. My Blue Team experience in IAM and compliance gives me a practical understanding of the defensive postures that offensive testers need to navigate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-container rounded-lg p-4 sm:p-6 border border-accent/20 hover:border-accent/40 transition-colors duration-200"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Terminal size={18} className="text-cyber-purple w-[18px] h-[18px] sm:w-5 sm:h-5" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-light">Core Focus Areas</h3>
            </div>
            <ul className="space-y-3">
              {coreAreas.map((area, index) => (
                <motion.li
                  key={area}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-gray-light/80"
                >
                  <span className="text-purple-accent font-mono">▸</span>
                  <span>{area}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

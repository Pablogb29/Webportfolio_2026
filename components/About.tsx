"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function About() {
  const skills = [
    "Blue Team: IAM",
    "Red Team: Penetration Testing",
    "Security Automation",
    "AI & Machine Learning",
    "Python, Bash & PowerShell",
  ];

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
            <p className="text-gray-light/90 text-sm sm:text-base leading-relaxed text-justify px-2 sm:px-0">
              With a foundation in <span className="text-purple-accent font-semibold">Telecommunications Engineering</span>, I've always been drawn to understanding how systems communicate and interconnect. I specialize in <span className="text-purple-accent font-semibold">Penetration Testing</span>, though I'm currently working on a Blue Team where I focus on identity and access management and automating the security of the information we protect. This dual experience gives me valuable insight into both offensive and defensive security perspectives.
            </p>
            <p className="text-gray-light/90 leading-relaxed text-justify">
              I've always wanted to be an ethical hacker—to protect systems before malicious actors do, giving organizations time to correct vulnerabilities and protect their information. My Master's thesis project involved designing, building, and comprehensively auditing a full Active Directory lab environment from scratch, which deepened my expertise in attack methodologies like Kerberoasting, AS-REP roasting, and various privilege escalation vectors.
            </p>
            <p className="text-gray-light/90 leading-relaxed text-justify">
              Within penetration testing, I specialize in Active Directory, but I cover the full cycle from OSINT and network scanning to privilege escalation, lateral movement, and brute force attack techniques to achieve our goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-container rounded-lg p-4 sm:p-6 border border-accent/20 cyber-hover"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Terminal className="text-cyber-purple" size={18} className="sm:w-5 sm:h-5" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-light">Core Focus Areas</h3>
            </div>
            <ul className="space-y-3">
              {skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-gray-light/80"
                >
                  <span className="text-purple-accent font-mono">▸</span>
                  <span>{skill}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


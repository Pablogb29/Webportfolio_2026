"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function About() {
  const skills = [
    "Pentesting",
    "AD Attack Paths",
    "Web/API Security",
    "Exploit Research",
    "Scripting (Python, Bash, PowerShell)",
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-light mb-4">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-gray-light/90 leading-relaxed">
              I'm an <span className="text-accent font-semibold">Offensive Security Engineer</span>{" "}
              with a passion for finding vulnerabilities and understanding attack vectors. My work
              focuses on identifying security weaknesses before malicious actors can exploit them.
            </p>
            <p className="text-gray-light/90 leading-relaxed">
              With expertise in penetration testing, red team operations, and exploit development,
              I help organizations strengthen their security posture through comprehensive security
              assessments and research.
            </p>
            <p className="text-gray-light/90 leading-relaxed">
              Currently preparing for the OSCP certification while actively engaging in HTB labs,
              developing custom tools, and contributing to the offensive security community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-container rounded-lg p-6 border border-accent/20 cyber-hover"
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="text-accent" size={20} />
              <h3 className="text-xl font-semibold text-gray-light">Core Focus Areas</h3>
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
                  <span className="text-accent font-mono">▸</span>
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


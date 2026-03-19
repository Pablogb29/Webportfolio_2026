"use client";

import { motion } from "framer-motion";
import { Shield, Network, Globe, Code } from "lucide-react";
import { skillCategories } from "@/lib/content";

const categoryIcons: Record<string, React.ReactNode> = {
  "Offensive Security": <Shield size={24} />,
  "Security Engineering & IAM": <Network size={24} />,
  "Cloud & Infrastructure": <Globe size={24} />,
  "Programming & Automation": <Code size={24} />,
};

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-light mb-3 sm:mb-4 px-2">
            Skills <span className="text-cyber-purple">Matrix</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-cyber-purple mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="bg-container-alt rounded-lg p-4 sm:p-6 border border-accent/20 hover:border-accent/40 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="text-cyber-purple">
                  {categoryIcons[category.title] || <Shield size={24} />}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-light">{category.title}</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.4 }}
                    className="text-gray-light/80 text-xs sm:text-sm flex items-start gap-2"
                  >
                    <span className="text-purple-accent font-mono text-xs mt-0.5">•</span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

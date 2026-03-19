"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { professionalProjects, personalProjects } from "@/lib/content";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-light mb-3 sm:mb-4 px-2">
            All <span className="text-cyber-purple">Projects</span>
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-cyber-purple mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-light/80 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            A comprehensive collection of professional and personal projects showcasing automation, security, and software development.
          </p>
        </motion.div>

        {/* Professional Projects */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-light mb-3 sm:mb-4 px-2 sm:px-0">
              Professional <span className="text-cyber-purple">Projects</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-cyber-purple mb-3 sm:mb-4" />
            <p className="text-gray-light/80 max-w-3xl text-sm sm:text-base px-4 sm:px-0">
              Self-initiated tools and automations built to improve security operations, reporting, and team workflows in professional environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {professionalProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Cybersecurity Case Studies */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-light mb-3 sm:mb-4 px-2 sm:px-0">
              Cybersecurity <span className="text-cyber-purple">Case Studies</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-cyber-purple mb-3 sm:mb-4" />
            <p className="text-gray-light/80 max-w-3xl text-sm sm:text-base px-4 sm:px-0">
              Real-world incident investigations and security analysis showcasing OSINT techniques, phishing analysis, and threat intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.a
              href="/case-studies/booking-rental-phishing-osint"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-container-alt rounded-lg p-4 sm:p-6 border border-cyber-purple/20 hover:border-accent/40 transition-colors duration-200 h-full flex flex-col group"
            >
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-light group-hover:text-purple-accent transition-colors">
                    Booking Rental Scam: Phishing &amp; OSINT Takedown
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-red-500/20 text-red-400 border border-red-500/30 self-start sm:self-auto">
                    Real Case
                  </span>
                </div>
                <p className="text-gray-light/80 text-xs sm:text-sm mb-4 leading-relaxed">
                  Investigation of a sophisticated rental scam targeting expatriates in Luxembourg. Documented OSINT techniques, phishing website analysis, domain investigation, and threat actor behavior mapping.
                </p>

                <div className="mb-4">
                  <p className="text-xs text-purple-accent/80 font-mono mb-2">TECHNIQUES:</p>
                  <div className="flex flex-wrap gap-2">
                    {["OSINT", "Phishing Analysis", "Domain Investigation", "Threat Intelligence", "Incident Response"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-cyber-purple/10 text-purple-accent text-xs rounded border border-cyber-purple/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-purple-accent/80 font-mono mb-2">RESULT:</p>
                  <p className="text-gray-light/70 text-sm">
                    Prevented financial loss through early detection, comprehensive threat analysis, and coordinated reporting to INCIBE and law enforcement.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-cyber-purple/10 text-purple-accent group-hover:text-purple-accent/80 transition-colors text-sm">
                <span>Read Case Study</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          </div>
        </motion.section>

        {/* Personal Projects */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-light mb-3 sm:mb-4 px-2 sm:px-0">
              Personal <span className="text-cyber-purple">Projects</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-cyber-purple mb-3 sm:mb-4" />
            <p className="text-gray-light/80 max-w-3xl text-sm sm:text-base px-4 sm:px-0">
              Side projects built to explore new technologies, solve personal problems, and sharpen development skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {personalProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featuredProjects = [
  {
    title: "AD Attack Path Analyzer",
    description:
      "Custom tool for analyzing Active Directory attack paths using BloodHound data. Identifies critical paths to Domain Admin and provides actionable remediation steps.",
    stack: ["Python", "Neo4j", "BloodHound", "GraphQL"],
    result: "Reduced AD assessment time by 40% and identified 15+ critical attack paths.",
    repoUrl: "https://github.com",
  },
  {
    title: "Web App Pentest Framework",
    description:
      "Automated framework for web application penetration testing. Integrates OWASP Top 10 checks, API security testing, and custom exploit modules.",
    stack: ["Python", "Burp Suite API", "OWASP ZAP", "Docker"],
    result: "Discovered 50+ vulnerabilities across multiple client engagements.",
    repoUrl: "https://github.com",
  },
  {
    title: "Custom C2 Framework",
    description:
      "Lightweight Command & Control framework for red team exercises. Features encrypted communication, multiple payload types, and evasion techniques.",
    stack: ["Python", "Crypto", "Socket Programming", "Windows API"],
    result: "Successfully evaded EDR solutions in 8/10 test scenarios.",
    repoUrl: "https://github.com",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-light mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-gray-light/80 max-w-2xl mx-auto">
            A selection of projects showcasing offensive security research, tool development, and
            practical security assessments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent font-semibold rounded-lg transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(0,255,154,0.3)]"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


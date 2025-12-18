"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featuredProjects = [
  {
    title: "Security Automation ToolKit - Minsait Cyber",
    description:
      "Created a custom 'BloodHound' for Databricks using Python and PyVis library. The tool visualizes a network of connections between users, groups, service principals, permissions, catalogs, schemas, tables, and more. Features include route finding to determine if a user can access a specific table, searching for all schemas and tables with group privileges, and comprehensive permission mapping.",
    stack: ["Python", "PyVis", "Databricks API", "Network Visualization", "Security Analysis"],
    result: "Comprehensive security visualization tool for Databricks environments with permission analysis capabilities",
    repoUrl: undefined,
    visibility: "private" as const,
  },
  {
    title: "Databricks IAM Automation - Minsait Cyber",
    description:
      "Developed a Python automation system that reads documentation from Confluence about access and permission configurations for projects. The system processes form-based JSON inputs and automatically applies the correct permissions to Databricks resources, streamlining IAM workflows.",
    stack: ["Python", "Databricks API", "Confluence API", "JSON", "IAM"],
    result: "Automated IAM permission management for Databricks projects based on Confluence documentation",
    repoUrl: undefined,
    visibility: "private" as const,
  },
  {
    title: "HackTheBox WriteUps",
    description:
      "Repository containing my documented Hack The Box machine write-ups. Professional approach, OSCP-oriented, and focused on real-world penetration testing. Contains 30 Easy machines and 3 Medium machines with step-by-step explanations, tool usage, and mitigation strategies.",
    stack: ["Bash", "PowerShell", "Python", "Nmap", "Various Security Tools"],
    result: "33 machines completed (30 Easy, 3 Medium) with comprehensive OSCP-oriented write-ups",
    repoUrl: "https://github.com/Pablogb29/HackTheBox",
    visibility: "public" as const,
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-light mb-4">
            Featured <span className="text-cyber-purple">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-cyber-purple mx-auto mb-8" />
          <p className="text-gray-light/80 max-w-2xl mx-auto text-justify">
            A selection of featured projects showcasing security automation, IAM solutions, and offensive security practice.
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
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-cyber-purple text-purple-accent font-semibold rounded-lg transition-all duration-300 hover:bg-cyber-purple/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.3),0_0_30px_rgba(147,51,234,0.4),0_0_40px_rgba(233,30,99,0.2)]"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


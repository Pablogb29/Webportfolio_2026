"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/content";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-light mb-3 sm:mb-4 px-2">
            Featured <span className="text-cyber-purple">Projects</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-cyber-purple mx-auto mb-6 sm:mb-8" />
          <p className="text-gray-light/80 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            A selection of projects showcasing security automation, IAM solutions, and offensive security practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
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
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-cyber-purple text-purple-accent font-semibold rounded-lg transition-all duration-300 hover:bg-cyber-purple/10 text-sm sm:text-base"
          >
            View All Projects
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

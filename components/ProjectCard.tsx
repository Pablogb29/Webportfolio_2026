"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  result: string;
  repoUrl?: string;
  demoUrl?: string;
  image?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  stack,
  result,
  repoUrl,
  demoUrl,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-container-alt rounded-lg p-6 border border-accent/20 cyber-hover h-full flex flex-col"
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-light mb-3">{title}</h3>
        <p className="text-gray-light/80 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="mb-4">
          <p className="text-xs text-accent/80 font-mono mb-2">STACK:</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-accent/80 font-mono mb-2">RESULT:</p>
          <p className="text-gray-light/70 text-sm">{result}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-accent/10">
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm"
          >
            <Github size={16} />
            <span>Repository</span>
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyber-blue hover:text-cyber-blue/80 transition-colors text-sm"
          >
            <ExternalLink size={16} />
            <span>Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}


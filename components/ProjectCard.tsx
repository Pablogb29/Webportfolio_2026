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
  visibility?: "public" | "private";
  index: number;
}

export default function ProjectCard({
  title,
  description,
  stack,
  result,
  repoUrl,
  demoUrl,
  visibility,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-container-alt rounded-lg p-6 border border-cyber-purple/20 cyber-hover h-full flex flex-col"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl font-semibold text-gray-light">{title}</h3>
          {visibility && (
            <span
              className={`px-2 py-0.5 text-xs font-semibold rounded ${
                visibility === "public"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
              }`}
            >
              {visibility === "public" ? "Public" : "Private"}
            </span>
          )}
        </div>
        <p className="text-gray-light/80 text-sm mb-4 leading-relaxed text-justify">{description}</p>

        <div className="mb-4">
          <p className="text-xs text-purple-accent/80 font-mono mb-2">STACK:</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
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
          <p className="text-gray-light/70 text-sm text-justify">{result}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-cyber-purple/10">
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-purple-accent hover:text-purple-accent/80 transition-colors text-sm"
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
            className="flex items-center gap-2 text-purple-accent hover:text-purple-accent/80 transition-colors text-sm"
          >
            <ExternalLink size={16} />
            <span>Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}


"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import type { MachineSolved } from "@/lib/types/htb";
import ChipsList from "./ChipsList";

interface MachineListItemProps {
  machine: MachineSolved;
  index?: number;
}

const difficultyColors = {
  Easy: "text-green-400 border-green-400/30 bg-green-400/10",
  Medium: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Hard: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  Insane: "text-red-400 border-red-400/30 bg-red-400/10",
  Tutorial: "text-blue-400 border-blue-400/30 bg-blue-400/10",
};

const osColors = {
  Linux: "text-cyan-400",
  Windows: "text-blue-400",
  Other: "text-gray-400",
  FreeBSD: "text-purple-400",
  OpenBSD: "text-purple-300",
};

export default function MachineListItem({ machine, index = 0 }: MachineListItemProps) {
  const difficultyColor = difficultyColors[machine.difficulty] || difficultyColors.Easy;
  const osColor = osColors[machine.os] || osColors.Other;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return dateString;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className="bg-container-alt rounded-lg p-4 border border-accent/20 cyber-hover group relative overflow-hidden"
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        {/* Left Section - Name and Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-light group-hover:text-accent transition-colors">
              {machine.name}
            </h3>
            {/* Difficulty Badge */}
            <span className={`px-2 py-1 text-xs font-semibold rounded border ${difficultyColor}`}>
              {machine.difficulty}
            </span>
            {/* OS */}
            <span className={`text-sm font-mono ${osColor}`}>{machine.os}</span>
          </div>
          {/* Solve Date */}
          {machine.solveDate && (
            <div className="flex items-center gap-1 text-sm text-gray-light/60 mb-2">
              <Calendar size={14} className="text-purple-accent" />
              <span>Solved: {formatDate(machine.solveDate)}</span>
            </div>
          )}
          {/* Attack Paths, Tags, and Skills */}
          {(machine.attackPaths?.length > 0 || machine.tags?.length > 0 || machine.skills?.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Attack Paths */}
              {machine.attackPaths && machine.attackPaths.length > 0 && (
                <>
                  {machine.attackPaths.slice(0, 2).map((path) => (
                    <span
                      key={`path-${path}`}
                      className="px-2 py-1 bg-orange-400/10 text-orange-400 text-xs rounded border border-orange-400/20"
                    >
                      {path}
                    </span>
                  ))}
                  {machine.attackPaths.length > 2 && (
                    <span className="px-2 py-1 text-xs text-gray-light/60">
                      +{machine.attackPaths.length - 2} paths
                    </span>
                  )}
                </>
              )}
              {/* Tags */}
              {machine.tags && machine.tags.length > 0 && (
                <ChipsList
                  id={`machine-${machine.id}:tags`}
                  items={machine.tags}
                  maxVisible={3}
                  chipClassName="px-2 py-1 bg-cyber-purple/10 text-purple-accent text-xs rounded border border-cyber-purple/20"
                  popoverTitle="All Tags"
                  iconColor="text-gray-light/60"
                  popoverPosition="top"
                  popoverAlign="left"
                />
              )}
              {/* Skills */}
              {machine.skills && machine.skills.length > 0 && (
                <ChipsList
                  id={`machine-${machine.id}:skills`}
                  items={machine.skills}
                  maxVisible={2}
                  chipClassName="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded border border-cyan-400/20"
                  popoverTitle="All Skills"
                  iconColor="text-gray-light/60"
                  popoverPosition="top"
                  popoverAlign="left"
                />
              )}
            </div>
          )}
        </div>

        {/* Right Section - Action */}
        <div className="flex items-center gap-4">
          <a
            href={machine.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium group/link whitespace-nowrap"
          >
            <span>View on HTB</span>
            <ExternalLink size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
          </a>
          {machine.hasWriteup && machine.writeupUrl ? (
            <a
              href={machine.writeupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-accent hover:text-purple-accent/80 transition-colors text-sm font-medium group/writeup whitespace-nowrap"
            >
              <span>View Writeup</span>
              <ExternalLink size={16} className="group-hover/writeup:translate-x-0.5 transition-transform" />
            </a>
          ) : (
            <span className="text-sm text-gray-light/60 font-medium whitespace-nowrap">Writeup in progress</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}


"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, Award, Star, Tag } from "lucide-react";
import type { MachineSolved } from "@/lib/types/htb";
import ChipsList from "./ChipsList";

interface MachineCardProps {
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

export default function MachineCard({ machine, index = 0 }: MachineCardProps) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-container-alt rounded-lg p-6 border border-accent/20 cyber-hover group relative overflow-hidden"
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-light mb-2 group-hover:text-accent transition-colors">
              {machine.name}
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Difficulty Badge */}
              <span
                className={`px-2 py-1 text-xs font-semibold rounded border ${difficultyColor}`}
              >
                {machine.difficulty}
              </span>
              {/* OS */}
              <span className={`text-sm font-mono ${osColor}`}>{machine.os}</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-light/80">
          {machine.points > 0 && (
            <div className="flex items-center gap-1">
              <Award size={14} className="text-accent" />
              <span>{machine.points} pts</span>
            </div>
          )}
          {machine.rating && (
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span>{machine.rating.toFixed(1)}</span>
            </div>
          )}
          {machine.solveDate && (
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-purple-accent" />
              <span>{formatDate(machine.solveDate)}</span>
            </div>
          )}
        </div>

        {/* Tags, Attack Paths, and Skills */}
        {(machine.tags?.length > 0 || machine.attackPaths?.length > 0 || machine.skills?.length > 0) && (
          <div className="mb-4">
            {/* Attack Paths */}
            {machine.attackPaths && machine.attackPaths.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-orange-400" />
                  <span className="text-xs text-orange-400/80 font-mono">ATTACK PATHS</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {machine.attackPaths.slice(0, 3).map((path) => (
                    <span
                      key={path}
                      className="px-2 py-1 bg-orange-400/10 text-orange-400 text-xs rounded border border-orange-400/20"
                    >
                      {path}
                    </span>
                  ))}
                  {machine.attackPaths.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-light/60">
                      +{machine.attackPaths.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
            {/* Tags */}
            {machine.tags && machine.tags.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-purple-accent" />
                  <span className="text-xs text-purple-accent/80 font-mono">TAGS</span>
                </div>
                <ChipsList
                  id={`machine-${machine.id}:tags`}
                  items={machine.tags}
                  maxVisible={3}
                  chipClassName="px-2 py-1 bg-cyber-purple/10 text-purple-accent text-xs rounded border border-cyber-purple/20"
                  popoverTitle="All Tags"
                  iconColor="text-gray-light/60"
                  popoverPosition="bottom"
                  popoverAlign="left"
                />
              </div>
            )}
            {/* Skills */}
            {machine.skills && machine.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-cyan-400" />
                  <span className="text-xs text-cyan-400/80 font-mono">SKILLS</span>
                </div>
                <ChipsList
                  id={`machine-${machine.id}:skills`}
                  items={machine.skills}
                  maxVisible={3}
                  chipClassName="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded border border-cyan-400/20"
                  popoverTitle="All Skills"
                  iconColor="text-gray-light/60"
                  popoverPosition="bottom"
                  popoverAlign="left"
                />
              </div>
            )}
          </div>
        )}

        {/* Skill Summary */}
        {machine.skillSummary && (
          <p className="text-sm text-gray-light/70 mb-4 line-clamp-2 text-justify">{machine.skillSummary}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-accent/10">
          <div className="flex items-center gap-4">
            <a
              href={machine.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium group/link"
            >
              <span>View on HTB</span>
              <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
            </a>
            {machine.hasWriteup && machine.writeupUrl ? (
              <a
                href={machine.writeupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-accent hover:text-purple-accent/80 transition-colors text-sm font-medium group/writeup"
              >
                <span>View Writeup</span>
                <ExternalLink size={14} className="group-hover/writeup:translate-x-0.5 transition-transform" />
              </a>
            ) : (
              <span className="text-sm text-gray-light/60 font-medium">Writeup in progress</span>
            )}
          </div>
          {machine.maker && (
            <span className="text-xs text-gray-light/60">by {machine.maker}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}


"use client";

import { motion } from "framer-motion";
import { Terminal, ExternalLink, Shield } from "lucide-react";

interface HTBMachine {
  name: string;
  category: "Windows" | "Linux";
  difficulty: "Easy" | "Medium" | "Hard" | "Insane";
  skills: string[];
  writeupUrl?: string;
  htbUrl?: string;
}

const htbMachines: HTBMachine[] = [
  {
    name: "Lame",
    category: "Linux",
    difficulty: "Easy",
    skills: ["SMB Enumeration", "Metasploit", "Privilege Escalation"],
    writeupUrl: "https://example.com",
    htbUrl: "https://app.hackthebox.com",
  },
  {
    name: "Legacy",
    category: "Windows",
    difficulty: "Easy",
    skills: ["SMB", "MS17-010", "EternalBlue"],
    writeupUrl: "https://example.com",
    htbUrl: "https://app.hackthebox.com",
  },
  {
    name: "Blue",
    category: "Windows",
    difficulty: "Easy",
    skills: ["SMB", "MS17-010", "Privilege Escalation"],
    writeupUrl: "https://example.com",
    htbUrl: "https://app.hackthebox.com",
  },
  {
    name: "Jerry",
    category: "Windows",
    difficulty: "Easy",
    skills: ["Tomcat", "File Upload", "Reverse Shell"],
    writeupUrl: "https://example.com",
    htbUrl: "https://app.hackthebox.com",
  },
  {
    name: "Bastard",
    category: "Windows",
    difficulty: "Medium",
    skills: ["Drupal", "RCE", "Token Impersonation"],
    writeupUrl: "https://example.com",
    htbUrl: "https://app.hackthebox.com",
  },
  {
    name: "Nibbles",
    category: "Linux",
    difficulty: "Easy",
    skills: ["Web Enumeration", "Nibbleblog", "SUID"],
    writeupUrl: "https://example.com",
    htbUrl: "https://app.hackthebox.com",
  },
];

const difficultyColors = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-orange-400",
  Insane: "text-red-400",
};

const categoryIcons = {
  Windows: <Shield size={16} />,
  Linux: <Terminal size={16} />,
};

export default function LabsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-light mb-4">
            HTB <span className="text-accent">Writeups</span>
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-gray-light/80 max-w-2xl mx-auto">
            Detailed writeups of HackTheBox machines I've completed. Each writeup includes
            methodology, tools used, and key learnings.
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-container-alt rounded-lg p-6 border border-accent/20 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{htbMachines.length}</div>
            <div className="text-gray-light/80 text-sm">Machines Solved</div>
          </div>
          <div className="bg-container-alt rounded-lg p-6 border border-accent/20 text-center">
            <div className="text-3xl font-bold text-cyber-blue mb-2">
              {htbMachines.filter((m) => m.category === "Windows").length}
            </div>
            <div className="text-gray-light/80 text-sm">Windows</div>
          </div>
          <div className="bg-container-alt rounded-lg p-6 border border-accent/20 text-center">
            <div className="text-3xl font-bold text-cyber-blue mb-2">
              {htbMachines.filter((m) => m.category === "Linux").length}
            </div>
            <div className="text-gray-light/80 text-sm">Linux</div>
          </div>
          <div className="bg-container-alt rounded-lg p-6 border border-accent/20 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {htbMachines.filter((m) => m.difficulty === "Easy").length}
            </div>
            <div className="text-gray-light/80 text-sm">Easy</div>
          </div>
        </motion.div>

        {/* Machines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {htbMachines.map((machine, index) => (
            <motion.div
              key={machine.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-container-alt rounded-lg p-6 border border-accent/20 cyber-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-light mb-2">{machine.name}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-light/80">
                      {categoryIcons[machine.category]}
                      <span>{machine.category}</span>
                    </div>
                    <span className={`font-semibold ${difficultyColors[machine.difficulty]}`}>
                      {machine.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-accent/80 font-mono mb-2">SKILLS ACQUIRED:</p>
                <div className="flex flex-wrap gap-2">
                  {machine.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-accent/10">
                {machine.writeupUrl && (
                  <a
                    href={machine.writeupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm"
                  >
                    <ExternalLink size={16} />
                    <span>Writeup</span>
                  </a>
                )}
                {machine.htbUrl && (
                  <a
                    href={machine.htbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyber-blue hover:text-cyber-blue/80 transition-colors text-sm"
                  >
                    <ExternalLink size={16} />
                    <span>HTB Profile</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

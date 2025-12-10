"use client";

import { motion } from "framer-motion";
import { Shield, Network, Globe, Code, Bug } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Red Team & Pentesting",
    icon: <Shield size={24} />,
    skills: [
      "Nmap",
      "Burp Suite",
      "Cobalt Strike",
      "Beacon Object Files",
      "Phishing Infrastructure",
      "Metasploit",
      "Empire",
    ],
  },
  {
    title: "Active Directory Attacks",
    icon: <Network size={24} />,
    skills: [
      "Impacket",
      "BloodHound",
      "Kerberoasting",
      "AS-REP Roasting",
      "RBCD (Resource-Based Constrained Delegation)",
      "ACL Abuse",
      "DCSync",
      "Golden Ticket",
    ],
  },
  {
    title: "Web Security",
    icon: <Globe size={24} />,
    skills: [
      "OWASP Top 10",
      "API Security",
      "SSRF",
      "SQL Injection",
      "XXE",
      "Deserialization",
      "JWT Vulnerabilities",
      "IDOR",
    ],
  },
  {
    title: "Exploit Development",
    icon: <Code size={24} />,
    skills: [
      "Buffer Overflow",
      "ROP (Return-Oriented Programming)",
      "Windows Internals",
      "Linux ELF Analysis",
      "Shellcode Development",
      "Fuzzing",
    ],
  },
  {
    title: "Malware / Reverse Engineering",
    icon: <Bug size={24} />,
    skills: [
      "Ghidra",
      "Radare2",
      "IDA Free",
      "Static Analysis",
      "Dynamic Analysis",
      "Malware Analysis",
      "Debugging",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-container/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-light mb-4">
            Skills <span className="text-accent">Matrix</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="bg-container-alt rounded-lg p-6 border border-accent/20 cyber-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-accent">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-light">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.4 }}
                    className="text-gray-light/80 text-sm flex items-center gap-2"
                  >
                    <span className="text-accent font-mono text-xs">•</span>
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


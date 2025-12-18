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
    title: "Offensive Security",
    icon: <Shield size={24} />,
    skills: [
      "Penetration Testing: Burp Suite, OWASP ZAP, Metasploit",
      "Network Reconnaissance: Nmap, Masscan, Gobuster",
      "Active Directory: Impacket, BloodHound, linPEAS, winPEAS",
      "Web Security: SQL Injection, XSS, SSRF, IDOR",
      "Post-Exploitation: psexec.py, enum4linux, ldapsearch",
      "Active CTF Player & Student",
      "Forensic Analysis & Log Analysis with Autopsy",
    ],
  },
  {
    title: "Security Engineering & IAM",
    icon: <Network size={24} />,
    skills: [
      "Identity and Access Management (IAM)",
      "Azure Databricks Security & IAM Automation",
      "Active Directory Security & Administration",
      "Compliance: GDPR, ISO 27001, ENS Framework",
      "Centralized Data Governance Platforms",
      "Security Policy Implementation & Auditing",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: <Globe size={24} />,
    skills: [
      "Azure Databricks & Azure Cloud Services",
      "AWS Cloud Platform",
      "Active Directory & Windows Server",
      "Network Security & Firewall Management",
      "Deployment: Vercel, Railway, GitHub Actions",
      "Linux & Windows Administration",
    ],
  },
  {
    title: "Programming & Automation",
    icon: <Code size={24} />,
    skills: [
      "Languages: Python, Bash, PowerShell, SQL",
      "Web Development: JavaScript, TypeScript, HTML, CSS, PHP",
      "Engineering: MATLAB, Simulink, LabVIEW",
      "Mobile Testing: Appium, Selenium, XCode",
      "Infrastructure Automation: Databricks, Jira, Confluence",
      "System Automation: Task Schedulers, Privilege Management",
      "IDEs: VS Code, Cursor",
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: <Bug size={24} />,
    skills: [
      "Prompt Engineering & LLM Integration",
      "Neural Networks & Deep Learning",
      "Machine Learning Models & Algorithms",
      "Workflow Automation: n8n, Make",
      "ChatBot Development & AI Image Generation",
      "Data Analysis & Visualization",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-light mb-4">
            Skills <span className="text-cyber-purple">Matrix</span>
          </h2>
          <div className="w-24 h-1 bg-cyber-purple mx-auto" />
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
                <div className="text-cyber-purple">{category.icon}</div>
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
                    <span className="text-purple-accent font-mono text-xs">•</span>
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


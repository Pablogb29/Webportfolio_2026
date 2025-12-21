"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

// Professional Projects
const professionalProjects = [
  {
    title: "QA Mobile Automation - Bertrandt",
    description:
      "Created a comprehensive automation environment for iOS and Android applications (MyCupra and MySeat) using Python, XCode, Selenium, Appium, and Android Studio. The automation measures average user time for critical actions such as starting air conditioning or battery charging when the car is connected. Metrics are captured from the moment the action is initiated on the mobile screen until the notification appears, providing valuable performance data to developers for code optimization and API call improvements.",
    stack: ["Python", "XCode", "Selenium", "Appium", "Android Studio", "iOS", "Android", "Performance Testing"],
    result: "Automated performance measurement system that identified optimization opportunities, addressing user complaints about app speed in Play Store and App Store reviews",
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
    title: "Security Automation ToolKit - Minsait Cyber",
    description:
      "Created a custom 'BloodHound' for Databricks using Python and PyVis library. The tool visualizes a network of connections between users, groups, service principals, permissions, catalogs, schemas, tables, and more. Features include route finding to determine if a user can access a specific table, searching for all schemas and tables with group privileges, and comprehensive permission mapping.",
    stack: ["Python", "PyVis", "Databricks API", "Network Visualization", "Security Analysis"],
    result: "Comprehensive security visualization tool for Databricks environments with permission analysis capabilities",
    repoUrl: undefined,
    visibility: "private" as const,
  },
  {
    title: "JIRA-PowerBI Reporting Automation",
    description:
      "Created an automated reporting system that runs on an hourly schedule, fetching data from JIRA via API using various filters (projects, tasks, issues, change requests, etc.). The script structures and saves this information into PowerBI dashboards featuring interactive filters, heat maps, latest testing plans with their status, upcoming versions and features, and comprehensive project metrics. This automation eliminates manual reporting efforts and provides real-time insights for project management.",
    stack: ["Python", "JIRA API", "PowerBI", "Automation", "Data Visualization", "Scheduled Tasks"],
    result: "Automated weekly and monthly reporting system that provides real-time project insights and eliminates manual reporting overhead",
    repoUrl: undefined,
    visibility: "private" as const,
  },
];

// Personal Projects
const personalProjects = [
  {
    title: "Web Portfolio 2024",
    description:
      "My first web portfolio, designed with a very simple and minimalist approach. This was my initial foray into web development and portfolio creation.",
    stack: ["HTML", "CSS", "JavaScript"],
    result: "Simple and minimalist portfolio website",
    repoUrl: "https://github.com/Pablogb29/Webportfolio_2024",
    visibility: "public" as const,
  },
  {
    title: "Web Portfolio 2026",
    description:
      "The current web portfolio, featuring improved transitions, modern design, and API integrations. This version represents a significant evolution in design and functionality, showcasing technical skills and professional experience.",
    stack: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    result: "Modern, responsive portfolio website with enhanced animations and API integrations",
    repoUrl: "https://github.com/Pablogb29/webportfolio_2026",
    visibility: "public" as const,
  },
  {
    title: "TradeAlert Bot",
    description:
      "Bot connected to different brokers that compares prices of various assets and sends alerts to a Telegram chat. The bot analyzes technical indicators including morning stars, EMA breakouts, RSI, and breakout patterns to provide real-time trading signals.",
    stack: ["Python", "Telegram API", "Trading APIs", "Technical Analysis"],
    result: "Real-time trading pattern detection and alert system via Telegram",
    repoUrl: undefined,
    visibility: "private" as const,
  },
  {
    title: "Python Automation Training",
    description:
      "Training challenges for Python and Pytest automations. Basic exercises designed to introduce juniors into automation with Python. These are fundamental examples that are very useful for starting in the automation world and understanding how automation generally works.",
    stack: ["Python", "Pytest", "Automation", "Testing"],
    result: "Educational repository with Python and Pytest automation training challenges for beginners",
    repoUrl: "https://github.com/Pablogb29/QA_Automation_Training",
    visibility: "public" as const,
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
  {
    title: "QuickTrack",
    description:
      "My own personal finance app where I keep track of all my income, expenses, investments, and debts. The application is designed for Android, programmed with Dart, and hosted on Railway.",
    stack: ["Dart", "Flutter", "Android", "Railway"],
    result: "Personal finance tracking application for Android",
    repoUrl: undefined,
    visibility: "private" as const,
  },
  {
    title: "Hitster",
    description:
      "A digitalization of the table game 'Hitster' where users must guess the name, year, and singer of a song by only listening. It's a multiplatform game (PC and phones) with a full-stack architecture featuring a Python backend and TypeScript frontend, hosted on Railway and connected to the Spotify API.",
    stack: ["TypeScript", "Python", "Spotify API", "Railway", "React", "FastAPI", "Game Development"],
    result: "Multiplatform music guessing game with Spotify integration and full-stack architecture",
    repoUrl: "https://github.com/Pablogb29/hitster",
    visibility: "public" as const,
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-light mb-4">
            All <span className="text-cyber-purple">Projects</span>
          </h1>
          <div className="w-24 h-1 bg-cyber-purple mx-auto mb-4" />
          <p className="text-gray-light/80 max-w-2xl mx-auto text-justify">
            A comprehensive collection of professional and personal projects showcasing automation, security, and software development skills.
          </p>
        </motion.div>

        {/* Professional Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-light mb-4">
              Professional <span className="text-cyber-purple">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-cyber-purple mb-4" />
            <p className="text-gray-light/80 max-w-3xl text-justify">
              Professional projects are projects that I made to improve my job. I was not obligated to do them, I did them by myself to improve my job and my team&apos;s work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Cybersecurity Case Studies Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-20"
        >
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-light mb-4">
              Cybersecurity <span className="text-cyber-purple">Case Studies</span>
            </h2>
            <div className="w-20 h-1 bg-cyber-purple mb-4" />
            <p className="text-gray-light/80 max-w-3xl text-justify">
              Real-world incident investigations and security analysis showcasing OSINT techniques, phishing analysis, and threat intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-container-alt rounded-lg p-6 border border-cyber-purple/20 cyber-hover h-full flex flex-col group cursor-pointer"
              onClick={() => window.location.href = "/case-studies/booking-rental-phishing-osint"}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-gray-light group-hover:text-purple-accent transition-colors">
                    Booking Rental Scam: Phishing & OSINT Takedown
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    Real Case
                  </span>
                </div>
                <p className="text-gray-light/80 text-sm mb-4 leading-relaxed text-justify">
                  Investigation of a sophisticated rental scam targeting expatriates in Luxembourg. Documented OSINT techniques, phishing website analysis, domain investigation, and threat actor behavior mapping. Prevented financial loss through systematic analysis and reporting.
                </p>

                <div className="mb-4">
                  <p className="text-xs text-purple-accent/80 font-mono mb-2">TECHNIQUES:</p>
                  <div className="flex flex-wrap gap-2">
                    {["OSINT", "Phishing Analysis", "Domain Investigation", "Threat Intelligence", "Incident Response"].map((tech) => (
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
                  <p className="text-gray-light/70 text-sm text-justify">
                    Prevented financial loss through early detection, comprehensive threat analysis, and coordinated reporting to INCIBE and law enforcement.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-cyber-purple/10 text-purple-accent group-hover:text-purple-accent/80 transition-colors text-sm">
                <span>Read Case Study</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Personal Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-light mb-4">
              Personal <span className="text-cyber-purple">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-cyber-purple mb-4" />
            <p className="text-gray-light/80 max-w-3xl text-justify">
              Personal projects have been made to test my knowledge and create my own apps to improve my life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Cybersecurity Analyst",
    company: "Indra",
    location: "Barcelona, Spain",
    period: "10/2025 - Current",
    bullets: [
      "Managing user lifecycle and access control (account provisioning, deprovisioning and permissions governance) across critical systems",
      "Developing Python/SQL automations using the Databricks SCIM API for programmatic role and group assignments",
      "Automating access documentation into Confluence and designing a Neo4j + PyVis graph model to visualize and analyze permission relationships",
      "Ensuring compliance with ENS, ISO 27001 and GDPR through stakeholder reviews and least-privilege validation",
      "Daily use of Azure IAM, participation in AWS onboarding, and creation of internal scripts in Python, PowerShell and Bash to streamline security operations",
    ],
    skills: ["Azure IAM", "Databricks SCIM API", "Neo4j + PyVis", "ENS", "ISO 27001", "GDPR", "Python", "SQL", "PowerShell", "Bash"],
  },
  {
    title: "Quality Assurance Coordinator",
    company: "Bertrandt S.A.",
    location: "Castellví de Rosanes, Spain",
    period: "01/2025 - 10/2025",
    bullets: [
      "Leading the QA team in mobile and architecture car validation for SEAT & CUPRA applications, while balancing technical and managerial responsibilities",
      "Coordinating daily activities and distributing tasks among team members",
      "Acting as a point of contact for client communication and feedback loops",
      "Delivering weekly and monthly project tracking reports and presentations",
      "Continued executing technical validations alongside organizational duties",
    ],
    skills: ["Team Leadership", "Project Management", "Client Communication", "Technical Validation"],
  },
  {
    title: "Quality Assurance Engineer",
    company: "Bertrandt S.A.",
    location: "Castellví de Rosanes, Spain",
    period: "08/2023 - 12/2024",
    bullets: [
      "Performed comprehensive validation and testing for automotive applications and vehicle architecture for SEAT & CUPRA brands",
      "Mobile app validator for SEAT & CUPRA brands",
      "Vehicle architecture validator for SEAT & CUPRA",
      "Creation of Test Plans and Test Cases",
      "Log reading for applications, back-end, and vehicles",
      "Use of tools such as Wireshark, dataloggers, Datadog, Kibana, Figma, Zeplin, and Jira, among others",
      "Automation of mobile applications with XCode, Python, Appium and Selenium",
    ],
    skills: ["Quality Assurance", "Test Automation", "Log Analysis", "Python", "Appium", "Selenium", "Wireshark", "Figma", "Zeplin", "Jira"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-light mb-3 sm:mb-4 px-2">
            Work <span className="text-cyber-purple">Experience</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-cyber-purple mx-auto" />
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-container-alt rounded-lg p-4 sm:p-6 md:p-8 border border-accent/20 cyber-hover"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Briefcase size={18} className="text-cyber-purple w-[18px] h-[18px] sm:w-5 sm:h-5" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-light">{exp.title}</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-gray-light/80 text-xs sm:text-sm md:text-base">
                    <span className="font-medium text-purple-accent">{exp.company}</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {exp.bullets.map((bullet, bulletIndex) => (
                  <motion.li
                    key={bulletIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + bulletIndex * 0.1, duration: 0.4 }}
                    className="flex items-start gap-2 sm:gap-3 text-gray-light/90 text-sm sm:text-base"
                  >
                    <span className="text-purple-accent font-mono mt-1">▸</span>
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="pt-4 border-t border-cyber-purple/10">
                <p className="text-xs text-purple-accent/80 font-mono mb-2">KEY SKILLS:</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-cyber-purple/10 text-purple-accent text-xs rounded border border-cyber-purple/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


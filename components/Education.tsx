"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen, FileText, ArrowRight, CheckCircle2, Shield, Target, Info } from "lucide-react";
import { useState, useEffect } from "react";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  eqfLevel: string;
  status?: string;
  thesis?: string;
  thesisPdf?: string;
  keySubjects: string[];
}

const education: EducationItem[] = [
  {
    degree: "Master`s in Artificial Intelligence",
    institution: "Racks Academy IUNIT - Centro Universitario",
    location: "Remote, Spain",
    period: "10/2024 - 12/2025",
    eqfLevel: "EQF level 7",
    thesis: "Design and Implementation of an AI-Based Automated System for Job Offer Management and Prioritization",
    thesisPdf: "/thesis/ai-thesis.pdf",
    keySubjects: [
      "Development of LLMs to analyse responses from cybersecurity tools to ensure a short path to finding vulnerabilities",
      "Machine Learning, Deep Learning and LLM-based systems applied to automation and data analysis",
      "Development of AI-driven SaaS tools and workflow optimization solutions",
      "Integration of AI models to support intelligent decision-making across different industries",
    ],
  },
  {
    degree: "Master's in Cybersecurity",
    institution: "Deloitte - IMF Smart Education",
    location: "Remote, Spain",
    period: "03/2024 - 04/2025",
    eqfLevel: "EQF level 7",
    thesis: "Building and Breaking an Active Directory Environment",
    thesisPdf: "/thesis/cybersecurity-thesis.pdf",
    keySubjects: [
      "Ethical hacking, technical security audits and malware analysis",
      "Digital forensics and security incident management",
      "Secure development practices and penetration testing of systems and networks",
      "SIEM monitoring, event correlation and attack mitigation",
      "Security frameworks: ENS, ISO 27001, GDPR",
    ],
  },
  {
    degree: "Bachelor's degree in Electronic Telecommunications Engineering",
    institution: "Universidad Autónoma de Barcelona",
    location: "Cerdanyola del Vallès, Spain",
    period: "09/2019 - 02/2024",
    eqfLevel: "EQF level 6",
    thesis: "Neuronal Network for Random Number Generation",
    thesisPdf: "/thesis/telecommunication-thesis.pdf",
    keySubjects: [
      "Electronics, telecommunications, networking and digital systems",
      "Design, implementation and validation of technical engineering projects",
      "Technical analysis, measurement, calculation and report writing",
      "Problem-solving, applied programming and multidisciplinary teamwork",
    ],
  },
];

interface Certification {
  name: string;
  fullName: string;
  status: string;
  issuer: string;
  description: string;
  goal: "current" | "next" | "final";
  icon: "htb" | "oscp";
}

const certifications: Certification[] = [
  {
    name: "CJCA",
    fullName: "Certified Junior Cybersecurity Analyst",
    status: "In Progress",
    issuer: "Hack The Box",
    description: "Foundation certification validating core cybersecurity analysis skills and practical knowledge.",
    goal: "current",
    icon: "htb",
  },
  {
    name: "CPTS",
    fullName: "Certified Penetration Testing Specialist",
    status: "Planned for 2026",
    issuer: "Hack The Box",
    description: "Advanced pentesting certification focused on real-world attack paths and comprehensive security assessments.",
    goal: "next",
    icon: "htb",
  },
  {
    name: "OSCP",
    fullName: "Offensive Security Certified Professional",
    status: "Planned for 2026",
    issuer: "Offensive Security",
    description: "Industry-leading penetration testing certification emphasizing hands-on exploitation and reporting skills.",
    goal: "final",
    icon: "oscp",
  },
];

// Certification Icon Component
function CertificationIcon({ type, className }: { type: "htb" | "oscp"; className?: string }) {
  if (type === "htb") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 8h8M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return <Shield className={className} size={24} />;
}

// Certification Card Component with Hover Tooltip
function CertificationCard({ cert, index, total }: { cert: Certification; index: number; total: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const isActive = cert.status === "In Progress";
  const isCompleted = cert.status?.includes("Completed") || cert.status?.includes("Obtained");
  const isPlanned = cert.status?.includes("Planned");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const goalLabels = {
    current: "Current Goal",
    next: "Next Goal",
    final: "Final Goal",
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 flex-1 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.5 + index * 0.15,
          duration: shouldReduceMotion ? 0.3 : 0.5,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`group relative w-full md:w-auto ${
          isActive ? "md:scale-105" : ""
        } transition-transform duration-300`}
        tabIndex={0}
        role="button"
        aria-label={`${cert.name} certification - ${cert.status}`}
      >
        {/* Certification Card */}
        <div
          className={`relative p-6 bg-container rounded-xl border-2 transition-all duration-300 ${
            isActive
              ? "border-accent shadow-[0_0_30px_rgba(0,217,255,0.4)]"
              : isCompleted
              ? "border-green-500/50"
              : "border-cyber-purple/30"
          } ${isHovered ? "border-opacity-80 shadow-lg" : ""}`}
        >
          {/* Pulsing glow for active cert */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0,217,255,0.3)",
                  "0 0 30px rgba(0,217,255,0.5)",
                  "0 0 20px rgba(0,217,255,0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Status Indicator */}
          <div className="absolute -top-3 -right-3 z-10">
            {isCompleted ? (
              <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-background shadow-lg">
                <CheckCircle2 className="text-background" size={16} />
              </div>
            ) : isActive ? (
              <motion.div
                className="w-7 h-7 bg-accent rounded-full flex items-center justify-center border-2 border-background shadow-lg"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-2.5 h-2.5 bg-background rounded-full" />
              </motion.div>
            ) : (
              <div className="w-7 h-7 bg-cyber-purple/40 rounded-full border-2 border-background" />
            )}
          </div>

          {/* Icon */}
          <div className="flex items-center justify-center mb-4">
            <motion.div
              className={`${
                isActive ? "text-accent" : isPlanned ? "text-cyber-purple/60" : "text-gray-light/40"
              } transition-colors duration-300`}
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
            >
              <CertificationIcon
                type={cert.icon}
                className={`w-12 h-12 ${isHovered && !shouldReduceMotion ? "drop-shadow-[0_0_8px_currentColor]" : ""}`}
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="text-center space-y-2">
            {/* Certification Name */}
            <h4
              className={`text-xl font-bold mb-1 ${
                isActive ? "text-accent" : isCompleted ? "text-green-400" : "text-gray-light"
              }`}
            >
              {cert.name}
            </h4>

            {/* Full Name */}
            <p className="text-xs text-gray-light/50 font-mono mb-2">{cert.fullName}</p>

            {/* Provider */}
            <p className="text-sm text-gray-light/70 font-medium">{cert.issuer}</p>

            {/* Goal Badge */}
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {cert.goal === "current" && <Target className="text-accent" size={12} />}
              {cert.goal === "next" && <ArrowRight className="text-purple-accent" size={12} />}
              {cert.goal === "final" && <Award className="text-cyber-purple" size={12} />}
              <span
                className={`text-xs font-semibold ${
                  cert.goal === "current"
                    ? "text-accent"
                    : cert.goal === "next"
                    ? "text-purple-accent"
                    : "text-cyber-purple"
                }`}
              >
                {goalLabels[cert.goal]}
              </span>
            </div>

            {/* Status Badge */}
            <span
              className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                isActive
                  ? "bg-accent/10 text-accent border-accent/40"
                  : isCompleted
                  ? "bg-green-500/10 text-green-400 border-green-500/40"
                  : "bg-cyber-purple/10 text-purple-accent border-cyber-purple/30"
              }`}
            >
              {cert.status}
            </span>

            {/* Progress Bar for Active Cert */}
            {isActive && (
              <div className="mt-3 pt-3 border-t border-cyber-purple/10">
                <div className="flex items-center justify-between text-xs text-gray-light/60 mb-1.5">
                  <span>Progress</span>
                  <span className="font-semibold text-accent">In Progress</span>
                </div>
                <div className="h-1.5 bg-cyber-purple/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent to-cyber-purple"
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: shouldReduceMotion ? 0.3 : 1.5,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hover Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className={`absolute ${
            index === total - 1
              ? "md:right-0 right-0"
              : index === 0
              ? "md:left-0 left-0"
              : "md:left-1/2 md:-translate-x-1/2 left-0"
          } top-full mt-4 w-64 max-w-[calc(100vw-2rem)] p-4 bg-container border border-accent/30 rounded-lg shadow-xl z-20 pointer-events-none ${
            isHovered ? "block" : "hidden"
          }`}
        >
          <div className="flex items-start gap-2">
            <Info className="text-accent mt-0.5 flex-shrink-0" size={16} />
            <p className="text-sm text-gray-light/90 leading-relaxed text-justify">{cert.description}</p>
          </div>
          <div className="absolute -top-2 md:left-1/2 md:-translate-x-1/2 left-6 w-4 h-4 bg-container border-l border-t border-accent/30 transform rotate-45" />
        </motion.div>
      </motion.div>

      {/* Arrow Connector */}
      {index < total - 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.7 + index * 0.15,
            duration: shouldReduceMotion ? 0.3 : 0.4,
          }}
          className="hidden md:flex items-center justify-center text-cyber-purple/40 flex-shrink-0"
        >
          <ArrowRight size={28} />
        </motion.div>
      )}
    </div>
  );
}

// Main Certification Path Component
function CertificationPath({ certifications }: { certifications: Certification[] }) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const activeIndex = certifications.findIndex((c) => c.status === "In Progress");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: 0.6 }}
      className="bg-container-alt rounded-lg p-6 md:p-8 border border-accent/20"
    >
      <div className="flex items-center gap-3 mb-8">
        <Award className="text-cyber-purple" size={24} />
        <h3 className="text-2xl font-semibold text-gray-light">Certification Path</h3>
      </div>

      {/* Path Container */}
      <div className="relative">
        {/* Enhanced Timeline */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 z-0">
          {/* Background line (muted for future) */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-cyber-purple/10 to-cyber-purple/10 rounded-full" />
          
          {/* Progress line (glowing up to current cert) */}
          {activeIndex >= 0 && (
            <motion.div
              className="absolute left-0 h-full bg-gradient-to-r from-accent via-cyber-purple to-transparent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${((activeIndex + 1) / certifications.length) * 100}%` }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 1.5,
                ease: "easeOut",
              }}
              style={{
                boxShadow: "0 0 10px rgba(0,217,255,0.5), 0 0 20px rgba(147,51,234,0.3)",
              }}
            />
          )}

          {/* Animated flow effect */}
          {activeIndex >= 0 && !shouldReduceMotion && (
            <motion.div
              className="absolute h-full w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full"
              animate={{
                x: [
                  0,
                  `${((activeIndex + 1) / certifications.length) * 100}%`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `-${80}px`,
              }}
            />
          )}

          {/* Dashed line for future */}
          {activeIndex < certifications.length - 1 && (
            <div
              className="absolute h-full border-t-2 border-dashed border-cyber-purple/20"
              style={{
                left: `${((activeIndex + 1) / certifications.length) * 100}%`,
                right: 0,
              }}
            />
          )}
        </div>

        {/* Certifications Path */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 relative z-10">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.name} cert={cert} index={index} total={certifications.length} />
          ))}
        </div>
      </div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: 0.5 }}
        className="text-center text-sm text-gray-light/60 mt-8 italic"
      >
        Long-term certification roadmap aligned with offensive security career goals.
      </motion.p>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-light mb-4">
            Education & <span className="text-cyber-purple">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-cyber-purple mx-auto" />
        </motion.div>

        {/* Education */}
        <div className="space-y-8 mb-12">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-container-alt rounded-lg p-6 md:p-8 border border-accent/20 cyber-hover"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="text-cyber-purple" size={20} />
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-light">{edu.degree}</h3>
                    {edu.status && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                        {edu.status}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-gray-light/80 text-sm md:text-base mb-2">
                    <span className="font-medium text-purple-accent">{edu.institution}</span>
                    <span>{edu.location}</span>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{edu.period}</span>
                    </div>
                    <span className="text-xs text-gray-light/60">{edu.eqfLevel}</span>
                  </div>
                  {edu.thesis && (
                    <div className="mt-3 flex items-start gap-2">
                      <BookOpen className="text-cyber-purple mt-0.5" size={16} />
                      <div className="flex-1">
                        <p className="text-xs text-purple-accent/80 font-mono mb-1">THESIS:</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-sm text-gray-light/90 italic text-justify">"{edu.thesis}"</p>
                          {edu.thesisPdf && (
                            <a
                              href={edu.thesisPdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-accent border border-accent/30 rounded hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
                            >
                              <FileText size={14} />
                              Open Thesis
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-cyber-purple/10">
                <p className="text-xs text-purple-accent/80 font-mono mb-3">KEY SUBJECTS & SKILLS:</p>
                <ul className="space-y-2">
                  {edu.keySubjects.map((subject, subjectIndex) => (
                    <motion.li
                      key={subjectIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + subjectIndex * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3 text-gray-light/90 text-sm"
                    >
                      <span className="text-purple-accent font-mono mt-1">•</span>
                      <span>{subject}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Path */}
        <CertificationPath certifications={certifications} />
      </div>
    </section>
  );
}


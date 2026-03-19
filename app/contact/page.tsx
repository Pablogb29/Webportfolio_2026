"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const socialLinks = [
  {
    name: "Email",
    url: "mailto:pabloinfosec@gmail.com",
    label: "pabloinfosec@gmail.com",
    icon: <Mail size={24} />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/pabloinfosec",
    label: "linkedin.com/in/pabloinfosec",
    icon: <Linkedin size={24} />,
  },
  {
    name: "GitHub",
    url: "https://github.com/Pablogb29",
    label: "github.com/Pablogb29",
    icon: <Github size={24} />,
  },
  {
    name: "Hack The Box",
    url: "https://app.hackthebox.com/users/1583498",
    label: "Hack The Box Profile",
    icon: <ExternalLink size={24} />,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-light mb-3 sm:mb-4 px-2">
            Get In <span className="text-cyber-purple">Touch</span>
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-cyber-purple mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-light/80 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Interested in collaboration, job opportunities, or discussing cybersecurity? Reach out directly through any of these channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-container-alt rounded-lg p-6 sm:p-8 border border-accent/20"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-light mb-4 sm:mb-6">Connect</h2>
            <div className="space-y-3 sm:space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-container rounded-lg border border-accent/20 hover:border-accent/40 transition-colors duration-200 text-gray-light hover:text-accent"
                >
                  {link.icon}
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm sm:text-base block">{link.name}</span>
                    <span className="text-xs text-gray-light/60 truncate block">{link.label}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="bg-container-alt rounded-lg p-6 sm:p-8 border border-accent/20">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-light mb-4 sm:mb-6">Availability</h2>
              <p className="text-gray-light/80 text-sm leading-relaxed mb-4">
                Currently open to opportunities in:
              </p>
              <ul className="space-y-2.5 text-sm text-gray-light/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-mono mt-0.5">▸</span>
                  <span><span className="text-purple-accent font-semibold">Pentester / Red Team</span> (Primary Goal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-mono mt-0.5">▸</span>
                  <span>Junior/Associate Penetration Tester Positions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-mono mt-0.5">▸</span>
                  <span>Security Engineering / IAM Roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-mono mt-0.5">▸</span>
                  <span>EU-level cybersecurity roles (CERT-EU, ENISA)</span>
                </li>
              </ul>
            </div>

            <div className="bg-container-alt rounded-lg p-6 sm:p-8 border border-accent/20">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-light mb-3 sm:mb-4">Location</h3>
              <p className="text-gray-light/80 text-sm leading-relaxed">
                Based in Brussels, Belgium. Working remotely for Indra | Minsait Cyber (Barcelona). Open to remote, hybrid, or relocation within the EU.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

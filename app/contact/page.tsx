"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: <Github size={24} />,
      color: "text-gray-light hover:text-accent",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: <Linkedin size={24} />,
      color: "text-gray-light hover:text-cyber-blue",
    },
    {
      name: "HackTheBox",
      url: "https://app.hackthebox.com",
      icon: <ExternalLink size={24} />,
      color: "text-gray-light hover:text-accent",
    },
    {
      name: "Email",
      url: "mailto:contact@example.com",
      icon: <Mail size={24} />,
      color: "text-gray-light hover:text-accent",
    },
  ];

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-light mb-4">
            Get In <span className="text-accent">Touch</span>
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-gray-light/80 max-w-2xl mx-auto">
            Interested in collaboration, job opportunities, or just want to discuss offensive
            security? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-container-alt rounded-lg p-8 border border-accent/20"
          >
            <h2 className="text-2xl font-semibold text-gray-light mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-light mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-container border border-accent/20 rounded-lg text-gray-light placeholder-gray-light/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-light mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-container border border-accent/20 rounded-lg text-gray-light placeholder-gray-light/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-container border border-accent/20 rounded-lg text-gray-light placeholder-gray-light/50 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-accent text-background font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,154,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-container-alt rounded-lg p-8 border border-accent/20">
              <h2 className="text-2xl font-semibold text-gray-light mb-6">Connect</h2>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={`flex items-center gap-4 p-4 bg-container rounded-lg border border-accent/20 cyber-hover transition-all duration-300 ${link.color}`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-container-alt rounded-lg p-8 border border-accent/20">
              <h3 className="text-xl font-semibold text-gray-light mb-4">Availability</h3>
              <p className="text-gray-light/80 text-sm leading-relaxed mb-4">
                Currently open to opportunities in:
              </p>
              <ul className="space-y-2 text-sm text-gray-light/80">
                <li className="flex items-center gap-2">
                  <span className="text-accent font-mono">▸</span>
                  <span>Pentester Roles</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent font-mono">▸</span>
                  <span>Red Team Operator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent font-mono">▸</span>
                  <span>Security Consultant</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}


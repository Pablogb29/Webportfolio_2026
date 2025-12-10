"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  url?: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Advanced Active Directory Attack Paths",
    excerpt:
      "Deep dive into complex AD attack paths using BloodHound, exploring Kerberoasting, AS-REP Roasting, and ACL abuse techniques.",
    category: "AD Exploitation",
    date: "2024-01-15",
    readTime: "10 min read",
    url: "https://example.com",
  },
  {
    title: "Exploiting SSRF in Modern Web Applications",
    excerpt:
      "Understanding Server-Side Request Forgery vulnerabilities, bypass techniques, and real-world exploitation scenarios.",
    category: "Web Security",
    date: "2024-01-10",
    readTime: "8 min read",
    url: "https://example.com",
  },
  {
    title: "Automating Red Team Operations with Python",
    excerpt:
      "Building custom automation tools for red team exercises, including C2 communication, payload generation, and post-exploitation.",
    category: "Offensive Automation",
    date: "2024-01-05",
    readTime: "12 min read",
    url: "https://example.com",
  },
  {
    title: "AI-Powered Vulnerability Detection",
    excerpt:
      "Exploring the intersection of AI and cybersecurity: using machine learning for vulnerability discovery and exploit generation.",
    category: "AI + Cybersecurity",
    date: "2023-12-20",
    readTime: "15 min read",
    url: "https://example.com",
  },
  {
    title: "Buffer Overflow Exploitation on Modern Systems",
    excerpt:
      "Techniques for exploiting buffer overflows in modern environments, including ROP chains and bypassing modern protections.",
    category: "Exploit Development",
    date: "2023-12-15",
    readTime: "14 min read",
    url: "https://example.com",
  },
  {
    title: "API Security Testing Methodology",
    excerpt:
      "Comprehensive guide to API security testing, covering authentication bypass, authorization flaws, and data exposure.",
    category: "Web Security",
    date: "2023-12-10",
    readTime: "9 min read",
    url: "https://example.com",
  },
];

const categoryColors: Record<string, string> = {
  "AD Exploitation": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Web Security": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Offensive Automation": "bg-green-500/20 text-green-300 border-green-500/30",
  "AI + Cybersecurity": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Exploit Development": "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function BlogPage() {
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
            Research & <span className="text-accent">Blog</span>
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-gray-light/80 max-w-2xl mx-auto">
            Technical articles and research on offensive security, exploit development, and
            cybersecurity trends.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-container-alt rounded-lg p-6 border border-accent/20 cyber-hover flex flex-col h-full"
            >
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded border ${categoryColors[post.category]}`}
                >
                  {post.category}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-light mb-3">{post.title}</h2>
              <p className="text-gray-light/80 text-sm mb-4 flex-1 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-light/60 mb-4 pt-4 border-t border-accent/10">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                >
                  Read Article
                  <ExternalLink size={16} />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}

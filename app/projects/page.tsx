import ProjectCard from "@/components/ProjectCard";

const allProjects = [
  {
    title: "AD Attack Path Analyzer",
    description:
      "Custom tool for analyzing Active Directory attack paths using BloodHound data. Identifies critical paths to Domain Admin and provides actionable remediation steps.",
    stack: ["Python", "Neo4j", "BloodHound", "GraphQL"],
    result: "Reduced AD assessment time by 40% and identified 15+ critical attack paths.",
    repoUrl: "https://github.com",
  },
  {
    title: "Web App Pentest Framework",
    description:
      "Automated framework for web application penetration testing. Integrates OWASP Top 10 checks, API security testing, and custom exploit modules.",
    stack: ["Python", "Burp Suite API", "OWASP ZAP", "Docker"],
    result: "Discovered 50+ vulnerabilities across multiple client engagements.",
    repoUrl: "https://github.com",
  },
  {
    title: "Custom C2 Framework",
    description:
      "Lightweight Command & Control framework for red team exercises. Features encrypted communication, multiple payload types, and evasion techniques.",
    stack: ["Python", "Crypto", "Socket Programming", "Windows API"],
    result: "Successfully evaded EDR solutions in 8/10 test scenarios.",
    repoUrl: "https://github.com",
  },
  {
    title: "Exploit Development Lab",
    description:
      "Collection of buffer overflow exploits and ROP chains for Windows and Linux. Includes custom shellcode and bypass techniques for modern protections.",
    stack: ["C", "Assembly", "GDB", "WinDbg"],
    result: "Developed 20+ working exploits for various vulnerable applications.",
    repoUrl: "https://github.com",
  },
  {
    title: "Phishing Infrastructure",
    description:
      "Automated phishing infrastructure setup with email templates, domain spoofing, and credential harvesting. Includes post-exploitation modules.",
    stack: ["Python", "Flask", "SMTP", "DNS"],
    result: "Achieved 85% click rate in authorized red team exercises.",
    repoUrl: "https://github.com",
  },
  {
    title: "Malware Analysis Toolkit",
    description:
      "Automated malware analysis pipeline using static and dynamic analysis. Integrates Ghidra, YARA rules, and sandbox environments.",
    stack: ["Python", "Ghidra", "YARA", "Cuckoo Sandbox"],
    result: "Analyzed 100+ malware samples and identified key IOCs.",
    repoUrl: "https://github.com",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-light mb-4">
            All <span className="text-accent">Projects</span>
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-gray-light/80 max-w-2xl mx-auto">
            A comprehensive collection of offensive security projects, tools, and research.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}


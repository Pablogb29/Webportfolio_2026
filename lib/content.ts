export interface SocialLink {
  name: string;
  url: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Email",
    url: "mailto:pabloinfosec@gmail.com",
    label: "pabloinfosec@gmail.com",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/pabloinfosec",
    label: "linkedin.com/in/pabloinfosec",
  },
  {
    name: "GitHub",
    url: "https://github.com/Pablogb29",
    label: "github.com/Pablogb29",
  },
  {
    name: "Hack The Box",
    url: "https://app.hackthebox.com/users/1583498",
    label: "Hack The Box Profile",
  },
];

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  skills: string[];
}

export const experiences: ExperienceItem[] = [
  {
    title: "Cybersecurity Engineer",
    company: "Indra | Minsait Cyber",
    location: "Barcelona, Spain (Remote from Brussels, Belgium)",
    period: "10/2025 – Current",
    bullets: [
      "Managing user lifecycle and access control across critical systems, including provisioning, deprovisioning, and permissions governance",
      "Developing Python and SQL automations using the Databricks SCIM API to manage role and group assignments programmatically",
      "Automating access documentation in Confluence and building Neo4j + PyVis models to visualize and analyze permission relationships",
      "Supporting compliance with ENS, ISO 27001, and GDPR through stakeholder reviews, access governance, and least-privilege validation",
      "Co-leading the documentation and secure design of a high-compliance AWS environment for CTTI in Catalonia, aligned with ENS high-level requirements, defining end-to-end security controls across IAM, logging, monitoring, threat detection, network architecture, perimeter protection, storage, and secure configuration of core AWS services",
    ],
    skills: [
      "Azure IAM",
      "AWS Security",
      "Databricks SCIM API",
      "Neo4j + PyVis",
      "ENS",
      "ISO 27001",
      "GDPR",
      "Python",
      "SQL",
      "PowerShell",
      "Bash",
    ],
  },
  {
    title: "Quality Assurance Coordinator",
    company: "Bertrandt S.A.",
    location: "Martorell, Barcelona, Spain",
    period: "12/2024 – 10/2025",
    bullets: [
      "Leading the QA team in mobile and architecture car validation for SEAT & CUPRA applications, balancing technical and managerial responsibilities",
      "Coordinating daily activities and distributing tasks among team members",
      "Acting as a point of contact for client communication and feedback loops",
      "Delivering weekly and monthly project tracking reports and presentations",
      "Continued executing technical validations alongside organizational duties",
    ],
    skills: [
      "Team Leadership",
      "Project Management",
      "Client Communication",
      "Technical Validation",
    ],
  },
  {
    title: "Quality Assurance Engineer",
    company: "Bertrandt S.A.",
    location: "Martorell, Barcelona, Spain",
    period: "08/2023 – 12/2024",
    bullets: [
      "Performed comprehensive validation and testing for automotive applications and vehicle architecture for SEAT & CUPRA brands",
      "Created Test Plans and Test Cases for mobile and vehicle systems",
      "Log reading and analysis for applications, back-end services, and vehicles",
      "Used tools including Wireshark, Datadog, Kibana, Figma, Zeplin, and Jira",
      "Automated mobile application testing with XCode, Python, Appium and Selenium",
    ],
    skills: [
      "Quality Assurance",
      "Test Automation",
      "Log Analysis",
      "Python",
      "Appium",
      "Selenium",
      "Wireshark",
      "Jira",
    ],
  },
];

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  eqfLevel: string;
  thesis?: string;
  thesisPdf?: string;
  keySubjects: string[];
}

export const education: EducationItem[] = [
  {
    degree: "Master's in Artificial Intelligence",
    institution: "Racks Academy IUNIT – Centro Universitario",
    location: "Remote, Spain",
    period: "10/2024 – 12/2025",
    eqfLevel: "EQF level 7",
    thesis:
      "Design and Implementation of an AI-Based Automated System for Job Offer Management and Prioritization",
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
    institution: "Deloitte – IMF Smart Education",
    location: "Remote, Spain",
    period: "03/2024 – 04/2025",
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
    degree:
      "Bachelor's degree in Electronic Telecommunications Engineering",
    institution: "Universidad Autónoma de Barcelona",
    location: "Cerdanyola del Vallès, Spain",
    period: "09/2019 – 02/2024",
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

export interface Certification {
  name: string;
  fullName: string;
  status: string;
  issuer: string;
  description: string;
  goal: "current" | "next" | "final";
  icon: "htb" | "oscp";
}

export const certifications: Certification[] = [
  {
    name: "CJCA",
    fullName: "Certified Junior Cybersecurity Analyst",
    status: "Exam: 27 Mar 2026",
    issuer: "Hack The Box",
    description:
      "Foundation certification validating core cybersecurity analysis skills and practical knowledge. Exam scheduled for 27 March 2026.",
    goal: "current",
    icon: "htb",
  },
  {
    name: "CPTS",
    fullName: "Certified Penetration Testing Specialist",
    status: "Planned for 2026",
    issuer: "Hack The Box",
    description:
      "Advanced pentesting certification focused on real-world attack paths and comprehensive security assessments.",
    goal: "next",
    icon: "htb",
  },
  {
    name: "OSCP",
    fullName: "Offensive Security Certified Professional",
    status: "Planned for 2026",
    issuer: "Offensive Security",
    description:
      "Industry-leading penetration testing certification emphasizing hands-on exploitation and reporting skills.",
    goal: "final",
    icon: "oscp",
  },
];

export interface Project {
  title: string;
  description: string;
  stack: string[];
  result: string;
  repoUrl?: string;
  visibility: "public" | "private";
  category: "professional" | "personal";
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Security Automation ToolKit – Minsait Cyber",
    description:
      "Created a custom 'BloodHound' for Databricks using Python and PyVis library. The tool visualizes a network of connections between users, groups, service principals, permissions, catalogs, schemas, tables, and more. Features include route finding to determine if a user can access a specific table, searching for all schemas and tables with group privileges, and comprehensive permission mapping.",
    stack: [
      "Python",
      "PyVis",
      "Databricks API",
      "Network Visualization",
      "Security Analysis",
    ],
    result:
      "Comprehensive security visualization tool for Databricks environments with permission analysis capabilities",
    repoUrl: undefined,
    visibility: "private",
    category: "professional",
    featured: true,
  },
  {
    title: "Databricks IAM Automation – Minsait Cyber",
    description:
      "Developed a Python automation system that reads documentation from Confluence about access and permission configurations for projects. The system processes form-based JSON inputs and automatically applies the correct permissions to Databricks resources, streamlining IAM workflows.",
    stack: ["Python", "Databricks API", "Confluence API", "JSON", "IAM"],
    result:
      "Automated IAM permission management for Databricks projects based on Confluence documentation",
    repoUrl: undefined,
    visibility: "private",
    category: "professional",
    featured: true,
  },
  {
    title: "QA Mobile Automation – Bertrandt",
    description:
      "Created a comprehensive automation environment for iOS and Android applications (MyCupra and MySeat) using Python, XCode, Selenium, Appium, and Android Studio. The automation measures average user time for critical actions such as starting air conditioning or battery charging when the car is connected.",
    stack: [
      "Python",
      "XCode",
      "Selenium",
      "Appium",
      "Android Studio",
      "Performance Testing",
    ],
    result:
      "Automated performance measurement system that identified optimization opportunities, addressing user complaints about app speed",
    repoUrl: undefined,
    visibility: "private",
    category: "professional",
  },
  {
    title: "JIRA-PowerBI Reporting Automation – Bertrandt",
    description:
      "Created an automated reporting system that runs on an hourly schedule, fetching data from JIRA via API using various filters. The script structures and saves this information into PowerBI dashboards featuring interactive filters, heat maps, testing plans, and comprehensive project metrics.",
    stack: [
      "Python",
      "JIRA API",
      "PowerBI",
      "Automation",
      "Data Visualization",
    ],
    result:
      "Automated reporting system providing real-time project insights and eliminating manual reporting overhead",
    repoUrl: undefined,
    visibility: "private",
    category: "professional",
  },
  {
    title: "HackTheBox WriteUps",
    description:
      "Repository containing documented Hack The Box machine write-ups. Professional approach, OSCP-oriented, and focused on real-world penetration testing. Contains 30 Easy machines and 3 Medium machines with step-by-step explanations, tool usage, and mitigation strategies.",
    stack: [
      "Bash",
      "PowerShell",
      "Python",
      "Nmap",
      "Various Security Tools",
    ],
    result:
      "59 machines completed (50 Easy, 9 Medium) with comprehensive OSCP-oriented write-ups",
    repoUrl: "https://github.com/Pablogb29/HackTheBox",
    visibility: "public",
    category: "personal",
    featured: true,
  },
  {
    title: "Web Portfolio 2024",
    description:
      "First web portfolio, designed with a simple and minimalist approach. An initial foray into web development and portfolio creation.",
    stack: ["HTML", "CSS", "JavaScript"],
    result: "Simple and minimalist portfolio website",
    repoUrl: "https://github.com/Pablogb29/Webportfolio_2024",
    visibility: "public",
    category: "personal",
  },
  {
    title: "Web Portfolio 2026",
    description:
      "The current web portfolio, featuring improved transitions, modern design, and API integrations. Represents a significant evolution in design and functionality.",
    stack: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    result:
      "Modern, responsive portfolio website with enhanced animations and API integrations",
    repoUrl: "https://github.com/Pablogb29/webportfolio_2026",
    visibility: "public",
    category: "personal",
  },
  {
    title: "TradeAlert Bot",
    description:
      "Bot connected to different brokers that compares prices of various assets and sends alerts to a Telegram chat. Analyzes technical indicators including morning stars, EMA breakouts, RSI, and breakout patterns.",
    stack: [
      "Python",
      "Telegram API",
      "Trading APIs",
      "Technical Analysis",
    ],
    result:
      "Real-time trading pattern detection and alert system via Telegram",
    repoUrl: undefined,
    visibility: "private",
    category: "personal",
  },
  {
    title: "Python Automation Training",
    description:
      "Training challenges for Python and Pytest automations. Basic exercises designed to introduce juniors into automation with Python.",
    stack: ["Python", "Pytest", "Automation", "Testing"],
    result:
      "Educational repository with Python and Pytest automation training challenges",
    repoUrl: "https://github.com/Pablogb29/QA_Automation_Training",
    visibility: "public",
    category: "personal",
  },
  {
    title: "QuickTrack",
    description:
      "Personal finance app for tracking income, expenses, investments, and debts. Designed for Android, programmed with Dart, and hosted on Railway.",
    stack: ["Dart", "Flutter", "Android", "Railway"],
    result: "Personal finance tracking application for Android",
    repoUrl: undefined,
    visibility: "private",
    category: "personal",
  },
  {
    title: "Hitster",
    description:
      "Digitalization of the table game 'Hitster' where users must guess the name, year, and singer of a song by only listening. Multiplatform game with a full-stack architecture featuring a Python backend and TypeScript frontend, connected to the Spotify API.",
    stack: [
      "TypeScript",
      "Python",
      "Spotify API",
      "Railway",
      "React",
      "FastAPI",
    ],
    result:
      "Multiplatform music guessing game with Spotify integration",
    repoUrl: "https://github.com/Pablogb29/hitster",
    visibility: "public",
    category: "personal",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const professionalProjects = projects.filter(
  (p) => p.category === "professional"
);
export const personalProjects = projects.filter(
  (p) => p.category === "personal"
);

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Offensive Security",
    skills: [
      "Penetration Testing: Burp Suite, OWASP ZAP, Metasploit",
      "Network Reconnaissance: Nmap, Masscan, Gobuster",
      "Active Directory: Impacket, BloodHound, LinPEAS, WinPEAS",
      "Web Security: SQL Injection, XSS, SSRF, IDOR, LFI, RCE",
      "Post-Exploitation: psexec.py, enum4linux, ldapsearch",
      "Forensic Analysis & Log Analysis with Autopsy",
    ],
  },
  {
    title: "Security Engineering & IAM",
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
    skills: [
      "Azure Cloud Services & IAM",
      "AWS Cloud Platform (initial experience)",
      "Active Directory & Windows Server",
      "Network Security & Firewall Management",
      "Linux & Windows Administration",
      "Deployment: Vercel, Railway, GitHub Actions",
    ],
  },
  {
    title: "Programming & Automation",
    skills: [
      "Languages: Python, Bash, PowerShell, SQL",
      "Web: JavaScript, TypeScript, HTML, CSS",
      "Mobile Testing: Appium, Selenium",
      "Infrastructure Automation: Databricks, Jira, Confluence",
      "System Automation: Task Schedulers, Privilege Management",
    ],
  },
];

export const navItems = [
  { name: "HOME", href: "/#home" },
  { name: "ABOUT", href: "/#about" },
  { name: "EXPERIENCE", href: "/#experience" },
  { name: "EDUCATION", href: "/#education" },
  { name: "SKILLS", href: "/#skills" },
  { name: "PROJECTS", href: "/projects" },
  { name: "CTF", href: "/ctf" },
  { name: "CONTACT", href: "/contact" },
];

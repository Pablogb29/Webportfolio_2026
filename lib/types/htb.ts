/**
 * HTB API Type Definitions
 * Based on Hack The Box API v4 structure
 */

// Raw HTB API Response Types
export interface HTBUserProfile {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  points?: number;
  rank?: string;
  country_name?: string;
}

export interface HTBMachineOwn {
  id: number;
  name: string;
  date: string; // ISO date string when machine was solved
  user_owns?: number;
  root_owns?: number;
  system_owns?: number;
}

export interface HTBMachineTag {
  id: number;
  name: string;
  description?: string;
}

export interface HTBMachineDetail {
  id: number;
  name: string;
  avatar?: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Insane" | "Tutorial";
  difficultyText?: string;
  difficultyCharts?: {
    cve?: number;
    realworld?: number;
    custom?: number;
  };
  os: "Linux" | "Windows" | "Other" | "FreeBSD" | "OpenBSD";
  points: number;
  release?: string; // ISO date string
  retired_date?: string; // ISO date string or null
  retired?: boolean; // Boolean flag for retired status
  maker?: {
    id: number;
    name: string;
    avatar?: string;
  };
  maker2?: {
    id: number;
    name: string;
    avatar?: string;
  };
  rating?: number;
  tags?: HTBMachineTag[];
  active?: boolean;
  free?: boolean;
  recommended?: boolean;
  playInfo?: {
    isSpawned?: boolean;
    isSpawning?: boolean;
    canSpawn?: boolean;
  };
}

// Normalized Frontend Types
export interface MachineSolved {
  // Machine Identity
  id: number;
  name: string;
  url: string; // HTB machine URL
  image?: string; // Avatar/thumbnail URL
  
  // Classification
  type: "Machine" | "Challenge";
  difficulty: "Easy" | "Medium" | "Hard" | "Insane" | "Tutorial";
  difficultyNumeric?: number; // 0-100 or similar
  os: "Linux" | "Windows" | "Other" | "FreeBSD" | "OpenBSD";
  
  // Dates
  releaseDate?: string; // ISO date string
  retiredDate?: string; // ISO date string or null
  solveDate: string; // ISO date string - when user solved it
  
  // Status
  status: "Active" | "Retired";
  isActive: boolean;
  isRetired: boolean;
  
  // Scoring
  points: number;
  rating?: number; // Community rating
  
  // Technical Content
  tags: string[]; // Array of tag names
  tagDetails?: HTBMachineTag[]; // Full tag objects if needed
  skills?: string[]; // Array of skill names
  attackPaths?: string[]; // Array of attack path descriptions
  difficultyRatings?: any; // Difficulty rating data
  
  // Makers
  maker?: string;
  maker2?: string;
  
  // Portfolio-friendly derived fields
  skillHighlights?: string[]; // Inferred from tags
  skillSummary?: string; // Short description of what this shows
  
  // Internal metadata
  userOwns?: number;
  rootOwns?: number;
  systemOwns?: number;
  
  // Writeup links
  writeupUrl?: string | null;
  hasWriteup?: boolean;
}

export interface MachineFilters {
  difficulty?: ("Easy" | "Medium" | "Hard" | "Insane" | "Tutorial")[];
  os?: ("Linux" | "Windows" | "Other" | "FreeBSD" | "OpenBSD")[];
  status?: ("Active" | "Retired")[];
  tags?: string[];
  skills?: string[];
  year?: number;
  search?: string;
}

export type MachineSortOption =
  | "solveDateDesc"
  | "solveDateAsc"
  | "difficultyDesc"
  | "difficultyAsc"
  | "pointsDesc"
  | "pointsAsc"
  | "ratingDesc"
  | "ratingAsc"
  | "nameAsc"
  | "nameDesc";

export interface MachinesResponse {
  machines: MachineSolved[];
  total: number;
  stats: {
    total: number;
    byDifficulty: Record<string, number>;
    byOS: Record<string, number>;
    byStatus: Record<string, number>;
    byYear: Record<string, number>;
    uniqueTags: string[];
    uniqueSkills: string[];
  };
}

// Skill mapping for portfolio-friendly descriptions
export const skillTagMapping: Record<string, string[]> = {
  "Active Directory": ["Kerberoasting", "AS-REP Roasting", "ACL Abuse", "RBCD", "DCSync", "BloodHound"],
  "Web": ["SQL Injection", "XSS", "SSRF", "LFI/RFI", "SSTI", "Deserialization", "API Security"],
  "Crypto": ["Cryptography", "Encryption", "Hash Cracking", "RSA"],
  "Forensics": ["Log Analysis", "Memory Analysis", "File Analysis", "Network Forensics"],
  "Privilege Escalation": ["SUID", "Capabilities", "Sudo", "Kernel Exploits", "Windows PrivEsc"],
  "Network": ["Network Scanning", "Port Enumeration", "SMB", "FTP", "SSH"],
  "Reverse Engineering": ["Binary Analysis", "Ghidra", "IDA", "Debugging"],
  "Exploitation": ["Buffer Overflow", "ROP", "Format String", "Race Conditions"],
};

